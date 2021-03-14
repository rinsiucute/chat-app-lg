



import { useEffect , useState } from 'react';

// compo

//css
import css from './style.module.css';

// redux
import { set_ban_be , set_loi_moi_ket_ban ,update_ban_be , update_loi_moi_ket_ban ,set_ndd_chat } from './../../store/action/set_ban_be'
import {  useDispatch , useSelector } from 'react-redux';
import { update_noi_dung_chat } from './../../store/action/set_chat'
//mat 
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';



export default function Footer_chat(props){
    const dispatch = useDispatch();
    const datauser = useSelector(state => state.user);
    const ban_dangchat = useSelector(state => state.ban.dangchat);
    const socket = useSelector(state => state.socket);
    const [value, setValue] = useState('');
    useEffect( async () => {

        
    }, [] )

    const onchange = (e)=>{
        let target = e.target;
        let vl = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        setValue(vl)
    }
    const send_vanban = async ()=>{
        console.log(value);
        let data = await {
            msg : value,
            room : ban_dangchat.room,
            email_nguoi_gui : datauser.email,
            time : Date.now()
        }
        await socket.emit('input_chat_van_ban' , data )
        // await dispatch(set_ndd_chat(data))
        dispatch(update_noi_dung_chat(data))
        setValue('')
    }
    return(
        <div  className={ css.container }  >
            <div className={ css.input_vanban } >
                <input autoComplete='off' onChange={ onchange }  value = { value } name = 'input_vanban' />
            </div>
            <div className={ css.send_vanban } >
                <IconButton onClick={ send_vanban } >
                    <SendRoundedIcon  style={ { color : 'rgb(0, 132, 255)' , fontSize : '32px' } }  />
                </IconButton>
                    
            </div>
        </div>
    )
 }  

