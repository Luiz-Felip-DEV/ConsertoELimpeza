import userUtils from "../utils/userUtils.js";
import userRepository from "../repositories/userRepository.js";
import crypto from 'crypto';
import jwtUtils from "../utils/jwtUtils.js";
import emailController from "./emailController.js";

class userController {

    /**
     * 
     * @param req
     * @param res 
     * action para o login
     * @returns 
     */
    async setLoginAction(req,res) 
    {
        const email     = req.body.email;
        const senhaHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let arrDados    = [];
        let verify      = false; 

        try {
            arrDados = await userRepository.setLogin(email, senhaHash);
            verify   = (!arrDados[0]) ? true : false;
        }catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar fazer o login. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao tentar logar. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "O acesso foi negado devido a informações incorretas. Verifique suas credenciais e faça login novamente.",
                msgOriginal: "Dados incorretos fornecido pelo usuario."
            });
        }

        const jwt = jwtUtils.createToken(arrDados[0].id, arrDados[0].type);

        await userRepository.insertLog(await userUtils.insertLog('Usuario Logado com Sucesso', 'Success', 'Select', arrDados[0].id));

        delete arrDados[0].id;
        delete arrDados[0].type;

        return res.status(200).json({
            error: false,
            msgUser: "Acesso concedido! Você entrou com sucesso. Explore todas as funcionalidades disponíveis.",
            msgOriginal: null,
            jwt: jwt,
            results: arrDados
        });
    }

    /**
     * 
     * @param req
     * @param res 
     * action para o cadastro de usuario
     * @returns 
     */
    async setUserAction(req, res) 
    {
        const arrDados  = await userUtils.setUser(req.body);

        if(await userUtils.verifyCpf(req.body.cpf)) {
            return res.status(400).json({
                error: true,
                msgUser: "O CPF fornecido já está associado a uma conta existente. Por favor, use um CPF diferente para se cadastrar.",
                msgOriginal: null
            });
        }

        if(await userUtils.verifyTelephone(req.body.telefone)) {
            return res.status(400).json({
                error: true,
                msgUser: "O Telefone fornecido já está associado a uma conta existente. Por favor, use um Telefone diferente para se cadastrar.",
                msgOriginal: null
            });
        }

        if(await userUtils.verifyEmail(req.body.email)) {
            return res.status(400).json({
                error: true,
                msgUser: "O email fornecido já está associado a uma conta existente. Por favor, use um Email diferente para se cadastrar.",
                msgOriginal: null
            });
        }
        
        try {
            await userRepository.setUser(arrDados);
        } catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar usuario. Caiu no catch"
            });
        }

        await emailController.confirmCadaster(arrDados.name, arrDados.email);

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! O cadastro foi concluído com êxito.",
            msgOriginal: null
        });
    }

    /**
     * 
     * @param req
     * @param res 
     * action para a atualização de dados do usuario
     * @returns 
     */
    async updateUser(req, res)
    {
        const arrDados = await userUtils.updateUser(req.body);
        const idUser   = await jwtUtils.idRecovery(req);
        
        let updateUser = [];
        let verify     = false;

        try {

            updateUser = await userRepository.updateUser(arrDados, idUser);
            verify     = (updateUser.affectedRows != 1) ? true : false;

        } catch(e) {

            await userRepository.insertLog(await userUtils.insertLog(e.message, 'Error', 'Update', idUser));

            return res.status(500).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar dados do usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao atualizar dados do usuario. Caiu no catch"
            });
        }

        if (verify) {
            await userRepository.insertLog(await userUtils.insertLog('Retorno da base de dados vazia.', 'Error', 'Update', idUser));
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar dados do usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Não encontrou o usuario no banco."
            });
        }

        await userRepository.insertLog(await userUtils.insertLog('Dados Atualizados com sucesso.', 'Success', 'Update', idUser));

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! Os dados foram atualizados com êxito.",
            msgOriginal: null
        });
    }

    /**
     * 
     * @param req
     * @param res 
     * action para a deleção de um usuario  
     * @returns 
     */
    async deleteUser(req, res)
    {
        const idUser   = await jwtUtils.idRecovery(req);
        let verify     = false;

        try {

            const arrDados = await userRepository.deleteUser(idUser);
            verify         = (arrDados.affectedRows != 1) ? true : false;

        }catch(e) {

            await userRepository.insertLog(await userUtils.insertLog(e.message, 'Error', 'Delete', idUser));

            return res.status(500).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar excluir dados do usuario. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao excluir dados do usuario. Caiu no catch."
            });
        }

        if (verify) {
            await userRepository.insertLog(await userUtils.insertLog('Retorno da base de dados vazia.', 'Error', 'Delete', idUser));
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar excluir dados do usuario. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Não encontrou o usuario no banco."
            });
        }

        await userRepository.insertLog(await userUtils.insertLog('Dados deletada com sucesso.', 'Success', 'Delete', idUser));

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! Os dados foram excluidos com êxito.",
            msgOriginal: null
        });
    }

    /**
     * 
     * @param req
     * @param res 
     * action para trazer dados do usuario
     * @returns 
     */
    async getDadosUser(req, res) 
    {
        const idUser   = await jwtUtils.idRecovery(req);
        let arrDados   = [];
        let verify     = false;

        try {

            arrDados = await userRepository.getDadosUser(idUser);
            verify   = (!arrDados[0]) ? true : false;

        }catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar procurar dados do usuario. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao buscar usuario, caiu no catch."
            });
        }

        if(verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Nenhum usuario encontrado. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Não encontrou o usuario no banco."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrDados
        });
    }

    /**
     * 
     * @param req
     * @param res 
     * action para envio de codigo para reset de senha
     * @returns 
     */
    async resetCode(req, res)
    {
        const email  = req.query.email;
        let arrDados = [];
        let verify   = false; 

        try {
            arrDados = await userRepository.resetCode(email);
            verify   = (!arrDados[0]) ? true : false;
        } catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Ocorreu um erro interno ao processar sua solicitação de redefinição de senha. Por favor, tente novamente mais tarde.",
                msgOriginal: "Caiu no catch, motivo: " + e.message
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "O e-mail fornecido não está associado a uma conta. Verifique se você digitou corretamente o e-mail ou registre-se para criar uma nova conta.",
                msgOriginal: "Nenhum email encontrado no banco."
            });
        }

        const code = await emailController.resetPassword(email, arrDados[0].name);

        return res.status(200).json({
            error: false,
            msgUser: 'Um código de redefinição de senha foi enviado para o seu endereço de e-mail.',
            msgOriginal: null,
            codigo: code
        });
    }

     /**
     * 
     * @param req
     * @param res 
     * action para a atualização de senha
     * @returns 
     */
     async putPassword(req, res) 
     {
        const email   = req.body.email;
        const newPass = crypto.createHash('sha256').update(req.body.new_password).digest('hex');
        let arrDados  = [];
        let verify    = false;  
        
        try {
            arrDados = await userRepository.putPassword(email, newPass);
            verify   = (arrDados.affectedRows != 1) ? true : false;
        } catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Ocorreu um erro interno ao processar sua solicitação de redefinição de senha. Por favor, tente novamente mais tarde.",
                msgOriginal: "Caiu no catch, motivo: " + e.message
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Ocorreu um erro interno ao processar sua solicitação de redefinição de senha. Por favor, tente novamente mais tarde.",
                msgOriginal: "array dados retornou vazio."
            });
        }

        const arrName = await userRepository.resetCode(email);

        await emailController.confirmEmail(arrName[0].name, email);

        return res.status(200).json({
            error: false,
            msgUser: 'Sua senha foi redefinida com sucesso.',
            msgOriginal: null
        }); 
     }
}

export default new userController();