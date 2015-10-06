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
    return {
      meals: Object.keys(state.meals).filter((key) => key !== action.id)
                                     .reduce((acc, key) => acc[key] = state.meals[key], {})
  }
  default:
    return state
  }
}
