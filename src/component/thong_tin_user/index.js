 

import { useEffect , useState } from 'react';
//css
import css from './style.module.css';
//compo

// axios
import axios from 'axios';
// mat 

//redux
import {  useDispatch , useSelector } from 'react-redux';

 export default function Thong_tin_user(props){
    const [value, setValue] = useState('Cập nhật thông tin');

    const datauser = useSelector(state => state.user);
    const socket = useSelector(state => state.socket);
useEffect(()=>{
    console.log(props);
})

    return(
        <div className={ css.container } >
            <div> <p> { value } </p> </div>
            <div>  </div>
        </div>
    )
 }  