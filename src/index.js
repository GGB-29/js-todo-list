import "./styles.css";
import { createTask, createProject } from "./factories";
import folderIcon from './assets/icons/folder.svg';

let projectCount = 0;
let projects = [];
let tasks = [];

let newProjectButton = document.querySelector('.new-project');
newProjectButton.addEventListener('click', () => {
    let balloons = document.querySelectorAll('.balloon');
    for (let balloon of balloons) {
        balloon.classList.add('hidden');
    }

    let newProjectForm = document.querySelector('.project-form-container');
    newProjectForm.classList.remove('hidden');
});

let createProjectButton = document.querySelector('.create-project-button');
createProjectButton.addEventListener('click', () => {
    const newProjectName = document.querySelector('#project-name');
    const newProjectDescription = document.querySelector('#project-description');
    const newProject = createProject(newProjectName.value, newProjectDescription.value);
    projects.push(newProject);

    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('project-item');
    newProjectContainer.id = 'project-' + projectCount;
    projectCount++;
    const newProjectIcon = document.createElement('img');
    newProjectIcon.src = folderIcon;
    newProjectIcon.classList.add('icon', 'project');
    const projectTitleDiv = document.createElement('div');
    projectTitleDiv.classList.add('project-title');
    projectTitleDiv.textContent = newProjectName.value;
    newProjectContainer.appendChild(newProjectIcon);
    newProjectContainer.appendChild(projectTitleDiv);
    const projectContainer = document.querySelector('.tasks-container');
    projectContainer.appendChild(newProjectContainer);
    
    newProjectName.value = '';
    newProjectDescription.value = '';
    document.querySelector('.project-form-container').classList.add('hidden');
    updateBalloonImage();
});

let cancelCreateProjectButton = document.querySelector('.cancel-button');
cancelCreateProjectButton.addEventListener('click', () => {
    let newProjectName = document.querySelector('#project-name');
    let newProjectDescription = document.querySelector('#project-description');
    
    newProjectName.value = '';
    newProjectDescription.value = '';
    let newProjectForm = document.querySelector('.project-form-container');
    newProjectForm.classList.add('hidden');

    updateBalloonImage();
})

function updateBalloonImage() {
    let balloons = document.querySelectorAll('.balloon');
    if (projects.length < 5) {
        balloons[0].classList.remove('hidden');
    } else if (projects.length < 10) {
        balloons[1].classList.remove('hidden');
    } else {
        balloons[2].classList.remove('hidden');
    }
}