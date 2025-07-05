// Variáveis para controlar o timer
let timer;
let isRunning = false;
let remainingTime = 25 * 60; // 25 minutes in seconds

// Elementos do DOM
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const stopBtn = document.getElementById('stopBtn');
const continueBtn = document.getElementById('continueBtn'); // Adicionando funcionalidade para o botão continuar
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

// Formatar o tempo (adicionar zero à esquerda quando necessário)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Atualizar o display do timer
function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Ajustando a função playAlarmSound para garantir a reprodução em abas inativas
function playAlarmSound() {
    // Usa um arquivo de áudio para garantir compatibilidade em abas inativas
    const audio = new Audio('sounds/alarm_clock.mp3');
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch((e) => {
        // Caso o navegador bloqueie, tenta desbloquear após interação do usuário
        document.body.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
}

// Certifique-se de que o contexto de áudio seja desbloqueado após a interação inicial do usuário
window.addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

// Atualizar o código do startTimer para esperar 10 segundos apenas quando o tempo acabar
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = 'none'; // Esconde o botão iniciar
        pauseBtn.style.display = 'inline-block'; // Mostra o botão pausar

        const startTime = Date.now();
        const endTime = startTime + remainingTime * 1000; // Calcula o tempo final

        timer = setInterval(() => {
            const currentTime = Date.now();
            remainingTime = Math.max(0, Math.round((endTime - currentTime) / 1000)); // Atualiza o tempo restante com maior precisão

            updateDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                playAlarmSound();
                resetTimer();
            }
        }, 1000); // Atualiza a cada segundo
    }
}

// Pausar o timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    continueBtn.style.display = 'inline-block'; // Mostra o botão continuar
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
    continueBtn.style.display = 'none'; // Esconde o botão continuar
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

// Função para continuar o timer
function continueTimer() {
    if (!isRunning) {
        isRunning = true;
        continueBtn.style.display = 'none'; // Esconde o botão continuar
        pauseBtn.style.display = 'inline-block'; // Mostra o botão pausar

        const startTime = Date.now();
        const endTime = startTime + remainingTime * 1000; // Calcula o tempo final

        timer = setInterval(() => {
            const currentTime = Date.now();
            remainingTime = Math.max(0, Math.floor((endTime - currentTime) / 1000)); // Atualiza o tempo restante

            updateDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                playAlarmSound();
                resetTimer();
            }
        }, 500); // Atualiza a cada 500ms para maior precisão
    }
}

// Alternar entre tema padrão e tema hacker
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('hacker-theme');
        if (document.body.classList.contains('hacker-theme')) {
            // Ícone para tema claro (sol)
            themeIcon.className = 'bi bi-sun-fill';
        } else {
            // Ícone para tema hacker (terminal)
            themeIcon.className = 'bi bi-terminal-fill';
        }
    });
}

// Garante que o ícone inicial está correto ao abrir a página e carrega as tarefas
window.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('hacker-theme')) {
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        themeIcon.className = 'bi bi-terminal-fill';
    }
    
    // Load tasks after DOM is ready
    loadTasks();
});

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
continueBtn.addEventListener('click', continueTimer); // Adicionando event listener para o botão continuar

// ========================================
// TASK MANAGEMENT FUNCTIONALITY
// ========================================

// Task management variables
let tasks = [];
let taskIdCounter = 1;

// Task management DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('pomodoroTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        // Update task counter to avoid ID conflicts
        if (tasks.length > 0) {
            taskIdCounter = Math.max(...tasks.map(task => task.id)) + 1;
        }
    }
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        taskInput.focus();
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask); // Add to beginning of array
    taskInput.value = '';
    saveTasks();
    renderTasks();
    taskInput.focus();
}

// Toggle task completion
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
}

// Edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newText = prompt('Editar tarefa:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Render all tasks
function renderTasks() {
    if (tasks.length === 0) {
        taskList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    taskList.style.display = 'block';
    emptyState.style.display = 'none';

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id})">
                <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="editTask(${task.id})" title="Editar">
                    <span class="bi bi-pencil"></span>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})" title="Excluir">
                    <span class="bi bi-trash"></span>
                </button>
            </div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Task management event listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize tasks when DOM is loaded
