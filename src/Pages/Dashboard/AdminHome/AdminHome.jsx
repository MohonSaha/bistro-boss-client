import useAuth from "../../../hooks/useAuth";


const AdminHome = () => {
    const {user} = useAuth()
    return (
        <div className="w-full px-14 mt-20">
            <h2 className="text-3xl font-semibold">Wellcome Back, {user?.displayName}</h2>
        </div>
    );
};

export default AdminHome;