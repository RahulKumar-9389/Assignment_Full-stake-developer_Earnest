import { Request, Response } from "express";
import taskModel from "../models/taskModel.js";


// <-------------- Add Task Controller ----------------->
export async function addTaskController(req: Request, res: Response) {
    try {


        const { title, description, dueDate } = req.body;
        if (!title || !description || !dueDate) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields"
            })
        }

        const userId = req.user.id;

        const task = new taskModel({
            title,
            description,
            dueDate,
            userId
        })
        await task.save();
        res.status(201).send({
            success: true,
            message: "New task addedd",
            task
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
};



// <-------------- Get All Tasks Controller ----------------->
export async function getTasksController(req: Request, res: Response) {
    try {
        const tasks = await taskModel.find({ userId: req.user.id });
        if (!tasks) {
            return res.status(404).send({
                message: "No task available please add someone"
            })
        }
        res.status(200).send({
            success: true,
            message: 'Task found successfully!',
            tasks
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
};



// <-------------- Update Task Controller ----------------->
export async function updateTaskController(req: Request, res: Response) {
    try {


        const { title, description, dueDate, status } = req.body;
        if (!title || !description || !dueDate) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields"
            })
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                title,
                description,
                dueDate,
                status,
                userId: req.user.id
            },
            { new: true }
        )

        if (!updatedTask) {
            return res.status(404).send({
                success: false,
                message: "No task found!"
            })
        }
        res.status(200).send({
            success: true,
            message: "Task updated successfully",
            updatedTask
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


// <-------------- Delete Task Controller ----------------->
export async function deleteTaskController(req: Request, res: Response) {
    try {
        const task = await taskModel.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'No task found'
            })
        }
        res.status(200).send({
            success: true,
            message: "Task deleted successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


// Get Single Task
export async function getSingleTaskController(req: Request, res: Response) {
    try {
        const taskID = req.params.id;
        if (!taskID) {
            return res.status(404).send({
                success: false,
                message: "Task Id is missing!"
            })
        }

        const task = await taskModel.findOne({ userId: req.user.id, _id: taskID })
        if (!task) {
            return res.status(404).send({
                success: false,
                message: "No task found!"
            })
        }
        res.status(200).send({
            success: true,
            message: "Task found successfully!",
            task
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}