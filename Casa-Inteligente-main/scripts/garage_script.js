const MAX_TEMPERATURE = 35
const MIN_TEMPERATURE = 10
const TEMPERATURE_KEY = "garageTemperature"
const LIGHTS_KEY = "garageLightsValue"
const GATE_KEY = "garageGateValue"

let washCarBtn = document.getElementById("wash-car-btn")
let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))
let temperatureValue = document.getElementById("temperature-value")
let storedTemperature = localStorage.getItem(TEMPERATURE_KEY)
let lightsCheckBox = document.querySelector("#lights-btn input")
let storedLightValue = localStorage.getItem(LIGHTS_KEY)
let gateBtn = document.querySelector("#gate-btn button")
let storedGateBtnValue = localStorage.getItem(GATE_KEY)

if(storedGateBtnValue){
    gateBtn.textContent = storedGateBtnValue
}

if(storedTemperature){
    temperatureValue.textContent = storedTemperature
}

lightsCheckBox.checked = storedLightValue == "true"

gateBtn.addEventListener("click", saveButtonText )
lightsCheckBox.addEventListener("click", saveCheckBoxValue)
temperatureBtns.forEach(b => b.addEventListener("click", () => changeTemperature(b)) )
washCarBtn.addEventListener("click", startWashingSession)

function saveButtonText(){
    let value = gateBtn.textContent
    if(value == "Abrir"){
        gateBtn.textContent = "Fechar"
    }
    else{
        gateBtn.textContent = "Abrir"
    }
    localStorage.setItem(GATE_KEY, gateBtn.textContent)
}

function saveCheckBoxValue(){
    let value = lightsCheckBox.checked
    localStorage.setItem(LIGHTS_KEY, value ? "true" : "false")
}

function startWashingSession(){
    let warningWindow = document.getElementById("warning-window")
    let buttons = document.querySelectorAll("#button-container button")
    warningWindow.style.display = "block"
    buttons.forEach(b => b.addEventListener("click",() => warningWindow.style.display = "none"))
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