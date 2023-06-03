import { useContext, useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../providers/authProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TitlePage from "../Shared/TitlePage/TitlePage";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const Login = () => {


    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )

                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })

    }


    // We also can handle this thing through onChange
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (user_captcha_value.length == 6) {
            if (validateCaptcha(user_captcha_value)) {
                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
        }
        else{
            setDisabled(true)
        }
    }



    return (
        <div>
            <TitlePage title="Bistro Boss | login"></TitlePage>


            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onChange={handleValidateCaptcha} name="captcha" type="text" placeholder="type the above captcha" className="input input-bordered" />
                            </div>


                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>

                        <p><small>New Here? <Link to='/signup'>Create an account</Link></small></p>

                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;