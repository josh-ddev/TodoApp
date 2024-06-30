'use strict';
const inputTodo = document.querySelector('.todo-input');
const inputTodoBtn = document.querySelector('.input-btn');
const inputTodoContainer = document.querySelector('.input-todo-container');
const todosContainer = document.querySelector('.todos-container');
const filtersContainer = document.querySelector('.filters-container');
const todoBtn = document.querySelector('.todo-btn');
const todos = document.querySelector('.todos');
const todoItem = document.querySelector('.todo-list');
const todoLeft = document.querySelector('.todo-left');
const descTheme = document.querySelector('.desc-theme');
const filters = document.querySelector('.filters');
let darkTheme = document.querySelector('.dark');
let lightTheme = document.querySelector('.light');
let body = document.querySelector('body');
const container = document.querySelector('.container');
const filtersMobile = document.querySelector('.filters-mobile');
let arr = [];

// LIGHT MODE/ DARK MODE
descTheme.addEventListener('click', e => {
  if (e.target.closest('svg').classList.contains('theme')) {
    lightTheme.classList.toggle('none');
    darkTheme.classList.toggle('none');

    if (lightTheme.classList.contains('none') === false) {
      container.classList.add('light');
      body.style.background = 'hsl(236, 33%, 92%)';
      todosContainer.classList.add('bright');
      inputTodo.classList.add('bright');
      filtersMobile.style.background = 'white';
    }
    if (darkTheme.classList.contains('none') === false) {
      container.classList.remove('light');
      body.style.background = 'hsl(237, 14%, 26%)';
      todosContainer.classList.remove('bright');
      inputTodo.classList.remove('bright');
      filtersMobile.style.background = ' hsl(235, 24%, 19%)';
    }
  }
});

//ADD TODO
const addTodo = function (todo) {
  let li = document.createElement('li');
  li.classList.add('todo-list');
  li.textContent = `${todo}`;
  let bt = document.createElement('button');
  let svgCheck = `<svg xmlns="http://www.w3.org/2000/svg" class ='none' width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        stroke-width="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>`;
  let crossSVg = `  <svg
              xmlns="http://www.w3.org/2000/svg"
              class="cross none "
              width="18"
              height="18"
            >
              <path
                fill="#494C6B"
                fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>`;
  bt.insertAdjacentHTML('afterbegin', svgCheck);

  bt.classList.add('todo-btn');
  li.insertAdjacentElement('afterbegin', bt);
  li.insertAdjacentHTML('beforeend', crossSVg);
  todos.insertAdjacentElement('afterbegin', li);
  arr.push(li);
  todoLeft.textContent = arr.length;
  inputTodo.value = '';
};

//SET TODO CONTAINER EMPTY
const setTodoListEmpty = function () {
  todos.innerHTML = '';
};

//TODO
inputTodoContainer.addEventListener('click', e => {
  if (e.target === inputTodoBtn && inputTodo.value !== '') {
    addTodo(inputTodo.value);
  }
});

inputTodoContainer.addEventListener('keypress', e => {
  if (e.key === 'Enter' && inputTodo.value !== '') {
    addTodo(inputTodo.value);
  }
});

//filter Function(all,active,completed)

const removeCurrent = function () {
  Array.from(filters.children).forEach(e => {
    e.classList.remove('current');
  });
  Array.from(filtersMobile.children).forEach(e => {
    e.classList.remove('current');
  });
};
const filterHandler = function (e) {
  if (e.target.classList.contains('active')) {
    removeCurrent();
    e.target.classList.add('current');
    setTodoListEmpty();
    arr
      .filter(elem => !elem.classList.contains('strike'))
      .forEach(e => {
        todos.insertAdjacentElement('afterbegin', e);
      });
  }
  if (e.target.classList.contains('completed')) {
    removeCurrent();
    e.target.classList.add('current');
    // const a = Array.from(todos.children);
    setTodoListEmpty();
    let b = arr.filter(elem => elem.classList.contains('strike'));
    b.forEach(e => {
      todos.insertAdjacentElement('beforeend', e);
    });
  }
  if (e.target.classList.contains('all')) {
    removeCurrent();
    e.target.classList.add('current');
    setTodoListEmpty();
    arr.forEach(e => {
      todos.insertAdjacentElement('afterbegin', e);
      todoLeft.textContent = arr.filter(
        e => !e.classList.contains('strike')
      ).length;
    });
  }
};

todosContainer.addEventListener('click', e => {
  if (e.target.classList.contains('todo-btn')) {
    e.target.children[0].classList.toggle('none');
    e.target.parentElement.classList.toggle('strike');
    e.target.classList.toggle('checked');
    let remainingTodo = arr.filter(e => e.classList.contains('strike')).length;
    todoLeft.textContent = arr.length - remainingTodo;
  }
  if (e.target.closest('.cross')) {
    const li = e.target.closest('li');
    li.remove();
    arr = arr.filter(item => item !== li);
    todoLeft.textContent = arr.filter(
      e => !e.classList.contains('strike')
    ).length;
  }
  filterHandler(e);
  if (
    e.target.classList.contains('clear--completed') &&
    arr.some(e => e.classList.contains('strike'))
  ) {
    setTodoListEmpty();
    arr.forEach((e, i) => {
      if (e.classList.contains('strike')) {
        arr.splice(i);
        arr.forEach(e => todos.insertAdjacentElement('beforeend', e));
      }
    });
    // document.querySelector('.completed').classList.remove('current');
    // document.querySelector('.all').classList.add('current');
    document.querySelectorAll('.completed').forEach(e => {
      e.classList.remove('current');
    });
    document.querySelectorAll('.all').forEach(e => {
      e.classList.add('current');
    });
  }
});

//mobile filter
filtersMobile.addEventListener('click', e => {
  filterHandler(e);
});

//Mouse event to display Delete button
todos.addEventListener('mouseover', e => {
  if (e.target.closest('li')) {
    const crossSvg = e.target.closest('li').querySelector('.cross');
    if (crossSvg) crossSvg.classList.remove('none');
  }
});

todos.addEventListener('mouseout', e => {
  if (e.target.closest('li')) {
    const crossSvg = e.target.closest('li').querySelector('.cross');
    if (crossSvg) crossSvg.classList.add('none');
  }
});
