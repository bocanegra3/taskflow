import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileScreens from './src/screens/ProfileScreens'
import { colors } from './src/constants/colors'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreens />
    </SafeAreaView>
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