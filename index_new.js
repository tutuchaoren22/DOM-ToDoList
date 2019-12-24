var addButton = document.getElementsByClassName('button-add')[0];
var addInput = document.getElementsByClassName('input-add')[0];
var toDoList = document.getElementsByTagName('ol')[0];
var toDoThings = document.getElementsByTagName('li');
var footer = document.getElementsByClassName('footer')[0];
var buttonChose = document.getElementsByClassName("button-chose");
var currentButton = "ALL";

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
    updateButtonStatus();
}
//按enter键将input内容添加到list
function keyEnterAddToDoList(event) {
    if (event.keyCode == 13) {
        addToDoList();
    }
}
//给ol添加list
// function addToDoThing(toDoThing) {
//     console.log(toDoThing.hasDone);
//     toDoList.innerHTML += `<li item-index="${toDoThing.index}">
//   <input class="hasCompleted" type="checkbox" />
//   <span>${toDoThing.content}</span>
//   <button class="button-delete">×</button>
//   </li>`; //checked="${toDoThing.hasDone}"
// }

function addToDoThing(toDoThing) {
    var li = document.createElement("li");
    li.setAttribute("item-index", toDoThing.index);
    var checkBox = document.createElement("input");
    setAttributes.call(checkBox, ["type", "class"], ["checkbox", "hasCompleted"]);
    checkBox.checked = toDoThing.hasDone;
    var content = document.createElement("span");
    content.innerHTML = toDoThing.content;
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "×";
    setAttributes.call(deleteButton, ["class"], ["button-delete"]);
    appendChildren.call(li, [checkBox, content, deleteButton]);
    toDoList.appendChild(li);
}

function setAttributes(attrNames, attrValues) {
    for (var i = 0, length = attrNames.length; i < length; i++) {
        this.setAttribute(attrNames[i], attrValues[i]);
    }
}

function appendChildren(children) {
    for (var i = 0, length = children.length; i < length; i++) {
        this.appendChild(children[i]);
    }
}

//每条li前面的选择框的点击事件；
function hasCompleted(eventTarget) {
    var index = eventTarget.parentElement.getAttribute("item-index");
    var toDoThing = JSON.parse(localStorage.getItem(index));
    toDoThing.hasDone = eventTarget.checked;
    localStorage.setItem(index, JSON.stringify(toDoThing));
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
        var index = eventTarget.parentElement.getAttribute("item-index");
        localStorage.removeItem(index);
    }
}
//整个列表的点击事件
function toDoListEvent(event) {
    var eventTarget = event.target;
    switch (eventTarget.className) {
        case 'hasCompleted':
            hasCompleted(eventTarget);
            updateButtonStatus();
            break;
        case 'button-delete':
            buttonDelete(eventTarget);
            updateButtonStatus();
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

function updateButtonStatus(footerButtonSelected) {
    if (footerButtonSelected) {
        currentButton = footerButtonSelected;
    }
    switch (currentButton) {
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

function updateButtonStyle() {
    for (var button of buttonChose) {
        button.style.borderColor = button.innerHTML === currentButton ? "#fcadb0" : "";
    }
}

function footerEvent(event) {
    var footerButtonSelected = event.target.innerHTML;
    updateButtonStatus(footerButtonSelected);
    updateButtonStyle();
}

//todolist整个ol列表，添加事件监听函数
toDoList.addEventListener('click', toDoListEvent);
//给页脚三个按钮添加事件监听函数
footer.addEventListener('click', footerEvent);