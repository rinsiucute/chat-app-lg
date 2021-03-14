import React, { Component } from 'react';
import css from './style.module.css';

import { useDispatch, useSelector } from 'react-redux';
//mat
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import Button from '@material-ui/core/Button';
// axios
import axios from 'axios'

import { set_update_data_user } from './../../store/action/set_user'



export default function Update(prop){
    const dispatch = useDispatch();
    // const socket = useSelector(state => state.socket);
    // const chat = useSelector(state => state.chat);
    const datauser = useSelector(state => state. user);
    // const datauser = laydatauser.user;
    const [value, setValue] = React.useState('Cập nhật');
    const [value2, setValue2] = React.useState({ 
        _id : datauser._id,
        name : datauser.name,
        avatar : datauser.avatar,
        email : datauser.email,
        gioitinh : datauser.gioitinh,
        ngaysinh : datauser.ngaysinh
    });


    const onChange = (e) => {
        let data =  e.target.files[0];
        console.log(data);
        if( data.type === 'image/png' || data.type === 'image/jpeg' ){
          // console.log(data);
          const filereader = new FileReader();
            filereader.readAsDataURL(data)
          // bây giờ là phần sự kiện nha :))
           filereader.onloadend =  (e) => {
              // console.log('đây là sự kiện onload nè');
              // filereader.readAsBinaryString(data)
                setValue2(d => ({
                    ...d,
                    avatar : filereader.result
                }) )
              // console.log(e);
            //   console.log(filereader.result);

      
          }
        }
    }
    const onChange2 = (e)=>{
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

            setValue2(data => ({
                ...data,
                [name] : value
            }))
            // console.log(value2);
        // console.log(target);

    }
    const onclick = ()=>{
        setValue( <img src="iconloading1.gif"  style={{maxWidth : '100%'}} />)
        axios.put('/user/update' , value2)
        .then(data => {
            console.log(data);
            prop.close()
        })
        .catch( e => console.log(e) )
        dispatch(set_update_data_user(value2))
    }


    return (
        <div className = { css.container }>
            <form>
                <div style={{ textAlign : 'center' }} >
                     <h1 style={{fontSize : '18px', textAlign  : 'center', margin : 'auto'}} > Cập nhật thông tin </h1>

                </div>
                <Button style={{ position : 'absolute' , top : '12px' , right : '0px' }} onClick={ prop.close } > <CloseTwoToneIcon/> </Button>

                <div className={ css.name } >
                    <span> Name </span>
                    <div  style={{ display : 'flex' , alignItems : 'center' , cursor : 'pointer' }} >
                                    {/* <label htmlFor="file-input3" style={{ cursor  :'pointer' }} >
                                            <p> { value2.name  }  </p>
                                    </label> */}

                                    <input 
                                    id="file-input3"
                                     type="text" 
                                    //  style={{ display : 'none' }} 
                                     onChange={ onChange2 } 
                                     name = 'name'
                                     value={ value2.name } />
                        </div>
                </div>
                
                
                
                
                <div className = {css.avatar} >
                        <span > avatar </span>
                        <div  style={{ display : 'flex' , alignItems : 'center' , cursor : 'pointer' }} >
                                    <label htmlFor="file-input2" style={{ cursor  :'pointer' }} >
                                            <img src={ value2.avatar } />
                                    </label>

                                    <input 
                                        id="file-input2" 
                                        type="file" 
                                        style={{ display : 'none' }} 
                                        onChange={ onChange }
                                        name= 'avatar'
                                        
                                        />
                        </div>
                </div>

                <div className={ css.ngaysinh } >
                    <span> Ngày sinh </span>
                    <div  style={{ display : 'flex' , alignItems : 'center' , cursor : 'pointer' }} >
                                    {/* <label htmlFor="file-input3" style={{ cursor  :'pointer' }} >
                                            <p> { value2.name  }  </p>
                                    </label> */}

                                    <input 
                               
                                     type="date" 
                                     style={{ border : 'none'}} 
                                     onChange={ onChange2 } 
                                     name = 'ngaysinh'
                                     value={ value2.ngaysinh } />
                        </div>
                </div>

                <div className={ css.gioitinh } >
                    <span> Giới tính </span>
                    <div  style={{ display : 'flex' ,flexDirection : 'column' , cursor : 'pointer'  }} >

                                    <span >
                                            <input 
                                            id='gioi_tinh_nu'
                                            type="radio" 
                                        //  style={{ display : 'none' }} 
                                        style={{ cursor : 'pointer' }}
                                            onChange={ onChange2 } 
                                            name = 'gioitinh'
                                            value='nu' 
                                            checked = { value2.gioitinh === 'nu' ? true : null }
                                            />

                                            <label htmlFor='gioi_tinh_nu' style={{ cursor : 'pointer' }}> nữ </label>
                                    </span>

                                    <span  >
                                            <input 
                                            style={{ cursor : 'pointer' }}
                                            type="radio" 
                                        //  style={{ display : 'none' }} 
                                            onChange={ onChange2 } 
                                            name = 'gioitinh'
                                            value='nam' 
                                            checked = { value2.gioitinh === 'nam' ? true : null }
                                            id="gioi_tinh_nam"
                                            />
                                            <label htmlFor='gioi_tinh_nam' style={{ cursor : 'pointer' }}> nam </label>
                                    </span>
                        </div>
                </div>

                <div style={{ border : 'none' , textAlign : 'center' , justifyContent : 'center' }} > <Button style={{ background : 'gainsboro' , width : '100px' , height : '42px' }} onClick = { onclick } > { value } </Button>  </div>

            </form> 
        </div>
    )
}