function createTask (title, description, dueDate) {
    const taskTitle = title;
    const taskDescription = description;
    const taskDueDate = dueDate;

    const getTitle = () => taskTitle;
    const setTitle = (newTitle) => this.taskTitle = newTitle;

    const getDescription = () => taskDescription;
    const setDescription = (newDescription) => this.taskDescription = newDescription;

    const getDueDate = () => taskDueDate;
    const setDueDate = (newDueDate) => this.taskDueDate = newDueDate;

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getDueDate, setDueDate
        };
}

function createProject (title, description) {
    const projectTitle = title;
    const projectDescription = description;
    const projectTasks = [];

    const getTitle = () => projectTitle;
    const setTitle = (newTitle) => this.projectTitle = newTitle;

    const getDescription = () => projectDescription;
    const setDescription = (newDescription) => this.projectDescription = newDescription;

    const getTasks = () => projectTasks;
    const setTasks = (newTasks) => this.projectTasks = newTasks;

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getTasks, setTasks
    };
}

export {createTask, createProject};