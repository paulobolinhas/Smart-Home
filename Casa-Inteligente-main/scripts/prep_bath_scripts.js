const MAX_TEMPERATURE = 40
const MIN_TEMPERATURE = 10

let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))
let temperatureValue = document.getElementById("temperature-value")

temperatureBtns.forEach(b => b.addEventListener("click", () => changeTemperature(b)) )

function changeTemperature(b){
    let signal = b.textContent
    let currentTemperature = parseInt(temperatureValue.textContent)

    if(signal == "+" && currentTemperature<MAX_TEMPERATURE){
        currentTemperature++
    }
    else if(signal == "-" && currentTemperature>MIN_TEMPERATURE){
        currentTemperature--
    }

    temperatureValue.textContent = currentTemperature
}