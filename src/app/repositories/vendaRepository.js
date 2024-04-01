import conexao from "../dataBase/conexao.js";

class vendaRepository {
  async setVenda(dados) {
    const sql = "INSERT INTO vendas SET ?";

    return new Promise((resolve, reject) => {
      conexao.query(sql, dados, (error, result) => {
        console.log(error);
        if (error) return reject(false);

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    });
  }
}

export default new vendaRepository();
