const express = require("express");
require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const usersRoute = require('./routes/users');
const actionsRoute = require('./routes/actions');
const doctorsRoute = require('./routes/doctors');
const actionsUserRoute = require('./routes/actionsUser');
const localisationRoute = require('./routes/localisation');
const notificationRoute = require('./routes/notifications');
const notesRoute = require('./routes/notes');
const PORT = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const path = require('path');
const _DIR = path.join(__dirname, 'public');
const flash = require('flash');
const session = require('express-session');
const cors = require("cors");

const io = require('socket.io')(http, {
  cors: {
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"]
  }
});

// allowing CORS:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
    'ess-Control-Request-Method, Access-Control-Request-Headers',
  );

  // no cache
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(express.json());

// Middleware for files upload
app.use(fileUpload());
app.set('socketio', io)
// Serve static files
app.use(express.static(_DIR));
app.use(cors());

// Session 
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'waterfall',
  resave: false,
  saveUninitialized: false
}));

// parse urlencoded request bodies into req.body
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// routes //
app.use('/auth', usersRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/actions/user', actionsUserRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/localisations', localisationRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/notes', notesRoute);
app.use(require('./routes/notif-socket-io')(io));
app.use(require('./routes/notes-socket-io')(io));

// Listen to node server on port 3001 //
http.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});



