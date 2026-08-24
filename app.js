// 1.DOM Elements (The Bridges)
const input = document.querySelector(".input-task");
const button = document.querySelector(".btn");
const ul = document.querySelector(".items");

// 2. Application State (The Array);
let taskContainer = [];

// 3. Functions (Create, Read/Render, Update, Delete, Storage);
const render = () => {
  // 1. CLEAR: Wipe the screen container empty
  let itemList = (ul.innerHTML = "");

  // 2. LOOP: Look at every task in the items array one by one
  taskContainer.forEach((item) => {
    // 3. BUILD: Create the HTML elements for each task
    let li = document.createElement("li");
    li.style.listStyleType = "none";
    li.dataset.id = item.id;

    let title = document.createElement("span");
    title.innerText = item.title;

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    checkBox.checked = item.isCompleted ? true : false;

    let _delete = document.createElement("button");
    _delete.className = "delete";
    _delete.innerHTML = "Delete";

    li.appendChild(checkBox);
    li.appendChild(title);
    li.appendChild(_delete);

    // 4. INJECT: Put those in HTML elements onto the screen
    ul.appendChild(li);
  });
};

// 4. Event Listeners (The triggers)
button.addEventListener("click", (e) => {
  e.preventDefault();
  let itemValue = input.value;
  let item;

  if (itemValue.length === 0 || itemValue === "") {
    return;
  } else {
    item = {
      id: Date.now(),
      title: itemValue,
      isCompleted: false,
    };
  }

  taskContainer.push(item);
  localStorage.setItem("taskContainer", JSON.stringify(taskContainer));
  render();
});

ul.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".delete")) {
    let parentLi = e.target.closest("li");
    let parentId = Number(parentLi.dataset.id);
    taskContainer = taskContainer.filter((item) => item.id !== parentId);

    localStorage.setItem("taskContainer", JSON.stringify(taskContainer));
    render();
  } else {
    return;
  }
});

ul.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".checkbox")) {
    let parentLi = e.target.closest("li");
    let parentId = Number(parentLi.dataset.id);
    let foundParent = taskContainer.find((item) => item.id === parentId);
    if (foundParent) {
      foundParent.isCompleted = !foundParent.isCompleted;
    }
  }
  localStorage.setItem("taskContainer", JSON.stringify(taskContainer));
  render();
});

if (localStorage.getItem("taskContainer")) {
  let savedRawText = localStorage.getItem("taskContainer");
  taskContainer = JSON.parse(savedRawText);
  render();
}
