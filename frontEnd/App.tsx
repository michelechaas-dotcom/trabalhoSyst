import './global.css';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import Inicio from './telas/inicio';
import Produto from './telas/produto';
import Sobre from './telas/sobre';
import Contato from './telas/contato';
import ListaClientes from './telas/listaClientes';
import FormCliente from './telas/formCliente';
import ListaVeiculos from './telas/listaVeiculos';
import FormVeiculo from './telas/formVeiculo';
import ListaOrdens from './telas/listaOrdens';
import FormOrdem from './telas/formOrdem';

const telas: any = {
  inicio: Inicio,
  produtos: Produto,
  sobre: Sobre,
  contato: Contato,
  clientes: ListaClientes,
  'cliente-form': FormCliente,
  veiculos: ListaVeiculos,
  'veiculo-form': FormVeiculo,
  ordens: ListaOrdens,
  'ordem-form': FormOrdem,
};

const principais = [
  ['inicio', 'Início'],
  ['produtos', 'Produtos'],
  ['sobre', 'Sobre'],
  ['contato', 'Contato'],
];

// [tela da lista, título, tela do formulário]
const gestao = [
  ['clientes', 'Clientes', 'cliente-form'],
  ['veiculos', 'Veículos', 'veiculo-form'],
  ['ordens', 'Ordens', 'ordem-form'],
];

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [params, setParams] = useState<any>(null);

  const navegar = (nome: string, p?: any) => {
    setTela(nome);
    setParams(p ?? null);
  };

  const Tela = telas[tela];

  return (
    <View className="flex-1 bg-grafite pt-10">
      <View className="flex-row px-2 pb-2">
        {principais.map(([nome, titulo]) => (
          <Pressable
            key={nome}
            onPress={() => navegar(nome)}
            className={`flex-1 mx-1 py-3 rounded-lg ${tela === nome ? 'bg-verde' : 'bg-menu'}`}
          >
            <Text className="text-white text-center text-xs font-bold">{titulo}</Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row px-2 pb-2">
        {gestao.map(([nome, titulo, form]) => (
          <Pressable
            key={nome}
            onPress={() => navegar(nome)}
            className={`flex-1 mx-1 py-2 rounded-lg ${
              tela === nome || tela === form ? 'bg-marrom' : 'bg-menu'
            }`}
          >
            <Text className="text-white text-center text-xs">{titulo}</Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-1 bg-grafite">
        <Tela navegar={navegar} params={params} />
      </View>
    </View>
  );
}