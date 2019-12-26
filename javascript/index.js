var addButton = document.getElementsByClassName('button-add')[0];
var addInput = document.getElementsByClassName('input-add')[0];
var toDoList = document.getElementsByTagName('ol')[0];
var toDoThings = document.getElementsByTagName('li');
var footer = document.getElementsByClassName('footer')[0];
var buttonChose = document.getElementsByClassName("button-chose");
var currentButton = "ALL";

function getlocalStorage() {
    var storage = window.localStorage;
    var localStorageKeys = getLocalStorageKeys();
    if (storage.length) {
        localStorageKeys.forEach(function(value, i) {　　
            var obj = JSON.parse(storage.getItem(value));
            var toDoThing = {
                "index": Object.values(obj)[0],
                "content": Object.values(obj)[1],
                "hasDone": Object.values(obj)[2]
            };
            addToDoThing(toDoThing);
        })
    }
}

function getLocalStorageKeys() {
    keyArr = [];
    for (var item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            keyArr.push(item);
        }
    }
    keyArr.sort(function(a, b) {
        return a - b;
    });
    return keyArr
}

function addToDoList() {
    var localStorageKeys = getLocalStorageKeys();
    if (addInput.value) {
        var storage = window.localStorage;
        var index = (0 == storage.length) ? 0 : parseInt(localStorageKeys.slice(-1)) + 1;
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

function keyEnterAddToDoList(event) {
    if (13 == event.keyCode) {
        addToDoList();
    }
}

function addToDoThing(toDoThing) {
    var li = document.createElement("li");
    li.setAttribute("item-index", toDoThing.index);
    li.innerHTML = `<input class="hasCompleted" type="checkbox" />
      <span>${toDoThing.content}</span>
      <button class="button-delete">×</button>`;
    toDoList.appendChild(li);
}

function hasCompleted(eventTarget) {
    var index = eventTarget.parentElement.getAttribute("item-index");
    var toDoThing = JSON.parse(localStorage.getItem(index));
    toDoThing.hasDone = eventTarget.checked;
    localStorage.setItem(index, JSON.stringify(toDoThing));
    checkboxStyle(eventTarget);
}

function checkboxStyle(eventTarget) {
    if (eventTarget.checked) {
        eventTarget.parentNode.style.textDecorationLine = "line-through";
        eventTarget.parentNode.style.color = "lightgray";
    } else {
        eventTarget.parentNode.style.textDecorationLine = "none";
        eventTarget.parentNode.style.color = "black";
    }
}

function buttonDelete(eventTarget) {
    if (confirm("是否删除该TODO？")) {
        toDoList.removeChild(eventTarget.parentElement);
        var index = eventTarget.parentElement.getAttribute("item-index");
        localStorage.removeItem(index);
    }
}

function toDoListEvent(event) {
    var eventTarget = event.target;
    switch (eventTarget.className) {
        case 'hasCompleted':
            hasCompleted(eventTarget);
            break;
        case 'button-delete':
            buttonDelete(eventTarget);
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

getlocalStorage();
toDoList.addEventListener('click', toDoListEvent);
footer.addEventListener('click', footerEvent);