function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      completed: false,
      text,
    }
  }
}

module.exports = {
  addTodo,
}
