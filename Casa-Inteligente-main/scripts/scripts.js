const TIME_OUT = 1000*60

let i = 0
let width = 1

setTimeout(showIntrusorAlert,TIME_OUT)

function showLoading() {
    var elem = document.getElementById("loading-bar");
    elem.setAttribute('style', 'display:flex');
    move();
}

function move() {
    let ok = document.getElementById("OK")
    let cancel = document.getElementById("cancel")
    if(i == 0) {
        i = 1;
        var elem = document.getElementById("progress-bar");
        var id = setInterval(frame, 30);
        function frame() {
            if(width >= 100) {
                elem.innerHTML = "Tarefa Concluída"
                clearInterval(id);
                i = 0;
                ok.classList = ""
                ok.addEventListener("click",() => history.back())
                cancel.classList.add("disabled")
            }
            else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }
        }
    }
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}


function showIntrusorAlert(){
    let windowDiv = document.createElement("div")
    let buttonsDiv = document.createElement("div")
    let cancel = document.createElement("button")
    let cameras = document.createElement("button")
    let callPolice = document.createElement("button")
    let lockDoors = document.createElement("button")
    let setTimer = () => setTimeout(showIntrusorAlert,TIME_OUT*2)
    let goToSecurity = () =>{ 
        location = "security.html"
        setTimer()
    }

    cancel.textContent = "Cancelar"
    cancel.onclick =() => {
        windowDiv.style.display = "none"
        setTimer()
    }
    cameras.textContent = "Ver câmeras"
    cameras.onclick = goToSecurity
    callPolice.textContent = "Ligar à polícia"
    callPolice.onclick = goToSecurity
    lockDoors.textContent = "Trancar Portas"
    lockDoors.onclick = goToSecurity
    buttonsDiv.id = "buttons"
    windowDiv.id = "alert-window"

    buttonsDiv.append(cancel,cameras,callPolice,lockDoors)
    windowDiv.append("Foi detatada uma invasão, por alguém não reconhecido, na casa!",buttonsDiv)
    document.getElementById("container").appendChild(windowDiv)

}
