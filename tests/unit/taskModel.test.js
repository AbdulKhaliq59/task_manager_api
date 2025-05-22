const {
    resetTasks,
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../../models/taskModel')


describe('TaskModel - Unit Tests', () => {
    beforeEach(() => {
        resetTasks();
    })

    test('should create a new task', () => {
        const task = createTask('Test Task', 'Test Description');
        expect(task).toHaveProperty('id');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Test Description');
        expect(task.isCompleted).toBe(false);
    });

    test('should get all tasks', () => {
        createTask('Task A', 'Desc A');
        createTask('Task B', 'Desc B');
        const tasks = getAllTasks();
        expect(tasks.length).toBe(2);
    });

    test('should update a task', () => {
        const task = createTask('Old Title', 'Old Desc');
        const updated = updateTask(task.id, {
            title: 'New Title',
            isCompleted: true,
        });
        expect(updated.title).toBe('New Title');
        expect(updated.isCompleted).toBe(true);
    });

    test('should delete a task', () => {
        const task = createTask('To Delete', 'Desc');
        const deleted = deleteTask(task.id);
        expect(deleted.id).toBe(task.id);
        const tasks = getAllTasks();
        expect(tasks.length).toBe(0);
    });

    test('should get task by ID', () => {
        const task = createTask('Find Me', 'Desc');
        const found = getTaskById(task.id);
        expect(found).toEqual(task);
    });

    test('should return null if task to update is not found', () => {
        const result = updateTask('invalid-id', { title: 'test' });
        expect(result).toBeNull();
    });
})