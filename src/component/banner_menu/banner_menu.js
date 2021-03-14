import React, { Component , useEffect, useState } from 'react';
import css from './style.module.css';
import Router from 'next/router';
// redux
import {  useDispatch , useSelector } from 'react-redux';
import { log_out } from './../../store/action/set_user'
// import { setdatauser } from './../../store/action/setdatauser'
// import { setcontentmain } from './../../store/action/setcontentmain'
// import { setloading } from './../../store/action/setloading'



// axios
import axios from 'axios'
// mat
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

import Dialog from '@material-ui/core/Dialog';
//cp
import Doi_mat_khau from '../doi_mat_khau/doi_mat_khau';
import Update from '../update/update';
import Them_ban from './../them_ban/them_ban'
import Thong_tin_user from './../thong_tin_user/index'
//// Cookies
import Cookies from 'js-cookie'




export default function Banner_menu(){
    const dispatch = useDispatch()
    const datauser = useSelector(state => state.user);
    // const datauser = laydatauser.user;
    // console.log(datauser);
    const socket = useSelector(state => state.socket);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [innerWidth, setinnerWidth] = React.useState(window.innerWidth);
    useEffect(()=>{
        setinnerWidth(window.innerWidth)
    } , [ window.innerWidth ])
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
      setOpen1(false);
      setOpen2(false);
    };

    const cap_nhat_thong_tin =() => {
        setOpen(true);
    }
    const doi_mat_khau = ()=>{
        setOpen2(true);
    }
    const them_ban = ()=> {
        setOpen1(true);
    }
    const dang_xuat = ()=> {
        dispatch(log_out())
        Cookies.remove('key2');
        Cookies.remove('key');
        Cookies.remove('_ga');
        Cookies.remove('1P_JAR');
        socket.emit( 'logout' , datauser._id )
    }
    const fullscreen= ()=>{
        if( innerWidth < 400 ){
            return true
        }
    }
    return(
        <div className={css.container} >
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        
                 <img src={`${datauser.avatar}`} className={css.avatar} />
            </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={ cap_nhat_thong_tin }> Cập nhật thông tin </MenuItem>
                        <MenuItem onClick={ doi_mat_khau }> Đổi mật khẩu </MenuItem>
                        <MenuItem onClick={ dang_xuat }> Đăng xuất </MenuItem>
                </Menu>
            
            <div className={css.timkiem} >
                <input placeholder="Tìm kiếm bạn bè" />
            </div>
            
            <IconButton color="primary" style={{ marginLeft : "5px"}} component="span" onClick={ them_ban } >
                <PersonAddIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen = { fullscreen() }
            >

                    <Update   close = { handleClose }   />
                    {/* <Thong_tin_user   close = { handleClose } update = {true} /> */}
            </Dialog>


            <Dialog
                open={open1}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ padding : '0px', margin : '0px' }}
                fullScreen = { fullscreen() }
            >

                    < Them_ban   close = { handleClose }   />
                
            </Dialog>



            <Dialog
                open={open2}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen = { fullscreen() }
            >

                    <Doi_mat_khau   close = { handleClose }   />
            </Dialog>
        </div>
     
    )
}