    
    import * as types from '../types';
    
    
    
    
    
export  const set_room_chat = (data)=> async dispatch => {
    dispatch({
        type : types.SET_ROOM_CHAT,
        payload : data
    })
} 

export  const set_noi_dung_chat = (data)=> async dispatch => {
    dispatch({
        type : types.SET_NOI_DUNG_CHAT,
        payload : data
    })
} 
export  const update_noi_dung_chat = (data)=> async dispatch => {
    dispatch({
        type : types.UPDATE_NOI_DUNG_CHAT,
        payload : data
    })
} 