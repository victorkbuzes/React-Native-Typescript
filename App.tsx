import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/app/store';
import UserList from './src/features/UserList';

export default function App() {
  return (
      <>
    
      <SafeAreaView>
        <ReduxProvider store={store}>
          <UserList />

        </ReduxProvider>
      </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
