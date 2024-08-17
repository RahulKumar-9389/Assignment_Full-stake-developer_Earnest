import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdLogIn } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';

const AddTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post('https://taskmanagerserver-xq5h.onrender.com/api/v1/task/add', {
                title,
                description,
                dueDate
            })

            if (data?.success) {
                toast.success(data.message, {
                    duration: 6000
                })
            }
            else {
                toast.error(data.message, {
                    duration: 6000
                })
            }

        } catch (error) {
            toast.error("Something Went Wrong!", {
                duration: 6000,
            });
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    return <>
        <div className="form_container">

            <form method='post' onSubmit={handleSubmit}>
                <div className="form_heading">
                    <h1>Add A New Task!</h1>
                    <p>Please! fill in the form below to add a task!</p>
                </div>

                <div className="input_box">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="input_box">
                    <label htmlFor="desctiption">Description</label>
                    <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="input_box">
                    <label htmlFor="date">Due Date</label>
                    <input
                        type="date"
                        required
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                {
                    loading ?
                        <button className="disable_btn">LOADING <RiLoader4Fill className="form_icon loading_icon" /></button>
                        :
                        <button type="submit">SUBMIT <IoMdLogIn className="form_icon" /></button>
                }

            </form>



        </div>
    </>
}

export default AddTask