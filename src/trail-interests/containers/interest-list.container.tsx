import { connect } from "react-redux"
import { deleteTrailInterest, selectToEditTrailInterest } from "../actions"
import { Interests } from "../components/interests.component"
import { IInterestEntities } from "../reducers/interests.reducers"
import { ITrailInterestsAppState } from "../trail-interests"

export interface IInterestListStateProps {
  interests: IInterestEntities
  items: number[]
  loading: boolean
}

export interface IInterestListDispatchProps {
  onDeleteClick: (id: number) => void
  onEditClick: (interestID: number) => void
}

export const InterestList = connect<ITrailInterestsAppState, any, IInterestListStateProps, IInterestListDispatchProps>(
  (state) => {
    return {
      interests: state.entities.interests,
      items: state.items,
      loading: state.loading,
    }
  },
  (dispatch) => ({
    onDeleteClick: (id) => {
      dispatch(deleteTrailInterest({ status: "start", data: id }))
    },
    onEditClick: (id) => {
      dispatch(selectToEditTrailInterest(id))
    },
  }),
)(Interests)
