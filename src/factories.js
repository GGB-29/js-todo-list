import { parseISO } from "date-fns";

function createTask (title, description, dueDate) {
    let taskTitle = title;
    let taskDescription = description;
    let taskDueDate = dueDate instanceof Date ? dueDate : parseISO(dueDate);

    if (isNaN(taskDueDate)) {
        console.error("Invalid due date:", dueDate);
        taskDueDate = new Date();
    }

    const getTitle = () => taskTitle;
    const setTitle = (newTitle) => { taskTitle = newTitle; };

    const getDescription = () => taskDescription;
    const setDescription = (newDescription) => { taskDescription = newDescription; };

    const getDueDate = () => taskDueDate;
    const setDueDate = (newDueDate) => { taskDueDate = newDueDate instanceof Date ? newDueDate : parseISO(newDueDate); };

    const toJSON = () => ({
        title: taskTitle, 
        description: taskDescription, 
        dueDate: taskDueDate.toISOString()
    });

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getDueDate, setDueDate, toJSON
        };
}

function createProject (title, description) {
    let projectTitle = title;
    let projectDescription = description;
    let projectTasks = [];

    const getTitle = () => projectTitle;
    const setTitle = (newTitle) => { projectTitle = newTitle; };


    const getDescription = () => projectDescription;
    const setDescription = (newDescription) => { projectDescription = newDescription; };

    const getTasks = () => {return projectTasks;};
    const setTasks = (newTasks) => { projectTasks = newTasks; };

    const toJSON = () => ({
        title: projectTitle, 
        description: projectDescription, 
        tasks: projectTasks.map(task => task.toJSON())
    });

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getTasks, setTasks, toJSON
    };
}

export {createTask, createProject};