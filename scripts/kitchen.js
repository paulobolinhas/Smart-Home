// localStorage.clear()
const MAX_TEMPERATURE = 35
const MIN_TEMPERATURE = 10
const TEMPERATURE_KEY = "kitchenTemperature"
const LIGHTS_KEY = "kitchenLightsValue"
const BLINDS_KEY = "kitchenBlindsValue"

let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))
let temperatureValue = document.getElementById("temperature-value")
let storedTemperature = localStorage.getItem(TEMPERATURE_KEY)
let lightsCheckBox = document.querySelector("#lights-btn input")
let storedLightValue = localStorage.getItem(LIGHTS_KEY)
let blindsBtn = document.querySelector("#blinds-btn button")
let storedBlindsBtnValue = localStorage.getItem(BLINDS_KEY)

if(storedBlindsBtnValue){
    blindsBtn.textContent = storedBlindsBtnValue
}

lightsCheckBox.checked = storedLightValue == "true"

if(storedTemperature){
    temperatureValue.textContent = storedTemperature
}

blindsBtn.addEventListener("click", saveButtonText )
lightsCheckBox.addEventListener("click", saveCheckBoxValue)
temperatureBtns.forEach(b => b.addEventListener("click", () => changeTemperature(b)) )

function saveButtonText(){
    let value = blindsBtn.textContent
    if(value == "Abrir"){
        blindsBtn.textContent = "Fechar"
    }
    else{
        blindsBtn.textContent = "Abrir"
    }
    localStorage.setItem(BLINDS_KEY, blindsBtn.textContent)
}

function saveCheckBoxValue(){
    let value = lightsCheckBox.checked
    localStorage.setItem(LIGHTS_KEY, value ? "true" : "false")
}

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
    localStorage.setItem(TEMPERATURE_KEY,temperatureValue.textContent)
}