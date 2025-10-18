const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const app = express();

const users = [
  {id: 1, username: 'admin', password: 'password', role: 'admin'},
  {id: 2, username: 'student', password: 'password', role: 'student'}
];

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

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  (username, password, done) => {
    const findUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (findUser) return done(null, findUser);
    return done(null, false, { message: 'Invalid Fields' });
  }
));


passport.serializeUser((user, done) => {
 done(null, user.id)
});


passport.deserializeUser((id, done) => {
   const user = users.find((user) => user.id === id);
  if(user){
    return done(null, user);
  
  }
  else{
    return done(new Error('Not Found'), false);
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

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
  cb(null, file.originalname)
  }
  });

  const uploadToDisk = multer({ storage: storage });

//middlewares
function isAuthenticated(req, res, next){
  if (req.isAuthenticated()){
   return next();
  }
  return res.status(401).json({message: 'log in first'});
}

function isAdmin(req, res, next){
  if(req.user.role === 'admin'){
    return next();
  }
  return res.status(403).json({message: 'Denied Admins Only'});
}
//file upload
app.post('/api/upload', isAuthenticated, isAdmin,uploadToDisk.single('image'),(req, res) => {
 console.log(req.file);

  res.send({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size
  });
});

//file download
app.get('/download', isAuthenticated, function(req, res){
    const file = `${__dirname}/uploads/${req.query.filename}`;
    res.download(file);
});

app.listen(3000, () => {
  console.log(`Server has started at http://localhost:3000`);
});
