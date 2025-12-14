import "./styles.css";
import { createTask, createProject } from "./factories";
import folderIcon from './assets/icons/folder.svg';
import happyBalloon from './assets/happy-balloon.gif';
import stressedBalloon from './assets/stressed-balloon.gif';
import angryBalloon from './assets/angry-balloon.gif';
import fileIcon from './assets/icons/file-document.svg';
import { parse } from "date-fns";

let projectCount = 0;
let projects = [];
let tasks = [];

function createInputContainer(labelText, inputElement) {
    const container = document.createElement("div");
    container.classList.add("input-container");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", inputElement.id);

    container.appendChild(label);
    container.appendChild(inputElement);

    return container;
}

function createTextInput(id, required = false, placeholder = "") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.name = id;
    if (required) input.required = true;
    if (placeholder) input.placeholder = placeholder;
    return input;
}

function createTextarea(id, rows = 3) {
    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.name = id;
    textarea.rows = rows;
    return textarea;
}

function createProjectForm() {
    const formContainer = document.createElement("div");
    formContainer.classList.add("project-form-container");

    const form = document.createElement("div");
    form.classList.add("project-form");

    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("text-inputs-container");

    // Title
    const title = document.createElement("div");
    title.classList.add("form-title");
    title.textContent = "New Project";

    // Inputs
    const nameInput = createTextInput("project-name", true);
    const descriptionInput = createTextarea("project-description", 3);

    inputsContainer.appendChild(title);
    inputsContainer.appendChild(createInputContainer("Project Name", nameInput));
    inputsContainer.appendChild(createInputContainer("Description", descriptionInput));

    // Footer
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const createBtn = document.createElement("button");
    createBtn.classList.add("create-project-button");
    createBtn.type = "button";
    createBtn.textContent = "Create Project";

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("project-cancel-button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";

    footer.appendChild(createBtn);
    footer.appendChild(cancelBtn);

    // Combine
    form.appendChild(inputsContainer);
    form.appendChild(footer);
    formContainer.appendChild(form);

    let content = document.querySelector('.balloon-container');
    content.appendChild(formContainer);

    let createProjectButton = document.querySelector('.create-project-button');
    createProjectButton.addEventListener('click', () => {
        const newProjectName = document.querySelector('#project-name');
        const newProjectDescription = document.querySelector('#project-description');
        const newProject = createProject(newProjectName.value, newProjectDescription.value);
        projects.push(newProject);
        
        createProjectIcon(newProject);

        newProjectName.value = '';
        newProjectDescription.value = '';
        document.querySelector('.balloon-container').innerHTML='';
        updateBalloonImage();
        saveData();
    });

    let cancelCreateProjectButton = document.querySelector('.project-cancel-button');
    cancelCreateProjectButton.addEventListener('click', () => {
        let newProjectName = document.querySelector('#project-name');
        let newProjectDescription = document.querySelector('#project-description');
        
        newProjectName.value = '';
        newProjectDescription.value = '';
        document.querySelector('.balloon-container').innerHTML='';

        updateBalloonImage();
    });
}

function createTaskForm() {
    const formContainer = document.createElement("div");
    formContainer.classList.add("task-form-container");

    const form = document.createElement("div");
    form.classList.add("task-form");

    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("text-inputs-container");

    // Title
    const title = document.createElement("div");
    title.classList.add("form-title");
    title.textContent = "New Task";

    // Inputs
    const nameInput = createTextInput("task-name", true);
    const descInput = createTextarea("task-description", 3);
    const dueInput = createTextInput("due-date", true, "yyyy-MM-dd HH:mm");
    const projInput = createTextInput("task-project", true);

    inputsContainer.appendChild(title);
    inputsContainer.appendChild(createInputContainer("Task Name", nameInput));
    inputsContainer.appendChild(createInputContainer("Description", descInput));
    inputsContainer.appendChild(createInputContainer("Due Date", dueInput));
    inputsContainer.appendChild(createInputContainer("Project Name", projInput));

    // Footer
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const createBtn = document.createElement("button");
    createBtn.classList.add("create-task-button");
    createBtn.type = "button";
    createBtn.textContent = "Create Task";

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("task-cancel-button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";

    footer.appendChild(createBtn);
    footer.appendChild(cancelBtn);

    form.appendChild(inputsContainer);
    form.appendChild(footer);
    formContainer.appendChild(form);

    let content = document.querySelector('.balloon-container');
    content.appendChild(formContainer);

    let createTaskButton = document.querySelector('.create-task-button');
    createTaskButton.addEventListener('click', () => {
        const newTaskName = document.querySelector('#task-name');
        const newTaskDescription = document.querySelector('#task-description');
        const newTaskDueDate = document.querySelector('#due-date');
        const newTask = createTask(newTaskName.value, newTaskDescription.value, parse(newTaskDueDate.value, "yyyy-MM-dd HH:mm", new Date()));
        
        let project = document.querySelector('#task-project');
        let projectObj = projects.find(p => p.getTitle() === project.value);
        if (projectObj) {
            projectObj.getTasks().push(newTask);
        } else {
            let newProject = createProject(project.value, "");
            newProject.getTasks().push(newTask);
            projects.push(newProject);
            createProjectIcon(newProject);
        }

        tasks.push(newTask);

        newTaskName.value = '';
        newTaskDescription.value = '';
        newTaskDueDate.value = '';
        document.querySelector('.balloon-container').innerHTML='';
        updateBalloonImage();
        saveData();
    });

    let cancelCreateTaskButton = document.querySelector('.task-cancel-button');
    cancelCreateTaskButton.addEventListener('click', () => {
        let newTaskName = document.querySelector('#task-name');
        let newTaskDescription = document.querySelector('#task-description');
        
        newTaskName.value = '';
        newTaskDescription.value = '';
        document.querySelector('.balloon-container').innerHTML='';

        updateBalloonImage();
    });
}

function createBalloon(src, class1) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add(class1);

    return img;
}

function updateBalloonImage() {
    let balloonType;
    if (projects.length < 5) {
        balloonType = happyBalloon;
    } else if (projects.length < 10) {
        balloonType = stressedBalloon;
    } else {
        balloonType = angryBalloon;
    }
    const content = document.querySelector('.balloon-container');
    content.innerHTML = '';
    let newBalloon = createBalloon(balloonType, 'balloon');
    content.appendChild(newBalloon);

}

function showTasks (project) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("tasks-container", "tasks-sub-container");
    let content = document.querySelector('.balloon-container');
    content.innerHTML='';
    content.appendChild(taskContainer);


    for (let task of project.getTasks()) {
        const newTaskContainer = document.createElement('div');
        newTaskContainer.classList.add('task-item');
        const newTaskIcon = document.createElement('img');
        newTaskIcon.src = fileIcon;
        newTaskIcon.classList.add('icon', 'task');
        const taskTitleDiv = document.createElement('div');
        taskTitleDiv.classList.add('task-title');
        taskTitleDiv.textContent = task.getTitle();
        newTaskContainer.appendChild(newTaskIcon);
        newTaskContainer.appendChild(taskTitleDiv);
        const taskContainer = document.querySelector('.tasks-sub-container');
        
        newTaskContainer.addEventListener('click', () => {
            showTaskInfo(task);
        });
        
        taskContainer.appendChild(newTaskContainer);
    }
}

