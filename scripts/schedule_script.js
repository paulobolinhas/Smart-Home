// localStorage.clear()
const CHECKBOX_STATES = "scheduleCheckBoxStates"
const COUNTER_KEY = "counter"
const LIST_KEY = "scheduleList"

let count = 3
let storedCount = localStorage.getItem(COUNTER_KEY)

let list = document.getElementById("schedule-list")
let storedList = localStorage.getItem(LIST_KEY)
if(storedList){
    list.innerHTML = storedList
}
let listElems = Array.from(document.querySelectorAll("#schedule-list li"))

let checkBoxes = Array.from(list.querySelectorAll("#schedule-list input"))
let checkBoxStates = []
for(let i = 0; i<listElems.length ; i++){
    checkBoxStates.push(false)
}
let storedCheckBoxStates = localStorage.getItem(CHECKBOX_STATES)

let addBtn = document.getElementById("add")
let configWindow = document.getElementById("config-window")
let okBtn = document.getElementById("ok")

let hours = configWindow.querySelector("#hour")
let mins = configWindow.querySelector("#min")
let duration = configWindow.querySelector("#dur")


if(storedCount){
    count = parseInt(storedCount)
}

if(storedCheckBoxStates){
    checkBoxStates = JSON.parse(storedCheckBoxStates)
    for(let i = 0; i<checkBoxStates.length;i++){
        checkBoxes[i].checked = checkBoxStates[i]
    }
}

hours.addEventListener("input",() =>checkLimit(hours))
mins.addEventListener("input",()=>checkLimit(mins))
duration.addEventListener("input",()=>checkLimit(duration))
addBtn.addEventListener("click", addNewSchedule)
checkBoxes.forEach(c => c.addEventListener("click", () => clickCheckBox(c)))
okBtn.addEventListener("click",() => saveConfigs(okBtn))

function checkLimit(e,limit){
    let val = parseInt(e.value)
    if(val>e.max){
        e.value = e.max
    }

    if(val<e.min){
        e.value = e.min;
    }
}

function addNewSchedule(){
    showConfigsWindow();
}



function saveConfigs(b){
    if(isSubmitable()){
        count++
        localStorage.setItem(COUNTER_KEY,count)
        let days = Array.from(configWindow.querySelectorAll(".day"))

        let listItem = document.createElement("li")
        let timeSpan = document.createElement("span")
        let daysSpan = document.createElement("span")
        let switchLabel = document.createElement("label")
        let cb = document.createElement("input")
        let sliderSpan = document.createElement("span")

        timeSpan.id = JSON.stringify(count).concat("schedule")
        timeSpan.classList.add("time")
        timeSpan.append((hours.value.length == 1 ? "0" + hours.value  : hours.value)+ ":" +( mins.value.length == 1 ? "0" + mins.value : mins.value))

        let daysStr = checkedDays(days)
        daysSpan.classList.add("days")
        daysSpan.append("Dias: " + daysStr)

        switchLabel.classList.add("switch")

        cb.type = "checkbox"

        sliderSpan.classList.add("slider")
        sliderSpan.classList.add("round")

        switchLabel.appendChild(cb)
        switchLabel.appendChild(sliderSpan)
        timeSpan.appendChild(daysSpan)
        listItem.appendChild(timeSpan)
        listItem.appendChild(switchLabel)

        list.appendChild(listItem)
        listElems.push(listItem)
        localStorage.setItem(LIST_KEY,list.innerHTML)

        checkBoxStates.push(false)
        checkBoxes.push(cb)
        cb.addEventListener("click", () => clickCheckBox(cb))
        localStorage.setItem(CHECKBOX_STATES, JSON.stringify(checkBoxStates))

        resetFields(hours,mins,duration,days)
        configWindow.style.display = "none"
    }
    else{
        window.alert("Preencha os campos todos, corretamente")
    }
}

function resetFields(hours,mins,duration,days){
    hours.value = ""
    mins.value = ""
    duration.value = ""
    for(let i = 0; i<days.length;i++){
        days[i].checked = false
    }
}

function checkedDays(l){
    let res = []
    for(let i = 0; i<l.length; i++){
        if(l[i].checked){
            res.push(l[i].parentElement.textContent)
        }
    }
    return res.join(" ")
}

function isSubmitable(){
    let valid = false
    let checkDays = Array.from(configWindow.querySelectorAll("input[type = checkbox]"))
    for(let i = 0 ; i<checkDays.length ; i++){
        valid = valid || checkDays[i].checked
    }
    let hours = configWindow.querySelector("#hour")
    let mins = configWindow.querySelector("#min")
    let duration = configWindow.querySelector("#dur")
    valid = valid && hours.value && mins.value && duration.value
    return valid
}

function clickCheckBox(c){
    checkBoxes.forEach(c => checkBoxStates[checkBoxes.indexOf(c)] = c.checked)
    localStorage.setItem(CHECKBOX_STATES, JSON.stringify(checkBoxStates))
}


function showConfigsWindow(){
    configWindow.style.display = "block"
}
