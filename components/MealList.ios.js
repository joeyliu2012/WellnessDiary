const React = require('react-native')
const {
  Component,
  PixelRatio,
  ListView,
  View,
  StyleSheet,
} = React

const NavigationBar = require('react-native-navbar')
const MealListItem = require('./MealListItem')

const PhotoCapturePage = require('./PhotoCapturePage')

const { connect } = require('react-redux/native')
const { deleteMeal } = require('../actions/meals')

class MealList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(props.meals))
    }

    this.handleNext = this.handleNext.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        Object.keys(props.meals)
      )
    })
  }

  handleNext() {
    this.props.navigator.push({
      component: PhotoCapturePage,
    })
  }

  render() {
    const { meals, photos, navigator } = this.props
    return (
      <View style={styles.container}>
        <NavigationBar
          navigator={navigator}
          title="Your Meals"
          backgroundStyle={{backgroundColor: 'white'}}
          style={styles.navbar}
          hidePrev={true}
          nextTitle="Add Meal"
          onNext={this.handleNext}
        />
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(id) => <MealListItem meal={meals[id]} photo={photos[meals[id].photo]} />}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  listView: {
    top: -20,
  },
})

module.exports = connect(
  (state) => ({
    meals: state.meals.meals,
    photos: state.photos.photos,
  }),
)(MealList)
