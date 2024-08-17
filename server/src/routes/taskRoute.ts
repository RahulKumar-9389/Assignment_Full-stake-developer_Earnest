import express from 'express';
import { addTaskController, deleteTaskController, getSingleTaskController, getTasksController, updateTaskController } from '../controllers/taskController.js';
import isLogin from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create Task Route
router.post("/add", isLogin, addTaskController);


// update task route
router.put('/update/:id', isLogin, updateTaskController);


// delete task route
router.delete("/delete/:id", isLogin, deleteTaskController)


// get all tasks
router.get("/tasks", isLogin, getTasksController);

// get single task 
router.get('/task/:id', isLogin, getSingleTaskController)

export default router;