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

  renderMealRow(meal) {
    return (
      <View style={styles.mealRow}>
        <Text style={styles.mealDescription}>{meal.description}</Text>
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
  }
})

module.exports = connect(
  (state) => state.meals
)(MealsList)
