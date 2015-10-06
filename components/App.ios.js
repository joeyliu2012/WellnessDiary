const React = require('react-native')
const {
  Component,
  View,
  StyleSheet,
} = React

const TodoInput = require('./TodoInput')
const TodosList = require('./TodosList')

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TodoInput />
        <TodosList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
})

module.exports = App
