// 数据存储和管理
let plans = {
    month: [
        {
            id: 'm1',
            stage: '基础阶段',
            time: '3月-4月中旬',
            tasks: [
                {
                    id: 'm1t1',
                    name: '初级会计网课学习',
                    details: '- 经济法第6-8章（3天/章），实务第4-8章（2天/章）- 每章学完后第1/2/7天早读复习（记忆曲线）'
                },
                {
                    id: 'm1t2',
                    name: '三支一扶知识积累',
                    details: '- 日均背诵1条政策（如"服务期满转编"）+1个申论案例（如"乡村振兴"）'
                }
            ]
        },
        {
            id: 'm2',
            stage: '强化阶段',
            time: '4月下旬-5月初',
            tasks: [
                {
                    id: 'm2t1',
                    name: '初级会计刷题冲刺',
                    details: '- 每日2小时真题（标注错误类型：计算/概念/粗心）- 错题隔日重做（睡前1小时）'
                },
                {
                    id: 'm2t2',
                    name: '三支一扶模块突破',
                    details: '- 行测分模块限时训练（资料分析≤1分钟/题）'
                }
            ]
        },
        {
            id: 'm3',
            stage: '冲刺阶段',
            time: '5月考试后',
            tasks: [
                {
                    id: 'm3t1',
                    name: '三支一扶全真模拟',
                    details: '- 每日1套行测+1篇申论（限时完成，自评得分）'
                }
            ]
        }
    ],
    day: {
        monday: [
            {
                id: 'd1',
                time: '7:00-7:30',
                name: '起床+早餐（鸡蛋/牛奶）',
                details: '健康管理：少碳水多蛋白'
            },
            {
                id: 'd2',
                time: '8:00-10:05',
                name: '经济法第6章网课（个税）+三色笔记整理',
                details: '每20分钟暂停复述防走神'
            },
            {
                id: 'd3',
                time: '12:00-14:00',
                name: '午休+刷三支一扶APP时政题',
                details: '定闹钟午睡30分钟'
            },
            {
                id: 'd4',
                time: '18:30-19:30',
                name: '慢跑15分钟+拉伸',
                details: '运动后冷水洗脸提神'
            },
            {
                id: 'd5',
                time: '19:30-20:30',
                name: '经济法第6章习题（标注错误类型）',
                details: '错题剪贴至错题本'
            }
        ],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    },
    weekend: {
        saturday: [
            {
                id: 'w1',
                time: '8:00-10:00',
                name: '模考《经济法》真题1套（限时90分钟）',
                details: ''
            },
            {
                id: 'w2',
                time: '10:00-12:00',
                name: '订正错题+重做易错题（如税率混淆）',
                details: ''
            },
            {
                id: 'w3',
                time: '14:00-16:00',
                name: '实务第5章网课（所有者权益）',
                details: ''
            }
        ],
        sunday: [
            {
                id: 'w4',
                time: '8:00-10:00',
                name: '行测全真模考（优先资料/判断推理）',
                details: ''
            },
            {
                id: 'w5',
                time: '16:00-18:00',
                name: '整理申论素材库（按产业/人才/生态分类）',
                details: ''
            }
        ]
    },
    notes: [
        {
            id: 'n1',
            name: '记忆曲线',
            details: '经济法法条按"1-2-7天"间隔复习（示例：周一学→周三默→周日测）。'
        },
        {
            id: 'n2',
            name: '健康管理',
            details: '运动：慢跑（一/三）、腹肌（四）、自由运动（五）\n饮食：早餐必吃蛋白质，午晚餐少碳水（杂粮饭+蔬菜）'
        },
        {
            id: 'n3',
            name: '弹性调整',
            details: '突发情况占用周五19:30-20:30或周日18:00-19:00补进度。'
        }
    ]
};

// 如果本地存储中有数据，则使用本地存储的数据
const savedPlans = localStorage.getItem('studyPlans');
if (savedPlans) {
    plans = JSON.parse(savedPlans);
}

// DOM元素
const navItems = document.querySelectorAll('nav li');
const planSections = document.querySelectorAll('.plan-section');
const dayBtns = document.querySelectorAll('.day-btn');
const weekendBtns = document.querySelectorAll('#weekend-plan .day-btn');
const addBtns = document.querySelectorAll('.add-plan-btn');
const modal = document.getElementById('plan-modal');
const closeModalBtn = document.querySelector('.close-modal');
const planForm = document.getElementById('plan-form');
const editIdInput = document.getElementById('edit-id');
const planTypeInput = document.getElementById('plan-type');
const stageNameInput = document.getElementById('stage-name');
const stageTimeInput = document.getElementById('stage-time');
const taskTimeInput = document.getElementById('task-time');
const taskNameInput = document.getElementById('task-name');
const taskDetailsInput = document.getElementById('task-details');
const saveBtn = document.getElementById('save-plan');
const deleteBtn = document.getElementById('delete-plan');

