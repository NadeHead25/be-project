import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

import Voice from 'react-native-voice';

const Speech = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [text, onChangeText] = useState();
  const [number, onChangeNumber] = useState();
  const [result, onChangeResult] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setStarted('√');
  };

  const onSpeechEnd = (e) => {
    setEnd('√');
  };

  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
    onChangeResult(e.value[0]);
  };

  const onSpeechPartialResults = (e) => {
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Vidyavardhini College of Engineering and Technology
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Name"
        />
        <TextInput
          style={styles.inputa}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Department"
        />

        <Text style={styles.eme}>Emergency</Text>
        <Switch
          style={styles.switch}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          placeholder="Emergency"
        />

        <Text style={styles.textStyle}>Press mic to start Recognition</Text>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>Results</Text>
        <TextInput
          style={styles.inputb}
          onChangeText={onChangeResult}
          value={result}
        />

        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>

        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Stop</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Speech;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Italic',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'skyblue',
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 20,
  },
  buttonTextStyle: {
    color: 'black',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: 'red',
  },
  input: {
    height: 40,
    marginTop: 50,
    borderWidth: 2,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  inputa: {
    height: 40,
    marginTop: 20,
    borderWidth: 2,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  inputb: {
    height: 40,
    margin: 15,
    textTransform: 'capitalize',
    padding: 10,
    width: '70%',
    borderRadius: 20,
  },
  switch: {
    marginTop: 3,
  },

  eme: {
    marginTop: 10,
  },
});
