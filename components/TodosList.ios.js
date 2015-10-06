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

class TodosList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged(r1, r2) {
        return r1 !== r2
      }
    })
    this.state = {
      dataSource: ds.cloneWithRows(props.todos)
    }
  }

  componentWillReceiveProps(props) {
    this.setState((prevState) => {
      return {
        dataSource: prevState.dataSource.cloneWithRows(props.todos)
      }
    })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(row) => <Text>{row.text}</Text>}
      />
    )
  }
}

module.exports = connect(
  (state) => ({todos: state.todos}),
)(TodosList)
