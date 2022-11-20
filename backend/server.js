require("dotenv").config( { path: "./.env"} )

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const taskRoutes = require('./routes/tasks');

// Creates an express app.
const app = express();
app.use(express.json());
app.use(cors());

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Listening on ports, " + process.env.PORT);

    app.use('', taskRoutes);
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
            console.log("Connected to mongo!");
        })
        .catch((error) => { console.error("wtf");}
    );
});