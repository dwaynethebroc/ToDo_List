import "./styles.css";



class stickyNote {
    static stickyNotes = [];

    constructor(title, dueDate, priority, project, toDos, notes){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.toDos = toDos;
        this.notes = notes;

        stickyNote.stickyNotes.push(this);
    }
}

class DOM_Elements {
    static projects = ['Work', 'School', 'Home']; // Pre-existing projects

    createStickyNoteForm() {
        // Create the form using JavaScript
        const formContainer = document.getElementById('project');

        formContainer.innerHTML = ``;
    
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
        titleInput.value = "Fight Club" //default value
        fieldset.appendChild(createFormGroup('Task Title:', titleInput));
    
        // Due date input
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.id = 'dueDate';
        dueDateInput.name = 'dueDate';
        dueDateInput.required = true;
        dueDateInput.value = new Date(); //default value
        fieldset.appendChild(createFormGroup('Due Date:', dueDateInput));
    
        // Priority select
        const prioritySelect = document.createElement('select');
        prioritySelect.id = 'priority';
        prioritySelect.name = 'priority';
        prioritySelect.required = true;
        prioritySelect.value = "high" //default value
    
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
    

        DOM_Elements.projects.forEach(project => {
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
        todosInput.value = "run, jump, climb"; //default value
        fieldset.appendChild(createFormGroup('List of To-Dos (separated by commas):', todosInput));
    
        // Notes textarea
        const notesTextarea = document.createElement('textarea');
        notesTextarea.id = 'notes';
        notesTextarea.name = 'notes';
        notesTextarea.rows = 4;
        notesTextarea.value = "this is a test note"; //default value
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
          const project = projectSelect.value === 'add-new' 
            ? (DOM_Elements.projects.push(document.getElementById('newProject').value), document.getElementById('newProject').value)
            : projectSelect.value;
          let dueDate = new Date(dueDateString);
          const task = {
            title,
            dueDate,
            priority,
            todos,
            notes: notes || 'No additional notes',
            project
          };

          let sticky = new stickyNote(task.title, task.dueDate, task.priority, task.project, task.todos, task.notes);
          DOM.addStickyNotes(task.title, task.dueDate, task.priority, task.project, task.todos, task.notes);
          DOM.populateProjects(DOM_Elements.projects, stickyNote.stickyNotes);
                  // Update the project dropdown and populate projects without calling a separate function
          DOM.createStickyNoteForm();
          //create new task div with inputed information and move to expanded view section
          //seperate function to add also to projects tab
        });
    }

    addStickyNotes(title, dueDate, priority, project, todos, notes) {
        const todayDiv = document.getElementById('today');
        const weekDiv = document.getElementById('thisWeek');
        const monthDiv = document.getElementById('thisMonth');
        const futureDiv = document.getElementById('futureDiv');

        const shortenedDate = dueDate.toISOString().split('T')[0];

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `<strong>Title:</strong> ${title} <strong>Due Date:</strong> ${shortenedDate}`;
        taskDiv.source_data = {title, dueDate, priority, project, todos, notes}
        console.log(taskDiv.source_data);
        taskDiv.addEventListener('click', () => this.expandStickyNote(taskDiv.source_data))


        if (priority === "high"){
            taskDiv.style.backgroundColor = "red";
        } 
        else if (priority === "medium"){
            taskDiv.style.backgroundColor = "yellow";
        }
        else {
            taskDiv.style.backgroundColor = "green";
        }

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
        else {
            futureDiv.appendChild(taskDiv);
        }
    }

    whichDateOfTask(task_date) {
        let taskGroup = '';

        
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

        return taskGroup
    }

