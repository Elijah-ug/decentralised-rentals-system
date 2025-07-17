import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { fetchPropertyRentRequest } from "@/features/tenant/request/rentRequestThunk";

export const TrendingProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { tenantProf } = useSelector((state) => state.tenant);
  const { userReceipt } = useSelector((state) => state.receipt);
  const { address } = useSelector((state) => state.wallet);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReturnAllProperties());
    console.log(properties);
  }, [])

  const handleSendRentRequest = (propertyId) => {
    const parsedProp = propertyId.toString();
    console.log(typeof (propertyId))
    console.log(typeof(parsedProp))

    if (!tenantProf.isRegistered) {
      toast.error("You're not a registered tenant");
    } else if (properties.tenantRequest) {
      toast.error("Property has been booked");
    } else {
      dispatch(fetchPropertyRentRequest({propertyId}))
      console.log("Request sent to the contract");
    }
  }

  return (
    <div>
      <div className="my-4 mx-10">
         <div className="grid grid-cols-3 gap-4">
          {
            properties?.map((property, index) => (
          <div key={index} className="bg-gray-700 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.propertyId}</h2>
              <p className="flex gap-2">
                <strong>Landlord:</strong>
                <span>{property?.landlord?.slice(0, 6)}...{property?.landlord?.slice(-4)}</span>
              </p>

              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
              <p className="flex gap-2"><strong>Property:</strong> <span>{property?.name}</span></p>
            <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} ETH</span> </p>
            <div className="flex gap-2">
              {/* <strong>Status:</strong>{" "}
                  <span
                    className={userReceipt?.propertyId === property.propertyId && userReceipt.isPaid
                    ? "text-red-400" : "text-green-400"}>
                       {property?.tenantRequest ? "Booked" : "Available"}
              </span> */}
                  {(() => {
                          const matchedProperty = userReceipt.propertyId === property.propertyId;
                           const statusText = matchedProperty
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
                {property?.landlord?.toLowerCase() !== address?.toLowerCase() && (
                  <Button
                  onClick={() => handleSendRentRequest(property.propertyId)}
                    type="submit" className=" mt-3">
                    {property.tenantRequest? "Property requested": "Request Property"}
                </Button>)}
                {/* {(() => {
                  const currentProperty = userReceipt.propertyId === property.propertyId;
                  const currentText = currentProperty
                  ?userReceipt.isPaid? "Paid"
                })()} */}


              </div>
            ))
            }
        </div>
        {properties.length === 0 && (<div
          className="text-2xl flex items-center justify-center">No properties in the system yet!</div>)}
</div>
    </div>
  )
}
