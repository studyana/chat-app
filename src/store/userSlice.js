import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    avatar: 'assets/images/default.jpeg',
    name: '张三',
    signature: 'talk is cheap,show me code',
  },
  reducers: {
    updateUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;