const express=require('express');
const app=express();
app.use(express.json());

require("dotenv").config();

const jwt=require('jsonwebtoken');

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_LINK);

const bcrypt = require("bcrypt");

const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

app.post("/signup", async (req, res) => {
    try{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password,10);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
  }
  catch(e){
    res.status(500).json({
            message: "Email already signedup."            
        })
  }
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;


    const user = await UserModel.findOne({
        email: email,
    });

    if (!user) {
    return res.status(403).json({
        message: "Email not found, signup first."
    });
}

    const pass= await bcrypt.compare(password,user.password);

    if (user && pass) {
        const token = jwt.sign({
            id: user._id.toString()
        },
        JWT_SECRET
      );

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect password"
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

app.post("/doTodo",auth,async(req,res)=>{
    const title=req.body.title;
    const userId=req.userId;
    const todo= await TodoModel.findOneAndUpdate({
        userId: userId,
        title: title
    },{
        done:true
    },{
        new:true
    })

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.json({
        message: "Todo marked as done",
        todo
    });

})

app.listen(3000);