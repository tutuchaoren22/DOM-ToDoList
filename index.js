var addButton = document.getElementsByClassName('button-add')[0];
var addInput = document.getElementsByClassName('input-add')[0];
var toDoList = document.getElementsByTagName('ol')[0];
// AC1:通过在输入框中输入待办事项，按回车键或者「Add」按钮添加一条待办事项；
// AC2：对于刚添加的待办事项出现在列表中，包含三个部分：项目符号、内容
// AC3：当什么都没输入时，按回车键或者「Add」按钮不会有任何待办事项被添加
addButton.onclick = function() {
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
    toDoList.innerHTML = `<li><input type="checkbox"/><span>${toDoThing.content}</span></li>`;
}
// AC4：当底部按钮选中「Active」时，输入框中添加 todo，会显示新添加的 todo；
// AC5：当底部按钮选中「Complete」时，输入框中添加 todo，不会显示新添加的 todo；


// AC1：当点击某条待办事项，代表完成该事项，点击后该事项前面的项目符号改变，文字变灰色并出现删除线；

// AC1：当点击底部按钮「ALL」，显示所有待办事项
// AC2：当点击底部按钮「Active」，显示未完成的代办事项
// AC3：当点击底部按钮「Complete」，显示已完成的待办事项

// AC1: 当我的鼠标移到某个 TODO 所在的行上，最右侧会出现一个「X」, 并且我可以点击这个 「X」
// AC2: 当我点击相应 TODO 后面的 「X」，会弹出一个确认框，让我确认“是否删除该 TODO？”，并有两个按钮 「确认」、「取消」
// AC3: 当我点击确认框中的“确认”按钮，该 TODO 从我的页面列表中消失