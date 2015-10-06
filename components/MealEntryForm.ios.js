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
const { addMeal } = require('../actions/meals')

class MealEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.addMeal(this.state.text)
    this.setState({text: null})
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 40}}>
        <TextInput
          style={styles.input}
          placeholder="What did you have to eat?"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={this.handleSubmit}
        >
          <Text>Add Meal</Text>
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
  { addMeal }
)(MealEntryForm)
