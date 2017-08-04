import { connect } from "react-redux"
import { deleteTrailCategory, selectToEditTrailCategory } from "../actions"
import { Categories } from "../components/categories.component"
import { ICategoryEntities } from "../reducers/categories.reducers"
import { ITrailCategoriesAppState } from "../trail-categories"

export interface ICategoryListStateProps {
  categories: ICategoryEntities
  items: number[]
  loading: boolean
}

export interface ICategoryListDispatchProps {
  onDeleteClick: (id: number) => void
  onEditClick: (categoryID: number) => void
}

export const CategoryList = connect<ITrailCategoriesAppState, any, ICategoryListStateProps, ICategoryListDispatchProps>(
  (state) => {
    return {
      categories: state.entities.categories,
      items: state.items,
      loading: state.loading,
    }
  },
  (dispatch) => ({
    onDeleteClick: (id) => {
      dispatch(deleteTrailCategory({ status: "start", data: id }))
    },
    onEditClick: (id) => {
      dispatch(selectToEditTrailCategory(id))
    },
  }),
)(Categories)