// 初始化应用
function initApp() {
    // 渲染所有计划
    renderMonthPlans();
    renderDayPlans('monday');
    renderWeekendPlans('saturday');
    renderNotes();

    // 保存到本地存储
    saveToLocalStorage();
}

// 保存数据到本地存储
function saveToLocalStorage() {
    localStorage.setItem('studyPlans', JSON.stringify(plans));
}

// 渲染月计划
function renderMonthPlans() {
    const container = document.querySelector('#month-plan .plan-container');
    container.innerHTML = '';

    plans.month.forEach(stage => {
        const stageCard = document.createElement('div');
        stageCard.className = 'stage-card';
        stageCard.dataset.id = stage.id;

        const stageTitle = document.createElement('div');
        stageTitle.className = 'stage-title';
        stageTitle.innerHTML = `
            ${stage.stage} <span>${stage.time}</span>
            <div class="edit-btns">
                <button class="edit-btn" data-id="${stage.id}" data-type="stage"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${stage.id}" data-type="stage"><i class="fas fa-trash"></i></button>
            </div>
        `;

        const stageGoals = document.createElement('div');
        stageGoals.className = 'stage-goals';

        stage.tasks.forEach(task => {
            const planCard = document.createElement('div');
            planCard.className = 'plan-card';
            planCard.dataset.id = task.id;
            planCard.innerHTML = `
                <h3>${task.name}
                    <div class="edit-btns">
                        <button class="edit-btn" data-id="${task.id}" data-stage-id="${stage.id}" data-type="month-task"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${task.id}" data-stage-id="${stage.id}" data-type="month-task"><i class="fas fa-trash"></i></button>
                    </div>
                </h3>
                <div class="details">${task.details}</div>
            `;
            stageGoals.appendChild(planCard);
        });

        stageCard.appendChild(stageTitle);
        stageCard.appendChild(stageGoals);
        container.appendChild(stageCard);
    });

    // 绑定编辑和删除按钮的事件
    bindEditDeleteEvents();
}

// 渲染日计划
function renderDayPlans(day) {
    const container = document.querySelector('.day-plan-container');
    container.innerHTML = '';

    if (plans.day[day] && plans.day[day].length > 0) {
        plans.day[day].forEach(task => {
            const planCard = document.createElement('div');
            planCard.className = 'plan-card';
            planCard.dataset.id = task.id;
            planCard.innerHTML = `
                <h3>${task.name}
                    <div class="edit-btns">
                        <button class="edit-btn" data-id="${task.id}" data-day="${day}" data-type="day"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${task.id}" data-day="${day}" data-type="day"><i class="fas fa-trash"></i></button>
                    </div>
                </h3>
                <p class="time">${task.time}</p>
                <div class="details">${task.details}</div>
            `;
            container.appendChild(planCard);
        });
    } else {
        container.innerHTML = '<div class="empty-message">当前没有计划，点击"添加任务"按钮添加新任务。</div>';
    }

    // 更新添加按钮的日期属性
    document.querySelector('#day-plan .add-plan-btn').dataset.day = day;

    // 绑定编辑和删除按钮的事件
    bindEditDeleteEvents();
}

// 渲染周末计划
function renderWeekendPlans(day) {
    const container = document.querySelector('.weekend-plan-container');
    container.innerHTML = '';

    if (plans.weekend[day] && plans.weekend[day].length > 0) {
        plans.weekend[day].forEach(task => {
            const planCard = document.createElement('div');
            planCard.className = 'plan-card';
            planCard.dataset.id = task.id;
            planCard.innerHTML = `
                <h3>${task.name}
                    <div class="edit-btns">
                        <button class="edit-btn" data-id="${task.id}" data-day="${day}" data-type="weekend"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${task.id}" data-day="${day}" data-type="weekend"><i class="fas fa-trash"></i></button>
                    </div>
                </h3>
                <p class="time">${task.time}</p>
                <div class="details">${task.details}</div>
            `;
            container.appendChild(planCard);
        });
    } else {
        container.innerHTML = '<div class="empty-message">当前没有计划，点击"添加任务"按钮添加新任务。</div>';
    }

    // 更新添加按钮的日期属性
    document.querySelector('#weekend-plan .add-plan-btn').dataset.day = day;

    // 绑定编辑和删除按钮的事件
    bindEditDeleteEvents();
}

