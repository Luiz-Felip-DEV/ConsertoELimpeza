import userUtils from "../utils/userUtils.js";
import userRepository from "../repositories/userRepository.js";
import crypto from 'crypto';
import jwtUtils from "../utils/jwtUtils.js";

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
            verify   = (!arrDados) ? true : false;
        }catch(e) {
            return res.status(400).json({
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

        const jwt = jwtUtils.createToken(arrDados[0].id);

        delete arrDados[0].id;

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
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar usuario. Caiu no catch"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! O agendamento foi concluído com êxito.",
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
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar dados do usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao atualizar dados do usuario. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar dados do usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Não encontrou o usuario no banco."
            });
        }

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

            arrDados = await userRepository.deleteUser(idUser);
            verify   = (arrDados.affectedRows != 1) ? true : false;

        }catch(e) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar excluir dados do usuario. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao excluir dados do usuario. Caiu no catch."
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar excluir dados do usuario. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Não encontrou o usuario no banco."
            });
        }

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
     * action para a atualização de senha
     * @returns 
     */
    async putPassword(req, res) 
    {
        // fazer com o envio de um codigo   
    }
}

export default new userController();