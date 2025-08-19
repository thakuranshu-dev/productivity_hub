// ---- Navigation ----
const navButtons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('main section');
navButtons.forEach(btn => btn.addEventListener('click', () => {
  navButtons.forEach(b=>b.classList.remove('active'));
  sections.forEach(s=>s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.add('active');
}));

// ---- Todo ----
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

window.addEventListener('load', ()=>{
  const loader=document.getElementById('loader');
  loader.style.opacity='1';
  setTimeout(()=>loader.style.display='none',500);
});

function loadTodos(){
  const todos = JSON.parse(localStorage.getItem('todos')||'[]');
  todoList.innerHTML='';
  todos.forEach((t,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>${t}</span> <button data-i="${i}">Delete</button>`;
    li.querySelector('button').onclick=()=>{deleteTodo(i)};
    todoList.appendChild(li);
  });
}
function saveTodos(todos){ localStorage.setItem('todos', JSON.stringify(todos)); }
function deleteTodo(i){
  const todos = JSON.parse(localStorage.getItem('todos')||'[]');
  todos.splice(i,1); saveTodos(todos); loadTodos();
}
todoForm.onsubmit=e=>{
  e.preventDefault();
  const val=todoInput.value.trim();
  if(!val) return;
  const todos = JSON.parse(localStorage.getItem('todos')||'[]');
  todos.push(val); saveTodos(todos); loadTodos();
  todoInput.value='';
};
loadTodos();

// ---- Notes ----
const noteForm=document.getElementById('noteForm');
const noteInput=document.getElementById('noteInput');
const noteList=document.getElementById('noteList');

function loadNotes(){
  const notes=JSON.parse(localStorage.getItem('notes')||'[]');
  noteList.innerHTML='';
  notes.forEach((n,i)=>{
    const div=document.createElement('div');
    div.className='note';
    div.innerHTML=`<p>${n}</p><button data-i="${i}">x</button>`;
    div.querySelector('button').onclick=()=>{deleteNote(i)};
    noteList.appendChild(div);
  });
}
function saveNotes(notes){ localStorage.setItem('notes', JSON.stringify(notes)); }
function deleteNote(i){
  const notes=JSON.parse(localStorage.getItem('notes')||'[]');
  notes.splice(i,1); saveNotes(notes); loadNotes();
}
noteForm.onsubmit=e=>{
  e.preventDefault();
  const val=noteInput.value.trim();
  if(!val) return;
  const notes=JSON.parse(localStorage.getItem('notes')||'[]');
  notes.push(val); saveNotes(notes); loadNotes();
  noteInput.value='';
};
loadNotes();

// ---- Timer ----
let timer = null, timerSeconds = 0, timerInitial = 0;
const display = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timerSetForm = document.getElementById('timerSetForm');
const timerHours = document.getElementById('timerHours');
const timerMinutes = document.getElementById('timerMinutes');
const timerSecondsInput = document.getElementById('timerSeconds');
function renderTime() {
  const h = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  display.textContent = `${h}:${m}:${s}`;
}
function start() {
  if (timer || timerSeconds <= 0) return;
  timer = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      renderTime();
    } else {
      stop();
    }
  }, 1000);
}
function stop() {
  clearInterval(timer); timer = null;
}
function reset() {
  stop(); timerSeconds = timerInitial; renderTime();
}
timerSetForm.onsubmit = e => {
  e.preventDefault();
  const h = parseInt(timerHours.value, 10) || 0;
  const m = parseInt(timerMinutes.value, 10) || 0;
  const s = parseInt(timerSecondsInput.value, 10) || 0;
  timerSeconds = h * 3600 + m * 60 + s;
  timerInitial = timerSeconds;
  renderTime();
  stop();
};
startBtn.onclick = start;
stopBtn.onclick = stop;
resetBtn.onclick = reset;
renderTime();

// ---- Stopwatch ----
let swTimer = null, swElapsed = 0;
const swDisplay = document.getElementById('stopwatchDisplay');
const swStartBtn = document.getElementById('swStartBtn');
const swStopBtn = document.getElementById('swStopBtn');
const swResetBtn = document.getElementById('swResetBtn');

function renderStopwatch() {
  const h = String(Math.floor(swElapsed / 3600)).padStart(2, '0');
  const m = String(Math.floor((swElapsed % 3600) / 60)).padStart(2, '0');
  const s = String(swElapsed % 60).padStart(2, '0');
  swDisplay.textContent = `${h}:${m}:${s}`;
}
function swStart() {
  if (swTimer) return;
  swTimer = setInterval(() => { swElapsed++; renderStopwatch(); }, 1000);
}
function swStop() {
  clearInterval(swTimer); swTimer = null;
}
function swReset() {
  swStop(); swElapsed = 0; renderStopwatch();
}
swStartBtn.onclick = swStart;
swStopBtn.onclick = swStop;
swResetBtn.onclick = swReset;
renderStopwatch();