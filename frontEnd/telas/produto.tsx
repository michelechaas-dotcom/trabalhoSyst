import { ScrollView, View, Text, Pressable, ImageBackground } from 'react-native';

const itens = [
  {
    titulo: 'Manutenção Preventiva',
    descricao:
      'A manutenção preventiva é essencial para garantir a segurança, o bom desempenho e a durabilidade do seu veículo, evitando problemas futuros e gastos inesperados.',
  },
  {
    titulo: 'Troca de Óleo',
    descricao:
      'A troca de óleo é fundamental para proteger o motor, reduzir o desgaste das peças e garantir o funcionamento eficiente do veículo.',
  },
  {
    titulo: 'Amortecedores e Molas',
    descricao:
      'Amortecedores e molas em boas condições garantem mais estabilidade, conforto e segurança ao dirigir, além de melhorar o contato dos pneus com o solo.',
  },
  {
    titulo: 'Peças de reposição',
    descricao:
      'Trabalhamos com peças de reposição de qualidade para garantir o desempenho, a confiabilidade e a segurança do seu veículo em cada manutenção.',
  },
];

export default function Produto({ navegar }: any) {
  return (
    <ScrollView className="bg-grafite">
      <ImageBackground
        source={require('../assets/produto-topo.jpg')}
        resizeMode="cover"
        className="w-full h-64 justify-between p-5"
      >
        <Text className="text-white text-lg font-bold text-center">FORÇA TOTAL</Text>
        <Text className="text-white text-3xl">Serviços e peças</Text>
      </ImageBackground>

      <View className="p-4 pt-8">
        {itens.map((i) => (
          <View key={i.titulo} className="flex-row items-center mb-3">
            <View className="w-2/5 bg-verde rounded-xl px-2 py-6 justify-center">
              <Text className="text-white font-bold text-center text-sm">{i.titulo}</Text>
            </View>
            <View className="flex-1 ml-2 border border-gray-300 rounded-xl p-3">
              <Text className="text-white text-xs text-center">{i.descricao}</Text>
            </View>
          </View>
        ))}
      </View>

      <ImageBackground
        source={require('../assets/orcamento.jpg')}
        resizeMode="cover"
        className="w-full h-72 justify-center items-center"
      >
        <Pressable onPress={() => navegar('contato')} className="bg-menu rounded-lg px-10 py-5">
          <Text className="text-white font-bold">Solicitar Orçamento</Text>
        </Pressable>
      </ImageBackground>
    </ScrollView>
  );
}