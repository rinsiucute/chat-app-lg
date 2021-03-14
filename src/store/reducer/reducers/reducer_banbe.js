import * as types from '../../types';

const initalState = {
    ban_be : [],
    loi_moi_ket_ban : [] ,
    dangchat : 'no_data',
    open_chat : false,
    noi_dung_dang_chat : []
}
export const reducer_banbe =(state = initalState , action ) => {
    switch (action.type) {

        case types.SET_BAN_BE: 
            return({ 
                        ...state , 
                        ban_be : [ ]
                    }) 
                    
                    
        case types.SET_LOI_MOI_KET_BAN: return({ ...state , loi_moi_ket_ban : [] }) ;
        case types.UPDATE_BAN_BE: return({ 
                        ...state , 
                        ban_be : [ ...state.ban_be , action.payload ]
                        // ban_be : [ action.payload ,...state.ban_be  ]
                     }) ;
        case types.UPDATE_LOI_MOI_KET_BAN: return({
                         ...state , 
                         loi_moi_ket_ban :  [  ...state.loi_moi_ket_ban , action.payload ] }) ;
                
        case types.SET_DANG_CHAT: return({ ...state , dangchat : action.payload }) ;
        case types.SET_OPEN_CHAT: return({ ...state , open_chat : action.payload }) ;
        case types.SET_NDD_CHAT: return({ 
                        ...state , 
                        noi_dung_dang_chat : [ ...state.noi_dung_dang_chat , action.payload ] }) ;
                    
                
            
        // case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
