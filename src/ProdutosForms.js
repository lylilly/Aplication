import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const ProdutoForm = () => {
  const [produto, setProduto] = useState({ nome: '', preco: '', estoque: '' });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      buscarProduto();
    }
  }, [id]);

  const buscarProduto = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/produtos/${id}`);
      setProduto(response.data);
    } catch (erro) {
      console.error('Erro ao buscar produto:', erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://localhost:5001/api/produtos/${id}`, produto);
      } else {
        await axios.post('https://localhost:5001/api/produtos', produto);
      }
      history.push('/produtos');
    } catch (erro) {
      console.error('Erro ao salvar produto:', erro);
    }
  };

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={produto.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Preço:</label>
        <input type="number" name="preco" value={produto.preco} onChange={handleChange} required min="0" step="0.01" />
      </div>
      <div>
        <label>Estoque:</label>
        <input type="number" name="estoque" value={produto.estoque} onChange={handleChange} required min="0" />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProdutoForm;