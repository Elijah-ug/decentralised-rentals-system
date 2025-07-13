import { autoConnectWallet } from '@/auth/autoConnectWalletThunk';
import { fetchReceiptThunk } from '@/features/public/receipts/receiptThunk';
import { fetchReturnAllProperties } from '@/features/public/view/propertyThunk';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Receipts() {
    const { address } = useSelector((state) => state.wallet);
  const { userReceipt } = useSelector((state) => state.receipt);
  const { properties } = useSelector((state) => state.allProperties);

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchReceiptThunk());
      dispatch(fetchReturnAllProperties());
    }, [])
    console.log("receiptuserReceipt: ", properties);
  console.log("receiptuserReceipt: ", userReceipt);
  // const propId =
  const isBidder = properties?.filter((property) => property.requestedBy.toLowerCase() === address.toLowerCase())
 const price = isBidder.map((pr) => pr.rentAmount)

  return (
      <div>
      {userReceipt.isSigned &&(
        <div className="flex flex-col bg-gray-500 p-2 rounded">
                  <h4 className="text-center text-amber-500 font-bold">RECEIPT</h4>
                {/* Landlord */}
                              <div >
                    <span className="text-amber-400 pr-2 font-bold">Landlord:</span>
                  <span className="text-sm">
                      {userReceipt?.landlord?.slice(0, 7)}...{userReceipt?.landlord?.slice(-5)}
                  </span>
              </div>
              {/* Landlord */}
              <div >
                    <span className="text-amber-400 pr-2 font-bold">Tenant:</span>
                    <span className="text-sm">
                    {userReceipt?.tenant?.slice(0, 7)}...{userReceipt?.tenant?.slice(-5)}
                    </span>
              </div>

                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Property:</span>
                    <span className=" text-sm">{userReceipt.isReleased? "released" : "withheld"}</span>
              </div>
              <div>
                    <span className="text-amber-400 pr-2 font-bold">PropertyId:</span>
                  <span className=" text-sm">
                      {userReceipt?.propertyId ? (Number(userReceipt.propertyId)) : "N/A"}</span>
                  </div>
                  {/* address */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rent Price:</span>
                    <span className="text-sm">{price}ETH</span>
                    </div>
                    {/* rntal payment status */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rental Paid:</span>
                    <span className="text-sm"> {userReceipt.isPaid? "✅" : "Unpaid"}</span>
                    </div>

                    {/* start date */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Start Date:</span>
                    <span className="text-sm">{userReceipt.startDate}</span>
                    </div>
                    {/* end date */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">End Date:</span>
                    <span className="text-sm">{userReceipt.endDate}</span>
              </div>
              {/* signed */}
              <div >
                    <span className="text-amber-400 pr-2 font-bold">Signed:</span>
                    <span className="text-sm">{userReceipt.isSigned? "✅": "Unsigned"}</span>
              </div>
              </div>)}
    </div>
  )
}
