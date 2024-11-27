import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import TaskCard from './TaskCard';
import { useState, useEffect} from 'react';
import { getRequest } from './api/Api';

export default function App() {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [task, setTask] = useState([]);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  const onMessage = () => {
    setAlert1(false);
    setAlert2(false);

    if (taskTitle !== "" && taskDescription.length >= 10) {
      setTask([
        ...task, {
          id: task.length + 1,
          title: taskTitle,
          description: taskDescription
        }
      ]);

      setTaskTitle("");  
      setTaskDescription("");  
    } else {
      if (!taskTitle.trim()) {
        setAlert1(true);
        setTimeout(() => {
          setAlert1(false);
        }, 4000);
      }

      if (taskDescription.length < 10) {
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 4000);
      }
    }
  };

  const deleteTask = (index) => {
    const updateTasks = [...task];
    updateTasks.splice(index, 1);  
    setTask(updateTasks);
  };
useEffect(() => {
  const fetchData = async () => {
    try {
       const resp = await getRequest();
       setTask(resp)
    }catch (ex) {
      console.error(ex)
    }
  }
}, [])
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo da tarefa</Text>
      <TextInput 
        placeholder='Nome da tarefa' 
        style={styles.input} 
        value={taskTitle} 
        onChangeText={setTaskTitle}  
      />

      <Text style={styles.label}>Tarefa Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder='Descrição da tarefa'
        multiline
        value={taskDescription}
        onChangeText={setTaskDescription}  
      />

      {alert1 && (
        <Text style={styles.errorText}>
          Necessário informar o título
        </Text>
      )}

      {alert2 && (
        <Text style={styles.errorText}>
          Necessário mínimo 10 caracteres
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <Button 
          title='Salvar'
          style={styles.buttonGreen}
          color='darkgreen'
          onPress={onMessage}
        />
      </View>

      {task.length > 0 && <View style={styles.separator} />}

      <ScrollView>
        {task.map((item, index) => (
          <TaskCard
            key={item.id}  
            title={item.title}  
            desc={item.description}  
            status={"Done"}  
            onClick={() => deleteTask(index)}  
          />
        ))}
      </ScrollView>
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
  },
  separator: {
    marginTop: 16,
    width: "100%",
    height: 1,
    backgroundColor: "#222"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic"
  }
});
