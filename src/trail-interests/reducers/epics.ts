import { Action } from "redux-actions"
import { ActionsObservable, combineEpics } from "redux-observable"
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/observable/of"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import { Observable } from "rxjs/Observable"
import {
  addTrailInterest,
  deleteTrailInterest,
  fetchTrailInterests,
  TrailInterestActions,
  updateTrailInterest,
} from "../actions"
import { IAddInterest, IInterest, IPayloadWithStatus } from "../trail-interests"

const fetchEpic = (action$: ActionsObservable<Action<undefined>>) =>
  action$
    .filter((action) => action.type === TrailInterestActions.fetch && action.payload === undefined)
    .flatMap(() => Observable.ajax("http://192.168.1.32:8110/v1/interests"))
    .map((data) => fetchTrailInterests(data.response.data.interests))

const addEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<IAddInterest>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailInterestActions.add
        && action.payload !== undefined
        && action.payload.status === "start"
    })
    .mergeMap((action) => {
      if (action.payload === undefined) {
        const error = new Error("Did not find id in the response")
        return Observable.of(addTrailInterest(error))
      }

      return Observable
        .ajax.post("http://192.168.1.32:8110/v1/interests", action.payload.data,
          { "Content-Type": "application/json" })
        .map((response) => {
          const location = response.xhr.getResponseHeader("Location")
          if (location !== null && action.payload !== undefined) {
            const id = parseInt(location.split("/").pop() || "", 10)
            const { type, image, thumbnail } = action.payload.data
            const data: IAddInterest = {
              id,
              type,
              image,
              thumbnail,
            }
            return addTrailInterest({ status: "done", data })
          }

          const error = new Error("Did not find id in the response")
          return addTrailInterest(error)
        })
        .catch((error) => {
          return Observable.of(addTrailInterest(error))
        })
    })

const deleteEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<number>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailInterestActions.del &&
        action.payload !== undefined &&
        action.payload.status === "start"
    })
    .mergeMap((action) => {
      const id = action.payload ? action.payload.data : -1
      return Observable.ajax.delete(`http://192.168.1.32:8110/v1/interests/${id}`)
        .mapTo(deleteTrailInterest({ status: "done", data: id }))
        .catch((error) => Observable.of(deleteTrailInterest(error)))
    })

const updateEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<IInterest>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailInterestActions.update &&
        action.payload !== undefined &&
        action.payload.status === "start"
    })
    .mergeMap((action) => {
      if (action.payload === undefined) {
        return Observable.of(addTrailInterest(new Error("Unknown Payload")))
      }
      const id = action.payload ? action.payload.data.id : -1
      return Observable.ajax.put(`http://192.168.1.32:8110/v1/interests/${id}`,
        action.payload.data, { "Content-Type": "application/json" })
        .mapTo(updateTrailInterest({ status: "done", data: action.payload.data }))
        .catch((error) => Observable.of(updateTrailInterest(error)))
    })

export const trailInterestRootEpic = combineEpics<any>(fetchEpic, addEpic, deleteEpic, updateEpic)
