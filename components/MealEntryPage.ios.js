const React = require('react-native')
const {
  Component,
  PixelRatio,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Navigator,
} = React

const { SceneConfigs } = Navigator

const NavigationBar = require('react-native-navbar')
const NutrientListItem = require('./NutrientListItem')
const SearchPage = require('./SearchPage')

const { connect } = require('react-redux/native')
const { addMealWithPhoto } = require('../actions/meals')

class MealEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: null,
      nutrients: [],
    }

    this.handlePressSave = this.handlePressSave.bind(this)
    this.handlePressEnterNutrients = this.handlePressEnterNutrients.bind(this)
    this.handlePressResult = this.handlePressResult.bind(this)
  }

  handlePressSave() {
    const { description, nutrients } = this.state
    const { image, addMealWithPhoto, navigator } = this.props
    addMealWithPhoto(description, nutrients, image)
    navigator.pop()
  }

  handlePressEnterNutrients() {
    this.props.navigator.push({
      component: SearchPage,
      sceneConfig: SceneConfigs.FloatFromBottom,
      props: {
        onPressResult: this.handlePressResult,
      },
    })
  }

  handlePressResult(result) {
    this.setState({
      nutrients: [...this.state.nutrients, result],
    })
  }

  render() {
    const { image, navigator, foodReports } = this.props
    const { nutrients } = this.state
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
        <View style={styles.nutrientEntry}>
          <TouchableOpacity
            onPress={this.handlePressEnterNutrients}
          >
            <View style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              borderBottomColor: 'grey',
              borderBottomWidth: 1 / PixelRatio.get(),
              height: 24,
            }}>
              <Text style={{fontWeight: '500'}}>Enter Nutrients</Text>
              <Text style={{fontWeight: '500'}}>+</Text>
            </View>
          </TouchableOpacity>
          {nutrients.map((ndbno, idx) => {
            if (foodReports && foodReports[ndbno]) {
              return <NutrientListItem key={idx} item={foodReports[ndbno]} />
            }
          }
          )}
        </View>
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
  nutrientEntry: {
    margin: 4,
    padding: 6,
  },
})

module.exports = connect(
  (state) => ({ foodReports: state.usda.foodReports }),
  { addMealWithPhoto }
)(MealEntryForm)
