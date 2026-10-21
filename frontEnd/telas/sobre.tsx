import { ScrollView, View, Text, Image, ImageBackground } from 'react-native';

const equipe: string[] = []; // ex.: ['Nome - Função']

export default function Sobre() {
  return (
    <ScrollView className="bg-grafite">
      <ImageBackground source={require('../assets/sobre-topo.jpg')} resizeMode="cover">
        <View className="bg-black/60 p-5">
          <Text className="text-white text-lg font-bold text-center mb-3">FORÇA TOTAL</Text>
          <Text className="text-white text-xs mb-2">
            A Auto Mecânica Força Total é uma empresa especializada em serviços de manutenção e
            reparação automotiva, fundada em 2016 com o objetivo de oferecer serviços de
            qualidade, confiança e segurança aos seus clientes.
          </Text>
          <Text className="text-white text-xs mb-2">
            A empresa surgiu a partir do sonho de seu fundador, um profissional apaixonado por
            mecânica automotiva, que desejava construir seu próprio negócio e se destacar no
            mercado pela excelência no atendimento e pela qualidade dos serviços prestados.
          </Text>
          <Text className="text-white text-xs mb-2">
            No início, a oficina contava com uma estrutura pequena e uma equipe reduzida,
            atendendo principalmente clientes da região. Com muito trabalho, dedicação e
            compromisso, a empresa conquistou a confiança dos primeiros clientes e começou a
            expandir suas atividades.
          </Text>
          <Text className="text-white text-xs mb-2">
            Ao longo dos anos, a Auto Mecânica Força Total investiu em ferramentas, equipamentos
            modernos e capacitação profissional, ampliando sua capacidade de atendimento e
            oferecendo serviços como manutenção preventiva e corretiva, revisão de motores, troca
            de óleo, reparação de freios, suspensão e diagnóstico de problemas mecânicos.
          </Text>
          <Text className="text-white text-xs mb-2">
            Durante seus 10 anos de atuação no mercado, a empresa construiu uma reputação baseada
            na honestidade, na transparência e no respeito aos clientes. A fidelização dos
            consumidores e as recomendações de clientes satisfeitos foram fundamentais para seu
            crescimento e consolidação no setor automotivo.
          </Text>
          <Text className="text-white text-xs mb-2">
            Atualmente, em 2026, a Auto Mecânica Força Total completa uma década de história,
            mantendo o compromisso de proporcionar soluções eficientes, segurança e tranquilidade
            aos proprietários de veículos. Com os olhos voltados para o futuro, a empresa busca
            continuar evoluindo, acompanhando as novas tecnologias automotivas e aprimorando seus
            serviços.
          </Text>
          <Text className="text-white text-xs mb-2">
            Missão: Oferecer serviços mecânicos de qualidade, garantindo segurança, confiança e
            satisfação aos clientes.
          </Text>
          <Text className="text-white text-xs mb-2">
            Visão: Ser reconhecida como uma oficina mecânica de referência na região,
            destacando-se pela qualidade dos serviços e pela excelência no atendimento.
          </Text>
          <Text className="text-white text-xs">
            Valores: Honestidade, responsabilidade, comprometimento, respeito aos clientes,
            qualidade e melhoria contínua.
          </Text>
        </View>
      </ImageBackground>

      <View className="bg-grafite p-5 min-h-[200px]">
        <Text className="text-white text-3xl">Nossa Equipe</Text>
        {equipe.map((pessoa) => (
          <Text key={pessoa} className="text-white mt-3">{pessoa}</Text>
        ))}
      </View>

      <View className="flex-row bg-marrom h-64">
        <View className="w-1/2 p-5 justify-center">
          <Text className="text-white text-2xl mb-4">Horário de funcionamento</Text>
          <Text className="text-white text-sm">Segunda a Sexta</Text>
          <Text className="text-white text-sm">Manhã: 08h00 até 12h00</Text>
          <Text className="text-white text-sm">Tarde: 13h30 até 18h00</Text>
          <Text className="text-white text-sm">Sábado: 08h00 até 13h00</Text>
        </View>
        <Image
          source={require('../assets/horario.jpg')}
          resizeMode="cover"
          className="w-1/2 h-full"
        />
      </View>
    </ScrollView>
  );
}