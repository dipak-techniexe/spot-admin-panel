import { Action } from "redux-actions"
import { TrailInterestActions } from "../actions"
import { IInterest } from "../trail-interests"

export const loading = (state: boolean = false,
                        action: Action<any | undefined>): boolean => {

  switch (action.type) {
    case TrailInterestActions.fetch:
      return action.payload === undefined
    case TrailInterestActions.add:
    case TrailInterestActions.update:
    case TrailInterestActions.del:
      if (action.error !== undefined && action.error === true) {
        return false
      }

      return action.payload !== undefined && action.payload.status !== "done"
    default:
      return state
  }
}

export interface IInterestEntities {
  [id: string]: IInterest
}

export interface IEntities {
  interests: IInterestEntities
}

export const entities = (state: IEntities = { interests: {} },
                         action: Action<any | undefined>): IEntities => {
  switch (action.type) {

    case TrailInterestActions.fetch:

      if (action.payload !== undefined && !action.error) {

        const newEntities = action.payload.reduce((acc: IInterestEntities, cat: IInterest) => {
          acc[cat.id] = cat
          return acc
        }, {})

        return { interests: newEntities }
      }

      return state
    case TrailInterestActions.add:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as IInterest
        return { interests: { ...state.interests, ...{ [data.id]: data } } }
      }

      return state
    case TrailInterestActions.del:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const id = action.payload.data as number
        const interests: IInterestEntities =
          Object.keys(state.interests).reduce((acc: IInterestEntities, key: string) => {
            if (id.toString() === key) {
              return acc
            }

            acc[key] = state.interests[key]
            return acc
          }, {})
        return { interests }
      }

      return state

    case TrailInterestActions.update:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as IInterest

        return { interests: { ...state.interests, ...{ [data.id]: data } } }
      }

      return state
    default:
      return state
  }
}

export const items = (state: number[] = [], action: Action<any>): number[] => {
  switch (action.type) {
    case TrailInterestActions.fetch:
      if (action.payload !== undefined && !action.error) {
        return action.payload.map((c: IInterest) => c.id)
      }

      return state

    case TrailInterestActions.add:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        const data = action.payload.data as IInterest
        return [...state, data.id]
      }

      return state

    case TrailInterestActions.del:
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
    case TrailInterestActions.selectToEdit:
      return action.payload
    case TrailInterestActions.cancelEdit:
      return null
    case TrailInterestActions.update:
      if (action.error === undefined && action.payload !== undefined && action.payload.status === "done") {
        return null
      }
      return state
    default:
      return state
  }
}
