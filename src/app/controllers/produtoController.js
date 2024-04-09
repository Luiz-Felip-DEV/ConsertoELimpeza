import productUtils from "../utils/produtoUtils.js";
import productRepository from "../repositories/produtoRepository.js";
import vendaRepository from "../repositories/vendaRepository.js";

class produtoController {
  /**
   *
   * @param req
   * @param res
   * action para registro de produtos
   * @returns
   */
  async setProduct(req, res) {
    const arrDados = await productUtils.setProduct(req.body);

    if (arrDados.length === 0) {
      return res.status(500).json({
        error: true,
        msgUser: "Tipo de produto invalido, Tipos aceitos: FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO.",
        msgOriginal: "Tipo de produto invalido.",
      });
    }

    let verify = false;

    try {
      const arrRetorno = await productRepository.setProduct(arrDados);
      verify = arrRetorno.affectedRows != 1 ? true : false;
    } catch (e) {
      return res.status(500).json({
        error: true,
        msgUser: "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao inserir produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao inserir produto. Array retornou vazio.",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produto cadastrado com sucesso.",
      msgOriginal: null,
    });
  }

  /**
   *
   * @param req
   * @param res
   * action para listar produtos
   * @returns
   */
  async getProducts(req, res) {
    let arrDados = [];
    let verify = false;

    try {
      arrDados = await productRepository.getProducts();
      verify = arrDados.length == 0 ? true : false;
    } catch (e) {
      return res.status(500).json({
        error: true,
        msgUser: "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao inserir produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Array retornou vazio.",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: null,
      msgOriginal: null,
      results: arrDados,
    });
  }

  async deleteProduct(req, res) {
    const idProduct = req.body.id_product;
    let verify = false;

    try {
      const arrDados = await productRepository.deleteProduct(idProduct);
      verify = arrDados.affectedRows != 1 ? true : false;
    } catch (e) {
      return res.status(500).json({
        error: true,
        msgUser: "Erro ao deletar produto, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao deletar produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Produto não encontrado, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Array retornou vazio.",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produto deletado com sucesso.",
      msgOriginal: null,
    });
  }

  async updateProduct(req, res) {
    const arrDados = await productUtils.updateProduct(req.body);

    if (arrDados.length === 0) {
      return res.status(500).json({
        error: true,
        msgUser: "Tipo de produto invalido, Tipos aceitos: FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO.",
        msgOriginal: "Tipo de produto invalido.",
      });
    }

    let verify = false;

    try {
      const arrUpdate = await productRepository.updateProduct(arrDados);
      verify = arrUpdate.affectedRows != 1 ? true : false;
    } catch {
      return res.status(500).json({
        error: true,
        msgUser: "Erro ao tentar atualizar produto. Por Favor, Tente Novamente mais tarde.",
        msgOriginal: "Erro ao tentar atualizar produto, Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Produto não encontrado, Por Favor, Tente Novamente mais tarde.",
        msgOriginal: "Produto com o id: " + req.body.id_product + ", não encontrado",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produto atualizado com sucesso.",
      msgOriginal: null,
    });
  }

  async productOver(req, res)
  {
    let arrDados = [];
    let verify   = false;

    try {
      arrDados = await productRepository.productOver();
      verify   = (!arrDados[0]) ? true : false;
    } catch (e) {
      return res.status(400).json({
        error: true,
        msgUser: "Erro ao buscar produtos no estoque.",
        msgOriginal: "Erro ao buscar produtos no estoque.",
      });
    }

    if (verify) {
        return res.status(200).json({
          error: false,
          msgUser: "Nenhum produto acabando no estoque.",
          msgOriginal: null,
        });
    }

    return res.status(200).json({
      error: false,
      msgUser: null,
      msgOriginal: null,
      produtos: arrDados
    });
  }
}

export default new produtoController();
