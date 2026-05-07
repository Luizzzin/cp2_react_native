import { View, TextInput, StyleSheet } from 'react-native';

export default function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) {
  return (
    <View>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {height: 50, width: 200, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#fff', textAlign: 'center', borderRadius: 8}
});