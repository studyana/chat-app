import { createSlice } from '@reduxjs/toolkit';
//具体值调axios获取
const contact = [];
const group = [];
const tag = [];
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact : contact,
    group : group,
    tag : tag,
  },
  reducers: {
    setContact: (state, action) => {
      state.contact =  action.payload;
    },
    updateGroup: (state, action) => {
      state.group = action.payload;
    },
    updateTag: (state, action) => {
      state.tag = action.payload;
    }
  },
});

const fetchContact = () => {
  return async (dispatch) =>{
    // const res = await service.get('/user/contact');
    const res = [
        { contactId: "1", name: 'Alice', avatar: 'assets/images/av1.jpg', nickName:'阿利' },
        { contactId: "2", name: 'Bob', avatar: 'https://example.com/avatar2.jpg', nickName:'博'  },
        { contactId: "3", name: 'Charlie', avatar: 'https://example.com/avatar3.jpg', nickName:'查利'   },
        { contactId: "4", name: 'Charlie', avatar: 'https://example.com/avatar3.jpg', nickName:'查利'   },
        { contactId: "3", name: 'Charlie', avatar: 'https://example.com/avatar3.jpg', nickName:'查利'   },
        { contactId: "3", name: 'Charlie', avatar: 'https://example.com/avatar3.jpg', nickName:'查利'   },
        // 可以继续添加更多联系人
      ];
    dispatch(setContact(res)); 
  } 
}
const { setContact, updateGroup,updateTag } = contactSlice.actions;
const fetchGroup = () => {
    return async (dispatch) =>{
      // const res = await service.get('/user/contact');
      const res = [
        { 
          name: '工作群', 
          avatar:"",
          groupId: 1,
          members: [
             { contactId:"1", name: 'Alice', avatar: 'assets/images/av1.jpg' }  ,
             { contactId:"2", name: 'Alice', avatar: 'assets/images/av1.jpg' } 
          ]
        },
        // 可以继续添加更多群聊
      ];
      dispatch(updateGroup(res)); 
    } 
  }
const fetchTag = () => {
    return async (dispatch) =>{
      // const res = await service.get('/user/contact');
      const res = [
        { tagId: 1, name: '同事', contacts: [ { contactId:"1", name: 'Alice', avatar: 'assets/images/av1.jpg' } ] },
        { tagId: 2, name: '朋友', contacts: [ { contactId:"2", name: 'Bob', avatar: 'https://example.com/avatar2.jpg' } ] },
      ];
      dispatch(updateTag(res));
    }
}
export  { fetchContact, fetchGroup,fetchTag,updateTag, setContact, updateGroup};
export default contactSlice.reducer;