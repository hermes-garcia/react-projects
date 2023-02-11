const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbConnection} = require('./database/config');

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors())

// Public dir
app.use( express.static('public') ); // middleware

// Read & parse body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen requests
app.listen(process.env.PORT,() => {
    console.log(`server running on ${process.env.PORT} port`);
});
