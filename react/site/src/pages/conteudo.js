import { useState, useRef, useEffect } from 'react';

import { ContainerConteudo, Traco } from './conteudo.styled.js'
import { DevInput, DevButton } from '../components/outros/inputs/inputs'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import LoadingBar from 'react-top-loading-bar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Api from '../service/api.js';
const api = new Api();


export default function Conteudo() {

    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState('');
    const [chamada, setChamada] = useState('');
    const [curso, setCurso] = useState('');
    const [turma, setTurma] = useState('');
    const [idAlterando, setidAlterando] = useState(0);

    const loading = useRef(null);

    async function listar() {
        loading.current.continuousStart();

        let r = await api.listarCadastros();
        setAlunos(r);

        loading.current.complete();
    }

    async function inserir() {
        if (idAlterando !== 0) {
            let alter = await api.alterarAluno(idAlterando, aluno, chamada, curso, turma);
            
            if (alter.erro)
                toast.error(`❌ ${alter.erro}`)
            else 
                toast.dark('✔️ Aluno alterado com sucesso');

        } else {
            let inse = await api.inserirAluno(aluno, chamada, curso, turma);
            
            if (inse.erro) {
                toast.error(`❌ ${inse.erro}`)
            }
            else {
                toast.dark('✔️ Aluno inserido com sucesso');
            }
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
        confirmAlert({
            title: 'Remover aluno',
            message: `Tem certeza que deseja remover o aluno ${id} ?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    let r = await api.removerAluno(id);
                    if (r.erro)
                        toast.error(`${r.erro}`);
                    else {
                        toast.dark('✔️ Aluno removido!')
                        listar();
                    }
                }
              },
              {
                label: 'Não'
              }
            ]
        });
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
            <LoadingBar color='#986CDF' ref={loading} />
            <ToastContainer />
            <div className="cabecalhoConteudo">
                <div className="perfil">
                    <div className="imgPerfil"><img src="/assets/images/usuario.jpg" alt="" /></div>
                    <div class="notificacao">3</div>    
                </div>

                <div className="msgPerfil">Olá, <b>Gilson Torres</b></div>

                <div className="comandos">
                    <div className="atualizar" onClick={listar}> <button> <img src="/assets/images/refresh.png" alt="" /> </button> </div>
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
                                    {item.nm_aluno != null && item.nm_aluno.length >= 25
                                        ? item.nm_aluno.substr(0, 25) + '...'  : item.nm_aluno}       
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