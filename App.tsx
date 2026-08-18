import { StyleSheet } from 'react-native'
/* import ProfileScreens from './src/screens/ProfileScreens' */
import { colors } from './src/constants/colors'
/* import AddTaskScreen from './src/screens/AddTaskScreen' */
import AppNavigator from "./src/navegation/AppNavigator";


export default function App() {
 return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgounrdColor,
    alignItems: 'center',
    padding: 0.1,
    gap: 1,
    justifyContent: 'center',
  
  }
})