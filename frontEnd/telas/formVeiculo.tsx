import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

export default function FormVeiculo({ navegar, params }: any) {
  const id = params?.id;
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [clientes, setClientes] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const resposta = await fetch(`${URL_API}/clientes`);
        if (!resposta.ok) throw new Error('Erro ao buscar clientes');
        setClientes(await resposta.json());
      } catch (e: any) {
        setMensagem(e.message);
      }
    };

    const carregarVeiculo = async () => {
      try {
        const resposta = await fetch(`${URL_API}/veiculos/${id}`);
        if (!resposta.ok) throw new Error('Veículo não encontrado');
        const v = await resposta.json();
        setMarca(v.marca || '');
        setModelo(v.modelo || '');
        setPlaca(v.placa || '');
        setAno(v.ano || '');
        setClienteId(v.clienteId || '');
      } catch (e: any) {
        setMensagem(e.message);
      }
    };

    carregarClientes();
    if (id) carregarVeiculo();
  }, []);

  const salvar = async () => {
    if (!modelo.trim() || !placa.trim()) {
      setMensagem('Informe pelo menos modelo e placa');
      return;
    }
    if (!clienteId) {
      setMensagem('Escolha o cliente');
      return;
    }
    try {
      const resposta = await fetch(id ? `${URL_API}/veiculos/${id}` : `${URL_API}/veiculos`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marca, modelo, placa, ano, clienteId }),
      });
      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.erro || 'Erro ao salvar');
      }
      navegar('veiculos');
    } catch (e: any) {
      setMensagem('Erro ao salvar: ' + e.message);
    }
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">{id ? 'Editar veículo' : 'Novo veículo'}</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
      </View>

      <View className="p-4">
        <View className="border border-white p-4">
          <Text className="text-white mb-1">Marca</Text>
          <TextInput
            value={marca}
            onChangeText={setMarca}
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Modelo</Text>
          <TextInput
            value={modelo}
            onChangeText={setModelo}
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Placa</Text>
          <TextInput
            value={placa}
            onChangeText={setPlaca}
            autoCapitalize="characters"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Ano</Text>
          <TextInput
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-2">Cliente (toque para escolher)</Text>
          {clientes.length === 0 && (
            <Text className="text-white text-xs mb-3">Cadastre um cliente primeiro.</Text>
          )}
          {clientes.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => setClienteId(c.id)}
              className={`rounded-lg px-3 py-3 mb-2 ${
                c.id === clienteId ? 'bg-verde border border-white' : 'bg-menu'
              }`}
            >
              <Text className="text-white text-sm">{c.nome}</Text>
            </Pressable>
          ))}

          {mensagem !== '' && <Text className="text-red-300 text-xs my-3">{mensagem}</Text>}

          <Pressable onPress={salvar} className="bg-marrom rounded-lg py-3 mt-3 mb-2">
            <Text className="text-white text-center text-base">Salvar</Text>
          </Pressable>
          <Pressable onPress={() => navegar('veiculos')} className="bg-menu rounded-lg py-3">
            <Text className="text-white text-center text-base">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}