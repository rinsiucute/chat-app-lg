import * as types from '../../types';

const initalState = null
export const reducer_socket =(state = initalState , action ) => {
    switch (action.type) {

        case types.SOCKET: return  action.payload 

            
        case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
