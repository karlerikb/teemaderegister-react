import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

import {
  CURRICULUMS_URL,
  CURRICULUM_SLUG_URL
} from '../constants/ApiConstants'

import { loadedTableContentCount } from './TableContentActions'

export const initCurriculum = () => dispatch => {
  dispatch({ type: types.CURRICULUM_INIT })
}

export const getCurriculums = () => dispatch => {
  return Api('GET', CURRICULUMS_URL)
    .then(data => dispatch({
      type: types.CURRICULUMS_LOADED,
      curriculums: data.curriculums
    }))
    .catch(err => {
      console.log(err)
    })
}

export const getCurriculum = slug => dispatch => {
  return Api('GET', CURRICULUM_SLUG_URL.replace(':slug', slug))
    .then(data => {
      const { meta, supervisors, topics } = data
      dispatch(loadedTableContentCount({ topics, supervisors }))
      dispatch({ type: types.CURRICULUM_LOADED, meta })
    })
    .catch(err => {
      console.log(err)
    })
}
