import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';

const App = () => {
  const exercises = [
    {id:0, name:'Push Ups', type:'Rep', sug:'Running'},
    {id:1, name:'Running', type:'Dura', sug:'Planks'},
    {id:2, name:'Planks', type:'Rep', sug:'Swimming'},
    {id:3, name:'Swimming', type:'Dura', sug:'Push Ups'},
  ];

  // home
  const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <h1>Exercises</h1>
        <FlatList
          data={exercises}
          renderItem={({item}) => 
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate(item.type, {name:item.name, sug:item.sug})}
          ><h2>{item.name}</h2></TouchableOpacity>}
        />
      </View>
    )
  };

  // dura
  const DuraExer = ({navigation, route}) => {
    let [isActive, setIsActive] = useState(false);
    let [isPaused, setIsPaused] = useState(false);
    let [timer, setTimer] = useState(0);

    useEffect(() => {
      let interval = null;

      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setTimer((timer) => timer+10);
        }, 10);
      }
      else {
          clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);

    const timerStart = () => {
      setIsActive(true);
      setIsPaused(false);
    };

    const timerReset = () => {
      setIsActive(false);
      setTimer(0);
    };

    return (
      <View style={styles.container}>
        <h2>{route.params.name} Duration</h2>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Rep', {name:route.params.sug})}
        ><h4>Suggested: {route.params.sug}</h4></TouchableOpacity>
        <h1 style={styles.h1}>{('0' + Math.floor((timer/60000) % 60)).slice(-2)}:{('0' + Math.floor((timer/1000) % 60)).slice(-2)}.{('0' + ((timer/10) % 100)).slice(-2)}</h1>
          <View style={styles.bar}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => timerStart()}
            ><h4>start</h4></TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => timerReset()}
            ><h4>reset</h4></TouchableOpacity>
          </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        ><h4>home</h4></TouchableOpacity>
      </View>
    )
  };

  // rep
  const RepExer = ({navigation, route}) => {
    let [counter, setCounter] = useState(0);
    return (
      <View style={styles.container}>
        <h2>{route.params.name} Repetition</h2>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Dura', {name:route.params.sug})}
        ><h4>Suggested: {route.params.sug}</h4></TouchableOpacity>
        <h1 style={styles.h1}>{counter}</h1>
          <View style={styles.bar}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setCounter(counter+1)}
            ><h4>add</h4></TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCounter(0)}
            ><h4>reset</h4></TouchableOpacity>
          </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        ><h4>home</h4></TouchableOpacity>
      </View>
    )
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Dura' component={DuraExer} />
          <Stack.Screen name='Rep' component={RepExer} />
        </Stack.Navigator>
     </NavigationContainer> 
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  h1: {
    fontSize: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00e6d4',
    color: 'white',
    paddingHorizontal: '20px',
    borderRadius: 25,
    marginLeft: '2px',
    marginRight: '2px',
    marginBottom: '5px',
    height: '35px',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7cdd',
    color: 'white',
    paddingHorizontal: '20px',
    borderRadius: 25,
    marginLeft: '2px',
    marginRight: '2px',
    marginBottom: '10px',
    height: '35px',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
  }
});

export default App;
