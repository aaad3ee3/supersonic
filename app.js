// supersonic-app.entry.jsx
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Ticket,
  Headphones,
  User,
  Search,
  Bell,
  Gamepad2,
  Gift,
  Radio,
  Wallet,
  ChevronLeft,
  X,
  Copy,
  ArrowLeftRight,
  Link2,
  Key,
  HelpCircle,
  LogOut,
  Heart,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Music2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Loader2,
  PackageSearch,
  Smartphone,
  Download,
  Zap,
  ShieldCheck
} from "lucide-react";
var BANNERS = [
  { title: "\u0627\u0634\u062D\u0646 \u062C\u0645\u064A\u0639 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0644\u0627\u064A\u0641 \u0627\u0644\u0622\u0646", sub: "\u0623\u0633\u0631\u0639 \u0648\u0642\u062A \u0648\u0623\u0641\u0636\u0644 \u0633\u0639\u0631 \u0639\u0628\u0631 Supersonic", icon: Radio },
  { title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0647\u062F\u0627\u064A\u0627 \u0639\u0627\u0644\u0645\u064A\u0629", sub: "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646\u060C \u0646\u062A\u0641\u0644\u064A\u0643\u0633\u060C \u0633\u062A\u064A\u0645 \u0648\u0623\u0643\u062B\u0631", icon: Gift },
  { title: "\u0645\u062D\u0627\u0641\u0638 \u0631\u0642\u0645\u064A\u0629 \u0628\u0644\u0645\u0633\u0629 \u0648\u062D\u062F\u0629", sub: "\u0632\u064A\u0646 \u0643\u0627\u0634\u060C \u0634\u0627\u0645 \u0643\u0627\u0634\u060C \u0628\u0627\u064A\u0633\u0644", icon: Wallet }
];
var FILTERS = [
  { id: "all", label: "\u0627\u0644\u0643\u0644" },
  { id: "games", label: "\u0627\u0644\u0623\u0644\u0639\u0627\u0628" },
  { id: "media", label: "\u0645\u064A\u062F\u064A\u0627" },
  { id: "gifts", label: "\u0647\u062F\u0627\u064A\u0627" },
  { id: "wallets", label: "\u0628\u0631\u0627\u0645\u062C" },
  { id: "rashq", label: "\u0631\u0634\u0642" }
];
var GAMES = [
  { name: "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644", tag: "2 \u0641\u0626\u0629" },
  { name: "\u0641\u0631\u064A \u0641\u0627\u064A\u0631", tag: "2 \u0641\u0626\u0629" },
  { name: "\u0628\u0644\u0648\u062F \u0633\u062A\u0631\u0627\u064A\u0643", tag: "2 \u0641\u0626\u0629" },
  { name: "\u0644\u0648\u0631\u062F\u0633 \u0645\u0648\u0628\u0627\u064A\u0644", tag: "3 \u0645\u0646\u062A\u062C" },
  { name: "\u0627\u0644\u0641\u0627\u062A\u062D\u0648\u0646 \u0627\u0644\u0630\u0647\u0628\u064A", tag: "5 \u0645\u0646\u062A\u062C" },
  { name: "\u064A\u0644\u0627 \u0644\u0648\u062F\u0648", tag: "1 \u0645\u0646\u062A\u062C" }
];
var GIFTS = [
  { name: "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646", tag: "13 \u0641\u0626\u0629" },
  { name: "\u0631\u064A\u0632\u0631 \u062C\u0648\u0644\u062F", tag: "3 \u0641\u0626\u0629" },
  { name: "\u0625\u0643\u0633 \u0628\u0648\u0643\u0633", tag: "6 \u0641\u0626\u0629" },
  { name: "\u0646\u062A\u0641\u0644\u064A\u0643\u0633", tag: "3 \u0641\u0626\u0629" },
  { name: "\u0622\u064A\u062A\u0648\u0646\u0632", tag: "6 \u0641\u0626\u0629" },
  { name: "\u0633\u062A\u064A\u0645", tag: "4 \u0641\u0626\u0629" }
];
var MEDIA = [
  { name: "\u0623\u0648\u0644\u0648 \u0644\u0627\u064A\u0641", tag: "1 \u0645\u0646\u062A\u062C" },
  { name: "\u0623\u0648\u0644\u0627\u0645\u064A\u062A", tag: "1 \u0645\u0646\u062A\u062C" },
  { name: "\u0623\u0648\u0647\u0644\u0627 \u0634\u0627\u062A", tag: "1 \u0645\u0646\u062A\u062C" },
  { name: "\u0628\u064A\u062C\u0648 \u0644\u0627\u064A\u0641", tag: "1 \u0645\u0646\u062A\u062C" },
  { name: "\u064A\u0644\u0627 \u0644\u0627\u064A\u0641", tag: "3 \u0645\u0646\u062A\u062C" },
  { name: "\u0647\u0648\u0628\u064A", tag: "1 \u0645\u0646\u062A\u062C" }
];
var WALLETS = [
  { name: "\u0632\u064A\u0646 \u0643\u0627\u0634", tag: "Zain Cash" },
  { name: "\u0628\u0627\u064A\u0633\u0644", tag: "Paycell" },
  { name: "\u0634\u0627\u0645 \u0643\u0627\u0634", tag: "Sham Cash" },
  { name: "\u0648\u064A\u0634 \u0645\u0648\u0646\u064A", tag: "Wish Money" }
];
var RASHQ_API_BASE = "https://REPLACE-WITH-YOUR-RAILWAY-URL";
var RASHQ_SITE_TOKEN = "REPLACE-WITH-YOUR-SITE-TOKEN";
var MARKUP = 1.25;
function priced(base) {
  return base * MARKUP;
}
function fmt(n) {
  return n >= 1 ? n.toFixed(2) : n.toFixed(4);
}
var RASHQ_PLATFORMS = [
  {
    key: "instagram",
    label: "\u0627\u0646\u0633\u062A\u0642\u0631\u0627\u0645",
    Icon: Instagram,
    services: [
      { id: 401, name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062D\u0642\u064A\u0642\u064A \u0633\u0631\u0639\u0629 \u2014 \u0628\u062F\u0648\u0646 \u0636\u0645\u0627\u0646", min: 100, max: 1e6, base: 0.532 },
      { id: 402, name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062D\u0642\u064A\u0642\u064A \u0633\u0631\u0639\u0629 \u2014 \u0636\u0645\u0627\u0646 30 \u064A\u0648\u0645", min: 100, max: 1e6, base: 0.644 },
      { id: 283, name: "\u0644\u0627\u064A\u0643\u0627\u062A \u0641\u0648\u0631\u064A\u0629 \u2014 \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629", min: 10, max: 1e6, base: 0.04004 }
    ]
  },
  {
    key: "tiktok",
    label: "\u062A\u064A\u0643 \u062A\u0648\u0643",
    Icon: Music2,
    services: [
      { id: 139, name: "\u0645\u0634\u0627\u0647\u062F\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645", min: 100, max: 217545811, base: 0.018 },
      { id: 130, name: "\u0644\u0627\u064A\u0643\u0627\u062A \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645", min: 50, max: 5e6, base: 0.085 },
      { id: 132, name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u0641\u0648\u0631\u064A \u2014 \u0628\u062F\u0648\u0646 \u062A\u0639\u0648\u064A\u0636", min: 10, max: 1e6, base: 1.976510067114094 }
    ]
  },
  {
    key: "facebook",
    label: "\u0641\u064A\u0633\u0628\u0648\u0643",
    Icon: Facebook,
    services: [
      { id: 363, name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u064A\u0629 \u2014 \u0628\u062F\u0648\u0646 \u0636\u0645\u0627\u0646", min: 10, max: 1e4, base: 0.296325 },
      { id: 397, name: "\u0625\u0639\u062C\u0627\u0628\u0627\u062A \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645 \u0648\u0633\u0631\u064A\u0639", min: 10, max: 1e6, base: 0.40932 }
    ]
  },
  {
    key: "telegram",
    label: "\u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645",
    Icon: Send,
    services: [
      { id: 287, name: "\u0623\u0639\u0636\u0627\u0621 \u0642\u0646\u0627\u0629 \u2014 \u0636\u0645\u0627\u0646 7 \u0623\u064A\u0627\u0645", min: 1, max: 1e6, base: 0.155115 },
      { id: 460, name: "\u0646\u062C\u0648\u0645 Stars \u0644\u062A\u0641\u0627\u0639\u0644 \u0645\u0646\u0634\u0648\u0631", min: 1, max: 1e4, base: 26.286 }
    ]
  },
  {
    key: "youtube",
    label: "\u064A\u0648\u062A\u064A\u0648\u0628",
    Icon: Youtube,
    services: [
      { id: 269, name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u2014 \u0633\u0631\u064A\u0639", min: 200, max: 1e5, base: 0.3 },
      { id: 270, name: "\u0644\u0627\u064A\u0643\u0627\u062A \u2014 \u0636\u0645\u0627\u0646 30 \u064A\u0648\u0645", min: 10, max: 2e4, base: 0.48 }
    ]
  },
  {
    key: "whatsapp",
    label: "\u0648\u0627\u062A\u0633\u0627\u0628",
    Icon: MessageCircle,
    services: [
      { id: 140, name: "\u0623\u0639\u0636\u0627\u0621 \u0642\u0646\u0627\u0629 \u062D\u0642\u064A\u0642\u064A\u0648\u0646", min: 10, max: 1e4, base: 2.5 },
      { id: 414, name: "\u062A\u0641\u0627\u0639\u0644 \u0645\u0646\u0634\u0648\u0631 \u{1F44F}", min: 10, max: 1e5, base: 1.10214 }
    ]
  }
];
var SECTIONS = [
  { key: "games", title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0623\u0644\u0639\u0627\u0628", Icon: Gamepad2, items: GAMES },
  { key: "media", title: "\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0644\u0627\u064A\u0641 \u0648\u0627\u0644\u0634\u0627\u062A", Icon: Radio, items: MEDIA },
  { key: "gifts", title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0647\u062F\u0627\u064A\u0627", Icon: Gift, items: GIFTS },
  { key: "wallets", title: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0631\u0642\u0645\u064A\u0629", Icon: Wallet, items: WALLETS }
];
var PRODUCT_PACKAGES = {
  "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644": {
    idLabel: "\u0622\u064A\u062F\u064A \u0627\u0644\u0644\u0627\u0639\u0628 (Player ID)",
    packages: [
      { label: "60 UC", base: 0.99 },
      { label: "325 UC", base: 4.99 },
      { label: "660 UC", base: 9.99 },
      { label: "1800 UC", base: 24.99 },
      { label: "3850 UC", base: 49.99 },
      { label: "8100 UC", base: 99.99 }
    ]
  },
  "\u0641\u0631\u064A \u0641\u0627\u064A\u0631": {
    idLabel: "\u0622\u064A\u062F\u064A \u0627\u0644\u0644\u0627\u0639\u0628 (Player ID)",
    packages: [
      { label: "100 \u062C\u0648\u0647\u0631\u0629", base: 0.99 },
      { label: "310 \u062C\u0648\u0647\u0631\u0629", base: 2.99 },
      { label: "520 \u062C\u0648\u0647\u0631\u0629", base: 4.99 },
      { label: "1060 \u062C\u0648\u0647\u0631\u0629", base: 9.99 },
      { label: "2180 \u062C\u0648\u0647\u0631\u0629", base: 19.99 }
    ]
  },
  "\u0646\u062A\u0641\u0644\u064A\u0643\u0633": {
    idLabel: null,
    packages: [
      { label: "\u0628\u0637\u0627\u0642\u0629 $10", base: 10.5 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $25", base: 25.8 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $50", base: 51 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $100", base: 101.5 }
    ]
  },
  "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646": {
    idLabel: null,
    packages: [
      { label: "\u0628\u0637\u0627\u0642\u0629 $10", base: 10.5 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $25", base: 25.8 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $50", base: 51 }
    ]
  },
  "\u0633\u062A\u064A\u0645": {
    idLabel: null,
    packages: [
      { label: "\u0628\u0637\u0627\u0642\u0629 $20", base: 20.6 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $50", base: 51 },
      { label: "\u0628\u0637\u0627\u0642\u0629 $100", base: 101.5 }
    ]
  }
};
var CURRENCIES = [
  { id: "LYD", balance: "150.500", spent: "42.000" },
  { id: "USD", balance: "32.75", spent: "8.10" },
  { id: "BANK", balance: "0.00", spent: "0.00" }
];
var NAV_ITEMS = [
  { id: "home", label: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", Icon: Home },
  { id: "purchases", label: "\u0645\u0634\u062A\u0631\u064A\u0627\u062A\u064A", Icon: Ticket },
  { id: "support", label: "\u0627\u0644\u062F\u0639\u0645", Icon: Headphones },
  { id: "account", label: "\u062D\u0633\u0627\u0628\u064A", Icon: User }
];
function SpeedStreaks() {
  return /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-0 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -right-8 top-3 w-52 h-2.5 bg-gradient-to-l from-purple-300 to-transparent rotate-12 blur-sm opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -right-2 top-11 w-36 h-1.5 bg-gradient-to-l from-purple-200 to-transparent rotate-12 blur-sm opacity-50" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -right-14 top-20 w-60 h-3 bg-gradient-to-l from-purple-600 to-transparent rotate-12 blur-md opacity-40" }));
}
function GlowOrbs() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-purple-900 rounded-full blur-3xl opacity-30" }), /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute bottom-0 -right-16 w-56 h-56 bg-purple-800 rounded-full blur-3xl opacity-20" }));
}
function CategoryTile({ item, Icon, onOpen }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onOpen(item),
      className: "flex flex-col items-center gap-2 shrink-0 w-20 active:scale-95 transition-transform"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-800 to-purple-950 border border-purple-700 flex items-center justify-center shadow-lg" }, /* @__PURE__ */ React.createElement(Icon, { className: "w-7 h-7 text-purple-300" })),
    /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-gray-300 text-center leading-tight" }, item.name),
    /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-purple-500" }, item.tag)
  );
}
function SectionHeader({ title, Icon }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-4 mt-7 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold text-[15px]" }, title)), /* @__PURE__ */ React.createElement("button", { className: "flex items-center text-purple-400 text-xs gap-1" }, "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644 ", /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-3.5 h-3.5" })));
}
function CategoryRow({ items, Icon, onOpen }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 px-4 overflow-x-auto pb-1", style: { scrollbarWidth: "none" } }, items.map((item, i) => /* @__PURE__ */ React.createElement(CategoryTile, { key: i, item, Icon, onOpen })));
}
function Header() {
  return /* @__PURE__ */ React.createElement("header", { className: "sticky top-0 z-20 bg-black border-b border-purple-950 px-4 py-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-4 h-4 text-white" })), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-black italic tracking-tight bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent" }, "Supersonic")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("button", { className: "w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-purple-300" })), /* @__PURE__ */ React.createElement("button", { className: "w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center relative" }, /* @__PURE__ */ React.createElement(Bell, { className: "w-4 h-4 text-purple-300" }), /* @__PURE__ */ React.createElement("span", { className: "absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full" }))));
}
function BottomNav({ tab, onChange }) {
  return /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: "fixed bottom-0 inset-x-0 z-20 bg-black border-t border-purple-950",
      style: { maxWidth: 480, margin: "0 auto" }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-around py-2" }, NAV_ITEMS.map(({ id, label, Icon }) => {
      const active = tab === id;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: id,
          onClick: () => onChange(id),
          className: "flex flex-col items-center gap-1 px-3 py-1.5 relative"
        },
        active && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-2 w-8 h-1 rounded-full bg-purple-500" }),
        /* @__PURE__ */ React.createElement(Icon, { className: active ? "w-5 h-5 text-purple-400" : "w-5 h-5 text-gray-500", strokeWidth: active ? 2.5 : 2 }),
        /* @__PURE__ */ React.createElement("span", { className: active ? "text-[10px] text-purple-300 font-bold" : "text-[10px] text-gray-500" }, label)
      );
    }))
  );
}
function Footer({ showToast }) {
  const links = ["\u0627\u0644\u062A\u0633\u0648\u064A\u0642 \u0628\u0627\u0644\u0639\u0645\u0648\u0644\u0629", "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629", "API"];
  return /* @__PURE__ */ React.createElement("footer", { className: "mt-10 mx-4 mb-6 border-t border-purple-950 pt-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-x-5 gap-y-2 text-xs text-purple-400 mb-5" }, links.map((l) => /* @__PURE__ */ React.createElement("button", { key: l }, l))), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 space-y-1 mb-5" }, /* @__PURE__ */ React.createElement("p", null, "\u062E\u062F\u0645\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621: support@supersonic.ly"), /* @__PURE__ */ React.createElement("p", null, "\u0648\u0627\u062A\u0633\u0627\u0628: 0910000000")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => showToast("\u0642\u0631\u064A\u0628\u064B\u0627 \u0639\u0644\u0649 Google Play"),
      className: "flex-1 flex items-center justify-center gap-2 bg-gray-950 border border-purple-900 rounded-xl py-2.5 text-xs text-gray-300"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-3.5 h-3.5" }),
    " Google Play"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => showToast("\u0642\u0631\u064A\u0628\u064B\u0627 \u0639\u0644\u0649 App Store"),
      className: "flex-1 flex items-center justify-center gap-2 bg-gray-950 border border-purple-900 rounded-xl py-2.5 text-xs text-gray-300"
    },
    /* @__PURE__ */ React.createElement(Smartphone, { className: "w-3.5 h-3.5" }),
    " App Store"
  )), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-gray-600 text-center" }, "\xA9 Supersonic \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629"));
}
function RashqSection({ onOpenService, livePrices, apiState }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-4 mt-7 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold text-[15px]" }, "\u0631\u0634\u0642 \u2014 \u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u0648\u062A\u0641\u0627\u0639\u0644")), apiState === "error" && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-amber-500" }, "\u0623\u0633\u0639\u0627\u0631 \u062A\u0642\u062F\u064A\u0631\u064A\u0629 \u2014 \u0627\u0644\u0628\u0627\u0643 \u0627\u0646\u062F \u063A\u064A\u0631 \u0645\u062A\u0635\u0644"), apiState === "loading" && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-gray-500" }, "\u064A\u062D\u062F\u0651\u062B \u0627\u0644\u0623\u0633\u0639\u0627\u0631...")), /* @__PURE__ */ React.createElement("div", { className: "px-4 space-y-5" }, RASHQ_PLATFORMS.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.key }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 mb-2" }, /* @__PURE__ */ React.createElement(p.Icon, { className: "w-3.5 h-3.5 text-purple-400" }), /* @__PURE__ */ React.createElement("p", { className: "text-purple-300 text-xs font-bold" }, p.label)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, p.services.map((s) => {
    const unitPrice = livePrices[s.id] ?? priced(s.base);
    const isLive = livePrices[s.id] != null;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s.id,
        onClick: () => onOpenService(s, p.label, unitPrice, isLive),
        className: "w-full flex items-center justify-between bg-gray-950 border border-purple-900 rounded-xl px-3.5 py-3"
      },
      /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4 text-gray-600 shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: "flex-1 text-right px-3" }, /* @__PURE__ */ React.createElement("span", { className: "block text-gray-200 text-xs" }, s.name), /* @__PURE__ */ React.createElement("span", { className: "block text-purple-500 text-[10px] mt-1" }, "\u0645\u0646 ", fmt(unitPrice), "$ / 1000"))
    );
  }))))));
}
function RashqOrderSheet({ order, onClose, showToast }) {
  const { service, platformLabel, unitPrice, isLive } = order;
  const [qty, setQty] = useState(service.min);
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const total = unitPrice / 1e3 * qty;
  const backendReady = !RASHQ_API_BASE.includes("REPLACE-WITH");
  async function submit() {
    if (!backendReady) {
      showToast("\u0627\u0644\u0628\u0627\u0643 \u0627\u0646\u062F \u0645\u0648 \u0645\u0631\u0628\u0648\u0637 \u0628\u0639\u062F \u2014 \u0631\u0627\u062C\u0639 RASHQ_API_BASE \u0628\u0627\u0644\u0643\u0648\u062F");
      onClose();
      return;
    }
    if (!link.trim()) {
      showToast("\u062D\u0637 \u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u0648\u0644");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${RASHQ_API_BASE}/api/rashq/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Site-Token": RASHQ_SITE_TOKEN },
        body: JSON.stringify({ service_id: service.id, quantity: qty, link: link.trim() })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`\u062A\u0645 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u2014 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 ${data.order_number}`);
        onClose();
      } else {
        showToast(data.error || "\u062A\u0639\u0630\u0631 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0637\u0644\u0628");
      }
    } catch (e) {
      showToast("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-30 flex items-end justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black", style: { opacity: 0.7 }, onClick: onClose }), /* @__PURE__ */ React.createElement("div", { className: "relative w-full bg-gray-950 border-t border-purple-800 rounded-t-3xl p-5 pb-8", style: { maxWidth: 480 } }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 text-gray-400" })), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold text-xs" }, platformLabel, " \u2014 ", service.name), /* @__PURE__ */ React.createElement("span", { className: "w-8" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-400 block mb-1.5" }, "\u0627\u0644\u0631\u0627\u0628\u0637"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: link,
      onChange: (e) => setLink(e.target.value),
      placeholder: "https://...",
      className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none",
      dir: "ltr"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-400 block mb-1.5" }, "\u0627\u0644\u0643\u0645\u064A\u0629 \u2014 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 ", service.min.toLocaleString("en-US"), " \u0648\u0627\u0644\u0623\u0642\u0635\u0649 ", service.max.toLocaleString("en-US")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: qty,
      min: service.min,
      max: service.max,
      onChange: (e) => setQty(Number(e.target.value) || 0),
      className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between bg-purple-950 border border-purple-800 rounded-xl px-4 py-3 mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-300 text-xs" }, "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A ", isLive ? "(\u0633\u0639\u0631 \u062D\u064A)" : "(\u062A\u0642\u062F\u064A\u0631\u064A)"), /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, "$", fmt(total))), !backendReady && /* @__PURE__ */ React.createElement("p", { className: "text-amber-500 text-[10px] text-center mb-3" }, "\u0627\u0644\u0628\u0627\u0643 \u0627\u0646\u062F \u0645\u0648 \u0645\u0631\u0628\u0648\u0637 \u0628\u0639\u062F \u2014 \u0627\u0644\u0637\u0644\u0628 \u0644\u0646 \u064A\u0646\u0641\u0630 \u0641\u0639\u0644\u064A\u064B\u0627 \u062D\u062A\u0649 \u062A\u0636\u064A\u0641 \u0631\u0627\u0628\u0637 Railway \u0628\u062B\u0627\u0628\u062A RASHQ_API_BASE"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submit,
      disabled: submitting,
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60",
      style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
    },
    submitting && /* @__PURE__ */ React.createElement(Loader2, { className: "w-4 h-4 animate-spin" }),
    submitting ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0646\u0641\u064A\u0630..." : "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0637\u0644\u0628"
  )));
}
function ProductSheet({ item, onClose, onPurchased }) {
  const info = PRODUCT_PACKAGES[item.name];
  const [step, setStep] = useState("packages");
  const [selected, setSelected] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  function confirmPurchase() {
    const code = "SS-" + Math.floor(1e5 + Math.random() * 9e5);
    setOrderCode(code);
    onPurchased({
      id: code,
      productName: item.name,
      packageLabel: selected.label,
      price: fmt(priced(selected.base)),
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("ar-LY", { day: "numeric", month: "short" })
    });
    setStep("success");
  }
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-30 flex items-end justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black", style: { opacity: 0.75 }, onClick: onClose }), /* @__PURE__ */ React.createElement("div", { className: "relative w-full bg-gray-950 border-t border-purple-800 rounded-t-3xl p-5 pb-8 overflow-hidden", style: { maxWidth: 480, maxHeight: "85vh", overflowY: "auto" } }, step !== "success" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-5" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 text-gray-400" })), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold text-sm" }, item.name), /* @__PURE__ */ React.createElement("span", { className: "w-8" }))), step === "packages" && (!info ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-10" }, /* @__PURE__ */ React.createElement(PackageSearch, { className: "w-10 h-10 text-purple-500 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 text-sm font-bold mb-1" }, "\u0627\u0644\u0628\u0627\u0642\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062A\u062C \u0642\u064A\u062F \u0627\u0644\u0625\u0636\u0627\u0641\u0629"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs" }, "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0628\u0627\u0644\u062F\u0639\u0645 \u0648\u0628\u0646\u062C\u0647\u0632\u0647\u0627 \u0644\u0643 \u0628\u0633\u0631\u0639\u0629")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-400 mb-3" }, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2.5 mb-2" }, info.packages.map((p, i) => {
    const active = selected === p;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: () => setSelected(p),
        className: active ? "rounded-2xl p-3.5 text-right border bg-purple-600 border-purple-400" : "rounded-2xl p-3.5 text-right border bg-black border-purple-900"
      },
      /* @__PURE__ */ React.createElement("span", { className: "block text-white text-sm font-bold mb-1" }, p.label),
      /* @__PURE__ */ React.createElement("span", { className: active ? "block text-purple-100 text-xs" : "block text-purple-500 text-xs" }, "$", fmt(priced(p.base)))
    );
  })), /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: !selected,
      onClick: () => setStep("checkout"),
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm mt-4 disabled:opacity-40",
      style: selected ? { boxShadow: "0 0 24px rgba(168,85,247,0.45)" } : void 0
    },
    "\u0645\u062A\u0627\u0628\u0639\u0629"
  ))), step === "checkout" && selected && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-950 border border-purple-800 rounded-2xl p-4 mb-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-white text-sm font-bold" }, selected.label), /* @__PURE__ */ React.createElement("p", { className: "text-purple-400 text-xs" }, item.name)), /* @__PURE__ */ React.createElement("p", { className: "text-white font-bold" }, "$", fmt(priced(selected.base)))), info.idLabel && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-400 block mb-1.5" }, info.idLabel), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: playerId,
      onChange: (e) => setPlayerId(e.target.value),
      placeholder: "123456789",
      className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none",
      dir: "ltr"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between bg-gray-900 border border-purple-900 rounded-xl px-4 py-3 mb-5" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2 text-gray-300 text-xs" }, /* @__PURE__ */ React.createElement(Wallet, { className: "w-3.5 h-3.5 text-purple-400" }), " \u0627\u0644\u062F\u0641\u0639 \u0645\u0646 \u0631\u0635\u064A\u062F\u0643"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-300 text-xs" }, "150.500 LYD \u0645\u062A\u0627\u062D")), /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: info.idLabel && !playerId.trim(),
      onClick: confirmPurchase,
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm disabled:opacity-40",
      style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
    },
    "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0634\u0631\u0627\u0621"
  )), step === "success" && /* @__PURE__ */ React.createElement("div", { className: "relative py-6 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 overflow-hidden pointer-events-none" }, /* @__PURE__ */ React.createElement(SpeedStreaks, null)), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center mx-auto mb-4",
      style: { boxShadow: "0 0 40px rgba(168,85,247,0.6)" }
    },
    /* @__PURE__ */ React.createElement(Check, { className: "w-10 h-10 text-white", strokeWidth: 3 })
  ), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold text-lg mb-1" }, "\u062A\u0645 \u0627\u0644\u0634\u0631\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-xs mb-5" }, selected?.label, " \u2014 ", item.name), /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-purple-950 border border-purple-700 rounded-full px-4 py-2 mb-6" }, /* @__PURE__ */ React.createElement("span", { className: "text-purple-300 text-xs" }, "\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628"), /* @__PURE__ */ React.createElement("span", { className: "text-white text-xs font-bold", dir: "ltr" }, orderCode)), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-[11px] mb-6" }, "\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u062A\u0647 \u0644\u0635\u0641\u062D\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A\u064A"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm",
      style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
    },
    "\u062A\u0645"
  )))));
}
function HomeView({ filter, setFilter, slide, showToast, onOpenRashq, rashqLive, rashqApiState, onOpenProduct }) {
  const shown = filter === "all" ? SECTIONS : SECTIONS.filter((s) => s.key === filter);
  const showRashq = filter === "all" || filter === "rashq";
  const Banner = BANNERS[slide];
  const BannerIcon = Banner.icon;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mx-4 mt-4 rounded-3xl bg-gradient-to-br from-purple-800 via-purple-950 to-black border border-purple-700 p-5 relative overflow-hidden h-32 flex flex-col justify-center" }, /* @__PURE__ */ React.createElement(SpeedStreaks, null), /* @__PURE__ */ React.createElement(BannerIcon, { className: "w-7 h-7 text-purple-300 mb-2 relative z-10" }), /* @__PURE__ */ React.createElement("h2", { className: "text-white font-bold text-base relative z-10" }, Banner.title), /* @__PURE__ */ React.createElement("p", { className: "text-purple-300 text-xs mt-1 relative z-10" }, Banner.sub), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 absolute bottom-3 left-5 z-10" }, BANNERS.map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: i === slide ? "h-1.5 w-5 rounded-full bg-purple-400" : "h-1.5 w-1.5 rounded-full bg-purple-900" })))), /* @__PURE__ */ React.createElement("div", { className: "mx-4 mt-4 flex items-center gap-2 bg-gray-950 border border-purple-900 rounded-2xl px-4 py-3" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-purple-500" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C\u060C \u0641\u0626\u0629 \u0623\u0648 \u062E\u062F\u0645\u0629...",
      className: "bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 px-4 mt-4 overflow-x-auto", style: { scrollbarWidth: "none" } }, FILTERS.map((f) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: f.id,
      onClick: () => setFilter(f.id),
      className: filter === f.id ? "shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border bg-transparent border-purple-900 text-gray-400"
    },
    f.label
  ))), shown.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.key }, /* @__PURE__ */ React.createElement(SectionHeader, { title: s.title, Icon: s.Icon }), /* @__PURE__ */ React.createElement(CategoryRow, { items: s.items, Icon: s.Icon, onOpen: onOpenProduct }))), showRashq && /* @__PURE__ */ React.createElement(RashqSection, { onOpenService: onOpenRashq, livePrices: rashqLive, apiState: rashqApiState }), /* @__PURE__ */ React.createElement(Footer, { showToast }));
}
function PurchasesView({ goHome, purchases }) {
  const [sub, setSub] = useState("other");
  return /* @__PURE__ */ React.createElement("div", { className: "px-4 pt-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-6" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSub("other"),
      className: sub === "other" ? "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"
    },
    "\u0645\u0646\u062A\u062C\u0627\u062A \u0623\u062E\u0631\u0649"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSub("cards"),
      className: sub === "cards" ? "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"
    },
    "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A"
  )), sub === "cards" && purchases.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 pb-4" }, purchases.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, className: "bg-gray-950 border border-purple-900 rounded-2xl px-4 py-3.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "text-white text-sm font-bold" }, "$", p.price), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-[10px]" }, p.date)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-200 text-xs" }, p.packageLabel), /* @__PURE__ */ React.createElement("p", { className: "text-purple-400 text-[11px]" }, p.productName), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 text-[10px] mt-0.5", dir: "ltr" }, p.id))))) : /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center py-14 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-purple-800 to-purple-950 border border-purple-700 flex items-center justify-center mb-4" }, /* @__PURE__ */ React.createElement(PackageSearch, { className: "w-9 h-9 text-purple-400" })), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 text-sm font-bold mb-1" }, "\u0644\u0633\u0647 \u0645\u0627 \u0633\u0648\u064A\u062A \u0623\u064A \u0639\u0645\u0644\u064A\u0629 \u0634\u0631\u0627\u0621"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs mb-5" }, "\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u062A\u062C\u0631 \u0648\u0627\u0628\u062F\u0623 \u0623\u0648\u0644 \u0639\u0645\u0644\u064A\u0629 \u0634\u062D\u0646"), /* @__PURE__ */ React.createElement("button", { onClick: goHome, className: "text-purple-300 text-xs font-bold border border-purple-700 rounded-full px-5 py-2" }, "\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u062A\u062C\u0631")));
}
function SupportView() {
  const items = [
    { label: "\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628", Icon: MessageCircle },
    { label: "\u062A\u0627\u0628\u0639 \u0642\u0646\u0627\u062A\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0643\u0644 \u062C\u062F\u064A\u062F", Icon: MessageCircle },
    { label: "\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0639\u0628\u0631 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645", Icon: Send },
    { label: "\u062A\u0627\u0628\u0639 \u0642\u0646\u0627\u062A\u0646\u0627 \u0639\u0644\u0649 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645 \u0644\u0643\u0644 \u062C\u062F\u064A\u062F", Icon: Send }
  ];
  const socials = [Instagram, Music2, Facebook, Youtube];
  return /* @__PURE__ */ React.createElement("div", { className: "px-4 pt-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl bg-gradient-to-br from-purple-900 to-black border border-purple-800 p-5 text-center mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-white font-bold text-lg mb-1" }, "\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-300 text-xs" }, "\u064A\u0627 \u0647\u0644\u0627! \u0644\u0627 \u062A\u062A\u0631\u062F\u062F \u0628\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0641\u064A \u062D\u0627\u0644 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0623\u064A \u0627\u0633\u062A\u0641\u0633\u0627\u0631")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-8" }, items.map((it, i) => {
    const ItIcon = it.Icon;
    return /* @__PURE__ */ React.createElement("button", { key: i, className: "w-full flex items-center justify-between bg-gray-950 border border-purple-900 rounded-2xl px-4 py-4" }, /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4 text-gray-600" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-200 flex-1 text-center" }, it.label), /* @__PURE__ */ React.createElement("span", { className: "w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(ItIcon, { className: "w-4 h-4 text-white" })));
  })), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500 mb-3 text-center" }, "\u062A\u0627\u0628\u0639\u0646\u0627 \u0639\u0644\u0649 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0648\u0627\u0635\u0644"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center gap-3" }, socials.map((SocIcon, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: "w-11 h-11 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(SocIcon, { className: "w-4 h-4 text-purple-300" })))));
}
function AccountView({ currency, setCurrency, onTopUp, showToast, onLogout }) {
  const cur = CURRENCIES.find((c) => c.id === currency);
  const menu = [
    { label: "\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629", Icon: User },
    { label: "\u0627\u0644\u0645\u0641\u0636\u0644\u0629", Icon: Heart },
    { label: "\u0627\u0644\u062A\u0633\u0648\u064A\u0642 \u0628\u0627\u0644\u0639\u0645\u0648\u0644\u0629", Icon: Link2, badge: "\u062C\u062F\u064A\u062F" },
    { label: "\u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u0640 API", Icon: Key },
    { label: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629", Icon: HelpCircle }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "px-4 pt-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center mb-6" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-950 flex items-center justify-center text-2xl font-black text-white ring-4 ring-purple-700 mb-3",
      style: { boxShadow: "0 0 30px rgba(168,85,247,0.5)" }
    },
    "AB"
  ), /* @__PURE__ */ React.createElement("h2", { className: "text-white font-bold text-lg" }, "Abdrhman"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs mb-2" }, "xxxxxxxx@gmail.com"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1 bg-purple-950 border border-purple-700 text-purple-300 text-[11px] px-3 py-1 rounded-full" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3 h-3" }), " \u0639\u0636\u0648 \u0645\u0645\u064A\u0632 \u0641\u064A Supersonic")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-4" }, CURRENCIES.map((c) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: c.id,
      onClick: () => setCurrency(c.id),
      className: currency === c.id ? "flex-1 py-2 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"
    },
    c.id
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-950 border border-purple-900 rounded-2xl p-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-[11px] mb-1" }, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0646\u0641\u0642"), /* @__PURE__ */ React.createElement("p", { className: "text-white font-bold" }, cur.spent)), /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700 rounded-2xl p-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-purple-300 text-[11px] mb-1" }, "\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A"), /* @__PURE__ */ React.createElement("p", { className: "text-white font-bold" }, cur.balance))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mb-3" }, /* @__PURE__ */ React.createElement("button", { className: "flex-1 flex items-center justify-center gap-2 bg-gray-950 border border-purple-900 rounded-xl py-3 text-xs text-gray-200" }, /* @__PURE__ */ React.createElement(ArrowLeftRight, { className: "w-4 h-4" }), " \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onTopUp,
      className: "flex-1 flex items-center justify-center gap-2 bg-purple-600 rounded-xl py-3 text-xs text-white font-bold",
      style: { boxShadow: "0 0 20px rgba(168,85,247,0.4)" }
    },
    /* @__PURE__ */ React.createElement(Wallet, { className: "w-4 h-4" }),
    " \u0634\u062D\u0646 \u0627\u0644\u0631\u0635\u064A\u062F"
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => showToast("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0645\u0639\u0631\u0641"),
      className: "w-full flex items-center justify-center gap-2 bg-gray-950 border border-purple-900 rounded-xl py-3 text-xs text-gray-300 mb-6"
    },
    /* @__PURE__ */ React.createElement(Copy, { className: "w-3.5 h-3.5" }),
    " \u0646\u0633\u062E \u0627\u0644\u0645\u0639\u0631\u0641"
  ), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 mb-6" }, menu.map((m, i) => {
    const MIcon = m.Icon;
    return /* @__PURE__ */ React.createElement("button", { key: i, className: "w-full flex items-center justify-between bg-gray-950 border border-purple-900 rounded-2xl px-4 py-3.5" }, /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4 text-gray-600" }), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2 flex-1 justify-end text-sm text-gray-200" }, m.badge && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded-full" }, m.badge), m.label), /* @__PURE__ */ React.createElement("span", { className: "w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center ml-2" }, /* @__PURE__ */ React.createElement(MIcon, { className: "w-4 h-4 text-purple-400" })));
  })), /* @__PURE__ */ React.createElement("button", { onClick: onLogout, className: "w-full flex items-center justify-center gap-2 text-red-400 text-sm py-3 mb-6" }, /* @__PURE__ */ React.createElement(LogOut, { className: "w-4 h-4" }), " \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C"));
}
function TopUpSheet({ onClose, showToast }) {
  const [method, setMethod] = useState("card");
  const [step, setStep] = useState("form");
  const [code, setCode] = useState("");
  function submit() {
    if (method === "bank") {
      setStep("otp");
      return;
    }
    showToast("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0634\u062D\u0646 \u0628\u0646\u062C\u0627\u062D");
    onClose();
  }
  function confirmOtp() {
    showToast("\u062A\u0645 \u0634\u062D\u0646 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D");
    onClose();
  }
  const methods = [
    { id: "card", label: "\u0644\u064A\u0628\u064A\u0627\u0646\u0627 / \u0645\u062F\u0627\u0631" },
    { id: "bank", label: "\u0628\u0637\u0627\u0642\u0629 \u0645\u0635\u0631\u0641\u064A\u0629" },
    { id: "transfer", label: "\u062A\u062D\u0648\u064A\u0644 \u062F\u0627\u062E\u0644\u064A" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-30 flex items-end justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black", style: { opacity: 0.7 }, onClick: onClose }), /* @__PURE__ */ React.createElement("div", { className: "relative w-full bg-gray-950 border-t border-purple-800 rounded-t-3xl p-5 pb-8", style: { maxWidth: 480 } }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-5" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 text-gray-400" })), /* @__PURE__ */ React.createElement("h3", { className: "text-white font-bold" }, "\u0634\u062D\u0646 \u0627\u0644\u0631\u0635\u064A\u062F"), /* @__PURE__ */ React.createElement("span", { className: "w-8" })), step === "form" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-5" }, methods.map((m) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: m.id,
      onClick: () => setMethod(m.id),
      className: method === m.id ? "flex-1 py-2 rounded-xl text-[11px] font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2 rounded-xl text-[11px] font-bold border bg-transparent border-purple-900 text-gray-400"
    },
    m.label
  ))), method === "card" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-400" }, "\u0623\u062F\u062E\u0644 \u0643\u0648\u062F \u0643\u0631\u062A \u0627\u0644\u0634\u062D\u0646"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: code,
      onChange: (e) => setCode(e.target.value),
      placeholder: "XXXX-XXXX-XXXX",
      className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none"
    }
  )), method === "bank" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("input", { placeholder: "\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("input", { placeholder: "MM/YY", className: "w-1/2 bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" }), /* @__PURE__ */ React.createElement("input", { placeholder: "CVV", className: "w-1/2 bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" }))), method === "transfer" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("select", { className: "flex-1 bg-black border border-purple-900 rounded-xl px-3 py-3 text-white text-sm outline-none" }, /* @__PURE__ */ React.createElement("option", null, "\u0645\u0646: \u062F\u064A\u0646\u0627\u0631 \u0644\u064A\u0628\u064A"), /* @__PURE__ */ React.createElement("option", null, "\u0645\u0646: \u062F\u0648\u0644\u0627\u0631")), /* @__PURE__ */ React.createElement(ArrowLeftRight, { className: "w-4 h-4 text-purple-500" }), /* @__PURE__ */ React.createElement("select", { className: "flex-1 bg-black border border-purple-900 rounded-xl px-3 py-3 text-white text-sm outline-none" }, /* @__PURE__ */ React.createElement("option", null, "\u0625\u0644\u0649: \u062F\u0648\u0644\u0627\u0631"), /* @__PURE__ */ React.createElement("option", null, "\u0625\u0644\u0649: \u0645\u0635\u0631\u0641"))), /* @__PURE__ */ React.createElement("input", { placeholder: "\u0627\u0644\u0645\u0628\u0644\u063A", className: "w-full bg-black border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submit,
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm mt-5",
      style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
    },
    "\u062A\u0623\u0643\u064A\u062F"
  )), step === "otp" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-xs text-center mb-4" }, "\u0623\u062F\u062E\u0644 \u0643\u0648\u062F \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0645\u0631\u0633\u0644 \u0625\u0644\u0649 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center gap-2 mb-5", dir: "ltr" }, [0, 1, 2, 3].map((i) => /* @__PURE__ */ React.createElement("input", { key: i, maxLength: 1, className: "w-11 h-12 text-center bg-black border border-purple-800 rounded-xl text-white text-lg outline-none" }))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: confirmOtp,
      className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm",
      style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
    },
    "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0643\u0648\u062F"
  ))));
}
function AuthScreen({ onLogin }) {
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState("login");
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-black flex justify-center" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-full text-white font-sans flex flex-col justify-center px-6 relative overflow-hidden",
      style: { maxWidth: 480, minHeight: "100vh" }
    },
    /* @__PURE__ */ React.createElement(GlowOrbs, null),
    /* @__PURE__ */ React.createElement(SpeedStreaks, null),
    /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center mb-10" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center mb-4",
        style: { boxShadow: "0 0 30px rgba(168,85,247,0.5)" }
      },
      /* @__PURE__ */ React.createElement(Zap, { className: "w-8 h-8 text-white" })
    ), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-black italic bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent" }, "Supersonic"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs mt-1" }, "\u0645\u062A\u062C\u0631\u0643 \u0644\u0634\u062D\u0646 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-gray-950 border border-purple-900 rounded-xl px-4 py-3" }, /* @__PURE__ */ React.createElement(Mail, { className: "w-4 h-4 text-purple-500" }), /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", className: "bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-gray-950 border border-purple-900 rounded-xl px-4 py-3" }, /* @__PURE__ */ React.createElement(Lock, { className: "w-4 h-4 text-purple-500" }), /* @__PURE__ */ React.createElement("input", { type: showPass ? "text" : "password", placeholder: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631", className: "bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" }), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowPass((v) => !v), type: "button" }, showPass ? /* @__PURE__ */ React.createElement(EyeOff, { className: "w-4 h-4 text-gray-500" }) : /* @__PURE__ */ React.createElement(Eye, { className: "w-4 h-4 text-gray-500" })))), mode === "login" && /* @__PURE__ */ React.createElement("button", { className: "text-purple-400 text-xs mb-5 block" }, "\u0646\u0633\u064A\u062A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061F"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onLogin,
        className: "w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm mb-4",
        style: { boxShadow: "0 0 24px rgba(168,85,247,0.45)" }
      },
      mode === "login" ? "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" : "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628"
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 h-px bg-purple-950" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-600 text-[11px]" }, "\u0623\u0648"), /* @__PURE__ */ React.createElement("div", { className: "flex-1 h-px bg-purple-950" })), /* @__PURE__ */ React.createElement("button", { onClick: onLogin, className: "w-full flex items-center justify-center gap-2 bg-gray-950 border border-purple-900 rounded-xl py-3 text-sm text-gray-200 mb-6" }, /* @__PURE__ */ React.createElement("span", { className: "w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-purple-700" }, "G"), "\u0627\u0644\u062F\u062E\u0648\u0644 \u0639\u0628\u0631 Google"), /* @__PURE__ */ React.createElement("p", { className: "text-center text-xs text-gray-500" }, mode === "login" ? "\u0645\u0627 \u0639\u0646\u062F\u0643 \u062D\u0633\u0627\u0628\u061F " : "\u0639\u0646\u062F\u0643 \u062D\u0633\u0627\u0628\u061F ", /* @__PURE__ */ React.createElement("button", { onClick: () => setMode((m) => m === "login" ? "signup" : "login"), className: "text-purple-400 font-bold" }, mode === "login" ? "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F" : "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644")))
  ));
}
function Toast({ message }) {
  return /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-24 inset-x-0 z-40 flex justify-center px-6", style: { maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2", style: { boxShadow: "0 4px 20px rgba(168,85,247,0.5)" } }, /* @__PURE__ */ React.createElement(Check, { className: "w-3.5 h-3.5" }), " ", message));
}
function LoadingSpinner() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center py-24" }, /* @__PURE__ */ React.createElement(Loader2, { className: "w-7 h-7 text-purple-500 animate-spin" }));
}
function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [slide, setSlide] = useState(0);
  const [currency, setCurrency] = useState("LYD");
  const [showTopUp, setShowTopUp] = useState(false);
  const [rashqOrder, setRashqOrder] = useState(null);
  const [rashqLive, setRashqLive] = useState({});
  const [rashqApiState, setRashqApiState] = useState("idle");
  const [openProduct, setOpenProduct] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % BANNERS.length), 4e3);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (RASHQ_API_BASE.includes("REPLACE-WITH")) return;
    setRashqApiState("loading");
    fetch(`${RASHQ_API_BASE}/api/rashq/services`).then((res) => res.json()).then((data) => {
      if (!data.success) throw new Error("bad response");
      const map = {};
      data.services.forEach((s) => {
        map[s.service_id] = s.price_per_1000_usd;
      });
      setRashqLive(map);
      setRashqApiState("ready");
    }).catch(() => setRashqApiState("error"));
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);
  function goTab(next) {
    if (next === tab) return;
    setLoading(true);
    setTimeout(() => {
      setTab(next);
      setLoading(false);
    }, 280);
  }
  function showToast(msg) {
    setToast(msg);
  }
  if (!authed) return /* @__PURE__ */ React.createElement(AuthScreen, { onLogin: () => setAuthed(true) });
  return /* @__PURE__ */ React.createElement("div", { dir: "rtl", className: "min-h-screen bg-black flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-full relative text-white font-sans", style: { maxWidth: 480 } }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement("main", { className: "pb-28" }, loading ? /* @__PURE__ */ React.createElement(LoadingSpinner, null) : /* @__PURE__ */ React.createElement(React.Fragment, null, tab === "home" && /* @__PURE__ */ React.createElement(
    HomeView,
    {
      filter,
      setFilter,
      slide,
      showToast,
      rashqLive,
      rashqApiState,
      onOpenRashq: (service, platformLabel, unitPrice, isLive) => setRashqOrder({ service, platformLabel, unitPrice, isLive }),
      onOpenProduct: setOpenProduct
    }
  ), tab === "purchases" && /* @__PURE__ */ React.createElement(PurchasesView, { goHome: () => goTab("home"), purchases }), tab === "support" && /* @__PURE__ */ React.createElement(SupportView, null), tab === "account" && /* @__PURE__ */ React.createElement(
    AccountView,
    {
      currency,
      setCurrency,
      onTopUp: () => setShowTopUp(true),
      showToast,
      onLogout: () => setAuthed(false)
    }
  ))), /* @__PURE__ */ React.createElement(BottomNav, { tab, onChange: goTab })), showTopUp && /* @__PURE__ */ React.createElement(TopUpSheet, { onClose: () => setShowTopUp(false), showToast }), rashqOrder && /* @__PURE__ */ React.createElement(RashqOrderSheet, { order: rashqOrder, onClose: () => setRashqOrder(null), showToast }), openProduct && /* @__PURE__ */ React.createElement(
    ProductSheet,
    {
      item: openProduct,
      onClose: () => setOpenProduct(null),
      onPurchased: (record) => setPurchases((prev) => [record, ...prev])
    }
  ), toast && /* @__PURE__ */ React.createElement(Toast, { message: toast }));
}
createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
export {
  App as default
};

