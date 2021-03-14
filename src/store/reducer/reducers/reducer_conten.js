import * as types from '../../types';

const initalState = '1'
export const reducer_conten_main =(state = initalState , action ) => {
    switch (action.type) {

        case types.CONTENTMAIN:
            return(
                
                  
                    action.payload
                
            )
        case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
