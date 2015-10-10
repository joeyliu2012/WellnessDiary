const React = require('react-native')
const {
  Component,
  PixelRatio,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React

const NavigationBar = require('react-native-navbar')

const { connect } = require('react-redux/native')
const { addMealWithPhoto } = require('../actions/meals')

class MealEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: null,
    }

    this.handlePressSave = this.handlePressSave.bind(this)
  }

  handlePressSave() {
    const { description } = this.state
    const { image, addMealWithPhoto, navigator } = this.props
    addMealWithPhoto(description, image)
    navigator.pop()
  }

  render() {
    const { image, navigator } = this.props
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navbar}
          navigator={this.props.navigator}
          title="Meal Entry"
          nextTitle="Save"
          onNext={this.handlePressSave}
          prevTitle="Cancel"
          onPrev={navigator.pop}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(description) => this.setState({description})}
          placeholder="What did you have to eat?"
        >
          <Image
            style={styles.imagePreview}
            source={{uri: image}}
          />
        </TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 120,
    padding: 6,
    margin: 4,
    fontSize: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  imagePreview: {
    height: 60,
    width: 60,
    alignSelf: 'flex-end',
  },
  navbar: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
})

module.exports = connect(
  (state) => ({}),
  { addMealWithPhoto }
)(MealEntryForm)
