import React, { useState, useEffect } from 'react';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pessoasResponse = await fetch('https://localhost:5001/api/pessoas');
        const pessoasData = await pessoasResponse.json();
        setPessoas(pessoasData);

        const produtosResponse = await fetch('https://localhost:5001/api/produtos');
        const produtosData = await produtosResponse.json();
        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Minha Aplicação</h1>
      <h2>Pessoas</h2>
      <ul>
        {pessoas.map(pessoa => (
          <li key={pessoa.id}>{pessoa.nome} - {pessoa.email}</li>
        ))}
      </ul>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>{produto.nome} - R$ {produto.preco}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;