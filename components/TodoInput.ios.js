const React = require('react-native')
const {
  Component,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React

const { connect } = require('react-redux/native')
const { addTodo } = require('../actions/todos')

class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.addTodo(this.state.text)
    this.setState({text: null})
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter a todo"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={this.handleSubmit}
        >
          <Text>Add Todo</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  }
})

module.exports = connect(
  (state) => ({}),
  { addTodo }
)(TodoInput)
