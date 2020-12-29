import React, {useState, useReducer, useEffect} from 'react';


const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_FOCUS = 'INPUT_FOCUS';

const inputReducer = (state, action) => {
    switch(action.type){
        case INPUT_CHANGE:
            return{
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_FOCUS:
                return{
                    ...state,
                    touched: true
                }
        default:
            return state;
        }
};

const InputText = (props) => {

    const [error, setError]= useState('');

    const [inputState, dispatchInputState] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid ? props.initialValid : false,
        touched: false,
    })

    const {onChangeInput, id} = props;

    useEffect(() => {
        if(inputState.touched){
            onChangeInput(id, inputState.value, inputState.isValid)
        }
    }, [onChangeInput, inputState, id])

    const onChangeHandler = (event) => {
        const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let isValid = true;
        if(props.required && event.target.value.trim().length === 0) {
            isValid = false;
            setError("Alan Boş Bırakılmamalıdır.");
        }
        if(props.email && !emailRegex.test(event.target.value.toLowerCase())) {
            isValid = false;
            setError("Email doğru giriniz.");
        }
        if(props.min !== null && +event.target.value < props.min) {
            isValid = false;
        }
        if(props.max !== null && +event.target.value > props.max) {
            isValid = false;
        }
        if(props.minLength !== null && event.target.value.length < props.minLength) {
            isValid = false;
            setError(`Minimum ${props.minLength} karakter girilmelidir.`);
        }

        dispatchInputState({
            type: INPUT_CHANGE,
            value: event.target.value,
            isValid: isValid
        })
    }

    const lostFocusHandler = () => {
        dispatchInputState({
            type: INPUT_FOCUS
        })
    }


    return (
        <div className="form-group col-lg-6 mt-1">
            <label htmlFor={props.id} style={{color:"#e63946"}}> {props.label} </label>
            <input 
                {...props}
                className="form-control"
                placeholder={props.label} 
                type={props.type} 
                id={props.id}
                value={props.value} 
                onChange={onChangeHandler}
                onFocus={lostFocusHandler}
                 />
            {!inputState.isValid && inputState.touched && 
            <div className="invalid-feedback" style={{display:"block"}}> {error} </div>}
            {props.error &&
            <div className="invalid-feedback" style={{display:"block"}}> {props.error} </div>}
        </div>
    )
}

export default InputText;