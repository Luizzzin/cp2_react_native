import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
export default function Home() {
  const router = useRouter();
  const [text, onChangeText] = useState('');
  const [password, onChangePassword] = useState('');
  const [message, setMessage] = useState('Digite suas credenciais');
  // credenciais fictícias
  const fic_rm = '512345';
  const fic_password = 'coxinha123';
  // validacao de credenciais
  const bottomPress = () => {
    if (text === fic_rm && password === fic_password) {
      onChangePassword('');
      onChangeText('');
      setMessage('Digite suas credenciais')
      router.push('/cardapio');
    } else {
      setMessage('RM ou senha inválidos!')
    }
  }
  
  return (
    <View style={styles.container}>
        <View>
            <Image 
                source = {require('../assets/logo_fiap.png')}
                style={{ width: 220, height: 80 }}
            />
        </View>

        <View>
            <Text style={styles.title}>Conecte-se com a sua cantina favorita</Text>
            <Text style={styles.messageError}>{message}</Text>
        </View>

        <View>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder='RM'
            />
        </View>

        <View>
            <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder='Senha'
            secureTextEntry={true}
            />
        </View>
          
      <TouchableOpacity style={styles.button} onPress={bottomPress}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181717'},
  title:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#E83D84', textAlign: 'center' },
  button:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, marginTop: 24, height: 70, width: 120, alignItems: 'center', justifyContent: 'center'},
  textButton:{ color: '#fff', fontSize: 16, fontWeight: '600', fontSize: 24  },
  input: { height: 50, width: 200, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#fff', textAlign: 'center', borderRadius: 8},
  messageError: { fontSize: 18, marginBottom: 24, color: '#fff', textAlign: 'center' },
});