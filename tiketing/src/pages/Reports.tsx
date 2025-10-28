import { Download, LineChart, PieChart } from 'lucide-react';

import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { formatTrend } from '@/lib/utils';

const kpis = [
  { label: 'First response time', current: '12m', target: '15m', trend: -3.4 },
  { label: 'Resolution SLA', current: '93%', target: '90%', trend: 1.1 },
  { label: 'Customer CSAT', current: '4.6 / 5', target: '4.4 / 5', trend: 0.2 }
];

const segments = [
  { name: 'Enterprise', share: 52 },
  { name: 'Mid-market', share: 33 },
  { name: 'Growth', share: 15 }
];

const Reports = () => (
  <div className="space-y-6">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">Executive reporting</h1>
        <p className="text-sm text-slate-400">Share performance metrics with stakeholders and leadership.</p>
      </div>
      <Button size="sm">
        <Download className="mr-2 h-4 w-4" /> Export summary
      </Button>
    </header>

    <Card className="border-slate-800/80 bg-slate-900/60">
      <CardHeader>
        <CardTitle>SLA scorecard</CardTitle>
        <CardDescription>Where service levels are pacing against quarterly targets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-100">{kpi.label}</p>
                <p className="text-xs text-slate-500">Target {kpi.target}</p>
              </div>
              <span className={`text-xs font-semibold ${kpi.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatTrend(kpi.trend)}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, (parseFloat(kpi.current) / parseFloat(kpi.target)) * 100)}%` }} />
              </div>
              <span className="text-xs text-slate-400">Current {kpi.current}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Volume by segment</CardTitle>
          <CardDescription>Ticket submissions by account tier across the quarter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          {segments.map((segment) => (
            <div key={segment.name} className="flex items-center justify-between">
              <span>{segment.name}</span>
              <div className="flex w-48 items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${segment.share}%` }} />
                </div>
                <span className="w-10 text-right text-xs text-slate-400">{segment.share}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Forecast snapshot</CardTitle>
          <CardDescription>Projected backlog and SLA attainment based on current trends.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-brand" />
              <div>
                <p className="font-medium text-slate-100">Backlog trending down 12%</p>
                <p className="text-xs text-slate-500">Expected to hit target band by mid-quarter.</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <PieChart className="h-5 w-5 text-brand" />
              <div>
                <p className="font-medium text-slate-100">Automations covering 46% volume</p>
                <p className="text-xs text-slate-500">Additional playbooks could increase coverage to 60%.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Reports;
