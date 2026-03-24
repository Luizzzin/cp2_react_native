import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function Cardapio() {
    const router = useRouter();
    const lancheUm = {
        nome: "Coxinha",
        preco: 5.00,
        imagem: require("../assets/coxinha.png")
    }
    const [qtd, setQtd] = useState(0);

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    // cor rosa da fiap : #E83D84, cinza: #212425
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212425'
    },
    lanche: {
        backgroundColor: '#121213',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nome: {
        margin: 10,
        color: '#E83D84',
        fontSize: 18,
    },
    preco: {
        color: '#E83D84',
        fontSize: 16,
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
    }

});