import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers, selectUsers, deleteUsers, setUpdateItem} from '../features/users/usersSlice';
import Card from './UI/Card';

const Users = () =>  {

    const dispatch = useDispatch();
    const dataRedux = useSelector(selectUsers);

    const dataLoad = useCallback(
        () => dispatch(getUsers()),
        [dispatch],
    )

    useEffect(()=>{
        dataLoad()
    },[dataLoad])

    const deleteHandler = (id) => {
        dispatch(deleteUsers(id))
    }

    const updateHandler = (id) =>{
        dispatch(setUpdateItem(id))
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-5" style={{color:"blue"}}> Kullanıcılar Listesi </h3>
            {dataRedux.users.length > 0 ? 
            dataRedux.users.map(item => {
                return <Card 
                        key={item._id}
                        id={item._id}
                        userName= {item.USERNAME}
                        email= {item.EMAIL}
                        name = {item.FIRSTNAME}
                        surName = {item.LASTNAME}
                        imageUrl = {item.IMGURL}
                        birthDate= {item.BIRTHDATE}
                        description = {item.DESCRIPTION}
                        deleteFonk = {deleteHandler}
                        updateFonk = {updateHandler}     
                />
            }): 
            null}
        </div>
    )
}

export default Users;

