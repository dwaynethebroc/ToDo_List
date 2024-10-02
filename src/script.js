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

class DOM_Elements {

    createStickyNoteForm() {
        // Create the form using JavaScript
        const formContainer = document.getElementById('project');
    
        // Create form element
        const form = document.createElement('form');
        form.id = 'taskForm';
    
        // Create fieldset element
        const fieldset = document.createElement('fieldset');
    
        // Create legend for the fieldset
        const legend = document.createElement('legend');
        legend.innerText = 'Task Details';
        fieldset.appendChild(legend);
    
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
        fieldset.appendChild(createFormGroup('Task Title:', titleInput));
    
        // Due date input
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.id = 'dueDate';
        dueDateInput.name = 'dueDate';
        dueDateInput.required = true;
        fieldset.appendChild(createFormGroup('Due Date:', dueDateInput));
    
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
    
        fieldset.appendChild(createFormGroup('Priority:', prioritySelect));
    
        // Project select with "Add new" option
        const projectSelect = document.createElement('select');
        projectSelect.id = 'project';
        projectSelect.name = 'project';
        projectSelect.required = false;
    
        const projects = ['Work', 'School', 'Home']; // Pre-existing projects
        projects.forEach(project => {
          const option = document.createElement('option');
          option.value = project;
          option.innerText = project;
          projectSelect.appendChild(option);
        });
    
        // Add an option for creating a new project
        const addNewOption = document.createElement('option');
        addNewOption.value = 'add-new';
        addNewOption.innerText = 'Add New Project';
        projectSelect.appendChild(addNewOption);
    
        fieldset.appendChild(createFormGroup('Project:', projectSelect));
    
        // Input field for new project (hidden initially)
        const newProjectInput = document.createElement('input');
        newProjectInput.type = 'text';
        newProjectInput.id = 'newProject';
        newProjectInput.name = 'newProject';
        newProjectInput.placeholder = 'Enter new project name';
        newProjectInput.style.display = 'none'; // Initially hidden
        fieldset.appendChild(createFormGroup('New Project Name:', newProjectInput));
    
        // Show new project input when "Add New Project" is selected
        projectSelect.addEventListener('change', function() {
          if (projectSelect.value === 'add-new') {
            newProjectInput.style.display = 'block';
            newProjectInput.required = true;
          } else {
            newProjectInput.style.display = 'none';
            newProjectInput.required = false;
          }
        });
    
        // To-dos input
        const todosInput = document.createElement('input');
        todosInput.type = 'text';
        todosInput.id = 'todos';
        todosInput.name = 'todos';
        todosInput.required = true;
        fieldset.appendChild(createFormGroup('List of To-Dos (separated by commas):', todosInput));
    
        // Notes textarea
        const notesTextarea = document.createElement('textarea');
        notesTextarea.id = 'notes';
        notesTextarea.name = 'notes';
        notesTextarea.rows = 4;
        fieldset.appendChild(createFormGroup('Optional Notes:', notesTextarea));
    
        // Append fieldset to the form
        form.appendChild(fieldset);
    
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
          let dueDateString = document.getElementById('dueDate').value.replace(/-/g, '\/');
          const priority = document.getElementById('priority').value;
          const todos = document.getElementById('todos').value.split(',');
          const notes = document.getElementById('notes').value;
          const project = projectSelect.value === 'add-new' ? document.getElementById('newProject').value : projectSelect.value;
    
          let dueDate = new Date(dueDateString);
          const task = {
            title,
            dueDate,
            priority,
            todos,
            notes: notes || 'No additional notes',
            project
          };

          console.log(task.title, task.dueDate, task.priority, task.todos, task.notes, task.project)
          
          DOM.addStickyNotetoTasksDiv(task.title, task.dueDate, task.priority, task.todos, task.notes, task.project);
          //create new task div with inputed information and move to expanded view section
          //seperate function to add also to projects tab
        });
    }

    addStickyNotetoTasksDiv(title, dueDate, priority, todos, notes, project) {
        const todayDiv = document.getElementById('today');
        const weekDiv = document.getElementById('thisWeek');
        const monthDiv = document.getElementById('thisMonth');
        
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')
        taskDiv.innerText = `
        <h3>Task Summary</h3>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>To-Dos:</strong> ${todos.join(', ')}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `;

        console.log(taskDiv);

        //function which div does the date fall into
        //returns today, week, month, future
        let taskGroup = this.whichDateOfTask(dueDate);

        //append to appropiate DIV
        //if task is after a month push to array of task objects to be populated on seperate tab
        if (taskGroup === 'today'){
            
            todayDiv.appendChild(taskDiv);
        }
        else if (taskGroup === 'thisWeek'){
            
            weekDiv.appendChild(taskDiv);
        }   
        else if (taskGroup === 'thisMonth') {
            
            monthDiv.appendChild(taskDiv);
        } 
    }

    whichDateOfTask(task_date) {
        let taskGroup = '';

        console.log(task_date);
        
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();


        const taskDay = task_date.getDate();
        const taskMonth = task_date.getMonth() + 1;
        const taskYear = task_date.getFullYear();

        
        //get dates of the current week  
        const first = currentDate.getDate() - currentDate.getDay(); // First day is the  day of the month - the day of the week  
        const last = first + 6; // last day is the first day + 6   
        const firstday = new Date(currentDate.setDate(first));   
        const lastday = new Date(currentDate.setDate(currentDate.getDate()+6));


        if (currentDay === taskDay) {
            taskGroup = 'today';
        }
        else if (task_date >= firstday && task_date <= lastday) {
            taskGroup = 'thisWeek';
        }
        else if (task_date > lastday && taskMonth === currentMonth && currentYear === taskYear){
            taskGroup = 'thisMonth';
        }
        console.log(taskGroup);
        return taskGroup
    }
}




const DOM = new DOM_Elements;
DOM.createStickyNoteForm();