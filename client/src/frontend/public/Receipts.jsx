import { autoConnectWallet } from '@/auth/autoConnectWalletThunk';
import { fetchReceiptThunk } from '@/features/public/receipts/receiptThunk';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Receipts() {
    const { address } = useSelector((state) => state.wallet);
    const { userReceipt } = useSelector((state) => state.receipt);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(autoConnectWallet());
        dispatch(fetchReceiptThunk());
    }, [])
    console.log("receiptuserReceipt: ", userReceipt);
    console.log("receiptuserReceipt: ", address);

    // const isBidder = userReceipt?.tenant?.toLowerCase() === address?.toLowerCase();
    // const isLandlord = userReceipt?.landlord?.toLowerCase() === address?.toLowerCase();
    // console.log("is bidder: ", isBidder)
    // console.log("is bidder: ", isLandlord)
  return (
      <div>
          <div className="flex flex-col bg-gray-500 p-2 rounded">
                  <h4 className="text-center text-amber-500 font-bold">RECEIPT</h4>
              {/* rented userReceipt */}
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

                  {/* <div >
                    <span className="text-amber-400 pr-2 font-bold">Property:</span>
                    <span className=" text-sm">{userReceipt.name}</span>
              </div> */}
              <div>
                    <span className="text-amber-400 pr-2 font-bold">PropertyId:</span>
                  <span className=" text-sm">
                      {userReceipt?.propertyId ? (Number(userReceipt.propertyId) + 1) : ""}</span>
                  </div>
                  {/* address */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rent Price:</span>
                    <span className="text-sm">{userReceipt.rentAmount}ETH</span>
                    </div>
                    {/* rntal payment status */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rental Paid:</span>
                    <span className="text-sm"> Unpaid</span>
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
              </div>
    </div>
  )
}
