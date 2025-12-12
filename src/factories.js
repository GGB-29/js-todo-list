function createTask (title, description, dueDate, priority, notes, checklist) {
    const taskTitle = title;
    const taskDescription = description;
    const taskDueDate = dueDate;
    const taskPriority = priority;
    const taskNotes = notes;
    const taskChecklist = checklist;

    const getTitle = () => taskTitle;
    const setTitle = (newTitle) => this.taskTitle = newTitle;

    const getDescription = () => taskDescription;
    const setDescription = (newDescription) => this.taskDescription = newDescription;

    const getDueDate = () => taskDueDate;
    const setDueDate = (newDueDate) => this.taskDueDate = newDueDate;

    const getPriority= () => taskPriority;
    const setPriority = (newPriority) => this.taskPriority = newPriority;

    const getNotes = () => taskNotes;
    const setNotes = (newNotes) => this.taskNotes = newNotes;

    const getChecklist = () => taskChecklist;
    const setChecklist = (newChecklist) => this.taskChecklist = newChecklist;

    return {getTitle, setTitle, 
            getDescription, setDescription, 
            getDueDate, setDueDate, 
            getPriority, setPriority, 
            getNotes, setNotes, 
            getChecklist, setChecklist
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