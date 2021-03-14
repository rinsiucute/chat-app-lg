import * as types from '../../types';

const initalState ={
    loading : "none"
    // loading : 'flex'
}
export const reducer_loading =(state = initalState , action ) => {
    switch (action.type) {

        case types.LOADING:
            return(
                {
                    ...state,
                    loading : action.payload,
                }
            )
        case types.LOGOUT_USER: return initalState
        default: return state 
    }
}
