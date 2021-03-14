 

import { useEffect , useState } from 'react';
//css
import css from './style.module.css';
//mat
import Button from '@material-ui/core/Button';
import LensIcon from '@material-ui/icons/Lens';
//redux
import {  useDispatch , useSelector } from 'react-redux';
import axios from 'axios';



export default function User_compo2(props){
    const datauser = useSelector(state => state.user);
    const [value, setValue] = useState('Kết bạn');
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState();
    
    const [value4, setValue4] = useState( 'primary' );
    const [value5, setValue5] = useState();

    useEffect(()=>{
        if(props.ban == 'chua_gui') {
            setValue('Kết bạn')
            
            setValue4('primary')
        }
        if(props.ban == 'da_gui') {
            setValue('Hủy')
            
            setValue4('secondary')
        }
        if(props.ban == 'chap_nhan') {
            setValue('Chấp nhận')
            
            setValue4('primary')
        }
        if(props.ban == 'ban_be') {
            setValue5({ opacity  :'0' })
            setValue2(true)
        }
    },[])
    const onclick = ()=> {
        setValue( <img src="loader.gif"  style={{ backgroundColor : 'hsl(0deg 0% 90% / 0%)' ,width : '50px' , height : '24px' }} />)
        setValue2(true)
        if(props.ban == 'chua_gui'){
            axios.post('api/gui_ket_ban' , {
            email_nguoi_gui :  datauser.email ,
            email_nguoi_nhan : props.email,
            time : Date.now()
            })
            .then(d=>{
                if(d.data === 'ok'){
                    setValue('Đã gửi')
                    
                }
            })
        }
        if(props.ban == 'da_gui'){
            console.log('hi');
        }
        if(props.ban == 'chap_nhan'){
            axios.post('/api/chap_nhan_ket_ban' , {
                email_nguoi_gui :  props.email  ,
                email_nguoi_nhan : datauser.email,
             
                })
            .then(d=>{
                if(d.data === 'ok'){
                    setValue3({ display : 'none' })
                }
            })
        }
    }


   return(
       <div className={ css.container } style ={ value3 } >
           <div className={ css.avatar } >
               <img src={ props.avatar }  />
           </div>
           <div className={ css.name } >
               <p> { props.name }   </p>
           </div>
           <div className={ css.button } style={ value5 } >
                    <Button variant="contained" color={value4} size="small" onClick={ onclick } disabled={ value2 } >
                        { value }
                    </Button>
            </div>
       </div>

   )
}  