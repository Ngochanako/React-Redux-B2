import React from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
type Props={
    cancelModalDelete:()=>void,
}
export default function ModalDelete({cancelModalDelete}:Props) {
    const book=useSelector((state:any)=>state.bookReducer.book)
    const dispatch=useDispatch();
    const deleteBook=()=>{
        dispatch({
            type:'DELETE',
            payload:book.id
        })
        cancelModalDelete();
    }
  return (
    <div className='modal'>
        <div className='formModal'>
            <h2>Bạn có chắc chắn muốn xóa không?</h2>
            <Button onClick={deleteBook} variant="primary" type="submit">
                OK
            </Button>{''}
            <Button onClick={cancelModalDelete} variant="success" type="submit">Cancel </Button>{''}
        </div>
      
    </div>
  )
}
