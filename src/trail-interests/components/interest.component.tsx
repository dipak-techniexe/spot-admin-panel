import * as React from "react"
import { IInterest } from "../trail-interests"
import styled from "styled-components"

const PlaceHolder = 'https://cdn3.iconfinder.com/data/icons/digital-marketing-2-8/744/travel_map_worldwide_placeholder_planet_earth_world_grid_placeholders-256.png'

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

export const Interest: React.StatelessComponent<IInterestProps> = ({ data, onDeleteClick, onEditClick }) => (
  <Row className="row">
    <div className="col-3"><H4>{data.type}</H4></div>
    <div className="col-3">
      {
        data.image ? <Img src={data.image} alt={data.type+" main Image"} title={data.type+" main Image"} /> : <Img src={PlaceHolder} alt={data.type+" main Image"} title={data.type+" main Image"} />
      }
      
    </div>
    <div className="col-3">
      {
        data.image ? <Img src={data.thumbnail} alt={data.type+" main Image"} title={data.type+" main Image"} /> : <Img src={PlaceHolder} alt={data.type+" main Image"} title={data.type+" main Image"} />
      }
    </div>
    <div className="col-3">
      <button onClick={() => onEditClick(data.id)}>Edit</button>
      <button onClick={() => onDeleteClick(data.id)}>Delete</button>
    </div>
  </Row>
)

interface IInterestProps {
  data: IInterest
  onDeleteClick: (id: number) => void
  onEditClick: (id: number) => void
}
