import { useSelector } from "react-redux"

export const TrendingProperties = () => {
  const { properties } = useSelector((state) => state.wallet);
  return (
    <div>
      <div className="my-4 mx-10">
         <div className="grid grid-cols-3 gap-4">
          {properties?.map((property, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.propertyId}</h2>
            <p><strong>Landlord:</strong> {property?.landlord?.slice(0, 6)}...{property?.landlord?.slice(-4)}</p>
            <p><strong>Location:</strong> {property?.location}</p>
            <p><strong>Rent:</strong> {formatEther(property?.rentAmount)} ETH</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={property?.isOccupied ? "text-red-500" : "text-green-600"}>
                {property?.isOccupied ? "Occupied" : "Available"}
              </span>
            </p>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}
