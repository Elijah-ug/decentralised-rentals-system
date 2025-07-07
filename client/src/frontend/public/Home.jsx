import React from 'react'
import ConnectWallet from './ConnectWallet'
import { Link } from 'react-router-dom'
import { FaRegRegistered } from "react-icons/fa";


export default function Home() {
  return (
    <div className="p-10">
      <div className="connect">
        <ConnectWallet/>
      </div>
      <h1 className="font-extrabold text-4xl text-center">Decentralized Rental Platform</h1>
      <div className="flex flex-col items-center justify-center mt-5 gap-2">
      <div className=" w-lg">
        <h3 className="font-bold text-lg">How it works</h3>
        <div>
          <h3>Registration</h3>
          <p>
            The user has to register as either a Landlord or a Tenant. A registered landlord
            registers his property and the rent amount any tenant interested in the property must pay.
            An interested tenants places his bid with the knowledge of rent he's going to pay. The first
            tenant to bid for the property will be the one to take the property. After the tenant making a bid
            on a specific property, it is marked as bidded, the it will be left to the owner to
            sign it and the renting period begins
            </p>
          </div>
          </div>
          <div>
            <h4 className="font-semibold">TL;DR</h4>
            <div className="flex flex-col">
              <span>All platform users must be registered, either as a Landlord or tenant</span>
              <span>The landlord registers his property for tenants to rent</span>
              <span>He includes the property name, location, renting period and price </span>
              <span>The tenant makes a bid bid, landlord sees the bid and signs the rent</span>
              <span>After that, the renting period begins and rent payment are auto triggered </span>
              </div>

            </div>
      </div>
      <div>
        <span >Not Registered</span>
      <Link to="register"
        className="font-bold text-amber-400 flex items-center gap-1" >
        <span>Registere here</span>
        <FaRegRegistered className="text-white" />
      </Link>
      </div>

    </div>
  )
}
