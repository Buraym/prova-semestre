import React, { useEffect, useState } from "react";
import axios from 'axios';
import './PaginaInicial.css';

function PaginaInicial(){

    var lista = [];

    useEffect(() => {
        axios.get('http://localhost:8080/contatos')
        .then(response => {
            console.log(response.data);
            lista = response.data;
        })
    }, [])


    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

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

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(Contato.toString());
        await axios.post('http://localhost:8080/contatos', Contato)
        .then(response => {
            console.log(response);
        });
    }

    return(
        <div className="tela">
            <h1>Página Inicial de Contatos</h1>
            <div className="caixa-botao">
                <button className="botao"> Mostrar o Contato com id {id.toString} </button>
            </div>
            <div className="caixa-botao">
                <button className="botao"> Criar um Contato </button>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome" onChange={handleNome}/>
                    <input type="text" placeholder="Telefone" onChange={handleTelefone}/>
                    <input type="text" placeholder="Email" onChange={handleEmail}/>
                    <input type="submit" value="Criar"/>
                </form>
            </div>
            <div className="caixa-botao">
                <button className="botao"> Deletar um Contato </button>
            </div>
            <div className="caixa-botao">
                <button className="botao"> Atualizar um Contato </button>
            </div>
            <div className="caixa-contatos">
                { lista.length > 0 ? lista.map(

                    contato => (

                        <div className="botao">
                            <div className="botao">ID: {contato.nome}</div>
                            <div className="botao">NOME: {contato.nome}</div>
                            <div className="botao">TELEFONE: {contato.telefone}</div>
                            <div className="botao">EMAIL: {contato.email}</div>
                        </div> 
                        ))
                : 
                    <div> Não há contatos !!! </div> 
                }
            </div>
        </div>
    )
}