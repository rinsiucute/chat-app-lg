 

import { useEffect , useState } from 'react';
//css
import css from './style.module.css';
//mat
import Button from '@material-ui/core/Button';
import LensIcon from '@material-ui/icons/Lens';
// redux
import {  useDispatch , useSelector } from 'react-redux';
import { set_dang_chat , set_open_chat } from './../../store/action/set_ban_be'
import {   set_room_chat , set_noi_dung_chat } from './../../store/action/set_chat'

export default function User_compo(props){
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const [value, setValue] = useState(false);
    const [value2, setValue2] = useState(props.time_online );
    useEffect(()=>{
        setValue( props.online )

        socket.on('user_truy_cap' , async (data)=>{
            if(  props.room == data ){
              await  setValue(true)
            }
            
            socket.off('user_truy_cap')
        })
        socket.on('user_ngat_truy_cap' , async (data)=>{
            if(  props.room == data ){
              await  setValue( false )
              setValue2(Date.now())
            }
            
            socket.off('user_ngat_truy_cap')
        })
    },[])
    const click1 =async ()=> {
        await dispatch( set_dang_chat({
            avatar: props.avatar,
            email: props.email,
            name: props.name,
            online: props.online,
            room: props.room,
            time: props.time,
            time_online: props.time_online,
            time_tin_nhan_cuoi: props.time_tin_nhan_cuoi,
            type: props.type,
        }) )

dispatch( set_room_chat( props.room ) )
        dispatch( set_open_chat(true) )
        
    }



    const time_onl =  ()=> {
        
     if(!value){
        // let time =   (Date.now() - props.time_online)/1000
        let time = Math.floor((Date.now() - value2)/1000)
        if( Math.floor(time/86400)  >= 1 ) return  `${Math.floor(time/86400)} ngày trước` // ngày
        else if( Math.floor(time/3600)   >= 1) return  `${Math.floor(time/3600) } giờ trước` //giờ
        else if( Math.floor(time/60)   >= 1)  return  `${Math.floor(time/60)} phút trước` //phút
        else return ` ${time} giây trước `
     }

      
    }
   return(
       <div  >
           <Button onClick={ click1 } style={{ width : '100%' }} >

                <div className={css.container} >
                        <div>
                            <img src={ props.avatar } />
                            <div style={{ maxWidth : '250px' , display : 'flex' , flexDirection : 'column' , padding : '5px 15px' }} >
                                    <span style={{ whiteSpace : 'nowrap' , overflow : 'hidden' , textOverflow : 'ellipsis' , textTransform : 'none' }} > { props.name } </span>
                                    <span style ={{ display : 'flex' , color : '#949698' , textTransform : 'none' , whiteSpace : 'nowrap' }} >
                                            <span style={{ whiteSpace : 'nowrap' , overflow : 'hidden' , textOverflow : 'ellipsis'   }} > Lorem Ipsum 
                                            </span>
                                            <span style={{ padding : '0px 5px' }} > { time_onl() } </span>
                                    </span>
                            </div>
                        </div>
                        <div >
                            <LensIcon style={ value? { fontSize : 10 , color : 'greenyellow'  } : { opacity : '0' } } />
                        </div>
                </div>


               
           </Button>

       </div>

   )
}  