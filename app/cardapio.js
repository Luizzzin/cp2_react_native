import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Cardapio() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const salvarCarrinho = async (novaQtd, novaQtd2, novaQtd3) => {
    const carrinho = {
      qtd: novaQtd,
      qtd2: novaQtd2,
      qtd3: novaQtd3,
    };
    await AsyncStorage.setItem("carrinho", JSON.stringify(carrinho));

  };

  

  const handlePress = async () => {
    try {
      const usuarioJSON = await AsyncStorage.getItem("logged");

      if (!usuarioJSON) {
        router.push("/");
        return;
      }

      let usuario = null;

      try {
        usuario = JSON.parse(usuarioJSON);
      } catch (e) {
        console.error("JSON inválido:", e);
        return;
      }

      if ((usuario?.cartoes && usuario.cartoes.length > 0) || usuario.cartao) {
        router.push({
          pathname: "/TelaPagamento",
          params: {
            total: total.toFixed(2),
            origem: "cardapio",
          },
        });
      } else {
        router.push({
          pathname: "/TelaCadastroCartao",
          params: {
            origem: "cardapio",
            total: total.toFixed(2),
          },
        });
      }
    } catch (error) {
      console.error("Erro ao verificar cartão:", error);
    }
  };

  

  const handleLogout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("logged");
      await limparCarrinho();
      router.push("/");

    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const lancheUm = {
    nome: "Coxinha",
    preco: 5.0,
    imagem: require("../assets/coxinha.png"),
  };
  const lancheDois = {
    nome: "Cookie",
    preco: 2.0,
    imagem: require("../assets/cookie.png"),
  };
  const lancheTres = {
    nome: "cafezinho",
    preco: 3.0,
    imagem: require("../assets/cafe.png"),
  };
  const [qtd, setQtd] = useState(0);
  const [qtd2, setQtd2] = useState(0);
  const [qtd3, setQtd3] = useState(0);
  const total =
    lancheUm.preco * qtd + lancheDois.preco * qtd2 + lancheTres.preco * qtd3;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const carregarCarrinho = async () => {
      const data = await AsyncStorage.getItem("carrinho");
      if (data) {
        const carrinho = JSON.parse(data);
        setQtd(carrinho.qtd || 0);
        setQtd2(carrinho.qtd2 || 0);
        setQtd3(carrinho.qtd3 || 0);
      }
    };
    carregarCarrinho();
  }, []);
  const limparCarrinho = async () => {
    await AsyncStorage.removeItem("carrinho");
    setQtd(0);
    setQtd2(0);
    setQtd3(0);
  };
  return (
    <View style={styles.container}>
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        {/* area interna do modal */}
        <View style={styles.centerModal}>
          <View style={styles.ModalView}>
            <Text style={styles.nome}>Seu Carrinho:</Text>

            {qtd > 0 && <Text style={styles.digito}>Coxinha x{qtd} — R$ {(lancheUm.preco * qtd).toFixed(2)}</Text>}
            {qtd2 > 0 && <Text style={styles.digito}>Cookie x{qtd2} — R$ {(lancheDois.preco * qtd2).toFixed(2)}</Text>}
            {qtd3 > 0 && <Text style={styles.digito}>Cafezinho x{qtd3} — R$ {(lancheTres.preco * qtd3).toFixed(2)}</Text>}
            {qtd === 0 && qtd2 === 0 && qtd3 === 0 && (
              <Text style={styles.digito}>Carrinho vazio 🛒</Text>
            )}

            <Text style={styles.preco}>Total: R$ {total.toFixed(2)}</Text>

            <Pressable style={styles.carrinho} onPress={() => setModalVisible(false)}>
              <Text style={styles.digito}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* View dos botes */}
      <View style={styles.top}>
        <TouchableOpacity style={styles.carrinho} onPress={handleLogout}>
          <Text style={styles.digito}>Logout ⬅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinho} onPress={() => setModalVisible(true)}>
          <Text style={styles.digito}>🛒: R$ {total.toFixed(2)}</Text>
        </TouchableOpacity>
        

      </View>
      {/* Parte do cardápio */}
      <Text style={styles.escolha}>Olá, {user?.name || "visitante"}!</Text>
      <Text style={styles.escolha}>Escolha seus lanches:</Text>
      <ScrollView style={styles.scrol}>
        <View style={styles.lanche}>
          <Image source={lancheUm.imagem} style={{ width: 180, height: 180 }} />
          <Text style={styles.nome}>{lancheUm.nome}</Text>
          <Text style={styles.preco}>R$ {lancheUm.preco.toFixed(2)}</Text>
          <View style={styles.quantidade}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd > 0 ? qtd - 1 : 0;
                setQtd(nova);
                salvarCarrinho(nova, qtd2, qtd3);
              }}
            >
              <Text style={styles.digito}>-</Text>
            </TouchableOpacity>
            <Text style={styles.digito}>{qtd}</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd + 1;
                setQtd(nova);
                salvarCarrinho(nova, qtd2, qtd3);
              }}
            >
              <Text style={styles.digito}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lanche}>
          <Image
            source={lancheDois.imagem}
            style={{ width: 180, height: 180 }}
          />
          <Text style={styles.nome}>{lancheDois.nome}</Text>
          <Text style={styles.preco}>R$ {lancheDois.preco.toFixed(2)}</Text>
          <View style={styles.quantidade}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd2 > 0 ? qtd2 - 1 : 0;
                setQtd2(nova);
                salvarCarrinho(qtd, nova, qtd3);
              }}
            >
              <Text style={styles.digito}>-</Text>
            </TouchableOpacity>
            <Text style={styles.digito}>{qtd2}</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd2 + 1;
                setQtd2(nova);
                salvarCarrinho(qtd, nova, qtd3);
              }}
            >
              <Text style={styles.digito}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lanche}>
          <Image
            source={lancheTres.imagem}
            style={{ width: 180, height: 180 }}
          />
          <Text style={styles.nome}>{lancheTres.nome}</Text>
          <Text style={styles.preco}>R$ {lancheTres.preco.toFixed(2)}</Text>
          <View style={styles.quantidade}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd3 > 0 ? qtd3 - 1 : 0;
                setQtd3(nova);
                salvarCarrinho(qtd, qtd2, nova);
              }}
            >
              <Text style={styles.digito}>-</Text>
            </TouchableOpacity>
            <Text style={styles.digito}>{qtd3}</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                const nova = qtd3 + 1;
                setQtd3(nova);
                salvarCarrinho(qtd, qtd2, nova);
              }}
            >
              <Text style={styles.digito}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
          style={styles.carrinho}
          onPress={() => {
            router.push({
              pathname: "/TelaPagamento",
              params: { total: total.toFixed(2), origem: "cardapio" },
            });
            handlePress();
          }}
        >
          <Text style={styles.digito}>Finalizar Pedido ✅</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // cor rosa da fiap : #E83D84, cinza: #212425
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212425",
    paddingTop: 50,
    paddingBottom: 20,
  },
  lanche: {
    backgroundColor: "#121213",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: "#E83D84",
    borderWidth: 1,
  },
  nome: {
    margin: 10,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  preco: {
    color: "#E83D84",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantidade: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 10,
  },
  botao: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    backgroundColor: "#E83D84",
  },
  digito: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  carrinho: {
    backgroundColor: "#121213",
    padding: 10,
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#E83D84",
    borderWidth: 1,
  },
  escolha: {
    color: "#e83d84",
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  scrol: {
    width: "100%",
    paddingHorizontal: 20,
  },
  top: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  // estilos do modal
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  ModalView: {
    margin: 20,
    backgroundColor: '#121213',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#e83d84',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});
