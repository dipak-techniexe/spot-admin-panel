import * as React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { trailCategoryRootEpic } from "./reducers/epics"
import { trailCategoriesReducer } from "./reducers/index"
import { TrailCategoriesApp } from "./trail-categories.app"

const store = createStore(
  trailCategoriesReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(createEpicMiddleware(trailCategoryRootEpic)),
)

export const TrailCategoriesSection: React.StatelessComponent<any> = () =>
  <Provider store={store}>
    <TrailCategoriesApp />
  </Provider>
