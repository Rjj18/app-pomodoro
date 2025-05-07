// Variáveis para controlar o timer
let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;

// Elementos do DOM
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const stopBtn = document.getElementById('stopBtn');

// Formatar o tempo (adicionar zero à esquerda quando necessário)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Atualizar o display do timer
function updateDisplay() {
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Função para tocar o som do alarme
function playAlarmSound() {
    const alarmSound = new Audio('./sounds/alarm_clock.mp3');
    alarmSound.play()
    setTimeout(() => {
        alarmSound.pause(); // Pausa o som após 10 segundos
        alarmSound.currentTime = 0; // Reseta o tempo do som
    }, 10000); // 10000 milissegundos = 10 segundos
}

// Atualizar o código do startTimer para esperar 10 segundos apenas quando o tempo acabar
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    // Timer concluído
                    clearInterval(timer);
                    isRunning = false;
                    playAlarmSound(); // Toca o som do alarme
                    setTimeout(() => {
                        resetTimer(); // Reseta o timer após 10 segundos
                    }, 10000);
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

// Pausar o timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Parar o timer
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Atualizar o código do resetTimer para reiniciar imediatamente
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    console.log('Timer reset to 25:00');
}

// Configurar pausa curta e iniciar o timer
function shortBreak() {
    clearInterval(timer);
    isRunning = false;
    minutes = 5; // 5 minutos para pausa curta
    seconds = 0;
    updateDisplay();
    startTimer(); // Inicia o timer automaticamente
}

// Configurar pausa longa e iniciar o timer
function longBreak() {
    clearInterval(timer);
    isRunning = false;
    minutes = 15; // 15 minutos para pausa longa
    seconds = 0;
    updateDisplay();
    startTimer(); // Inicia o timer automaticamente
}

// Função para salvar a sessão (será implementada mais tarde)
function savePomodoroSession() {
    // Esta função será usada para enviar dados ao servidor
    console.log('Sessão Pomodoro concluída');
    // Futuramente: fetch para API
}

// Event listeners
startBtn.addEventListener('click', () => {
    resetTimer(); // Reseta para 25 minutos
    startTimer(); // Inicia o timer automaticamente
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click', shortBreak);
longBreakBtn.addEventListener('click', longBreak);
stopBtn.addEventListener('click', stopTimer);
