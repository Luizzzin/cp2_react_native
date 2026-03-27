import { View, Text, TouchableOpacity, StyleSheet, Button, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react'; 

export default function Sobre() {
  const router = useRouter();
  
  const [armazenar, setArmazenar] = useState("");

  function gerarNovoCodigo() {
    const codigoAleatorio = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    
    setArmazenar(codigoAleatorio);
    
  }

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Retirada</Text>

        <Text style={styles.descricao}>
          Código gerado: {armazenar || "----"}
        </Text>
    
        <TouchableOpacity style={styles.CorButton} onPress={gerarNovoCodigo}>
           <Text style={styles.voltar}>Gerar código de retirada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CorButton} onPress={() => {router.push('/cardapio')}}>
           <Text style={styles.voltar}>🔙 Voltar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#212425' },
  titulo:     { fontSize: 28, fontWeight: 'bold', marginBottom: 12, color: '#fff' },
  descricao:  { fontSize: 18, color: '#fff', marginBottom: 24 },
  voltar:     { fontSize: 16, color: '#E83D84', fontWeight: '600' },
  CorButton:  { backgroundColor: '#121213', padding: 15, borderRadius: 8, alignItems: 'center', width: '80%', margin:'10' , }
});