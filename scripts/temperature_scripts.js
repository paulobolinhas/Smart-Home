const MAX_TEMPERATURE = 35
const MIN_TEMPERATURE = 10
const KITCHEN_TEMP_KEY = "kitchenTemperature"
const GARAGE_TEMP_KEY = "garageTemperature"
const BEDROOM_TEMP_KEY = "bedroomTemperature"
const LIVINGROOM_TEMP_KEY = "livingroomTemperature"
const WC_TEMP_KEY = "wcTemperature"

let temperatureBtns = Array.from(document.getElementsByClassName("temp-controller"))

let kitchenTemperatureValue = document.getElementById("kitchen-temperature-value")
let storedKitchenTemperature = localStorage.getItem(KITCHEN_TEMP_KEY)

let garageTemperatureValue = document.getElementById("garage-temperature-value")
let storedGarageTemperature = localStorage.getItem(GARAGE_TEMP_KEY)

let bedroomTemperatureValue = document.getElementById("bedroom-temperature-value")
let storedBedroomTemperature = localStorage.getItem(BEDROOM_TEMP_KEY)

let livingTemperatureValue = document.getElementById("livingroom-temperature-value")
let storedLivingroomTemperature = localStorage.getItem(LIVINGROOM_TEMP_KEY)

let wcTemperatureValue = document.getElementById("wc-temperature-value")
let storedWcTemperature = localStorage.getItem(WC_TEMP_KEY)

if(storedWcTemperature){
    wcTemperatureValue.textContent = storedWcTemperature
}

if(storedLivingroomTemperature){
    livingTemperatureValue.textContent = storedLivingroomTemperature
}

if(storedBedroomTemperature){
    bedroomTemperatureValue.textContent = storedBedroomTemperature
}

if(storedGarageTemperature){
    garageTemperatureValue.textContent = storedGarageTemperature
}

if(storedKitchenTemperature){
    kitchenTemperatureValue.textContent = storedKitchenTemperature
}


temperatureBtns.forEach(b => b.addEventListener("click",() => changeTemperature(b)) )

function changeTemperature(b){
    let division = b.classList[0].split("-")[0]

    let signal = b.textContent
    let divisionTemperatureElem = document.getElementById(division.concat("-temperature-value"))
    let currentTemperature = parseInt(divisionTemperatureElem.textContent)

    if(signal == "+" && currentTemperature<MAX_TEMPERATURE){
        currentTemperature++
    }
    else if(signal == "-" && currentTemperature>MIN_TEMPERATURE){
        currentTemperature--
    }

    divisionTemperatureElem.textContent = currentTemperature
    let key = division.concat("Temperature")
    localStorage.setItem(key,divisionTemperatureElem.textContent)
}

