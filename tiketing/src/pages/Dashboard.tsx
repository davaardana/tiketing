import { Activity, AlertCircle, ArrowRightCircle, BarChart3, CheckCircle, Clock3 } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/accordion';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/card';
import { formatCurrency, formatTrend } from '@/lib/utils';

const metrics = [
  { label: 'Open Tickets', value: 42, trend: -8.4, icon: Activity },
  { label: 'Avg. Resolution Time', value: '3h 15m', trend: -4.3, icon: Clock3 },
  { label: 'Customer Satisfaction', value: '92%', trend: 2.6, icon: CheckCircle },
  { label: 'Escalations', value: 5, trend: -1.5, icon: AlertCircle }
];

const revenue = [
  { month: 'July', value: 18200 },
  { month: 'August', value: 21900 },
  { month: 'September', value: 23500 },
  { month: 'October', value: 28100 }
];

const Dashboard = () => (
  <div className="space-y-8">
    <header>
      <h1 className="text-2xl font-semibold text-white">Operations overview</h1>
      <p className="text-sm text-slate-400">Monitor performance, SLA trends, and customer sentiment in one place.</p>
    </header>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label} className="border-slate-800/80 bg-slate-900/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{metric.label}</CardTitle>
              <Icon className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent className="text-2xl font-bold text-white">{metric.value}</CardContent>
            <CardFooter className="mt-4 text-xs text-slate-400">
              <span className={metric.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}>{formatTrend(metric.trend)}</span>
              <span className="ml-1">vs last period</span>
            </CardFooter>
          </Card>
        );
      })}
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Monthly revenue impact</CardTitle>
          <CardDescription>Closed tickets attributed to revenue enablement programs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {revenue.map((item) => (
            <div key={item.month} className="grid grid-cols-[120px_1fr] items-center gap-4 text-sm">
              <span className="text-slate-400">{item.month}</span>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${(item.value / 30000) * 100}%` }} />
                </div>
                <span className="w-20 text-right font-medium text-slate-200">{formatCurrency(item.value)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Automation opportunities</CardTitle>
          <CardDescription>AI suggested workflows that remove manual effort.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="sla">
              <AccordionTrigger>Proactive SLA breach alerts</AccordionTrigger>
              <AccordionContent>
                Use machine learning predictions to alert owners of potential breaches two hours before they happen.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="csat">
              <AccordionTrigger>Sentiment based prioritisation</AccordionTrigger>
              <AccordionContent>
                Route highly negative customer sentiment tickets to a dedicated recovery squad for faster responses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="handoff">
              <AccordionTrigger>Automated team handoffs</AccordionTrigger>
              <AccordionContent>
                Trigger workflow transitions when dependencies are resolved, reducing manual coordination work.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="text-brand">
            View automation playbook <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
);

export default Dashboard;
