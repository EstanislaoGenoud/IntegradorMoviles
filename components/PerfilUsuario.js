import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import gstyles from './styles/global';

export default function PerfilUsuario({ nombre, email, descripcion }) {
  return (
    <View style={[gstyles.container, gstyles.perfilBox]}>
      <Text style={gstyles.titulo}>Mi Perfil</Text>

      <Text style={gstyles.label}>Nombre:</Text>
      <Text style={gstyles.value}>{nombre}</Text>

      <Text style={gstyles.label}>Email:</Text>
      <Text style={gstyles.value}>{email}</Text>

      <Text style={gstyles.label}>Descripción:</Text>
      <Text style={gstyles.value}>{descripcion}</Text>
    </View>
  );
}