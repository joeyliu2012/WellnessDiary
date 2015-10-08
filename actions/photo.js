const { ADD_PHOTO } = require('../constants/action-types')
const { LOCAL, REMOTE } = require('../constants/locations')

function addPhoto(path, mealId) {
  return {
    type: ADD_PHOTO,
    payload: {
      id: uuid(),
      meal: mealId,
      user: null,
      location: LOCAL,
      [LOCAL]: {
        uri: path,
      },
      [REMOTE]: {
        uri: null,
      },
    },
  }
}

function


module.exports = {
  addPhoto
}
