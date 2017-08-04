import * as React from "react"
import { connect } from "react-redux"
import { fetchTrailCategories } from "./actions"
import { AddCategory } from "./containers/add-category.container"
import { CategoryList } from "./containers/category-list.container"

export const TrailCategoriesApp = connect()(({dispatch}) => {
  dispatch(fetchTrailCategories(undefined))
  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-12"><h1 className="t-center title">Trail Categories</h1></div>
      </div>
      <AddCategory />
      <CategoryList />
    </div>
  )
})
