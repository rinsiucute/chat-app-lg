 
import Dang_ki from '../../component/dang_ki/dang_ki'
import Dang_nhap from '../../component/dang_nhap/dang_nhap'
import { useEffect , useState } from 'react';
//css
import css from './style.module.css';









export default function Login(props){

    const [content , set_conten] = useState(true)
    const dangnhap = ()=> set_conten(true)
    const dangki = ()=> set_conten(false)
    return(
        <div>
            <h5 onClick={ dangnhap } >Đăng nhập</h5>
            <h5 onClick={ dangki } > Đăng kí </h5>
            { content ? <Dang_nhap/> : <Dang_ki/>  }
        </div>
    )
 } 