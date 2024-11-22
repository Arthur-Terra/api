import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-web';
import TaskCard from './TaskCars';
TaskCard

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>task title</Text>
      <TextInput placeholder='Nome da tarefa' style={styles.input} />
      <Text style={styles.label}>Tarefa Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder='Descrição da tarefa'
        multiline />

      <View style={styles.buttonContainer}>
        <Button title='Salvar'
          style={styles.buttonGreen}
          color='darkgreen'
          onPress={
            () => {
              alert('Eu nao sei o meu nom')
            }
          } />
      </View>
      <TaskCard
        title={"Teste"}
        desc={"Descrição Teste"}
        status={"Done"}
        onClick={() => {
          alert("Deletar")
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    margin: 16
  },
  buttonGreen: {
    borderRadius: 12
  }

});