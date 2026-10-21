import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Image } from 'react-native';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aviso, setAviso] = useState('');

  const enviar = () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      setAviso('Preencha todos os campos');
      return;
    }
    if (!email.includes('@')) {
      setAviso('Informe um e-mail válido');
      return;
    }
    // O backend não tem rota para contato, então aqui só confirmamos na tela
    setAviso('Mensagem enviada! Em breve entraremos em contato.');
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <ScrollView className="bg-grafite">
      <View className="bg-verde p-5">
        <Text className="text-white text-3xl">Deixe o seu contato</Text>
        <Text className="text-white text-lg font-bold mt-1 ml-10">FORÇA TOTAL</Text>

        <View className="border border-white p-4 mt-6">
          <Text className="text-white mb-1">Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4"
          />

          <Text className="text-white mb-1">Deixe a sua mensagem</Text>
          <TextInput
            value={mensagem}
            onChangeText={setMensagem}
            multiline
            textAlignVertical="top"
            className="border border-gray-300 rounded-lg text-white px-3 py-2 mb-4 h-24"
          />

          {aviso !== '' && <Text className="text-white text-xs mb-3">{aviso}</Text>}

          <Pressable onPress={enviar} className="bg-marrom rounded-lg py-3">
            <Text className="text-white text-center text-base">Enviar</Text>
          </Pressable>
        </View>
      </View>

      <Image
        source={require('../assets/contato.jpg')}
        resizeMode="cover"
        className="w-full h-64"
      />

      <View className="bg-grafite p-5">
        <Text className="text-white text-2xl font-bold mb-4">FORÇA TOTAL</Text>

        <Text className="text-white font-bold">Endereço</Text>
        <Text className="text-white text-sm mb-3">Rua 15 de setembro, 1090{'\n'}Ijuí-RS (55) 99999-9999</Text>

        <Text className="text-white font-bold">Social media</Text>
        <Text className="text-white text-sm mb-3">@mecanicaftotal</Text>

        <Text className="text-white font-bold">Email us</Text>
        <Text className="text-white text-sm">forcatotal@forcatotal.com</Text>
      </View>
    </ScrollView>
  );
}