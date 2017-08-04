import { Action } from "redux-actions"
import { TrailCategoryActions } from "../actions"
import { ICategory } from "../trail-categories"

export const loading = (state: boolean = false,
                        action: Action<any | undefined>): boolean => {

  switch (action.type) {
    case TrailCategoryActions.fetch:
      return action.payload === undefined
    case TrailCategoryActions.add:
    case TrailCategoryActions.update:
    case TrailCategoryActions.del:
      if (action.error !== undefined && action.error === true) {
        return false
      }

      return action.payload !== undefined && action.payload.status !== "done"
    default:
      return state
  }
}

export interface ICategoryEntities {
  [id: string]: ICategory
}

export interface IEntities {
  categories: ICategoryEntities
}

export const entities = (state: IEntities = { categories: {} },
                         action: Action<any | undefined>): IEntities => {
  switch (action.type) {

    case TrailCategoryActions.fetch:

      if (action.payload !== undefined && !action.error) {

        const newEntities = action.payload.reduce((acc: ICategoryEntities, cat: ICategory) => {
          acc[cat.id] = cat
          return acc
        }, {})

        return { categories: newEntities }
      }

      return state
    case TrailCategoryActions.add:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as ICategory
        return { categories: { ...state.categories, ...{ [data.id]: data } } }
      }

      return state
    case TrailCategoryActions.del:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const id = action.payload.data as number
        const categories: ICategoryEntities =
          Object.keys(state.categories).reduce((acc: ICategoryEntities, key: string) => {
            if (id.toString() === key) {
              return acc
            }

            acc[key] = state.categories[key]
            return acc
          }, {})
        return { categories }
      }

      return state

    case TrailCategoryActions.update:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as ICategory

        return { categories: { ...state.categories, ...{ [data.id]: data } } }
      }

      return state
    default:
      return state
  }
}

export const items = (state: number[] = [], action: Action<any>): number[] => {
  switch (action.type) {
    case TrailCategoryActions.fetch:
      if (action.payload !== undefined && !action.error) {
        return action.payload.map((c: ICategory) => c.id)
      }

      return state

    case TrailCategoryActions.add:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as ICategory
        return [...state, data.id]
      }

      return state

    case TrailCategoryActions.del:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const id = action.payload.data as number
        const index = state.indexOf(id)
        return [...state.slice(0, index), ...state.slice(index + 1)]
      }

      return state
    default:
      return state
  }
}

export const edit = (state: number | null = null, action: Action<any>): number | null => {
  switch (action.type) {
    case TrailCategoryActions.selectToEdit:
      return action.payload
    case TrailCategoryActions.cancelEdit:
      return null
    case TrailCategoryActions.update:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        return null
      }
      return state
    default:
      return state
  }
}
