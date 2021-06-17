import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './likes-counter'

export default configureStore({
  reducer: {
      counter: counterReducer,
  },
})