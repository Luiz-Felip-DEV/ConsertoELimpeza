import productUtils from "../utils/produtoUtils.js";
import productRepository from "../repositories/produtoRepository.js";
import saleRepository from "../repositories/vendaRepository.js";
import saleUtils from "../utils/vendaUtils.js";

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
        msgUser:
          "Tipo de produto invalido, Tipos aceitos: FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO.",
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
        msgUser:
          "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao inserir produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser:
          "Erro ao cadastrar produto, Por Favor, Tente novamente mais tarde.",
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
        msgUser:
          "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao inserir produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser:
          "Erro ao buscar produtos, Por Favor, Tente novamente mais tarde.",
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
        msgUser:
          "Erro ao deletar produto, Por Favor, Tente novamente mais tarde.",
        msgOriginal: "Erro ao deletar produto. Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser:
          "Produto não encontrado, Por Favor, Tente novamente mais tarde.",
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
        msgUser:
          "Tipo de produto invalido, Tipos aceitos: FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO.",
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
        msgUser:
          "Erro ao tentar atualizar produto. Por Favor, Tente Novamente mais tarde.",
        msgOriginal: "Erro ao tentar atualizar produto, Error: " + e.message,
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser:
          "Produto não encontrado, Por Favor, Tente Novamente mais tarde.",
        msgOriginal:
          "Produto com o id: " + req.body.id_product + ", não encontrado",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produto atualizado com sucesso.",
      msgOriginal: null,
    });
  }

  async putQtd(req, res)
  {
    const idProduto  = req.body.id_product;
    const quantidade = req.body.quantidade;
    let arrDados     = [];

    try {
      arrDados = await productRepository.getQtd(idProduto);
    } catch (e) {
      return res.status(400).json({
        error: true,
        msgUser: "Quantidade de produto insuficiente.",
        msgOriginal: "Erro ao buscar quantidade de produto, " + e.message + ".",
      });
    }

    if (!arrDados[0]) {
      return res.status(400).json({
        error: true,
        msgUser: "Produto não encontrado.",
        msgOriginal: "Produto não encontrado",
      });
    }

    const qtdProduct = arrDados[0].quantidade;

    if (quantidade > qtdProduct) {
      return res.status(400).json({
        error: true,
        msgUser: "Quantidade de produto insuficiente.",
        msgOriginal: "Quantidade de produto insuficiente.",
      });
    }
    
    let arrSetDados = [];
    let verifySet   = false

    try {
        arrSetDados = await saleUtils.setSale(req.body);
        verifySet   = (!arrSetDados.tipo_pagamento) ? true : false;
    } catch(e) {
        return res.status(400).json({
            error: true,
            msgUser: "Erro ao validar tipo de pagamento.",
            msgOriginal: "Erro ao validar tipo de pagamento, " + e.message + ".",
          });
    }

    if (verifySet) {
        return res.status(400).json({
            error: true,
            msgUser: "Tipo de pagamento invalido, tipos aceitos: PIX, CARTAO, DINHEIRO.",
            msgOriginal: "Tipo de pagamento invalido"
          });
    }

    let setSaleH = [];
    let verifyH = false;

    try {
        setSaleH = await saleRepository.setVenda(arrSetDados);
        verifyH  = (setSaleH.affectedRows != 1) ? true : false;
    }catch(e) {
        return res.status(400).json({
            error: true,
            msgUser: "Erro ao tentar cadastrar venda, Tente Novamente mais tarde.",
            msgOriginal: "Erro ao tentar cadastrar venda, " + e.message
          });
    }

    if (verifyH) {
        return res.status(400).json({
            error: true,
            msgUser: "Erro ao tentar cadastrar venda, Tente Novamente mais tarde.",
            msgOriginal: "Erro ao tentar cadastrar venda, verifyH retornou vazio."
          });
    }

    const putQtd = qtdProduct - quantidade;
    let arrPut = [];
    let verify = false;

    try {
      arrPut = await productRepository.putQtd(idProduto, putQtd);
      verify = arrPut.affectedRows != 1 ? true : false;
    } catch (e) {
      return res.status(400).json({
        error: true,
        msgUser: "Erro ao atualizar quantidade de produto.",
        msgOriginal: "Erro ao atualizar quantidade de produto.",
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Produto não encontrado.",
        msgOriginal: "Erro ao atualizar quantidade de produto.",
      });
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produtos atualizado com sucesso.",
      msgOriginal: "Erro ao atualizar quantidade de produto.",
    });
  }
}

export default new produtoController();
