const uuid = require('an-uuid')
const { addPhoto } = require('./photos')
const { ADD_MEAL, EDIT_MEAL, DELETE_MEAL } = require('../constants/action-types')

function addMeal(description, foodReports, mealId = uuid(), photoId) {
  return {
    type: ADD_MEAL,
    payload: {
      meal: {
        description,
        foodReports,
        id: mealId,
        photo: photoId,
      },
    },
  }
}

function addMealWithPhoto(description, foodReports, imagePath) {
  return (dispatch) => {
    const photoId = uuid()
    const mealId = uuid()
    dispatch(addPhoto(imagePath, photoId, mealId))
    dispatch(addMeal(description, foodReports, mealId, photoId))
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
  addMealWithPhoto,
}
