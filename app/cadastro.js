import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { assertScreens } from 'expo-router/build/fork/getStateFromPath-forks'; <- removido, não estava sendo usado

export default function cadastro() {
  const router = useRouter();
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirm, onChangeConfirm] = useState('');
  const [message, setMessage] = useState('Digite suas credenciais');
  const [errors, setErrors] = useState({});

  const bottomPress = async () => {
    let erro = false;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Digite um nome válido";
      erro = true;
    }

    if (!email.trim() || !email.includes('@')) {
      newErrors.email = "Digite um email com @";
      erro = true;
    }

    if (!password.trim() || password.length < 6) {
      newErrors.password = "A senha deve ter 6 dígitos";
      erro = true;
    }

    if (password !== confirm) {
      newErrors.confirm = "A confirmação deve ser igual à senha";
      erro = true;
    }

    setErrors(newErrors);

    if (!erro) {
      const newUser = { name, email, password };
      try {
        const data = await AsyncStorage.getItem('users');
        const users = data ? JSON.parse(data) : [];

        const emailExists = users.some(u => u.email === email);

        if (emailExists) {
          Alert.alert('Esse email já existe!');
          return;
        }

        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Sucesso', 'Cadastro realizado!');
        router.push('/');
      } catch (e) {
        setMessage('Algum erro aconteceu: Tente novamente!');
      }
    }
  };

  const bottomIndex = () => {
    router.push('/');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}>

        <View style={styles.container}>

          <View>
            <Image
              source={require('../assets/logo_fiap.png')}
              style={{ width: 220, height: 80 }}
            />
          </View>

          <View>
            <Text style={styles.title}>Conecte-se com a sua cantina favorita</Text>
            <Text style={styles.messageError}>{message}</Text>
          </View>

          <View>
            <Input
              style={[styles.input, errors?.name && styles.inputErro]}
              onChangeText={onChangeName}
              value={name}
              placeholder='Nome'
              secureTextEntry={false}
            />
            {errors.name && <Text style={styles.erro}>* {errors.name}</Text>}
          </View>

          <View>
            <Input
              style={[styles.input, errors?.email && styles.inputErro]}
              onChangeText={onChangeEmail}
              value={email}
              placeholder='Email'
              secureTextEntry={false}
            />
            {errors.email && <Text style={styles.erro}>* {errors.email}</Text>}
          </View>

          <View>
            <Input
              style={[styles.input, errors?.password && styles.inputErro]}
              onChangeText={onChangePassword}
              value={password}
              placeholder='Senha'
              secureTextEntry={true}
            />
            {errors.password && <Text style={styles.erro}>* {errors.password}</Text>}
          </View>

          <View>
            <Input
              style={[styles.input, errors?.confirm && styles.inputErro]}
              onChangeText={onChangeConfirm}
              value={confirm}
              placeholder='Confirmar senha'
              secureTextEntry={true}
            />
            {errors.confirm && <Text style={styles.erro}>* {errors.confirm}</Text>}
          </View>

          <TouchableOpacity style={styles.button} onPress={bottomPress}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister} onPress={bottomIndex}>
            <Text style={styles.textRegister}>Voltar</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181717' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#E83D84', textAlign: 'center' },
  button: { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, marginTop: 24, height: 70, width: 120, alignItems: 'center', justifyContent: 'center' },
  textButton: { color: '#fff', fontSize: 18, fontWeight: '600' },
  input: { height: 50, width: 200, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#fff', textAlign: 'center', borderRadius: 8 },
  messageError: { fontSize: 18, marginBottom: 24, color: '#fff', textAlign: 'center' },
  textRegister: { color: '#E83D84', fontWeight: '600', fontSize: 20 },
  buttonRegister: { padding: 28, borderRadius: 12 },
  inputErro: { borderColor: '#ff4d4d' },
  erro: { color: '#ff4d4d', fontSize: 12, marginTop: 4, marginLeft: 12 }
});