import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchSignReceipt } from '@/features/landlord/assets/rent/sign/signReceiptThunk'
import { Label } from '@radix-ui/react-label'
import { parseUnits } from 'ethers'
import { useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function SignReceipt() {
  const [durationInDays, setDurationInDays] = useState("")
  const [propertyId, setPropertyId] = useState("")
  const dispatch = useDispatch()

  const handleSignRent = () => {
    if (!durationInDays || isNaN(durationInDays)) {
      console.log("Invalid durationInDays")
      return
    }
    if (!propertyId || isNaN(propertyId)) {
      console.log("Invalid propertyId")
      return
    }

    const toBigNum = parseUnits(durationInDays.toString(), 0)
    const parsedId = parseUnits(propertyId.toString(), 0)
    dispatch(fetchSignReceipt({ propertyId: parsedId, durationInDays: toBigNum }))
    setDurationInDays("")
    setPropertyId("")
  }

  return (
    <div className=" mt-8 flex items-center justify-center p-6">
      <div className="bg-gray-700 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h3 className="text-center font-bold text-xl text-amber-500">📜 Sign Rental Receipt</h3>

        <div className="space-y-2">
          <Label htmlFor="id" className="text-sm font-medium ">
            Hostel ID
          </Label>
          <Input id="id" type="number" placeholder="Enter Hostel ID e.g. 1" value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="days" className="text-sm font-medium">
            Duration (in days)
          </Label>
          <Input id="days" type="number" placeholder="e.g. 30" value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
          />
        </div>

        <Button onClick={handleSignRent} className="w-full mt-4">
          ✅ Sign Rent
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
  )
}
