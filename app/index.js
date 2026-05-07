import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

export default function Home() {
  const { setUser } = useUser(); // <- puxar o setUser
  const router = useRouter();
  const [text, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [message, setMessage] = useState('Digite suas credenciais');
  //Erros
  const [errors, setErrors] = useState({});

// não apagar o código abaixo (AsyncStorage pra manter o usuário logado)

  // Auto - login
  useEffect(() => {
    const checkLogin = async () => {
      const data_login = await AsyncStorage.getItem('logged');

      if (data_login) {
        const user = JSON.parse(data_login);
        setUser(user);
        router.push('/cardapio');
      }
    }
    checkLogin();
  }, []);


  // validacao de credenciais
  const bottomPress = async () => {
    let newErrors = {};

    try {
      const data = await AsyncStorage.getItem('users');
      const users = data ? JSON.parse(data) : [];
      

      const user = users.find (
        (user) => user.name === text && user.password === password
      )

      if (user) {
        await AsyncStorage.setItem('logged', JSON.stringify(user)); // manter logado
        setUser(user);  
        router.push('/cardapio');
      } else {
          // setMessage('Usuário ou senha inválidos');
          newErrors.message = "Usuário ou senha inválidos";
          setErrors(newErrors);
      }
    } catch (error) {
      setMessage('Houve um erro');
    }
    } 

  const bottomRegister = () => {
    router.push('/cadastro');
  }
  
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}>

      <ScrollView keyboardShouldPersistTaps="handled" 
        contentContainerStyle={{ flexGrow: 1 }} 
        style={{ flex: 1 }}>
        

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
              <View>
                <Input
                  onChangeText={onChangeName}
                  value={text}
                  placeholder='Nome'
                  secureTextEntry={false}
                />

                <Input
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder='Senha'
                  secureTextEntry={true}
                />

                {errors.message && (
                  <Text style={styles.erro}>
                    * {errors.message}
                  </Text>
                )}

              </View>

        
          <TouchableOpacity style={styles.button} onPress={bottomPress}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister} onPress={bottomRegister}>
            <Text style={styles.textRegister}>Cadastrar</Text>
          </TouchableOpacity>

        </View>
    
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181717'},
  title:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#E83D84', textAlign: 'center' },
  button:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, marginTop: 24, height: 70, width: 120, alignItems: 'center', justifyContent: 'center'},
  textButton:{ color: '#fff', fontWeight: '600', fontSize: 24  },
  input: { height: 50, width: 200, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#fff', textAlign: 'center', borderRadius: 8},
  messageError: { fontSize: 18, marginBottom: 24, color: '#fff', textAlign: 'center' },
  textRegister :{ color: '#E83D84', fontWeight: '600', fontSize: 20},
  buttonRegister: {padding: 28, borderRadius: 12},
  inputErro: {borderColor: '#ff4d4d'},
  erro: {color: '#ff4d4d', fontSize: 12, marginTop: 4, marginLeft: 12}
});