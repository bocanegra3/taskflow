import { StyleSheet } from 'react-native'

import ProfileScreens from './src/screens/ProfileScreens'
import { colors } from './src/constants/colors'
import AddTaskScreen from './src/screens/AddTaskScreen'
import MenuPrincipal from './src/screens/MenuPrincipal'

export default function App() {
  return (
 
      <MenuPrincipal />      
   
  )
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