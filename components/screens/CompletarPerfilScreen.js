import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import gstyles from '../styles/global';

export default function CompletarPerfilScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigation = useNavigation();

  const handleGuardar = async () => {
    if (!nombre || !descripcion) {
      Alert.alert('Campos requeridos', 'Por favor completá ambos campos.');
      return;
    }

    try {
      await SecureStore.setItemAsync('nombre', nombre);
      await SecureStore.setItemAsync('descripcion', descripcion);
      Alert.alert('Perfil guardado', '¡Tu perfil fue completado con éxito!');
      navigation.replace('Home'); // Ir a Home directamente
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil.');
    }
  };

  return (
    <View style={gstyles.container}>
      <Text style={gstyles.titulo}>Completá tu Perfil</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={gstyles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={gstyles.input}
      />
      <Button title="Guardar perfil" onPress={handleGuardar} color="blue" />
    </View>
  );
}