import "./styles.css";

class stickyNote {
    constructor(title, dueDate, priority, toDos, notes){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toDos = toDos;
        this.notes = notes;
    }
}

const createStickyNoteForm = function() {
    // Create the form using JavaScript
    const formContainer = document.getElementById('project');

    // Create form element
    const form = document.createElement('form');
    form.id = 'taskForm';

    // Create form groups
    function createFormGroup(labelText, inputElement) {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';

      const label = document.createElement('label');
      label.innerText = labelText;

      formGroup.appendChild(label);
      formGroup.appendChild(inputElement);

      return formGroup;
    }

    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    form.appendChild(createFormGroup('Task Title:', titleInput));

    // Due date input
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'dueDate';
    dueDateInput.name = 'dueDate';
    dueDateInput.required = true;
    form.appendChild(createFormGroup('Due Date:', dueDateInput));

    // Priority select
    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority';
    prioritySelect.name = 'priority';
    prioritySelect.required = true;

    const priorities = ['high', 'medium', 'low'];
    priorities.forEach(priority => {
      const option = document.createElement('option');
      option.value = priority;
      option.innerText = priority.charAt(0).toUpperCase() + priority.slice(1);
      prioritySelect.appendChild(option);
    });

    form.appendChild(createFormGroup('Priority:', prioritySelect));

    // To-dos input
    const todosInput = document.createElement('input');
    todosInput.type = 'text';
    todosInput.id = 'todos';
    todosInput.name = 'todos';
    todosInput.required = true;
    form.appendChild(createFormGroup('List of To-Dos (separated by commas):', todosInput));

    // Notes textarea
    const notesTextarea = document.createElement('textarea');
    notesTextarea.id = 'notes';
    notesTextarea.name = 'notes';
    notesTextarea.rows = 4;
    form.appendChild(createFormGroup('Optional Notes:', notesTextarea));

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Submit Task';
    form.appendChild(submitButton);

    // Append form to the container
    formContainer.appendChild(form);

    // Handle form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const dueDate = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;
      const todos = document.getElementById('todos').value.split(',');
      const notes = document.getElementById('notes').value;

      const name = new stickyNote(title, dueDate, priority, todos, notes);
      console.log(name);
    });
}


createStickyNoteForm();