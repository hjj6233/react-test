import ajaxMethod from '@/utility/http'

const qs = require('qs')
const promiseItem = (options) => (
  new Promise((resolve, reject) => {
    options.data =  options.data ? options.data : {}
    if(options.formSubmit) {
      options.data =  qs.stringify(options.data)
    }
    ajaxMethod(options)
    .then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
)

export const getLogin = (option) => (
  promiseItem({
    data: option,
    url: 'checkPassword'
  })
)

export const getRole = (option) => (
  promiseItem({
    data: option,
    url: 'getRole'
  })
)

export const getRolePages = (option) => (
  promiseItem({
    data: option,
    url: 'getRolePages'
  })
)

export const addRole = (option) => (
  promiseItem({
    data: option,
    method: 'post',
    formSubmit: true,
    url: 'addRole'
  })
)

export const updateRole = (option) => (
  promiseItem({
    data: option,
    method: 'post',
    formSubmit: true,
    url: 'updateGameInfo'
  })
)

export const deleteRole = (option) => (
  promiseItem({
    data: option,
    url: 'deleteRole'
  })
)

export const getDepartment = (option) => (
  promiseItem({
    data: option,
    url: 'getDepartment'
  })
)

export const getGameInfo = (option) => (
  promiseItem({
    data: option,
    url: 'getGameInfo'
  })
)

export const updateGameInfo = (option) => (
  promiseItem({
    data: option,
    method: 'post',
    formSubmit: true,
    url: 'updateGameInfo'
  })
)

export const getGameRecord = (option) => (
  promiseItem({
    data: option,
    url: 'getGameRecord'
  })
)

export const getGameRecordPages = (option) => (
  promiseItem({
    data: option,
    url: 'getGameRecordPages'
  })
)

export const addGameRecord = (option) => (
  promiseItem({
    data: option,
    method: 'post',
    formSubmit: true,
    url: 'addGameRecord'
  })
)

export const deleteGameRecord = (option) => (
  promiseItem({
    data: option,
    url: 'deleteGameRecord'
  })
)