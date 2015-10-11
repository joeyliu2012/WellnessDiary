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

const NavigationBar = require('react-native-navbar')
const Camera = require('react-native-camera')
const MealEntryPage = require('./MealEntryPage')

class PhotoCapturePage extends Component {
  constructor(props) {
    super(props)
    this.handleCapturePress = this.handleCapturePress.bind(this)
  }

  handleCapturePress() {
    const { camera } = this.refs
    camera.capture((err, data) => {
      if (err) {
        console.error(err)
      } else {
        this.props.navigator.replace({
          component: MealEntryPage,
          props: {
            image: data,
          },
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref="camera"
          style={styles.camera}
          type={Camera.constants.Type.back}
          captureTarget={Camera.constants.CaptureTarget.disk}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={this.handleCapturePress}
          >
            <Text style={{fontSize: 20}}>
              Capture
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  camera: {
    width: 375,
    height: 375,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
})

module.exports = PhotoCapturePage
