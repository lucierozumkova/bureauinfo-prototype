import React, { useState } from "react";
import {
  Search, ShieldCheck, AlertTriangle, TrendingDown, TrendingUp, Clock,
  FileText, Code2, History, CheckCircle2, XCircle, HelpCircle, Download,
  Eye, ChevronRight, LogOut, Building2, User, Bell, X, Activity,
  MousePointerClick, RotateCcw, ArrowUpCircle, ArrowLeftRight, BarChart3, Users
} from "lucide-react";

const ANALYST_LIMIT = 10000;

const INK = "#12172B";
const TEAL = "#0F6E63";

const applicants = [
  {
    id: "APP-88312",
    queueStatus: "Not reviewed",
    name: "Radek Fiala",
    dob: "27 Feb 1972",
    address: "Nusle, Prague 4",
    product: "Personal cash loan · EUR 10,000 · 42 months",
    requestedAmount: 10000,
    requestedTerm: 42,
    recommendedOffer: {
      amount: 10000,
      term: 42,
      note: "Recommendation matches the requested amount — a long, stable credit history and low DTI support the full request. Note this sits exactly at your EUR 10,000 approval authority.",
    },
    submitted: "08 Sep 2026, 18:10",
    score: 745,
    band: "Low risk",
    bandColor: "green",
    freshness: "08 Sep 2026, 18:00 (bureau) · 08 Sep 2026, 18:10 (application)",
    reasons: [
      { dir: "pos", text: "15-year credit history, no delinquencies" },
      { dir: "pos", text: "Low debt-to-income ratio" },
      { dir: "neg", text: "One credit enquiry in the last 90 days" },
    ],
    selfDeclared: [
      { label: "Employer", value: "ČEZ a.s." },
      { label: "Employment status", value: "Permanent" },
      { label: "Time with employer", value: "9 years" },
      { label: "Housing situation", value: "Owns outright" },
      { label: "Time at current address", value: "12 years" },
      { label: "Dependents", value: "1 child" },
      { label: "Bank relationship", value: "Primary account, Nordbridge, 6 years" },
    ],
    affordability: {
      salary: 3100,
      housingCost: 0,
      livingExpenses: 780,
      existingDebt: 120,
      newLoanRepayment: 260,
    },
    bureauAccounts: [
      { type: "Credit card", lender: "Komerční banka", status: "Open", balance: "EUR 200 / 3,000 limit" },
      { type: "Personal loan", lender: "Raiffeisen", status: "Closed", balance: "Paid in full, 2021" },
    ],
    enquiries: [
      { date: "20 Jul 2026", lender: "Cetelem", type: "Personal loan enquiry" },
    ],
    behavioral: {
      frictionScore: 14,
      band: "Low friction",
      flags: [
        "Form completed in a single continuous session",
        "No repeated edits on financial fields",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application not yet reviewed", tone: "neutral" },
    ],
  },
  {
    id: "APP-88301",
    queueStatus: "Not reviewed",
    name: "Lucie Prochazkova",
    dob: "15 May 1998",
    address: "Holesovice, Prague 7",
    product: "Personal cash loan · EUR 6,000 · 30 months",
    requestedAmount: 6000,
    requestedTerm: 30,
    recommendedOffer: {
      amount: 5000,
      term: 30,
      note: "Reduced from the requested amount — a thin credit file and a very recent employer change support a smaller exposure until she is past probation.",
    },
    submitted: "08 Sep 2026, 17:52",
    score: 664,
    band: "Medium-low risk",
    bandColor: "amber",
    freshness: "08 Sep 2026, 17:40 (bureau) · 08 Sep 2026, 17:52 (application)",
    reasons: [
      { dir: "neg", text: "First personal loan application — limited credit history" },
      { dir: "neg", text: "Recently changed employer (1 month ago)" },
      { dir: "pos", text: "No negative payment history on record" },
      { dir: "pos", text: "Stable housing — 3 years at current address" },
    ],
    selfDeclared: [
      { label: "Employer", value: "Foodora CZ s.r.o." },
      { label: "Employment status", value: "Permanent, in probation" },
      { label: "Time with employer", value: "1 month" },
      { label: "Housing situation", value: "Renting" },
      { label: "Time at current address", value: "3 years" },
      { label: "Dependents", value: "None" },
      { label: "Bank relationship", value: "New client — no existing account" },
    ],
    affordability: {
      salary: 1750,
      housingCost: 600,
      livingExpenses: 550,
      existingDebt: 0,
      newLoanRepayment: 230,
    },
    bureauAccounts: [
      { type: "Credit card", lender: "Air Bank", status: "Open", balance: "EUR 150 / 1,500 limit" },
    ],
    enquiries: [
      { date: "06 Sep 2026", lender: "Zonky", type: "Personal loan enquiry" },
    ],
    behavioral: {
      frictionScore: 38,
      band: "Low-moderate friction",
      flags: [
        "18s hesitation before entering employer start date",
        "Form completed across two sessions, 2 hours apart",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application not yet reviewed", tone: "neutral" },
    ],
  },
  {
    id: "APP-88213",
    queueStatus: "In review",
    name: "Marta Novakova",
    dob: "14 Mar 1991",
    address: "Vinohrady, Prague 2",
    product: "Personal cash loan · EUR 8,500 · 36 months",
    requestedAmount: 8500,
    requestedTerm: 36,
    recommendedOffer: {
      amount: 7000,
      term: 36,
      note: "Reduced from the requested amount — the debt-to-income ratio and recent enquiry volume suggest a lower exposure is more sustainable for the applicant.",
    },
    submitted: "07 Sep 2026, 14:22",
    score: 712,
    band: "Medium-low risk",
    bandColor: "amber",
    freshness: "07 Sep 2026, 09:10 (bureau) · 07 Sep 2026, 14:22 (application)",
    reasons: [
      { dir: "neg", text: "2 credit enquiries in the last 30 days" },
      { dir: "neg", text: "Debt-to-income ratio above market median (38%)" },
      { dir: "pos", text: "No delinquencies in the last 24 months" },
      { dir: "pos", text: "5-year continuous credit history" },
    ],
    selfDeclared: [
      { label: "Employer", value: "Alza.cz s.r.o." },
      { label: "Employment status", value: "Permanent, past probation" },
      { label: "Time with employer", value: "3 years 4 months" },
      { label: "Housing situation", value: "Renting" },
      { label: "Time at current address", value: "2 years 1 month" },
      { label: "Dependents", value: "1 child" },
      { label: "Bank relationship", value: "Primary account, Nordbridge, 4 years" },
    ],
    affordability: {
      salary: 2150,
      housingCost: 650,
      livingExpenses: 730,
      existingDebt: 310,
      newLoanRepayment: 265,
    },
    bureauAccounts: [
      { type: "Credit card", lender: "ČSOB", status: "Open", balance: "EUR 1,200 / 3,000 limit" },
      { type: "Personal loan", lender: "Raiffeisen", status: "Open", balance: "EUR 4,100 remaining" },
      { type: "Consumer loan", lender: "Home Credit", status: "Closed", balance: "Paid in full, 2024" },
    ],
    enquiries: [
      { date: "28 Aug 2026", lender: "Zonky", type: "Personal loan enquiry" },
      { date: "15 Aug 2026", lender: "Twisto", type: "BNPL enquiry" },
    ],
    behavioral: {
      frictionScore: 61,
      band: "Moderate friction",
      flags: [
        "Salary field edited 3 times before submission",
        "18s hesitation before entering notice-period status",
        "Form completed on mobile, session resumed after 40 min gap",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application in review", tone: "neutral" },
    ],
  },
  {
    id: "APP-88190",
    queueStatus: "Escalated",
    name: "Jakub Dvorak",
    dob: "02 Nov 1985",
    address: "Smíchov, Prague 5",
    product: "Personal cash loan · EUR 15,000 · 48 months",
    requestedAmount: 15000,
    requestedTerm: 48,
    recommendedOffer: {
      amount: 9000,
      term: 48,
      note: "Reduced due to the elevated risk profile and limited affordability. The requested amount also exceeds your EUR 10,000 approval authority, so this case requires supervisor escalation regardless of the recommendation.",
    },
    submitted: "05 Sep 2026, 11:05",
    score: 588,
    band: "Higher risk",
    bandColor: "red",
    freshness: "05 Sep 2026, 08:40 (bureau) · 05 Sep 2026, 11:05 (application)",
    reasons: [
      { dir: "neg", text: "1 missed payment reported in the last 12 months" },
      { dir: "neg", text: "5 credit enquiries in the last 60 days" },
      { dir: "neg", text: "Debt-to-income ratio 52%" },
      { dir: "pos", text: "No open collections accounts" },
    ],
    selfDeclared: [
      { label: "Employer", value: "Škoda Auto a.s." },
      { label: "Employment status", value: "Probation period (month 2 of 3)" },
      { label: "Time with employer", value: "2 months" },
      { label: "Housing situation", value: "Mortgage" },
      { label: "Time at current address", value: "6 years" },
      { label: "Dependents", value: "2 children" },
      { label: "Bank relationship", value: "Primary account, Nordbridge, 1 year" },
    ],
    affordability: {
      salary: 1900,
      housingCost: 720,
      livingExpenses: 640,
      existingDebt: 480,
      newLoanRepayment: 365,
    },
    bureauAccounts: [
      { type: "Mortgage", lender: "Komerční banka", status: "Open", balance: "EUR 89,000 remaining" },
      { type: "Credit card", lender: "Air Bank", status: "Open", balance: "EUR 2,800 / 3,000 limit" },
    ],
    enquiries: [
      { date: "01 Sep 2026", lender: "Provident", type: "Personal loan enquiry" },
      { date: "22 Aug 2026", lender: "Cetelem", type: "Personal loan enquiry" },
      { date: "10 Aug 2026", lender: "Twisto", type: "BNPL enquiry" },
    ],
    behavioral: {
      frictionScore: 84,
      band: "High friction",
      flags: [
        "Notice-period status changed twice after initial entry",
        "34s hesitation before entering existing debt total",
        "Salary field left blank on first pass, added on second visit",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application in review", tone: "neutral" },
    ],
  },
  {
    id: "APP-88240",
    queueStatus: "Approved",
    name: "Petra Kralova",
    dob: "22 Jun 1994",
    address: "Karlin, Prague 8",
    product: "Personal cash loan · EUR 5,000 · 24 months",
    requestedAmount: 5000,
    requestedTerm: 24,
    recommendedOffer: {
      amount: 6500,
      term: 30,
      note: "Strong repayment capacity and a clean credit history support a higher amount over a longer term than requested, while keeping the monthly repayment close to what she budgeted for.",
    },
    submitted: "08 Sep 2026, 09:15",
    score: 781,
    band: "Low risk",
    bandColor: "green",
    freshness: "08 Sep 2026, 08:50 (bureau) · 08 Sep 2026, 09:15 (application)",
    reasons: [
      { dir: "pos", text: "No missed payments on any account" },
      { dir: "pos", text: "6 credit accounts, all in good standing" },
      { dir: "pos", text: "Low debt-to-income ratio" },
      { dir: "neg", text: "One new credit card opened in the last 3 months" },
    ],
    selfDeclared: [
      { label: "Employer", value: "Google Czech s.r.o." },
      { label: "Employment status", value: "Permanent" },
      { label: "Time with employer", value: "1 year 8 months" },
      { label: "Housing situation", value: "Renting" },
      { label: "Time at current address", value: "1 year" },
      { label: "Dependents", value: "None" },
      { label: "Bank relationship", value: "Primary account, Nordbridge, 2 years" },
    ],
    affordability: {
      salary: 3200,
      housingCost: 900,
      livingExpenses: 650,
      existingDebt: 150,
      newLoanRepayment: 220,
    },
    bureauAccounts: [
      { type: "Credit card", lender: "ČSOB", status: "Open", balance: "EUR 300 / 2,000 limit" },
      { type: "Student loan", lender: "ČSOB", status: "Closed", balance: "Paid in full, 2022" },
    ],
    enquiries: [
      { date: "20 Aug 2026", lender: "Alza Financing", type: "Point-of-sale financing enquiry" },
    ],
    behavioral: {
      frictionScore: 22,
      band: "Low friction",
      flags: [
        "Form completed in a single continuous session",
        "No repeated edits on financial fields",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application in review", tone: "neutral" },
    ],
  },
  {
    id: "APP-88255",
    queueStatus: "In review",
    name: "Tomas Bilek",
    dob: "09 Jan 1979",
    address: "Zizkov, Prague 3",
    product: "Personal cash loan · EUR 12,000 · 36 months",
    requestedAmount: 12000,
    requestedTerm: 36,
    recommendedOffer: {
      amount: 12000,
      term: 36,
      note: "Recommendation withheld pending supervisor review — high behavioral risk indicators are present, and the requested amount also exceeds your EUR 10,000 approval authority.",
    },
    submitted: "08 Sep 2026, 16:40",
    score: 705,
    band: "Medium-low risk",
    bandColor: "amber",
    freshness: "08 Sep 2026, 16:10 (bureau) · 08 Sep 2026, 16:40 (application)",
    reasons: [
      { dir: "pos", text: "10-year credit history, no delinquencies" },
      { dir: "neg", text: "3 credit enquiries in the last 14 days" },
      { dir: "neg", text: "Requested amount is high relative to declared income" },
    ],
    selfDeclared: [
      { label: "Employer", value: "Self-employed — Bilek Consulting s.r.o." },
      { label: "Employment status", value: "Self-employed, 4 years" },
      { label: "Time with employer", value: "4 years" },
      { label: "Housing situation", value: "Owns outright" },
      { label: "Time at current address", value: "8 years" },
      { label: "Dependents", value: "None" },
      { label: "Bank relationship", value: "New client — no existing account" },
    ],
    affordability: {
      salary: 2600,
      housingCost: 0,
      livingExpenses: 900,
      existingDebt: 200,
      newLoanRepayment: 400,
    },
    bureauAccounts: [
      { type: "Credit card", lender: "Moneta", status: "Open", balance: "EUR 900 / 4,000 limit" },
      { type: "Business loan", lender: "ČSOB", status: "Closed", balance: "Paid in full, 2023" },
    ],
    enquiries: [
      { date: "05 Sep 2026", lender: "Cetelem", type: "Personal loan enquiry" },
      { date: "01 Sep 2026", lender: "Provident", type: "Personal loan enquiry" },
      { date: "27 Aug 2026", lender: "Home Credit", type: "Personal loan enquiry" },
    ],
    behavioral: {
      frictionScore: 92,
      band: "High friction — possible fraud indicator",
      flags: [
        "Salary field changed 5 times, each edit increasing the value",
        "Copy-paste detected in identity document fields",
        "Session originated from 3 different IP regions within 20 minutes",
      ],
    },
    alerts: [
      { date: "—", text: "No post-approval alerts yet — application in review", tone: "neutral" },
    ],
  },
];

const adminStatsByPeriod = {
  today: {
    kpis: { applications: 47, approvalRate: 68, escalationRate: 12, avgDecisionTime: "6m 40s" },
    riskBands: [
      { band: "Low risk", count: 19, color: "#97C459" },
      { band: "Medium-low risk", count: 16, color: "#EF9F27" },
      { band: "Higher risk", count: 9, color: "#E24B4A" },
      { band: "Declined pre-score (fraud hold)", count: 3, color: "#791F1F" },
    ],
    behavioral: {
      flaggedPct: 15,
      note: "Applications with a high-friction behavioral signal (score above 70) were 3.1x more likely to default within 90 days in the pilot cohort.",
    },
  },
  week: {
    kpis: { applications: 274, approvalRate: 64, escalationRate: 14, avgDecisionTime: "7m 05s" },
    riskBands: [
      { band: "Low risk", count: 108, color: "#97C459" },
      { band: "Medium-low risk", count: 96, color: "#EF9F27" },
      { band: "Higher risk", count: 54, color: "#E24B4A" },
      { band: "Declined pre-score (fraud hold)", count: 16, color: "#791F1F" },
    ],
    behavioral: {
      flaggedPct: 17,
      note: "17% of this week's applications were flagged high-friction — consistent with the 3.1x default-rate multiplier seen in the pilot cohort.",
    },
  },
  month: {
    kpis: { applications: 1189, approvalRate: 61, escalationRate: 15, avgDecisionTime: "7m 20s" },
    riskBands: [
      { band: "Low risk", count: 452, color: "#97C459" },
      { band: "Medium-low risk", count: 401, color: "#EF9F27" },
      { band: "Higher risk", count: 264, color: "#E24B4A" },
      { band: "Declined pre-score (fraud hold)", count: 72, color: "#791F1F" },
    ],
    behavioral: {
      flaggedPct: 18,
      note: "Monthly view: 18% of applications flagged high-friction. Escalation rate has trended up 3 points month-over-month — worth reviewing analyst capacity.",
    },
  },
};

const adminStats = {
  weeklyVolume: [
    { day: "Mon", count: 39 },
    { day: "Tue", count: 44 },
    { day: "Wed", count: 51 },
    { day: "Thu", count: 47 },
    { day: "Fri", count: 58 },
    { day: "Sat", count: 21 },
    { day: "Sun", count: 14 },
  ],
  analysts: [
    { name: "M. Horak", reviewed: 14, approved: 9, declined: 2, escalated: 3, avgTime: "5m 50s" },
    { name: "L. Novotna", reviewed: 18, approved: 13, declined: 3, escalated: 2, avgTime: "6m 10s" },
    { name: "P. Sykora", reviewed: 11, approved: 6, declined: 2, escalated: 3, avgTime: "8m 05s" },
    { name: "J. Vlasak", reviewed: 4, approved: 3, declined: 1, escalated: 0, avgTime: "4m 30s" },
  ],
};

const MARKETS = ["All markets", "Czech Republic", "Slovakia", "Poland", "Romania"];
const MARKET_SHARE = { "Czech Republic": 0.42, Slovakia: 0.18, Poland: 0.27, Romania: 0.13 };
const CHANNELS = ["All channels", "Portal", "API"];
const CHANNEL_SHARE = { Portal: 0.35, API: 0.65 };

function scaleRiskBands(riskBands, factor) {
  return riskBands.map((b) => ({ ...b, count: Math.max(1, Math.round(b.count * factor)) }));
}

const STATUS_COLORS = {
  "Not reviewed": { bg: "#EAF0FB", text: "#1D4ED8" },
  "In review": { bg: "#F1EFE8", text: "#5F5E5A" },
  Approved: { bg: "#EAF3DE", text: "#27500A" },
  Escalated: { bg: "#FAEEDA", text: "#854F0B" },
};

function RiskBadge({ band, color }) {
  const colors = {
    amber: { bg: "#FAEEDA", text: "#854F0B", border: "#EF9F27" },
    red: { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
    green: { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
  }[color];
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
      className="px-3 py-1 rounded text-sm font-medium"
    >
      {band}
    </span>
  );
}

function AffordabilityCard({ affordability }) {
  const { salary, housingCost, livingExpenses, existingDebt, newLoanRepayment } = affordability;
  const totalOutgoings = housingCost + livingExpenses + existingDebt + newLoanRepayment;
  const disposable = salary - totalOutgoings;
  const dti = Math.round(((existingDebt + newLoanRepayment) / salary) * 100);
  const scale = Math.max(salary, totalOutgoings);

  const segments = [
    { label: "Housing", value: housingCost, color: "#378ADD" },
    { label: "Living expenses", value: livingExpenses, color: "#7F77DD" },
    { label: "Existing debt", value: existingDebt, color: "#EF9F27" },
    { label: "New loan repayment", value: newLoanRepayment, color: "#D85A30" },
  ];

  return (
    <SectionCard icon={TrendingUp} title="Affordability analysis" badge={<span className="text-xs text-gray-400">Calculated</span>}>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div>
          <p className="text-xs text-gray-400">Net monthly salary</p>
          <p className="font-mono text-lg font-semibold" style={{ color: INK }}>EUR {salary.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Total monthly outgoings</p>
          <p className="font-mono text-lg font-semibold" style={{ color: INK }}>EUR {totalOutgoings.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Disposable income after this loan</p>
          <p className="font-mono text-lg font-semibold" style={{ color: disposable < 300 ? "#B42318" : "#27500A" }}>
            EUR {disposable.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="w-full h-3 rounded overflow-hidden flex mb-1" style={{ background: "#F1EFE8" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ width: `${(s.value / scale) * 100}%`, background: s.color }} />
        ))}
        <div style={{ width: `${(Math.max(disposable, 0) / scale) * 100}%`, background: "#EAF3DE" }} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: s.color }} />
            {s.label}: EUR {s.value.toLocaleString()}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#97C459" }} />
          Disposable
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Debt-to-income ratio (existing + new loan)</span>
        <span
          className="font-mono text-sm font-semibold px-2 py-0.5 rounded"
          style={{
            color: dti > 45 ? "#791F1F" : dti > 35 ? "#854F0B" : "#27500A",
            background: dti > 45 ? "#FCEBEB" : dti > 35 ? "#FAEEDA" : "#EAF3DE",
          }}
        >
          {dti}%
        </span>
      </div>
    </SectionCard>
  );
}

function RecommendationCard({ applicant, offerAmount, offerTerm, setOfferAmount, setOfferTerm, estRepayment, exceedsLimit }) {
  const min = 1000, max = 20000, step = 500;
  const limitPercent = ((ANALYST_LIMIT - min) / (max - min)) * 100;
  const requestedPercent = ((applicant.requestedAmount - min) / (max - min)) * 100;
  const delta = offerAmount - applicant.requestedAmount;
  const direction = delta > 0 ? "more" : delta < 0 ? "less" : "same";
  const deltaColor = direction === "more" ? "#27500A" : direction === "less" ? "#854F0B" : "#5F5E5A";
  const deltaBg = direction === "more" ? "#EAF3DE" : direction === "less" ? "#FAEEDA" : "#F1EFE8";

  return (
    <SectionCard icon={ArrowLeftRight} title="Adjust the offer" badge={<span className="text-xs text-gray-400">Interactive</span>}>
      <p className="text-sm text-gray-600 mb-4">{applicant.recommendedOffer.note}</p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setOfferAmount(applicant.requestedAmount);
            setOfferTerm(applicant.requestedTerm);
          }}
          className="text-xs border border-gray-300 rounded px-2.5 py-1.5 hover:bg-gray-50"
          style={{ color: INK }}
        >
          Use requested — EUR {applicant.requestedAmount.toLocaleString()}
        </button>
        <button
          onClick={() => {
            setOfferAmount(applicant.recommendedOffer.amount);
            setOfferTerm(applicant.recommendedOffer.term);
          }}
          className="text-xs border border-gray-300 rounded px-2.5 py-1.5 hover:bg-gray-50"
          style={{ color: INK }}
        >
          Use recommended — EUR {applicant.recommendedOffer.amount.toLocaleString()}
        </button>
      </div>

      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-gray-600">Offer amount</label>
        <span className="font-mono text-sm font-semibold" style={{ color: INK }}>
          EUR {offerAmount.toLocaleString()}
        </span>
      </div>
      <div
        className="relative h-2 rounded-full mb-1"
        style={{
          background: `linear-gradient(to right, #EAF3DE 0%, #EAF3DE ${limitPercent}%, #FCEBEB ${limitPercent}%, #FCEBEB 100%)`,
        }}
      >
        <div
          className="absolute top-1/2 w-0.5 h-3"
          style={{ left: `${requestedPercent}%`, transform: "translate(-50%, -50%)", background: "#5F5E5A" }}
          title={`Requested: EUR ${applicant.requestedAmount.toLocaleString()}`}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={offerAmount}
        onChange={(e) => setOfferAmount(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-400 mb-4">
        <span>EUR {min.toLocaleString()}</span>
        <span>Approval limit EUR {ANALYST_LIMIT.toLocaleString()}</span>
        <span>EUR {max.toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-gray-600">Term</label>
        <span className="font-mono text-sm font-semibold" style={{ color: INK }}>{offerTerm} months</span>
      </div>
      <input
        type="range"
        min={12}
        max={60}
        step={6}
        value={offerTerm}
        onChange={(e) => setOfferTerm(Number(e.target.value))}
        className="w-full mb-4"
      />

      <div className="flex items-center gap-8 pt-3 border-t border-gray-100 mb-3">
        <div>
          <p className="text-xs text-gray-400">Estimated monthly repayment</p>
          <p className="font-mono text-sm font-semibold" style={{ color: INK }}>EUR {estRepayment.toLocaleString()}</p>
        </div>
        {direction !== "same" && (
          <div>
            <p className="text-xs text-gray-400">vs requested</p>
            <span className="text-xs font-medium px-2 py-1 rounded" style={{ color: deltaColor, background: deltaBg }}>
              {direction === "more" ? "+" : "-"}EUR {Math.abs(delta).toLocaleString()} {direction}
            </span>
          </div>
        )}
      </div>

      {exceedsLimit && (
        <div className="flex items-start gap-2 text-sm bg-red-50 border border-red-100 rounded px-3 py-2" style={{ color: "#791F1F" }}>
          <AlertTriangle size={15} className="mt-0.5 shrink-0" />
          This offer exceeds your EUR {ANALYST_LIMIT.toLocaleString()} approval authority. Approve is disabled below — escalate to a supervisor to proceed.
        </div>
      )}
    </SectionCard>
  );
}

function SectionCard({ icon: Icon, title, badge, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Icon size={16} style={{ color: TEAL }} />
          <h3 className="text-sm font-semibold" style={{ color: INK }}>{title}</h3>
        </div>
        {badge}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div style={{ background: TEAL }} className="w-8 h-8 rounded flex items-center justify-center">
            <ShieldCheck size={18} color="white" />
          </div>
          <span className="text-lg font-semibold" style={{ color: INK }}>BureauInfo</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h1 className="text-base font-semibold mb-1" style={{ color: INK }}>Client portal sign in</h1>
          <p className="text-sm text-gray-500 mb-6">Access underwriting reports and monitoring alerts.</p>
          <label className="block text-xs font-medium text-gray-600 mb-1">Client organisation</label>
          <input
            defaultValue="Nordbridge Digital Bank"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
            readOnly
          />
          <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
          <input
            defaultValue="m.horak@nordbridge.example"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
            readOnly
          />
          <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            defaultValue="password123"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-6"
            readOnly
          />
          <button
            onClick={onLogin}
            style={{ background: INK }}
            className="w-full text-white text-sm font-medium py-2.5 rounded hover:opacity-90 transition"
          >
            Sign in
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Prototype — sample data only</p>
      </div>
    </div>
  );
}

function TopBar({ onLogout, screen, onNavigateSearch, onNavigateAdmin }) {
  const tabBase =
    "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md font-medium transition-colors";
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div style={{ background: TEAL }} className="w-7 h-7 rounded flex items-center justify-center">
            <ShieldCheck size={15} color="white" />
          </div>
          <span className="font-semibold text-sm" style={{ color: INK }}>BureauInfo</span>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-sm text-gray-500">Nordbridge Digital Bank</span>
        </div>

        <div className="w-px h-5 bg-gray-200" />

        <div className="flex items-center gap-1">
          <button
            onClick={onNavigateSearch}
            className={tabBase}
            style={{
              color: screen !== "admin" ? INK : "#8A8886",
              background: screen !== "admin" ? "#F1EFE8" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (screen === "admin") e.currentTarget.style.background = "#F7F6F3";
            }}
            onMouseLeave={(e) => {
              if (screen === "admin") e.currentTarget.style.background = "transparent";
            }}
          >
            <Search size={14} /> Applicants
          </button>
          <button
            onClick={onNavigateAdmin}
            className={tabBase}
            style={{
              color: screen === "admin" ? INK : "#8A8886",
              background: screen === "admin" ? "#F1EFE8" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (screen !== "admin") e.currentTarget.style.background = "#F7F6F3";
            }}
            onMouseLeave={(e) => {
              if (screen !== "admin") e.currentTarget.style.background = "transparent";
            }}
          >
            <BarChart3 size={14} /> Admin dashboard
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pl-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{ background: "#E6F1EF", color: TEAL }}
          >
            MH
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium" style={{ color: INK }}>M. Horak</p>
            <p className="text-xs text-gray-400">Credit Risk Analyst · up to EUR {ANALYST_LIMIT.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-px h-5 bg-gray-200" />
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </div>
  );
}

function SearchScreen({ onSelect, onLogout, onNavigateAdmin, initialStatusFilter }) {
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter || "All");
  const [sortBy, setSortBy] = useState("newest");
  const cameFromAdminQueue = Boolean(initialStatusFilter && initialStatusFilter !== "All");

  const riskOptions = ["All", "Low risk", "Medium-low risk", "Higher risk"];
  const statusOptions = ["All", "Not reviewed", "In review", "Approved", "Escalated"];
  const statusColors = STATUS_COLORS;

  let filtered = applicants.filter((a) => {
    const matchesQuery =
      a.name.toLowerCase().includes(query.toLowerCase()) || a.id.toLowerCase().includes(query.toLowerCase());
    const matchesRisk = riskFilter === "All" || a.band === riskFilter;
    const matchesStatus = statusFilter === "All" || a.queueStatus === statusFilter;
    return matchesQuery && matchesRisk && matchesStatus;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "scoreHigh") return b.score - a.score;
    if (sortBy === "scoreLow") return a.score - b.score;
    return 0; // "newest" — keep original (submission) order
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <TopBar onLogout={onLogout} screen="search" onNavigateSearch={() => {}} onNavigateAdmin={onNavigateAdmin} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        {cameFromAdminQueue && (
          <button
            onClick={onNavigateAdmin}
            className="text-sm text-gray-400 hover:text-gray-600 mb-4"
          >
            ← Back to admin dashboard
          </button>
        )}
        <h1 className="text-xl font-semibold mb-1" style={{ color: INK }}>Search applicants</h1>
        <p className="text-sm text-gray-500 mb-6">Search by name, application ID, or national ID.</p>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Marta Novakova or APP-88213"
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-gray-400 mr-1">Risk band</span>
              {riskOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRiskFilter(opt)}
                  className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                  style={{
                    color: riskFilter === opt ? INK : "#8A8886",
                    background: riskFilter === opt ? "#F1EFE8" : "transparent",
                    border: `1px solid ${riskFilter === opt ? "#E2E5EB" : "transparent"}`,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                  style={{ color: INK }}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                  style={{ color: INK }}
                >
                  <option value="newest">Newest first</option>
                  <option value="scoreHigh">Score: high to low</option>
                  <option value="scoreLow">Score: low to high</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-2">{filtered.length} of {applicants.length} applicants</p>

        <div className="space-y-2">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelect(a)}
              className="w-full text-left bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between hover:border-gray-300 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm" style={{ color: INK }}>{a.name}</span>
                  <span className="text-xs text-gray-400 font-mono">{a.id}</span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{ background: statusColors[a.queueStatus].bg, color: statusColors[a.queueStatus].text }}
                  >
                    {a.queueStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{a.product} · submitted {a.submitted}</p>
              </div>
              <div className="flex items-center gap-3">
                <RiskBadge band={a.band} color={a.bandColor} />
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No applicants match these filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Modal({ title, icon: Icon, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <Icon size={16} style={{ color: TEAL }} />
            <h3 className="text-sm font-semibold" style={{ color: INK }}>{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ReportScreen({ applicant, onBack, onLogout, onNavigateAdmin }) {
  const [decision, setDecision] = useState(null);
  const [modal, setModal] = useState(null);
  const [escalationNote, setEscalationNote] = useState("");
  const [offerAmount, setOfferAmount] = useState(applicant.recommendedOffer.amount);
  const [offerTerm, setOfferTerm] = useState(applicant.recommendedOffer.term);

  const baseAmount = applicant.recommendedOffer.amount;
  const baseTerm = applicant.recommendedOffer.term;
  const estRepayment = Math.round(
    applicant.affordability.newLoanRepayment * (offerAmount / baseAmount) * (baseTerm / offerTerm)
  );
  const liveAffordability = { ...applicant.affordability, newLoanRepayment: estRepayment };
  const exceedsLimit = offerAmount > ANALYST_LIMIT;

  const auditTrail = [
    { time: applicant.submitted, text: "Application submitted by applicant" },
    { time: "07 Sep 2026, 14:23", text: "Bureau report generated (score, reasons, behavioral signal computed)" },
    { time: "07 Sep 2026, 15:02", text: "Report opened by M. Horak (Nordbridge Digital Bank)" },
    ...(decision
      ? [
          {
            time: "just now",
            text:
              decision === "Escalated to supervisor" && escalationNote
                ? `Escalated to supervisor by M. Horak — note: "${escalationNote}"`
                : decision === "Approved"
                ? `Decision recorded: Approved at EUR ${offerAmount.toLocaleString()} / ${offerTerm} months`
                : `Decision recorded: ${decision}`,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <TopBar onLogout={onLogout} screen="report" onNavigateSearch={onBack} onNavigateAdmin={onNavigateAdmin} />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 mb-4">← Back to search</button>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-semibold" style={{ color: INK }}>{applicant.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{applicant.id} · DOB {applicant.dob} · {applicant.address}</p>
              <p className="text-sm text-gray-500 mt-1">{applicant.product}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-semibold" style={{ color: INK }}>{applicant.score}</div>
              <RiskBadge band={applicant.band} color={applicant.bandColor} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
            <Clock size={12} />
            Data as of {applicant.freshness}
          </div>
        </div>

        <div className="grid gap-5">
          <RecommendationCard
            applicant={applicant}
            offerAmount={offerAmount}
            offerTerm={offerTerm}
            setOfferAmount={setOfferAmount}
            setOfferTerm={setOfferTerm}
            estRepayment={estRepayment}
            exceedsLimit={exceedsLimit}
          />

          <SectionCard icon={ShieldCheck} title="Key reasons">
            <ul className="space-y-2">
              {applicant.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  {r.dir === "neg" ? (
                    <TrendingDown size={15} className="text-red-500 mt-0.5 shrink-0" />
                  ) : (
                    <TrendingUp size={15} className="text-green-600 mt-0.5 shrink-0" />
                  )}
                  <span style={{ color: INK }}>{r.text}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <AffordabilityCard affordability={liveAffordability} />

          <SectionCard
            icon={Activity}
            title="Behavioral application signal"
            badge={<span style={{ background: "#EEEDFE", color: "#3C3489" }} className="text-xs font-medium px-2 py-0.5 rounded">New</span>}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="font-mono text-2xl font-semibold" style={{ color: INK }}>{applicant.behavioral.frictionScore}</div>
              <div>
                <p className="text-sm font-medium" style={{ color: INK }}>{applicant.behavioral.band}</p>
                <p className="text-xs text-gray-400">Based on application interaction patterns</p>
              </div>
            </div>
            <ul className="space-y-1.5 mb-3">
              {applicant.behavioral.flags.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <MousePointerClick size={13} className="mt-0.5 shrink-0 text-gray-400" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded px-3 py-2">
              Supporting signal only — not used as a sole reason for decline. Validated periodically for fairness across applicant groups.
            </p>
          </SectionCard>

          <SectionCard icon={FileText} title="Self-declared application data" badge={<span className="text-xs text-gray-400">Not bureau-verified</span>}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
              {applicant.selfDeclared.map((d, i) => (
                <div key={i}>
                  <dt className="text-xs text-gray-400">{d.label}</dt>
                  <dd className="text-sm font-medium" style={{ color: INK }}>{d.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard icon={Building2} title="Open and closed credit accounts" badge={<span className="text-xs text-gray-400">Bureau-verified</span>}>
            <div className="divide-y divide-gray-100">
              {applicant.bureauAccounts.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <span className="font-medium" style={{ color: INK }}>{a.type}</span>
                    <span className="text-gray-400"> · {a.lender}</span>
                  </div>
                  <div className="text-right">
                    <span className={a.status === "Open" ? "text-amber-700" : "text-gray-400"}>{a.status}</span>
                    <p className="text-xs text-gray-400">{a.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Search} title="Recent enquiries" badge={<span className="text-xs text-gray-400">Bureau-verified</span>}>
            <div className="divide-y divide-gray-100">
              {applicant.enquiries.map((e, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span style={{ color: INK }}>{e.type}</span>
                  <div className="text-right">
                    <span className="text-gray-500">{e.lender}</span>
                    <p className="text-xs text-gray-400 font-mono">{e.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Bell} title="Post-approval monitoring" badge={<span className="text-xs text-gray-400">Active for life of loan</span>}>
            {applicant.alerts.map((al, i) => (
              <p key={i} className="text-sm text-gray-500">{al.text}</p>
            ))}
            <p className="text-xs text-gray-400 mt-2">Monitoring begins automatically once the loan is approved and disbursed — future missed payments elsewhere or new high-risk enquiries will raise an alert here.</p>
          </SectionCard>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (exceedsLimit) return;
                setDecision("Approved");
              }}
              disabled={exceedsLimit}
              title={
                exceedsLimit
                  ? `Exceeds your EUR ${ANALYST_LIMIT.toLocaleString()} approval authority — escalate to supervisor instead`
                  : undefined
              }
              style={{
                background: exceedsLimit ? "#D3D1C7" : decision === "Approved" ? "#27500A" : INK,
                cursor: exceedsLimit ? "not-allowed" : "pointer",
              }}
              className="flex items-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded hover:opacity-90"
            >
              <CheckCircle2 size={15} /> Approve
              {exceedsLimit && <span className="text-xs opacity-90">(exceeds limit)</span>}
            </button>
            <button
              onClick={() => setDecision("Declined")}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              style={{ color: INK }}
            >
              <XCircle size={15} /> Decline
            </button>
            <button
              onClick={() => setDecision("More info requested")}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              style={{ color: INK }}
            >
              <HelpCircle size={15} /> Request more info
            </button>
            <button
              onClick={() => setModal("escalate")}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              style={{ color: INK }}
            >
              <ArrowUpCircle size={15} /> Escalate to supervisor
            </button>
            {decision && (
              <span className="text-xs text-gray-400 flex items-center gap-1 ml-1">
                <RotateCcw size={11} /> Recorded: {decision}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <button className="flex items-center gap-1.5 hover:text-gray-700" onClick={() => setModal("pdf")}>
              <Download size={14} /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-700" onClick={() => setModal("api")}>
              <Code2 size={14} /> View API response
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-700" onClick={() => setModal("audit")}>
              <History size={14} /> Audit / dispute trail
            </button>
          </div>
        </div>
      </div>

      {modal === "api" && (
        <Modal title="API response" icon={Code2} onClose={() => setModal(null)}>
          <pre className="text-xs font-mono bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto">
{`{
  "application_id": "${applicant.id}",
  "score": ${applicant.score},
  "risk_band": "${applicant.band}",
  "behavioral_signal": {
    "friction_score": ${applicant.behavioral.frictionScore},
    "band": "${applicant.behavioral.band}"
  },
  "data_freshness": "${applicant.freshness}",
  "report_generated_at": "2026-09-07T14:23:00Z"
}`}
          </pre>
        </Modal>
      )}
      {modal === "audit" && (
        <Modal title="Audit / dispute trail" icon={History} onClose={() => setModal(null)}>
          <ul className="space-y-3">
            {auditTrail.map((e, i) => (
              <li key={i} className="text-sm">
                <span className="text-xs text-gray-400 font-mono block">{e.time}</span>
                <span style={{ color: INK }}>{e.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
            Applicants can request a copy of this report and dispute any bureau-verified data point. Disputes are logged here with resolution status.
          </p>
        </Modal>
      )}
      {modal === "escalate" && (
        <Modal title="Escalate to supervisor" icon={ArrowUpCircle} onClose={() => setModal(null)}>
          <p className="text-sm text-gray-500 mb-4">
            Send this application to a supervisor for a second review before a decision is recorded — for example when the behavioral signal and bureau score point in different directions.
          </p>
          <label className="block text-xs font-medium text-gray-600 mb-1">Note for supervisor</label>
          <textarea
            value={escalationNote}
            onChange={(e) => setEscalationNote(e.target.value)}
            rows={4}
            placeholder="e.g. Bureau score is medium-low risk, but behavioral friction is high — requesting a second opinion before deciding."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
          />
          <button
            onClick={() => {
              setDecision("Escalated to supervisor");
              setModal(null);
            }}
            style={{ background: INK }}
            className="text-white text-sm font-medium px-4 py-2 rounded hover:opacity-90"
          >
            Send to supervisor
          </button>
        </Modal>
      )}
      {modal === "pdf" && (
        <Modal title="Export PDF" icon={Download} onClose={() => setModal(null)}>
          <p className="text-sm text-gray-500">In production this generates a signed, dated PDF snapshot of this report for the client's own records and regulatory file.</p>
        </Modal>
      )}
    </div>
  );
}

function KPI({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-mono text-2xl font-semibold" style={{ color: INK }}>{value}</p>
    </div>
  );
}

const BAND_SHARE_BY_DAY = {
  Mon: { "Low risk": 0.40, "Medium-low risk": 0.34, "Higher risk": 0.19, "Declined pre-score (fraud hold)": 0.07 },
  Tue: { "Low risk": 0.41, "Medium-low risk": 0.34, "Higher risk": 0.18, "Declined pre-score (fraud hold)": 0.07 },
  Wed: { "Low risk": 0.38, "Medium-low risk": 0.34, "Higher risk": 0.21, "Declined pre-score (fraud hold)": 0.07 },
  Thu: { "Low risk": 0.39, "Medium-low risk": 0.34, "Higher risk": 0.20, "Declined pre-score (fraud hold)": 0.07 },
  Fri: { "Low risk": 0.33, "Medium-low risk": 0.33, "Higher risk": 0.27, "Declined pre-score (fraud hold)": 0.07 },
  Sat: { "Low risk": 0.48, "Medium-low risk": 0.32, "Higher risk": 0.14, "Declined pre-score (fraud hold)": 0.06 },
  Sun: { "Low risk": 0.50, "Medium-low risk": 0.31, "Higher risk": 0.13, "Declined pre-score (fraud hold)": 0.06 },
};

const BAND_STATS = {
  "Low risk": { approvalRate: 92, escalationRate: 2, avgTime: "3m 10s" },
  "Medium-low risk": { approvalRate: 68, escalationRate: 9, avgTime: "6m 40s" },
  "Higher risk": { approvalRate: 34, escalationRate: 28, avgTime: "11m 20s" },
  "Declined pre-score (fraud hold)": { approvalRate: 2, escalationRate: 95, avgTime: "1m 05s" },
};

const DAY_STATS = {
  Mon: { approvalRate: 65, escalationRate: 13, avgTime: "6m 50s" },
  Tue: { approvalRate: 66, escalationRate: 13, avgTime: "6m 40s" },
  Wed: { approvalRate: 63, escalationRate: 15, avgTime: "7m 05s" },
  Thu: { approvalRate: 64, escalationRate: 14, avgTime: "6m 55s" },
  Fri: { approvalRate: 60, escalationRate: 17, avgTime: "7m 30s" },
  Sat: { approvalRate: 70, escalationRate: 8, avgTime: "5m 20s" },
  Sun: { approvalRate: 72, escalationRate: 6, avgTime: "4m 50s" },
};

function AdminScreen({ onLogout, onNavigateSearch, onOpenQueue }) {
  const [period, setPeriod] = useState("today");
  const [market, setMarket] = useState("All markets");
  const [channel, setChannel] = useState("All channels");
  const [analystFilter, setAnalystFilter] = useState("All");
  const [selectedSegment, setSelectedSegment] = useState(null); // { type: "band"|"day", value }

  const base = adminStatsByPeriod[period];
  const periodLabel = { today: "today", week: "this week", month: "this month" }[period];

  let applications = base.kpis.applications;
  let riskBands = base.riskBands;
  let approvalRate = base.kpis.approvalRate;
  let escalationRate = base.kpis.escalationRate;
  let avgDecisionTime = base.kpis.avgDecisionTime;

  const marketFactor = market !== "All markets" ? MARKET_SHARE[market] : 1;
  const channelFactor = channel !== "All channels" ? CHANNEL_SHARE[channel] : 1;

  if (market !== "All markets") {
    applications = Math.round(applications * marketFactor);
    riskBands = scaleRiskBands(riskBands, marketFactor);
  }

  if (channel !== "All channels") {
    applications = Math.round(applications * channelFactor);
    riskBands = scaleRiskBands(riskBands, channelFactor);
    if (channel === "API") {
      approvalRate = Math.min(99, approvalRate + 6);
      escalationRate = Math.max(1, escalationRate - 8);
      avgDecisionTime = "0m 45s (automated)";
    } else {
      approvalRate = Math.max(1, approvalRate - 4);
      escalationRate = escalationRate + 6;
    }
  }

  const weeklyVolume = adminStats.weeklyVolume.map((d) => ({
    day: d.day,
    count: Math.max(1, Math.round(d.count * marketFactor * channelFactor)),
  }));
  const filtersActive = market !== "All markets" || channel !== "All channels";

  const filteredAnalysts =
    analystFilter === "All" ? adminStats.analysts : adminStats.analysts.filter((a) => a.name === analystFilter);

  let kpiLabel = `Applications ${periodLabel}`;
  let kpiApplications = applications;
  let kpiApproval = approvalRate;
  let kpiEscalation = escalationRate;
  let kpiTime = avgDecisionTime;

  if (selectedSegment?.type === "band") {
    const b = riskBands.find((rb) => rb.band === selectedSegment.value);
    const s = BAND_STATS[selectedSegment.value];
    kpiApplications = b ? b.count : applications;
    kpiApproval = s.approvalRate;
    kpiEscalation = s.escalationRate;
    kpiTime = s.avgTime;
    kpiLabel = `${selectedSegment.value} applications`;
  } else if (selectedSegment?.type === "day") {
    const d = weeklyVolume.find((wd) => wd.day === selectedSegment.value);
    const s = DAY_STATS[selectedSegment.value];
    kpiApplications = d ? d.count : applications;
    kpiApproval = s.approvalRate;
    kpiEscalation = s.escalationRate;
    kpiTime = s.avgTime;
    kpiLabel = `Applications on ${selectedSegment.value}`;
  }

  const toggleBand = (bandName) =>
    setSelectedSegment((prev) => (prev?.type === "band" && prev.value === bandName ? null : { type: "band", value: bandName }));
  const toggleDay = (dayName) =>
    setSelectedSegment((prev) => (prev?.type === "day" && prev.value === dayName ? null : { type: "day", value: dayName }));

  // Cross-filter: selecting a band recomputes the weekly chart to that band's daily counts;
  // selecting a day recomputes the risk-band chart to that day's band mix.
  const weeklyToShow =
    selectedSegment?.type === "band"
      ? weeklyVolume.map((d) => ({
          day: d.day,
          count: Math.max(1, Math.round(d.count * BAND_SHARE_BY_DAY[d.day][selectedSegment.value])),
        }))
      : weeklyVolume;

  const bandsToShow =
    selectedSegment?.type === "day"
      ? riskBands.map((b) => {
          const dayTotal = weeklyVolume.find((d) => d.day === selectedSegment.value)?.count ?? 0;
          return { ...b, count: Math.max(1, Math.round(dayTotal * BAND_SHARE_BY_DAY[selectedSegment.value][b.band])) };
        })
      : riskBands;

  const totalBandsToShow = bandsToShow.reduce((s, b) => s + b.count, 0);
  const maxWeeklyToShow = Math.max(...weeklyToShow.map((d) => d.count));

  const MARKET_COLORS = { "Czech Republic": TEAL, Slovakia: "#5B8DEF", Poland: "#B472D6", Romania: "#E2A73E" };

  const marketBase = channel !== "All channels" ? Math.round(base.kpis.applications * CHANNEL_SHARE[channel]) : base.kpis.applications;
  const marketBreakdown = Object.keys(MARKET_SHARE).map((m) => ({
    label: m,
    count: Math.max(1, Math.round(marketBase * MARKET_SHARE[m])),
    color: MARKET_COLORS[m],
  }));
  const totalMarketBreakdown = marketBreakdown.reduce((s, m) => s + m.count, 0);

  const toggleMarket = (m) => setMarket((prev) => (prev === m ? "All markets" : m));

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <TopBar onLogout={onLogout} screen="admin" onNavigateSearch={onNavigateSearch} onNavigateAdmin={() => {}} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-1" style={{ color: INK }}>Admin dashboard</h1>
          <p className="text-sm text-gray-500">Portfolio activity across Nordbridge Digital Bank</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1">
              {[
                { key: "today", label: "Today" },
                { key: "week", label: "This week" },
                { key: "month", label: "This month" },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className="text-sm px-3 py-1.5 rounded-md font-medium transition-colors"
                  style={{
                    color: period === p.key ? INK : "#8A8886",
                    background: period === p.key ? "#FFFFFF" : "transparent",
                    boxShadow: period === p.key ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Market</span>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1.5 bg-white"
                  style={{ color: INK }}
                >
                  {MARKETS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Channel</span>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="text-xs border border-gray-200 rounded px-2 py-1.5 bg-white"
                  style={{ color: INK }}
                >
                  {CHANNELS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {filtersActive && (
                <button
                  onClick={() => {
                    setMarket("All markets");
                    setChannel("All channels");
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
          {channel !== "All channels" && (
            <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
              {channel === "API"
                ? "API channel reflects the lender's automated decision engine — faster, higher auto-approval, fewer escalations."
                : "Portal channel reflects analyst review — includes the harder cases that don't auto-clear, so escalation rate runs higher."}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-2">
          <div />
          {selectedSegment && (
            <button
              onClick={() => setSelectedSegment(null)}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: "#EEEDFE", color: "#3C3489" }}
            >
              Drilled into: {selectedSegment.value} <X size={12} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-5">
          <KPI label={kpiLabel} value={kpiApplications} />
          <KPI label="Approval rate" value={`${kpiApproval}%`} />
          <KPI label="Escalation rate" value={`${kpiEscalation}%`} />
          <KPI label="Avg time to decision" value={kpiTime} />
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <SectionCard
            icon={BarChart3}
            title={selectedSegment?.type === "day" ? `Risk band mix — ${selectedSegment.value}` : "Applications by risk band"}
            badge={<span className="text-xs text-gray-400 capitalize">{selectedSegment?.type === "day" ? "cross-filtered" : `${periodLabel} · click to drill in`}</span>}
          >
            <div className="space-y-3">
              {bandsToShow.map((b, i) => {
                const isSelected = selectedSegment?.type === "band" && selectedSegment.value === b.band;
                const isDimmed = selectedSegment?.type === "band" && !isSelected;
                return (
                  <button
                    key={i}
                    onClick={() => toggleBand(b.band)}
                    className="w-full text-left transition-opacity"
                    style={{ opacity: isDimmed ? 0.35 : 1 }}
                  >
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: INK, fontWeight: isSelected ? 600 : 400 }}>{b.band}</span>
                      <span className="text-gray-400 font-mono">
                        {b.count} · {Math.round((b.count / totalBandsToShow) * 100)}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{ background: "#F1EFE8", outline: isSelected ? `2px solid ${b.color}` : "none", outlineOffset: 1 }}
                    >
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${(b.count / totalBandsToShow) * 100}%`, background: b.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            icon={Activity}
            title={selectedSegment?.type === "band" ? `Daily volume — ${selectedSegment.value}` : "Applications, last 7 days"}
            badge={<span className="text-xs text-gray-400">{selectedSegment?.type === "band" ? "cross-filtered" : "click a bar to drill in"}</span>}
          >
            <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
              {weeklyToShow.map((d, i) => {
                const isSelected = selectedSegment?.type === "day" && selectedSegment.value === d.day;
                const isDimmed = selectedSegment?.type === "day" && !isSelected;
                return (
                  <button
                    key={i}
                    onClick={() => toggleDay(d.day)}
                    className="flex-1 flex flex-col items-center justify-end h-full transition-opacity"
                    style={{ opacity: isDimmed ? 0.35 : 1 }}
                  >
                    <span className="text-xs text-gray-400 font-mono mb-1">{d.count}</span>
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${(d.count / maxWeeklyToShow) * 90}px`,
                        background: TEAL,
                        opacity: isSelected ? 1 : 0.85,
                        outline: isSelected ? `2px solid ${INK}` : "none",
                        outlineOffset: 1,
                      }}
                    />
                    <span className="text-xs mt-1" style={{ color: isSelected ? INK : "#8A8886", fontWeight: isSelected ? 600 : 400 }}>
                      {d.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            icon={Building2}
            title="Applications by market"
            badge={<span className="text-xs text-gray-400">click to filter dashboard</span>}
          >
            <div className="space-y-3">
              {marketBreakdown.map((m, i) => {
                const isSelected = market === m.label;
                const isDimmed = market !== "All markets" && !isSelected;
                return (
                  <button
                    key={i}
                    onClick={() => toggleMarket(m.label)}
                    className="w-full text-left transition-opacity"
                    style={{ opacity: isDimmed ? 0.35 : 1 }}
                  >
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: INK, fontWeight: isSelected ? 600 : 400 }}>{m.label}</span>
                      <span className="text-gray-400 font-mono">
                        {m.count} · {Math.round((m.count / totalMarketBreakdown) * 100)}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{ background: "#F1EFE8", outline: isSelected ? `2px solid ${m.color}` : "none", outlineOffset: 1 }}
                    >
                      <div className="h-2 rounded-full" style={{ width: `${(m.count / totalMarketBreakdown) * 100}%`, background: m.color }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            icon={Users}
            title="Current queue by status"
            badge={<span className="text-xs text-gray-400">click to open filtered list</span>}
          >
            <div className="space-y-3">
              {["Not reviewed", "In review", "Escalated", "Approved"].map((s, i) => {
                const count = applicants.filter((a) => a.queueStatus === s).length;
                const pct = Math.round((count / applicants.length) * 100);
                return (
                  <button
                    key={i}
                    onClick={() => onOpenQueue(s)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{ background: STATUS_COLORS[s].bg, color: STATUS_COLORS[s].text }}
                      >
                        {s}
                      </span>
                      <span className="text-gray-400 font-mono">{count} · {pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: "#F1EFE8" }}>
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: STATUS_COLORS[s].text }} />
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
              Reflects the live applicant queue, not the selected reporting period.
            </p>
          </SectionCard>
        </div>

        <SectionCard
          icon={Activity}
          title="Behavioral signal impact"
          badge={<span style={{ background: "#EEEDFE", color: "#3C3489" }} className="text-xs font-medium px-2 py-0.5 rounded">Pilot cohort</span>}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="font-mono text-2xl font-semibold" style={{ color: INK }}>{base.behavioral.flaggedPct}%</div>
            <p className="text-sm text-gray-500 capitalize">of {periodLabel === "today" ? "today's" : periodLabel} applications flagged high-friction by the behavioral signal</p>
          </div>
          <p className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded px-3 py-2">{base.behavioral.note}</p>
        </SectionCard>

        <div className="mt-5">
          <SectionCard
            icon={Users}
            title="Analyst activity today"
            badge={
              <select
                value={analystFilter}
                onChange={(e) => setAnalystFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                style={{ color: INK }}
              >
                <option value="All">All analysts</option>
                {adminStats.analysts.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
            }
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Analyst</th>
                  <th className="pb-2 font-medium text-right">Reviewed</th>
                  <th className="pb-2 font-medium text-right">Approved</th>
                  <th className="pb-2 font-medium text-right">Declined</th>
                  <th className="pb-2 font-medium text-right">Escalated</th>
                  <th className="pb-2 font-medium text-right">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnalysts.map((a, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium" style={{ color: INK }}>{a.name}</td>
                    <td className="py-2.5 text-right font-mono">{a.reviewed}</td>
                    <td className="py-2.5 text-right font-mono text-green-700">{a.approved}</td>
                    <td className="py-2.5 text-right font-mono text-gray-500">{a.declined}</td>
                    <td className="py-2.5 text-right font-mono text-amber-700">{a.escalated}</td>
                    <td className="py-2.5 text-right font-mono text-gray-400">{a.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [applicant, setApplicant] = useState(null);
  const [queueStatusFilter, setQueueStatusFilter] = useState("All");

  return (
    <div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      .font-mono { font-family: 'IBM Plex Mono', monospace; }`}</style>
      {screen === "login" && <LoginScreen onLogin={() => setScreen("search")} />}
      {screen === "search" && (
        <SearchScreen
          onLogout={() => setScreen("login")}
          onNavigateAdmin={() => setScreen("admin")}
          initialStatusFilter={queueStatusFilter}
          onSelect={(a) => {
            setApplicant(a);
            setScreen("report");
          }}
        />
      )}
      {screen === "report" && applicant && (
        <ReportScreen
          applicant={applicant}
          onBack={() => {
            setQueueStatusFilter("All");
            setScreen("search");
          }}
          onLogout={() => setScreen("login")}
          onNavigateAdmin={() => setScreen("admin")}
        />
      )}
      {screen === "admin" && (
        <AdminScreen
          onLogout={() => setScreen("login")}
          onNavigateSearch={() => {
            setQueueStatusFilter("All");
            setScreen("search");
          }}
          onOpenQueue={(status) => {
            setQueueStatusFilter(status);
            setScreen("search");
          }}
        />
      )}
    </div>
  );
}
