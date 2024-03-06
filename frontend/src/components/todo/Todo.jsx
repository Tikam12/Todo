import React, { useEffect, useState, useCallback } from 'react';
import "./Todo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

const Todo = () => {
    const [Inputs, setInputs] = useState({ 
        title: "", 
        body: "",
    });
    const [Array, setArray] = useState([]);
    const [toUpdateArray, setToUpdateArray] = useState(null); // Update: Store toUpdateArray in state


    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = useCallback(async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title or Body Should Not Be Empty");
        } else {
            const id = sessionStorage.getItem("id"); // Update: Get id within submit function
            if (id) {
                try {
                    await axios.post(`${window.location.origin}/api/v2/addTask`, {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    });
                    setInputs({ title: "", body: "" });
                    toast.success("Your Task is Added");
                } catch (error) {
                    console.error("Error adding task:", error);
                    toast.error("Error adding task");
                }
            }
            else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.error("Your Task is Not Saved! Please Signup");
            }
        }
    }, [Inputs, Array]);

    const del = async (Cardid) => {
        const id = sessionStorage.getItem("id"); // Update: Get id before deletion
        if (id) {
            try {
                await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
                    data: { id: id },
                });
                toast.success("Your Task is Deleted");
            } catch (error) {
                console.error("Error deleting task:", error);
                toast.error("Error deleting task");
            }
        }
        else {
            toast.error("Please SignUp First");
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) => {
        setToUpdateArray(Array[value]); // Update: Set toUpdateArray using setter
    };

    useEffect(() => {
        // Update: Move sessionStorage.getItem("id") to useEffect
        const id = sessionStorage.getItem("id");
        if (id) {
            const fetch = async () => {
                try {
                    const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
                    setArray(response.data.list);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    toast.error("Error fetching tasks");
                }
            };
            fetch();
        }
    }, [submit]); // Update: Remove submit from dependency array

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1'>
                        <input className='todo-inputs my-2 p-2'
                            type="text"
                            placeholder='Title'
                            onClick={show}
                            name="title"
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea id='textarea'
                            className="todo-inputs p-3"
                            type="text"
                            placeholder='Body'
                            name="body"
                            value={Inputs.body}
                            onChange={change}
                        />
                    </div>

                    <div className='w-lg-50 w-100 d-flex justify-content-end my-3'>
                        <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                    </div>
                </div>

                <div className='todo-body'>
                    <div className='container-fluid'>
                        <div className='row'>
                            {Array && Array.map((item, index) => (
                                <div className='col-lg-3 col-11 mx-lg-5 mx-3 my-2 ' key={index}>
                                    <TodoCards title={item.title}
                                        body={item.body}
                                        id={item._id}
                                        delid={del}
                                        display={dis}
                                        updateId={index}
                                        toBeUpdate={update}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='todo-update' id='todo-update'>
                <div className='container update'>
                    <Update display={dis} update={toUpdateArray} />
                </div>
            </div>
        </>
    );
}

export default Todo;
