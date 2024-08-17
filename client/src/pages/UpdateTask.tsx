import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdLogIn } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate();


    // Get Single Task
    const getSingleTask = async () => {
        try {
            const { data } = await axios.get(`https://taskmanagerserver-xq5h.onrender.com/api/v1/task/task/${params.id}`);
            if (data?.success) {
                setTitle(data.task.title)
                setDescription(data.task.description)
                setDueDate(moment(data.task.dueDate).format("DD MMM YYYY"))
                setStatus(data.task.stauts)

            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getSingleTask();
    }, [])



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.put(`https://taskmanagerserver-xq5h.onrender.com/api/v1/task/update/${params.id}`, {
                title,
                description,
                dueDate,
                status
            })

            if (data?.success) {
                toast.success(data.message, {
                    duration: 6000
                })
                navigate('/dashboard')
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

                <div className="input_box">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
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

export default UpdateTask