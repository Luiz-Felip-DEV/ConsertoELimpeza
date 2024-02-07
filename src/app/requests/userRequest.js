import userUtils from "../utils/userUtils.js";

class userRequest {

    setUser(req, res, next) {

        let msg = '';

        if (!req.body.type) {
            msg = 'Parametro type é obrigatorio.'
        }

        if(!req.body.password) {
            msg = 'Parametro password é obrigatorio.'
        }

        if(!req.body.email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if(!req.body.telefone) {
            msg = 'Parametro telefone é obrigatorio.'
        }

        if(!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.'
        }

        if (!req.body.last_name) {
            msg = 'Parametro last_name é obrigatorio.'
        }

        if(!req.body.name) {
            msg = 'Parametro name é obrigatorio.'
        }

        if (!userUtils.emailValido(req.body.email)) {
            msg = 'Parametro email invalido.'
        }

        if (msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }
}

export default new userRequest();