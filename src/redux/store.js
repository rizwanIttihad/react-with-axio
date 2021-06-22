import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './likes-counter'
import likeUnlikeReducer from './like-unlike'

export default configureStore({
  reducer: {
      counter: counterReducer,
      likeUnlike: likeUnlikeReducer,
  },
})