import React, { useEffect } from 'react'
import Withdraw from '../public/Withdraw'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLandlordProfile} from '@/features/landlord/profile/landlordProfileThunk'
import { autoConnectWallet } from '@/auth/autoConnectWalletThunk'
import { FaRegRegistered } from 'react-icons/fa'
import { MdArrowBack } from 'react-icons/md'
import { IoMdNotificationsOutline } from "react-icons/io";
import { fetchReturnAllProperties } from '@/features/public/view/propertyThunk'


export default function LandlordDashboard() {
  const { profile } = useSelector((state) => state.landlord);
  const { address } = useSelector((state) => state.wallet);
  const { properties } = useSelector((state) => state.allProperties);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLandlordProfile());
    // dispatch(autoConnectWallet());
    dispatch(fetchReturnAllProperties())
    console.log(profile)
  }, [address])
  const isRequested = properties.some((property) => property.tenantRequest && !property.isOccupied );
  console.log(isRequested)
  return (
    <div className="mx-10 my-4 relative">
      <h3 className="text-lg font-bold  text-center mb-6">Registered Landlord's Dashboard</h3>
      <div className=" flex items-center justify-end mb-1 relative">
        <IoMdNotificationsOutline size={20} />
        { isRequested && <span
          className="w-2.5 h-2.5 inline-block text-center text-sm absolute bottom-2 right-3 rounded-full bg-green-400 content-none"
        ></span>}
      </div>
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
          {isRequested && (<p className="mt-5 text-green-400">NOTE: You have a new request</p>)}
        </div>
        <div className="border-l-2 border-gray-400 h-62"> </div>
        <div className="flex gap-4">
         <Withdraw />
        </div>
      </div>
      <div className="flex flex-col gap-4">
       <Link to="/forms"
            className="font-bold text-amber-400 flex items-center gap-1" >
            <span>Registere Property</span>
            <FaRegRegistered className="text-white" />
      </Link>
      <Link to="/forms"
            className="font-bold text-amber-400 flex items-center gap-1" >
            <span>Sign Receipt</span>
            <FaRegRegistered className="text-white" />
        </Link>
      </div>
      <div className="p-2 absolute right-20 bottom-4">
                <Link to="/landlord-properties"
                        className="font-bold flex items-center gap-1" >
                        <MdArrowBack size={20} />
                        <span>Your properties</span>
                  </Link>
                </div>

    </div>
  )
}
