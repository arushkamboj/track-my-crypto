const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');

//set up app
const app = express();

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3000;

app.listen(PORT, () => console.log(`app is listening on PORT: ${PORT}`));