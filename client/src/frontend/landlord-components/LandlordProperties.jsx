import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { fetchPropertyRentRequest } from "@/features/tenant/request/rentRequestThunk";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Receipts from "../public/Receipts";
import { autoConnectWallet } from "@/auth/autoConnectWalletThunk";
import { fetchReceiptThunk } from "@/features/public/receipts/receiptThunk";

export const LandlordProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { tenantProf } = useSelector((state) => state.tenant);
  const { address } = useSelector((state) => state.wallet);
  const { userReceipt } = useSelector((state) => state.receipt);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReceiptThunk())
    dispatch(fetchReturnAllProperties());
    console.log(address);
  }, [])

  const isOwner = properties.some(
    (property) => property?.landlord?.toLowerCase() === address?.toLowerCase());
  console.log("userReceipt.propertyId: ", userReceipt.propertyId)

  return (
    <div>
      <div className="my-4 mx-10">
        <div className="">
         <div className="grid grid-cols-1 gap-4">
            { isOwner?
              (properties?.map((property, index) => (
                <div key={index}
                  className="flex justify-center gap-4 rounded bg-gray-800 p-4 hover:shadow-xl transition-all">
                  {/* property card */}
          <div  className="w-1/2 bg-gray-600 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.propertyId}</h2>
              <p className="flex gap-2">
                <strong>Landlord:</strong>
                <span>{property?.landlord?.slice(0, 6)}...{property?.landlord?.slice(-4)}</span>
              </p>

              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.name}</span></p>
              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
            <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} ETH</span> </p>


              <div>
                        {/* <span>{property?.tenantRequest ? "Booked" : "Available"}</span>
                        <span>{userReceipt?.propertyId === property.propertyId &&
                          property?.tenantRequest ? "Booked" :
                           "&Paid" : "Not paid"}</span> */}
                        {(() => {
                          const matchedReceipt = userReceipt.propertyId === property.propertyId;
                          const statusText = matchedReceipt
                            ? userReceipt.isPaid ? "Paid" : "Booked" : property.tenantRequest ? "Booked" : "Available";
                          const textColor = statusText === "Paid" ? "text-blue-400" :
                            statusText === "Booked" ? "text-red-400" : "text-green-400";
                          return <div className="flex gap-2">
                            <strong>Status:</strong>
                            <span className={textColor}>{ statusText}</span>
                          </div>
                        })()}
              </div>

              { property.tenantRequest &&(
                <p className="flex gap-2">
                <strong >Bidder:</strong>
                <span>{property?.requestedBy.slice(0, 7)}...{property?.requestedBy.slice(-5)}</span>
                </p>)
              }
              <div>
              <Link to="/forms"
                  className="font-bold  text-green-400 underline right-1/10 top-1/2" >
                  Sign the receipt
            </Link>
                    </div>
                  </div>
                  {isOwner && property.propertyId === userReceipt.propertyId? (
              <div className="w-1/2 bg-gray-700 p-4 rounded-lg">
                    <Receipts />
              </div>) : (<p
                className="w-1/2 bg-gray-600 text-lg flex items-center justify-center ">
                No receipt yet</p>)
                  }
                  
      </div>
          ))): <h3 className="text-xl">You have no properties yet</h3> }

          </div>


          </div>
        {/* link to properties */}
        <div className="p-2 absolute left-20 bottom-20">
          <Link to="/landlord-dashboard"
                  className="font-bold flex items-center gap-1" >
                  <MdArrowBack size={20} />
                  <span>back</span>
            </Link>
          </div>
</div>
    </div>
  )
}
