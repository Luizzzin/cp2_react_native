import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assertScreens } from 'expo-router/build/fork/getStateFromPath-forks';

export default function cadastro() {
  const router = useRouter();
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirm, onChangeConfirm] = useState('');
  const [message, setMessage] = useState('Digite suas credenciais');

  // validacao de credenciais
  const bottomPress = async () => {
    let erro = false;
    if (!name.trim()) {
        erro = true;
    }
    
    if (!email.trim() || !email.includes('@')) {
        erro = true;
    }
    
    if (!password.trim() || password.length < 6) {
        erro = true;
    }

    if (password !== confirm) {
      erro = true;
    } 

    if (!erro) {
      const newUser = {name, email, password};
      try {
            // 1. Pegar usuários que já existem
            const data = await AsyncStorage.getItem('users')
            const users = data ? JSON.parse(data) : [];

            //2. Verificar email (u = cada usuário)
            const emailExists = users.some(u => u.email === email); 

            if (emailExists) {
              // setMessage('Esse email já existe!');
              Alert.alert('Esse email já existe!');
              return;
            }

            // 3. Adicionar novo usuário
            users.push(newUser);

            // 4. Salvar lista atualizada
            await AsyncStorage.setItem('users', JSON.stringify(users));
            Alert.alert('Sucesso', 'Cadastro realizado!');
            router.push('/');
        } catch (e) {
            setMessage('Algum erro aconteceu: Tente novamente!')
        }
    } else {
        setMessage('Email inválido ou senhas diferentes!');
    }
  }

  const bottomIndex = () => {
    router.push('/');
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

        {/* Usando componentes */}
        <Input
          onChangeText={onChangeName}
          value={name}
          placeholder='Nome'
          secureTextEntry={false}
        />

        <Input
          onChangeText={onChangeEmail}
          value={email}
          placeholder='Email'
          secureTextEntry={false}
        />

        <Input
          onChangeText={onChangePassword}
          value={password}
          placeholder='Senha'
          secureTextEntry={true}
        />

        <Input
          onChangeText={onChangeConfirm}
          value={confirm}
          placeholder='Confirmar senha'
          secureTextEntry={true}
        />
          
      <TouchableOpacity style={styles.button} onPress={bottomPress}>
        <Text style={styles.textButton}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister} onPress={bottomIndex}>
        <Text style={styles.textRegister}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181717'},
  title:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#E83D84', textAlign: 'center' },
  button:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, marginTop: 24, height: 70, width: 120, alignItems: 'center', justifyContent: 'center'},
  textButton:{ color: '#fff', fontSize: 18, fontWeight: '600'},
  input: { height: 50, width: 200, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#fff', textAlign: 'center', borderRadius: 8},
  messageError: { fontSize: 18, marginBottom: 24, color: '#fff', textAlign: 'center' },
  textRegister :{ color: '#E83D84', fontWeight: '600', fontSize: 20},
  buttonRegister: {padding: 28, borderRadius: 12},
});