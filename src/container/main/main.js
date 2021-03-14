



import { useEffect , useState } from 'react';
// io
import io, { Socket } from 'socket.io-client'
// compo
import Menu from '../menu/menu'
import Chat from '../chat/chat'
//css
import css from './style.module.css';

// redux
import { set_socket } from './../../store/action/set_socket'
import {  useDispatch , useSelector } from 'react-redux';
import { set_ndd_chat } from './../../store/action/set_ban_be'
// lay out
import Layout_main from './../../layout/layout_main/'
let socket



export default function Main(props){
    const dispatch = useDispatch();
    const datauser = useSelector(state => state.user);
    const ban = useSelector(state => state.ban);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    useEffect( async () => {
        socket = await io();
        await dispatch(set_socket(socket))
        await socket.emit( 'join_room' , datauser.email  )
        await setValue2( ()=> <Menu/> )
        setValue3( ()=> <Chat banban = { ban } /> )
        // socket.on('output_chat_van_ban' ,async data =>{
        //     // console.log(data);
        //     console.log(ban.dangchat);
        //     // if( ban.dangchat !== null ){ 
        //     //     if( ban.dangchat.room == data.room ){ // nếu room hiện tại đang mở === room của data gửi đến
        //     //         dispatch(set_ndd_chat(data))
        //     //         // console.log(data);
        //     //     }
        //     // }

        // })
    }, [] )

    return(
        <div className={css.container} >
            
            <div className={ css.menu } >
                    {/* <Menu  /> */}
                    { value2 }
            </div>
            <div className={ css.main_chat } >
                    
                    {  value3 }
            </div>
        </div>
    )
 }  

