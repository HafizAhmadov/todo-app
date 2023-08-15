import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";

const TodoList = () => {
    const[taskList, setTaskList] = useState([])
    const[data, setData] = useState({ id: -1, name: ""})

    const handleChange = (e) =>{
        setData({id: Math.round(Math.random() * 9999), name: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setTaskList([data, ...taskList])
        setData({id:-1 , name: ""})
    }

    const handleDeleteClick = (id) =>{
        setTaskList(taskList?.filter(task => task.id !== id));
    }

    const renderedList = taskList.map((list, key) => {
        return(
            <div key={key} className="flex items-center justify-between py-3 px-5 bg-violet-500 text-white font-semibold rounded-md">
                {list.name}
                <div className="flex space-x-2">
                    <div className="text-[20px]"><BiSolidEdit /></div>
                    <div className="text-[16px]"><FaTrash onClick={()=>handleDeleteClick(list.id)}/></div>
                </div>
            </div>
        )
    })

    return (
        // Container
        <div className="flex justify-center h-[100vh] pb-16 bg-violet-500 overflow-y-auto">
            <div className="flex flex-col bg-blue-950 mt-28 p-8 h-fit space-y-8 rounded-md">
                <div className="text-3xl text-white font-semibold text-center">Get Things Done!</div> 
                <form className="flex" onSubmit={handleSubmit}>
                    <input type="text" value={data.name} placeholder="What is the task today?" className="bg-blue-950 px-4 py-2 text-white 
                        border border-violet-500  placeholder:text-sm placeholder:text-slate-400 w-80
                        outline outline-none"  onChange={handleChange}/>
                    <button className="bg-violet-500 text-white font-semibold px-3">Add Task</button>
                </form>
                <div className="space-y-5">{renderedList}</div>
            </div>
        </div>
    )
}

export default TodoList;