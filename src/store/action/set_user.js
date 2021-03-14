import * as types from '../types';

export  const set_data_user = (data)=> async dispatch => {
    dispatch({
        type : types.DATA_USER,
        payload : data
    })
} 

export  const set_update_data_user = (data)=> async dispatch => {
    dispatch({
        type : types.UPDATE_USER,
        payload : data
    })
} 

export  const log_out = ()=> async dispatch => {
    dispatch({
        type : types.LOGOUT_USER
     
    })
} 