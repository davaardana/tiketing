import { BadgeCheck, Clock3, MessageSquare } from 'lucide-react';

import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';

const tickets = [
  {
    id: 'TK-4312',
    subject: 'API integration timing out',
    customer: 'Acme Fintech',
    priority: 'High',
    assignee: 'Jordan Lee',
    status: 'Awaiting Reply',
    updatedAt: '3m ago'
  },
  {
    id: 'TK-4311',
    subject: 'Bulk import stuck in processing',
    customer: 'Northwind Logistics',
    priority: 'High',
    assignee: 'Priya Patel',
    status: 'In Progress',
    updatedAt: '18m ago'
  },
  {
    id: 'TK-4310',
    subject: 'Unable to invite teammates',
    customer: 'Stratus Media',
    priority: 'Medium',
    assignee: 'Abigail Evans',
    status: 'Waiting on Customer',
    updatedAt: '26m ago'
  },
  {
    id: 'TK-4309',
    subject: 'SAML configuration help',
    customer: 'Orbit Enterprise',
    priority: 'Low',
    assignee: 'Diego Morales',
    status: 'Solved',
    updatedAt: '1h ago'
  }
];

const priorityStyles: Record<string, string> = {
  High: 'bg-red-500/10 text-red-300',
  Medium: 'bg-amber-500/10 text-amber-300',
  Low: 'bg-emerald-500/10 text-emerald-300'
};

const Tickets = () => (
  <div className="space-y-6">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">Active tickets</h1>
        <p className="text-sm text-slate-400">Stay close to at-risk conversations and outstanding SLA commitments.</p>
      </div>
      <Button size="sm">New ticket</Button>
    </header>

    <Card className="border-slate-800/80 bg-slate-900/60">
      <CardHeader>
        <CardTitle>Live queue</CardTitle>
        <CardDescription>Focus on work that requires attention right now.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="py-3">Ticket</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Priority</th>
              <th className="py-3">Owner</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="transition hover:bg-slate-800/40">
                <td className="py-3 font-medium text-slate-200">
                  <div className="flex flex-col">
                    <span>{ticket.subject}</span>
                    <span className="text-xs text-slate-400">{ticket.id}</span>
                  </div>
                </td>
                <td className="py-3 text-slate-300">{ticket.customer}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 text-slate-300">{ticket.assignee}</td>
                <td className="py-3">
                  <span className="flex items-center gap-2 text-xs text-slate-300">
                    <MessageSquare className="h-4 w-4 text-brand" />
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 text-right text-slate-400">{ticket.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>

    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Resolution progress</CardTitle>
          <CardDescription>Maintain focus on SLA breaches approaching within the hour.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
            <div>
              <p className="font-medium text-slate-100">Critical backlog sweep</p>
              <p className="text-xs text-slate-400">3 workflows triggered • 92% completion</p>
            </div>
            <BadgeCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
            <div>
              <p className="font-medium text-slate-100">Regional escalation</p>
              <p className="text-xs text-slate-400">SLA at risk in 42 minutes</p>
            </div>
            <Clock3 className="h-5 w-5 text-amber-300" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-slate-800/80 bg-slate-900/60">
        <CardHeader>
          <CardTitle>Workflow actions</CardTitle>
          <CardDescription>Deploy AI assisted responses and automated hand-offs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-between text-slate-200">
            Launch AI response coach <span className="text-xs text-slate-500">2 new suggestions</span>
          </Button>
          <Button variant="ghost" className="w-full justify-between text-slate-200">
            Open escalation room <span className="text-xs text-slate-500">Live</span>
          </Button>
          <Button variant="ghost" className="w-full justify-between text-slate-200">
            Generate status digest <span className="text-xs text-slate-500">3 teams subscribed</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Tickets;
