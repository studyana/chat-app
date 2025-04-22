import { createSlice } from '@reduxjs/toolkit';
import { service } from '../../utils/request.js';
import { setToken as _setToken,getToken, removeToken } from '../../utils/index.js';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value:  getToken() || '',
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
      _setToken(action.payload);
    },
    clearToken: (state) => {
      state.value = '';
      removeToken();
      
    },
  },
});
const { setToken, clearToken } = tokenSlice.actions;
// 定义一个异步函数，用于发送登录请求并设置 token
const fetchLogin = (loginForm) => {
  return async (dispatch) =>{
    // const res = await service.post('/login', loginForm);
    dispatch(setToken("111")); // 假设登录成功后返回 token 字段
    
  } 
}
export { setToken, clearToken, fetchLogin };
export default tokenSlice.reducer;