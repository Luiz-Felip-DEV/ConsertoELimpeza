import { Router } from "express";

import userRequest from "./app/requests/userRequest.js";
import userController from "./app/controllers/userController.js";

const router  = Router();

router.post('/register', userRequest.setUser, userController.setUser);


// POST

// router.post('/register', FuncionarioRequest.login,FuncionarioController.login);

router.use((req, res) => {res.status(404).json({error: true,msgUser: "Rota não encontrada.",msgOriginal: "Rota não encontrada." })});

export default router 