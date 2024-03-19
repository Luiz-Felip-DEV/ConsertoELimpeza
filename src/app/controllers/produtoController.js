import productUtils from "../utils/produtoUtils.js";
import productRepository from "../repositories/produtoRepository.js"

class produtoController {

    /**
     * 
     * @param req
     * @param res 
     * action para registro de produtos
     * @returns 
     */
    async setProduct(req, res)
    {
        const arrDados = await productUtils.setProduct(req.body);

        let verify = false;

        try {
            const arrRetorno = await productRepository.setProduct(arrDados);
            verify           = (arrRetorno.affectedRows != 1) ? true : false;
        }catch (e) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao inserir produto. Error: " + e.message
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao inserir produto. Array retornou vazio."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Produto cadastrado com sucesso.",
            msgOriginal: null
        });
    }
   
}

export default new produtoController();