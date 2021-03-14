



import { useEffect , useState } from 'react';

// compo

//css
import css from './style.module.css';

// redux
import { set_noi_dung_chat } from './../../store/action/set_chat'
import {  useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
 

export default function Conten_chat(props){
    const dispatch = useDispatch();
    const datauser = useSelector(state => state.user);
    const ban = useSelector(state => state.ban);
    const chat = useSelector( state => state.chat );
    const socket = useSelector(state => state.socket);
    // const [noi_dung_dang_chat, setnoi_dung_dang_chat] = useState([]);
let noi_dung_dang_chat =  chat.filter(e => {
    return e.room == ban.dangchat.room
} )
    useEffect( async ()=>{
        // let a = await  chat.filter(e => {
        //     return e.room == ban.dangchat.room
        // } )
        // await setnoi_dung_dang_chat(a )
        if(noi_dung_dang_chat.length == 0 ){
            axios.post('api/noi_dung_chat', {
                room : ban.dangchat.room,

            })
            .then(  d=>{
                dispatch(set_noi_dung_chat(d.data))
            })
        }
    }, [])

// const click = ()=>{
//     let noi_dung_dang_chat = chat.filter(e => e.room === ban.dangchat.room)
//     console.log( result );
// }

// let noi_dung_dang_chat =  chat.filter(e => {
//     return e.room == ban.dangchat.room
// } )

    const ct =  ()=>{
        let result = null
        // console.log();
        // let noi_dung_dang_chat =  chat.filter(e => {
        //     return e.room == ban.dangchat.room
        // } )
        // console.log( noi_dung_dang_chat ); 
        // console.log(ban.dangchat.room);
        if(noi_dung_dang_chat.length > 0){
          result = noi_dung_dang_chat.map((phantu , index)=> {
              if( phantu.email_nguoi_gui !== datauser.email ){
                return ( 
                        <div key = { index } className={ css.you_chat } >
                            <div>
                                <img src={ `${ban.dangchat.avatar}` } style={{ height : '28px' , width : '28px' , borderRadius : '50%' }} />    
                            </div>
                            <div className={ css.conten } >
                                
                                <span> { phantu.msg } </span>
                            </div>
                        </div>
                        )
                }
                else{
                    return ( 
                        <div key = { index } className={ css.my_chat } >
                            <div className={ css.conten } >
                                    <span> {phantu.msg} </span>
                            </div>
                        </div>
                                )
                }

          })
        }

        return result
    }
    // const click = ()=>{
    //     ct()
    //     console.log(ct());
    // }
    return(
        // <div>
                    <div  className={ css.container }   >
            
                
          
            { ct() }
        
           {/* </div> */}
    </div>
     
    )
 }  

