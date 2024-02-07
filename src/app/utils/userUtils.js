class userUtils {

    /**
     * 
     * @param {*} nome 
     * formata um nome
     * @returns 
     */

    formatarNome(nome)
    {
        const arrNome = nome.split(' ');
        for (let i = 0; i < arrNome.length; i++) {
            arrNome[i] = arrNome[i].charAt(0).toUpperCase() + arrNome[i].slice(1);
        }

        return arrNome.join(' ');
    }

    /**
     * 
     * @param {*} cpf 
     * formata um cpf
     * @returns 
     */

    formatarCpf(cpf)
    {
        const cpfLimpo = cpf.replace(/\D/g, '');

        const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        return cpfLimpo.replace(regex, '$1.$2.$3-$4');
    }

    /**
     * 
     * @param {*} telefone 
     * formata um numero de telefone
     * @returns 
     */
    formatarTelefone(telefone) {
        const telefoneLimpo = telefone.replace(/\D/g, '');

        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return telefoneLimpo.replace(regex, '($1) $2-$3');
    }

    /**
     * 
     * @param {*} email 
     * valida se um email é valido
     * @returns 
     */
    emailValido(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 
     * @param {*} data
     * '2023-09-09 -> formato de entrada' 
     * @returns 
     */
    formatarData(data)
    {
        const date = new Date(data);
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');
        return `${ano}/${mes}/${dia}`;
    }

    async setUser(dados) {
        const nome     = (dados.name)      ? this.formatarNome(dados.name)         : '';
        const lastName = (dados.last_name) ? this.formatarNome(dados.last_name)    : ''; 
        const cpf      = (dados.cpf)       ? this.formatarCpf(dados.cpf)           : '';
        const telefone = (dados.telefone)  ? this.formatarTelefone(dados.telefone) : '';
 
        const arrDados = {name: nome, last_name: lastName, cpf: cpf, telefone: telefone, email: dados.email, password: dados.password, type: dados.type.toUpperCase()};

        return arrDados;
    }
}

export default new userUtils();