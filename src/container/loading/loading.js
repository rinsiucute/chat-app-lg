import React, { Component, useState } from 'react';
import css from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';



export default function Loading(){
  const dis = useSelector(state => state.loading)
  const val = dis.loading

  return (
    <div className={css.container}  style={{display :`${val}`}} >
        <img src="pt.png" className={css.img}  />
        <p style = {{ color : 'gainsboro' }} > Vui lòng chờ trong giây lát... </p>
    </div>
  )
}


















