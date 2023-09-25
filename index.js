const input = document.querySelector(".task_input_field"); // получаем элемент ввода задачи
const button = document.querySelector(".button_to_add_a_task"); // получаем кнопку добавления задачи
const taskList = document.querySelector(".list_of_tasks"); // получаем элемент списка задач
const clearButton = document.querySelector(".button_to_clear_the_task_list"); // получаем кнопку очистки списка задач

let tasks = []; // создаем пустой массив для хранения задач

// Загрузка задач из Local Storage при загрузке страницы
if (localStorage.getItem("tasks")) {
	tasks = JSON.parse(localStorage.getItem("tasks"));
}

// функция для добавления задачи в список
function addTask() {
	const task = input.value.trim(); // Получаем значение из поля ввода задачи и сохраняем его в переменной "task", добавляем метод trim() на значение поля ввода задачи для удаления пробелов
	let isValid = true; // Переменная, которая будет хранить информацию о том, валидна ли поле ввода
	if (!input.checkValidity() || task === "") {
		// Если текущий элемент ввода не проходит валидацию
		input.classList.add("error"); // Добавляем класс ошибки для этого элемента
		input.nextElementSibling.textContent =
			input.validationMessage || "Пожалуйста, введите задачу."; // Отображаем сообщение об ошибке или об ошибке пустой задачи
		isValid = false; // Устанавливаем флаг валидации в false
	}
	if (isValid) {
		// Если поле валидно
		input.classList.remove("error"); // Удаляем класс ошибки (если он был)
		localStorage.setItem("tasks", JSON.stringify(tasks)); //Сохраняем задачу в Local Storage
		input.nextElementSibling.textContent = ""; // Очищаем сообщение об ошибке (если оно было)
		tasks.push(task); // добавляем задачу в массив
		input.value = ""; // Очищаем поле ввода задачи
		updateTaskList(); // обновляем список задач
	}
}

// функция для обновления списка задач
function updateTaskList() {
	taskList.innerHTML = ""; // очищаем список задач
	if (tasks.length === 0) {
		// если задач нет, добавляем сообщение об отсутствии задач и делаем кнопку очистки неактивной
		const noTasks = document.createElement("p");
		noTasks.textContent = "Задачи отсутствуют";
		noTasks.classList.add("no-tasks");
		taskList.appendChild(noTasks);
		clearButton.disabled = true;
	} else {
		// создаем элементы списка для каждой задачи
		for (let i = 0; i < tasks.length; i++) {
			const taskItem = document.createElement("li");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox"; // добавляем тип чекбокса
			// добавляем обработчик события при клике на чекбокс
			checkbox.addEventListener("click", (event) => {
				toggleTask(event.target.parentNode);
			});
			const taskText = document.createElement("span");
			taskText.textContent = tasks[i];
			// добавляем чекбокс и текст задачи в элемент списка
			taskItem.appendChild(checkbox);
			taskItem.appendChild(taskText);
			taskList.appendChild(taskItem);
		} // делаем кнопку очистки активной
		clearButton.disabled = false;
	}
}

// обработчик клика на кнопку добавления задачи
button.addEventListener("click", addTask);

// обработчик клика на кнопку очистки списка задач
clearButton.addEventListener("click", () => {
	localStorage.clear(); // Сохраняем задачи в Local Storage
	tasks = []; // Очищаем массив задач
	updateTaskList(); // Обновляем список задач
});

// инициализация списка задач при загрузке страницы
updateTaskList();
