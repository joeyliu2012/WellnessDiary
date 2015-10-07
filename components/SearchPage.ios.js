const React = require('react-native')
const {
  Component,
  View,
  TextInput,
  ListView,
  Text,
} = React

const { debounce } = require('lodash')

const { connect } = require('react-redux/native')
const { queryUSDADatabase } = require('../actions/search')

class SearchPage extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows(props.results),
    }
    this.initiateSearch = debounce(this.initiateSearch.bind(this), 250)
  }

  initiateSearch(query) {
    this.props.queryUSDADatabase(query)
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.results),
    })
  }

  render() {
    return (
      <View style={{padding: 40}}>
        <TextInput
          style={{height: 40}}
          placeholder="Search USDA nutrition database..."
          onChangeText={this.initiateSearch}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(result) => <Text>{result.name}</Text>}
        />
      </View>
    )
  }
}

module.exports = connect(
  (state) => state.search,
  { queryUSDADatabase }
)(SearchPage)
