import * as types from '../types';

export  const set_ban_be = (data)=> async dispatch => {
    dispatch({
        type : types.SET_BAN_BE,
        payload : data
    })
} 
export  const set_loi_moi_ket_ban = (data)=> async dispatch => {
    dispatch({
        type : types.SET_LOI_MOI_KET_BAN,
        payload : data
    })
} 
export  const update_ban_be = (data)=> async dispatch => {
    dispatch({
        type : types.UPDATE_BAN_BE,
        payload : data
    })
} 
export  const update_loi_moi_ket_ban = (data)=> async dispatch => {
    dispatch({
        type : types.UPDATE_LOI_MOI_KET_BAN,
        payload : data
    })
} 
export  const set_dang_chat = (data)=> async dispatch => {
    dispatch({
        type : types.SET_DANG_CHAT,
        payload : data
    })
} 

export  const set_open_chat = (data)=> async dispatch => {
    dispatch({
        type : types.SET_OPEN_CHAT,
        payload : data
    })
} 

export  const set_ndd_chat = (data)=> async dispatch => {
    dispatch({
        type : types.SET_NDD_CHAT,
        payload : data
    })
} 

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