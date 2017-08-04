import * as React from "react"
import { IInterestListDispatchProps, IInterestListStateProps } from "../containers/interest-list.container"
import { Interest } from "./interest.component"
import { Spinner } from "./spinner.component"

export const Interests: React.StatelessComponent<IInterestListStateProps & IInterestListDispatchProps>
  = ({ interests, items, loading, onDeleteClick, onEditClick }) => (
  <div>
    {loading ? <Spinner /> : ""}
    {items.map((i) => <Interest key={i} data={interests[i]} onDeleteClick={onDeleteClick} onEditClick={onEditClick}/>)}
  </div>
)
