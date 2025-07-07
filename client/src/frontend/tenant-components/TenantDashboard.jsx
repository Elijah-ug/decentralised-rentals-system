import React, { useEffect } from 'react'
import TenantDeposit from './TenantDeposit'
import Withdraw from '../public/Withdraw'
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTenantProfile } from '@/features/tenant/profile/tenantProfileThunk'
import { autoConnectWallet } from '@/auth/autoConnectWalletThunk'

export default function TenantDashboard() {
  const dispatch = useDispatch()
  const { tenantProf } = useSelector((state) => state.tenant);
  const { address } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(autoConnectWallet());
    dispatch(fetchTenantProfile());
  }, [])
  console.log(address);
  console.log(tenantProf)
  return (
    <div className="mt-4">
      {/* tenant profiles */}
      <div className="tenant-profiles">
        <h2 className="text-semibold text-center text-2xl mb-2">Registered Tenant's Dashboard</h2>
        <div className="flex justify-around">
          <div className="flex-col gap-2">
            {/* address */}
            <h4 className="text-center text-blue-400">User Details</h4>
          <div >
            <span className="text-amber-400 mr-2">Address:</span>
            <span className="text-lg font-bold">{tenantProf?.user?.slice(0, 7)}...{tenantProf?.user?.slice(-5)}</span>
          </div>
           {/* balance */}
           <div >
            <span className="text-amber-400 pr-2">Balance:</span>
            <span className="text-lg font-bold">{tenantProf.balance} ETH</span>
          </div>
           {/* address */}
           <div >
            <span className="text-amber-400 pr-2">Currently Renting:</span>
            <span className="text-lg font-bold">{tenantProf?.hasActiveRent? "✅" : "No"}</span>
            </div>
          </div>
          {/* Rental details here */}

          <div className="flex-col gap-2">
          <h4 className="text-center text-blue-400">Rent Details</h4>
            {/* rented property */}
          <div >
            <span className="text-amber-400 pr-2">Property:</span>
            <span className="text-lg font-bold">House</span>
          </div>
          {/* address */}
          <div >
            <span className="text-amber-400 pr-2">Rent Price:</span>
            <span className="text-lg font-bold">0.002ETH</span>
            </div>
            {/* rntal payment status */}
          <div >
            <span className="text-amber-400 pr-2">Rental Paid:</span>
            <span className="text-lg font-bold">✅</span>
            </div>
          {/* address */}
          <div >
            <span className="text-amber-400 pr-2">Currently Renting:</span>
            <span className="text-lg font-bold">✅</span>
            </div>
            {/* start date */}
          <div >
            <span className="text-amber-400 pr-2">Start Date:</span>
            <span className="text-lg font-bold">08/7/2025</span>
            </div>
            {/* end date */}
          <div >
            <span className="text-amber-400 pr-2">End Date:</span>
            <span className="text-lg font-bold">08/8/2025</span>
            </div>
            {/* end date */}
          <div >
            <span className="text-amber-400 pr-2">Landlord:</span>
            <span className="text-lg font-bold">0x000...</span>
            </div>
            </div>
        </div>
      </div>
      <hr />
      {/* children components */}
      <div className="flex items-center justify-center ">
      <div className=" w-lg p-2">
      <div className="text-center py-1">
        <NavLink className="mr-3" to="deposit">Deposit</NavLink>
        <NavLink className="ml-3" to="withdraw">Withdraw</NavLink>
      </div>
        <Outlet />
        </div>
        </div>
    </div>
  )
}
