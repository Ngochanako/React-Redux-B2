import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import ModalAdd from './ModalAdd';
import ModalDelete from './ModalDelete';
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
export default function GetAllBooks() {
  //Initiliazation
  const books=useSelector((state:State)=>state.bookReducer.books);
  const book=useSelector((state:State)=>state.bookReducer.book);
  const [modalAdd,setModalAdd]=useState<boolean>(false);
  const [modalDelete,setModalDelete]=useState<boolean>(false);
  const [typeSubmit,setTypeSubmit]=useState<string>('add');
  const dispatch=useDispatch();
  const openModalAdd=()=>{
    setTypeSubmit('add');
    setModalAdd(true);
  }
  const handleCancel=()=>{
     setModalAdd(false);
     dispatch({
      type:'CLOSE',
     })
  }
  const openModalUpdate=(id:number)=>{
      setModalAdd(true);
      setTypeSubmit('update');
      const bookUpdate=books.find(b=>b.id===id);
      dispatch({
        type:'SET_BOOK',
        payload:bookUpdate,
      })
  }
  const openModalDelete=(idBook:number)=>{
    setModalDelete(true);
      dispatch({
        type:'SET_BOOK',
        payload:{...book,id:idBook}
      })
  }
  const cancelModalDelete=()=>{
    setModalDelete(false);
  }
  const handleStatus=(e:React.ChangeEvent<HTMLSelectElement>,idBook:number)=>{
    const value=e.target.value;
    let newListBook=books.map(b=>b.id===idBook?{...b,status:!b.status}:b)
    dispatch({
      type:'SET_BOOKS',
      payload:newListBook,
    })
  }
  const filterStatus=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    let value=+e.target.value;
    dispatch({
      type:'GET_BOOKS'
    })
    dispatch({
      type:'FILTER_STATUS',
      payload:value,
    })
    
  }
  return (
    <div style={{padding:'50px'}}>
      {modalAdd&&<ModalAdd handleCancel={handleCancel} typeSubmit={typeSubmit}/>}
      {modalDelete&&<ModalDelete cancelModalDelete={cancelModalDelete}/>}
      <nav>
        <h4>Quản lý mượn trả sách</h4>
        <div style={{display:'flex',gap:'50px'}}>
        <Form.Select onChange={filterStatus} aria-label="Default select example" style={{width:'200px'}}>
          <option>Lọc theo trạng thái</option>
          <option value="1">Đã trả</option>
          <option value="2">Chưa trả</option>
        </Form.Select>
        <Button onClick={openModalAdd} style={{width:'200px'}} variant="primary">Thêm thông tin</Button>
        </div>
      </nav>
      <main>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sách</th>
          <th>Sinh viên mượn</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b,index)=>(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{b.nameBook}</td>
            <td>{b.nameStudent}</td>
            <td>{b.date_start}</td>
            <td>{b.date_end}</td>
            <td>
              <Form.Select onChange={(e)=>handleStatus(e,b.id)} aria-label="Default select example" style={{width:'150px',backgroundColor:b.status?'orange':'green',color:'white'}} value={b.status?'2':'1'}>
                <option value="1">Đã trả</option>
                <option value="2">Chưa trả</option>
              </Form.Select>
            </td>
            <td>
            <Button onClick={()=>openModalUpdate(b.id)} variant="outline-warning">Sửa</Button>{' '}
            <Button onClick={()=>openModalDelete(b.id)} variant="outline-danger">Xóa</Button>{' '}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
      </main>
    </div>
  )
}
