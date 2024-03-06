import React, { useEffect, useState, } from 'react';
import "./Todo.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Update = ({ display, update }) => {
    const [Inputs, setInputs] = useState({
        title: update?.title || "",
        body: update?.body || "",
    });

    useEffect(() => {
        if (update) {
            setInputs({
                title: update.title || "",
                body: update.body || "",
            });
        }
    }, [update]);


    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }

    const submit = async () => {
        try {
            if (update._id) {
                await axios
                    .put(`${window.location.origin}/api/v2/updateTask/${update._id}`, Inputs)
                    .then((response) => {
                        toast.success("Task Updated");
                        display("none");
                    })
            }
            else{
                display("none");
                toast.error("Please SignUp First");
            }

        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Please SignUp First");
        }
    };

    return (
        <div className='p-lg-5 p-1 d-flex justify-content-center align-items-start flex-column update'>
            <h3>Update Your Task</h3>
            <input
                type="text"
                className='todo-inputs my-4 w-100 p-3'
                value={Inputs.title}
                name="title"
                onChange={change}
            />
            <textarea
                className='todo-inputs w-100 p-3'
                value={Inputs.body}
                name="body"
                onChange={change}
            />
            <div>
                <button className='btn btn-dark my-4' onClick={submit} >Update</button>
                <button className='btn btn-danger my-4 mx-3'
                    onClick={() => { display("none"); }}>Close</button>
            </div>
        </div>
    )
}

export default Update;
