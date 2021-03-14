import * as types from '../types';

export  const set_loading = (data)=> async dispatch => {
    dispatch({
        type : types.LOADING,
        payload : data
    })
} 