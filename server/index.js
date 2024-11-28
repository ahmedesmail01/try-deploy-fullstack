const express = require('express');

const app = express();

app.use(express.json());

// Mock data

let users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 28 }
];

// GET all users

app.get('/users', (req, res) => {
  res.json(users);
});

// GET user by ID

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// POST create user

app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = {
    id: userId,
    name: req.body.name || users[userIndex].name,
    age: req.body.age || users[userIndex].age
  };

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// DELETE delete user

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
