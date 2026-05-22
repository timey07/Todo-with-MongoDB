const express=require('express');
require("dotenv").config();
const app=express();
app.use(express.json());
const { UserModel, TodoModel } = require("./db");
const jwt=require('jsonwebtoken');
const { auth, JWT_SECRET } = require("./auth");

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_LINK);


app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
        },
        JWT_SECRET
      );

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    });

    res.json({
        message: "Todo created"
    });
});

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });

    res.json({
        todos
    });
});

app.listen(3000);