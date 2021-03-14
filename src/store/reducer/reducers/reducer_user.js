import * as types from '../../types';

const initalState = null
export const reducer_user =(state = initalState , action ) => {
    switch (action.type) {

        case types.DATA_USER: return  action.payload 
            
        case types.UPDATE_USER : return action.payload
            
        case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
