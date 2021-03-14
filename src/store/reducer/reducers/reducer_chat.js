import * as types from '../../types';

const initalState = []
//  {
//     room : '',
//     noidung : [] 
// }
export const reducer_chat =(state = initalState , action ) => {
    switch (action.type) {

       
        // case types.SET_ROOM_CHAT: return({ ...state , room : action.payload }) ;
        // case types.SET_NOI_DUNG_CHAT: return({ 
        //                         ...state , 
        //                         noidung : [ ...state.noidung , action.payload] }) ;
        // case types.UPDATE_NOI_DUNG_CHAT: return({ 
        //     ...state , 
        //     noidung : [ ...state.noidung , action.payload] }) ;
        case types.SET_NOI_DUNG_CHAT: return action.payload ;
        case types.UPDATE_NOI_DUNG_CHAT: return( [ action.payload , ...state  ] ) ;
            
        case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