// 渲染注意事项
function renderNotes() {
    const container = document.querySelector('.notes-container');
    container.innerHTML = '';

    plans.notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'plan-card';
        noteCard.dataset.id = note.id;
        noteCard.innerHTML = `
            <h3>${note.name}
                <div class="edit-btns">
                    <button class="edit-btn" data-id="${note.id}" data-type="note"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${note.id}" data-type="note"><i class="fas fa-trash"></i></button>
                </div>
            </h3>
            <div class="details">${note.details}</div>
        `;
        container.appendChild(noteCard);
    });

    // 绑定编辑和删除按钮的事件
    bindEditDeleteEvents();
}

// 绑定导航事件
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // 移除所有激活状态
        navItems.forEach(navItem => navItem.classList.remove('active'));
        planSections.forEach(section => section.classList.remove('active'));
        
        // 添加当前项的激活状态
        item.classList.add('active');
        const targetSection = document.getElementById(item.dataset.target);
        targetSection.classList.add('active');
        
        // 如果是计时器部分，初始化计时器（如果timer.js已加载）
        if (item.dataset.target === 'timer' && typeof initTimer === 'function') {
            initTimer();
        }
    });
});

// 绑定日期选择器事件
dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#day-plan .day-btn').forEach(dayBtn => dayBtn.classList.remove('active'));
        btn.classList.add('active');
        renderDayPlans(btn.dataset.day);
    });
});

weekendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#weekend-plan .day-btn').forEach(weekendBtn => weekendBtn.classList.remove('active'));
        btn.classList.add('active');
        renderWeekendPlans(btn.dataset.day);
    });
});

// 添加计划按钮事件
addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 重置表单
        planForm.reset();
        editIdInput.value = '';
        planTypeInput.value = btn.dataset.type;
        
        // 根据不同类型的表单显示/隐藏相应字段
        document.querySelectorAll('.month-field').forEach(field => {
            field.style.display = btn.dataset.type === 'month' ? 'block' : 'none';
        });
        
        document.querySelectorAll('.day-field, .weekend-field').forEach(field => {
            field.style.display = ['day', 'weekend'].includes(btn.dataset.type) ? 'block' : 'none';
        });
        
        // 更新模态框标题并显示
        document.querySelector('.modal-header h3').textContent = `添加${getTypeName(btn.dataset.type)}`;
        deleteBtn.style.display = 'none';
        
        // 如果是添加日计划或周末计划，添加day属性
        if (btn.dataset.type === 'day' || btn.dataset.type === 'weekend') {
            planForm.dataset.day = btn.dataset.day;
        } else {
            delete planForm.dataset.day;
        }
        
        // 显示模态框
        modal.style.display = 'flex';
    });
});

// 关闭模态框事件
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 点击模态框外部关闭模态框
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 保存计划
planForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const type = planTypeInput.value;
    const id = editIdInput.value || generateId();
    
    // 根据不同类型保存不同的计划
    if (type === 'month') {
        saveMonthPlan(id);
    } else if (type === 'day') {
        saveDayPlan(id, planForm.dataset.day);
    } else if (type === 'weekend') {
        saveWeekendPlan(id, planForm.dataset.day);
    } else if (type === 'note') {
        saveNote(id);
    } else if (type === 'month-task') {
        saveMonthTask(id, planForm.dataset.stageId);
    }
    
    // 保存到本地存储
    saveToLocalStorage();
    
    // 关闭模态框
    modal.style.display = 'none';
});

// 保存月计划
function saveMonthPlan(id) {
    const stageName = stageNameInput.value;
    const stageTime = stageTimeInput.value;
    const taskName = taskNameInput.value;
    const taskDetails = taskDetailsInput.value;
    
    // 检查是否是编辑现有阶段
    const existingStageIndex = plans.month.findIndex(stage => stage.id === id);
    
    if (existingStageIndex !== -1) {
        // 更新现有阶段
        plans.month[existingStageIndex].stage = stageName;
        plans.month[existingStageIndex].time = stageTime;
    } else {
        // 添加新阶段
        const newStage = {
            id,
            stage: stageName,
            time: stageTime,
            tasks: []
        };
        
        // 如果有任务名称，添加第一个任务
        if (taskName) {
            newStage.tasks.push({
                id: generateId(),
                name: taskName,
                details: taskDetails
            });
        }
        
        plans.month.push(newStage);
    }
    
    // 重新渲染月计划
    renderMonthPlans();
}

