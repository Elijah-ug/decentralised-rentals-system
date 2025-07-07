import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Withdraw() {
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
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  )
}
