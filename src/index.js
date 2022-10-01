const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const {username} = request.headers;

  const userExists = users.some(user => user.username === username);
  
  if(!userExists){
    return response.status(404).json({error: 'UserAccount not found!'})
  }

  request.username = username;

  return next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some(user => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: 'Username already exists' })
  };

  users.push({
    id: uuidv4(),
    name: name,
    username: username,
    todos: []
  })

  return response.status(201).json(users)

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request;

  const acc = users.find(user => user.username === username);

  response.status(200).json({todos: acc.todos});
  
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { title, deadline } = request.body;
  const { username} = request;

  const acc = users.find(user => user.username === username);

  const newTodo = {
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at:new Date()
  };

  acc.todos.push(newTodo);

  response.status(201).json(newTodo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;