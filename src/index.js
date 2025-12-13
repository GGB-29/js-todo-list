import "./styles.css";
import { createBalloon, createProjectForm, createTaskForm, updateBalloonImage } from "./dom";

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