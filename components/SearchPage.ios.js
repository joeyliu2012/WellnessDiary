const React = require('react-native')
const {
  Component,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
  Text,
  StyleSheet,
} = React

const SearchBar = require('react-native-search-bar')
const NutrientListItem = require('./NutrientListItem')

const { connect } = require('react-redux/native')
const { queryUSDADatabase, fetchFoodReport, clearSearch } = require('../actions/usda')

class SearchPage extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(props.results),
    }
    this.handleSearchButtonPress = this.handleSearchButtonPress.bind(this)
    this.handleCancelButtonPress = this.handleCancelButtonPress.bind(this)
    this.renderResultRow = this.renderResultRow.bind(this)
  }

  handleSearchButtonPress(query) {
    if (query) this.props.queryUSDADatabase(query)
  }

  handleCancelButtonPress() {
    this.props.clearSearch()
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.results),
    })
  }

  renderResultRow(result) {
    const { clearSearch, onPressResult, fetchFoodReport, navigator } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          clearSearch()
          fetchFoodReport(result.ndbno)
          onPressResult(result.ndbno)
          navigator.pop()
        }}
      >
        <NutrientListItem
          item={result}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search USDA nutrition database..."
          onSearchButtonPress={this.handleSearchButtonPress}
          onCancelButtonPress={this.handleCancelButtonPress}
          showsCancelButton={false}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderResultRow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
})

module.exports = connect(
  (state) => state.usda,
  { queryUSDADatabase, clearSearch, fetchFoodReport }
)(SearchPage)
