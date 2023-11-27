{
   let tasks = [];
   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {
       tasks = [
           ...tasks,
           { content: newTaskContent },];

       render();
   };

   const removeTask = (taskIndex) => {
       tasks = [
           ...tasks.slice(0, taskIndex),
           ...tasks.slice(taskIndex + 1),
       ];

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

   const hideShowDoneTasks = () => {
       hideDoneTasks = !hideDoneTasks;
       render();
   };

   const allDone = () => {
       tasks = tasks.map((task) => ({
           ...task,
           done: true,
       }));
       render();
   };

   const bindEvents = () => {
       const removeButtons = document.querySelectorAll(".js-remove");

       removeButtons.forEach((removeButton, index) => {
           removeButton.addEventListener("click", () => {
               removeTask(index);
           });
       });

       const toggleDoneButtons = document.querySelectorAll(".js-done");

       toggleDoneButtons.forEach((toggleDoneButton, index) => {
           toggleDoneButton.addEventListener("click", () => {
               toggleTaskDone(index);
           });
       });
   };

   const renderTasks = () => {
       let htmlString = "";

       for (const task of tasks) {
           htmlString += `
             <li class="task__list ${task.done && hideDoneTasks ? " task__list--hidden" : ""}">
              <span class="task__ToDoList">
               <button class="js-done task__js--done">
               ${task.done ? "✔" : ""}
               </button>
               <span class="task__content ${task.done ? "task__content--done" : ""}">
               ${task.content}
               </span>
               <button class="js-remove task__js--remove">🗑</button>
              </span>
             </li>
           `;
       };

       document.querySelector(".js-tasks").innerHTML = htmlString;
   };

   const bindButtonsEvents = () => {
       const toggleDoneTasks = document.querySelector(".js-toggleDoneTasks");

       if (toggleDoneTasks) {
           toggleDoneTasks.addEventListener("click", hideShowDoneTasks);
       };

       const markAllDone = document.querySelector(".js-markAllDone");

       if (markAllDone) {
           markAllDone.addEventListener("click", allDone);
       };
   };

   const renderButtons = () => {
       const buttonsElement = document.querySelector(".js-newButtons");

       if (tasks.length > 0) {
           buttonsElement.innerHTML = `
           <button class="task__hideOrShowAllDone js-toggleDoneTasks">
           ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone zadania
           </button>
           <button class="task__markAllDone js-markAllDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
           Oznacz wszystkie zadania jako ukończone
           </button>`;
       } else {
           buttonsElement.innerHTML = ``;
       };
   };

   const render = () => {
       renderTasks();
       renderButtons();
       bindButtonsEvents();
       bindEvents();
   };

   const onFormSubmit = (event) => {
       event.preventDefault();

       const newTaskElement = document.querySelector(".js-newTask");
       const newTaskContent = newTaskElement.value.trim();

       if (newTaskContent !== "") {
           addNewTask(newTaskContent);
           newTaskElement.value = "";
       };

       newTaskElement.focus();
   };

   const init = () => {
       render();

       const form = document.querySelector(".js-form");

       form.addEventListener("submit", onFormSubmit);
   };

   init();
};