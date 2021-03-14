import React, { Component } from 'react';
import css from './style.module.css';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
// axios
import axios from 'axios'

import { set_update_data_user } from './../../store/action/set_user'
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';


export default function Doi_mat_khau(prop){
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const chat = useSelector(state => state.chat);
    const datauser = useSelector(state => state.datauser);
    // const datauser = laydatauser.user;
    const [value, setValue] = React.useState('Cập nhật');
    const [value2, setValue2] = React.useState({ 
        email : '',
        mat_khau_cu : '',
        mat_khau_moi : '',
        mat_khau_moi2 : ''
    });

    const onchange = (e)=> {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

            setValue2(data => ({
                ...data,
                [name] : value
            }))
    }

    const onclick = (e)=>{
        setValue( <img src="iconloading1.gif"  style={{maxWidth : '100%'}} />)
        if( value2.mat_khau_moi !== value2.mat_khau_moi2 ){
            alert('Mật khẩu bạn nhâp lại không đúng')
        }
        else{
            axios.put('/user/update_pass' , value2)
            .then(data => {
                if(data.data === 'ok'){
                    prop.close()
                }
                else{
                    alert('Thông tin bạn nhập không chính xác!')
                }
                // prop.close()
            })
            .catch( e => console.log(e) )
        }
        
    }


    return (
        <div className = { css.container }>
            <form>
            <Button style={{ position : 'absolute' , top : '12px' , right : '0px' }} onClick={ prop.close } > <CloseTwoToneIcon/> </Button>
                <div style={{ textAlign : 'center' }} > <h1 style={{fontSize : '18px', textAlign  : 'center', margin : 'auto'}} > Thay đổi mật khẩu </h1></div>
                <div>
                    <span> Email </span>
                    <input type='text' value={ value2.email } name = 'email' onChange={ onchange } />
                </div>
                <div>
                    <span> Mật khẩu cũ </span>
                    <input type='password' value={ value2.mat_khau_cu } name = 'mat_khau_cu' onChange={ onchange } />
                </div>
                <div>
                    <span> Mật khẩu mới </span>
                    <input type='password' value={ value2.mat_khau_moi } name = 'mat_khau_moi' onChange={ onchange }/>
                </div>
                <div>
                    <span> Nhập lại mật khẩu mới </span>
                    <input type='password' value={ value2.mat_khau_moi2 } name = 'mat_khau_moi2' onChange={ onchange }/>
                </div>


                <div style={{ border : 'none' , textAlign : 'center' , justifyContent : 'center' }} > <Button style={{ background : 'gainsboro' , width : '100px' , height : '42px' }} onClick = { onclick } > { value } </Button>  </div>

            </form> 
        </div>
    )
}