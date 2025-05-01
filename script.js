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

// Formatar o tempo (adicionar zero à esquerda quando necessário)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Atualizar o display do timer
function updateDisplay() {
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Iniciar o timer
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
                    alert('Tempo concluído!');
                    resetTimer();
                    // Aqui podemos adicionar código para salvar a sessão concluída
                    savePomodoroSession();
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

// Reiniciar o timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Configurar pausa curta
function shortBreak() {
    clearInterval(timer);
    isRunning = false;
    minutes = 5; // 5 minutos para pausa curta
    seconds = 0;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Configurar pausa longa
function longBreak() {
    clearInterval(timer);
    isRunning = false;
    minutes = 15; // 15 minutos para pausa longa
    seconds = 0;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Função para salvar a sessão (será implementada mais tarde)
function savePomodoroSession() {
    // Esta função será usada para enviar dados ao servidor
    console.log('Sessão Pomodoro concluída');
    // Futuramente: fetch para API
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click', shortBreak);
longBreakBtn.addEventListener('click', longBreak);