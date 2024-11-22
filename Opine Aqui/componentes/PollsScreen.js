
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { firebase } from '../firebaseConfig'; 

export default function PollsScreen() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('polls') 
      .onSnapshot((snapshot) => {
        const newPolls = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPolls(newPolls);
      });

    return unsubscribe;
  }, []);

  const vote = (pollId, optionIndex) => {
    const pollRef = firebase.firestore().collection('polls').doc(pollId);

    pollRef.get().then((doc) => {
      if (doc.exists) {
        const pollData = doc.data();
        const updatedVotes = [...pollData.votes];
        updatedVotes[optionIndex] += 1; 

        pollRef.update({
          votes: updatedVotes,
        })
        .then(() => {
          Alert.alert('Sucesso', `Você votou na opção ${optionIndex + 1}`);
        })
        .catch((error) => {
          Alert.alert('Erro', `Não foi possível registrar seu voto: ${error.message}`);
        });
      }
    });
  };

  const renderPoll = ({ item }) => (
    <View style={styles.pollContainer}>
      <Text style={styles.pollTitle}>{item.title}</Text>
      {item.options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Text style={styles.optionText}>{option}</Text>
          <Text style={styles.votesText}>
            {`Votos: ${item.votes[index]}`}
          </Text>
          <Button
            title={`Votar em ${option}`}
            onPress={() => vote(item.id, index)} 
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enquetes</Text>
      <FlatList
        data={polls}
        renderItem={renderPoll}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pollContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  votesText: {
    fontSize: 14,
    color: '#555',
  },
});
