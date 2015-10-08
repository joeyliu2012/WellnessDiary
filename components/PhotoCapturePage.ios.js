const React = require('react-native')
const {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} = React

const { connect } = require('react-redux/native')
const { addMeal } = require('../actions/meals')

const Camera = require('react-native-camera')
const SearchPage = require('./SearchPage')

class PhotoCapturePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: null,
      mealDesc: null,
    }

    this.handleCapturePress = this.handleCapturePress.bind(this)
    this.handleRetakePress = this.handleRetakePress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCapturePress() {
    const { camera } = this.refs
    if (camera) {
      camera.capture((err, data) => {
        if (err) {
          console.error(err)
        } else {
          this.props.navigator.replace({
            title: "Search",
            component: SearchPage,
            props: {
              image: data,
            },
          })
        }
      })
    }
  }

  handleRetakePress() {
    this.setState({source: null})
  }

  handleSubmit() {
    const { mealDesc, source } = this.state
    if (mealDesc && source) {
      this.props.addMeal(mealDesc, source.uri)
      this.props.navigator.push({
      })
    }
  }

  renderCameraOrImage() {
    if (!this.state.source) {
      return (
        <Camera
          ref="camera"
          style={styles.camera}
          type={Camera.constants.Type.back}
        />
      )
    }
    return (
      <Image
        style={styles.input}
        style={styles.image}
        source={this.state.source}
      />
    )
  }

  renderCaptureButtonOrForm() {
    if (this.state.source) {
      // return (
      //   <TouchableOpacity
      //     onPress={this.handleRetakePress}
      //   >
      //     <Text>
      //       Retake
      //     </Text>
      //   </TouchableOpacity>
      // )
      return (
        <TextInput
          style={styles.input}
          placeholder="What did you have to eat?"
          onChangeText={(mealDesc) => this.setState({mealDesc})}
          onSubmitEditing={this.handleSubmit}
          value={this.state.mealDesc}
        />
      )
    }
    return (
      <TouchableOpacity
        onPress={this.handleCapturePress}
      >
        <Text>
          Capture
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCameraOrImage()}
        <View style={styles.inputContainer}>
          {this.renderCaptureButtonOrForm()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  camera: {
    width: 375,
    height: 375,
  },
  image: {
    width: 375,
    height: 375,
  },
  input: {
    height: 40,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
})

module.exports = connect(
  (state) => ({}),
  { addMeal }
)(PhotoCapturePage)
