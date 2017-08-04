import { combineReducers } from "redux"
import { edit, entities, items, loading } from "./interests.reducers"

export const trailInterestsReducer = combineReducers({ loading, items, entities, edit })
