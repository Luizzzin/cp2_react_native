import { useState } from "react";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CadastroCartao() {
  const [numCartao, setNumCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nome, setNome] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const { origem } = useLocalSearchParams();

  const voltar = () => {
    if (origem === "pagamento") {
      router.push("/TelaPagamento");
    } else {
      router.push("/cardapio");
    }
  };

  const formatarValidade = (texto) => {
    const numeros = texto.replace(/\D/g, "");
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}`;
  };

  const formatarCartao = (texto) => {
    let numeros = texto.replace(/\D/g, "");
    numeros = numeros.slice(0, 16);
    const formatado = numeros.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatado;
  };

  const validar = () => {
    let e = {};
    const num = numCartao.replace(/\s/g, "");

    if (!num || num.length < 16) e.numCartao = "Cartão inválido";
    if (!validade.match(/^\d{2}\/\d{2}$/)) e.validade = "Formato MM/AA";
    if (!cvv || cvv.length < 3) e.cvv = "CVV inválido";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const salvarCartao = async () => {
    if (!validar()) return;

    const usuarioJSON = await AsyncStorage.getItem("logged");
    const usuario = JSON.parse(usuarioJSON);

    const usersJSON = await AsyncStorage.getItem("users");
    const users = JSON.parse(usersJSON) || [];

    const novoCartao = {
      numero: numCartao,
      validade,
      cvv,
      nome,
    };

    const cartoesAtuais = usuario.cartoes
      ? usuario.cartoes
      : usuario.cartao
        ? [usuario.cartao]
        : [];

    const novosCartoes = [...cartoesAtuais, novoCartao];

    const novosUsers = users.map((u) =>
      u.id === usuario.id ? { ...u, cartoes: novosCartoes } : u,
    );

    await AsyncStorage.setItem("users", JSON.stringify(novosUsers));

    await AsyncStorage.setItem(
      "logged",
      JSON.stringify({
        ...usuario,
        cartoes: novosCartoes,
      }),
    );

    Alert.alert("Sucesso", "Cartão salvo!");
    router.push("/TelaPagamento");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Cadastrar Cartão</Text>

          <View style={styles.bloco}>
            <Text style={styles.textoCartao}>Nome no Cartão</Text>
            <TextInput
              style={[styles.input, errors.nome && styles.inputErro]}
              placeholder="nome no cartâo"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={(text) => {
                const somenteLetras = text.replace(/[^a-zA-Z\s]/g, "");
                setNome(somenteLetras);
                setErrors((prev) => ({ ...prev, nome: "" }));
              }}
            />
            {errors.nome && <Text style={styles.erro}>* {errors.nome}</Text>}
          </View>

          <View style={styles.bloco}>
            <Text style={styles.textoCartao}>Número</Text>
            <TextInput
              style={[styles.input, errors.numCartao && styles.inputErro]}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#aaa"
              value={numCartao}
              onChangeText={(text) => {
                const somenteNumeros = text.replace(/\D/g, "");
                setNumCartao(formatarCartao(somenteNumeros));
                setErrors((prev) => ({ ...prev, numCartao: "" }));
              }}
              keyboardType="numeric"
            />
            {errors.numCartao && (
              <Text style={styles.erro}>* {errors.numCartao}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textoCartao}>Validade</Text>
              <TextInput
                style={[styles.input, errors.validade && styles.inputErro]}
                placeholder="MM/AA"
                placeholderTextColor="#aaa"
                value={validade}
                onChangeText={(t) => setValidade(formatarValidade(t))}
              />
              {errors.validade && (
                <Text style={styles.erro}>* {errors.validade}</Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.textoCartao}>CVV</Text>
              <TextInput
                style={[styles.input, errors.cvv && styles.inputErro]}
                placeholder="123"
                placeholderTextColor="#aaa"
                value={cvv}
                onChangeText={(text) => {
                  const somenteNumeros = text.replace(/\D/g, "");
                  setCvv(somenteNumeros);
                  setErrors((prev) => ({ ...prev, cvv: "" }));
                }}
                keyboardType="numeric"
                secureTextEntry
              />
              {errors.cvv && <Text style={styles.erro}>* {errors.cvv}</Text>}
            </View>
          </View>

          <TouchableOpacity style={styles.botao} onPress={salvarCartao}>
            <Text style={styles.textoBotao}>Salvar Cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={voltar}>
            <Text
              style={[
                styles.textoBotao,
                { backgroundColor: "transparent", marginTop: 10, opacity: 0.7 },
              ]}
            >
              Voltar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: 13,
    marginBottom: 5,
    opacity: 0.8,
  },

  input: {
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#181717",
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
