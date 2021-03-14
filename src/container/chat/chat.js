



import { useEffect , useState } from 'react';

// compo
import Banner_chat from './../../component/banner_chat/index'
import Footer_chat from './../../component/footer_chat/index'
import Conten_chat from './../../component/conten_chat/index'
//css
import css from './style.module.css';

// redux
import { update_noi_dung_chat } from './../../store/action/set_chat'
import {  useDispatch , useSelector , shallowEqual } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';





export default function Chat(props){
    const dispatch = useDispatch();
    const datauser = useSelector(state => state.user);
    const ban = useSelector(state => state.ban );
    // const chat = useSelector(state => state.chat);
    const socket = useSelector(state => state.socket);
    // const state = useSelector(state => state )
    const [value2, setValue2] = useState(null);
    useEffect(  () => {
        

        socket.on('output_chat_van_ban' , async data =>{

        // console.log( 'ban' );
         await dispatch(update_noi_dung_chat(data))
         
        
        })
        // socket.off('output_chat_van_ban')

        
    }, [] )


    if( !ban.open_chat ) return < div> xin chào </div>
    // else{
        return(
            <div  className={ css.container }  style={ value2 } >
                <div className={ css.banner }  >
                    <Banner_chat/>
                </div>
                <div className={css.main}  >
                    <Conten_chat/>
                </div>
                <div className={ css.footer } >
                    <Footer_chat/>
                </div>
            </div> )
    // }
    
 }  

