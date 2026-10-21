import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

export default function FormCliente({ navegar, params }: any) {
  const id = params?.id;
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const resposta = await fetch(`${URL_API}/clientes/${id}`);
        if (!resposta.ok) throw new Error('Cliente não encontrado');
        const c = await resposta.json();
        setNome(c.nome || '');
        setTelefone(c.telefone || '');
        setEmail(c.email || '');
      } catch (e: any) {
        setMensagem(e.message);
      }
    };
    if (id) carregar();
  }, []);

  const salvar = async () => {
    if (!nome.trim()) {
      setMensagem('Informe o nome');
      return;
    }
    try {
      const resposta = await fetch(id ? `${URL_API}/clientes/${id}` : `${URL_API}/clientes`, {
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

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">{id ? 'Editar cliente' : 'Novo cliente'}</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
      </View>

      <View className="p-4">
        <View className="border border-white p-4">
          <Text className="text-white mb-1">Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Telefone</Text>
          <TextInput
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          {mensagem !== '' && <Text className="text-red-300 text-xs mb-3">{mensagem}</Text>}

          <Pressable onPress={salvar} className="bg-marrom rounded-lg py-3 mb-2">
            <Text className="text-white text-center text-base">Salvar</Text>
          </Pressable>
          <Pressable onPress={() => navegar('clientes')} className="bg-menu rounded-lg py-3">
            <Text className="text-white text-center text-base">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}