const currency = document.getElementById("currency")

currency.addEventListener("change", function () {
    document.getElementById("temp").innerText = `Prognoza 5 dniowa dla miasta: ${currency.value}`
})
