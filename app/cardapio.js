import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cardapio() {
    const lancheUm = {
        nome: "Coxinha",
        preco: 5.00,
        imagem: require("../assets/coxinha.png")
    }
    const lancheDois = {
        nome: "Cookie",
        preco: 2.00,
        imagem: require("../assets/cookie.png")
    }
    const lancheTres = {
        nome: "cafezinho",
        preco: 3.00,
        imagem: require("../assets/cafe.png")
    }
    const [qtd, setQtd] = useState(0);
    const [qtd2, setQtd2] = useState(0);
    const [qtd3, setQtd3] = useState(0);
    const total = (lancheUm.preco * qtd) + (lancheDois.preco * qtd2) + (lancheTres.preco * qtd3);

    return (
        <View style={styles.container}>
            <View style={styles.carrinho}>
                <Text style={styles.digito}>🛒Carrinho: R$ {total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.carrinho} onPress={() => router.push('/TelaPagamento')}>
                <Text style={styles.digito}>Finalizar Pedido ✅</Text>
            </TouchableOpacity>
            <Text style={styles.escolha}>Escolha seus lanches:</Text>
            <ScrollView style={styles.scrol}>
                <View style={styles.lanche}>
                    <Image
                        source={lancheUm.imagem}
                        style={{ width: 180, height: 180 }}
                    />
                    <Text style={styles.nome}>{lancheUm.nome}</Text>
                    <Text style={styles.preco}>R$ {lancheUm.preco.toFixed(2)}</Text>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd(qtd > 0 ? qtd - 1 : 0)} >
                            <Text style={styles.digito}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.digito}>{qtd}</Text>
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd(qtd + 1)}>
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
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd2(qtd2 > 0 ? qtd2 - 1 : 0)} >
                            <Text style={styles.digito}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.digito}>{qtd2}</Text>
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd2(qtd2 + 1)}>
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
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd3(qtd3 > 0 ? qtd3 - 1 : 0)} >
                            <Text style={styles.digito}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.digito}>{qtd3}</Text>
                        <TouchableOpacity style={styles.botao} onPress={() => setQtd3(qtd3 + 1)}>
                            <Text style={styles.digito}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    // cor rosa da fiap : #E83D84, cinza: #212425
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212425',
        paddingTop: 50,
        paddingBottom: 20,
    },
    lanche: {
        backgroundColor: '#121213',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderColor: '#E83D84',
        borderWidth: 1,
    },
    nome: {
        margin: 10,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    preco: {
        color: '#E83D84',
        fontSize: 20,
        fontWeight: 'bold'
    },
    quantidade: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 10,
    },
    botao: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: '#E83D84',
    },
    digito: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    carrinho: {
        backgroundColor: '#121213',
        padding: 15,
        margin: 5,
        borderRadius: 10,
    },
    escolha: {
        color: '#e83d84',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    scrol: {
        width: '100%',
        paddingHorizontal: 20,
    }

});