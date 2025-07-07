import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import * as SecureStore from 'expo-secure-store';
import gstyles from '../styles/global';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
    if (!validarEmail(email)) {
      Alert.alert("Email inválido", "Por favor, ingresa un email válido.");
      return;
    }
    if (!email || !password || !nombre || !descripcion) {
      Alert.alert("Campos requeridos", "Por favor completá todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Guardar datos localmente
      await SecureStore.setItemAsync('uid', userCredential.user.uid);
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('nombre', nombre);
      await SecureStore.setItemAsync('descripcion', descripcion);

      Alert.alert("Registro exitoso", "Bienvenido/a " + nombre);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert("Error al registrar", error.message);
    }
  };

  return (
    <View style={gstyles.container}>
      <TextInput
        placeholder='Nombre'
        value={nombre}
        onChangeText={setNombre}
        style={gstyles.input}
      />
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={gstyles.input}
      />
      <TextInput
        placeholder='Contraseña'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={gstyles.input}
      />
      <TextInput
        placeholder='Descripción'
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={gstyles.input} 
      />
      <Button
        title='Registrarse'
        onPress={handleRegister}
        color='blue'
      />
      <Text
        onPress={() => navigation.navigate('Login')}
        style={gstyles.link}>
        ¿Ya tenés cuenta? Iniciá sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  link: { color: 'blue', marginTop: 12, textAlign: 'center' }
});