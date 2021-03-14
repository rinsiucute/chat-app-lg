 

import { useEffect , useState } from 'react';
//css
import css from './style.module.css';
//compo
import User_compo from '../../component/user/user'
import Banner_menu from './../../component/banner_menu/banner_menu'
import User_compo2 from './../../component/user2/user2'
// axios
import axios from 'axios';
// mat 
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PeopleIcon from '@material-ui/icons/People';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import {  useDispatch , useSelector } from 'react-redux';
import { set_ban_be , set_loi_moi_ket_ban ,update_ban_be , update_loi_moi_ket_ban ,set_ndd_chat , set_room_chat , set_noi_dung_chat } from './../../store/action/set_ban_be'




 export default function Menu(props){
    const dispatch = useDispatch();
    const [content , set_conten] = useState(true)
    const datauser = useSelector(state => state.user);
    const ban = useSelector(state => state.ban);
    const socket = useSelector(state => state.socket);

    const [value4, setValue4] = useState(false);
    const [value5, setValue5] = useState('flex');
    const [value6, setValue6] = useState(false);

    useEffect( async ()=>{
        my_room();
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
    }, [])

    const my_room = async ()=>{
        
        dispatch(set_ban_be([]))
        setValue4(true)
        setValue5('flex')
        socket.emit('my_room',  datauser.email  )

        socket.on('ds_my_room', async res => {
            // console.log(res);
            if( res.msg !== 'no_data' ){
                // setValue3( ddd => [ ...ddd , res.msg ] )
                dispatch(update_ban_be(res.msg))

            }
            if(res.off){
                socket.off('ds_my_room')
                setValue4(false)
                setValue5('none')
            }
            
        })
    }
    const ds_loi_moi = async ()=>{
        // await setValue2([])
        dispatch(set_loi_moi_ket_ban([]))
        setValue4(true)
        setValue5('flex')
        socket.emit('loi_moi_ket_ban',  datauser.email  )

        socket.on('ds_loi_moi_ket_ban', res => {

            if( res.msg !== 'no_data' ){
                // setValue2( d => [ ...d , res.msg ] )
                dispatch(update_loi_moi_ket_ban(res.msg))
            }

           console.log(res);
            if(res.off){
                socket.off('ds_loi_moi_ket_ban')
                setValue4(false)
                setValue5('none')
                setValue6(false)
            }
        })
    }


    const conten = ()=>{
        let result = null
        // console.log();
        if(ban.ban_be.length > 0 && content){
          result = ban.ban_be.map((phantu , index)=> {
              
            return ( 
                <User_compo 
                        room = { phantu.room }  
                        name={ phantu.name } 
                        avatar={ phantu.avatar } 
                        key= { index }  
                        time_tin_nhan_cuoi = { phantu.time_tin_nhan_cuoi }
                        type = { phantu.type }
                        time = { phantu.time }
                        online = { phantu.online }
                        time_online = { phantu.time_online }
                        email = { phantu.email }
                        />
            )
          })
        }
        if(ban.loi_moi_ket_ban.length > 0 && !content){
            result = ban.loi_moi_ket_ban.map((phantu , index)=> {
              return ( 
                  <User_compo2 ban = 'chap_nhan'  name={ phantu.name } avatar={ phantu.avatar } key= { index } email = { phantu.email } />
              )
            })
          }
        return result
    }
    const click_tn = async ()=>{
        set_conten(true)

    }
    const click_bb = async ()=> {
        set_conten(false)
        
        if(ban.loi_moi_ket_ban.length == 0){
            setValue6(true)
            ds_loi_moi();
        }  
        // console.log(value2);
    }
    const onclick = ()=>{
        if(content) my_room();
        if(!content) ds_loi_moi();
    }

    return(
        <div className={ css.container } >
          <div className={ css.banner } >
              <Banner_menu/>

          </div>
          <div className = { css.config } >
                        <ButtonGroup size="large" aria-label="vertical contained primary button group"   variant="text" style={{ width : '100%' }}>
                                <Button onClick={ click_tn } style={ content ? { background : '#4CAF50' } : {  } } > <MailOutlineIcon/> </Button>
                                <Button onClick={ click_bb } style={ content ? {  } : { background : '#4CAF50' } } disabled={value6} > <PeopleIcon/> </Button>
                        </ButtonGroup>
          </div>
          <div style={{ display : 'flex' }} >
              <Button onClick={ onclick } disabled={ value4 } style={{ flexGrow : '1' , textTransform : 'none' }} > Làm mới </Button>
          </div>
          <div className={ css.user } >



              { conten() }
              <div style={{ display : value5 , width : '100%' , justifyContent : 'center' }} > <CircularProgress disableShrink  /> </div>
                

                
          </div>
        </div>
    )
 }  