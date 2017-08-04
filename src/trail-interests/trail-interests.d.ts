import { IEntities } from "./reducers/interests.reducers"

interface IInterestBase {
  type: string
  image: string
  thumbnail: string
}

export interface IInterest extends IInterestBase {
  id: number
}

export interface IAddInterest extends IInterestBase {
  id?: number
}

export interface IPayloadWithStatus<T> {
  status: "start" | "done"
  data: T
}

export interface ITrailInterestsAppState {
  loading: boolean
  entities: IEntities
  items: number[]
  /** ID of the category to edit */
  edit: number
}
