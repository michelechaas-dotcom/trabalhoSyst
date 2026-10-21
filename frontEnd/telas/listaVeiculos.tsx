import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

export default function ListaVeiculos({ navegar }: any) {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');

      const respVeiculos = await fetch(`${URL_API}/veiculos`);
      if (!respVeiculos.ok) throw new Error('Erro ao buscar veículos');
      setVeiculos(await respVeiculos.json());

      // busca os clientes só para mostrar o nome do dono de cada veículo
      const respClientes = await fetch(`${URL_API}/clientes`);
      if (!respClientes.ok) throw new Error('Erro ao buscar clientes');
      setClientes(await respClientes.json());
    } catch (e: any) {
      setErro('Não foi possível carregar: ' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const nomeCliente = (id: string) =>
    clientes.find((c) => c.id === id)?.nome || 'Cliente não encontrado';

  const excluir = async (id: string) => {
    try {
      const resposta = await fetch(`${URL_API}/veiculos/${id}`, { method: 'DELETE' });
      if (!resposta.ok) throw new Error('Erro ao excluir');
      carregar();
    } catch (e: any) {
      setErro(e.message);
    }
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">Veículos</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
        <Pressable onPress={() => navegar('veiculo-form')} className="bg-marrom rounded-lg py-3 mt-4">
          <Text className="text-white text-center font-bold">Novo veículo</Text>
        </Pressable>
      </View>

      <View className="p-4">
        {carregando && <Text className="text-white text-center">Carregando...</Text>}
        {erro !== '' && <Text className="text-red-300 mb-3">{erro}</Text>}
        {!carregando && veiculos.length === 0 && erro === '' && (
          <Text className="text-white text-center mt-6">Nenhum veículo cadastrado.</Text>
        )}

        {veiculos.map((v) => (
          <View key={v.id} className="border border-gray-300 rounded-xl p-4 mb-3">
            <Text className="text-white font-bold text-base">
              {v.marca} {v.modelo}
            </Text>
            <Text className="text-white text-xs mt-1">Placa: {v.placa}</Text>
            <Text className="text-white text-xs">Ano: {v.ano}</Text>
            <Text className="text-white text-xs">Cliente: {nomeCliente(v.clienteId)}</Text>

            <View className="flex-row mt-3">
              <Pressable
                onPress={() => navegar('veiculo-form', { id: v.id })}
                className="flex-1 bg-menu rounded-lg py-2 mr-2"
              >
                <Text className="text-white text-center text-xs font-bold">Editar</Text>
              </Pressable>
              <Pressable onPress={() => excluir(v.id)} className="flex-1 bg-red-900 rounded-lg py-2">
                <Text className="text-white text-center text-xs font-bold">Excluir</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}