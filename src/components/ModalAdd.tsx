import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch,useSelector } from 'react-redux';
type Props={
    handleCancel:()=>void;
    typeSubmit:string
}
type Book={
    id:number,
    nameBook:string,
    nameStudent:string,
    date_start:string,
    date_end:string,
    status:boolean,
  }
  type State={
    bookReducer:{
      books:Book[],
      book:Book
    }
  }
export default function ModalAdd({handleCancel,typeSubmit}:Props) {
    const book=useSelector((state:State)=>state.bookReducer.book);
    const dispatch=useDispatch();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;   
        const newBook={...book,[name]:value}   
        dispatch({
            type:'SET_BOOK',
            payload:newBook
        })
    }
    const handleSubmit=(e:React.FormEvent)=>{
        dispatch({
            type:'GET_BOOKS'
          })
        e.preventDefault();
        if(typeSubmit==='add'){
            dispatch({
                type:'ADD',
                payload:{...book,id:Math.floor(Math.random()*10000000000)},
            })
        }else{
            dispatch({
                type:'UPDATE',
                payload:book.id,
            });
        }
        handleCancel();
    }
  return (
    <div className='modal'>
       <Form className='formModal'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tên sách</Form.Label>
        <Form.Control onChange={handleChange} name='nameBook' type="text" placeholder="Enter name of Book" value={book.nameBook}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tên sinh viên mượn</Form.Label>
        <Form.Control onChange={handleChange} name='nameStudent' type="text" placeholder="Enter name of student" value={book.nameStudent} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Ngày mượn</Form.Label>
        <Form.Control onChange={handleChange} name='date_start' type="date" placeholder="Enter date-borrow" value={book.date_start} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Ngày trả</Form.Label>
        <Form.Control onChange={handleChange} name='date_end' type="date" placeholder="Enter date-return" value={book.date_end}/>
      </Form.Group>
      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>{''}
      <Button onClick={handleCancel} variant="success" type="submit">Cancel </Button>{''}
    </Form>
    </div>
  )
}
