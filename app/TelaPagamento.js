import { useState } from "react";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function Pagamento() {
  const [cartoes, setCartoes] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const userJSON = await AsyncStorage.getItem("logged");

    if (!userJSON) {
      Alert.alert("Erro", "Faça login novamente");
      router.replace("/");
      return;
    }

    const user = JSON.parse(userJSON);

    if ((!user.cartoes || user.cartoes.length === 0) && !user.cartao) {
      Alert.alert("Aviso", "Cadastre um cartão primeiro");
      router.push("/TelaCadastroCartao");
      return;
    }

    let listaCartoes = [];
    if (user.cartoes && user.cartoes.length > 0) {
      listaCartoes = user.cartoes;
    } else if (user.cartao) {
      listaCartoes = [user.cartao];
    }

    setCartoes(listaCartoes);
    setCartaoSelecionado(listaCartoes[0]);
  };

  const pagar = () => {
    Alert.alert("Sucesso", "Pagamento realizado!", [
      { text: "OK", onPress: () => router.push("/retirada") },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Pagamento</Text>

        {cartoes.map((cartao, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.bloco,
              cartaoSelecionado?.numero === cartao.numero && {
                borderColor: "#E83D84",
                borderWidth: 2,
                padding: 10,
                borderRadius: 8,
              },
            ]}
            onPress={() => setCartaoSelecionado(cartao)}
          >
            <Text style={styles.textoCartao}>
              Cartão: **** **** **** {cartao.numero.slice(-4)}
            </Text>

            <Text style={styles.textoCartao}>Validade: {cartao.validade}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.botao} onPress={pagar}>
          <Text style={styles.textoBotao}>Pagar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() =>
            router.push({
              pathname: "/TelaCadastroCartao",
              params: { origem: "pagamento" },
            })
          }
        >
          <Text style={styles.textoBotao}>Alterar Cartão</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181717",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 36,
    color: "#E83D84",
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  bloco: {
    marginBottom: 15,
  },

  textoCartao: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    borderRadius: 8,
    padding: 12,
  },

  inputErro: {
    borderColor: "#ff4d4d",
  },

  erro: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
  },

  coluna: {
    flex: 1,
  },

  colunaEspaco: {
    flex: 1,
    marginRight: 10,
  },

  botao: {
    backgroundColor: "#E83D84",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  botaoSecundario: {
    backgroundColor: "#E83D84",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    opacity: 0.7,
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  total: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
  },
});