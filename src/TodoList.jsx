import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import useLocalStorage from "./hooks/useLocalStorage";
import useClickOutside from "./hooks/useClickOutside";

const TodoList = () => {
  const [taskList, setTaskList] = useLocalStorage("task", []);
  const [data, setData] = useState({
    id: -1,
    name: "",
    isEditable: false,
    newName: "",
  }); 

  useEffect(() =>{
    const newArray = taskList.map((task) => {
      return (
        {...task, isEditable:false}
      )
    })
    setTaskList(newArray);

  }, [])

  const ref = useRef(null);

  const handleChange = (e) => {
    setData({
      id: Math.round(Math.random() * 9999),
      name: e.target.value,
      isEditable: false,
      newName: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskList([data, ...taskList]);
    setData({name: ""});
  };

  const handleDeleteClick = (id) => {
    setTaskList(taskList?.filter((task) => task.id !== id));
  };
  
  const handleEditClick = (id) => {
    const newArray = taskList.map((task) =>
    task.id === id ? { ...task,newName: task.name, isEditable: !task.isEditable } : task
    );
    setTaskList(newArray);
  };

  const handleEditChange = (e, id) => {
    const newArray = taskList.map((task) => 
      task.id===id ? { ...task, newName: e.target.value } : task
    );
    setTaskList(newArray);

  };

  const handleEditSubmit = (id) => {
    const newArray = taskList.map((task) => 
    task.id === id ? { ...task, name: task.newName, isEditable: false} : task );
    setTaskList(newArray);
  };

  useClickOutside(ref, () => {
    const newArray = taskList.map((task) => 
    task.isEditable ? {...task, name: task.name, isEditable: false, newName: task.name} : task)
    setTaskList(newArray);
    console.log();
  });

  const renderedList = taskList.map((task, key) => {
    return (
      <div
        key={key}
        className="flex items-center justify-between py-3 px-5 bg-violet-500 text-white font-semibold rounded-md"
      >
        {task.isEditable ? (
          <form  className="flex" onSubmit={() => handleEditSubmit(task.id)}>
            <input
              type="text"
              value={task.newName}
              className="bg-violet-500  text-white 
                        border border-violet-500  placeholder:text-md placeholder:text-white w-80
                        outline outline-none"
              onChange={(e)=>handleEditChange(e, task.id)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-violet-500 text-white font-semibold px-3"
              disabled={task.newName === ""}
            >
              Edit
            </button>
          </form>
        ) : (
          <>
            {task.name}
            <div className="flex space-x-2">
              <div className="text-[20px]">
                <BiSolidEdit onClick={() => handleEditClick(task.id)} />
              </div>
              <div className="text-[16px]">
                <FaTrash onClick={() => handleDeleteClick(task.id)} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  });

  return (
    // Container
    <div className="flex justify-center h-[100vh] pb-16 bg-violet-500 overflow-y-auto">
      <div className="flex flex-col bg-blue-950 mt-28 p-8 h-fit space-y-8 rounded-md">
        <div className="text-3xl text-white font-semibold text-center">
          Get Things Done!
        </div>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            value={data.name}
            placeholder="What is the task today?"
            className="bg-blue-950 px-4 py-2 text-white 
                        border border-violet-500  placeholder:text-sm placeholder:text-slate-400 w-80
                        outline outline-none"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-violet-500 text-white font-semibold px-3"
            disabled={data.name === ""}
          >
            Add Task
          </button>
        </form>
        <div ref={ref} className="space-y-5">{renderedList}</div>
      </div>
    </div>
  );
};

export default TodoList;
