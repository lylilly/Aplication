import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PessoasList = () => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    buscarPessoas();
  }, []);

  const buscarPessoas = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/pessoas');
      setPessoas(response.data);
    } catch (erro) {
      console.error('Erro ao buscar pessoas:', erro);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/pessoas/${id}`);
      buscarPessoas();
    } catch (erro) {
      console.error('Erro ao excluir pessoa:', erro);
    }
  };

  return (
    <div>
      <h1>Pessoas</h1>
      <Link to="/pessoas/new">Adicionar Pessoa</Link>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.email}
            <Link to={`/pessoas/${pessoa.id}`}>Editar</Link>
            <button onClick={() => handleExcluir(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PessoasList;