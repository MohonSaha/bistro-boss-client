import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleDelete = user =>{
        console.log(user);
    }

    const handleMakeAdmin = user =>{
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                refetch();
                alert(`WOW!! ${user.name} is an admin now!!!`)
            }
        })
    }


    return (
        <div className="w-full px-16">
            <h2 className="text-3xl font-semibold my-5">Total: {users.length}</h2>

            <div className="overflow-x-auto ">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    user.role === 'admin' ? 'admin' : 
                                    <button onClick={()=>handleMakeAdmin(user)} className="btn btn-ghost hover:text-red-500 bg-red-500 btn-circle text-white"><FaUserShield className=""></FaUserShield></button>
                                    }</td>
                                <td><button onClick={() => handleDelete(user)} className="btn btn-ghost hover:text-red-500 bg-red-500 btn-circle text-white"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;