// 保存月计划任务
function saveMonthTask(taskId, stageId) {
    const taskName = taskNameInput.value;
    const taskDetails = taskDetailsInput.value;
    
    // 查找对应的阶段
    const stageIndex = plans.month.findIndex(stage => stage.id === stageId);
    
    if (stageIndex !== -1) {
        const taskIndex = plans.month[stageIndex].tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            // 更新现有任务
            plans.month[stageIndex].tasks[taskIndex].name = taskName;
            plans.month[stageIndex].tasks[taskIndex].details = taskDetails;
        } else {
            // 添加新任务
            plans.month[stageIndex].tasks.push({
                id: taskId,
                name: taskName,
                details: taskDetails
            });
        }
    }
    
    // 重新渲染月计划
    renderMonthPlans();
}

// 保存日计划
function saveDayPlan(id, day) {
    const taskTime = taskTimeInput.value;
    const taskName = taskNameInput.value;
    const taskDetails = taskDetailsInput.value;
    
    // 确保日计划数组存在
    if (!plans.day[day]) {
        plans.day[day] = [];
    }
    
    // 检查是否是编辑现有任务
    const existingTaskIndex = plans.day[day].findIndex(task => task.id === id);
    
    if (existingTaskIndex !== -1) {
        // 更新现有任务
        plans.day[day][existingTaskIndex].time = taskTime;
        plans.day[day][existingTaskIndex].name = taskName;
        plans.day[day][existingTaskIndex].details = taskDetails;
    } else {
        // 添加新任务
        plans.day[day].push({
            id,
            time: taskTime,
            name: taskName,
            details: taskDetails
        });
    }
    
    // 重新渲染日计划
    renderDayPlans(day);
}

// 保存周末计划
function saveWeekendPlan(id, day) {
    const taskTime = taskTimeInput.value;
    const taskName = taskNameInput.value;
    const taskDetails = taskDetailsInput.value;
    
    // 确保周末计划数组存在
    if (!plans.weekend[day]) {
        plans.weekend[day] = [];
    }
    
    // 检查是否是编辑现有任务
    const existingTaskIndex = plans.weekend[day].findIndex(task => task.id === id);
    
    if (existingTaskIndex !== -1) {
        // 更新现有任务
        plans.weekend[day][existingTaskIndex].time = taskTime;
        plans.weekend[day][existingTaskIndex].name = taskName;
        plans.weekend[day][existingTaskIndex].details = taskDetails;
    } else {
        // 添加新任务
        plans.weekend[day].push({
            id,
            time: taskTime,
            name: taskName,
            details: taskDetails
        });
    }
    
    // 重新渲染周末计划
    renderWeekendPlans(day);
}

// 保存注意事项
function saveNote(id) {
    const noteName = taskNameInput.value;
    const noteDetails = taskDetailsInput.value;
    
    // 检查是否是编辑现有注意事项
    const existingNoteIndex = plans.notes.findIndex(note => note.id === id);
    
    if (existingNoteIndex !== -1) {
        // 更新现有注意事项
        plans.notes[existingNoteIndex].name = noteName;
        plans.notes[existingNoteIndex].details = noteDetails;
    } else {
        // 添加新注意事项
        plans.notes.push({
            id,
            name: noteName,
            details: noteDetails
        });
    }
    
    // 重新渲染注意事项
    renderNotes();
}

// 删除计划
deleteBtn.addEventListener('click', () => {
    const id = editIdInput.value;
    const type = planTypeInput.value;
    
    if (!id) return;
    
    if (type === 'month') {
        // 删除整个阶段
        plans.month = plans.month.filter(stage => stage.id !== id);
        renderMonthPlans();
    } else if (type === 'month-task') {
        // 删除月计划中的任务
        const stageId = planForm.dataset.stageId;
        const stageIndex = plans.month.findIndex(stage => stage.id === stageId);
        
        if (stageIndex !== -1) {
            plans.month[stageIndex].tasks = plans.month[stageIndex].tasks.filter(task => task.id !== id);
            renderMonthPlans();
        }
    } else if (type === 'day') {
        // 删除日计划
        const day = planForm.dataset.day;
        plans.day[day] = plans.day[day].filter(task => task.id !== id);
        renderDayPlans(day);
    } else if (type === 'weekend') {
        // 删除周末计划
        const day = planForm.dataset.day;
        plans.weekend[day] = plans.weekend[day].filter(task => task.id !== id);
        renderWeekendPlans(day);
    } else if (type === 'note') {
        // 删除注意事项
        plans.notes = plans.notes.filter(note => note.id !== id);
        renderNotes();
    }
    
    // 保存到本地存储
    saveToLocalStorage();
    
    // 关闭模态框
    modal.style.display = 'none';
});

