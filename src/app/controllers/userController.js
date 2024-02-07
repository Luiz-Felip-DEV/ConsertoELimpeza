import userUtils from "../utils/userUtils.js";
import userRepository from "../repositories/userRepository.js";

class userController {

    async setUser(req, res) {
        const arrDados = await userUtils.setUser(req.body);

        // const response = await userRepository.setUser(arrDados);
        
        try {
            await userRepository.setUser(arrDados);
        } catch(e) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar usuario. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar agendamento. Caiu no catch"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! O agendamento foi concluído com êxito.",
            msgOriginal: null
        });
    }
}

export default new userController();