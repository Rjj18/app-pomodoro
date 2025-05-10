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

// Initialize AudioContext globally to reuse it
let audioContext;
let audioBuffer;

// Load the alarm sound into the AudioContext
async function initializeAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch('./sounds/alarm_clock.mp3');
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    }
}

// Play the alarm sound using AudioContext
function playAlarmSound() {
    if (!audioContext) {
        console.error('AudioContext is not initialized. Please interact with the page first.');
        return;
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    // Stop the sound after 10 seconds
    setTimeout(() => {
        source.stop();
    }, 10000);
}

// Ensure AudioContext is initialized after user interaction
window.addEventListener('click', initializeAudio, { once: true });

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
    isRunning = false;
    const currentTime = Date.now();
    remainingTime = Math.max(0, Math.floor((remainingTime * 1000 - (currentTime - startTime)) / 1000));
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Parar o timer
function stopTimer() {
    isRunning = false;
    remainingTime = 25 * 60; // Reset to 25 minutes in seconds
    updateDisplay(remainingTime);
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Atualizar o código do resetTimer para reiniciar imediatamente
function resetTimer() {
    isRunning = false;
    remainingTime = 25 * 60; // Reset to 25 minutes in seconds
    updateDisplay(remainingTime);
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    console.log('Timer reset to 25:00');
}

// Configurar pausa curta e iniciar o timer
function shortBreak() {
    isRunning = false;
    remainingTime = 0.2 * 60; // 5 minutes in seconds for short break
    updateDisplay(remainingTime);
    startTimer(); // Automatically start the timer
}

// Configurar pausa longa e iniciar o timer
function longBreak() {
    isRunning = false;
    remainingTime = 15 * 60; // 15 minutes in seconds for long break
    updateDisplay(remainingTime);
    startTimer(); // Automatically start the timer
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
