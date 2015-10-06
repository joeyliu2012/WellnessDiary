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

  renderMealImage(src) {
    return <Image style={styles.mealImage} source={{uri: src}} />
  }

  renderMealRow(meal) {
    return (
      <View style={styles.mealRow}>
        <TouchableHighlight onPress={this.handleMealPress(meal.id)}>
          <Text style={styles.mealDescription}>{meal.description}</Text>
        </TouchableHighlight>
        {meal.image && meal.image.src && this.renderMealImage(meal.image.src)}
      </View>
    )
  }

  render() {
    const { meals } = this.props
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(id) => this.renderMealRow(meals[id])}
      />
    )
  }
}

const styles= StyleSheet.create({
  mealRow: {
    height: 150,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  mealDescription: {
    fontSize: 18,
  },
  mealImage: {
    height: 100,
    width: 100,
  },
})

module.exports = connect(
  (state) => state.meals,
  { deleteMeal }
)(MealsList)
