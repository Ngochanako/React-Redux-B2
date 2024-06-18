type Book={
    id:number,
    nameBook:string,
    nameStudent:string,
    date_start:string,
    date_end:string,
    status:boolean,
}
const initialBooks={
    books: JSON.parse(localStorage.getItem('books')||'[]'),
    book:{
        id:0,
        nameBook:'',
        nameStudent:'',
        date_start:'',
        date_end:'',
        status:true,
    }
}
const BookReducer=(state=initialBooks,action:any)=>{
    switch(action.type){
        case 'GET_BOOKS':
            let newBooksLocal:Book[]=JSON.parse(localStorage.getItem('books')||'[]');
            return {...state,books:newBooksLocal};
        case 'SET_BOOKS':
            let newBooksStatus=[...action.payload];
            localStorage.setItem("books",JSON.stringify(newBooksStatus))
            return {...state,books:newBooksStatus}
        case 'SET_BOOK':
            return {...state,book:action.payload}
        case 'ADD':
          let newBooks=[...state.books,action.payload];
          localStorage.setItem("books",JSON.stringify(newBooks))
          return {...state,books:newBooks,book:initialBooks.book} 
        case 'UPDATE':
          let newBooksUpdate=state.books.map((book:Book)=>book.id===action.payload?state.book:book);
          localStorage.setItem("books",JSON.stringify(newBooksUpdate))
          return {...state,books:[...newBooksUpdate],book:initialBooks.book};
        case 'CLOSE':
            return {...state,book:initialBooks.book}
        case 'DELETE':
            let newBooksDelete=state.books.filter((book:Book)=>book.id!==action.payload);
            localStorage.setItem("books",JSON.stringify(newBooksDelete))
            return {...state,books:[...newBooksDelete],book:initialBooks.book};
        case 'FILTER_STATUS':
            if(action.payload===1){
                let newBooksFilter:Book[]=state.books.filter((b:Book)=>b.status===false);
                return {...state,books:newBooksFilter};
            }else if(action.payload===2){
                let newBooksFilter:Book[]=state.books.filter((b:Book)=>b.status===true);
                
                return {...state,books:newBooksFilter};
            }
        default:
            return state;
    }
}
export default BookReducer;