const React = require('react-native')
const {
  Component,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
} = React

const { connect } = require('react-redux/native')
const { deleteMeal } = require('../actions/meals')

const { BlurView } = require('react-native-blur')

class MealsList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged(r1, r2) {
        return r1 !== r2
      }
    })
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(props.meals))
    }

    this.renderMealRow = this.renderMealRow.bind(this)
    this.handleMealPress = this.handleMealPress.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState((prevState) => {
      return {
        dataSource: prevState.dataSource.cloneWithRows(
          Object.keys(props.meals)
        )
      }
    })
  }

  handleMealPress(id) {
    return () => {
      this.props.deleteMeal(id)
    }
  }

  renderMealRow(meal) {
    return (
      <Image
        source={{uri: meal.image.src}}
        style={styles.mealRow}
        resizeMode="cover"
      >
        <View style={styles.blurView}>
          <Text style={[styles.mealDescription, styles.mealText]}>{meal.description}</Text>
          <View style={styles.mealDetailsView}>
            <View style={styles.mealDetailRow}>
              <Text style={[styles.mealDetailTitle, styles.mealText]}>Calories: </Text>
              <Text style={styles.mealText}>500</Text>
            </View>
            <View style={styles.mealDetailRow}>
              <Text style={[styles.mealDetailTitle, styles.mealText]}>Total Fat: </Text>
              <Text style={styles.mealText}>9g</Text>
            </View>
            <View style={styles.mealDetailRow}>
              <Text style={[styles.mealDetailTitle, styles.mealText]}>Total Carbohydrate: </Text>
              <Text style={styles.mealText}>26g</Text>
            </View>
          </View>
        </View>
      </Image>
    )
  }

  render() {
    const { meals } = this.props
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(id) => this.renderMealRow(meals[id])}
      />
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  blurView: {
    flex: 1,
    padding: 10,
  },
  mealRow: {
    height: 150,
  },
  mealText: {
    color: 'white',
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {
      x: 1,
      y: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  mealDescription: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
  },
  mealDetailsView: {
    height: 100,
    marginTop: 10,
    // alignSelf: 'flex-end',
  },
  mealDetailTitle: {
    fontWeight: '500',
    marginRight: 4,
    color: 'black',
  },
  mealDetailRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
})

module.exports = connect(
  (state) => state.meals,
  { deleteMeal }
)(MealsList)
