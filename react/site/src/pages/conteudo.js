import { useState, useEffect } from 'react';

import { ContainerConteudo, Traco } from './conteudo.styled.js'
import { DevInput, DevButton } from '../components/outros/inputs/inputs'


import Api from '../service/api.js';
const api = new Api();


export default function Conteudo() {

    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState('');
    const [chamada, setChamada] = useState('');
    const [curso, setCurso] = useState('');
    const [turma, setTurma] = useState('');
    const [idAlterando, setidAlterando] = useState(0);

    async function listar() {
        let r = await api.listarCadastros();
        setAlunos(r);
    }

    async function inserir() {
        if (idAlterando == 0) {
            let r = await api.inserirAluno(aluno, chamada, curso, turma);
            
            if (r.erro)
                alert(r.erro)
            else
                alert('aluno inserido');

        } else {
            let r = await api.alterarAluno(idAlterando, aluno, chamada, curso, turma);
            
            if (r.erro)
                alert(r.erro)
            else
                alert('aluno alterado');
        }

        limparCampos();
        listar();
    }

    function limparCampos() {
        setAluno('');
        setChamada('');
        setCurso('');
        setTurma('');
        setidAlterando(0);
    }

    async function remover(id) {
        let r = await api.removerAluno(id);
        alert('aluno removido');

        listar();
    }

    async function alterando(item) {
        setAluno(item.nm_aluno);
        setChamada(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setidAlterando(item.id_matricula);
    }

    useEffect(() => {
        listar();
    }, [])

    return (
        <ContainerConteudo>
            <div className="cabecalhoConteudo">
                <div className="perfil">
                    <div className="imgPerfil"><img src="/assets/images/usuario.jpg" alt="" /></div>
                    <div class="notificacao">3</div>    
                </div>

                <div className="msgPerfil">Olá, <b>Gilson Torres</b></div>

                <div className="comandos">
                    <div className="atualizar"> <button> <img src="/assets/images/refresh.png" alt="" /> </button> </div>
                    <div className="logout"> <button> <img src="/assets/images/log-out.png" alt="" /> </button> </div>
                </div>
            </div>

            <div className="cadastros">
                <div className="titulo">
                    <Traco />
                    <div className="novoAluno">{idAlterando === 0 ? 'Novo Aluno' : 'Alterando Aluno ' + idAlterando}</div>
                </div>

                <div className="containerInput1">
                    <div className="box-input">
                        <div className="label">Nome:</div>
                        <DevInput type="text" value={aluno} onChange={e => setAluno(e.target.value)} />
                    </div>
                
                    <div className="box-input1">
                        <div className="label">Curso:</div>
                        <DevInput type="text" value={curso} onChange={e => setCurso(e.target.value)} />
                    </div>
                </div>

                <div className="containerInput2">
                    <div className="box-input">
                        <div className="label">Chamada:</div>
                        <DevInput type="text" value={chamada} onChange={e => setChamada(e.target.value)} />
                    </div>
                
                    <div className="box-input1">
                        <div className="label">Turma:</div>
                        <DevInput type="text" value={turma} onChange={e => setTurma(e.target.value)} />
                    </div>

                    <DevButton onClick={inserir} className="btn-cadastro">{idAlterando === 0 ? 'Cadastrar' : 'Alterar'}</DevButton>
                </div>
            </div>

            <div className="matriculados">
                <div className="titulo">
                    <Traco />
                    <div className="novoAluno">Alunos Matriculados</div>
                </div>
  
                <table>

                    <thead>
                        <tr className="cabecalhoTb">
                            <th className="idTb">ID</th>
                            <th className="alunoTb">Nome</th>
                            <th className="numeroTb">Chamada</th>
                            <th className="turmaTb">Turma</th>
                            <th className="cursoTb">Curso</th>
                            <th className="espaço"></th>
                            <th className="espaço"></th>
                        </tr>
                    </thead>

                    <tbody>

                        {alunos.map((item, i) => 

                            <tr className={i % 2 === 0 ? "linha-alternada" : ""}>
                                <td className="idTb1">{item.id_matricula}</td>
                                <td title={item.nm_aluno}>
                                    {item.nm_aluno != null && item.nm_aluno.lenght >= 25
                                        ? item.nm_aluno.substr(0, 25) + '...'
                                        : item.nm_aluno}
                                </td>
                                <td>{item.nr_chamada}</td>
                                <td>{item.nm_turma}</td>
                                <td>{item.nm_curso}</td>
                                <td className="botao-visivel"> <button onClick={() => alterando(item) } > <img src="/assets/images/edit.png" alt="" /> </button> </td>
                                <td className="botao-visivel"> <button onClick={() => remover(item.id_matricula) } > <img src="/assets/images/trash.png" alt="" /> </button> </td>
                            </tr>

                        )}

                    </tbody>

                </table>
            </div>
        </ContainerConteudo>
    )
}