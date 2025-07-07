import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import PerfilUsuario from '../PerfilUsuario';
import gstyles from '../styles/global';

export default function HomeScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const nombreGuardado = await SecureStore.getItemAsync('nombre');
        const emailGuardado = await SecureStore.getItemAsync('email');
        const descripcionGuardada = await SecureStore.getItemAsync('descripcion');

        setNombre(nombreGuardado || '');
        setEmail(emailGuardado || '');
        setDescripcion(descripcionGuardada || '');
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el perfil');
      }
    };

    cargarPerfil();
  }, []);

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      await SecureStore.deleteItemAsync('uid');
      await SecureStore.deleteItemAsync('nombre');
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('descripcion');

      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <View style={gstyles.container}>
      <PerfilUsuario
        nombre={nombre}
        email={email}
        descripcion={descripcion}
      />

      <Button title="Cerrar sesión" onPress={cerrarSesion} color="red" />
    </View>
  );
}