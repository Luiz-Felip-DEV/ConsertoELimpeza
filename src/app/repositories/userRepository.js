import conexao from "../dataBase/conexao.js";

class userRepository {

    async setUser(dados) {
        const sql = 'INSERT INTO users SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 
}

export default new userRepository();