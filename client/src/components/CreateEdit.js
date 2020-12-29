import React, {useReducer, useCallback, useEffect, useState } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {selectUsers, addUsers, updateUsers} from '../features/users/usersSlice';
import InputText from './UI/InputText';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
   
const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputVal,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputVal: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    } 
    return state;
}


const CreateEdit = (props) => {

    let match = useRouteMatch("/create");
    let { id } = useParams();
    let history = useHistory();
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const userRedux = useSelector(selectUsers);
    const {updateItem, errors, completed} = userRedux;

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputVal : {
            IMGURL: updateItem ? updateItem.IMGURL : '', 
            USERNAME: updateItem ? updateItem.USERNAME : '', 
            EMAIL: updateItem ? updateItem.EMAIL: '', 
            FIRSTNAME:updateItem ? updateItem.FIRSTNAME: '', 
            LASTNAME:updateItem ? updateItem.LASTNAME: '', 
            BIRTHDATE: updateItem ? new Date(updateItem.BIRTHDATE).toISOString().split('T')[0]: '', 
            DESCRIPTION:updateItem ? updateItem.DESCRIPTION: ''
        },
        inputValidities: {
            USERNAME: false, 
            EMAIL: false, 
            FIRSTNAME:false, 
            LASTNAME:false, 
            BIRTHDATE: false, 
        },
        formIsValid: false
    })

    const onChangeInputHandler = useCallback((inputIdentifier, inputValue, inputValidty) => {
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidty,
            input: inputIdentifier
        }) 
    },[dispatchFormState])

    useEffect(()=> {
        if(match) {
            for(let keys in updateItem){
                onChangeInputHandler(keys, '', false)
            }
        }
    },[match])


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {
            IMGURL: formState.inputVal.IMGURL,
            USERNAME: formState.inputVal.USERNAME,
            EMAIL:formState.inputVal.EMAIL,
            FIRSTNAME: formState.inputVal.FIRSTNAME,
            LASTNAME: formState.inputVal.LASTNAME,
            BIRTHDATE: new Date(formState.inputVal.BIRTHDATE).toISOString().split('T')[0],
            DESCRIPTION: formState.inputVal.DESCRIPTION
        }
        if(match) {
            dispatch(addUsers(payload))
            if(completed){
                history.push("/users");
            }      
        }else {
            dispatch(updateUsers(id, payload));
            if(completed){
                history.push("/users");
            }     
        }
    }

    //const handleChange = (event) => {
    //    let file;
    //    file = event.target.files[0];
    //    setPicture(file);
    //    const reader = new FileReader();
    //    reader.onload = () => {
    //    setImage(reader.result)
    //    }
    //    reader.readAsDataURL(file);
    //};

    useEffect(() =>{
        if(errors){
           setError(errors.message) 
        }
    },[errors])

    return (
        <div className="container mt-5">
            <div className="row mb-5">
                <h3 className="text-center mx-auto" style={{color:"chocolate"}}>
                    {id ? "Kullanıcı Güncelleme": "Kullanıcı Oluştur"}
                </h3> 
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="row no-gutters" 
                style={{ justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
                    <InputText
                        label="Image Url"
                        id="IMGURL"
                        type="url"
                        value={formState.inputVal.IMGURL}
                        onChangeInput={onChangeInputHandler}
                    />
                    {formState.inputVal.IMGURL &&
                    <div style={{width:"120px", height:"120px", borderRadius:"4rem", margin:".2rem", overflow:"hidden"}}>
                        <img src={formState.inputVal.IMGURL} alt="Fotoğraf Yükleme" style={{width:"100%", height:"100%"}} />
                    </div>
                    }
                    <InputText
                        label="UserName"
                        id="USERNAME"
                        type="text"
                        required
                        value={formState.inputVal.USERNAME}
                        onChangeInput={onChangeInputHandler}
                    />
                    <InputText
                        label="Email"
                        id="EMAIL"
                        required
                        value={formState.inputVal.EMAIL}
                        type="email"
                        onChangeInput={onChangeInputHandler}
                        error={error}
                    />
                    <InputText
                        label="First Name"
                        id="FIRSTNAME"
                        required
                        value={formState.inputVal.FIRSTNAME}
                        type="text"
                        onChangeInput={onChangeInputHandler}
                    />
                    <InputText
                        label="Last Name"
                        id="LASTNAME"
                        required
                        value={formState.inputVal.LASTNAME}
                        type="text"
                        onChangeInput={onChangeInputHandler}
                    />
                    <InputText
                        label="Birth Date"
                        id="BIRTHDATE"
                        required
                        value={formState.inputVal.BIRTHDATE}
                        type="Date"
                        onChangeInput={onChangeInputHandler}
                    />
                    <InputText
                        label="Description"
                        id="DESCRIPTION"
                        value={formState.inputVal.DESCRIPTION}
                        type="text"
                        onChangeInput={onChangeInputHandler}
                    />
                    <div className="col-lg-6 d-flex mt-3" style={{justifyContent:"flex-end"}}>
                        <button 
                            className="card_button" 
                            type="submit"
                            disabled={id ? false : !formState.formIsValid}
                            > {id ? "Güncelle" :"Kaydet"}</button>
                    </div>
                </div>   
            </form>
        </div>
    )
}


export default CreateEdit;