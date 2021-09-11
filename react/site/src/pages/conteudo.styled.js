import styled from 'styled-components'

const Traco = styled.div `
    background: #986CDF;
    width: 6px;
    height: 25px;
    border-radius: 1.2em;
`


const ContainerConteudo = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    background: #F5F5F5;
    color: #615858;

    width: 170vh;

    font-family: 'Roboto', sans-serif;


    img {
        cursor: pointer;
    }

    .cabecalhoConteudo {
        display: flex;
        flex-direction: row;

        background-color: #fff;

        padding: 1em 2em;

        width: 100%;
    }

    .perfil {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        border-radius: 50%; 
    }

    .imgPerfil img {
        width: 57px;
        height: 57px;
        border-radius: 50%;
        height: 57px;
    }

    .notificacao {
        color: white;
        background-color: #DB21BD;
        border: 3px solid white;
        border-radius: 50%;
        position: absolute;
        width: 20px;
        height: 20px;
        text-align: center;
        font-size: .7em;
    }

    .msgPerfil {
        color: #615858;

        margin: 1.3em 0em 0em 1em;
    }

    .comandos {
        display: flex;
        flex-direction: row;

        justify-content: flex-start;
        align-items: flex-end;

        padding: 0.5em 0.5em 0.5em 45em;
    }

    .atualizar button {
        background: #986CDF;

        border: none;
        border-radius: 50%;

        width: 44px;
        height: 42px;

        margin-right: 0.5em;

        &:hover {
        background-color: #ae87ed;
        transition: 1s;
    }
    }

    .logout button {
        background: #986CDF;

        border: none;
        border-radius: 50%;
        
        width: 44px;
        height: 44px;

        &:hover {
        background-color: #ae87ed;
        transition: 1s;
    }
    }

    .titulo {
        display: flex;
        flex-direction: row;

        padding-bottom: 40px;
    }

    .novoAluno {
        font-size: 32px;
        font-weight: bold;

        color: #3C3939;
        line-height: 25px;

        padding-left: 0.4em;
    }

    .cadastros {
        background-color: #fff;

        padding: 2.5em 15em 2.5em 4em;
        margin: 4em 0em 3em 0em;

        box-shadow: 0px 0px 4px 1px rgba(186, 186, 186, 0.25);

    }

    .box-input {
        display: flex;
        flex-direction: row;
    }

    .box-input1 {
        display: flex;
        flex-direction: row;

        margin-left: 5em;
    }

    .containerInput1 {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        padding-left: 1.9em;
        margin-bottom: 1em;

        width: 82vh;
    }

    .label {
        color: #615858;
        font-size: 18px;
        font-weight: 700;

        margin-right: 0.5em;
        margin-top: 7px;
    }

    .containerInput2 {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        width: 97%;
    }

    .btn-cadastro {
        margin-left: 2em;
    }



    .matriculados {
        display: flex;
        flex-direction: column;

        background-color: #fff;

        padding: 2.5em 2em;
        width: 92%;

        box-shadow: 0px 0px 4px 1px rgba(186, 186, 186, 0.25);

    }

    .idTb {
        padding-left: 2.5em;
    }

    .idTb1 {
        padding-left: 2em;
    }

    table {
        border: 1px solid #E2E2E2;
        border-collapse: collapse;
    }

    th {
        height: 61.93px;

        text-align: left;
        color: #ffff;
        font-weight: 600;

        padding: 1em;    
    }

    td {
        text-align: left;
        height:  61.93px;
        padding: 1em;
        color: #6D6868;
        font-weight: 600;
    }

    td button {
        border-radius: 50%;
        background-color: #565656;
        border: none;
        width: 31px;
        height: 31px;

        padding: 0em;
    }

    thead {
        color: #fff;

        background: #986CDF;
    }

    .linha-alternada {
        background: #F5F5F5;
    }

    .botao-visivel > button {
        visibility: hidden;
    }

    tr:hover {
        
        .botao-visivel > button {
            visibility: visible;
        }
        
    }
`

export { ContainerConteudo, Traco }