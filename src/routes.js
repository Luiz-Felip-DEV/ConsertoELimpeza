import { Router } from "express";

import jwtUtils from "./app/utils/jwtUtils.js";
import userRequest from "./app/requests/userRequest.js";
import userController from "./app/controllers/userController.js";
import productRequest from "./app/requests/produtoRequest.js";
import productController from "./app/controllers/produtoController.js";
import saleRequest from "./app/requests/vendaRequest.js";
import saleController from "./app/controllers/vendaController.js";

const router  = Router();

// POST

router.post('/register', userRequest.setUser, userController.setUserAction);
router.post('/login', userRequest.setLogin, userController.setLoginAction);
router.post('/sms', userRequest.setSms, userController.setSms);
router.post('/product', productRequest.setProduct, productController.setProduct);

// GET

router.get('/user', jwtUtils.checkToken, userController.getDadosUser);
router.get('/reset-code', userController.resetCode);
router.get('/products', productController.getProducts);

// UPDATE

router.put('/update', jwtUtils.checkToken, userRequest.updateUser, userController.updateUser);
router.put('/password', userRequest.updatePassword, userController.putPassword);
router.put('/product', productRequest.updateProduct, productController.updateProduct);
router.put('/qtd', saleRequest.setSale, saleController.setSale);



// DELETE
    
router.delete('/user', jwtUtils.checkToken, userController.deleteUser);
router.delete('/product', productRequest.deleteProduct, productController.deleteProduct);

// CASO NAO ENCONTRE NENHUMA ROTA

router.use((req, res) => {res.status(404).json({error: true, msgUser: "Rota não encontrada.", msgOriginal: "Rota não encontrada." })});

export default router 