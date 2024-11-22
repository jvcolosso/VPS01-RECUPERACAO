// screens/CreatePollScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig'; // Certifique-se de que o caminho está correto
import { collection, addDoc } from 'firebase/firestore';

export default function CreatePollScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePoll = async () => {
    if (title === '' || option1 === '' || option2 === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'polls'), {
        title: title,
        options: [option1, option2],
        votes: [0, 0], // Inicializa os votos com 0 para cada opção
      });

      setLoading(false);
      Alert.alert('Sucesso', 'Enquete criada com sucesso!');
      navigation.navigate('Enquetes'); // Navega para a tela de enquetes
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', `Ocorreu um erro ao criar a enquete: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Enquete</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Enquete"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Opção 1"
        value={option1}
        onChangeText={setOption1}
      />
      <TextInput
        style={styles.input}
        placeholder="Opção 2"
        value={option2}
        onChangeText={setOption2}
      />

      <Button
        title={loading ? 'Criando...' : 'Criar Enquete'}
        onPress={handleCreatePoll}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
