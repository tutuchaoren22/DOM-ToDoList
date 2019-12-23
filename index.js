var addButton = document.getElementsByClassName('button-add')[0];
var addInput = document.getElementsByClassName('input-add')[0];
var toDoList = document.getElementsByTagName('ol')[0];
var toDoThings = document.getElementsByTagName('li');
var footer = document.getElementsByClassName('footer')[0];

addInput.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        addToDoList(event);
    }
});

addButton.addEventListener('click', function(event) {
    addToDoList(event);
});

toDoList.addEventListener('click', function(event) {
    var eventTarget = event.target;
    console.log(eventTarget.className);
    switch (eventTarget.className) {
        case 'hasCompleted':
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
            break;
        case 'button-delete':
            if (confirm("是否删除该TODO？")) {
                toDoList.removeChild(eventTarget.parentElement);
            }
            break;
        default:
            break;
    }

});

footer.addEventListener('click', function(event) {
    var eventTarget = event.target;
    switch (eventTarget.innerHTML) {
        case 'ALL':
            for (var li of toDoThings) {
                li.hidden = false
            }
            break;
        case 'Active':
            for (var li of toDoThings) {
                li.hidden = li.firstElementChild.checked;
            }
            break;
        case 'Complete':
            for (var li of toDoThings) {
                li.hidden = !li.firstElementChild.checked;
            }
            break;
    }
});


function addToDoList(event) {
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

function addToDoThing(toDoThing) {
    toDoList.innerHTML += `<li item-index="${toDoThing.index}">
    <input class="hasCompleted" type="checkbox" check=${toDoThing.hasDone} />
    <span>${toDoThing.content}</span>
    <button class="button-delete">×</button>
    </li>`;
}