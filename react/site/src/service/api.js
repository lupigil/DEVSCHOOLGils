import axios from 'axios'
const api = axios.create({
    baseURL: 'https://devschoolgilsapi.herokuapp.com'
})

export default class Api {
    async listarCadastros() {
        let r = await api.get(`/matricula`);
        return r.data;
    }

    async inserirAluno(nome, chamada, curso, turma) {
        let r = await api.post(`/matricula`, { nome, chamada, curso, turma });
        return r.data;
    }

    async alterarAluno(id, nome, chamada, curso, turma) {
        let r = await api.put('/matricula/' + id, { nome, chamada, curso, turma });
        return r.data;
    }

    async removerAluno(id) {
        let r = await api.delete('/matricula/' + id);
        return r.data;
    }
}