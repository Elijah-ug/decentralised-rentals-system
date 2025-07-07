import { Link, NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-3 bg-gray-900 text-white">
      <div className="font-bold">
        <Link to="/">DRS</Link>
      </div>
      <div className="flex gap-8 text-md ">
         <NavLink to="/">Home</NavLink>
         <NavLink to="landlord-dashboard">Landlord Dashboard</NavLink>
         <NavLink to="tenant-dashboar">Tenant Dashboard</NavLink>
         <NavLink to="trending-properties">Trending Properties</NavLink>
        {/* <NavLink to="withdraw">Withdraw</NavLink> */}
      </div>
    </div>
  )
}
