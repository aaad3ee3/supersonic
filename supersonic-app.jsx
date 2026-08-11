// supersonic-app.jsx — source of truth. Compile with esbuild (bundle, format:esm, jsx:transform,
// external: react, react-dom, lucide-react) into docs/app.js. See CLAUDE.md.
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Home, Ticket, Headphones, User, Search, Bell, Gamepad2, Gift, Radio, Wallet, ChevronLeft, X, Copy, ArrowLeftRight, Link2, Key, HelpCircle, LogOut, Heart, MessageCircle, Send, Instagram, Facebook, Youtube, Music2, Mail, Lock, Eye, EyeOff, Check, Loader2, PackageSearch, Smartphone, Download, Zap, ShieldCheck, Target, Flame, Swords, Crown, Shield, Dice5, Disc, Gem, Box, Clapperboard, Music4, Monitor, CreditCard } from "lucide-react";
var BANNERS = [{
  title: "\u0627\u0634\u062D\u0646 \u062C\u0645\u064A\u0639 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0644\u0627\u064A\u0641 \u0627\u0644\u0622\u0646",
  sub: "\u0623\u0633\u0631\u0639 \u0648\u0642\u062A \u0648\u0623\u0641\u0636\u0644 \u0633\u0639\u0631 \u0639\u0628\u0631 Supersonic",
  icon: Radio
}, {
  title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0647\u062F\u0627\u064A\u0627 \u0639\u0627\u0644\u0645\u064A\u0629",
  sub: "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646\u060C \u0646\u062A\u0641\u0644\u064A\u0643\u0633\u060C \u0633\u062A\u064A\u0645 \u0648\u0623\u0643\u062B\u0631",
  icon: Gift
}, {
  title: "\u0645\u062D\u0627\u0641\u0638 \u0631\u0642\u0645\u064A\u0629 \u0628\u0644\u0645\u0633\u0629 \u0648\u062D\u062F\u0629",
  sub: "\u0632\u064A\u0646 \u0643\u0627\u0634\u060C \u0634\u0627\u0645 \u0643\u0627\u0634\u060C \u0628\u0627\u064A\u0633\u0644",
  icon: Wallet
}];
var FILTERS = [{
  id: "all",
  label: "\u0627\u0644\u0643\u0644"
}, {
  id: "games",
  label: "\u0627\u0644\u0623\u0644\u0639\u0627\u0628"
}, {
  id: "media",
  label: "\u0645\u064A\u062F\u064A\u0627"
}, {
  id: "gifts",
  label: "\u0647\u062F\u0627\u064A\u0627"
}, {
  id: "wallets",
  label: "\u0628\u0631\u0627\u0645\u062C"
}];
var GAMES = [{
  name: "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644",
  tag: "2 \u0641\u0626\u0629",
  Icon: Target,
  from: "from-amber-700",
  to: "to-amber-950",
  ic: "text-amber-300"
}, {
  name: "\u0641\u0631\u064A \u0641\u0627\u064A\u0631",
  tag: "2 \u0641\u0626\u0629",
  Icon: Flame,
  from: "from-orange-600",
  to: "to-orange-950",
  ic: "text-orange-300"
}, {
  name: "\u0628\u0644\u0648\u062F \u0633\u062A\u0631\u0627\u064A\u0643",
  tag: "2 \u0641\u0626\u0629",
  Icon: Swords,
  from: "from-red-700",
  to: "to-red-950",
  ic: "text-red-300"
}, {
  name: "\u0644\u0648\u0631\u062F\u0633 \u0645\u0648\u0628\u0627\u064A\u0644",
  tag: "3 \u0645\u0646\u062A\u062C",
  Icon: Crown,
  from: "from-yellow-600",
  to: "to-yellow-950",
  ic: "text-yellow-200"
}, {
  name: "\u0627\u0644\u0641\u0627\u062A\u062D\u0648\u0646 \u0627\u0644\u0630\u0647\u0628\u064A",
  tag: "5 \u0645\u0646\u062A\u062C",
  Icon: Shield,
  from: "from-amber-500",
  to: "to-amber-900",
  ic: "text-amber-100"
}, {
  name: "\u064A\u0644\u0627 \u0644\u0648\u062F\u0648",
  tag: "1 \u0645\u0646\u062A\u062C",
  Icon: Dice5,
  from: "from-emerald-600",
  to: "to-emerald-950",
  ic: "text-emerald-300"
}];
var GIFTS = [{
  name: "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646",
  tag: "13 \u0641\u0626\u0629",
  Icon: Disc,
  from: "from-blue-700",
  to: "to-blue-950",
  ic: "text-blue-300"
}, {
  name: "\u0631\u064A\u0632\u0631 \u062C\u0648\u0644\u062F",
  tag: "3 \u0641\u0626\u0629",
  Icon: Gem,
  from: "from-green-600",
  to: "to-green-950",
  ic: "text-green-300"
}, {
  name: "\u0625\u0643\u0633 \u0628\u0648\u0643\u0633",
  tag: "6 \u0641\u0626\u0629",
  Icon: Box,
  from: "from-emerald-700",
  to: "to-emerald-950",
  ic: "text-emerald-200"
}, {
  name: "\u0646\u062A\u0641\u0644\u064A\u0643\u0633",
  tag: "3 \u0641\u0626\u0629",
  Icon: Clapperboard,
  from: "from-red-700",
  to: "to-red-950",
  ic: "text-red-300"
}, {
  name: "\u0622\u064A\u062A\u0648\u0646\u0632",
  tag: "6 \u0641\u0626\u0629",
  Icon: Music4,
  from: "from-pink-600",
  to: "to-pink-950",
  ic: "text-pink-200"
}, {
  name: "\u0633\u062A\u064A\u0645",
  tag: "4 \u0641\u0626\u0629",
  Icon: Monitor,
  from: "from-slate-600",
  to: "to-slate-950",
  ic: "text-slate-300"
}];
var MEDIA_COLORS = [{
  from: "from-cyan-700",
  to: "to-cyan-950",
  ic: "text-cyan-300"
}, {
  from: "from-fuchsia-700",
  to: "to-fuchsia-950",
  ic: "text-fuchsia-300"
}, {
  from: "from-rose-700",
  to: "to-rose-950",
  ic: "text-rose-300"
}, {
  from: "from-indigo-700",
  to: "to-indigo-950",
  ic: "text-indigo-300"
}];
var MEDIA = [{
  name: "\u0623\u0648\u0644\u0648 \u0644\u0627\u064A\u0641",
  tag: "1 \u0645\u0646\u062A\u062C"
}, {
  name: "\u0623\u0648\u0644\u0627\u0645\u064A\u062A",
  tag: "1 \u0645\u0646\u062A\u062C"
}, {
  name: "\u0623\u0648\u0647\u0644\u0627 \u0634\u0627\u062A",
  tag: "1 \u0645\u0646\u062A\u062C"
}, {
  name: "\u0628\u064A\u062C\u0648 \u0644\u0627\u064A\u0641",
  tag: "1 \u0645\u0646\u062A\u062C"
}, {
  name: "\u064A\u0644\u0627 \u0644\u0627\u064A\u0641",
  tag: "3 \u0645\u0646\u062A\u062C"
}, {
  name: "\u0647\u0648\u0628\u064A",
  tag: "1 \u0645\u0646\u062A\u062C"
}].map((m, i) => ({
  ...m,
  Icon: Radio,
  ...MEDIA_COLORS[i % MEDIA_COLORS.length]
}));
var WALLETS = [{
  name: "\u0632\u064A\u0646 \u0643\u0627\u0634",
  tag: "Zain Cash",
  Icon: Wallet,
  from: "from-purple-700",
  to: "to-purple-950",
  ic: "text-purple-300"
}, {
  name: "\u0628\u0627\u064A\u0633\u0644",
  tag: "Paycell",
  Icon: CreditCard,
  from: "from-sky-700",
  to: "to-sky-950",
  ic: "text-sky-300"
}, {
  name: "\u0634\u0627\u0645 \u0643\u0627\u0634",
  tag: "Sham Cash",
  Icon: Wallet,
  from: "from-teal-700",
  to: "to-teal-950",
  ic: "text-teal-300"
}, {
  name: "\u0648\u064A\u0634 \u0645\u0648\u0646\u064A",
  tag: "Wish Money",
  Icon: CreditCard,
  from: "from-pink-700",
  to: "to-pink-950",
  ic: "text-pink-300"
}];
var RASHQ_API_BASE = "https://rashq-backend-production.up.railway.app";
var RASHQ_SITE_TOKEN = "5d4e7a6a5a4986a1bfed3b38c9bf2e74f81315a2f6794694";
var RASHQ_USD_TO_LYD = 12.5;
var RASHQ_MARKUP = 1.20;
var CARDS_MARKUP = 1.20;
var SESSION_STORAGE_KEY = "supersonic_session";

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.token ? parsed : null;
  } catch (e) {
    return null;
  }
}

function saveStoredSession(user, token) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user, token }));
  } catch (e) {}
}

function clearStoredSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {}
}
function pricedRashq(baseUsd) {
  return baseUsd * RASHQ_USD_TO_LYD * RASHQ_MARKUP;
}
function pricedCards(baseLyd) {
  return baseLyd * CARDS_MARKUP;
}
function fmt(n) {
  return n >= 1 ? n.toFixed(2) : n.toFixed(4);
}
var RASHQ_PLATFORMS = [{
  key: "instagram",
  label: "\u0627\u0646\u0633\u062A\u0642\u0631\u0627\u0645",
  Icon: Instagram,
  services: [{
    id: 401,
    name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062D\u0642\u064A\u0642\u064A \u0633\u0631\u0639\u0629 \u2014 \u0628\u062F\u0648\u0646 \u0636\u0645\u0627\u0646",
    min: 100,
    max: 1e6,
    base: 0.532
  }, {
    id: 402,
    name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062D\u0642\u064A\u0642\u064A \u0633\u0631\u0639\u0629 \u2014 \u0636\u0645\u0627\u0646 30 \u064A\u0648\u0645",
    min: 100,
    max: 1e6,
    base: 0.644
  }, {
    id: 283,
    name: "\u0644\u0627\u064A\u0643\u0627\u062A \u0641\u0648\u0631\u064A\u0629 \u2014 \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629",
    min: 10,
    max: 1e6,
    base: 0.04004
  }]
}, {
  key: "tiktok",
  label: "\u062A\u064A\u0643 \u062A\u0648\u0643",
  Icon: Music2,
  services: [{
    id: 139,
    name: "\u0645\u0634\u0627\u0647\u062F\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645",
    min: 100,
    max: 217545811,
    base: 0.018
  }, {
    id: 130,
    name: "\u0644\u0627\u064A\u0643\u0627\u062A \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645",
    min: 50,
    max: 5e6,
    base: 0.085
  }, {
    id: 132,
    name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u0641\u0648\u0631\u064A \u2014 \u0628\u062F\u0648\u0646 \u062A\u0639\u0648\u064A\u0636",
    min: 10,
    max: 1e6,
    base: 1.976510067114094
  }]
}, {
  key: "facebook",
  label: "\u0641\u064A\u0633\u0628\u0648\u0643",
  Icon: Facebook,
  services: [{
    id: 363,
    name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u064A\u0629 \u2014 \u0628\u062F\u0648\u0646 \u0636\u0645\u0627\u0646",
    min: 10,
    max: 1e4,
    base: 0.296325
  }, {
    id: 397,
    name: "\u0625\u0639\u062C\u0627\u0628\u0627\u062A \u2014 \u062B\u0627\u0628\u062A 30 \u064A\u0648\u0645 \u0648\u0633\u0631\u064A\u0639",
    min: 10,
    max: 1e6,
    base: 0.40932
  }]
}, {
  key: "telegram",
  label: "\u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645",
  Icon: Send,
  services: [{
    id: 287,
    name: "\u0623\u0639\u0636\u0627\u0621 \u0642\u0646\u0627\u0629 \u2014 \u0636\u0645\u0627\u0646 7 \u0623\u064A\u0627\u0645",
    min: 1,
    max: 1e6,
    base: 0.155115
  }, {
    id: 460,
    name: "\u0646\u062C\u0648\u0645 Stars \u0644\u062A\u0641\u0627\u0639\u0644 \u0645\u0646\u0634\u0648\u0631",
    min: 1,
    max: 1e4,
    base: 26.286
  }]
}, {
  key: "youtube",
  label: "\u064A\u0648\u062A\u064A\u0648\u0628",
  Icon: Youtube,
  services: [{
    id: 269,
    name: "\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u2014 \u0633\u0631\u064A\u0639",
    min: 200,
    max: 1e5,
    base: 0.3
  }, {
    id: 270,
    name: "\u0644\u0627\u064A\u0643\u0627\u062A \u2014 \u0636\u0645\u0627\u0646 30 \u064A\u0648\u0645",
    min: 10,
    max: 2e4,
    base: 0.48
  }]
}, {
  key: "whatsapp",
  label: "\u0648\u0627\u062A\u0633\u0627\u0628",
  Icon: MessageCircle,
  services: [{
    id: 140,
    name: "\u0623\u0639\u0636\u0627\u0621 \u0642\u0646\u0627\u0629 \u062D\u0642\u064A\u0642\u064A\u0648\u0646",
    min: 10,
    max: 1e4,
    base: 2.5
  }, {
    id: 414,
    name: "\u062A\u0641\u0627\u0639\u0644 \u0645\u0646\u0634\u0648\u0631 \u{1F44F}",
    min: 10,
    max: 1e5,
    base: 1.10214
  }]
}];
var SECTIONS = [{
  key: "games",
  title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0623\u0644\u0639\u0627\u0628",
  Icon: Gamepad2,
  items: GAMES
}, {
  key: "media",
  title: "\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0644\u0627\u064A\u0641 \u0648\u0627\u0644\u0634\u0627\u062A",
  Icon: Radio,
  items: MEDIA
}, {
  key: "gifts",
  title: "\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0647\u062F\u0627\u064A\u0627",
  Icon: Gift,
  items: GIFTS
}, {
  key: "wallets",
  title: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0631\u0642\u0645\u064A\u0629",
  Icon: Wallet,
  items: WALLETS
}];
var PRODUCT_PACKAGES = {
  "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644": {
    idLabel: "\u0622\u064A\u062F\u064A \u0627\u0644\u0644\u0627\u0639\u0628 (Player ID)",
    packages: [{
      label: "60 UC",
      base: 0.99
    }, {
      label: "325 UC",
      base: 4.99
    }, {
      label: "660 UC",
      base: 9.99
    }, {
      label: "1800 UC",
      base: 24.99
    }, {
      label: "3850 UC",
      base: 49.99
    }, {
      label: "8100 UC",
      base: 99.99
    }]
  },
  "\u0641\u0631\u064A \u0641\u0627\u064A\u0631": {
    idLabel: "\u0622\u064A\u062F\u064A \u0627\u0644\u0644\u0627\u0639\u0628 (Player ID)",
    packages: [{
      label: "100 \u062C\u0648\u0647\u0631\u0629",
      base: 0.99
    }, {
      label: "310 \u062C\u0648\u0647\u0631\u0629",
      base: 2.99
    }, {
      label: "520 \u062C\u0648\u0647\u0631\u0629",
      base: 4.99
    }, {
      label: "1060 \u062C\u0648\u0647\u0631\u0629",
      base: 9.99
    }, {
      label: "2180 \u062C\u0648\u0647\u0631\u0629",
      base: 19.99
    }]
  },
  "\u0646\u062A\u0641\u0644\u064A\u0643\u0633": {
    idLabel: null,
    packages: [{
      label: "\u0628\u0637\u0627\u0642\u0629 $10",
      base: 10.5
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $25",
      base: 25.8
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $50",
      base: 51
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $100",
      base: 101.5
    }]
  },
  "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646": {
    idLabel: null,
    packages: [{
      label: "\u0628\u0637\u0627\u0642\u0629 $10",
      base: 10.5
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $25",
      base: 25.8
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $50",
      base: 51
    }]
  },
  "\u0633\u062A\u064A\u0645": {
    idLabel: null,
    packages: [{
      label: "\u0628\u0637\u0627\u0642\u0629 $20",
      base: 20.6
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $50",
      base: 51
    }, {
      label: "\u0628\u0637\u0627\u0642\u0629 $100",
      base: 101.5
    }]
  }
};
var LIVE_APP_PACKAGES = {
  idLabel: "\u0622\u064A\u062F\u064A \u0627\u0644\u062D\u0633\u0627\u0628 (User ID)",
  packages: [{
    label: "100 \u0643\u0648\u064A\u0646",
    base: 1.5
  }, {
    label: "500 \u0643\u0648\u064A\u0646",
    base: 7
  }, {
    label: "1000 \u0643\u0648\u064A\u0646",
    base: 13.5
  }, {
    label: "5000 \u0643\u0648\u064A\u0646",
    base: 65
  }]
};
MEDIA.forEach(m => {
  PRODUCT_PACKAGES[m.name] = LIVE_APP_PACKAGES;
});
var WALLET_PACKAGES = {
  idLabel: "\u0631\u0642\u0645 \u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u0623\u0648 \u0627\u0644\u0647\u0627\u062A\u0641",
  packages: [{
    label: "$10",
    base: 10.3
  }, {
    label: "$25",
    base: 25.6
  }, {
    label: "$50",
    base: 51
  }, {
    label: "$100",
    base: 101.5
  }]
};
WALLETS.forEach(w => {
  PRODUCT_PACKAGES[w.name] = WALLET_PACKAGES;
});
var CURRENCIES = [{
  id: "LYD",
  balance: "150.500",
  spent: "42.000"
}, {
  id: "USD",
  balance: "32.75",
  spent: "8.10"
}, {
  id: "BANK",
  balance: "0.00",
  spent: "0.00"
}];
var NAV_ITEMS = [{
  id: "home",
  label: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
  Icon: Home
}, {
  id: "purchases",
  label: "\u0645\u0634\u062A\u0631\u064A\u0627\u062A\u064A",
  Icon: Ticket
}, {
  id: "rashq",
  label: "\u0631\u0634\u0642",
  Icon: Zap
}, {
  id: "support",
  label: "\u0627\u0644\u062F\u0639\u0645",
  Icon: Headphones
}, {
  id: "account",
  label: "\u062D\u0633\u0627\u0628\u064A",
  Icon: User
}];
function SpeedStreaks() {
  return /* @__PURE__ */<div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -right-8 top-3 w-52 h-2.5 bg-gradient-to-l from-purple-300 to-transparent rotate-12 blur-sm opacity-70" /><div className="absolute -right-2 top-11 w-36 h-1.5 bg-gradient-to-l from-purple-200 to-transparent rotate-12 blur-sm opacity-50" /><div className="absolute -right-14 top-20 w-60 h-3 bg-gradient-to-l from-purple-600 to-transparent rotate-12 blur-md opacity-40" /></div>;
}
function GlowOrbs() {
  return /* @__PURE__ */<React.Fragment><div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-purple-900 rounded-full blur-3xl opacity-30" /><div className="pointer-events-none absolute bottom-0 -right-16 w-56 h-56 bg-purple-800 rounded-full blur-3xl opacity-20" /></React.Fragment>;
}
function CategoryTile({
  item,
  onOpen,
  liveImage
}) {
  const ItemIcon = item.Icon || Gift;
  const img = liveImage || item.img;
  return /* @__PURE__ */<button onClick={() => onOpen(item)} className="flex flex-col items-stretch gap-2 active:scale-95 transition-transform text-right">{img ? /* @__PURE__ */<div className="w-full aspect-square rounded-2xl overflow-hidden border border-purple-800 shadow-lg bg-surface"><img src={img} alt={item.name} loading="lazy" className="w-full h-full object-cover" /></div> : /* @__PURE__ */<div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${item.from || "from-purple-800"} ${item.to || "to-purple-950"} border border-purple-800 flex items-center justify-center shadow-lg`}><ItemIcon className={`w-9 h-9 ${item.ic || "text-purple-300"}`} /></div>}<span className="text-xs text-gray-200 leading-tight line-clamp-1">{item.name}</span><span className="text-[10px] text-purple-500">{item.tag}</span></button>;
}
function SectionHeader({
  title,
  Icon
}) {
  return /* @__PURE__ */<div className="flex items-center gap-2 px-4 mt-7 mb-3"><Icon className="w-4 h-4 text-purple-400" /><h3 className="text-white font-bold text-[15px]">{title}</h3></div>;
}
function CategoryRow({
  items,
  onOpen,
  cardsImages
}) {
  return /* @__PURE__ */<div className="grid grid-cols-3 gap-3 px-4">{items.map((item, i) => /* @__PURE__ */<CategoryTile key={i} item={item} onOpen={onOpen} liveImage={cardsImages && cardsImages[item.name]} />)}</div>;
}
function Header({
  onSearchClick,
  showToast
}) {
  return /* @__PURE__ */<header className="sticky top-0 z-20 bg-void border-b border-purple-950 px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-1.5"><span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></span><span className="text-lg font-black italic tracking-tight bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent">Supersonic</span></div><div className="flex items-center gap-2"><button onClick={onSearchClick} aria-label="\u0628\u062D\u062B" className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center"><Search className="w-4 h-4 text-purple-300" /></button><button onClick={() => showToast("\u0648\u0644\u0627 \u0625\u0634\u0639\u0627\u0631 \u062C\u062F\u064A\u062F \u062D\u0627\u0644\u064A\u064B\u0627")} aria-label="\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A" className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center relative"><Bell className="w-4 h-4 text-purple-300" /><span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" /></button></div></header>;
}
function BottomNav({
  tab,
  onChange
}) {
  return /* @__PURE__ */<nav className="fixed bottom-0 inset-x-0 z-20 bg-void border-t border-purple-950" style={{
    maxWidth: 480,
    margin: "0 auto"
  }}><div className="flex items-center justify-around py-2">{NAV_ITEMS.map(({
        id,
        label,
        Icon
      }) => {
        const active = tab === id;
        return /* @__PURE__ */<button key={id} onClick={() => onChange(id)} aria-current={active ? "page" : undefined} className="flex flex-col items-center gap-1 px-3 py-1.5 relative">{active && /* @__PURE__ */<span className="absolute -top-2 w-8 h-1 rounded-full bg-purple-500" />}<Icon className={active ? "w-5 h-5 text-purple-400" : "w-5 h-5 text-gray-500"} strokeWidth={active ? 2.5 : 2} /><span className={active ? "text-[10px] text-purple-300 font-bold" : "text-[10px] text-gray-500"}>{label}</span></button>;
      })}</div></nav>;
}
function Footer({
  showToast
}) {
  const links = [["\u0627\u0644\u062A\u0633\u0648\u064A\u0642 \u0628\u0627\u0644\u0639\u0645\u0648\u0644\u0629", "\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0639\u0645\u0648\u0644\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"], ["\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629", "\u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"], ["API", "\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0640 API \u0642\u0631\u064A\u0628\u064B\u0627"]];
  return /* @__PURE__ */<footer className="mt-10 mx-4 mb-6 border-t border-purple-950 pt-6"><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-purple-400 mb-5">{links.map(([label, msg]) => /* @__PURE__ */<button key={label} onClick={() => showToast(msg)}>{label}</button>)}</div><div className="text-xs text-gray-500 space-y-1 mb-5"><p>خدمة العملاء: support@supersonic.ly</p><p>واتساب: 0910000000</p></div><div className="flex gap-2 mb-5"><button onClick={() => showToast("\u0642\u0631\u064A\u0628\u064B\u0627 \u0639\u0644\u0649 Google Play")} className="flex-1 flex items-center justify-center gap-2 bg-surface border border-purple-900 rounded-xl py-2.5 text-xs text-gray-300"><Download className="w-3.5 h-3.5" /> Google Play</button><button onClick={() => showToast("\u0642\u0631\u064A\u0628\u064B\u0627 \u0639\u0644\u0649 App Store")} className="flex-1 flex items-center justify-center gap-2 bg-surface border border-purple-900 rounded-xl py-2.5 text-xs text-gray-300"><Smartphone className="w-3.5 h-3.5" /> App Store</button></div><p className="text-[10px] text-gray-600 text-center">© Supersonic — جميع الحقوق محفوظة</p></footer>;
}
function RashqSection({
  onOpenService,
  livePrices,
  apiState
}) {
  return /* @__PURE__ */<div><div className="flex items-center justify-between px-4 mt-7 mb-3"><div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><h3 className="text-white font-bold text-[15px]">رشق — متابعين وتفاعل</h3></div>{apiState === "error" && /* @__PURE__ */<span className="text-[10px] text-amber-500">أسعار تقديرية — الباك اند غير متصل</span>}{apiState === "loading" && /* @__PURE__ */<span className="text-[10px] text-gray-500">يحدّث الأسعار...</span>}</div><div className="px-4 space-y-5">{RASHQ_PLATFORMS.map(p => /* @__PURE__ */<div key={p.key}><div className="flex items-center gap-1.5 mb-2"><p.Icon className="w-3.5 h-3.5 text-purple-400" /><p className="text-purple-300 text-xs font-bold">{p.label}</p></div><div className="space-y-2">{p.services.map(s => {
            const unitPrice = livePrices[s.id] ?? pricedRashq(s.base);
            const isLive = livePrices[s.id] != null;
            return /* @__PURE__ */<button key={s.id} onClick={() => onOpenService(s, p.label, unitPrice, isLive)} className="w-full flex items-center justify-between bg-surface border border-purple-900 rounded-xl px-3.5 py-3"><ChevronLeft className="w-4 h-4 text-gray-600 shrink-0" /><span className="flex-1 text-right px-3"><span className="block text-gray-200 text-xs">{s.name}</span><span className="block text-purple-500 text-[10px] mt-1">من {fmt(unitPrice)} د.ل / 1000</span></span></button>;
          })}</div></div>)}</div></div>;
}
function RashqOrderSheet({
  order,
  onClose,
  showToast
}) {
  const {
    service,
    platformLabel,
    unitPrice,
    isLive
  } = order;
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
        headers: {
          "Content-Type": "application/json",
          "X-Site-Token": RASHQ_SITE_TOKEN
        },
        body: JSON.stringify({
          service_id: service.id,
          quantity: qty,
          link: link.trim()
        })
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
  return /* @__PURE__ */<div className="fixed inset-0 z-30 flex items-end justify-center"><div className="absolute inset-0 bg-void" style={{
      opacity: 0.7
    }} onClick={onClose} /><div className="relative w-full bg-surface border-t border-purple-800 rounded-t-3xl p-5 pb-8" style={{
      maxWidth: 480
    }}><div className="w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" /><div className="flex items-center justify-between mb-4"><button onClick={onClose} aria-label="إغلاق" className="w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center"><X className="w-4 h-4 text-gray-400" /></button><h3 className="text-white font-bold text-xs">{platformLabel} — {service.name}</h3><span className="w-8" /></div><div className="space-y-3 mb-4"><div><label className="text-xs text-gray-400 block mb-1.5">الرابط</label><input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" dir="ltr" /></div><div><label className="text-xs text-gray-400 block mb-1.5">الكمية — الحد الأدنى {service.min.toLocaleString("en-US")} والأقصى {service.max.toLocaleString("en-US")}</label><input type="number" value={qty} min={service.min} max={service.max} onChange={e => setQty(Number(e.target.value) || 0)} className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /></div></div><div className="flex items-center justify-between bg-purple-950 border border-purple-800 rounded-xl px-4 py-3 mb-2"><span className="text-purple-300 text-xs">السعر الإجمالي {isLive ? "(\u0633\u0639\u0631 \u062D\u064A)" : "(\u062A\u0642\u062F\u064A\u0631\u064A)"}</span><span className="text-white font-bold">{fmt(total)} د.ل</span></div>{!backendReady && /* @__PURE__ */<p className="text-amber-500 text-[10px] text-center mb-3">الباك اند مو مربوط بعد — الطلب لن ينفذ فعليًا حتى تضيف رابط Railway بثابت RASHQ_API_BASE</p>}<button onClick={submit} disabled={submitting} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60" style={{
        boxShadow: "0 0 24px rgba(168,85,247,0.45)"
      }}>{submitting && /* @__PURE__ */<Loader2 className="w-4 h-4 animate-spin" />}{submitting ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0646\u0641\u064A\u0630..." : "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0637\u0644\u0628"}</button></div></div>;
}
var CARDS_CATEGORY_MAP = {
  "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644": "3889fd74-be30-43eb-8ade-487ae1daedf3",
  "\u0641\u0631\u064A \u0641\u0627\u064A\u0631": "278505d4-debb-4173-a270-9681ebed087a",
  "\u0633\u062A\u064A\u0645": "81db6fb3-ddb9-41dd-abf8-ab3c7783d15b",
  "\u064A\u0644\u0627 \u0644\u0648\u062F\u0648": "dba62042-3467-4368-9bc9-bf59c2e48c4a",
  "\u0631\u064A\u0632\u0631 \u062C\u0648\u0644\u062F": "26ce6d67-426f-4688-9232-a1f23f2be5fd",
  "\u0628\u0644\u0627\u064A\u0633\u062A\u064A\u0634\u0646": "eb6bda9e-ec4f-4962-997a-c05d3e83d25c",
  "\u0622\u064A\u062A\u0648\u0646\u0632": "faf425b1-5006-43df-8bba-82c03b8873ee",
  "\u0625\u0643\u0633 \u0628\u0648\u0643\u0633": "1cc049d6-8a56-4678-a3c9-d6df6b06db7a",
  "\u0646\u062A\u0641\u0644\u064A\u0643\u0633": "30b84760-8972-4128-b242-3dcd60557dc3"
};
function ProductSheet({
  item,
  onClose,
  onPurchased
}) {
  const categoryId = CARDS_CATEGORY_MAP[item.name];
  const cardsReady = !RASHQ_API_BASE.includes("REPLACE-WITH");
  const [liveInfo, setLiveInfo] = useState(null);
  const [loadingLive, setLoadingLive] = useState(!!categoryId && cardsReady);
  const info = liveInfo || PRODUCT_PACKAGES[item.name];
  const [step, setStep] = useState("packages");
  const [selected, setSelected] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  useEffect(() => {
    if (!categoryId || !cardsReady) return;
    let cancelled = false;
    fetch(`${RASHQ_API_BASE}/api/cards/category/${categoryId}`).then(res => res.json()).then(data => {
      if (cancelled || !data.success) throw new Error("bad response");
      const needsId = (data.subCategories || []).some(s => s.how_to_use && (s.how_to_use.includes("\u0627\u064A\u062F\u064A") || s.how_to_use.includes("ID")));
      const packages = [];
      (data.subCategories || []).forEach(sub => {
        (sub.products || []).forEach(p => {
          if (p.available) packages.push({
            label: p.name,
            price: p.price,
            productId: p.id,
            image: p.image
          });
        });
      });
      if (!cancelled && packages.length) {
        setLiveInfo({
          idLabel: needsId ? "\u0622\u064A\u062F\u064A \u0627\u0644\u0644\u0627\u0639\u0628 (Player ID)" : null,
          packages,
          isLive: true
        });
      }
    }).catch(() => {}).finally(() => {
      if (!cancelled) setLoadingLive(false);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId, cardsReady]);
  function unitPriceOf(pkg) {
    return pkg.price != null ? pkg.price : pricedCards(pkg.base);
  }
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  async function confirmPurchase() {
    setPurchaseError("");
    if (!selected.productId) {
      const code = "SS-" + Math.floor(1e5 + Math.random() * 9e5);
      setOrderCode(code);
      onPurchased({
        id: code,
        productName: item.name,
        packageLabel: selected.label,
        price: fmt(unitPriceOf(selected)),
        date: (/* @__PURE__ */new Date()).toLocaleDateString("ar-LY", {
          day: "numeric",
          month: "short"
        })
      });
      setStep("success");
      return;
    }
    setPurchasing(true);
    try {
      const res = await fetch(`${RASHQ_API_BASE}/api/cards/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Site-Token": RASHQ_SITE_TOKEN
        },
        body: JSON.stringify({
          product_id: selected.productId,
          ...(info.idLabel && playerId.trim() ? {
            player_id: playerId.trim()
          } : {})
        })
      });
      const data = await res.json();
      if (!data.success) {
        setPurchaseError(data.error || "\u062A\u0639\u0630\u0631 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0637\u0644\u0628");
        return;
      }
      const code = data.order_ref ? String(data.order_ref) : "SS-" + Math.floor(1e5 + Math.random() * 9e5);
      setOrderCode(code);
      onPurchased({
        id: code,
        productName: item.name,
        packageLabel: selected.label,
        price: fmt(unitPriceOf(selected)),
        date: (/* @__PURE__ */new Date()).toLocaleDateString("ar-LY", {
          day: "numeric",
          month: "short"
        })
      });
      setStep("success");
    } catch (e) {
      setPurchaseError("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
    } finally {
      setPurchasing(false);
    }
  }
  return /* @__PURE__ */<div className="fixed inset-0 z-30 flex items-end justify-center"><div className="absolute inset-0 bg-void" style={{
      opacity: 0.75
    }} onClick={onClose} /><div className="relative w-full bg-surface border-t border-purple-800 rounded-t-3xl p-5 pb-8 overflow-hidden" style={{
      maxWidth: 480,
      maxHeight: "85vh",
      overflowY: "auto"
    }}>{step !== "success" && /* @__PURE__ */<React.Fragment><div className="w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" /><div className="flex items-center justify-between mb-5"><button onClick={onClose} aria-label="إغلاق" className="w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center"><X className="w-4 h-4 text-gray-400" /></button><h3 className="text-white font-bold text-sm">{item.name}</h3><span className="w-8" /></div></React.Fragment>}{step === "packages" && (loadingLive ? /* @__PURE__ */<div className="flex flex-col items-center py-14"><Loader2 className="w-7 h-7 text-purple-500 animate-spin mb-3" /><p className="text-gray-500 text-xs">يجيب الأسعار الحية...</p></div> : !info ? /* @__PURE__ */<div className="text-center py-10"><PackageSearch className="w-10 h-10 text-purple-500 mx-auto mb-3" /><p className="text-gray-300 text-sm font-bold mb-1">الباقات لهذا المنتج قيد الإضافة</p><p className="text-gray-500 text-xs">تواصل معنا بالدعم وبنجهزها لك بسرعة</p></div> : /* @__PURE__ */<React.Fragment><div className="flex items-center justify-between mb-3"><p className="text-xs text-gray-400">اختر الفئة</p>{info.isLive && /* @__PURE__ */<span className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> أسعار حية</span>}</div><div className="grid grid-cols-2 gap-2.5 mb-2">{info.packages.map((p, i) => {
            const active = selected === p;
            return /* @__PURE__ */<button key={i} onClick={() => setSelected(p)} className={active ? "rounded-2xl p-3.5 text-right border bg-purple-600 border-purple-400 flex items-center gap-3" : "rounded-2xl p-3.5 text-right border bg-void border-purple-900 flex items-center gap-3"}>{p.image && /* @__PURE__ */<img src={p.image} alt="" loading="lazy" className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-900" />}<span className="flex-1 min-w-0"><span className="block text-white text-sm font-bold mb-1 truncate">{p.label}</span><span className={active ? "block text-purple-100 text-xs" : "block text-purple-500 text-xs"}>{fmt(unitPriceOf(p))} د.ل</span></span></button>;
          })}</div><button disabled={!selected} onClick={() => setStep("checkout")} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm mt-4 disabled:opacity-40" style={selected ? {
          boxShadow: "0 0 24px rgba(168,85,247,0.45)"
        } : void 0}>متابعة</button></React.Fragment>)}{step === "checkout" && selected && /* @__PURE__ */<React.Fragment><div className="bg-purple-950 border border-purple-800 rounded-2xl p-4 mb-4 flex items-center justify-between"><div><p className="text-white text-sm font-bold">{selected.label}</p><p className="text-purple-400 text-xs">{item.name}</p></div><p className="text-white font-bold">{fmt(unitPriceOf(selected))} د.ل</p></div>{info.idLabel && /* @__PURE__ */<div className="mb-4"><label className="text-xs text-gray-400 block mb-1.5">{info.idLabel}</label><input value={playerId} onChange={e => setPlayerId(e.target.value)} placeholder="123456789" className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" dir="ltr" /></div>}<div className="flex items-center justify-between bg-gray-900 border border-purple-900 rounded-xl px-4 py-3 mb-5"><span className="flex items-center gap-2 text-gray-300 text-xs"><Wallet className="w-3.5 h-3.5 text-purple-400" /> الدفع من رصيدك</span><span className="text-purple-300 text-xs">150.500 LYD متاح</span></div>{purchaseError && /* @__PURE__ */<p className="text-red-400 text-xs text-center mb-3">{purchaseError}</p>}<button disabled={info.idLabel && !playerId.trim() || purchasing} onClick={confirmPurchase} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm disabled:opacity-40 flex items-center justify-center gap-2" style={{
          boxShadow: "0 0 24px rgba(168,85,247,0.45)"
        }}>{purchasing && /* @__PURE__ */<Loader2 className="w-4 h-4 animate-spin" />}{purchasing ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0646\u0641\u064A\u0630..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0634\u0631\u0627\u0621"}</button></React.Fragment>}{step === "success" && /* @__PURE__ */<div className="relative py-6 text-center"><div className="absolute inset-0 overflow-hidden pointer-events-none"><SpeedStreaks /></div><div className="relative z-10"><div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center mx-auto mb-4" style={{
            boxShadow: "0 0 40px rgba(168,85,247,0.6)"
          }}><Check className="w-10 h-10 text-white" strokeWidth={3} /></div><h3 className="text-white font-bold text-lg mb-1">تم الشراء بنجاح</h3><p className="text-gray-400 text-xs mb-5">{selected?.label} — {item.name}</p><div className="inline-flex items-center gap-2 bg-purple-950 border border-purple-700 rounded-full px-4 py-2 mb-6"><span className="text-purple-300 text-xs">رقم الطلب</span><span className="text-white text-xs font-bold" dir="ltr">{orderCode}</span></div><p className="text-gray-500 text-[11px] mb-6">تمت إضافته لصفحة مشترياتي</p><button onClick={onClose} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm" style={{
            boxShadow: "0 0 24px rgba(168,85,247,0.45)"
          }}>تم</button></div></div>}</div></div>;
}
function HomeView({
  filter,
  setFilter,
  slide,
  showToast,
  onOpenProduct,
  searchRef,
  cardsImages
}) {
  const [query, setQuery] = useState("");
  const q = query.trim();
  const baseSections = filter === "all" ? SECTIONS : SECTIONS.filter(s => s.key === filter);
  const shown = !q ? baseSections : baseSections.map(s => ({
    ...s,
    items: s.items.filter(item => item.name.includes(q))
  })).filter(s => s.items.length > 0);
  const noResults = q && shown.length === 0;
  return /* @__PURE__ */<div><div className="mx-4 mt-4 rounded-3xl bg-gradient-to-br from-purple-800 via-purple-950 to-black border border-purple-700 p-5 relative overflow-hidden h-32 flex flex-col justify-center"><SpeedStreaks />{(() => {
        const BannerIcon = BANNERS[slide].icon;
        return /* @__PURE__ */<BannerIcon className="w-7 h-7 text-purple-300 mb-2 relative z-10" />;
      })()}<h2 className="text-white font-bold text-base relative z-10">{BANNERS[slide].title}</h2><p className="text-purple-300 text-xs mt-1 relative z-10">{BANNERS[slide].sub}</p><div className="flex gap-1.5 absolute bottom-3 left-5 z-10">{BANNERS.map((_, i) => /* @__PURE__ */<span key={i} className={i === slide ? "h-1.5 w-5 rounded-full bg-purple-400" : "h-1.5 w-1.5 rounded-full bg-purple-900"} />)}</div></div><div ref={searchRef} className="mx-4 mt-4 flex items-center gap-2 bg-surface border border-purple-900 rounded-2xl px-4 py-3"><Search className="w-4 h-4 text-purple-500" /><input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C\u060C \u0641\u0626\u0629 \u0623\u0648 \u062E\u062F\u0645\u0629..." className="bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" />{query && /* @__PURE__ */<button onClick={() => setQuery("")} aria-label="مسح البحث"><X className="w-4 h-4 text-gray-500" /></button>}</div><div className="flex gap-2 px-4 mt-4 overflow-x-auto" style={{
      scrollbarWidth: "none"
    }}>{FILTERS.map(f => /* @__PURE__ */<button key={f.id} onClick={() => setFilter(f.id)} className={filter === f.id ? "shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border bg-transparent border-purple-900 text-gray-400"}>{f.label}</button>)}</div>{noResults ? /* @__PURE__ */<div className="flex flex-col items-center py-14 text-center"><Search className="w-8 h-8 text-purple-700 mb-3" /><p className="text-gray-400 text-sm">ولا نتيجة لـ"{q}"</p></div> : shown.map(s => /* @__PURE__ */<div key={s.key}><SectionHeader title={s.title} Icon={s.Icon} /><CategoryRow items={s.items} onOpen={onOpenProduct} cardsImages={cardsImages} /></div>)}<Footer showToast={showToast} /></div>;
}
function RashqPage({
  onOpenService,
  livePrices,
  apiState
}) {
  return /* @__PURE__ */<div className="pt-2"><div className="mx-4 mt-2 mb-1 rounded-3xl bg-gradient-to-br from-purple-800 via-purple-950 to-black border border-purple-700 p-5 relative overflow-hidden"><SpeedStreaks /><div className="relative z-10 flex items-center gap-3"><span className="w-11 h-11 rounded-2xl bg-purple-600 flex items-center justify-center shrink-0"><Zap className="w-6 h-6 text-white" /></span><div><h2 className="text-white font-bold text-base">رشق</h2><p className="text-purple-300 text-xs">متابعين وتفاعل لكل منصاتك بضغطة وحدة</p></div></div></div><RashqSection onOpenService={onOpenService} livePrices={livePrices} apiState={apiState} /><div className="h-6" /></div>;
}
function PurchasesView({
  goHome,
  purchases
}) {
  const [sub, setSub] = useState("other");
  return /* @__PURE__ */<div className="px-4 pt-4"><div className="flex gap-2 mb-6"><button onClick={() => setSub("other")} className={sub === "other" ? "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"}>منتجات أخرى</button><button onClick={() => setSub("cards")} className={sub === "cards" ? "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2.5 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"}>البطاقات</button></div>{sub === "cards" && purchases.length > 0 ? /* @__PURE__ */<div className="space-y-2.5 pb-4">{purchases.map(p => /* @__PURE__ */<div key={p.id} className="bg-surface border border-purple-900 rounded-2xl px-4 py-3.5 flex items-center justify-between"><div className="text-left"><p className="text-white text-sm font-bold">{p.price} د.ل</p><p className="text-gray-500 text-[10px]">{p.date}</p></div><div className="text-right"><p className="text-gray-200 text-xs">{p.packageLabel}</p><p className="text-purple-400 text-[11px]">{p.productName}</p><p className="text-gray-600 text-[10px] mt-0.5" dir="ltr">{p.id}</p></div></div>)}</div> : /* @__PURE__ */<div className="flex flex-col items-center justify-center py-14 text-center"><div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-800 to-purple-950 border border-purple-700 flex items-center justify-center mb-4"><PackageSearch className="w-9 h-9 text-purple-400" /></div><p className="text-gray-300 text-sm font-bold mb-1">لسه ما سويت أي عملية شراء</p><p className="text-gray-500 text-xs mb-5">تصفح المتجر وابدأ أول عملية شحن</p><button onClick={goHome} className="text-purple-300 text-xs font-bold border border-purple-700 rounded-full px-5 py-2">تصفح المتجر</button></div>}</div>;
}
function SupportView({
  showToast
}) {
  const items = [{
    label: "\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628",
    Icon: MessageCircle,
    msg: "\u0631\u0627\u0628\u0637 \u0648\u0627\u062A\u0633\u0627\u0628 \u0627\u0644\u062D\u0642\u064A\u0642\u064A \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643"
  }, {
    label: "\u062A\u0627\u0628\u0639 \u0642\u0646\u0627\u062A\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0643\u0644 \u062C\u062F\u064A\u062F",
    Icon: MessageCircle,
    msg: "\u0631\u0627\u0628\u0637 \u0642\u0646\u0627\u0629 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643"
  }, {
    label: "\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0639\u0628\u0631 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645",
    Icon: Send,
    msg: "\u0631\u0627\u0628\u0637 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645 \u0627\u0644\u062D\u0642\u064A\u0642\u064A \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643"
  }, {
    label: "\u062A\u0627\u0628\u0639 \u0642\u0646\u0627\u062A\u0646\u0627 \u0639\u0644\u0649 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645 \u0644\u0643\u0644 \u062C\u062F\u064A\u062F",
    Icon: Send,
    msg: "\u0631\u0627\u0628\u0637 \u0642\u0646\u0627\u0629 \u062A\u064A\u0644\u064A\u062C\u0631\u0627\u0645 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643"
  }];
  const socials = [[Instagram, "\u0631\u0627\u0628\u0637 \u0627\u0646\u0633\u062A\u0642\u0631\u0627\u0645 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643", "\u0627\u0646\u0633\u062A\u0642\u0631\u0627\u0645"], [Music2, "\u0631\u0627\u0628\u0637 \u062A\u064A\u0643 \u062A\u0648\u0643 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643", "\u062A\u064A\u0643 \u062A\u0648\u0643"], [Facebook, "\u0631\u0627\u0628\u0637 \u0641\u064A\u0633\u0628\u0648\u0643 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643", "\u0641\u064A\u0633\u0628\u0648\u0643"], [Youtube, "\u0631\u0627\u0628\u0637 \u064A\u0648\u062A\u064A\u0648\u0628 \u0644\u0633\u0647 \u0645\u0627 \u0648\u0635\u0644\u0646\u064A \u0645\u0646\u0643", "\u064A\u0648\u062A\u064A\u0648\u0628"]];
  return /* @__PURE__ */<div className="px-4 pt-4"><div className="rounded-3xl bg-gradient-to-br from-purple-900 to-black border border-purple-800 p-5 text-center mb-6"><h2 className="text-white font-bold text-lg mb-1">التواصل معنا</h2><p className="text-purple-300 text-xs">يا هلا! لا تتردد بالتواصل معنا في حال كان لديك أي استفسار</p></div><div className="space-y-3 mb-8">{items.map((it, i) => {
        const ItIcon = it.Icon;
        return /* @__PURE__ */<button key={i} onClick={() => showToast(it.msg)} className="w-full flex items-center justify-between bg-surface border border-purple-900 rounded-2xl px-4 py-4"><ChevronLeft className="w-4 h-4 text-gray-600" /><span className="text-sm text-gray-200 flex-1 text-center">{it.label}</span><span className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center"><ItIcon className="w-4 h-4 text-white" /></span></button>;
      })}</div><p className="text-xs text-gray-500 mb-3 text-center">تابعنا على مواقع التواصل</p><div className="flex justify-center gap-3">{socials.map(([SocIcon, msg, name], i) => /* @__PURE__ */<button key={i} onClick={() => showToast(msg)} aria-label={name} className="w-11 h-11 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center"><SocIcon className="w-4 h-4 text-purple-300" /></button>)}</div></div>;
}
function AccountView({
  currency,
  setCurrency,
  onTopUp,
  showToast,
  onLogout,
  user,
  authToken
}) {
  const cur = CURRENCIES.find(c => c.id === currency);
  const initials = (user?.name || "\u061F").trim().slice(0, 2).toUpperCase();
  const [resending, setResending] = useState(false);
  const menu = [{
    label: "\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629",
    Icon: User,
    msg: "\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"
  }, {
    label: "\u0627\u0644\u0645\u0641\u0636\u0644\u0629",
    Icon: Heart,
    msg: "\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"
  }, {
    label: "\u0627\u0644\u062A\u0633\u0648\u064A\u0642 \u0628\u0627\u0644\u0639\u0645\u0648\u0644\u0629",
    Icon: Link2,
    badge: "\u062C\u062F\u064A\u062F",
    msg: "\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0639\u0645\u0648\u0644\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"
  }, {
    label: "\u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u0640 API",
    Icon: Key,
    msg: "\u0625\u062F\u0627\u0631\u0629 \u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u0640API \u0642\u0631\u064A\u0628\u064B\u0627"
  }, {
    label: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
    Icon: HelpCircle,
    msg: "\u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0642\u0631\u064A\u0628\u064B\u0627"
  }];
  async function resendVerification() {
    setResending(true);
    try {
      const res = await fetch(`${RASHQ_API_BASE}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      showToast(data.success ? "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u060C \u062A\u0641\u0642\u0651\u062F \u0628\u0631\u064A\u062F\u0643" : data.error || "\u062A\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644");
    } catch (e) {
      showToast("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
    } finally {
      setResending(false);
    }
  }
  return /* @__PURE__ */<div className="px-4 pt-6"><div className="flex flex-col items-center mb-6"><div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-950 flex items-center justify-center text-2xl font-black text-white ring-4 ring-purple-700 mb-3" style={{
        boxShadow: "0 0 30px rgba(168,85,247,0.5)"
      }}>{initials}</div><h2 className="text-white font-bold text-lg">{user?.name || "\u0645\u0633\u062A\u062E\u062F\u0645"}</h2><p className="text-gray-500 text-xs mb-2" dir="ltr">{user?.email || ""}</p><span className="flex items-center gap-1 bg-purple-950 border border-purple-700 text-purple-300 text-[11px] px-3 py-1 rounded-full"><ShieldCheck className="w-3 h-3" /> عضو مميز في Supersonic</span></div>{user && user.email_verified === false && /* @__PURE__ */<div className="flex items-center justify-between gap-3 bg-amber-950 border border-amber-800 rounded-2xl px-4 py-3 mb-4"><button onClick={resendVerification} disabled={resending} className="text-amber-300 text-xs font-bold shrink-0 disabled:opacity-50">{resending ? "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0631\u0633\u0627\u0644..." : "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644"}</button><span className="text-amber-200 text-xs text-right flex-1">إيميلك مو مفعّل — تفقّد بريدك</span></div>}<div className="flex gap-2 mb-4">{CURRENCIES.map(c => /* @__PURE__ */<button key={c.id} onClick={() => setCurrency(c.id)} className={currency === c.id ? "flex-1 py-2 rounded-xl text-xs font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2 rounded-xl text-xs font-bold border bg-transparent border-purple-900 text-gray-400"}>{c.id}</button>)}</div><div className="grid grid-cols-2 gap-3 mb-4"><div className="bg-surface border border-purple-900 rounded-2xl p-4"><p className="text-gray-500 text-[11px] mb-1">الرصيد المنفق</p><p className="text-white font-bold">{cur.spent}</p></div><div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700 rounded-2xl p-4"><p className="text-purple-300 text-[11px] mb-1">رصيدك الحالي</p><p className="text-white font-bold">{cur.balance}</p></div></div><div className="flex gap-3 mb-3"><button onClick={() => showToast("\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u064A\u0646 \u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0642\u0631\u064A\u0628\u064B\u0627")} className="flex-1 flex items-center justify-center gap-2 bg-surface border border-purple-900 rounded-xl py-3 text-xs text-gray-200"><ArrowLeftRight className="w-4 h-4" /> تحويل الرصيد</button><button onClick={onTopUp} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 rounded-xl py-3 text-xs text-white font-bold" style={{
        boxShadow: "0 0 20px rgba(168,85,247,0.4)"
      }}><Wallet className="w-4 h-4" /> شحن الرصيد</button></div><button onClick={() => {
      const id = "SS-" + (user?.id ?? "00000");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id).then(() => showToast("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0645\u0639\u0631\u0641: " + id), () => showToast("\u062A\u0639\u0630\u0631 \u0627\u0644\u0646\u0633\u062E \u2014 \u0627\u0644\u0645\u0639\u0631\u0641: " + id));
      } else {
        showToast("\u0627\u0644\u0645\u0639\u0631\u0641: " + id);
      }
    }} className="w-full flex items-center justify-center gap-2 bg-surface border border-purple-900 rounded-xl py-3 text-xs text-gray-300 mb-6"><Copy className="w-3.5 h-3.5" /> نسخ المعرف</button><div className="space-y-2 mb-6">{menu.map((m, i) => {
        const MIcon = m.Icon;
        return /* @__PURE__ */<button key={i} onClick={() => showToast(m.msg)} className="w-full flex items-center justify-between bg-surface border border-purple-900 rounded-2xl px-4 py-3.5"><ChevronLeft className="w-4 h-4 text-gray-600" /><span className="flex items-center gap-2 flex-1 justify-end text-sm text-gray-200">{m.badge && /* @__PURE__ */<span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-full">{m.badge}</span>}{m.label}</span><span className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center ml-2"><MIcon className="w-4 h-4 text-purple-400" /></span></button>;
      })}</div><button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-red-400 text-sm py-3 mb-6"><LogOut className="w-4 h-4" /> تسجيل الخروج</button></div>;
}
function TopUpSheet({
  onClose,
  showToast
}) {
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
  const methods = [{
    id: "card",
    label: "\u0644\u064A\u0628\u064A\u0627\u0646\u0627 / \u0645\u062F\u0627\u0631"
  }, {
    id: "bank",
    label: "\u0628\u0637\u0627\u0642\u0629 \u0645\u0635\u0631\u0641\u064A\u0629"
  }, {
    id: "transfer",
    label: "\u062A\u062D\u0648\u064A\u0644 \u062F\u0627\u062E\u0644\u064A"
  }];
  return /* @__PURE__ */<div className="fixed inset-0 z-30 flex items-end justify-center"><div className="absolute inset-0 bg-void" style={{
      opacity: 0.7
    }} onClick={onClose} /><div className="relative w-full bg-surface border-t border-purple-800 rounded-t-3xl p-5 pb-8" style={{
      maxWidth: 480
    }}><div className="w-10 h-1 bg-purple-800 rounded-full mx-auto mb-5" /><div className="flex items-center justify-between mb-5"><button onClick={onClose} aria-label="إغلاق" className="w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center"><X className="w-4 h-4 text-gray-400" /></button><h3 className="text-white font-bold">شحن الرصيد</h3><span className="w-8" /></div>{step === "form" && /* @__PURE__ */<React.Fragment><div className="flex gap-2 mb-5">{methods.map(m => /* @__PURE__ */<button key={m.id} onClick={() => setMethod(m.id)} className={method === m.id ? "flex-1 py-2 rounded-xl text-[11px] font-bold border bg-purple-600 border-purple-500 text-white" : "flex-1 py-2 rounded-xl text-[11px] font-bold border bg-transparent border-purple-900 text-gray-400"}>{m.label}</button>)}</div>{method === "card" && /* @__PURE__ */<div className="space-y-3"><label className="text-xs text-gray-400">أدخل كود كرت الشحن</label><input value={code} onChange={e => setCode(e.target.value)} placeholder="XXXX-XXXX-XXXX" className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /></div>}{method === "bank" && /* @__PURE__ */<div className="space-y-3"><input placeholder="\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /><div className="flex gap-3"><input placeholder="MM/YY" className="w-1/2 bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /><input placeholder="CVV" className="w-1/2 bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /></div></div>}{method === "transfer" && /* @__PURE__ */<div className="space-y-3"><div className="flex items-center gap-3"><select className="flex-1 bg-void border border-purple-900 rounded-xl px-3 py-3 text-white text-sm outline-none"><option>من: دينار ليبي</option><option>من: دولار</option></select><ArrowLeftRight className="w-4 h-4 text-purple-500" /><select className="flex-1 bg-void border border-purple-900 rounded-xl px-3 py-3 text-white text-sm outline-none"><option>إلى: دولار</option><option>إلى: مصرف</option></select></div><input placeholder="\u0627\u0644\u0645\u0628\u0644\u063A" className="w-full bg-void border border-purple-900 rounded-xl px-4 py-3 text-white text-sm outline-none" /></div>}<button onClick={submit} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm mt-5" style={{
          boxShadow: "0 0 24px rgba(168,85,247,0.45)"
        }}>تأكيد</button></React.Fragment>}{step === "otp" && /* @__PURE__ */<div><p className="text-gray-400 text-xs text-center mb-4">أدخل كود التحقق المرسل إلى رقم هاتفك</p><div className="flex justify-center gap-2 mb-5" dir="ltr">{[0, 1, 2, 3].map(i => /* @__PURE__ */<input key={i} maxLength={1} className="w-11 h-12 text-center bg-void border border-purple-800 rounded-xl text-white text-lg outline-none" />)}</div><button onClick={confirmOtp} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm" style={{
          boxShadow: "0 0 24px rgba(168,85,247,0.45)"
        }}>تأكيد الكود</button></div>}</div></div>;
}
function ResetPasswordScreen({
  token,
  onDone
}) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0627\u0632\u0645 \u062A\u0643\u0648\u0646 8 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${RASHQ_API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          password
        })
      });
      const data = await res.json();
      if (data.success) setDone(true);else setError(data.error || "\u062A\u0639\u0630\u0631 \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");
    } catch (e2) {
      setError("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */<div className="min-h-screen bg-void flex justify-center"><div className="w-full flex flex-col justify-center px-6 relative overflow-hidden" style={{
      maxWidth: 480,
      minHeight: "100vh"
    }}><GlowOrbs /><SpeedStreaks /><div className="relative z-10" style={{
        maxWidth: 380,
        margin: "0 auto",
        width: "100%"
      }}><div className="flex flex-col items-center mb-8"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center mb-4" style={{
            boxShadow: "0 0 30px rgba(168,85,247,0.5)"
          }}><Zap className="w-8 h-8 text-white" /></div><h1 className="text-2xl font-black italic bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent">Supersonic</h1></div>{done ? /* @__PURE__ */<div className="text-center"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-white" strokeWidth={3} /></div><p className="text-white font-bold mb-2">تم تغيير كلمة المرور ✅</p><p className="text-gray-500 text-xs mb-6">سجّل دخولك بكلمة المرور الجديدة</p><button onClick={onDone} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm" style={{
            boxShadow: "0 0 24px rgba(168,85,247,0.45)"
          }}>تسجيل الدخول</button></div> : /* @__PURE__ */<form onSubmit={submit}><h2 className="text-white font-bold text-lg mb-1 text-center">كلمة مرور جديدة</h2><p className="text-gray-500 text-xs mb-6 text-center">اكتب كلمة مرور جديدة لحسابك</p><div className="flex items-center gap-2 bg-surface border border-purple-900 rounded-xl px-4 py-3 mb-3"><Lock className="w-4 h-4 text-purple-500" /><input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (8 \u0623\u062D\u0631\u0641 \u0641\u0623\u0643\u062B\u0631)" className="bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" dir="ltr" /><button onClick={() => setShowPass(v => !v)} type="button" aria-label={showPass ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPass ? /* @__PURE__ */<EyeOff className="w-4 h-4 text-gray-500" /> : /* @__PURE__ */<Eye className="w-4 h-4 text-gray-500" />}</button></div>{error && /* @__PURE__ */<p className="text-red-400 text-xs text-center mb-3">{error}</p>}<button type="submit" disabled={loading} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm disabled:opacity-60 flex items-center justify-center gap-2" style={{
            boxShadow: "0 0 24px rgba(168,85,247,0.45)"
          }}>{loading && /* @__PURE__ */<Loader2 className="w-4 h-4 animate-spin" />}{loading ? "\u0644\u062D\u0638\u0629..." : "\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"}</button></form>}</div></div></div>;
}
function AuthScreen({
  onAuthed
}) {
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const backendReady = !RASHQ_API_BASE.includes("REPLACE-WITH");
  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!backendReady) {
      setError("\u0627\u0644\u0628\u0627\u0643 \u0627\u0646\u062F \u0645\u0648 \u0645\u0631\u0628\u0648\u0637 \u0628\u0639\u062F \u2014 \u0631\u0627\u062C\u0639 RASHQ_API_BASE \u0628\u0627\u0644\u0643\u0648\u062F");
      return;
    }
    if (mode === "forgot") {
      if (!email.trim()) {
        setError("\u0627\u0643\u062A\u0628 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A");
        return;
      }
      setLoading(true);
      try {
        await fetch(`${RASHQ_API_BASE}/api/auth/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.trim()
          })
        });
        setForgotSent(true);
      } catch (err) {
        setError("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
      } finally {
        setLoading(false);
      }
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("\u0627\u0643\u062A\u0628 \u0627\u0633\u0645\u0643");
      return;
    }
    if (!email.trim() || !password) {
      setError("\u0639\u0628\u0651\u064A \u0643\u0644 \u0627\u0644\u062D\u0642\u0648\u0644");
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body = mode === "signup" ? {
        name: name.trim(),
        email: email.trim(),
        password
      } : {
        email: email.trim(),
        password
      };
      const res = await fetch(`${RASHQ_API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        onAuthed(data.user, data.token);
      } else {
        setError(data.error || "\u0635\u0627\u0631 \u062E\u0637\u0623\u060C \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u062B\u0627\u0646\u064A\u0629");
      }
    } catch (err) {
      setError("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0633\u064A\u0631\u0641\u0631");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */<div className="min-h-screen bg-void flex justify-center"><div className="w-full flex flex-col md:flex-row" style={{
      maxWidth: 1100
    }}><div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black"><GlowOrbs /><SpeedStreaks /><div className="relative z-10 text-center px-10"><div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center mx-auto mb-6" style={{
            boxShadow: "0 0 40px rgba(168,85,247,0.5)"
          }}><Zap className="w-10 h-10 text-white" /></div><h1 className="text-4xl font-black italic bg-gradient-to-l from-purple-300 to-white bg-clip-text text-transparent mb-3">Supersonic</h1><p className="text-purple-300 text-sm mx-auto leading-relaxed" style={{
            maxWidth: 300
          }}>شحن ألعاب، بطاقات هدايا، محافظ رقمية، ومتابعين — كل شي بمكان وحد وبسرعة</p></div></div><div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 relative overflow-hidden" style={{
        minHeight: "100vh"
      }}><div className="absolute inset-0"><GlowOrbs /><SpeedStreaks /><div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-void" /></div><div className="relative z-10 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40" style={{
          maxWidth: 380,
          margin: "0 auto"
        }}><div className="flex flex-col items-center mb-8 md:hidden"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center mb-4" style={{
              boxShadow: "0 0 30px rgba(168,85,247,0.5)"
            }}><Zap className="w-8 h-8 text-white" /></div><h1 className="text-2xl font-black italic bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent">Supersonic</h1></div><h2 className="hidden md:block text-white font-bold text-2xl mb-1">{mode === "login" ? "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" : mode === "signup" ? "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F" : "\u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"}</h2><p className="hidden md:block text-gray-500 text-xs mb-8">{mode === "login" ? "\u0623\u0647\u0644\u064B\u0627 \u0628\u0639\u0648\u062F\u062A\u0643" : mode === "signup" ? "\u064A\u0633\u062A\u063A\u0631\u0642 \u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629" : "\u0628\u0646\u0628\u0639\u062B\u0644\u0643 \u0631\u0627\u0628\u0637 \u0639\u0628\u0631 \u0627\u0644\u0625\u064A\u0645\u064A\u0644"}</p>{mode === "forgot" && forgotSent ? /* @__PURE__ */<div className="text-center"><div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center mx-auto mb-4"><Mail className="w-7 h-7 text-white" /></div><p className="text-gray-300 text-sm mb-6">لو الإيميل مسجّل عندنا، بيوصلك رابط استرجاع كلمة المرور خلال دقايق.</p><button onClick={() => {
              setMode("login");
              setForgotSent(false);
            }} className="text-purple-400 text-xs font-bold">رجوع لتسجيل الدخول</button></div> : /* @__PURE__ */<form onSubmit={submit} className="space-y-3">{mode === "signup" && /* @__PURE__ */<div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 focus-within:border-purple-400/60 focus-within:bg-white/10 transition-colors rounded-xl px-4 py-3"><User className="w-4 h-4 text-purple-500" /><input value={name} onChange={e => setName(e.target.value)} placeholder="\u0627\u0633\u0645\u0643" className="bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" /></div>}<div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 focus-within:border-purple-400/60 focus-within:bg-white/10 transition-colors rounded-xl px-4 py-3"><Mail className="w-4 h-4 text-purple-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" className="bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" dir="ltr" /></div>{mode !== "forgot" && /* @__PURE__ */<div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 focus-within:border-purple-400/60 focus-within:bg-white/10 transition-colors rounded-xl px-4 py-3"><Lock className="w-4 h-4 text-purple-500" /><input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 (8 \u0623\u062D\u0631\u0641 \u0641\u0623\u0643\u062B\u0631)" className="bg-transparent outline-none text-sm text-white placeholder-gray-500 flex-1" dir="ltr" /><button onClick={() => setShowPass(v => !v)} type="button" aria-label={showPass ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPass ? /* @__PURE__ */<EyeOff className="w-4 h-4 text-gray-500" /> : /* @__PURE__ */<Eye className="w-4 h-4 text-gray-500" />}</button></div>}{mode === "login" && /* @__PURE__ */<button type="button" onClick={() => {
              setMode("forgot");
              setError("");
            }} className="text-purple-400 text-xs block">نسيت كلمة المرور؟</button>}{error && /* @__PURE__ */<p className="text-red-400 text-xs text-center">{error}</p>}<button type="submit" disabled={loading} className="w-full bg-purple-600 text-white font-bold rounded-xl py-3.5 text-sm disabled:opacity-60 flex items-center justify-center gap-2" style={{
              boxShadow: "0 0 24px rgba(168,85,247,0.45)"
            }}>{loading && /* @__PURE__ */<Loader2 className="w-4 h-4 animate-spin" />}{loading ? "\u0644\u062D\u0638\u0629..." : mode === "login" ? "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" : mode === "signup" ? "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628" : "\u0625\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u0627\u0633\u062A\u0631\u062C\u0627\u0639"}</button></form>}{mode !== "forgot" && /* @__PURE__ */<p className="text-center text-xs text-gray-500 mt-5">{mode === "login" ? "\u0645\u0627 \u0639\u0646\u062F\u0643 \u062D\u0633\u0627\u0628\u061F " : "\u0639\u0646\u062F\u0643 \u062D\u0633\u0627\u0628\u061F "}<button onClick={() => {
              setMode(m => m === "login" ? "signup" : "login");
              setError("");
            }} className="text-purple-400 font-bold">{mode === "login" ? "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F" : "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"}</button></p>}</div></div></div></div>;
}
function Toast({
  message
}) {
  return /* @__PURE__ */<div className="fixed bottom-24 inset-x-0 z-40 flex justify-center px-6" style={{
    maxWidth: 480,
    margin: "0 auto"
  }}><div className="bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2" style={{
      boxShadow: "0 4px 20px rgba(168,85,247,0.5)"
    }}><Check className="w-3.5 h-3.5" /> {message}</div></div>;
}
function LoadingSpinner() {
  return /* @__PURE__ */<div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 text-purple-500 animate-spin" /></div>;
}
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const searchRef = useRef(null);
  const [authToken, setAuthToken] = useState(null);
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
  const [cardsImages, setCardsImages] = useState({});
  const [toast, setToast] = useState("");
  const [resetToken, setResetToken] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  useEffect(() => {
    const stored = loadStoredSession();
    if (!stored || RASHQ_API_BASE.includes("REPLACE-WITH")) {
      setAuthChecking(false);
      return;
    }
    fetch(`${RASHQ_API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${stored.token}` }
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setCurrentUser(data.user);
        setAuthToken(stored.token);
      } else {
        clearStoredSession();
      }
    }).catch(() => {
      // Network hiccup — keep the stored session and let the next request
      // that actually needs the backend fail/retry instead of logging out.
    }).finally(() => setAuthChecking(false));
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vToken = params.get("verify_token");
    const rToken = params.get("reset_token");
    if (vToken && !RASHQ_API_BASE.includes("REPLACE-WITH")) {
      fetch(`${RASHQ_API_BASE}/api/auth/verify?token=${encodeURIComponent(vToken)}`).then(res => res.json()).then(data => setToast(data.success ? "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u2705" : data.error || "\u0631\u0627\u0628\u0637 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D")).catch(() => setToast("\u062A\u0639\u0630\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u060C \u062D\u0627\u0648\u0644 \u0644\u0627\u062D\u0642\u064B\u0627"));
    }
    if (rToken) setResetToken(rToken);
    if (vToken || rToken) {
      params.delete("verify_token");
      params.delete("reset_token");
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "");
      window.history.replaceState({}, "", clean);
    }
  }, []);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % BANNERS.length), 4e3);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (RASHQ_API_BASE.includes("REPLACE-WITH")) return;
    fetch(`${RASHQ_API_BASE}/api/cards/categories`).then(res => res.json()).then(data => {
      if (!data.success) throw new Error("bad response");
      const idToName = {};
      Object.entries(CARDS_CATEGORY_MAP).forEach(([name, id]) => {
        idToName[id] = name;
      });
      const map = {};
      data.categories.forEach(c => {
        const ourName = idToName[c.id];
        if (ourName && c.image) map[ourName] = c.image;
      });
      setCardsImages(map);
    }).catch(() => {});
  }, []);
  useEffect(() => {
    if (RASHQ_API_BASE.includes("REPLACE-WITH")) return;
    setRashqApiState("loading");
    fetch(`${RASHQ_API_BASE}/api/rashq/services`).then(res => res.json()).then(data => {
      if (!data.success) throw new Error("bad response");
      const map = {};
      data.services.forEach(s => {
        map[s.service_id] = s.price_per_1000_lyd;
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
  function handleLogout() {
    if (authToken && !RASHQ_API_BASE.includes("REPLACE-WITH")) {
      fetch(`${RASHQ_API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).catch(() => {});
    }
    clearStoredSession();
    setCurrentUser(null);
    setAuthToken(null);
  }
  if (resetToken) {
    return /* @__PURE__ */<ResetPasswordScreen token={resetToken} onDone={() => setResetToken(null)} />;
  }
  if (authChecking) {
    return /* @__PURE__ */<div className="min-h-screen bg-void flex items-center justify-center"><Loader2 className="w-7 h-7 text-purple-500 animate-spin" /></div>;
  }
  if (!currentUser) {
    return /* @__PURE__ */<AuthScreen onAuthed={(user, token) => {
      saveStoredSession(user, token);
      setCurrentUser(user);
      setAuthToken(token);
    }} />;
  }
  return /* @__PURE__ */<div dir="rtl" className="min-h-screen bg-void flex justify-center"><div className="w-full relative text-white font-sans" style={{
      maxWidth: 480
    }}><Header onSearchClick={() => searchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })} showToast={showToast} /><main className="pb-28">{loading ? /* @__PURE__ */<LoadingSpinner /> : /* @__PURE__ */<React.Fragment>{tab === "home" && /* @__PURE__ */<HomeView filter={filter} setFilter={setFilter} slide={slide} showToast={showToast} onOpenProduct={setOpenProduct} searchRef={searchRef} cardsImages={cardsImages} />}{tab === "rashq" && /* @__PURE__ */<RashqPage livePrices={rashqLive} apiState={rashqApiState} onOpenService={(service, platformLabel, unitPrice, isLive) => setRashqOrder({
            service,
            platformLabel,
            unitPrice,
            isLive
          })} />}{tab === "purchases" && /* @__PURE__ */<PurchasesView goHome={() => goTab("home")} purchases={purchases} />}{tab === "support" && /* @__PURE__ */<SupportView showToast={showToast} />}{tab === "account" && /* @__PURE__ */<AccountView currency={currency} setCurrency={setCurrency} onTopUp={() => setShowTopUp(true)} showToast={showToast} onLogout={handleLogout} user={currentUser} authToken={authToken} />}</React.Fragment>}</main><BottomNav tab={tab} onChange={goTab} /></div>{showTopUp && /* @__PURE__ */<TopUpSheet onClose={() => setShowTopUp(false)} showToast={showToast} />}{rashqOrder && /* @__PURE__ */<RashqOrderSheet order={rashqOrder} onClose={() => setRashqOrder(null)} showToast={showToast} />}{openProduct && /* @__PURE__ */<ProductSheet item={openProduct} onClose={() => setOpenProduct(null)} onPurchased={record => setPurchases(prev => [record, ...prev])} />}{toast && /* @__PURE__ */<Toast message={toast} />}</div>;
}
createRoot(document.getElementById("root")).render(/* @__PURE__ */<App />);
export { App as default };
