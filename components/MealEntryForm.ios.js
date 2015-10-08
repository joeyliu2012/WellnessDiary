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

const Camera = require('react-native-camera')

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
    const description = this.state.text
    this.refs.cam.capture((err, imagePath) => {
      this.props.addMeal(description, imagePath)
      this.props.navigator.pop()
    })
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 40}}>
        <Camera
          ref="cam"
          type={Camera.constants.Type.back}
          style={{
            width: 100,
            height: 100,
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
        />
        <TextInput
          style={styles.input}
          placeholder="What did you have to eat?"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={this.handleSubmit}
        >
          <Text ref="test">Add Meal</Text>
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
