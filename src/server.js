const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const server = express();
dotenv.config();

// Routes
const mainRouter = require('./routes/routes');

// Models
const User = require('./models/User');
const Product = require('./models/Product');

// settings database and middleware
const connection = require('../config/database/Connection');
const auth = require('../config/middleware/Auth');

server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(cors());

server.use(mainRouter)

server.use((req, res) => {
    res.sendStatus(404);
})
server.listen(process.env.PORT, () => console.log(`server running`))