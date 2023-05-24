const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const { nextTick } = require('process');
const app = express();
mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://admin:test123@calorietracker.ffzyqc8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'calorieTracker'
});

// Define user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

const userController = {};

userController.signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({ username, password });
    res.locals.newUser = newUser;

  } catch (error) {
    res.status(400).send('error in signup')
  }

  return next();
}

userController.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    res.locals.user = user;

  } catch (error) {
    res.status(400).send('error in login')

  }

  return next();
}

app.use(express.json());
app.use(express.urlencoded());

app.post("/api/signup", userController.signup, (req, res) => {
  res.status(201).send("new user created");
})

app.post("/api/login", userController.login, (req, res) => {
  res.status(200).send('user found, successful login')
})

app.post("/api/users", (req, res) => {
  res.send('create user')
})



app.listen(5000, () => { console.log('server started on port 5000') })

module.exports = app;