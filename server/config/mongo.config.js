const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/projectdb')
.then(() => console.log("DB Connected"))
.catch(error => console.error('Error conecting DB', error));