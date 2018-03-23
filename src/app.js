
// ----------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------
const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const fileUpload  = require('express-fileupload');
const path        = require('path');

// ----------------------------------------------------------------------
// Server initialization
// ----------------------------------------------------------------------

const app = express();
const server = require('http').Server(app);

app.use(cors());

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload());

// ----------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------

const upload    = require('./routes/upload');
const resource  = require('./routes/resource');
const index     = require('./routes/index');

app.use('/', index);
app.use('/upload', upload);
app.use('/resource', resource);

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// ----------------------------------------------------------------------
// Error handlers
// ----------------------------------------------------------------------

// catch 404/405 and forward to error handler
app.use(function (req, res) {
  res.status(405).send({
    message: 'This route is not allowed !'
  });
});

process.on('uncaughtException', function (err) {
  // handle the error safely
  process.exit(1);
});

// ----------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------
server.listen(3000, function () {
  console.log('API is running on port 3000  ...');
});

const gracefulExit = function () {
  process.exit(0); // close node application
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = app;
