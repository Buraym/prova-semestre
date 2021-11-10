import React, { useEffect, useState } from "react";
import './PaginaInicial.css';
import api from './api.js';

function PaginaInicial(){

    useEffect(() => {
        api.get('contatos', { headers: {"Access-Control-Allow-Origin":"*"} })
        .then(response => {
            console.log(response.data);
            setLista(response.data);
        })
        if(lista.length > 0){
            setVazio(false);}
    }, []);


    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [vazio, setVazio] = useState(true);
    const [lista, setLista] = useState([]);
    const [resposta, setResposta] = useState("get1");
    const [abre1, setAbre1] = useState(false);
    const [abre2, setAbre2] = useState(false);
    const [abre3, setAbre3] = useState(false);
    const [abre4, setAbre4] = useState(false);

    const Contato = {
        id: id,
        nome: nome,
        telefone: telefone,
        email: email
    }

    function handleId(event){
        setId(event.target.value);
    }

    function handleNome(event){
        setNome(event.target.value);
    }

    function handleTelefone(event){
        setTelefone(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value);
    }

    async function handleSubmitPost(event) {
        event.preventDefault();
        console.log(Contato.toString());
        await api.post('contatos', Contato)
        .then(response => {
            console.log(response);
        });
    }

    async function handleSubmitDeletar(event) {
        event.preventDefault();
        console.log(Contato.toString());
        await api.delete('contatos/' + id.toString)
        .then(response => {
            setResposta("get1");
            console.log(response);
        });
    }

    async function handleSubmitPut(event) {
        event.preventDefault();
        console.log(Contato.toString());
        await api.put('contatos/' + id.toString, Contato)
        .then(response => {
            console.log(response);
            setResposta("put");
            setLista(response.data);
            if(lista.length > 0){ setVazio(false); }
        });
    }

    async function handleSubmitGet(event) {
        event.preventDefault();
        console.log(Contato.toString());
        await api.get('contatos/' + id.toString)
        .then(response => {
            console.log(response);
            setResposta("get2");
            setLista(response.data);
            if(lista.length > 0){ setVazio(false); }
        });
    }

    return(
        <div className="tela">

            <h1>Página Inicial de Contatos</h1>

            <div className="caixa-botao">
                <button className="botao" onClick={() => setAbre1(!abre1)}> Mostrar o Contato com id {id.toString} </button>
                { abre1 ? <form onSubmit={handleSubmitGet}>
                                <input type="text" placeholder="ID do Contato" onChange={handleId}/>
                                <input type="submit" value="Procurar"/>
                            </form> : null }
            </div>

            <div className="caixa-botao">
                <button className="botao" onClick={() => setAbre2(!abre2)}> Criar um Contato </button>
                {  abre2  ?  <form onSubmit={handleSubmitPost}>
                                <input type="text" placeholder="Nome" onChange={handleNome}/>
                                <input type="text" placeholder="Telefone" onChange={handleTelefone}/>
                                <input type="text" placeholder="Email" onChange={handleEmail}/>
                                <input type="submit" value="Criar"/>
                            </form> : null }
            </div>

            <div className="caixa-botao">
                <button className="botao" onClick={() => setAbre3(!abre3)}> Deletar um Contato </button>
                {
                    abre3 
                        ?
                            <form onSubmit={handleSubmitDeletar}>
                                <input type="text" placeholder="ID do Contato" onChange={handleId}/>
                                <input type="submit" value="Deletar Contato"/>
                            </form> 
                        : 
                            null
                }
            </div>

            <div className="caixa-botao">
                <button className="botao" onClick={() => setAbre4(!abre4)}> Atualizar um Contato </button>
                { abre4 ? 
                    <form onSubmit={handleSubmitPut}>
                        <input type="text" placeholder="ID do Contato" onChange=""/>
                        <input type="text" placeholder="Nome" onChange={handleNome}/>
                        <input type="text" placeholder="Telefone" onChange={handleTelefone}/>
                        <input type="text" placeholder="Email" onChange={handleEmail}/>
                        <input type="submit" value="Atualizar"/>
                    </form> : null }
            </div>

            <div className="caixa-botao">
                { (vazio && resposta === "get1") ? lista.map(

                    contato => (

                        <div className="card-contato">
                            <div className="card-contato">ID: {contato.id}</div>
                            <div className="card-contato">NOME: {contato.nome}</div>
                            <div className="card-contato">TELEFONE: {contato.telefone}</div>
                            <div className="card-contato">EMAIL: {contato.email}</div>
                        </div>))
                    : (vazio && resposta === "get2") ? lista.map( 
                        contato => ( 
                            <div className="card-contato">
                            <div className="card-contato">ID: {contato.id}</div>
                            <div className="card-contato">NOME: {contato.nome}</div>
                            <div className="card-contato">TELEFONE: {contato.telefone}</div>
                            <div className="card-contato">EMAIL: {contato.email}</div>
                        </div>))
                    :   
                        (vazio && resposta === "put") ? lista.map(
                            contato => (
                                <div className="card-contato">
                                    <div className="card-contato">ID: {contato.id}</div>
                                    <div className="card-contato">NOME: {contato.nome}</div>
                                    <div className="card-contato">TELEFONE: {contato.telefone}</div>
                                    <div className="card-contato">EMAIL: {contato.email}</div>
                                </div>))
                    :   
                        <div> Não há contatos !!! </div> 
                }
            </div>
        </div>
    )
}

export default PaginaInicial;