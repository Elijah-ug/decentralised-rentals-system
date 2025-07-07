import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

export default function PropertiesForm() {
  return (
    <div>
      <div className="flex justify-center my-10 gap-6">
  {/* Property Registration Card */}
        <div className="grid w-full max-w-sm items-center gap-3 p-4 border rounded-lg shadow">
          <h3 className="text-center font-bold text-amber-400">Property Registration</h3>
    <Label htmlFor="propertyName">Property Name</Label>
    <Input id="propertyName" placeholder="Ex: Kireka Villas" />
    <Label htmlFor="location">Location</Label>
    <Input id="location" placeholder="Ex: Kira Rd" />

    <Label htmlFor="rent">Rent Amount (UGX)</Label>
    <Input id="rent" type="number" placeholder="500000" />
  </div>

  {/* Rental Assignment Card */}
        <div className="grid w-full max-w-sm items-center gap-2 p-4 border rounded-lg shadow">
        <h3 className="text-center font-bold text-amber-400">Sign Rent</h3>
    <Label htmlFor="days">Rent Duration (days)</Label>
    <Input type="number" id="days" placeholder="30 days" />
  </div>
</div>

    </div>
  )
}
