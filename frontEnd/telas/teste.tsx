import { View, Text, Pressable } from "react-native";



type Props = {
    navegar: (pagina: string) => void;
};

export default function Teste({ navegar }: Props) {
    return (



        <View className="flex-1 items-center justify-center">
            <Text className="mb-3 text-3xl font-bold text-indigo-600">
                Testando
            </Text>

            <Text className="mb-8 text-center text-lg text-gray-700">
                Bem-vindo ao nosso aplicativo!
            </Text>

        </View>


    );


}