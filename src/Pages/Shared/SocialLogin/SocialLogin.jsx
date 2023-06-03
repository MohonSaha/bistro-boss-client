import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/authProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);

            navigate(from, { replace: true })

        })
        .catch(err => console.log(err))
    }


    return (
        <div className="text-center mt-4 mb-3">
            <div className="divider">OR</div>

            <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;