import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

const corStatus: any = {
  Aberta: 'text-yellow-300',
  'Em andamento': 'text-blue-300',
  Concluída: 'text-green-300',
};

export default function ListaOrdens({ navegar }: any) {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');

      const respOrdens = await fetch(`${URL_API}/ordens-servico`);
      if (!respOrdens.ok) throw new Error('Erro ao buscar ordens');
      setOrdens(await respOrdens.json());

      // busca os veículos só para mostrar modelo e placa em cada ordem
      const respVeiculos = await fetch(`${URL_API}/veiculos`);
      if (!respVeiculos.ok) throw new Error('Erro ao buscar veículos');
      setVeiculos(await respVeiculos.json());
    } catch (e: any) {
      setErro('Não foi possível carregar: ' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const veiculoDaOrdem = (id: string) => {
    const v = veiculos.find((x) => x.id === id);
    return v ? `${v.modelo} - ${v.placa}` : 'Veículo não encontrado';
  };

  const excluir = async (id: string) => {
    try {
      const resposta = await fetch(`${URL_API}/ordens-servico/${id}`, { method: 'DELETE' });
      if (!resposta.ok) throw new Error('Erro ao excluir');
      carregar();
    } catch (e: any) {
      setErro(e.message);
    }
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">Ordens de serviço</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
        <Pressable onPress={() => navegar('ordem-form')} className="bg-marrom rounded-lg py-3 mt-4">
          <Text className="text-white text-center font-bold">Nova ordem</Text>
        </Pressable>
      </View>

      <View className="p-4">
        {carregando && <Text className="text-white text-center">Carregando...</Text>}
        {erro !== '' && <Text className="text-red-300 mb-3">{erro}</Text>}
        {!carregando && ordens.length === 0 && erro === '' && (
          <Text className="text-white text-center mt-6">Nenhuma ordem cadastrada.</Text>
        )}

        {ordens.map((o) => (
          <View key={o.id} className="border border-gray-300 rounded-xl p-4 mb-3">
            <Text className="text-white font-bold text-base">{o.descricao}</Text>
            <Text className="text-white text-xs mt-1">Veículo: {veiculoDaOrdem(o.veiculoId)}</Text>
            <Text className="text-white text-xs">Valor: R$ {o.valor}</Text>
            <Text className={`text-xs font-bold mt-2 ${corStatus[o.status] || 'text-white'}`}>
              {o.status}
            </Text>

            <View className="flex-row mt-3">
              <Pressable
                onPress={() => navegar('ordem-form', { id: o.id })}
                className="flex-1 bg-menu rounded-lg py-2 mr-2"
              >
                <Text className="text-white text-center text-xs font-bold">Editar</Text>
              </Pressable>
              <Pressable onPress={() => excluir(o.id)} className="flex-1 bg-red-900 rounded-lg py-2">
                <Text className="text-white text-center text-xs font-bold">Excluir</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}