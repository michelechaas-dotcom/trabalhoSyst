import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';

const URL_API = 'http://localhost:3000';

const STATUS = ['Aberta', 'Em andamento', 'Concluída'];

export default function FormOrdem({ navegar, params }: any) {
  const id = params?.id;
  const [veiculoId, setVeiculoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Aberta');
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const resposta = await fetch(`${URL_API}/veiculos`);
        if (!resposta.ok) throw new Error('Erro ao buscar veículos');
        setVeiculos(await resposta.json());
      } catch (e: any) {
        setMensagem(e.message);
      }
    };

    const carregarOrdem = async () => {
      try {
        const resposta = await fetch(`${URL_API}/ordens-servico/${id}`);
        if (!resposta.ok) throw new Error('Ordem não encontrada');
        const o = await resposta.json();
        setVeiculoId(o.veiculoId || '');
        setDescricao(o.descricao || '');
        setValor(o.valor || '');
        setStatus(o.status || 'Aberta');
      } catch (e: any) {
        setMensagem(e.message);
      }
    };

    carregarVeiculos();
    if (id) carregarOrdem();
  }, []);

  const salvar = async () => {
    if (!descricao.trim()) {
      setMensagem('Informe a descrição do serviço');
      return;
    }
    if (!veiculoId) {
      setMensagem('Escolha o veículo');
      return;
    }
    try {
      const resposta = await fetch(
        id ? `${URL_API}/ordens-servico/${id}` : `${URL_API}/ordens-servico`,
        {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          // no PUT enviamos o status junto; no POST o backend cria como "Aberta"
          body: JSON.stringify(
            id ? { veiculoId, descricao, valor, status } : { veiculoId, descricao, valor }
          ),
        }
      );
      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.erro || 'Erro ao salvar');
      }
      navegar('ordens');
    } catch (e: any) {
      setMensagem('Erro ao salvar: ' + e.message);
    }
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">{id ? 'Editar ordem' : 'Nova ordem'}</Text>
        <Text className="text-white text-xs font-bold mt-1">FORÇA TOTAL</Text>
      </View>

      <View className="p-4">
        <View className="border border-white p-4">
          <Text className="text-white mb-1">Descrição do serviço</Text>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Valor</Text>
          <TextInput
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-2">Veículo (toque para escolher)</Text>
          {veiculos.length === 0 && (
            <Text className="text-white text-xs mb-3">Cadastre um veículo primeiro.</Text>
          )}
          {veiculos.map((v) => (
            <Pressable
              key={v.id}
              onPress={() => setVeiculoId(v.id)}
              className={`rounded-lg px-3 py-3 mb-2 ${
                v.id === veiculoId ? 'bg-verde border border-white' : 'bg-menu'
              }`}
            >
              <Text className="text-white text-sm">
                {v.modelo} - {v.placa}
              </Text>
            </Pressable>
          ))}

          {id && (
            <View className="mt-3">
              <Text className="text-white mb-2">Status</Text>
              {STATUS.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => setStatus(s)}
                  className={`rounded-lg px-3 py-3 mb-2 ${
                    s === status ? 'bg-verde border border-white' : 'bg-menu'
                  }`}
                >
                  <Text className="text-white text-sm">{s}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {mensagem !== '' && <Text className="text-red-300 text-xs my-3">{mensagem}</Text>}

          <Pressable onPress={salvar} className="bg-marrom rounded-lg py-3 mt-3 mb-2">
            <Text className="text-white text-center text-base">Salvar</Text>
          </Pressable>
          <Pressable onPress={() => navegar('ordens')} className="bg-menu rounded-lg py-3">
            <Text className="text-white text-center text-base">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}