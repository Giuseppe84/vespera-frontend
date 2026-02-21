import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total Clients</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">124</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Services</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">32</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Payments</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">€4,580</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>✔ New client created</p>
          <p>✔ Payment received</p>
          <p>✔ Service updated</p>
        </CardContent>
      </Card>
    </div>
  )
}