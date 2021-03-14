import { useEffect , useState } from 'react';
import axios from 'axios'

// import css from './style.module.css'
//redux
import {  useDispatch } from 'react-redux';
import { set_data_user} from './../../store/action/set_user'
import { set_conten_main } from './../../store/action/set_conten'
// Cookies
import Cookies from 'js-cookie'
// jwwt
import jwt from 'jsonwebtoken'
//rouer
import { useRouter   } from 'next/router'




export default function Dang_nhap(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [state , setState] = useState({
        email : '',
        password : '',
        check : false

    })

    const onchange = (e)=> {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        setState(data => ({
            ...data,
            [name] : value
        }))
    }
    const onclick = ()=> {
        let { email , password , check } = state


        axios.post('/user/dang_nhap', {
            email : email,
            password : password
        })
        .then(res => {
            
            if(res.data === '/n Tài khoản hoặc mật khẩu không chính xác !' ){
                alert(res.data)
            }
            else{
                let data = res.data
                
                console.log(data);
                if(check){
                    dispatch(set_data_user(data))
                    Cookies.set('key' , data._id,  { expires : 365 })
                    dispatch( set_conten_main('2') )
                    // router.replace('/main' , '/')
                }
                else{
                    dispatch(set_data_user(data))
                    dispatch(set_conten_main('2'))
                    // router.replace('/main' , '/')
                }
            }
        })
        


        setState({
            email : '',
            password : '',
            check : false
    
        })
    }

    return(
        <div>
            <p> Đây là trang đăng nhập </p>
            <input placeholder='email' onChange = { onchange } name='email' value={state.email} />
            <input placeholder='mật khâu' onChange = { onchange } name = 'password' value = { state.password }  />
            <input onChange={ onchange } name='check' value={ state.check }  type='checkbox' />
            <button onClick={ onclick } > đăng nhập </button>
        </div>
    )
}