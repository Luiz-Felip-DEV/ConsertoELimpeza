import productUtils from "../utils/produtoUtils.js";
import productRepository from "../repositories/produtoRepository.js"
import userRepository from "../repositories/userRepository.js";

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
            return res.status(500).json({
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

    /**
     * 
     * @param req
     * @param res 
     * action para listar produtos
     * @returns 
     */
    async getProducts(req, res)
    {
        let arrDados = [];
        let verify   = false;

        try {
            arrDados = await productRepository.getProducts();
            verify   = (arrDados.length == 0) ? true : false;
        }catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao inserir produto. Error: " + e.message
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Array retornou vazio."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrDados
        });
    }

    async deleteProduct(req, res)
    {
        const idProduct = req.body.id_product;
        let arrDados    = [];
        let verify      = false;

        try {
            arrDados = await productRepository.deleteProduct(idProduct);
            verify   = (arrDados.affectedRows != 1) ? true : false;
        }catch(e) {
            return res.status(500).json({
                error: true,
                msgUser: "Erro ao deletar produto, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao deletar produto. Error: " + e.message
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao deletar produto, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Array retornou vazio."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: 'Produto deletado com sucesso.',
            msgOriginal: null
        });
    }   

    async updateProduct(req, res)
    {
        const idProduct = req.body.id_produto;


    }
}

export default new produtoController(); 