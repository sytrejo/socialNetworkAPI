// Require express and Mongoose
const express = require('express');
const mongoose = require('mongoose');

// Creating the connection to the PORT and Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use(require('./routes'));


// look at these snippets https://www.tabnine.com/code/javascript/functions/mongoose/connect

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkAPI', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed
mongoose.set('debug', true);


// initiate the server on the local host
app.listen(PORT, () => console.log(`Connected to localhost: ${PORT}`));