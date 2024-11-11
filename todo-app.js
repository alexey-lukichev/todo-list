(function() {

  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название новгоро дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    function validInput() {
      if (input.value === "") {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    };
    validInput();
    input.addEventListener('input', validInput);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name, done) {

    todo = {
      name,
      done,
    };

    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todo.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  //функция для записи списка дел
  function writeApp(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  //функция для чтения списка дел
  function readApp(key) {
    let data = localStorage.getItem(key);
    return data = data ? JSON.parse(data) : [];
  }

  function createTodoApp(container, title = 'Список дел', listName) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    // let todoItems = [createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    // todoList.append(todoItems[0].item);
    // todoList.append(todoItems[1].item);

    //Массив этапа 3
    let itemsObj = readApp(listName);

    itemsObj.forEach(function (item) {
      let todoItem = createTodoItem(item.name, item.done);
      todoList.append(todoItem.item);

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        item.done = !item.done;
        writeApp(listName, itemsObj);
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          itemsObj = itemsObj.filter(i => i !== item);
          writeApp(listName, itemsObj);
        }
      });
    });

    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      //Этап 3
      let newItemsObj = {
        id: getRandomId(1,10),
        name: todoItemForm.input.value,
        done: false,
      }

      // todoList.append(createTodoItem(todoItemForm.input.value).item);
      let todoItem = createTodoItem(newItemsObj.name, newItemsObj.done);
      itemsObj.push(newItemsObj);

      writeApp(listName, itemsObj);
      todoItemForm.button.disabled = true;

      

      function getRandomId(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

      itemsObj.push(newItemsObj);
      console.log(newItemsObj);

      function getOlderId(itemsObj) {
        for (i = 0; i < itemsObj.length; i++) {
          for (j = 0; j < itemsObj.length - 1; j++) {
            if (itemsObj[j].id > itemsObj[j + 1].id) {
              temp = itemsObj[j].id;
              itemsObj[j].id = itemsObj[j + 1].id;
              itemsObj[j + 1].id = temp;
            }
          }
        }

        return itemsObj;
      }
      
      let result = getOlderId(itemsObj);
      console.log(result);
      let lastItem = result[result.length - 1];
      console.log(lastItem);

      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success'), true;
        newItemsObj.done = !newItemsObj.done;
      });
      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
        //этап 4
        for (i = 0; i < itemsObj.length; i++) {
          if (itemsObj[i].id === newItemsObj.id) {
            itemsObj.splice(i, 1);
          }
          console.log(itemsObj);
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';


      //метод удаления
      // function removeApp(id, listName) {
      //   let newItemsObj = JSON.parse(localStorage.getItem(listName));

      //   let newCart = [];
      //   for (i = 0; i < newItemsObj.length; i++) {
      //     if (newItemsObj[i].id !== id) {
      //       newCart.push(newItemsObj[i]);
      //     }
      //   }
      // }
      // removeApp(id, listName);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    createTodoApp(document.getElementById('todo-app'), 'Мои дела', 'my');
    createTodoApp(document.getElementById('todo-app'), 'Дела папы', 'dad');
    createTodoApp(document.getElementById('todo-app'), 'Дела мамы', 'mom');
  });

  window.createTodoApp = createTodoApp;
})();
