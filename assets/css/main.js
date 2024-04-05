const button = document.querySelector(".qr-code__button");
const anotherButton = document.querySelector(".qr-code__export-button");
const el = document.querySelector(".qr-code__code");

const generate = async () => {
  const input = document.querySelector(".qr-code__input");
  let text = input.value;
  input.value = "";

  await fetch(`https://quickchart.io/qr?text=${text}`)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      el.innerHTML = `<img src="${url}" height="200" width="200" />`;
    });
}

const saveQRCode = () => {
  const dataURL = document.querySelector("img").src;
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "qrcode.jpg";
  link.click();

  setTimeout(() => {
    anotherButton.classList.add("hidden");
    el.classList.add("hidden");
  }, 1000);
}

button.addEventListener("click", async () => {
  await generate();
  el.classList.remove("hidden");
  alert("Código QR gerado com sucesso!");
  anotherButton.classList.remove("hidden");
});

anotherButton.addEventListener("click", saveQRCode);