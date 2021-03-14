import * as types from '../types';

export  const set_socket = (data)=> async dispatch => {
    dispatch({
        type : types.SOCKET,
        payload : data
    })
} 