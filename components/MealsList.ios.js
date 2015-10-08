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
        <Text style={styles.mealDescription}>{meal.description}</Text>
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
  mealRow: {
    height: 150,
    padding: 10,
  },
  mealDescription: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
})

module.exports = connect(
  (state) => state.meals,
  { deleteMeal }
)(MealsList)
