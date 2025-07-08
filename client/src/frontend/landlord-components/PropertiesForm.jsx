import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { fetchRegisterProperties } from '@/features/landlord/assets/register/registerPropertiesThunk';
import { Label } from '@radix-ui/react-label'
import { parseEther } from 'ethers';
import  { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function PropertiesForm() {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const dispatch = useDispatch();

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

  const handleSignRent = () => {
    if (!duration || isNaN(duration)) {
      console.log("invalid duration, not a number");
    }
    console.log(duration)
    setDuration("")
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
  </div>

  {/* Rental Assignment Card */}
        <div className="grid w-full max-w-sm items-center gap-2 p-4 border rounded-lg shadow">
        <h3 className="text-center font-bold text-amber-400">Sign Rent</h3>
          <Label htmlFor="days">Rent Duration (days)</Label>
          <Input value={duration} onChange={(e) => setDuration(e.target.value)}
            id="days" type="number" placeholder="30 days" />

          <Button onClick={handleSignRent}
            type="submit" className="w-full">Sign Rent
          </Button>
  </div>
</div>

    </div>
  )
}
