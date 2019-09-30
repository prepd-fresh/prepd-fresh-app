import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      <WebView   
        style={{flex: 1, width: 320, borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da'}} 
        // using local URIs until we get a server up online
        source={{
          uri: (Platform.OS === 'ios')
            ? 'http://localhost:9000'
            : 'http://10.0.2.2:9000'}} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;