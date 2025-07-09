import { connectWallet } from '@/auth/walletThunk';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ConnectWallet() {
  const { address, chainId } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  return (
      <div>
          <div className="text-end">
        {!address ? (
          <Button onClick={dispatch(connectWallet())}
          className="bg-green-400 w-26 hover:bg-green-300 cursor-pointer"
        >Connect Wallet</Button>) :
          <span className="bg-blue-500 py-1 px-3 rounded">
            {address.slice(0, 7)}...{address.slice(-5)}</span>
        }
           </div>
      </div>
  )
}
