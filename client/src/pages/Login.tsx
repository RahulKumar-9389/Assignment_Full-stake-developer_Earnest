import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [auth, setAuth]: any = useAuth();
    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(`https://taskmanagerserver-xq5h.onrender.com/api/v1/auth/login`, {
                email,
                password
            });
            if (data?.success) {
                setLoading(false);
                toast.success(data.message, {
                    duration: 6000
                })
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                })
                localStorage.setItem('auth', JSON.stringify(data));
                navigate('/dashboard')
            }
            else {
                toast.error(data.message, {
                    duration: 6000
                })
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid email or password!", {
                duration: 6000
            })
        }
        finally {
            setLoading(false)
        }
    }

    return <>
        <div className="form_container">


            <form method="post" onSubmit={handleSubmit}>

                <div className="form_heading">
                    <h1>Welcome Back!</h1>
                    <p>Please! fill in the form below to login into your account!</p>
                </div>


                <div className="input_box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input_box">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {
                    loading ?
                        <button className="disable_btn">LOADING <RiLoader4Fill className="form_icon loading_icon" /></button>
                        :
                        <button type="submit">LOGIN <IoMdLogIn className="form_icon" /></button>
                }
                <p className="form_footer">Don't have any account? Please <Link to="/">Register</Link></p>


            </form>
        </div>
    </>
}

export default Login;