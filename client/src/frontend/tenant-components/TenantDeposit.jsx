import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TenantDeposit() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deposit into your account</CardTitle>
        <CardDescription>
          Deposit below to enjoy the best from the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="number">Amount</Label>
              <Input
                id="number"
                type="number"
                placeholder="0.05 ETH"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Deposit
        </Button>
      </CardFooter>
    </Card>
  )
}
