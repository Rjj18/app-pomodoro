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
let startTime;
let remainingTime = 25 * 60; // 25 minutes in seconds

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const endTime = Date.now() + remainingTime * 1000; // Calculate the end time

        function tick() {
            const currentTime = Date.now();
            const timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000));

            updateDisplay(timeLeft);

            if (timeLeft > 0 && isRunning) {
                requestAnimationFrame(tick); // Continue updating
            } else if (timeLeft === 0) {
                isRunning = false;
                playAlarmSound();
                resetTimer();
            }
        }

        requestAnimationFrame(tick); // Start the timer loop
    }
}

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
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
    remainingTime = 25 * 60; // Reset remaining time to 25 minutes
    updateDisplay(remainingTime); // Pass the correct timeLeft to updateDisplay
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    console.log('Timer reset to 25:00');
}

// Configurar pausa curta e iniciar o timer
function shortBreak() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = 5 * 60; // 5 minutos para pausa curta em segundos
    updateDisplay(remainingTime); // Atualiza o display com o tempo correto
    startTimer(); // Inicia o timer automaticamente
}

// Configurar pausa longa e iniciar o timer
function longBreak() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = 15 * 60; // 15 minutos para pausa longa em segundos
    updateDisplay(remainingTime); // Atualiza o display com o tempo correto
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
