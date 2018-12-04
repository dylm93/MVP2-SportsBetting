const express = require ('express');
const morgan = require ('morgan');
const path = require ('path');
const bodyParser = require ('body-parser');
const router = require ('./routes');

const server = express();
const port = 3000;


server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '../client/dist')))

server.use('/', router);

server.listen(port, () => console.log(`server is listening on port ${port}`)) 