// 绑定编辑和删除按钮的事件
function bindEditDeleteEvents() {
    // 绑定编辑按钮事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            
            // 重置表单
            planForm.reset();
            editIdInput.value = id;
            planTypeInput.value = type;
            
            // 根据不同类型的表单显示/隐藏相应字段
            document.querySelectorAll('.month-field').forEach(field => {
                field.style.display = type === 'month' ? 'block' : 'none';
            });
            
            document.querySelectorAll('.day-field, .weekend-field').forEach(field => {
                field.style.display = ['day', 'weekend'].includes(type) ? 'block' : 'none';
            });
            
            // 加载编辑数据
            if (type === 'month') {
                // 编辑月计划阶段
                const stage = plans.month.find(s => s.id === id);
                if (stage) {
                    stageNameInput.value = stage.stage;
                    stageTimeInput.value = stage.time;
                }
            } else if (type === 'month-task') {
                // 编辑月计划任务
                const stageId = btn.dataset.stageId;
                const stage = plans.month.find(s => s.id === stageId);
                if (stage) {
                    const task = stage.tasks.find(t => t.id === id);
                    if (task) {
                        taskNameInput.value = task.name;
                        taskDetailsInput.value = task.details;
                        planForm.dataset.stageId = stageId;
                    }
                }
            } else if (type === 'day') {
                // 编辑日计划
                const day = btn.dataset.day;
                const task = plans.day[day].find(t => t.id === id);
                if (task) {
                    taskTimeInput.value = task.time;
                    taskNameInput.value = task.name;
                    taskDetailsInput.value = task.details;
                    planForm.dataset.day = day;
                }
            } else if (type === 'weekend') {
                // 编辑周末计划
                const day = btn.dataset.day;
                const task = plans.weekend[day].find(t => t.id === id);
                if (task) {
                    taskTimeInput.value = task.time;
                    taskNameInput.value = task.name;
                    taskDetailsInput.value = task.details;
                    planForm.dataset.day = day;
                }
            } else if (type === 'note') {
                // 编辑注意事项
                const note = plans.notes.find(n => n.id === id);
                if (note) {
                    taskNameInput.value = note.name;
                    taskDetailsInput.value = note.details;
                }
            }
            
            // 更新模态框标题并显示
            document.querySelector('.modal-header h3').textContent = `编辑${getTypeName(type)}`;
            deleteBtn.style.display = 'block';
            
            // 显示模态框
            modal.style.display = 'flex';
        });
    });
    
    // 绑定删除按钮事件
    document.querySelectorAll('.delete-btn[data-type]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            
            if (confirm('确定要删除这项计划吗？')) {
                if (type === 'stage') {
                    // 删除整个阶段
                    plans.month = plans.month.filter(stage => stage.id !== id);
                    renderMonthPlans();
                } else if (type === 'month-task') {
                    // 删除月计划中的任务
                    const stageId = btn.dataset.stageId;
                    const stageIndex = plans.month.findIndex(stage => stage.id === stageId);
                    
                    if (stageIndex !== -1) {
                        plans.month[stageIndex].tasks = plans.month[stageIndex].tasks.filter(task => task.id !== id);
                        renderMonthPlans();
                    }
                } else if (type === 'day') {
                    // 删除日计划
                    const day = btn.dataset.day;
                    plans.day[day] = plans.day[day].filter(task => task.id !== id);
                    renderDayPlans(day);
                } else if (type === 'weekend') {
                    // 删除周末计划
                    const day = btn.dataset.day;
                    plans.weekend[day] = plans.weekend[day].filter(task => task.id !== id);
                    renderWeekendPlans(day);
                } else if (type === 'note') {
                    // 删除注意事项
                    plans.notes = plans.notes.filter(note => note.id !== id);
                    renderNotes();
                }
                
                // 保存到本地存储
                saveToLocalStorage();
            }
        });
    });
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// 获取计划类型名称
function getTypeName(type) {
    const typeNames = {
        'month': '月计划阶段',
        'month-task': '月计划任务',
        'day': '日计划',
        'weekend': '周末计划',
        'note': '注意事项'
    };
    
    return typeNames[type] || '计划';
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp); 