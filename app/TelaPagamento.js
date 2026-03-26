import { useState } from "react";
import { useRouter, Stack } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Cartão de teste para validação simples
const CARTAO_TESTE = {
  numCartao: "4242 4242 4242 4242",
  validade: "12/34",
  cvv: "123",
};

export default function TelaPagamento() {
  const [numCartao, setNumCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();

  const formatarValidade = (texto) => {
    // Remove caracteres não numéricos
    const numeros = texto.replace(/\D/g, "");
    // Se o usuario apaga tudo limpa o estado
    if (numeros.length <= 2) {
      return numeros;
    }
    // Formata para MM/AA
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}`;
  };

  // Valida se os dados são iguais ao cartão de teste
  // Caso sejam válidos, exibe uma mensagem de sucesso, caso contrário, exibe um erro
  const realizarPagamento = () => {
    const numCartaoLimpo = numCartao.trim().replace(/\s/g, ""); // Remove espaços do número do cartão
    const numCartaoTesteLimpo = CARTAO_TESTE.numCartao.replace(/\s/g, ""); // Remove espaços do número do cartão de teste

    if (!numCartaoLimpo || !validade || !cvv) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (
      numCartaoLimpo === numCartaoTesteLimpo &&
      validade === CARTAO_TESTE.validade &&
      cvv === CARTAO_TESTE.cvv
    ) {
      Alert.alert("Sucesso", "Pagamento realizado com sucesso!", [
        { text: "OK", onPress: () => router.push("/TelaSucesso") },
      ]);
    } else {
      Alert.alert("Erro", "Dados do cartão inválidos.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Pagamento</Text>

          <Text>Número do Cartão de Crédito</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            value={numCartao} // Exibe o número do cartão formatado
            onChangeText={setNumCartao} // Atualiza o estado com o número do cartão formatado
            keyboardType="numeric" // Permite apenas a entrada de números
          />
          <Text>Validade</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/AA"
            value={validade}
            onChangeText={(texto) => setValidade(formatarValidade(texto))} // Formata a validade enquanto o usuário digita
            maxLength={5}
            keyboardType="numeric"
          />
          <Text>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="000"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry // Esconde o código CVV para segurança
          />

          {/* Botão para realizar o pagamento */}
          <TouchableOpacity style={styles.botao} onPress={realizarPagamento}>
            <Text style={styles.textoBotao}>Pagar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  botao: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
