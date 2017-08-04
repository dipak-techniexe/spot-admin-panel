import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { addTrailCategory, cancelEdit, updateTrailCategory } from "../actions"
import { IAddCategory, ICategory, ITrailCategoriesAppState } from "../trail-categories"
import styled from "styled-components"

const AddCategoriesForm = styled.form`
  padding:0 0 10px;
`
interface IAddCategoryStateProps {
  categoryToEdit?: ICategory
}

class CategoryForm
  extends React.Component<IAddCategoryStateProps & { dispatch: Dispatch<ITrailCategoriesAppState> }, IAddCategory> {

  private nameElem: HTMLInputElement

  constructor(props: any) {
    super(props)
    this.state = { name: "", image: "", thumbnail: "" }
  }

  public componentWillReceiveProps(props: any) {
    if (props.categoryToEdit) {
      this.setState(props.categoryToEdit)
    } else {
      this.setState({ id: undefined, name: "", image: "", thumbnail: "" })
    }

    this.nameElem.focus()
  }
  nameLength = (event: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({ name: event.target.value.slice(0,10) })
  }

  public render() {
    return (
      <AddCategoriesForm onSubmit={(e) => {
        e.preventDefault()
        if (this.props.categoryToEdit) {
          const data: ICategory = {
            id: this.props.categoryToEdit.id,
            name: this.state.name,
            image: this.state.image,
            thumbnail: this.state.thumbnail,
          }
          this.props.dispatch(updateTrailCategory({ status: "start", data }))
        } else {
          this.props.dispatch(addTrailCategory({ status: "start", data: this.state }))
          this.setState({ id: undefined, name: "", image: "", thumbnail: "" })
          this.nameElem.focus()
        }
      }} className="row AddCategoriesForm">
        <div className="col-3">
          <label htmlFor="catName">Name:</label>
          <input type="text" name="catName" ref={(node) => this.nameElem = node} value={this.state.name}
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
            {this.props.categoryToEdit ? "Update Category" : "Add Category"}
          </button>
        {this.props.categoryToEdit ? <button onClick={(e) => {
          e.preventDefault()
          this.props.dispatch(cancelEdit())
        }}>Cancel</button> : null }
        </div>
      </AddCategoriesForm>
    )
  }
}

export const AddCategory = connect<ITrailCategoriesAppState, any, IAddCategoryStateProps>(
  (state) => {
    return {
      categoryToEdit: state.edit ? state.entities.categories[state.edit] : undefined,
    }
  },
)(CategoryForm)
