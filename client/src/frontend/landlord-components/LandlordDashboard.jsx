import React, { useEffect } from 'react'
import Withdraw from '../public/Withdraw'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLandlordProfile} from '@/features/landlord/profile/landlordProfileThunk'
import { autoConnectWallet } from '@/auth/autoConnectWalletThunk'
import { FaRegRegistered } from 'react-icons/fa'

export default function LandlordDashboard() {
  const { profile } = useSelector((state) => state.landlord);
  const { address } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLandlordProfile());
    dispatch(autoConnectWallet());
    console.log(profile)
  }, [address])
  console.log(profile)
  return (
    <div className="mx-10 my-4">
      <h3 className="text-lg font-bold text-center mb-6">Registered Landlord's Dashboard</h3>
      <hr className="my-2" />
      <div className="flex justify-center gap-12">

        {/* profile */}
        <div className="flex flex-col gap-2">

           {/* address  */}
           <div >
            <span className="text-violet-400 pr-2">Address:</span>
            <span className="text-lg font-bold">{profile?.user?.slice(0, 7)}...{profile?.user?.slice(-5)}</span>
          </div>
           {/* balance */}
           <div >
            <span className="text-violet-400 pr-2">Balance:</span>
            <span className="text-lg font-bold">{profile?.balance} ETH</span>
          </div>
           {/* rented property */}
           {/* <div >
            <span className="text-violet-400 pr-2">Property:</span>
            <span className="text-lg font-bold">House</span>
          </div> */}
           {/* property ownership */}
           <div >
            <span className="text-violet-400 pr-2">Owns Property(ies):</span>
            <span className="text-lg font-bold">{profile?.hasProperties? ("✅") : ("No Property")}</span>
          </div>
          {/* Num of properties */}
          <div >
            <span className="text-violet-400 pr-2">Number of Properties:</span>
            <span className="text-lg font-bold">{}</span>
          </div>

        </div>
        <div className="border-l-2 border-gray-400 h-62"></div>
        <div className="flex gap-4">
         <Withdraw />
        </div>
      </div>

       <Link to="/forms"
            className="font-bold text-amber-400 flex items-center gap-1" >
            <span>Registere Property</span>
            <FaRegRegistered className="text-white" />
       </Link>
    </div>
  )
}
