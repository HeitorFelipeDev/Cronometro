// Tempo
var tempo = document.querySelector("#tempo");
var m_segundos = 0;
var segundos = 0;
var minutos = 0;

// Intervalo
var intervalo;
var tempoCor;
var num = 3;

var tpmE;
var tpmI;

// Componentes
const tempoContainer = document.querySelector(".tempo-container");
const cronometroContainer = document.querySelector("#cronometro");
const containerEspera = document.querySelector("#tempo-espera");
const tempoEspera = document.querySelector("#text-tempo-espera");

// Controles
const buttonIniciar = document.querySelector("#button-iniciar");
const buttonPausar = document.querySelector("#button-pause");
const buttonReiniciar = document.querySelector("#button-reiniciar");
const buttonResume = document.querySelector("#button-resume");

// dark-mode
const buttonDarkMode = document.querySelector("#button-dark-mode");
buttonDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

(
    function cronometro() {
        // Eventos
        buttonIniciar.addEventListener("click", espera);
        buttonPausar.addEventListener("click", pausarCronometro);
        buttonReiniciar.addEventListener("click", reiniciarCronometro);
        buttonResume.addEventListener("click", iniciarCronometro);
    }
)()

function espera() {
    containerEspera.classList.add("active");
    tpmE = setTimeout(iniciarCronometro, 3000);
    tpmI = setInterval(diminuir, 1000);
}

function diminuir() {
    num--;
    tempoEspera.innerHTML = num;
}



function iniciarCronometro() {
    clearInterval(tpmE);
    clearInterval(tpmI);
    tempoEspera.innerHTML = 3;

    containerEspera.classList.remove("active");

    cronometrar();
    intervalo = setInterval(cronometrar, 16);
    tempoCor = setInterval(mudaCor, 1000);

    // configurar controles
    buttonIniciar.classList.add("d-none");
    buttonResume.classList.add("d-none");
    buttonPausar.classList.remove("d-none");
    buttonReiniciar.classList.remove("d-none");
}

function pausarCronometro() {
    buttonPausar.classList.add("d-none");
    buttonResume.classList.remove("d-none");

    clearInterval(intervalo);
    clearInterval(tempoCor);
}

function reiniciarCronometro() {
    buttonPausar.classList.add("d-none");
    buttonResume.classList.add("d-none");
    buttonReiniciar.classList.add("d-none")
    buttonIniciar.classList.remove("d-none");


    clearInterval(intervalo);
    clearInterval(tempoCor);
    m_segundos = 0;
    segundos = 0;
    minutos = 0;

    tempo.innerHTML = "00:00.00";
    num = 3;
}

function cronometrar() {
    m_segundos++;

    if(m_segundos == 60) {
        segundos++;
        m_segundos = 0;

        if(segundos == 60) {
            minutos++;
            segundos = 0;
        }
    }

    tempo.innerHTML = `${formatTime(minutos)}:${formatTime(segundos)}.${formatTime(m_segundos)}`;
}

function formatTime(_d) {
    if(_d < 10) {
        return "0" + _d;
    } else {
        return _d;
    }
}

function mudaCor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    tempo.style.color = `rgb(${r}, ${g}, ${b})`;
    tempoContainer.style.borderColor = `rgb(${r}, ${g}, ${b})`;
    cronometroContainer.style.borderColor = `rgb(${r}, ${g}, ${b})`;
    buttonIniciar.style.color = `rgb(${r}, ${g}, ${b})`;
    buttonPausar.style.color = `rgb(${r}, ${g}, ${b})`;
    buttonReiniciar.style.color = `rgb(${r}, ${g}, ${b})`;
    buttonResume.style.color = `rgb(${r}, ${g}, ${b})`;
}

