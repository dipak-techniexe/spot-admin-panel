import { combineReducers } from "redux"
import { edit, entities, items, loading } from "./categories.reducers"

export const trailCategoriesReducer = combineReducers({ loading, items, entities, edit })
