



import { useEffect , useState } from 'react';

// compo

//css
import css from './style.module.css';

// redux
import { set_socket } from './../../store/action/set_socket'
import {  useDispatch , useSelector } from 'react-redux';

let socket



export default function Banner_chat(props){
    const dispatch = useDispatch();
    const datauser = useSelector(state => state.user);
    const ban = useSelector(state => state.ban.dangchat);
    const socket = useSelector(state => state.socket);
    const [value2, setValue2] = useState(null);
    useEffect( async () => {
        // socket.on('user_truy_cap' , data =>{
        //     alert('data')
        // })
        
    }, [] )
    const onclick = async ()=>{
        // await socket.emit('phong' )
        console.log(ban);
        
    }
    return(
        <div  className={ css.container } onClick={ onclick } >
            <div className={ css.avatar } >
                    <img src={ `${ban.avatar}` } />
                    
            </div>
            <span style={ { padding : '0px 12px' , fontSize : '14px' } } > { ban.name } </span>

        </div>
    )
 }  

