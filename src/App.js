import "./App.css";
import React,{useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
function App() {

  const [isComplateScreen, setIsComplateScreen]=useState(false);
  const [allTodos, setTodos] =useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription, setNewDescription]=useState("");
  const [completedTodos, setCompletedTodos]= useState([]);
  const [currentEdit, setCurrentEdit]= useState("");
  const [currentEditedItem, setCurrentEditedItem]=useState("");

  const handleTodo =()=>{

    let newTodoItem ={
      title:newTitle,
      description:newDescription,
      
    }
    toast.success('Todo Added')
  

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo =(index)=>{

    let reducedTodo =[...allTodos];
    reducedTodo.splice((index-1));
    

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

  };
  
  const handleComplate=(index)=>{

    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' +mm+ '-' +yyyy+ ' at ' + h + ':' +m+ ':' +s;



    let filteredItem= {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo =(index)=>{

    let reducedTodo =[...completedTodos];
    reducedTodo.splice(index-1);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
    toast.success('Todo Deleted')

  }

  useEffect (()=>{
    let savedTodo =JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo =JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  const handleEdit =(ind,item)=>{
    console.log(ind)
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
    
  }

  const handleUpdateTitle =(value)=>{
    setCurrentEditedItem((prev)=>{
      return{...prev, title:value}
    })
  }

  const handleUpdateDescription =(value)=>{
    setCurrentEditedItem((prev)=>{
      return{...prev, description:value}
    })
    
  }

  const handleUpdateToDo=()=>{
    let prevToDo = [...allTodos];
    prevToDo[currentEdit]=currentEditedItem;
    setTodos(prevToDo);
    setCurrentEdit("");
    toast.success('Todo Updated')

  }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)}placeholder="Enter Title Here" required={newTitle}></input>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} 
            onChange={(e)=>setNewDescription(e.target.value)} placeholder="Enter Description Here" required={newDescription}></input>
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleTodo} className="primaryBtn">
              Add
            </button>
            <ToastContainer/>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isComplateScreen === false && 'active'}`} 
            onClick={()=>setIsComplateScreen(false)}>Todo</button>

          <button className={`secondaryBtn ${isComplateScreen === true && 'active'}`} 
            onClick={()=>setIsComplateScreen(true)}>Complated</button>
        </div>

        <div className="todo-list">

          
          {isComplateScreen === false && 
            allTodos.map((item, index) => {
              if(currentEdit === index){
               return(
                <div className="edit_wrapper" key={index}>

                <input placeholder="Updated Title" 
                onChange={(e)=>handleUpdateTitle(e.target.value)} 
                value={currentEditedItem.title}/>

                <textarea placeholder="Updated Description" 
                rows={4}
                onChange={(e)=>handleUpdateDescription(e.target.value)} 
                value={currentEditedItem.description}/>

              <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                  Update
              </button>

              </div>

               )
              }else{

                return(
                  <div className="todo-list-item" key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  </div>
      
                  <div>
                  <MdDelete className="icon" onClick={()=>handleDeleteTodo(index)} title="Delete"/>
                  <FaCheck  className='check-icon' onClick={()=>handleComplate(index)} title="Complete"/>
    
                  <FaRegEdit className="check-icon"
                  onClick={()=>handleEdit (index, item)}
                  title="Edit?"/>
                  </div>
                </div>
                )
              }
            

          })}


           {isComplateScreen === true && completedTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>ComplatedOn :{item.completedOn}</small></p>

              </div>
  
              <div>
              <MdDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)} title="Delete"/>
              
              </div>
            </div>
            )

          })}
        </div>
      </div>
    </div>
  );
}

export default App;
