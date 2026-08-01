import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Welcome from './src/components/Welcome'
import { colors } from './src/theme/colors'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Welcome />
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