function showTaskInfo(task) {
    const taskInfoContainer = document.createElement("div");
    taskInfoContainer.classList.add("tasks-sub-container", "task-info-container");

    taskInfoContainer.textContent =
        task.getTitle() + "\n" +
        task.getDescription() + "\n" +
        "Due: " + task.getDueDate().toString();

    const dueDate = new Date(task.getDueDate());
    const today = new Date();

    if (dueDate < today) {
        taskInfoContainer.classList.add("overdue");
        let overdue = document.createElement('div');
        overdue.classList.add('overdue-text');
        overdue.textContent = 'OVERDUE';
        taskInfoContainer.appendChild(overdue);
    } else {
        taskInfoContainer.classList.add("not-overdue");
    }

    const content = document.querySelector('.balloon-container');
    content.innerHTML = '';
    content.appendChild(taskInfoContainer);
}

function createProjectIcon(newProject) {
    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('project-item');
    newProjectContainer.id = 'project-' + projectCount;
    projectCount++;
    const newProjectIcon = document.createElement('img');
    newProjectIcon.src = folderIcon;
    newProjectIcon.classList.add('icon', 'project');
    const projectTitleDiv = document.createElement('div');
    projectTitleDiv.classList.add('project-title');
    projectTitleDiv.textContent = newProject.getTitle();
    newProjectContainer.appendChild(newProjectIcon);
    newProjectContainer.appendChild(projectTitleDiv);
    const projectContainer = document.querySelector('.tasks-container');
    projectContainer.appendChild(newProjectContainer);

    newProjectContainer.addEventListener('click', () => showTasks(newProject));
}



//Main program

loadData();
updateBalloonImage();

let newProjectButton = document.querySelector('.new-project');
newProjectButton.addEventListener('click', () => {
    let content = document.querySelector('.balloon-container');
    content.innerHTML = '';

    createProjectForm();
});

let newTaskButton = document.querySelector('.new-task');
newTaskButton.addEventListener('click', () => {
    let content = document.querySelector('.balloon-container');
    content.innerHTML = '';

    createTaskForm();
});

let title = document.querySelector('.logo');
title.addEventListener('click', () => updateBalloonImage());

function saveData() {
    localStorage.setItem("projects", JSON.stringify(projects.map(p => p.toJSON())));
    localStorage.setItem("tasks", JSON.stringify(tasks.map(t => t.toJSON())));
};

function loadData() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    savedTasks.forEach(t => tasks.push(createTask(t.title, t.description, t.dueDate)));

    savedProjects.forEach(p => {
        const project = createProject(p.title, p.description);
        project.setTasks(p.tasks.map(t => createTask(t.title, t.desctiption, t.dueDate)));
        createProjectIcon(project);
        projects.push(project);
        
    });
    projectCount = projects.length;
};

export {projects, tasks, projectCount, saveData};