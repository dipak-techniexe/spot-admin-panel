import * as React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { trailInterestRootEpic } from "./reducers/epics"
import { trailInterestsReducer } from "./reducers/index"
import { TrailInterestsApp } from "./trail-interests.app"

const store = createStore(
  trailInterestsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(createEpicMiddleware(trailInterestRootEpic)),
)

export const TrailInterestsSection: React.StatelessComponent<any> = () =>
  <Provider store={store}>
    <TrailInterestsApp />
  </Provider>
