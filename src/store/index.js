import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //用于储存全局数据，方便共享
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    count: 0
  },
  //用于变更全局数据
  //只有 mutations 才有权利修改 state 中的数据
  mutations: {
    setToken (state,step) {
			state.token =step;
      window.localStorage.setItem('token',step)
    },
    delToken (state) {
			state.token = '';
			window.localStorage.removeItem('token');
    },
    add(state){
      state.count++
    },
    addN(state,step){
      state.count += step
    },
    suB(state){
      state.count --
    },
    subN(state,step){
      state.count -= step 
    }
  },
  //用于异步操作变更数据
  actions: {
    //context相当于 Vuex.Store这个示例对象
    addasync(context){
      //在actions中不能直接修改 state 中的数据；
      //必须通过 context.commit 触发某个 mutations 才行
      setTimeout( () => {
        context.commit('add')
      },1000 )
    },
    addnasync(context,step){
      setTimeout(()=>{
        context.commit('addN',step)
      },1000 )
    },
    suBasync(context){
      setTimeout(()=>{
        context.commit('suB')
      },1000)
    },
    suBnasync(context,step){
      setTimeout(()=>{
        context.commit('subN',step)
      },1000)
    }
  },
  modules: {
  }
})
