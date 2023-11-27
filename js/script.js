{
  let tasks = [];
  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = task = `
        <li class="
        tasks__item${
          task.done && hideDoneTasks ? " task__item--hidden" : ""
        } js-task
        ">
        <button class="tasks__button tasks__button--toggleDone js-toggleDone">
        ${task.done ? "✔" : ""}
        </button>
        <span class="tasks__content${
          task.done ? "tasks__content--done" : ""
        }">${task.content}</span>
        <button class="tasks__button tasks__button--remove js-remove">
        🗑️
        </button>
        </li>
      `;

    const tasksElement = document.querySelectorAll(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelectorAll(".js-buttons");
    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="button__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Show" : "Hide"} Done Tasks
      </button>
      <button 
        class="button__button js-markAllDone" 
        ${tasks.every(({ done }) => done) ? " disabled" : ""}
        >
         Finish all tasks
         </button>
      `;
  };
  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelectorAll(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTaskDone);
    }

    const toggleHideDoneTasksButton = document.querySelectorAll(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
