const { z } = require("zod");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3)
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const todoSchema = z.object({
    title: z.string().min(1),
    done: z.boolean(),
    dueDate: z.string().optional()
});

module.exports = {
    signupSchema,
    signinSchema,
    todoSchema
};