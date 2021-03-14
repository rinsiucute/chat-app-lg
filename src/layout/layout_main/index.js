



import { useEffect , useState } from 'react';
// io
import io from 'socket.io-client'

//css
import css from './style.module.css';

// redux
import { set_socket } from './../../store/action/set_socket'
import {  useDispatch , useSelector } from 'react-redux';


let socket



export default function Layout_main(props){
    const dispatch = useDispatch();


    useEffect( async () => {
        socket = await io();
        await dispatch(set_socket(socket))


    }, [] )

    return(
        <div className={css.container} >
            { props.children }        

        </div>
    )
 }  

