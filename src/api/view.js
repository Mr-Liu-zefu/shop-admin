import  request  from '../utils/request.js'

const Api = {
  Login: '/v1/auth/login',
  Forget_code: '/v1/user/ver',
  Userlist: '/v1/user/users',
  userdei:'/v1/user/updatestatus',
  poster: '/v1/user/ad',
  poster_edi:'/v1/ad/updatead',
  poster_add:'/v1/ad/ad',
  goods:'/v1/product/product',
  goodsadd:'/v1/product/addproduct',
  goodsdel:'/v1/product/deleteproduct',
  order:'/v1/product/order',
  user_car:'v1/product/attention',
  view_view:'/v1/view/view',
  view_suc:'/v1/vol/vol',
  view_money:'/v1/over/over'
}


//登录
export function login(query) {
  return request({
    url: Api.Login,
    method: 'post',
    data: query
  })
}


//忘记密码
export function Forget_code(parameter) {
  return request({
    url: Api.Forget_code,
    method: 'get',
    params: parameter
  })
}

//首页数据分析——浏览量
export function view() {
  return request({
    url: Api.view_view,
    method: 'get',
  })
}

//首页数据分析——收藏量
export function vol() {
  return request({
    url: Api.view_suc,
    method: 'get',
  })
}

//首页数据分析——成交量
export function over() {
  return request({
    url: Api.view_money,
    method: 'get',
  })
}

//用户列表的获取
export function userlistfetch(parameter) {
  return request({
    url: Api.Userlist,
    method: 'get',
    params: parameter,
    // headers:window.localStorage.getItem('token')
  })
}

//用户列表的查找功能
export const userlistseach = query => {
  return request({
    url: Api.Userlist,
    method: 'get',
    params: query,
    // headers:Head
  })
}

//用户列表注销用户功能
export function userlistdel(query){
  return request({
    url:Api.Userlist,
    method:'post',
    data:query
  })
}

//修改用户状态功能
export function user_Edi(query){
  return request({
    url:Api.userdei,
    method:'post',
    data:query
  })
}

//广告中心
export const posterfetch = query => {
  return request({
    url: Api.poster,
    method: 'get',
    params: query,
    // headers:Head
  })
}

//广告中心添加功能
export function posterAdd(query){
  return request({
    url:Api.poster_add,
    method:'post',
    data:query
  })
}

//广告中心删除数据
export const delposindex = query => {
  return request({
    url:Api.poster,
    method:'delete',
    params: query,
    //headers:Head
  })
}

//广告中心查找
export const seachpos = query => {
  return request({
    url:Api.poster,
    method:'get',
    params: query,
    //headers:Head,
  })
}

//广告中心编辑功能
export const ediPosterData = query => {
  return request({
    url:Api.poster_edi,
    method:'post',
    data:query,
  })
}

//商品列表获取数据功能
export const get_goods = query => {
  return request({
    url:Api.goods,
    method:'get',
    params:query
  })
}

//商品列表修改功能
export const goodslist = query => {
  return request({
    url:Api.goods,
    method:'post',
    data:query
  })
}

//商品列表搜索功能
export const goodseach = query => {
  return request({
    url:Api.goods,
    method:'get',
    params:query
  })
}

//商品列表添加功能
export const goods_add = query => {
  return request({
    url:Api.goodsadd,
    method:'post',
    data:query
  })
}

//商品列表删除功能
export const goods_del = query => {
  return request({
    url:Api.goodsdel,
    method:'post',
    data:query
  })
}

//订单状态修改
export function order_staute_edi(query){
  return request({
    url: Api.order,
    method: 'post',
    data: query,
  })
}

//订单管理——资源共享
export function share_fetchData(query){
  return request({
    url: Api.order,
    method: 'get',
    params: query,
    // headers:window.localStorage.getItem('token')
  })
}

//订单管理——二手交易
export function old_fetchData(query){
  return request({
    url: Api.order,
    method: 'get',
    params: query,
    // headers:window.localStorage.getItem('token')
  })
}

//订单管理——外卖跑题
export function takeaways_fetchData(query){
  return request({
    url: Api.order,
    method: 'get',
    params: query,
    // headers:window.localStorage.getItem('token')
  })
}

//用户关注列表
export function userCar(query){
  return request({
    url: Api.user_car,
    method: 'get',
    params: query,
  })
}