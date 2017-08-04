import { IEntities } from "./reducers/categories.reducers"

interface ICategoryBase {
  name: string
  image: string
  thumbnail: string
}

export interface ICategory extends ICategoryBase {
  id: number
}

export interface IAddCategory extends ICategoryBase {
  id?: number
}

export interface IPayloadWithStatus<T> {
  status: "start" | "done"
  data: T
}

export interface ITrailCategoriesAppState {
  loading: boolean
  entities: IEntities
  items: number[]
  /** ID of the category to edit */
  edit: number
}
