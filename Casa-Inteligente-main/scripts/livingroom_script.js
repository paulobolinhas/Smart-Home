const MAX_TEMPERATURE = 35
const MIN_TEMPERATURE = 10
const TEMPERATURE_KEY = "livingroomTemperature"
const LIGHTS_KEY = "livingroomLightsValue"
const BLINDS_KEY = "livingroomBlindsValue"
const TV_KEY = "livingroomTvValue"
const PROJECTOR_KEY = "livingroomProjectorValue"
const SOFA_TEMPERATURE_KEY = "livingroomSofaTemperature"

let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))
let temperatureValue = document.getElementById("temperature-value")
let storedTemperature = localStorage.getItem(TEMPERATURE_KEY)

let lightsCheckBox = document.querySelector("#lights-btn input")
let storedLightValue = localStorage.getItem(LIGHTS_KEY)

let blindsBtn = document.querySelector("#blinds-btn button")
let storedBlindsBtnValue = localStorage.getItem(BLINDS_KEY)

let tvBtn = document.getElementById("tVOnOff")
let storedTvValue = localStorage.getItem(TV_KEY)

let projectorBtn = document.getElementById("projetorOnOff")
let storedProjectorValue = localStorage.getItem(PROJECTOR_KEY)

let warmSofaWindow = document.getElementById("warm-sofa-window")
let warmSofaBtn = document.querySelector("#sofa-heat-btn button")
let sofaTemperatureValue = document.getElementById("sofa-temperature-value")
let sofaTemperatureBtns = Array.from(document.getElementsByClassName("sofa-temp-controller"))
let storedSofaTemperature = localStorage.getItem(SOFA_TEMPERATURE_KEY)
let okBtn = document.getElementById("ok")
let cancelBtn = document.getElementById("cancel")


if(storedSofaTemperature){
    sofaTemperatureValue.textContent = storedSofaTemperature
}

if(storedProjectorValue){
    projectorBtn.textContent = storedProjectorValue
}

if(storedTvValue){
    tvBtn.textContent = storedTvValue
}

if(storedBlindsBtnValue){
    blindsBtn.textContent = storedBlindsBtnValue
}

if(storedTemperature){
    temperatureValue.textContent = storedTemperature
}

lightsCheckBox.checked = storedLightValue == "true"

okBtn.addEventListener("click",() => closeWarmSofaWindow(okBtn))
cancelBtn.addEventListener("click",() => closeWarmSofaWindow(cancelBtn))
sofaTemperatureBtns.forEach(b => b.addEventListener("click", () => changeSofaTemperature(b)) )
warmSofaBtn.addEventListener("click", showWarmSofaWindow)
projectorBtn.addEventListener("click", saveProjectorButtonText)
tvBtn.addEventListener("click", saveTvButtonText)
blindsBtn.addEventListener("click", saveBlindsButtonText )
lightsCheckBox.addEventListener("click", saveCheckBoxValue)
temperatureBtns.forEach(b => b.addEventListener("click", () => changeTemperature(b)) )

function closeWarmSofaWindow(b){
    if(b.textContent == "Ok"){
        localStorage.setItem(SOFA_TEMPERATURE_KEY,sofaTemperatureValue.textContent)
    }
    else{
        sofaTemperatureValue.textContent = localStorage.getItem(SOFA_TEMPERATURE_KEY) ? localStorage.getItem(SOFA_TEMPERATURE_KEY) : 20
    }
    warmSofaWindow.style.display = "none"
}

function changeSofaTemperature(b){
    let signal = b.textContent
    let currentTemperature = parseInt(sofaTemperatureValue.textContent)

    if(signal == "+" && currentTemperature<MAX_TEMPERATURE){
        currentTemperature++
    }
    else if(signal == "-" && currentTemperature>MIN_TEMPERATURE){
        currentTemperature--
    }

    sofaTemperatureValue.textContent = currentTemperature
}

function showWarmSofaWindow(){
    warmSofaWindow.style.display = "block"
}

function saveProjectorButtonText(){
    let value = projectorBtn.textContent
    if(value == "Ligar"){
        projectorBtn.textContent = "Desligar"
    }
    else{
        projectorBtn.textContent = "Ligar"
    }
    localStorage.setItem(PROJECTOR_KEY, projectorBtn.textContent)
}

function saveTvButtonText(){
    let value = tvBtn.textContent
    if(value == "Ligar"){
        tvBtn.textContent = "Desligar"
    }
    else{
        tvBtn.textContent = "Ligar"
    }
    localStorage.setItem(TV_KEY, tvBtn.textContent)
}

function saveBlindsButtonText(){
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
