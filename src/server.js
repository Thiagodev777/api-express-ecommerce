const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const server = express();
dotenv.config();

// routes config
const mainRouter = require('./routes/routes');
// database connection
const connection = require('../config/database/Connection');
// middleware 
const auth = require('../config/middleware/Auth');
// server config
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(cors());

// routes
server.use(mainRouter)


server.listen(process.env.PORT, () => console.log('run'))