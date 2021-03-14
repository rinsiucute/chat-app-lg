// đây là file tông hợp các reducer lẻ tẻ á

import {combineReducers } from 'redux';
import { reducer_conten_main } from './reducers/reducer_conten';

// import { socketReducer } from './reducer/socketReducer';
import { reducer_loading } from './reducers/reducer_loading'
import { reducer_user } from './reducers/reducer_user'
import { reducer_socket } from './reducers/reducer_socket'
import { reducer_banbe } from './reducers/reducer_banbe'
import { reducer_chat } from './reducers/reducer_chat'


export default combineReducers({

    loading : reducer_loading,
    user : reducer_user,
    conten_main : reducer_conten_main,
    socket : reducer_socket,
    ban : reducer_banbe,
    chat : reducer_chat
})
