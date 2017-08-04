import { createAction } from "redux-actions"
import { IAddCategory, ICategory, IPayloadWithStatus } from "./trail-categories"

export const TrailCategoryActions = {
  fetch: "FetchCategories",
  fetchDetails: "FetchCategoryDetails",
  selectToEdit: "SelectCategoryToEdit",
  cancelEdit: "CancelEditCategory",
  update: "UpdateTrailCategory",
  add: "AddTrailCategory",
  del: "DeleteTrailCategory",
}

export const fetchTrailCategories = createAction<ICategory[] | undefined>(TrailCategoryActions.fetch)
export const addTrailCategory = createAction<IPayloadWithStatus<IAddCategory> | Error>(TrailCategoryActions.add)
export const deleteTrailCategory = createAction<IPayloadWithStatus<number> | Error>(TrailCategoryActions.del)
export const selectToEditTrailCategory = createAction<number>(TrailCategoryActions.selectToEdit)
export const cancelEdit = createAction(TrailCategoryActions.cancelEdit)
export const updateTrailCategory = createAction<IPayloadWithStatus<ICategory> | Error>(TrailCategoryActions.update)
