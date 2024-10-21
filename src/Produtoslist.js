import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/produtos');
      setProdutos(response.data);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/produtos/${id}`);
      buscarProdutos();
    } catch (erro) {
      console.error('Erro ao excluir produto:', erro);
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <Link to="/produtos/new">Adicionar Produto</Link>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco} - Estoque: {produto.estoque}
            <Link to={`/produtos/${produto.id}`}>Editar</Link>
            <button onClick={() => handleExcluir(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutosList;