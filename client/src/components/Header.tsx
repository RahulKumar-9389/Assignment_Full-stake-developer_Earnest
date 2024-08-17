import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import toast from "react-hot-toast";

const Header = () => {

    const navigate = useNavigate()
    const [auth, setAuth]: any = useAuth();

    const handleLogout = () => {
        try {
            setAuth({
                ...auth,
                user: null,
                token: ''
            })
            localStorage.removeItem('auth');
            toast.success("Logout successfully", {
                duration: 6000
            })
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <header className="header">
            <div className="logo">Task<span>Manager</span></div>
            <div className="buttons">
                <button onClick={() => navigate('/dashboard/add-task')}>Add Task</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    </>
};


export default Header;