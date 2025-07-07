import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import * as SecureStore from 'expo-secure-store';
import gstyles from '../styles/global';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor completá email y contraseña.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar UID y Email
      await SecureStore.setItemAsync('uid', uid);
      await SecureStore.setItemAsync('email', email);

      // Intentar recuperar nombre y descripción
      const nombre = await SecureStore.getItemAsync('nombre');
      const descripcion = await SecureStore.getItemAsync('descripcion');

      if (!nombre || !descripcion) {
        Alert.alert(
          "Perfil incompleto",
          "Faltan datos de tu perfil. Por favor completalos.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('CompletarPerfil')
            }
          ]
        );
      } else {
        Alert.alert("Bienvenido", `Hola ${nombre}`);
        navigation.navigate('Home');
      }

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={gstyles.container}>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
        style={gstyles.input}
      />
      <TextInput
        placeholder='Contraseña'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={gstyles.input}
      />
      <Button
        title='Iniciar sesión'
        onPress={handleLogin}
        color='blue'
      />
      <Text
        onPress={() => navigation.navigate('Register')}
        style={gstyles.link}>
        ¿No tenés cuenta? Registrate
      </Text>
    </View>
  );
}