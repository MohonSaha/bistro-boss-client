import { FaBook, FaCalendar, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {

    const [cart] = useCart()


    // TODO: Load data from the server to have dynamic isAdmin based on data.
    // const isAdmin = true;
    const [isAdmin] = useAdmin()


    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side ]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-[#D1A054]">

                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/home'> <FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItem'> <FaUtensils></FaUtensils> Add Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'> <FaWallet></FaWallet> Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/history'> <FaBook></FaBook> Manage Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'> <FaUsers></FaUsers> All users</NavLink></li>

                            </> : <>

                                <li><NavLink to='/dashboard/home'> <FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservations'> <FaCalendar></FaCalendar> Reservations</NavLink></li>
                                <li><NavLink to='/dashboard/history'> <FaWallet></FaWallet> Payment History</NavLink></li>
                                <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart> My Cart
                                    <span className="badge badge-secondary">+{cart?.length || 0}</span>
                                </NavLink></li>
                            </>
                        }

                        <div className="divider">OR</div>

                        <li><NavLink to='/'><FaHome></FaHome> Home </NavLink></li>
                        <li><NavLink to='/menu'><FaHome></FaHome> Menu</NavLink></li>
                        <li><NavLink to='/contract'><FaHome></FaHome> Shop</NavLink></li>
                        <li><NavLink to='/contract'><FaHome></FaHome>  Contract</NavLink></li>
                    </ul>

                </div>
            </div>
        </div >
    );
};

export default Dashboard;