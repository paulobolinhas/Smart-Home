const KITCHEN_LIGHTS_KEY = "kitchenLightsValue"
const BALCONY_LIGHTS_KEY = "balconyLightsValue"
const GARAGE_LIGHTS_KEY = "garageLightsValue"
const BEDROOM_LIGHTS_KEY = "bedroomLightsValue"
const LIVINGROOM_LIGHTS_KEY = "livingroomLightsValue"
const WC_LIGHTS_KEY = "wcLightsValue"

let checkboxes = Array.from(document.querySelectorAll("input"))

let kitchenLightsCheckBox = document.querySelector("#kitchen-btn input")
let storedKitchenLightValue = localStorage.getItem(KITCHEN_LIGHTS_KEY)

let balconyLightsCheckBox = document.querySelector("#balcony-btn input")
let balconyKitchenLightValue = localStorage.getItem(BALCONY_LIGHTS_KEY)

let garageLightsCheckBox = document.querySelector("#garage-btn input")
let storedGarageLightValue = localStorage.getItem(GARAGE_LIGHTS_KEY)

let bedroomLightsCheckBox = document.querySelector("#bedroom-btn input")
let storedBedroomLightValue = localStorage.getItem(BEDROOM_LIGHTS_KEY)

let livingroomLightsCheckBox = document.querySelector("#livingroom-btn input")
let storedLivingroomLightValue = localStorage.getItem(LIVINGROOM_LIGHTS_KEY)

let wcLightsCheckBox = document.querySelector("#wc-btn input")
let storedWcLightValue = localStorage.getItem(WC_LIGHTS_KEY)

kitchenLightsCheckBox.checked = storedKitchenLightValue == "true"
balconyLightsCheckBox.checked = balconyKitchenLightValue == "true"
garageLightsCheckBox.checked = storedGarageLightValue == "true"
bedroomLightsCheckBox.checked = storedBedroomLightValue == "true"
livingroomLightsCheckBox.checked = storedLivingroomLightValue == "true"
wcLightsCheckBox.checked = storedWcLightValue == "true"

checkboxes.forEach(c => c.addEventListener("click",() => clickCheckBox(c)))

function clickCheckBox(c){
    let spanElem = c.parentElement.parentElement
    let divison = spanElem.id.split("-")[0]
    let value = c.checked
    let key = divison.concat("LightsValue")
    localStorage.setItem(key,value)
}
