const uuid = require('an-uuid')
const { ADD_MEAL, EDIT_MEAL, DELETE_MEAL } = require('../constants/action-types')

function addMeal(description, imagePath) {
  return {
    type: ADD_MEAL,
    payload: {
      meal: {
        description,
        id: uuid(),
        image: {
          src: imagePath,
        },
      },
    },
  }
}

function editMeal(id, description) {
  return {
    type: EDIT_MEAL,
    payload: {
      meal: {
        id,
        description,
      },
    },
  }
}

function deleteMeal(id) {
  return {
    type: DELETE_MEAL,
    payload: id,
  }
}

module.exports = {
  addMeal,
  editMeal,
  deleteMeal,
}
