import { createAction } from "redux-actions"
import { IAddInterest, IInterest, IPayloadWithStatus } from "./trail-interests"

export const TrailInterestActions = {
  fetch: "FetchInterests",
  fetchDetails: "FetchInterestDetails",
  selectToEdit: "SelectInterestToEdit",
  cancelEdit: "CancelEditInterest",
  update: "UpdateTrailInterest",
  add: "AddTrailInterest",
  del: "DeleteTrailInterest",
}

export const fetchTrailInterests = createAction<IInterest[] | undefined>(TrailInterestActions.fetch)
export const addTrailInterest = createAction<IPayloadWithStatus<IAddInterest> | Error>(TrailInterestActions.add)
export const deleteTrailInterest = createAction<IPayloadWithStatus<number> | Error>(TrailInterestActions.del)
export const selectToEditTrailInterest = createAction<number>(TrailInterestActions.selectToEdit)
export const cancelEdit = createAction(TrailInterestActions.cancelEdit)
export const updateTrailInterest = createAction<IPayloadWithStatus<IInterest> | Error>(TrailInterestActions.update)
