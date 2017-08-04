import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { addTrailInterest, cancelEdit, updateTrailInterest } from "../actions"
import { IAddInterest, IInterest, ITrailInterestsAppState } from "../trail-interests"
import styled from "styled-components"

const AddInterestsForm = styled.form`
  padding:0 0 10px;
`
interface IAddInterestStateProps {
  interestToEdit?: IInterest
}

class InterestForm
  extends React.Component<IAddInterestStateProps & { dispatch: Dispatch<ITrailInterestsAppState> }, IAddInterest> {

  private nameElem: HTMLInputElement

  constructor(props: any) {
    super(props)
    this.state = { type: "", image: "", thumbnail: "" }
  }

  public componentWillReceiveProps(props: any) {
    if (props.interestToEdit) {
      this.setState(props.interestToEdit)
    } else {
      this.setState({ id: undefined, type: "", image: "", thumbnail: "" })
    }

    this.nameElem.focus()
  }
  nameLength = (event: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({ type: event.target.value })
  }

  public render() {
    return (
      <AddInterestsForm onSubmit={(e) => {
        e.preventDefault()
        if (this.props.interestToEdit) {
          const data: IInterest = {
            id: this.props.interestToEdit.id,
            type: this.state.type,
            image: this.state.image,
            thumbnail: this.state.thumbnail,
          }
          this.props.dispatch(updateTrailInterest({ status: "start", data }))
        } else {
          this.props.dispatch(addTrailInterest({ status: "start", data: this.state }))
          this.setState({ id: undefined, type: "", image: "", thumbnail: "" })
          this.nameElem.focus()
        }
      }} className="row AddInterestsForm">
        <div className="col-3">
          <label htmlFor="catName">Name:</label>
          <input type="text" name="catName" ref={(node) => this.nameElem = node} value={this.state.type}
               onChange={this.nameLength} autoFocus/>
        </div>
        <div className="col-3">
          <label htmlFor="catImg">Image Url(Path):</label>
          <input type="text" name="catImg" value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })}/>
        </div>
        <div className="col-3">          
          <label htmlFor="catTImg">Thumbnail Url(Path):</label>
          <input type="text" name="catTImg" value={this.state.thumbnail} onChange={(e) => this.setState({ thumbnail: e.target.value })}/>
        </div>
        <div className="col-3">
          <label>&nbsp;</label>
          <button type="submit">
            {this.props.interestToEdit ? "Update Interest" : "Add Interest"}
          </button>
        {this.props.interestToEdit ? <button onClick={(e) => {
          e.preventDefault()
          this.props.dispatch(cancelEdit())
        }}>Cancel</button> : null }
        </div>
      </AddInterestsForm>
    )
  }
}

export const AddInterest = connect<ITrailInterestsAppState, any, IAddInterestStateProps>(
  (state) => {
    return {
      interestToEdit: state.edit ? state.entities.interests[state.edit] : undefined,
    }
  },
)(InterestForm)
