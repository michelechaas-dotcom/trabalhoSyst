import { ScrollView, View, Text, Image, ImageBackground } from 'react-native';

const servicos = [
  { titulo: 'Freios', descricao: 'Troca e manutenção de freios', imagem: require('../assets/freios.jpg') },
  { titulo: 'Suspensão', descricao: 'Troca e revisão de peças', imagem: require('../assets/suspensao.jpg') },
  { titulo: 'Revisão', descricao: 'Revisão e manutenção', imagem: require('../assets/revisao-card.jpg') },
];

export default function Inicio() {
  return (
    <ScrollView className="bg-grafite">
      <ImageBackground
        source={require('../assets/hero.jpg')}
        resizeMode="cover"
        className="w-full h-80 justify-center px-5"
      >
        <Text className="text-white text-4xl">Oficina Mecânica</Text>
        <Text className="text-white text-lg font-bold mt-1 ml-10">FORÇA TOTAL</Text>
      </ImageBackground>

      <View className="flex-row h-64 bg-grafite">
        <View className="w-1/2 p-5">
          <Text className="text-white text-2xl">Revisão</Text>
          <Text className="text-white text-sm mt-5">
            Revisão e manutenção para manter o seu veículo seguro
          </Text>
        </View>
        <Image
          source={require('../assets/revisao.jpg')}
          resizeMode="cover"
          className="w-1/2 h-full"
        />
      </View>

      <View className="bg-verde p-4">
        <Text className="text-white text-3xl mb-4">Serviços</Text>
        {servicos.map((s) => (
          <View key={s.titulo} className="mb-4">
            <Image source={s.imagem} resizeMode="cover" className="w-full h-44" />
            <View className="bg-marrom p-4 items-center">
              <Text className="text-white font-bold">{s.titulo}</Text>
              <Text className="text-white text-center mt-3">{s.descricao}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}