const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./server/config/mongo.config');

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));//credentials: true, origin: 'http://localhost:3000' si deja, solo acepta solicitudes del localhost:3000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);
require('./server/routes/project.route')(app);


app.listen(port, () => {
    console.log("Listening at Port 8000")
});