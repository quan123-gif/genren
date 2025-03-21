// 计时器状态
let timerState = {
    mode: 'work', // 工作或休息模式
    minutes: 25,  // 默认25分钟
    seconds: 0,   // 0秒
    totalSeconds: 25 * 60, // 总秒数
    remainingSeconds: 25 * 60, // 剩余秒数
    timerInterval: null, // 计时器间隔
    isRunning: false // 是否正在运行
};

// DOM元素
const timerContainer = document.querySelector('.timer-container');
const modeBtns = document.querySelectorAll('.mode-btn');
const presetBtns = document.querySelectorAll('.preset-btn');
const customMinutesInput = document.getElementById('custom-minutes');
const applyCustomBtn = document.getElementById('apply-custom');
const timerDisplay = document.querySelector('.timer-time');
const timerProgress = document.querySelector('.timer-progress');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');

// 初始化
function initTimer() {
    // 设置初始模式颜色
    timerContainer.classList.add('work-mode');
    
    // 设置初始进度
    updateTimerDisplay();
    updateProgressBar(100);
    
    // 绑定事件
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 模式切换
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            changeMode(mode);
        });
    });
    
    // 预设时间选择
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const minutes = parseInt(btn.dataset.time);
            setTimerDuration(minutes);
        });
    });
    
    // 自定义时间
    applyCustomBtn.addEventListener('click', () => {
        const customMinutes = parseInt(customMinutesInput.value);
        if (customMinutes && customMinutes > 0 && customMinutes <= 120) {
            presetBtns.forEach(b => b.classList.remove('active'));
            setTimerDuration(customMinutes);
        } else {
            alert('请输入1至120之间的分钟数');
            customMinutesInput.focus();
        }
    });
    
    // 计时器控制
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

// 切换模式
function changeMode(mode) {
    // 更新激活按钮
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // 更新模式和容器类
    timerState.mode = mode;
    timerContainer.classList.remove('work-mode', 'rest-mode');
    timerContainer.classList.add(`${mode}-mode`);
    
    // 如果正在运行，停止计时器
    if (timerState.isRunning) {
        pauseTimer();
    }
    
    // 根据模式设置默认时间
    if (mode === 'work') {
        setTimerDuration(25);
        presetBtns[0].classList.add('active');
        presetBtns[1].classList.remove('active');
        presetBtns[2].classList.remove('active');
    } else {
        setTimerDuration(5);
        presetBtns.forEach(btn => btn.classList.remove('active'));
    }
}

// 设置计时器时长
function setTimerDuration(minutes) {
    timerState.minutes = minutes;
    timerState.seconds = 0;
    timerState.totalSeconds = minutes * 60;
    timerState.remainingSeconds = minutes * 60;
    
    // 更新显示
    updateTimerDisplay();
    updateProgressBar(100);
}

// 更新计时器显示
function updateTimerDisplay() {
    const minutes = String(timerState.minutes).padStart(2, '0');
    const seconds = String(timerState.seconds).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

// 更新进度条
function updateProgressBar(percentRemaining) {
    // 设置进度条比例
    timerProgress.style.setProperty('--progress-percent', `${percentRemaining}%`);
}

// 启动计时器
function startTimer() {
    // 如果已经在运行，不需要再次启动
    if (timerState.isRunning) return;
    
    // 设置状态为运行中
    timerState.isRunning = true;
    
    // 启动间隔
    timerState.timerInterval = setInterval(() => {
        // 如果剩余秒数为0，停止计时器
        if (timerState.remainingSeconds <= 0) {
            clearInterval(timerState.timerInterval);
            timerState.isRunning = false;
            playAlarmSound();
            return;
        }
        
        // 减少剩余秒数
        timerState.remainingSeconds--;
        
        // 计算分钟和秒数
        timerState.minutes = Math.floor(timerState.remainingSeconds / 60);
        timerState.seconds = timerState.remainingSeconds % 60;
        
        // 更新显示
        updateTimerDisplay();
        
        // 更新进度条
        const percentRemaining = (timerState.remainingSeconds / timerState.totalSeconds) * 100;
        updateProgressBar(percentRemaining);
    }, 1000);
}

// 暂停计时器
function pauseTimer() {
    if (!timerState.isRunning) return;
    
    clearInterval(timerState.timerInterval);
    timerState.isRunning = false;
}

// 重置计时器
function resetTimer() {
    // 停止计时器
    if (timerState.isRunning) {
        clearInterval(timerState.timerInterval);
        timerState.isRunning = false;
    }
    
    // 重置时间
    const activePreset = document.querySelector('.preset-btn.active');
    let minutes = 25; // 默认值
    
    if (activePreset) {
        minutes = parseInt(activePreset.dataset.time);
    }
    
    setTimerDuration(minutes);
}

// 播放闹铃声音
function playAlarmSound() {
    // 可以添加声音播放代码
    // 例如：
    // const audio = new Audio('path/to/alarm.mp3');
    // audio.play();
    
    // 临时使用alert
    alert(`${timerState.mode === 'work' ? '工作' : '休息'}时间结束！`);
    
    // 可以自动切换到另一个模式
    if (timerState.mode === 'work') {
        changeMode('rest');
    } else {
        changeMode('work');
    }
}

// 在页面加载完成时初始化计时器
document.addEventListener('DOMContentLoaded', () => {
    // 首先确保专注计时器的选项卡可以正常工作
    const timerNavItem = document.querySelector('nav li[data-target="timer"]');
    if (timerNavItem) {
        timerNavItem.addEventListener('click', () => {
            // 确保计时器初始化
            initTimer();
        });
    }
    
    // 检查如果计时器部分是可见的，则初始化
    const timerSection = document.getElementById('timer');
    if (timerSection && window.getComputedStyle(timerSection).display !== 'none') {
        initTimer();
    }
}); 