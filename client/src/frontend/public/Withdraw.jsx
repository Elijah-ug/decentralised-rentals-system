import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchUserWithdraw } from "@/features/public/withdraw/withdrawThunk"
import { parseEther } from "ethers"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const handleWithdraw = () => {

    if (isNaN(amount) || !amount || amount <= 0) {
      console.log("One of the errors happened");
    }
    const parsedAmount = parseEther(amount);
    dispatch(fetchUserWithdraw({ amount: parsedAmount.toString() }));
    console.log(parsedAmount.toString(), typeof (parsedAmount))
    console.log(amount, typeof (amount))
    setAmount("")
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>
          Make a withdraw below, it's fast and simple
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="number">Amount</Label>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)}
                id="number" type="number" placeholder="0.05 ETH" required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleWithdraw} type="submit" className="w-full">
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  )
}
