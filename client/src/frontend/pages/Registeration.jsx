import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fetchRegisterLandlord } from '@/features/landlord/auth/registerLandlordThunk'
import { fetchRegisterTenant } from '@/features/tenant/auth/registerTenantThunk'

export default function Registeration() {

  const dispatch = useDispatch();
  const handleRegisterLandlord = () => {
    dispatch(fetchRegisterLandlord())
  }
  const handleRegisterTenant = () => {
    dispatch(fetchRegisterTenant())
  }
  return (
      <div>
          <div className="mx-10 my-6">
              <p className="text-center mb-4">Registration Guidelines</p>
              <div className="flex justify-center gap-8">
                  {/* landlord */}
                  <Card className="w-full max-w-sm">
                  <CardHeader>
                  <CardTitle>Landlord Guide</CardTitle>
                  <CardDescription>
                  This' a simple guide for Landlord Registration
                </CardDescription>
              </CardHeader>
                      <CardContent>
                          <p>By clicking the register button below, you will be recognised
                              as one of the landlords on the platform. There after you'll
                              move on to add your rental proerties, rent price, property
                              name and location for tenants to rent. </p>
                     </CardContent>
              <CardFooter className="flex-col gap-2">
              <Button onClick={handleRegisterLandlord}
                type="submit" className="w-full">Register Here As Landlord</Button>
              </CardFooter>
                  </Card>
                  {/* tenant */}
                  <Card className="w-full max-w-sm">
                  <CardHeader>
                  <CardTitle>Tenant Guide</CardTitle>
                  <CardDescription>
                  This' a simple guide for Tenant Registration
                </CardDescription>
              </CardHeader>
                      <CardContent>
                          <p>By clicking the register button below, you will be recognised
                              as one of the tenants on the platform. This will give you an opportunity
                              to navigate through the available rental properties and prices, which will further
                              guide you to make the best choice.</p>
                      </CardContent>
              <CardFooter className="flex-col gap-2">
              <Button onClick={handleRegisterTenant}
                type="submit" className="w-full">Register As Tenant</Button>
              </CardFooter>
    </Card>
              </div>
      </div>
      <div className="p-2 absolute left-20 bottom-20">
          <Link to="/"
                  className="font-bold flex items-center gap-1" >
                  <MdArrowBack size={20} />
                  <span>back</span>
            </Link>
          </div>
    </div>
  )
}
