'use client'
import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../slices/authSlice' // importing all reducer which is made into slices;
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
/*
here there are multiple reducer like authReducer , profileReducer , cartReducer etc  So we combine all reducer here
in "rootReducer"  and  this "rootReducer" is added into "store" in index.js now we can access all reducer using "store"
*/

const rootReducer = combineReducers({
  // combining all reducer;
  auth: authReducer,
})
// export const store = createStore(rootReducer, applyMiddleware(thunk))

export default rootReducer
