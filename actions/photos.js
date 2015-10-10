const { ADD_PHOTO } = require('../constants/action-types')
const { LOCAL, REMOTE } = require('../constants/locations')

function addPhoto(path, photoId, mealId) {
  return {
    type: ADD_PHOTO,
    payload: {
      photo: {
        id: photoId,
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
    },
  }
}

function photoDeleted(photoId) {
  return {
    type: PHOTO_DELETED,
    payload: photoId,
  }
}

function deletePhoto(photoId) {
  return (dispatch, getState) => {
    // TODO: _actually_ delete the photo
    const photo = getState().photos.photos[photoId]
    dispatch(photoDeleted(photoId))
  }
}


module.exports = {
  addPhoto
}
