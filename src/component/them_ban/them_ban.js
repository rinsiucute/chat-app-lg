 

import { useEffect , useState } from 'react';
//css
import css from './style.module.css';
//compo
import User_compo from '../../component/user/user'
import Banner_menu from './../../component/banner_menu/banner_menu'
import User_compo2 from '../../component/user2/user2'
// axios
import axios from 'axios';
// mat 
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PeopleIcon from '@material-ui/icons/People';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import {  useDispatch , useSelector } from 'react-redux';
// socket
// import { socket } from './../../container/main/main' 

// let value2 = []
 export default function Them_ban(props){
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState([]);
    const [value3, setValue3] = useState('none');
    const [value4, setValue4] = useState(false);
    const datauser = useSelector(state => state.user);
    const socket = useSelector(state => state.socket);
    // useEffect(()=>{
    //     socket.on('ds' , data =>{
    //         console.log(data);
    //     })
    // }, [])
    // let value2 = []
    const onchange = (e)=> {
        
        let key = e.target.value
        setValue(key)
        console.log(key);


    }

    const conten = ()=>{
        let result = null
        if(value2.length > 0){
          result = value2.map((phantu , index)=> {
            

            return ( 
                <User_compo2 ban = { phantu.ban} name={ phantu.name } avatar={ phantu.avatar } key= { index } email = { phantu.email } />
            )


            

          })
        }
        return result
    }

 
    const onclick = async ()=> {

        setValue4(true)
       await setValue2([])

                setValue3('flex')
        let reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(value !== '' && value !== ' ' && value !== '   ' && value !== '    '){
            if(reg.test(value)){
                // socket.emit('serch_text', {
                //     email : true,
                //     value : value,
                //     email : datauser.email
                // })
axios.post('/api/serch_email', {
    value : value,
    email: datauser.email
})
.then(data=>{
    if(data.data !== 'no_data'){
        setValue2( d => [ ...d , data.data ] )
    }
    setValue3('none')
    setValue4(false)
    console.log(data.data);
})


            }
            else{
                socket.emit('serch_text', {

                    value : value,
                    email: datauser.email
                })


            }
        }
        else{
            setValue3('none')
        }
        
        await socket.on('ds' , data =>{
            if( data.msg !== 'no_data' ){
                setValue2( d => [ ...d , data.msg ] )
            }

           console.log(data);
            if(data.off === true){
                socket.off('ds')
                setValue3('none')
                setValue4(false)
            }

        })
        

    }

    return(
        <div className={ css.container } >
            <div className={ css.title } >
                <h1 style = {{ fontSize : '18px' }} > Thêm bạn : </h1>
                <Button onClick={ props.close } > <CloseTwoToneIcon/> </Button>
            </div>
            <div className={ css.search } >
                <input autoComplete= "off"  type='text' name='email' value={ value } onChange={  onchange } placeholder='Nhập tên hoặc email ...' />
                
            </div>
            <div className={ css.conten } >
                <div>
                    { conten() }
                    <div style={{ display : value3 , width : '100%' , justifyContent : 'center' }} > <CircularProgress disableShrink  /> </div>
                    
                </div> 
            </div>
            <div className = { css.footer } >
            <Button variant="contained"  size='medium' onClick={ props.close }> Hủy </Button>
                <Button variant="contained" color="primary"  size='medium' onClick={ onclick } disabled= { value4 }  > Tìm kiếm </Button>
            </div>
        </div>
    )
 }  