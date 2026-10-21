const carregar = async () => {
  try {
    setCarregando(true);
    setErro('');
    const resposta = await fetch(`${API_URL}/clientes`);
    if (!resposta.ok) throw new Error('Erro ao buscar');
    const dados = await resposta.json();
    setClientes(dados);
  } catch (e: any) {
    setErro('Não foi possível carregar: ' + e.message);
  } finally {
    setCarregando(false);
  }
};

const excluir = async (id: string) => {
  try {
    const resposta = await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error('Erro ao excluir');
    carregar(); // sem resposta.json(): o servidor responde 204 sem corpo
  } catch (e: any) {
    setErro(e.message);
  }
};


const salvar = async () => {
  try {
    const resposta = await fetch(id ? `${API_URL}/clientes/${id}` : `${API_URL}/clientes`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone, email }),
    });
    if (!resposta.ok) {
      const dados = await resposta.json();
      throw new Error(dados.erro || 'Erro ao salvar');
    }
    navegar('clientes');
  } catch (e: any) {
    setMensagem('Erro ao salvar: ' + e.message);
  }
};