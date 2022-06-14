const express = require('express');
const PORT = 3001;
const app = express();

let persons = [{
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    let now = new Date();
    let total = persons.length;
    res.send(`<div><p><strong>Phonebook has info for: ${total} people</strong></p> <p><strong>${now}</strong></p></div>`);
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send();
    }
});



app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));