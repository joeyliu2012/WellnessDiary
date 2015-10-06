const { ADD_MEAL, DELETE_MEAL, EDIT_MEAL } = require('../constants/action-types')

module.exports = function meals(state = {
  meals: {},
}, action) {
  switch (action.type) {
  case ADD_MEAL:
  case EDIT_MEAL:
    const { meal } = action.payload
    return {
      meals: {
        ...state.meals,
        [meal.id]: meal,
      }
    }
  case DELETE_MEAL:
    // TODO: Implement delete
    return state
  default:
    return state
  }
}
