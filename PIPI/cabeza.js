// Create a QR code with some data
var qr = new QRCode(document.createElement("div"), {
  text: "https://www.example.com",
  width: 128,
  height: 128
});

// Append the QR code to the body or any other container
document.body.appendChild(qr._el);