    expandStickyNote(stickyNote_object) {
        const currentProjectDiv = document.getElementById('project');

        // Remove the current form
        const form = document.getElementById('taskForm');
        if (form) {
            form.remove();
        };

        if (currentProjectDiv.hasChildNodes()) {
            while (currentProjectDiv.firstChild) {
                currentProjectDiv.removeChild(currentProjectDiv.firstChild);
              }
        };

        // Create the expanded view container
        const expandedView = document.createElement('div');
        expandedView.classList.add('expanded-view');

        //create a ul div
        const todoDiv = document.createElement('div');
        todoDiv.id = "todoDiv";

        //create paragraph tag title
        const paraText = document.createElement('p');
        paraText.innerText = 'To Dos:';
        todoDiv.appendChild(paraText);

        //div for list items
        const todoListDiv = document.createElement('div');
        todoListDiv.classList.add("Todo_List");
        todoDiv.appendChild(todoListDiv);

        //make checkboxes for DIV
        const todos = stickyNote_object.todos;
        todos.forEach(todo => {

            const todoLI = document.createElement('li');
            todoLI.classList.add('todoLI');

            const todoLabel = document.createElement("label");
            todoLabel.htmlFor = "id";
            todoLabel.appendChild(document.createTextNode(todo))
            
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "checks";
            checkbox.value = todo;
            checkbox.classList.add('checkbox');

            todoLI.appendChild(checkbox);
            todoLI.appendChild(todoLabel);
            todoListDiv.appendChild(todoLI);
        });
        
        // Populate expanded view with sticky note details
        expandedView.innerHTML = `
            <h3>Task Details</h3>
            <p><strong>Title:</strong> ${stickyNote_object.title}</p>
            <p><strong>Due Date:</strong> ${stickyNote_object.dueDate.toDateString()}</p>
            <p><strong>Priority:</strong> ${stickyNote_object.priority}</p>
            <p><strong>Project:</strong> ${stickyNote_object.project}</p>
            <p><strong>Notes:</strong> ${stickyNote_object.notes}</p>
        `;

        expandedView.appendChild(todoDiv);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerText = 'Delete Task';
        deleteButton.addEventListener('click', () => {
            console.log(stickyNote.stickyNotes);
            // Delete the task from stickyNotes array
            stickyNote.stickyNotes = stickyNote.stickyNotes.filter(note => 
                note.title !== stickyNote_object.title || 
                note.dueDate.toISOString() !== stickyNote_object.dueDate.toISOString() ||
                note.priority !== stickyNote_object.priority
            );
            console.log(stickyNote.stickyNotes);
            expandedView.remove();  // Remove the expanded view after deletion
            this.resetTaskDivs();
            this.populateProjects(DOM_Elements.projects, stickyNote.stickyNotes);
            this.populateTasks(stickyNote.stickyNotes);
            this.createStickyNoteForm();  // Recreate the form
        });

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', () => {
            expandedView.remove();  // Remove the expanded view when close button is clicked
            this.createStickyNoteForm();  // Recreate the form
        });

        expandedView.appendChild(deleteButton);
        expandedView.appendChild(closeButton);

        // Append expanded view to the document
        currentProjectDiv.appendChild(expandedView);
    }

    clearTasks() {
        const todayDiv = document.getElementById('today');
        const weekDiv = document.getElementById('thisWeek');
        const monthDiv = document.getElementById('thisMonth');
        const futureDiv = document.getElementById('futureDiv');

        const divArray = [todayDiv, weekDiv, monthDiv, futureDiv];

        divArray.forEach((div) => {
            while (div.firstChild) {
                 div.removeChild(div.firstChild);
            }
        });
    }

    resetTaskDivs(){

        const expandedTasksDiv = document.getElementById('tasks')

        const todayDiv = document.getElementById('today');
        const weekDiv = document.getElementById('thisWeek');
        const monthDiv = document.getElementById('thisMonth');
        const futureDiv = document.getElementById('futureDiv');

        todayDiv.innerHTML = '';
        weekDiv.innerHTML = '';
        monthDiv.innerHTML = '';
        futureDiv.innerHTML = '';

            // Create and append headings as <p> tags for each div
        const todayHeading = document.createElement('p');
        todayHeading.innerText = 'Today';
        todayDiv.appendChild(todayHeading);

        const weekHeading = document.createElement('p');
        weekHeading.innerText = 'This Week';
        weekDiv.appendChild(weekHeading);

        const monthHeading = document.createElement('p');
        monthHeading.innerText = 'This Month';
        monthDiv.appendChild(monthHeading);

        const futureHeading = document.createElement('p');
        futureHeading.innerText = 'Future Tasks';
        futureDiv.appendChild(futureHeading);
    }

    populateTasks(objectTaskArray) {
        // Reference the expanded tasks div
        const expandedTasksDiv = document.getElementById('tasks');
    
        // If there are tasks in the array, add them to the appropriate divs
        objectTaskArray.forEach((note) => {
            this.addStickyNotes(note.title, note.dueDate, note.priority, note.project, note.todos, note.notes);
        });
    }
    
    populateProjects(projectArray, taskData){
        //for each project in the project array create a div with the name of the project
        //Make it so each div can be clicked with an event listener and re-populate the for that specific project in the expanded tasks

        const activeProjects = projectArray.filter(project => 
            taskData.some(stickyNote => stickyNote.project === project)
        );

        const myProjectsDiv = document.getElementById('projectsList')
        myProjectsDiv.innerHTML = ''; // Reset the list before adding new projects

        //Create an All projects div that allows user to see all tasks

        const allProjectsDiv = document.createElement('div');
        allProjectsDiv.classList.add('allProjectsDiv');
        allProjectsDiv.innerText = 'All Projects';

        allProjectsDiv.addEventListener('click', () => {
            this.clearTasks();
            this.resetTaskDivs();
            this.populateTasks(taskData);
        })


        activeProjects.forEach((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add('projectDiv');
            projectDiv.innerText = project;

            projectDiv.addEventListener('click', () => {
                const filteredTasks = taskData.filter(stickyNote => stickyNote.project === project);

                this.clearTasks();
                this.resetTaskDivs();
                this.populateTasks(filteredTasks);
            })

            myProjectsDiv.prepend(allProjectsDiv);
            myProjectsDiv.appendChild(projectDiv);
        });

    }


}




const DOM = new DOM_Elements;
DOM.createStickyNoteForm();