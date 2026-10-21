import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

export default function ListaClientes({ navegar }: any) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await fetch(`${URL_API}/clientes`);
      if (!resposta.ok) throw new Error('Erro ao buscar');
      const dados = await resposta.json();
      setClientes(dados);
    } catch (e: any) {
      setErro('Não foi possível carregar: ' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const excluir = async (id: string) => {
    try {
      const resposta = await fetch(`${URL_API}/clientes/${id}`, { method: 'DELETE' });
      if (!resposta.ok) throw new Error('Erro ao excluir');
      carregar();
    } catch (e: any) {
      setErro(e.message);
    }
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">Clientes</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
        <Pressable onPress={() => navegar('cliente-form')} className="bg-marrom rounded-lg py-3 mt-4">
          <Text className="text-white text-center font-bold">Novo cliente</Text>
        </Pressable>
      </View>

      <View className="p-4">
        {carregando && <Text className="text-white text-center">Carregando...</Text>}
        {erro !== '' && <Text className="text-red-300 mb-3">{erro}</Text>}
        {!carregando && clientes.length === 0 && erro === '' && (
          <Text className="text-white text-center mt-6">Nenhum cliente cadastrado.</Text>
        )}

        {clientes.map((c) => (
          <View key={c.id} className="border border-gray-300 rounded-xl p-4 mb-3">
            <Text className="text-white font-bold text-base">{c.nome}</Text>
            <Text className="text-white text-xs mt-1">Telefone: {c.telefone}</Text>
            <Text className="text-white text-xs">E-mail: {c.email}</Text>

            <View className="flex-row mt-3">
              <Pressable
                onPress={() => navegar('cliente-form', { id: c.id })}
                className="flex-1 bg-menu rounded-lg py-2 mr-2"
              >
                <Text className="text-white text-center text-xs font-bold">Editar</Text>
              </Pressable>
              <Pressable onPress={() => excluir(c.id)} className="flex-1 bg-red-900 rounded-lg py-2">
                <Text className="text-white text-center text-xs font-bold">Excluir</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}