import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { fetchRegisterProperties } from '@/features/landlord/assets/register/registerPropertiesThunk';
import { fetchSignReceipt } from '@/features/landlord/assets/rent/sign/signReceiptThunk';
import { fetchLandlordProfile } from '@/features/landlord/profile/landlordProfileThunk';
import { fetchTenantProfile } from '@/features/tenant/profile/tenantProfileThunk';
import { Label } from '@radix-ui/react-label'
import { parseEther, parseUnits } from 'ethers';
import  { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PropertiesForm() {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLandlordProfile());
    dispatch(fetchTenantProfile());
  }, [])
  // register property
  const handleRegisterProperty = () => {
    if (!amount || isNaN(amount)) {
      console.log("Invalid Amount");
      return;
    }
    try {
      const parsedAmount = parseEther(amount);
      dispatch(fetchRegisterProperties({ location, name, amount: parsedAmount }));
      console.log(typeof(parsedAmount));
      setAmount("");
      setLocation("");
      setName("");
    } catch (error) {
      console.log(error.message);
    }
  }
  // sign property
  const handleSignRent = () => {
    if (!durationInDays || isNaN(durationInDays)) {
      console.log("invalid durationInDays, not a number");
    }
    if (!propertyId || isNaN(propertyId)) {
      console.log("invalid property id, not a number");
    }
    const toBigNum = parseUnits(durationInDays.toString(), 0);
    const parsedId = parseUnits(propertyId.toString(), 0);
    dispatch(fetchSignReceipt({propertyId: parsedId , durationInDays: toBigNum }));
    console.log(typeof (toBigNum), toBigNum);
    console.log(typeof (parsedId), parsedId);
    setDurationInDays("");
    setPropertyId("");
  }
  return (
    <div>
      <div className="flex justify-center my-10 gap-6">
  {/* Property Registration Card */}
        <div className="grid w-full max-w-sm items-center gap-3 p-4 border rounded-lg shadow">
          <h3 className="text-center font-bold text-amber-400">Property Registration</h3>

          <Label htmlFor="location">Location</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)}
            id="location" placeholder="Ex: Kira Rd" />

         <Label htmlFor="propertyName">Property Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)}
            id="propertyName" placeholder="Ex: Kireka Villas" />

          <Label htmlFor="rent">Rent Amount (UGX)</Label>
           <Input value={amount} onChange={(e) => setAmount(e.target.value)}
            id="rent" type="number" placeholder="500000" />

          <Button onClick={handleRegisterProperty}
            type="submit" className="w-full">Register Property
          </Button>

          <div className="pt-2 text-center">
          <Link to="/landlord-dashboard"
            className="text-blue-400 hover:underline font-medium flex items-center justify-center gap-1">
            <MdArrowBack size={18} />
            <span>Back to Dashboard</span>
            </Link>
          </div>
     </div>
    </div>
    </div>
  )
}


  {/* Rental receipt signature Card */}
//   <div className="grid w-full max-w-sm items-center gap-2 p-4 border rounded-lg shadow">
//   <h3 className="text-center font-bold text-amber-400">Sign Rent</h3>
//     <Label htmlFor="days">Rent durationInDays (days)</Label>
//     <Input value={propertyId} onChange={(e) => setPropertyId(e.target.value)}
//       id="id" type="number" placeholder="Enter id eg. 1" />

//     <Label htmlFor="days">Rent durationInDays (days)</Label>
//     <Input value={durationInDays} onChange={(e) => setDurationInDays(e.target.value)}
//       id="days" type="number" placeholder="30 days" />

//     <Button onClick={handleSignRent}
//       type="submit" className="w-full">Sign Rent
//     </Button>

//     <div className="pt-2 text-center">
//           <Link to="/landlord-dashboard"
//             className="text-blue-400 hover:underline font-medium flex items-center justify-center gap-1">
//             <MdArrowBack size={18} />
//             <span>Back to Dashboard</span>
//           </Link>
//         </div>
// </div>
