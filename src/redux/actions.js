import { 
  INCREMENT,
  DECREMENT,
  DATA_GET_SUCCESS,
  GAME_INFO_SUCCESS,
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_OUT,
  START_GET_ROLE,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED
} from '@/redux/actionType'
import {
  getDepartment,
  getGameInfo,
  updateGameInfo,
  addGameRecord,
  getLogin,
  getRole
} from '@/api/pool'


//home's actions
export const IN = (id) => ({type: INCREMENT, payload: {id} })
export const DE = (id) => ({type: DECREMENT, payload: {id} })
export const DEAsync = id => dispatch => {
  setTimeout(() => {
    dispatch(DE(id))
  }, 1000)
}
//list's actions
export const lists = (list,type) => ({type, payload: {list} })
export const getList = () => dispatch => {
  getDepartment({}).then(res => {
    dispatch(lists(res, DATA_GET_SUCCESS))
  })
}
//game's actions
export const datas = (type,data) => ({type, payload: data })
export const getGameInfoList = (type,data) => dispatch => {
  if(type) {
    dispatch(datas(GAME_INFO_SUCCESS, data))
  } else {
    getGameInfo({}).then(res => {
      dispatch(datas(GAME_INFO_SUCCESS, res))
      // console.log()
    })
  }
}
export const updateGameInfoList = () => dispatch => {
  updateGameInfo({}).then(res => {
    dispatch(datas(GAME_INFO_SUCCESS, res))
  })
}
export const addGameRecordList = () => dispatch => {
  addGameRecord({}).then(res => {
    dispatch(datas(GAME_INFO_SUCCESS, res))
  })
}
//user's actions
export const getUser = (params) => dispatch => {
  if(params) {
    dispatch(datas(START_LOGIN))
    getLogin(params).then(res => {
      if(res.flag) {
        getRole({name: res.role}).then(res1 => {
          let resp = {
            ...res,
            menus: res1.rows[0].menus
          }
          dispatch(datas(LOGIN_SUCCESS, resp))
          sessionStorage.setItem('userMsg',JSON.stringify(resp))
          // userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
        })
      } else {
        dispatch(datas(LOGIN_FAILED, {...res, menus: []}))
        sessionStorage.removeItem('userMsg')
      }
    })
  } else {
    dispatch(datas(LOGIN_OUT))
    sessionStorage.removeItem('userMsg')
    // sessionStorage.removeItem('roleMsg')
  }
}
export const getRoleList = (params) => dispatch => {
  dispatch(datas(START_GET_ROLE))
  getRole(params).then(res => {
    dispatch(datas(GET_ROLE_SUCCESS, res))
    sessionStorage.setItem('roleMsg',JSON.stringify(res))
  }).catch(err => {
    dispatch(datas(GET_ROLE_FAILED, err))
    sessionStorage.removeItem('roleMsg')
  })
}