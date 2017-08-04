import * as React from "react"
import { ICategory } from "../trail-categories"
import styled from "styled-components"

const Img = styled.img`
  width:50px;
  float:left;
`
const H4 = styled.h4`
  font-size:20px;
  font-weight:400;
  padding:5px 0;
`
const Row = styled.div`
  padding:2px 0;
`

export const Category: React.StatelessComponent<ICategoryProps> = ({ data, onDeleteClick, onEditClick }) => (
  <Row className="row">
    <div className="col-3"><H4>{data.name}</H4></div>
    <div className="col-3">
      <Img src={data.image} alt={data.name+" main Image"} title={data.name+" main Image"} />
    </div>
    <div className="col-3">
      <Img src={data.thumbnail} alt={data.name+" thumbnail Image"} title={data.name+" thumbnail Image"} />
    </div>
    <div className="col-3">
      <button onClick={() => onEditClick(data.id)}>Edit</button>
      <button onClick={() => onDeleteClick(data.id)}>Delete</button>
    </div>
  </Row>
)

interface ICategoryProps {
  data: ICategory
  onDeleteClick: (id: number) => void
  onEditClick: (id: number) => void
}
