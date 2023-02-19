const MAX_TEMPERATURE = 35
const MIN_TEMPERATURE = 10
const TEMPERATURE_KEY = "bedroomTemperature"
const LIGHTS_KEY = "bedroomLightsValue"
const BLINDS_KEY = "bedroomBlindsValue"
const BED_TEMPERATURE_KEY = "bedroomBedTemperature"

let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))
let temperatureValue = document.getElementById("temperature-value")
let storedTemperature = localStorage.getItem(TEMPERATURE_KEY)

let lightsCheckBox = document.querySelector("#lights-btn input")
let storedLightValue = localStorage.getItem(LIGHTS_KEY)

let blindsBtn = document.querySelector("#blinds-btn button")
let storedBlindsBtnValue = localStorage.getItem(BLINDS_KEY)

let warmBedWindow = document.getElementById("warm-bed-window")
let warmBedBtn = document.querySelector("#heat-bed-btn button")
let bedTemperatureValue = document.getElementById("bed-temperature-value")
let bedTemperatureBtns = Array.from(document.getElementsByClassName("bed-temp-controller"))
let storedBedTemperature = localStorage.getItem(BED_TEMPERATURE_KEY)
let okBtn = document.getElementById("ok")
let cancelBtn = document.getElementById("cancel")

if(storedBedTemperature){
    bedTemperatureValue.textContent = storedBedTemperature
}

if(storedBlindsBtnValue){
    blindsBtn.textContent = storedBlindsBtnValue
}

if(storedTemperature){
    temperatureValue.textContent = storedTemperature
}

lightsCheckBox.checked = storedLightValue == "true"

okBtn.addEventListener("click",() => closeWarmBedWindow(okBtn))
cancelBtn.addEventListener("click",() => closeWarmBedWindow(cancelBtn))
bedTemperatureBtns.forEach(b => b.addEventListener("click", () => changeBedTemperature(b)) )
warmBedBtn.addEventListener("click", showWarmBedWindow)
blindsBtn.addEventListener("click", saveButtonText )
lightsCheckBox.addEventListener("click", saveCheckBoxValue)
temperatureBtns.forEach(b => b.addEventListener("click", () => changeTemperature(b)) )

function closeWarmBedWindow(b){
    if(b.textContent == "Ok"){
        localStorage.setItem(BED_TEMPERATURE_KEY,bedTemperatureValue.textContent)
    }
    else{
        bedTemperatureValue.textContent = localStorage.getItem(BED_TEMPERATURE_KEY) ? localStorage.getItem(BED_TEMPERATURE_KEY) : 20
    }
    warmBedWindow.style.display = "none"
}

function changeBedTemperature(b){
    let signal = b.textContent
    let currentTemperature = parseInt(bedTemperatureValue.textContent)

    if(signal == "+" && currentTemperature<MAX_TEMPERATURE){
        currentTemperature++
    }
    else if(signal == "-" && currentTemperature>MIN_TEMPERATURE){
        currentTemperature--
    }

    bedTemperatureValue.textContent = currentTemperature
}

function showWarmBedWindow(){
    warmBedWindow.style.display = "block"
}

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