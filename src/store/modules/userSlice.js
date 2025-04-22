import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo : {
      avatar: 'assets/images/default.jpeg',
      name: '张三',
      signature: 'talk is cheap,show me code',
    },
  },
  reducers: {
    updateUserInfo: (state, action) => {
      // 直接更新 userInfo 字段
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    clearUserInfo: (state) => {
      state.userInfo = {}; // 重置为初始状态
    },
  },
});
const {updateUserInfo} = userSlice.actions;
const {clearUserInfo} = userSlice.actions;
const fetchUserInfo = () => {
  return async (dispatch) =>{
    // const res = await service.get('/user/profile');
    dispatch(updateUserInfo()); 
  } 
}
export  { updateUserInfo,fetchUserInfo, clearUserInfo };
export default userSlice.reducer;