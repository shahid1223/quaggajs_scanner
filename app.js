window.addEventListener('load', function () {
    let selectedDeviceId;
    var hints = new Map();
    hints.set(ZXing.DecodeHintType.ASSUME_GS1, true)
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true)
    const codeReader = new ZXing.BrowserMultiFormatReader(hints)
    alert('ZXing code reader initialized')
    codeReader.getVideoInputDevices()
      .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        sourceSelectPanel.style.display = 'block'
      }

      document.getElementById('startButton').addEventListener('click', () => {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            alert(result.getText())
            document.getElementById('result').textContent = result.text
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            document.getElementById('result').textContent = err
          }
        })
        alert(`Started continous decode from camera with id ${selectedDeviceId}`)
      })

      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        document.getElementById('result').textContent = '';
        alert('Reset.')
      })

    })
      .catch((err) => {
      console.error(err)
    })
  })
