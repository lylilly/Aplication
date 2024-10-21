import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const PessoaForm = () => {
  const [pessoa, setPessoa] = useState({ nome: '', email: '', dataNascimento: '', status: '' });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      buscarPessoa();
    }
  }, [id]);

  const buscarPessoa = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/pessoas/${id}`);
      setPessoa(response.data);
    } catch (erro) {
      console.error('Erro ao buscar pessoa:', erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://localhost:5001/api/pessoas/${id}`, pessoa);
      } else {
        await axios.post('https://localhost:5001/api/pessoas', pessoa);
      }
      history.push('/pessoas');
    } catch (erro) {
      console.error('Erro ao salvar pessoa:', erro);
    }
  };

  const handleChange = (e) => {
    setPessoa({ ...pessoa, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h1>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={pessoa.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={pessoa.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" name="dataNascimento" value={pessoa.dataNascimento.split('T')[0]} onChange={handleChange} required />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" name="status" value={pessoa.status} onChange={handleChange} required />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default PessoaForm;