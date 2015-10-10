const { ADD_PHOTO, PHOTO_DELETED } = require('../constants/action-types')

module.exports = function photos(state = {
  photos: {},
}, action) {
  switch (action.type) {
  case ADD_PHOTO:
    const { photo } = action.payload
    return {
      photos: {
        ...state.photos,
        [photo.id]: photo,
      },
    }
  default:
    return state
  }
}
