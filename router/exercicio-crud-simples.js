const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
let tasks = [];
// Recuperar todas as tarefas
app.get('/tasks', (req, res) => {
res.json(tasks);
});
// Recuperar uma tarefa específica por meio de seu identificador
app.get('/tasks/:taskId', (req, res) => {
const taskId = req.params.taskId;
const task = tasks.find(task => task.id === taskId);
if (!task) {
return res.status(404).json({ message: 'Tarefa não encontrada' });
}
res.json(task);
});
// Adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
const task = req.body;
tasks.push(task);
res.status(201).json(task);
});
// Atualizar uma tarefa existente com base em seu identificador
app.put('/tasks/:taskId', (req, res) => {
const taskId = req.params.taskId;
const updatedTask = req.body;
let found = false;

tasks = tasks.map(task => {
if (task.id === taskId) {
found = true;
return { ...task, ...updatedTask };
}
return task;
});
if (!found) {
return res.status(404).json({ message: 'Tarefa não encontrada' });
}
res.json({ message: 'Tarefa atualizada com sucesso' });
});
// Remover uma tarefa da lista com base em seu identificador
app.delete('/tasks/:taskId', (req, res) => {
const taskId = req.params.taskId;
const initialLength = tasks.length;
tasks = tasks.filter(task => task.id !== taskId);
if (tasks.length === initialLength) {
return res.status(404).json({ message: 'Tarefa não encontrada' });
}
res.json({ message: 'Tarefa removida com sucesso' });
});
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});