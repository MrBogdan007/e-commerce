import React, { useEffect, useState } from 'react'
import { ModalInt } from '../../types/form'
import Form from './Form'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setModal } from '../../redux/reducers/modalClose';
const Modal = ({signIn,setSignIn,item}:ModalInt ) => {
const [modalCloseValue,modalCloseValueSet] = useState(true)
const dispatch =  useAppDispatch()



  return (
    <>
    

    <div className='overlay'>
    <div className="modal">
    <div onClick={() => {dispatch(setModal({modal: !modalCloseValue}));  } } className="modal-close">
  <CloseIcon/>
   </div> 


   <div className="modal-form">

    <Form signIn={signIn} setSignIn={setSignIn}/>
   </div>
    </div>
    </div>
    
  
  </>
  )

  
}

export default Modal