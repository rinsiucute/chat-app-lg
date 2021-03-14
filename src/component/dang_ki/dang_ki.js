import { useEffect , useState } from 'react';
import axios from 'axios'

import css from './style.module.css'
// mat
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {

    ThemeProvider,

  } from '@material-ui/core/styles';
//redux
import {  useDispatch } from 'react-redux';
import { set_loading} from './../../store/action/set_loading'





export default function Dang_ki(){
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [ma_xac_minh, set_ma_xac_minh] = useState();
    const [ma_xac_minh2, set_ma_xac_minh2] = useState();
    const [state , setState] = useState({
        name : '',
        email : '',
        password : '',
        password2 : '',
        // check : false,
        // avatar : 'ava_md_nu.jpg',
        ngaysinh : '',
        gioitinh : 'nam',
        // time : ''

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
        let { name , email , password2 , password , ngaysinh , gioitinh } = state;
        var reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let loi = []
        if( name == '' || email == '' || password == '' || password2 == "" || ngaysinh == '' ) loi.push({msg : " \n Bạn cần điền đầy đủ thông tin nha !!! "})
        if( password2 !== password ) loi.push({msg : " \n Mật khẩu của bạn không khớp "})
        if( !reg.test(email) ) loi.push({msg : " \n Địa chỉ email của bạn không hợp lệ !!! "})
        if(loi.length > 0 ){
            let a= "";
            loi.forEach(e=>{
            a=  a + e.msg
            })

            alert(a)
        } 
        else{
            dispatch(set_loading("flex"))
                    axios.post('/user/xac_minh_tai_khoan', {
                        name : name,
                        email : email,  
                    })
                    .then(data =>{
                        
                        if(data.data === '\n Email đã tồn tại'){
                            alert(data.data)
                            dispatch(set_loading("none"))
                        } 
                        else{
                            set_ma_xac_minh(data.data.ma_xac_minh)
                            setOpen(true)
                            dispatch(set_loading("none"))
                            
                        }
                    })


        }
        
    }
    const inxacminh =(e)=>{
        set_ma_xac_minh2(e.target.value)
    }
    const xacminh = ()=>{
        console.log(ma_xac_minh);
        console.log( ma_xac_minh2 );
        if( ma_xac_minh2 == ma_xac_minh){
            dispatch(set_loading("flex"))
            axios.post('/user/tao_tai_khoan' , {                
                    name : state.name,
                    email : state.email,
                    password : state.password,
                    ngaysinh : state.ngaysinh,
                    gioitinh : state.gioitinh,
                    avatar : state. gioitinh === 'nam' ? 'ava_md_nam.jpg' : 'ava_md_nu.jpg' ,
                    time : Date.now()  ,
                    time_online : 0,
                    online : false
            })
            .then(res => {
                dispatch(set_loading("none"))
                alert(res.data)
                
                setOpen(false)
            })
            .catch(e=> console.log(e))
            
        }
        else{
            alert('/n Bạn cần nhập chính xác mã xác minh trong email!!')
        }

    }
    return(
        <div>
            <p> Đây là trang đăng kí </p> 

            <input placeholder='name' onChange = { onchange } name='name' value={state.name} />
            <input placeholder='email' onChange = { onchange } name='email' value={state.email} />
            <input placeholder='mật khâu' onChange = { onchange } name = 'password' value = { state.password }  />
            <input placeholder='mật khâu2' onChange = { onchange } name = 'password2' value = { state.password2 }  />

            <input 
                    
                    type="date" 
                    style={{ border : 'none'}} 
                    onChange={ onchange } 
                    name = 'ngaysinh'
                    value={ state.ngaysinh } />
                    {/* để disable dùng ponter even none */}

<div  style={{ display : 'flex' ,flexDirection : 'column' , cursor : 'pointer'  }} >

<span >
        <input 
        id='gioi_tinh_nu'
        type="radio" 
    //  style={{ display : 'none' }} 
    style={{ cursor : 'pointer' }}
        onChange={ onchange } 
        name = 'gioitinh'
        value='nu' 
        checked = { state.gioitinh === 'nu' ? true : null }
        />

        <label htmlFor='gioi_tinh_nu' style={{ cursor : 'pointer' }}> nữ </label>
</span>

<span  >
        <input 
        style={{ cursor : 'pointer' }}
        type="radio" 
    //  style={{ display : 'none' }} 
        onChange={ onchange } 
        name = 'gioitinh'
        value='nam' 
        checked = { state.gioitinh === 'nam' ? true : null }
        id="gioi_tinh_nam"
        />
        <label htmlFor='gioi_tinh_nam' style={{ cursor : 'pointer' }}> nam </label>
</span>
</div>
            <button onClick={ onclick } > đăng kí </button>




            <Dialog open={open} aria-labelledby="form-dialog-title">
                
                <DialogContent>
                <h2 className={css.h2} > Xác minh tài khoản ! </h2>
                        <p className={css.p} >                 Mình đã gửi một mã xác minh về tài khoản email của bạn ,   bạn vui lòng nhập mã để xác minh nha :)) </p>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Mã xác minh : ............"
                    type="number"
                    fullWidth
                    onChange = {inxacminh}
                  />
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button> */}
                  <Button onClick={xacminh} color="primary">
                    Xác minh
                  </Button>
                </DialogActions>
              </Dialog>
        </div>
    )
}