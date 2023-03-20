// app.js
Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#video")
    },
    decoder: {
      readers: ["code_128_reader"]
    }
  }, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("QuaggaJS ready to start.");
    Quagga.start();
  });
  
  Quagga.onDetected(function(result) {
    console.log("Barcode detected:", result.codeResult.code);
  });
  