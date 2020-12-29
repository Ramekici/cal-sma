import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_SERVER_URL }  from '../Config'


export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users:[],
    completed:false,
    errors: null,
    updateItem: null,
    message:''
  },
  reducers: {
    setInitial:(state) => {
      state.completed =false;
      state.errors = null;
      state.updateItem = null;
    },
    setMessage:(state, action) => {
      state.message = action.payload
    },
    setUpdateItem:(state, action) => {
      state.updateItem = state.users.find(item => item._id === action.payload)
    },
    setUserRedux: (state, action) => {
      state.users = action.payload;
    },
    setCompleted:(state) => {
      state.completed =true;
      state.updateItem = null;
    },
    setDataFailed:(state, action) => {
      state.completed =false;
      state.errors = action.payload;
    },
  },
});

export const { setInitial, setUserRedux, setCompleted, setDataFailed, setUpdateItem, setMessage} = usersSlice.actions;

export const getUsers = () =>  dispatch => {
    fetch(`${BACK_SERVER_URL}/api/users`)
    .then(resp => resp.json())
    .then(data => dispatch(setUserRedux(data)))
};

export const addUsers = (data) => async dispatch => {
  //const {IMGURL, USERNAME, EMAIL, FIRSTNAME, LASTNAME, BIRTHDATE, DESCRIPTION} = data;
  try{
        //console.log(data)
        //const userData = new FormData();
        //userData.append('image', IMGURL, USERNAME);
        //userData.append('USERNAME', USERNAME);
        //userData.append('EMAIL', EMAIL);
        //userData.append('FIRSTNAME', FIRSTNAME);
        //userData.append('LASTNAME', LASTNAME);
        //userData.append('BIRTHDATE', BIRTHDATE);
        //userData.append('DESCRIPTION', DESCRIPTION);
        await axios.post(`${BACK_SERVER_URL}/api/users/add`, data)
        dispatch(setCompleted())
        dispatch(getUsers())
        //dispatch(setMessage(resp.data.message))
    }catch(err){
        dispatch(setDataFailed(err))
    }
};

export const deleteUsers = (id) => async dispatch => {
   await axios.delete(`${BACK_SERVER_URL}/api/users/delete/${id}`);
   dispatch(getUsers())
};

export const updateUsers = (id, data) => async dispatch => {
  //const {IMGURL, USERNAME, EMAIL, FIRSTNAME, LASTNAME, BIRTHDATE, DESCRIPTION} = data;
  try{
    //let updateUserData;
    //if(typeof(IMGURL) === 'object'){
    //  updateUserData = new FormData();
    //  typeof(IMGURL) === 'string' ? updateUserData.append('IMGURL', IMGURL,USERNAME):updateUserData.append('image', IMGURL,USERNAME);
    //  updateUserData.append('USERNAME', USERNAME);
    //  updateUserData.append('EMAIL', EMAIL);
    //  updateUserData.append('FIRSTNAME', FIRSTNAME);
    //  updateUserData.append('LASTNAME', LASTNAME);
    //  updateUserData.append('BIRTHDATE', BIRTHDATE);
    //  updateUserData.append('DESCRIPTION', DESCRIPTION);
    //}else {
    //  updateUserData= data;
    //}
    await axios.put(`${BACK_SERVER_URL}/api/users/edit/${id}`, data)
    dispatch(setCompleted())
    dispatch(getUsers())
  }catch(err){
    dispatch(setDataFailed(err))
  }
};

export const selectUsers = state => state.users;

export default usersSlice.reducer;
