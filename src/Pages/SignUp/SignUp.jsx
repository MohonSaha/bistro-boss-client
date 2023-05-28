import { useForm } from "react-hook-form";


const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
    };




    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("name", { required: true, maxLength: 20, minLength: 6 })} name="name" placeholder="name" className="input input-bordered" />

                                {errors.name && <span className="text-red-500 mt-2">This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { 
                                    required: true, 
                                    maxLength: 20, 
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                      })} type="password" name="password" placeholder="password" className="input input-bordered" />

                                {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}

                                {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase, one lowercase, one numer and one special charecter.</p>}

                                {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 charecters.</p>}

                                {errors.password?.type === 'maxLength' && <p className="text-red-500">Password must be less then 20 charecters.</p>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignIn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;