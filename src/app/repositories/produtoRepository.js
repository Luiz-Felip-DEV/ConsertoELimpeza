import conexao from "../dataBase/conexao.js";

class produtoRepository {

    /**
     * 
     * @param {*} dados 
     * query para inserção de usuario
     * @returns 
     */
    async setProduct(dados)
    {
        const sql = 'INSERT INTO produtos SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 


    async getProducts()
    {
        const sql = 'SELECT id, nome, quantidade,valor, type FROM produtos';

        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async deleteProduct(idProduct)
    {
        const sql = 'DELETE FROM produtos WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,idProduct,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async updateProduct(dados)
    {
        const sql = 'UPDATE produtos SET nome = ?, valor = ?, quantidade = ?, type = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[dados.nome, dados.valor, dados.quantidade, dados.type, dados.id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getQtd(id)
    {
        const sql = 'SELECT nome, quantidade FROM produtos WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async putQtd(id, quantidade)
    {
        const sql = 'UPDATE produtos SET quantidade = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[quantidade, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async productOver()
    {
        const sql = 'SELECT T1.nome, T1.type FROM produtos T1 WHERE T1.quantidade = 0';

        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new produtoRepository();