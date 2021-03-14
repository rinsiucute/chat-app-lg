import * as types from '../types';

export  const set_conten_main = (data)=> async dispatch => {
    dispatch({
        type : types.CONTENTMAIN,
        payload : data
    })
} 