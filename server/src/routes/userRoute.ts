import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
import isLogin from '../middlewares/authMiddleware.js';

const router = express.Router();


// REGISTER ROUTE
router.post('/register', registerController);


// LGOIN ROUTE
router.post('/login', loginController);


// PRIVATE ROUTE 
router.get('/user-auth', isLogin, (req, res) => {
    res.status(200).send("ok")
})


export default router;