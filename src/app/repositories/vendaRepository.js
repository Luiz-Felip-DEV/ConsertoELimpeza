import conexao from "../dataBase/conexao.js";

class vendaRepository {

  async setVenda(dados) {
    const sql = "INSERT INTO vendas SET ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, dados, (error, result) => {  
        if (error) return reject(false);

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    });
  }

  async idSale() {
    const sql = "SELECT max(id) ID FROM vendas";

    return new Promise((resolve, reject) => {
      conexao.query(sql,(error, result) => {
        if (error) return reject(false);

        const row = JSON.parse(JSON.stringify(result));
  
        return resolve(row[0].ID);
      });
    });
  }

  async purchaseValue(idSale)
  {
    const sql = "SELECT T2.nome, T2.valor, T1.quantidade FROM vendas T1 INNER JOIN produtos T2 ON T1.produto_id = T2.id WHERE T1.id = ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, idSale ,(error, result) => {
        if (error) return reject(false);

        const row = JSON.parse(JSON.stringify(result));
  
        return resolve(row);
      });
    });
  }
}

export default new vendaRepository();
