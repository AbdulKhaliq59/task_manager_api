let tasks = [];


function createTask(title, description) {
    const newTask = {
        id: Date.now().toString(),
        title: title,
        description: description,
        isCompleted: false,
    };
    tasks.push(newTask);
    return newTask;
}

function getAllTasks() {
    return tasks;
}


function getTaskById(id) {
    return tasks.find(task => task.id === id);
}

function updateTask(id, data) {
    const task = getTaskById(id);
    if (task) {
        task.title = data.title ?? task.title;
        task.description = data.description ?? task.description;
        task.isCompleted = data.isCompleted ?? task.isCompleted;
        return task;
    }
    return null;
}


function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        return tasks.splice(index, 1)[0];
    }
    return null;
}


function resetTasks() {
    tasks = [];
}


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    resetTasks,
}