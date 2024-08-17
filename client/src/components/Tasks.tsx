import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const Tasks = () => {

    const [tasks, setTasks] = useState([] as any[]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getTaks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://taskmanagerserver-xq5h.onrender.com/api/v1/task/tasks');
            if (data.success) {
                setTasks(data.tasks)
            }
            else {
                toast.error(data.message, {
                    duration: 6000,
                })
            }

        } catch (error) {
            toast.error("Something Went Wrong!", {
            });
            console.log(error);

        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTaks();
    }, [])

    const deleteTask = async (id: string) => {
        const filterTasks = tasks.filter((task) => task._id !== id)
        setTasks(filterTasks)
        try {
            const { data } = await axios.delete(`https://taskmanagerserver-xq5h.onrender.com/api/v1/task/delete/${id}`);
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
            console.log(error);
        }
    }

    return <>
        <div className="tasks_wrapper">
            {
                loading ?
                    <>
                        <h1>Loading..</h1>
                    </>
                    :
                    <>
                        <div className="task_container">
                            {
                                tasks.map((task, index) => {
                                    return <div className="task_card" key={index}>
                                        <div className="title">
                                            <h1>{task?.title}</h1>
                                            <MdClose
                                                className="close_icon"
                                                onClick={() => deleteTask(task?._id)} />
                                        </div>
                                        <p>{task?.description}</p>
                                        <div className="task_footer">
                                            {
                                                task?.status === 'pending' ?
                                                    <span className="pending">{task?.status}
                                                        <LiaEditSolid
                                                            className="edit_icon"
                                                            onClick={() => navigate(`/dashboard/update-task/${task._id}`)}
                                                        /></span>
                                                    :
                                                    <span className="completed">{task?.status}
                                                        <LiaEditSolid
                                                            className="edit_icon"
                                                            onClick={() => navigate(`/dashboard/update-task/${task._id}`)}
                                                        /></span>
                                            }
                                            <span className="date">{moment(task?.dueDate).format("DD MMM YYYY")}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </>
            }
        </div >
    </>
}

export default Tasks