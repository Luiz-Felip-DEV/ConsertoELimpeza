import { Router } from "express";

import jwtUtils from "./app/utils/jwtUtils.js";
import userRequest from "./app/requests/userRequest.js";
import userController from "./app/controllers/userController.js";

const router  = Router();

// POST

router.post('/register', userRequest.setUser, userController.setUserAction);
router.post('/login', userRequest.setLogin, userController.setLoginAction);

// GET

router.post('/list', jwtUtils.checkToken);

// UPDATE



// DELETE



// CASO NAO ENCONTRE NENHUMA ROTA

router.use((req, res) => {res.status(404).json({error: true,msgUser: "Rota não encontrada.",msgOriginal: "Rota não encontrada." })});

export default router 