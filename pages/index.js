import Login from '../src/container/login/login'
import Loading from './../src/container/loading/loading'
import  Main  from './../src/container/main/main'
import { useEffect , useState } from 'react';
// Cookies
import Cookies from 'js-cookie'
import { useRouter   } from 'next/router'
//axios 
import axios from 'axios'
//redux
import {  useDispatch , useSelector } from 'react-redux';
import { set_conten_main } from './../src/store/action/set_conten'
import { set_data_user } from './../src/store/action/set_user'















export default function Home(){
    const router = useRouter()
    const dispatch = useDispatch()
    const value = useSelector(state => state.conten_main);
    // const [ value , setvalue ] = useState('1')
    useEffect(()=>{
        dispatch( set_conten_main('1') )
        if(Cookies.get('key')){
            
                axios.post('/user/xac_minh_cookie' , { id  : Cookies.get('key') })
                .then( res => {
                    // console.log(res);
                    dispatch(set_data_user(res.data))
                    dispatch( set_conten_main('2') )
                } )
                .catch(e => console.log(e))
        }
        else{
            dispatch( set_conten_main('3') )
        }
// không cho dùng f12
        // document.addEventListener("keydown" , (e)=>{
        //     if(e.keyCode == 123){
        //         e.preventDefault()
        //     }
        // })
        // document.addEventListener("contextmenu", function(e) {
        //     e.preventDefault();
        // }, false);
    },[])
    let content = ()=>{
        if(value === '1') return <div style={{ width : '100%', height : "100vh" ,background : "black" , display : "flex" , justifyContent : 'center' , alignItems : 'center'}} > <img src="sha.gif" /> </div> ;

        if(value === '2'){ 
            //router.replace('/main' , '/')
                return    <Main/>
        }

        if(value === '3'){
          return ( <Login/> )
        }

      }

    return (
        <div>
                       

         { content() }

            <Loading/>
         
           
        </div>
    )
}