const request = require('supertest');
const app = require('../../app');
const { resetTasks } = require('../../models/taskModel');


describe('Task API - Integration Tests', () => {
    beforeEach(() => {
        resetTasks();
    })

    test('POST /tasks - should return 400 if title is missing', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ description: 'No title' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing required field');
    });

    test('POST /tasks - should create a task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'API Task',
                description: 'API Desc',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('API Task');
    })

    test("GET /tasks - should get all tasks", async () => {
        await request(app).post('/tasks').send({ title: 'T1', description: 'D1' });
        await request(app).post('/tasks').send({ title: 'T2', description: 'D2' });

        const response = await request(app).get('/tasks');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    })

    test('GET /tasks/:id - should return 404 if task not found', async () => {
        const response = await request(app).get('/tasks/9999');
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Task not found');
    });

    test('PUT /tasks/:id - should return 404 if task not found', async () => {
        const response = await request(app)
            .put('/tasks/9999')
            .send({ title: 'Does not exist' });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Task not found');
    });

    test('DELETE /tasks/:id - should return 404 if task not found', async () => {
        const response = await request(app).delete('/tasks/9999');
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Task not found');
    });

    test('POST /tasks - should return 400 if description is missing', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'No description' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing required field');
    });

    test('PUT /tasks/:id - should update only provided fields', async () => {
        const postRes = await request(app).post('/tasks').send({
            title: 'Partial Update',
            description: 'Desc',
        });

        const updateRes = await request(app)
            .put(`/tasks/${postRes.body.id}`)
            .send({ isCompleted: true });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.title).toBe('Partial Update');
        expect(updateRes.body.isCompleted).toBe(true);
    });

    test('PUT /tasks/:id - should update task', async () => {
        const task = await request(app).post('/tasks').send({
            title: 'Old Title',
            description: 'Old Desc',
        });

        const updated = await request(app).put(`/tasks/${task.body.id}`).send({
            title: 'New Title',
            isCompleted: true,
        });

        expect(updated.statusCode).toBe(200);
        expect(updated.body.title).toBe('New Title');
        expect(updated.body.isCompleted).toBe(true);
    });

    test('DELETE /tasks/:id - should delete a task', async () => {
        const task = await request(app).post('/tasks').send({
            title: 'To Delete',
            description: 'Desc',
        });

        const delRes = await request(app).delete(`/tasks/${task.body.id}`);

        expect(delRes.statusCode).toBe(200);
        expect(delRes.body.id).toBe(task.body.id);

        const getRes = await request(app).get('/tasks');
        expect(getRes.body.length).toBe(0);
    });
})