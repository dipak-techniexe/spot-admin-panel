import * as React from "react"
import { connect } from "react-redux"
import { fetchTrailInterests } from "./actions"
import { AddInterest } from "./containers/add-interest.container"
import { InterestList } from "./containers/interest-list.container"

export const TrailInterestsApp = connect()(({dispatch}) => {
  dispatch(fetchTrailInterests(undefined))
  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-12"><h1 className="t-center title">Trail Interests</h1></div>
      </div>
      <AddInterest />
      <InterestList />
    </div>
  )
})
