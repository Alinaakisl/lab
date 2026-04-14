const tasks = [];

function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const newTask = newTaskInput.value;
  
  if (newTask.trim() !== '') {
    // Добавляем задачу в массив
    tasks.push({ text: newTask, completed: false });
    
    // Создаем элементы
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    
    const taskText = document.createElement('span');
    taskText.className = 'todo-text';
    taskText.textContent = newTask;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';
    
    // Кнопка переименования ✔
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✔';
    
    // Кнопка удаления ❌
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '❌';
    
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);
    listItem.appendChild(taskText);
    listItem.appendChild(buttonsDiv);
    
    // Обработчик выполнения задачи (переключение completed)
    taskText.addEventListener('click', function(event) {
      event.stopPropagation(); // Останавливаем всплытие
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      tasks[index].completed = !tasks[index].completed;
      listItem.classList.toggle('completed');
    });
    
    // ===== ЗАДАНИЕ 1: Удаление задачи =====
    deleteBtn.addEventListener('click', function(event) {
      event.stopPropagation(); // Останавливаем всплытие, чтобы не вызвать выполнение задачи
      
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      
      // Удаляем из массива
      tasks.splice(index, 1);
      
      // Удаляем из разметки
      listItem.remove();
    });
    
    // ===== ЗАДАНИЕ 2: Переименование задачи =====
    editBtn.addEventListener('click', function(event) {
      event.stopPropagation(); // Останавливаем всплытие, чтобы не вызвать выполнение задачи
      
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      const oldText = tasks[index].text;
      
      // Запрашиваем новое имя через prompt
      const newText = prompt('Введите новое название задачи:', oldText);
      
      // Если пользователь ввел текст и нажал OK
      if (newText !== null && newText.trim() !== '') {
        // Обновляем в массиве
        tasks[index].text = newText;
        
        // Обновляем в разметке
        taskText.textContent = newText;
      }
    });
    
    // Добавляем задачу в список
    document.getElementById('todo-list').appendChild(listItem);
    
    // Очищаем поле ввода
    newTaskInput.value = '';
  }
}

// Обработчик отправки формы
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});