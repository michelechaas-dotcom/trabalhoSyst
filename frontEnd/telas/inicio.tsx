import { View, Text, Pressable } from "react-native";



type Props = {
navegar: (pagina: string) => void;
};

export default function Inicio({ navegar }: Props) {
return (



        <View className="flex-1 items-center justify-center">
            <Text className="mb-3 text-3xl font-bold text-indigo-600">
                Início
            </Text>

            <Text className="mb-8 text-center text-lg text-gray-700">
                Bem-vindo ao nosso aplicativo!
            </Text>

            <Pressable
                className="mb-3 w-full rounded-xl bg-indigo-600 p-4"
                onPress={() => navegar("sobre")}
            >
                <Text className="text-center font-bold text-white">
                    Sobre
                </Text>
            </Pressable>

            <Pressable
                className="mb-3 w-full rounded-xl bg-indigo-600 p-4"
                onPress={() => navegar("produtos")}
            >
                <Text className="text-center font-bold text-white">
                    Produtos
                </Text>
            </Pressable>

            <Pressable
                className="w-full rounded-xl bg-indigo-600 p-4"
                onPress={() => navegar("contato")}
            >
                <Text className="text-center font-bold text-white">
                    Contato
                </Text>
            </Pressable>
        </View>

    
);


}