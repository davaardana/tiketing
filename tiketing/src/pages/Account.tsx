import { FormEvent, useState } from 'react';
import { KeyRound, ShieldCheck, UserCog } from 'lucide-react';

import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { useAuth } from '@/context/AuthContext';

const Account = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [role, setRole] = useState(user?.role ?? '');
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmation('Profile updated. Changes will sync across the workspace.');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Account settings</h1>
        <p className="text-sm text-slate-400">Manage your operator profile and security preferences.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="border-slate-800/80 bg-slate-900/60">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your name and role so collaborators know who is responding.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="role">
                  Role
                </label>
                <input
                  id="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  value={user?.email ?? ''}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-500"
                />
              </div>
              <Button type="submit" size="sm" className="px-6">
                Save changes
              </Button>
              {confirmation && <p className="text-xs text-emerald-400">{confirmation}</p>}
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="border-slate-800/80 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Enable multi-factor authentication to protect access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-brand" />
                <div>
                  <p className="font-medium text-slate-100">Single sign-on enforced</p>
                  <p className="text-xs text-slate-500">Managed through the corporate identity provider.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <KeyRound className="mt-1 h-5 w-5 text-brand" />
                <div>
                  <p className="font-medium text-slate-100">Access tokens rotate every 24h</p>
                  <p className="text-xs text-slate-500">Automation tokens expire automatically if unused.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-800/80 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Workspace directory</CardTitle>
              <CardDescription>Who else has permissions to operate on critical queues.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-100">Jordan Lee</p>
                  <p className="text-xs text-slate-500">Escalations lead</p>
                </div>
                <UserCog className="h-5 w-5 text-brand" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-100">Priya Patel</p>
                  <p className="text-xs text-slate-500">Automation architect</p>
                </div>
                <UserCog className="h-5 w-5 text-brand" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-100">Hannah Chen</p>
                  <p className="text-xs text-slate-500">Customer outcomes</p>
                </div>
                <UserCog className="h-5 w-5 text-brand" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
