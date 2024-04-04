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
}

export default new vendaRepository();
