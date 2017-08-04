import * as React from "react"
import { ICategoryListDispatchProps, ICategoryListStateProps } from "../containers/category-list.container"
import { Category } from "./category.component"
import { Spinner } from "./spinner.component"

export const Categories: React.StatelessComponent<ICategoryListStateProps & ICategoryListDispatchProps>
  = ({ categories, items, loading, onDeleteClick, onEditClick }) => (
  <div>
    {loading ? <Spinner /> : ""}
    {items.map((i) => <Category key={i} data={categories[i]} onDeleteClick={onDeleteClick} onEditClick={onEditClick}/>)}
  </div>
)
