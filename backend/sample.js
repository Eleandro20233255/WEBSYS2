const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//file upload
const multer = require('multer');
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
  cb(null, file.originalname)
  }
  });

  const uploadToDisk = multer({ storage: storage });

app.post('/api/upload', uploadToDisk.single('image'),(req, res) => {
 if(role =='admin'){
  console.log(req.file);

  res.send({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size
  });
 }
  
});

//file download
app.get('/download', function(req, res){
  if (role == 'admin' && role == 'student'){
    const file = `${__dirname}/uploads/${req.query.filename}`;
    res.download(file);
  }
   
  });

const user = {
  id: 1,
  username: 'admin',
  password: 'password', 
  role: 'admin'
};
// const user = [
//   {
//     id: 1,
//     username: 'admin',
//     password: 'password', 
//     role: 'admin'
//   },
//   {
//     id: 2,
//     username: 'student',
//     password: 'password',
//     role: 'student'
//   }
// ];



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
  req.session.role
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
