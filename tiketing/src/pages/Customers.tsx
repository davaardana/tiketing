import { Building2, MapPin } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { formatTrend } from '@/lib/utils';

const customers = [
  {
    company: 'Acme Fintech',
    owner: 'Maya Thompson',
    seats: 84,
    location: 'Chicago, USA',
    trend: 6.2,
    plan: 'Enterprise'
  },
  {
    company: 'Northwind Logistics',
    owner: 'Diego Morales',
    seats: 64,
    location: 'Berlin, Germany',
    trend: -1.8,
    plan: 'Enterprise'
  },
  {
    company: 'Stratus Media',
    owner: 'Hannah Chen',
    seats: 28,
    location: 'Austin, USA',
    trend: 3.1,
    plan: 'Growth'
  },
  {
    company: 'Orbit Enterprise',
    owner: 'Zara Patel',
    seats: 45,
    location: 'Singapore',
    trend: 1.4,
    plan: 'Enterprise'
  }
];

const Customers = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-2xl font-semibold text-white">Customer health</h1>
      <p className="text-sm text-slate-400">Spot expansion opportunities and accounts needing a recovery plan.</p>
    </header>

    <Card className="border-slate-800/80 bg-slate-900/60">
      <CardHeader>
        <CardTitle>Account roster</CardTitle>
        <CardDescription>Track ownership, sentiment and seat usage across top accounts.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {customers.map((customer) => (
          <div key={customer.company} className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-100">{customer.company}</p>
                <p className="text-xs text-slate-500">{customer.plan} plan</p>
              </div>
              <span className={`text-xs font-medium ${customer.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatTrend(customer.trend)}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" /> {customer.seats} active seats
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {customer.location}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
              <div>
                <p className="text-xs text-slate-400">Success owner</p>
                <p className="text-sm font-medium text-slate-200">{customer.owner}</p>
              </div>
              <button className="text-xs text-brand hover:underline">View account</button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-slate-800/80 bg-slate-900/60">
      <CardHeader>
        <CardTitle>Engagement signals</CardTitle>
        <CardDescription>Keep an eye on product usage and executive touchpoints.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-wide text-slate-500">Product adoption</p>
          <p className="mt-2 text-2xl font-semibold text-white">76%</p>
          <p className="mt-1 text-xs text-slate-500">Weekly active seats across the managed book.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-wide text-slate-500">Executive touches</p>
          <p className="mt-2 text-2xl font-semibold text-white">14</p>
          <p className="mt-1 text-xs text-slate-500">QBRs scheduled this quarter with expansion potential.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-wide text-slate-500">Risk accounts</p>
          <p className="mt-2 text-2xl font-semibold text-white">3</p>
          <p className="mt-1 text-xs text-slate-500">Flagged for churn mitigation workflows.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Customers;
