import { combineReducers } from 'redux'
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
import * as base from '@/pages'

let userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
// userMsg = userMsg ? userMsg : {}
// let roleMsg = JSON.parse(sessionStorage.getItem('roleMsg'))
// roleMsg = roleMsg ? roleMsg.rows[0] : {}
const initState = [
  {
    id: 1,
    name: 'APPLE',
    price: 888,
    count: 10
  },
  {
    id: 2,
    name: 'ORANGE',
    price: 666,
    count: 12
  }
]
const initStateList = {
  list: []
}
const initUser = {
  ...userMsg,
  // menus: userMsg.menus ? userMsg.menus.map(item => {
  //   if(item.component) item.component = base[item.component]
  //   return item
  // }) : [],
  menus: userMsg ? userMsg.menus.map(item => {
    if(item.component) item.componentItem = base[item.component]
    return item
  }) : [],
  isLogin: userMsg ? userMsg.flag : false,
  isLoading: false,
}

// const initRole = {
//   ...roleMsg,
//   menus: roleMsg.menus ? roleMsg.menus.map(item => {
//     if(item.component) item.component = base[item.component]
//     return item
//   }) : [],
//   isLoading: false
// }

const initRole = {
  id: '',
  name: '',
  desc: '',
  menus: [],
  isLoading: false
}

const cart = (state = initState, action) => {
  switch(action.type) {
    case INCREMENT:
      return state.map(item => {
        if(item.id === action.payload.id) item.count ++
        return item
      })
    case DECREMENT:
    return state.map(item => {
      if(item.id === action.payload.id) item.count --
      return item
    })
    default:
      return state
  }
}
const list = (state = initStateList, action) => {
  switch(action.type) {
    case DATA_GET_SUCCESS:
      return {
        ...action.payload
      }
    default:
      return state
  }
}
const gameInfo = (state = {}, action) => {
  switch(action.type) {
    case GAME_INFO_SUCCESS:
      return {
        ...action.payload
      }
    default:
      return state
  }
}
const user = (state = initUser,action) => {
  switch(action.type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...action.payload,
        menus: action.payload.menus.map(item => {
          if(item.component) item.componentItem = base[item.component]
          return item
        }),
        isLogin: true,
        isLoading: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLogin: false,
        isLoading: false
      }
    case LOGIN_OUT:
      return {
        ...state,
        isLogin: false,
        isLoading: false
      }
    default:
      return state
  }
}

const role = (state = initRole,action) => {
  switch(action.type) {
    case START_GET_ROLE:
      return {
        ...state,
        isLoading: true
      }
    case GET_ROLE_SUCCESS:
      return {
        ...action.payload.rows[0],
        isLoading: false,
        menus: action.payload.rows[0].menus.map(item => {
          item.component = base[item.component]
          return item
        })
      }
    case GET_ROLE_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default combineReducers({
  cart,
  list,
  gameInfo,
  user,
  role
})