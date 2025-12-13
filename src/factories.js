function createTask (title, description, dueDate) {
    const taskTitle = title;
    const taskDescription = description;
    const taskDueDate = dueDate;

    const getTitle = () => taskTitle;
    const setTitle = (newTitle) => { taskTitle = newTitle; };

    const getDescription = () => taskDescription;
    const setDescription = (newDescription) => { taskDescription = newDescription; };

    const getDueDate = () => taskDueDate;
    const setDueDate = (newDueDate) => { taskDueDate = newDueDate; };

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getDueDate, setDueDate
        };
}

function createProject (title, description) {
    const projectTitle = title;
    const projectDescription = description;
    let projectTasks = [];

    const getTitle = () => projectTitle;
    const setTitle = (newTitle) => { projectTitle = newTitle; };


    const getDescription = () => projectDescription;
    const setDescription = (newDescription) => { projectDescription = newDescription; };

    const getTasks = () => {return projectTasks;};
    const setTasks = (newTasks) => { projectTasks = newTasks; };

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getTasks, setTasks
    };
}

export {createTask, createProject};