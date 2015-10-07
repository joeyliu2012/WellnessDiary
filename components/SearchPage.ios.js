const React = require('react-native')
const {
  Component,
  View,
  TextInput,
  ListView,
  Text,
  StyleSheet,
} = React

const SearchBar = require('react-native-search-bar')

const { connect } = require('react-redux/native')
const { queryUSDADatabase, clearSearch } = require('../actions/search')

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
    return (
      <View style={styles.resultRow}>
        <Text style={styles.resultName}>{result.name}</Text>
        <Text style={styles.resultGroup}>{result.group}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{paddingTop: 20, flex: 1}}>
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
  resultRow: {
    height: 70,
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  resultName: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultGroup: {
    fontSize: 12,
  },
})

module.exports = connect(
  (state) => state.search,
  { queryUSDADatabase, clearSearch }
)(SearchPage)
