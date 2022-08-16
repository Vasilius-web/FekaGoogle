const createListItem = (value, id) => {
    const li = document.createElement('li');
    li.innerText = value;
    li.setAttribute('id', id);
    li.classList.add('list-item');
    return li;
}

const createDoneButton = () => {
    const done = document.createElement('button');
    done.innerText = 'done';
    return done;
}

const createDelButton = () => {
    const del = document.createElement('button');
    del.innerText = 'del';
    return del;
}

const createAddButton = () => {
    const addButton = document.createElement('button');
    addButton.innerText = 'add';
    return addButton;
}

const toggleDoneState = (li, appId) => {
    const currentState = JSON.parse(localStorage.getItem(appId));
    const newState = currentState.map((item) => {
        if (item.id === li.getAttribute('id')) {
            return {
                ...item,
                done: !li.classList.contains('done')
            }
        }
        return item;
    })
    localStorage.setItem(appId, JSON.stringify(newState));

    if (li.classList.contains('done')) {
        li.classList.remove('done');
    } else {
        li.classList.add('done');
    }
}

const setDoneState = (event, li, appId) => {

    const currentState = JSON.parse(localStorage.getItem(appId));
    const newState = currentState.map((item) => {
        if (item.id === li.getAttribute('id')) {
            return {
                ...item,
                done: true
            }
        }
        return item;
    })
    localStorage.setItem(appId, JSON.stringify(newState));
    event.stopPropagation();
    li.classList.add('done')
};

const removeListItem = (li, ul, appId) => {
    ul.removeChild(li);
    const currentState = JSON.parse(localStorage.getItem(appId));
    const newState = currentState.filter((item) => item.id !== li.getAttribute('id'))
    localStorage.setItem(appId, JSON.stringify(newState));
}

const addItem = (item, ul, columnId) => {
    if (!item.value) return;
    const li = createListItem(item.value, item.id);
    const done = createDoneButton();
    const del = createDelButton();
    const buttonContainer = document.createElement('div');

    buttonContainer.appendChild(done);
    buttonContainer.appendChild(del);

    if (item.done) {
        li.classList.add('done');
    }
    del.addEventListener('click', () => removeListItem(li, ul, columnId));
    done.addEventListener('click', (event) => setDoneState(event, li, columnId));
    li.addEventListener('click', () => toggleDoneState(li, columnId));

    li.appendChild(buttonContainer);
    ul.appendChild(li);
}

const createColumn = (columnId, title) => {
    const initialValues = JSON.parse(localStorage.getItem(columnId)) || [];
    const appRoot = document.getElementById(columnId);
    const columnTitle = document.createElement('h3');
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    const input = document.createElement("input");
    input.classList.add('todo-input');
    const ul = document.createElement('ul');
    const addButton = createAddButton();

    columnTitle.innerText = title;

    inputContainer.appendChild(input);
    inputContainer.appendChild(addButton);

    initialValues.forEach((item) => addItem(item, ul, columnId));


    input.addEventListener("keypress", (event) => {
        if (event.code === "Enter") {
            const newItem = {value: input.value, id: new Date().getTime().toString()}
            addItem(newItem, ul, columnId);
            const currentState = JSON.parse(localStorage.getItem(columnId)) || [];
            localStorage.setItem(columnId, JSON.stringify(currentState.concat(newItem)));
            input.value = '';
            input.focus()
        }
    })
    addButton.addEventListener('click', () => {
        const newItem = {value: input.value, id: new Date().getTime().toString()}
        addItem(newItem, ul, columnId);
        const currentState = JSON.parse(localStorage.getItem(columnId)) || [];
        localStorage.setItem(columnId, JSON.stringify(currentState.concat(newItem)));
        input.value = '';
        input.focus()
    });
    appRoot.appendChild(columnTitle);
    appRoot.appendChild(inputContainer);
    appRoot.appendChild(ul);
}

const kanbanBoard = (columnList) => {
    columnList.forEach((columnTitle) => {
        const columnId = columnTitle.replace(' ', '');
        const columnContainer = document.createElement('div')
        columnContainer.setAttribute('id', columnId);
        document.body.appendChild(columnContainer);
        createColumn(columnId, columnTitle);
    })
}

kanbanBoard(['To do', 'In progress', 'Done']);



