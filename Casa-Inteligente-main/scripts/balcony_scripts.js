const LIGHTS_KEY = "balconyLightsValue"

let lightCheckBox = document.querySelector("#lights-btn input")
let storedLightValue = localStorage.getItem(LIGHTS_KEY)

lightCheckBox.checked = storedLightValue == "true"

lightCheckBox.addEventListener("click", saveLightCheckBox)

function saveLightCheckBox(){
    let value = lightCheckBox.checked
    localStorage.setItem(LIGHTS_KEY, value ? "true" : "false")
}