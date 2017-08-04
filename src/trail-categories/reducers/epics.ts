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
  addTrailCategory,
  deleteTrailCategory,
  fetchTrailCategories,
  TrailCategoryActions,
  updateTrailCategory,
} from "../actions"
import { IAddCategory, ICategory, IPayloadWithStatus } from "../trail-categories"

const fetchEpic = (action$: ActionsObservable<Action<undefined>>) =>
  action$
    .filter((action) => action.type === TrailCategoryActions.fetch && action.payload === undefined)
    .flatMap(() => Observable.ajax("http://192.168.1.32:8110/v1/trails/categories"))
    .map((data) => fetchTrailCategories(data.response.data.categories))

const addEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<IAddCategory>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailCategoryActions.add
        && action.payload !== undefined
        && action.payload.status === "start"
    })
    .mergeMap((action) => {
      if (action.payload === undefined) {
        const error = new Error("Did not find id in the response")
        return Observable.of(addTrailCategory(error))
      }

      return Observable
        .ajax.post("http://192.168.1.32:8110/v1/trails/categories", action.payload.data,
          { "Content-Type": "application/json" })
        .map((response) => {
          const location = response.xhr.getResponseHeader("Location")
          if (location !== null && action.payload !== undefined) {
            const id = parseInt(location.split("/").pop() || "", 10)
            const { name, image, thumbnail } = action.payload.data
            const data: IAddCategory = {
              id,
              name,
              image,
              thumbnail,
            }
            return addTrailCategory({ status: "done", data })
          }

          const error = new Error("Did not find id in the response")
          return addTrailCategory(error)
        })
        .catch((error) => {
          return Observable.of(addTrailCategory(error))
        })
    })

const deleteEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<number>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailCategoryActions.del &&
        action.payload !== undefined &&
        action.payload.status === "start"
    })
    .mergeMap((action) => {
      const id = action.payload ? action.payload.data : -1
      return Observable.ajax.delete(`http://192.168.1.32:8110/v1/trails/categories/${id}`)
        .mapTo(deleteTrailCategory({ status: "done", data: id }))
        .catch((error) => Observable.of(deleteTrailCategory(error)))
    })

const updateEpic = (action$: ActionsObservable<Action<IPayloadWithStatus<ICategory>>>) =>
  action$
    .filter((action) => {
      return action.type === TrailCategoryActions.update &&
        action.payload !== undefined &&
        action.payload.status === "start"
    })
    .mergeMap((action) => {
      if (action.payload === undefined) {
        return Observable.of(addTrailCategory(new Error("Unknown Payload")))
      }
      const id = action.payload ? action.payload.data.id : -1
      return Observable.ajax.put(`http://192.168.1.32:8110/v1/trails/categories/${id}`,
        action.payload.data, { "Content-Type": "application/json" })
        .mapTo(updateTrailCategory({ status: "done", data: action.payload.data }))
        .catch((error) => Observable.of(updateTrailCategory(error)))
    })

export const trailCategoryRootEpic = combineEpics<any>(fetchEpic, addEpic, deleteEpic, updateEpic)
