var addButton = document.getElementsByClassName('button-add')[0];
var addInput = document.getElementsByClassName('input-add')[0];
var toDoList = document.getElementsByTagName('ol')[0];
var toDoThings = document.getElementsByTagName('li');
var footer = document.getElementsByClassName('footer')[0];

//将input内容添加到list
function addToDoList() {
    if (addInput.value) {
        var storage = window.localStorage;
        var index = storage.length;
        var toDoThing = {
            "index": index,
            "content": addInput.value,
            "hasDone": false
        };
        storage.setItem(index, JSON.stringify(toDoThing));
        addInput.value = "";
        addToDoThing(toDoThing);
    }
}
//按enter键将input内容添加到list
function keyEnterAddToDoList() {
    if (event.keyCode == 13) {
        addToDoList(event);
    }
}
//给ol添加list
function addToDoThing(toDoThing) {
    toDoList.innerHTML += `<li item-index="${toDoThing.index}">
  <input class="hasCompleted" type="checkbox" check=${toDoThing.hasDone} />
  <span>${toDoThing.content}</span>
  <button class="button-delete">×</button>
  </li>`;
}
//每条li前面的选择框的点击事件；
function hasCompleted(eventTarget) {
    var index = eventTarget.parentElement.getAttribute("item-index");
    var toDoThing = JSON.parse(localStorage.getItem(index));
    toDoThing.hasDone = eventTarget.checked;
    localStorage.setItem(index, JSON.stringify(toDoThing));
    // console.log(eventTarget.checked);
    eventTarget.parentElement.firstElementChild.checked = eventTarget.checked;
    // console.log(eventTarget.parentElement.firstElementChild.checked);
    if (eventTarget.checked) {
        eventTarget.parentNode.style.textDecorationLine = "line-through";
        eventTarget.parentNode.style.color = "lightgray";
    } else {
        eventTarget.parentNode.style.textDecorationLine = "";
        eventTarget.parentNode.style.color = "black";
    }
}
//每条li后面的删除符号的点击事件；
function buttonDelete(eventTarget) {
    if (confirm("是否删除该TODO？")) {
        toDoList.removeChild(eventTarget.parentElement);
    }
}
//整个列表的点击事件
function toDoListEvent(event) {
    var eventTarget = event.target;
    // console.log(eventTarget.className);
    switch (eventTarget.className) {
        case 'hasCompleted':
            hasCompleted(eventTarget);
            break;
        case 'button-delete':
            buttonDelete(eventTarget)
            break;
        default:
            break;
    }
}

function allButton() {
    for (var li of toDoThings) {
        li.hidden = false
    }
}

function activeButton() {
    for (var li of toDoThings) {
        li.hidden = li.firstElementChild.checked;
    }
}

function completeButton() {
    for (var li of toDoThings) {
        li.hidden = !li.firstElementChild.checked;
    }
}

function footerEvent(event) {
    var eventTarget = event.target;
    switch (eventTarget.innerHTML) {
        case 'ALL':
            allButton();
            break;
        case 'Active':
            activeButton();
            break;
        case 'Complete':
            completeButton();
            break;
    }
}

//todolist整个ol列表，添加事件监听函数
toDoList.addEventListener('click', toDoListEvent);
//给页脚三个按钮添加事件监听函数
footer.addEventListener('click', footerEvent);