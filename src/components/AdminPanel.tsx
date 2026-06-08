import React, { useCallback, useEffect, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell, PieChart, Pie, Legend,
} from 'recharts';
import {
  Lock, Users, Eye, Clock, Activity, Globe, Smartphone, Monitor, Tablet,
  RefreshCw, LogOut, TrendingUp, MousePointerClick, AlertCircle, Loader2,
} from 'lucide-react';

interface Stats {
  generatedAt: number;
  rangeDays: number;
  totals: {
    pageviews: number; uniqueVisitors: number; sessions: number; liveNow: number;
    avgSessionSec: number; avgTimeOnPageSec: number; bounceRate: number;
  };
  timeseries: { date: string; views: number; visitors: number }[];
  devices: { name: string; value: number }[];
  browsers: { name: string; value: number }[];
  os: { name: string; value: number }[];
  topPages: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  referrers: { name: string; value: number }[];
  languages: { name: string; value: number }[];
  recent: { t: number; p: string; dev: string; br: string; os: string; country: string; city: string; ref: string }[];
}

const STATS_URL = '/.netlify/functions/stats';
const PW_KEY = 'dth_admin_pw';
const PALETTE = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

const fmtDur = (sec: number) => {
  if (!sec) return '0δ';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m ? `${m}λ ${s}δ` : `${s}δ`;
};
const fmtTime = (t: number) =>
  new Date(t).toLocaleString('el-GR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const fmtDay = (d: string) => d.slice(5);

const deviceIcon = (d: string) =>
  d === 'mobile' ? <Smartphone className="w-4 h-4" /> : d === 'tablet' ? <Tablet className="w-4 h-4" /> : <Monitor className="w-4 h-4" />;

// ─── KPI card ───
const Kpi: React.FC<{ icon: React.ElementType; label: string; value: string; accent: string; live?: boolean }> = ({
  icon: Icon, label, value, accent, live,
}) => (
  <div className="relative bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 overflow-hidden">
    <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-30 ${accent}`} />
    <div className="flex items-center justify-between mb-3">
      <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent} text-white`}>
        <Icon className="w-5 h-5" />
      </span>
      {live && (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          LIVE
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    <div className="text-sm text-slate-400 mt-1">{label}</div>
  </div>
);

const Panel: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 ${className}`}>
    <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">{title}</h3>
    {children}
  </div>
);

const BarList: React.FC<{ data: { name: string; value: number }[]; emptyLabel?: string }> = ({ data, emptyLabel = '—' }) => {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <p className="text-slate-500 text-sm">{emptyLabel}</p>;
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => (
        <div key={d.name + i}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300 truncate pr-2">{d.name || 'Direct'}</span>
            <span className="text-slate-400 font-medium">{d.value}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-700/60 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: PALETTE[i % PALETTE.length] }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);

  const fetchStats = useCallback(async (pw: string, range: number, silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      const res = await fetch(`${STATS_URL}?days=${range}`, { headers: { Authorization: `Bearer ${pw}` } });
      if (res.status === 401) {
        setError('Λάθος κωδικός πρόσβασης.');
        setAuthed(false);
        sessionStorage.removeItem(PW_KEY);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Σφάλμα (${res.status})`);
      }
      const json = (await res.json()) as Stats;
      setData(json);
      setAuthed(true);
      sessionStorage.setItem(PW_KEY, pw);
    } catch (e) {
      setError(
        e instanceof Error && e.message.includes('Failed to fetch')
          ? 'Τα analytics ενεργοποιούνται μόνο μετά το deploy στο Netlify (Functions + Blobs).'
          : e instanceof Error ? e.message : 'Σφάλμα φόρτωσης.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved) {
      setPassword(saved);
      fetchStats(saved, days);
    }
  }, [fetchStats, days]);

  // Auto-refresh every 30s while authed (live tracking)
  useEffect(() => {
    if (!authed) return;
    const pw = sessionStorage.getItem(PW_KEY);
    if (!pw) return;
    const id = setInterval(() => fetchStats(pw, days, true), 30000);
    return () => clearInterval(id);
  }, [authed, days, fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) fetchStats(password.trim(), days);
  };

  const logout = () => {
    sessionStorage.removeItem(PW_KEY);
    setAuthed(false);
    setData(null);
    setPassword('');
  };

  const changeRange = (r: number) => {
    setDays(r);
    const pw = sessionStorage.getItem(PW_KEY);
    if (pw) fetchStats(pw, r);
  };

  // ─── Login screen ───
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-800/70 border border-slate-700 rounded-3xl p-8 shadow-2xl backdrop-blur">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white text-center mb-1">DevTaskHub Admin</h1>
          <p className="text-sm text-slate-400 text-center mb-6">Πίνακας στατιστικών & live tracking</p>
          <label htmlFor="admin-pw" className="block text-sm text-slate-300 mb-2">Κωδικός πρόσβασης</label>
          <input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            placeholder="••••••••"
          />
          {error && (
            <p className="flex items-start gap-2 text-sm text-red-400 mb-4">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-4 h-4" />}
            Σύνδεση
          </button>
        </form>
      </div>
    );
  }

  const t = data?.totals;

  // ─── Dashboard ───
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-400" /> Analytics Dashboard
            </h1>
            <p className="text-sm text-slate-400">
              Live tracking · Τελευταία ενημέρωση {data ? new Date(data.generatedAt).toLocaleTimeString('el-GR') : '—'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
              {[7, 30, 90].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${days === r ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {r}η
                </button>
              ))}
            </div>
            <button
              onClick={() => { const pw = sessionStorage.getItem(PW_KEY); if (pw) fetchStats(pw, days); }}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Ανανέωση"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-red-600/80 transition-colors"
              aria-label="Αποσύνδεση"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Kpi icon={Activity} label="Online τώρα" value={String(t?.liveNow ?? 0)} accent="bg-emerald-600" live />
          <Kpi icon={Users} label="Μοναδικοί επισκέπτες" value={String(t?.uniqueVisitors ?? 0)} accent="bg-indigo-600" />
          <Kpi icon={Eye} label="Προβολές σελίδων" value={String(t?.pageviews ?? 0)} accent="bg-purple-600" />
          <Kpi icon={MousePointerClick} label="Συνεδρίες" value={String(t?.sessions ?? 0)} accent="bg-pink-600" />
          <Kpi icon={Clock} label="Μ.Ο. χρόνου / συνεδρία" value={fmtDur(t?.avgSessionSec ?? 0)} accent="bg-cyan-600" />
          <Kpi icon={Clock} label="Μ.Ο. χρόνου / σελίδα" value={fmtDur(t?.avgTimeOnPageSec ?? 0)} accent="bg-blue-600" />
          <Kpi icon={TrendingUp} label="Bounce rate" value={`${t?.bounceRate ?? 0}%`} accent="bg-amber-600" />
          <Kpi icon={Globe} label="Χώρες" value={String(data?.countries.length ?? 0)} accent="bg-teal-600" />
        </div>

        {/* Traffic over time */}
        <Panel title="Επισκεψιμότητα ανά ημέρα" className="mb-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.timeseries ?? []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" tickFormatter={fmtDay} stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, color: '#e2e8f0' }} labelStyle={{ color: '#94a3b8' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="views" name="Προβολές" stroke="#6366f1" fill="url(#gViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="visitors" name="Επισκέπτες" stroke="#ec4899" fill="url(#gVisitors)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Devices + Top pages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Panel title="Συσκευές">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.devices ?? []} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                    {(data?.devices ?? []).map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, color: '#e2e8f0' }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Δημοφιλέστερες σελίδες" className="lg:col-span-2">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.topPages ?? []} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={140} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, color: '#e2e8f0' }} cursor={{ fill: '#1e293b' }} />
                  <Bar dataKey="value" name="Προβολές" radius={[0, 6, 6, 0]}>
                    {(data?.topPages ?? []).map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Breakdown lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Panel title="Χώρες"><BarList data={data?.countries ?? []} /></Panel>
          <Panel title="Browsers"><BarList data={data?.browsers ?? []} /></Panel>
          <Panel title="Λειτουργικά"><BarList data={data?.os ?? []} /></Panel>
          <Panel title="Πηγές επισκεψιμότητας"><BarList data={data?.referrers ?? []} /></Panel>
        </div>

        {/* Live recent visits */}
        <Panel title="Πρόσφατες επισκέψεις (live feed)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-700">
                  <th className="py-2 pr-4 font-medium">Ώρα</th>
                  <th className="py-2 pr-4 font-medium">Σελίδα</th>
                  <th className="py-2 pr-4 font-medium">Συσκευή</th>
                  <th className="py-2 pr-4 font-medium">Σύστημα</th>
                  <th className="py-2 pr-4 font-medium">Τοποθεσία</th>
                  <th className="py-2 pr-4 font-medium">Πηγή</th>
                </tr>
              </thead>
              <tbody>
                {(data?.recent ?? []).map((r, i) => (
                  <tr key={i} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                    <td className="py-2.5 pr-4 text-slate-400 whitespace-nowrap">{fmtTime(r.t)}</td>
                    <td className="py-2.5 pr-4 text-white max-w-[200px] truncate">{r.p}</td>
                    <td className="py-2.5 pr-4"><span className="inline-flex items-center gap-1.5 text-slate-300">{deviceIcon(r.dev)} {r.dev}</span></td>
                    <td className="py-2.5 pr-4 text-slate-400 whitespace-nowrap">{r.os} · {r.br}</td>
                    <td className="py-2.5 pr-4 text-slate-400 whitespace-nowrap">{[r.city, r.country].filter(Boolean).join(', ') || '—'}</td>
                    <td className="py-2.5 pr-4 text-slate-400 max-w-[160px] truncate">{r.ref || 'Direct'}</td>
                  </tr>
                ))}
                {!data?.recent.length && (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-500">Καμία επίσκεψη ακόμη.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <p className="text-xs text-slate-600 mt-6 text-center">
          Ανώνυμα, first-party analytics · χωρίς cookies τρίτων · GDPR-friendly
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
