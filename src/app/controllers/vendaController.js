import productRepository from "../repositories/produtoRepository.js";
import saleRepository from "../repositories/vendaRepository.js";
import saleUtils from "../utils/vendaUtils.js";

class vendaController {

  async setSale(req, res)
  {
    // const arrTeste = req.body;

    // for (let i = 0; i < arrTeste.length; i++) {
    //   console.log(arrTeste[i].id_product);
    //   console.log(arrTeste[i].quantidade);
    //   console.log(arrTeste[i].tipo_pagamento);
    // }

    // const teste = await saleUtils.idSale();
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

export default new vendaController();