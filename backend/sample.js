const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();


const user = {
  id: 1,
  username: 'admin',
  password: 'password', 
};


app.use(cors({
  origin: 'http://localhost:4800', 
  credentials: true, 
}));

app.use(express.json());

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());




passport.use(new LocalStrategy((username, password, done) => {
  if (username === user.username && password === user.password) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Invalid credentials' });
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  if (id === user.id) {
    done(null, user);
  } else {
    done(null, false);
  }
});


app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});


app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logout successful' });
  });
});


app.listen(3000, () => {
  console.log(`Server has started at http://localhost:3000`);
});
