const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
let people = [];
// Recuperar todas as pessoas
app.get('/people', (req, res) => {
res.json(people);
});
// Recuperar uma pessoa específica 
app.get('/people/:personId', (req, res) => {
const personId = req.params.personId;
const person = people.find(person => person.id === personId);
if (!person) {
return res.status(404).json({ message: 'Pessoa não encontrada' });
}
res.json(person);
});
// Adicionar uma pessoa
app.post('/people', (req, res) => {
const person = req.body;
people.push(person);
res.status(201).json(person);
});
// Atualizar uma pessoa com base em seu identificador
app.put('/people/:personId', (req, res) => {
const personId = req.params.personId;
const updatedPerson = req.body;
let found = false;

people = people.map(person => {
if (person.id === personId) {
found = true;
return { ...person, ...updatedPerson };
}
return person;
});
if (!found) {
return res.status(404).json({ message: 'Pessoa não encontrada' });
}
res.json({ message: 'Pessoa atualizada com sucesso' });
});
// Remover uma pessoa da lista 
app.delete('/people/:personId', (req, res) => {
const personId = req.params.personId;
const initialLength = people.length;
people = people.filter(person => person.id !== personId);
if (people.length === initialLength) {
return res.status(404).json({ message: 'Pessoa não encontrada' });
}
res.json({ message: 'Pessoa removida com sucesso' });
});
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});