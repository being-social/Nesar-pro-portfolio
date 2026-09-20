
"use client";

import React from "react";

export class SubAppShell extends React.Component<any, any> {

  state = {
    route: "home", pageOpacity: 1, reel: false, cursor: null, scrub: 0, tab: 0,
    h1: {x: 30, y: 150}, h2: {x: 110, y: 20}, drag: 0,
    curtain: "idle", transTo: "", menuOpen: false,
    shared: false,
    chat: [], draft: "", typing: false, stage: "idle", who: "", reason: "", lead: {}, quick: []
  };

  EASE = "cubic-bezier(.16,1,.3,1)";
  SESSION_KEY = "nesar.astra.session";
  ARCHIVE_KEY = "nesar.astra.sessions";

  
  // ===== ROUTING WITH HISTORY API =====
  routes = {
    home: "/",
    work: "/work",
    ent: "/work/entelligence",
    comp: "/work/composio",
    cont: "/work/contlo",
    motion: "/motion",
    motiondetail: "/motion/agent-insights",
    lab: "/lab",
    about: "/about",
    now: "/now",
    contact: "/contact",
    privacy: "/privacy",
    astra: "/astra"
  };

  reverseRoutes = {};
  for (const [key, value] of Object.entries(this.routes)) {
    this.reverseRoutes[value] = key;
  }

  // Initialize routing from URL
  initRouting = () => {
    const path = window.location.pathname;
    const route = this.reverseRoutes[path] || "home";
    if (route !== this.state.route) {
      this.setState({ route, scrub: 0, cursor: null, menuOpen: false }, () => this.armReveals());
      window.scrollTo(0, 0);
    }
    window.addEventListener("popstate", this.handlePopState);
  };

  handlePopState = () => {
    const path = window.location.pathname;
    const route = this.reverseRoutes[path] || "home";
    if (route !== this.state.route) {
      this.setState({ route, scrub: 0, cursor: null, menuOpen: false }, () => this.armReveals());
      window.scrollTo(0, 0);
    }
  };

  // Override nav to use pushState
  nav = (route) => {
    if (route === this.state.route) { 
      window.scrollTo({top: 0, behavior: this.reduced ? "auto" : "smooth"}); 
      return; 
    }
    const url = this.routes[route] || "/";
    
    if (this.reduced || this.state.curtain !== "idle") {
      this.setState({route, scrub: 0, cursor: null, menuOpen: false}, () => this.armReveals());
      window.history.pushState({}, "", url);
      window.scrollTo(0, 0);
      return;
    }
    
    this.setState({curtain: "arm", transTo: route, menuOpen: false});
    requestAnimationFrame(() => requestAnimationFrame(() => this.setState({curtain: "sweep"})));
    setTimeout(() => {
      this.setState({route, scrub: 0, cursor: null}, () => this.armReveals());
      window.scrollTo(0, 0);
    }, 260);
    setTimeout(() => this.setState({curtain: "idle"}), 700);
    window.history.pushState({}, "", this.routes[route] || "/");
  };
  
  // Call initRouting in componentDidMount

  
  componentDidMount() {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.handleVisibilityChange = () => {
      if (document.hidden) this.stopAscii();
      else if (this.asciiEl) this.startAscii();
    };
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.onScroll = () => {
      if (this.reduced) return;
      if (this._t) return;
      this._t = requestAnimationFrame(() => {
        this._t = null;
        const el = this.scrubEl;
        if (!el) { if (this.state.scrub !== 0) this.setState({scrub: 0}); return; }
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        this.setState({scrub: p});
      });
    };
    window.addEventListener("scroll", this.onScroll, {passive: true});
    this.io = new IntersectionObserver((entries) => {
      entries.filter((x) => x.isIntersecting).forEach((x, j) => {
        const el = x.target;
        this.io.unobserve(el);
        setTimeout(() => el.setAttribute("data-rv", "1"), j * 70);
      });
    }, {rootMargin: "0px 0px -8% 0px", threshold: 0.08});
    this.armReveals();
    this.restoreSession();
    this.initRouting();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    if (this.io) this.io.disconnect();
    this.stopAscii();
  }

  armReveals = (tries) => {
    if (this.reduced) return;
    const n = tries || 0;
    requestAnimationFrame(() => {
      const root = document.querySelector("[data-page-root]");
      if (!root || !this.io || root.children.length === 0) { if (n < 40) setTimeout(() => this.armReveals(n + 1), 80); return; }
      Array.from(root.children).forEach((el) => {
        if (el.hasAttribute("data-rv")) return;
        el.setAttribute("data-rv", "0");
        this.io.observe(el);
        setTimeout(() => { if (el.getAttribute("data-rv") === "0" && el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-rv", "1"); }, 1800);
      });
    });
  };

  labels = {home: "Home", work: "Work", ent: "Entelligence AI", comp: "Composio", cont: "Contlo / SuperAGI", motion: "Motion", motiondetail: "Agent Insights", lab: "Lab", about: "About", contact: "Astra"};

  // Curtain transition: a dark panel drops over the page (quick in), the route swaps under it,
  // then the panel keeps falling and the new page is revealed from the top (long, soft out).
  nav = (route) => {
    if (route === this.state.route) { window.scrollTo({top: 0, behavior: this.reduced ? "auto" : "smooth"}); return; }
    if (this.reduced || this.state.curtain !== "idle") {
      this.setState({route, scrub: 0, cursor: null, menuOpen: false}, () => this.armReveals());
      window.scrollTo(0, 0);
      return;
    }
    // A thin line sweeps top to bottom (about 600ms, quick start, soft landing); the page swaps as it passes the middle.
    this.setState({curtain: "arm", transTo: route, menuOpen: false});
    requestAnimationFrame(() => requestAnimationFrame(() => this.setState({curtain: "sweep"})));
    setTimeout(() => {
      this.setState({route, scrub: 0, cursor: null}, () => this.armReveals());
      window.scrollTo(0, 0);
    }, 260);
    setTimeout(() => this.setState({curtain: "idle"}), 700);
  };

  share = () => {
    const url = window.location.href.split("#")[0];
    const data = {title: "Nesar B, designer who builds", text: "Nesar designs AI products and then builds them. Talk to Astra, his assistant.", url};
    const done = () => { this.setState({shared: true}); setTimeout(() => this.setState({shared: false}), 2200); };
    if (navigator.share) navigator.share(data).then(done).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(done);
    else done();
  };

  /* ---------------- Astra ---------------- */

  persist = () => {
    try {
      const s = this.state;
      const rec = {id: this.sessionId, startedAt: this.startedAt, updatedAt: Date.now(), who: s.who, reason: s.reason, lead: s.lead, chat: s.chat, stage: s.stage, quick: s.quick};
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(rec));
    } catch (e) {}
  };

  restoreSession = () => {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (!raw) return;
      const r = JSON.parse(raw);
      if (!r || !r.chat || !r.chat.length) return;
      this.sessionId = r.id; this.startedAt = r.startedAt;
      this.setState({chat: r.chat, stage: r.stage || "idle", who: r.who || "", reason: r.reason || "", lead: r.lead || {}, quick: r.quick || []}, this.scrollChat);
      this._kick = true;
    } catch (e) {}
  };

  archiveSession = () => {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (raw) {
        const arr = JSON.parse(localStorage.getItem(this.ARCHIVE_KEY) || "[]");
        arr.push(JSON.parse(raw));
        localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(arr.slice(-50)));
      }
      localStorage.removeItem(this.SESSION_KEY);
    } catch (e) {}
  };

  START = [
    {id: "hiring", label: "I'm hiring"},
    {id: "project", label: "I have a project"},
    {id: "call", label: "Book a call"},
    {id: "question", label: "Just a question"}
  ];
  Q_ASK = [
    {id: "avail", label: "Is he available?"},
    {id: "built", label: "What has he built?"},
    {id: "project", label: "Actually, I have a project"}
  ];
  Q_DONE = [
    {id: "go_work", label: "Open the work"},
    {id: "go_motion", label: "Watch the motion"},
    {id: "question", label: "Ask something else"}
  ];

  // Nothing is posted until the visitor acts. The chat opens on a quiet starter with quick replies.
  startAstra = () => {
    this.sessionId = "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    this.startedAt = Date.now();
    this.setState({chat: [], stage: "idle", who: "", reason: "", lead: {}, quick: this.START});
    this.astraSay("Hi, I'm Astra, Nesar's prototype assistant. This chat stays on your device. For a real conversation, email nesar@nesar.build.");
  };

  resetChat = () => { this.archiveSession(); this.startAstra(); };

  // First thing Astra ever says in a session carries the one-line introduction.
  intro = () => (this.state.chat.some((m) => m.role === "astra") ? "" : "Astra here. This prototype keeps our chat on your device. For a real reply, email me directly. ");

  astraSay = (text, extra) => {
    const line = this.intro() + text;
    this.setState({typing: true, quick: []});
    const wait = Math.min(1300, 360 + line.length * 7);
    setTimeout(() => {
      this.setState((st) => ({typing: false, chat: st.chat.concat([{role: "astra", text: line}]), ...(extra || {})}), () => { this.scrollChat(); this.persist(); });
    }, wait);
  };

  userSay = (text) => {
    this.setState((st) => ({chat: st.chat.concat([{role: "user", text}])}), () => { this.scrollChat(); this.persist(); });
  };

  scrollChat = () => { const el = this.chatEl; if (el) el.scrollTop = el.scrollHeight; };

  isSpam = (t) => /backlink|guest post|seo service|rank your|casino|crypto signal|loan|buy followers|dm for collab|cheap price|bulk email|lead list|whatsapp marketing|link exchange/i.test(t);
  emailIn = (t) => { const m = t.match(/[\w.+-]+@[\w-]+\.[\w.-]+/); return m ? m[0] : ""; };

  onQuick = (e) => {
    const id = e.currentTarget.getAttribute("data-q");
    const q = this.state.quick.find((x) => x.id === id);
    if (q) this.userSay(q.label);
    this.handle(id);
  };

  handle = (id) => {
    const st = this.state;
    if (id === "hiring") {
      this.setState({reason: "role", stage: "note"});
      this.astraSay("Good, he's open to one serious conversation this quarter. Two things and we're done: what would the designer own, and the email he should reply to.", {quick: [{id: "call", label: "I'd rather book a call"}]});
      return;
    }
    if (id === "project") {
      this.setState({reason: "project", stage: "note"});
      this.astraSay("Tell me what you're making, roughly when, and the email he should reply to. One message is fine.", {quick: [{id: "call", label: "I'd rather book a call"}]});
      return;
    }
    if (id === "call") {
      this.setState({reason: "call", stage: "note"});
      this.astraSay("He does 20-minute calls. Leave your email and preferred times, and I'll make sure he sees it. (This prototype doesn't book calendars — I'll just make sure he gets the message.)", {quick: []});
      return;
    }
    if (id === "question") {
      this.setState({stage: "ask"});
      this.astraSay("Ask away. If it isn't in my notes I'll say so rather than guess.", {quick: this.Q_ASK});
      return;
    }
    if (id === "avail") {
      this.setState({stage: "ask"});
      this.astraSay("He's the founding designer at Entelligence AI and open to one serious conversation this quarter: a role, or a launch that needs motion, a site and product work from one person. If that's you, leave an email and he replies himself.", {quick: [{id: "hiring", label: "It's a role"}, {id: "project", label: "It's a project"}, {id: "built", label: "What has he built?"}]});
      return;
    }
    if (id === "built") {
      this.setState({stage: "ask"});
      this.astraSay("The live entelligence.ai site in code, the Agent Insights launch film, Wrapped, the Leaderboard and the design system. Before that, the deck behind Composio's $25M Series A and the SWE-Kit and MCP launches. On his own time, a SaaS for cricket academies and a WhatsApp automation platform.", {quick: [{id: "go_work", label: "Open the work"}, {id: "go_motion", label: "Watch the motion"}, {id: "project", label: "I have a project"}]});
      return;
    }
    if (id === "go_work") { this.nav("work"); return; }
    if (id === "go_motion") { this.nav("motion"); return; }
    if (id === "not_pitch") { this.setState({stage: "note"}); this.astraSay("Fair. What is it, when, and where should he reply?", {quick: []}); return; }
  };

  finish = (email, note) => {
    const st = this.state;
    const lead = {...st.lead, email, note: [st.lead.note, note].filter(Boolean).join("\n")};
    this.setState({lead, stage: "done"});
    const what = st.reason === "call" ? "I've noted your slots and emailed them to Nesar. He'll confirm one at " + email + "." : "Noted. Nesar will see this at " + email + " and reply when he can.";
    this.astraSay(what, {quick: this.Q_DONE});
  };

  astraReply = (text) => {
    const st = this.state;
    const t = text.toLowerCase();
    const email = this.emailIn(text);
    if (this.isSpam(text)) {
      this.setState({stage: "filtered"});
      this.astraSay("That reads like a pitch, and those stop with me. If I've misread it, say so.", {quick: [{id: "not_pitch", label: "It's a real project"}, {id: "go_work", label: "Show me the work"}]});
      return;
    }
    if (st.stage === "idle" || st.stage === "ask") {
      if (/avail|free|open to|hire him|when can/.test(t)) return this.handle("avail");
      if (/built|work|portfolio|projects|show|what has|examples/.test(t)) return this.handle("built");
      if (/call|meet|schedule|calendar/.test(t)) return this.handle("call");
      if (/hir|role|job|position|recruit|opening|team/.test(t)) {
        this.setState({reason: "role", stage: "note", lead: {...st.lead, note: text}});
        if (email) return this.finish(email, "");
        this.astraSay("Noted. What would the designer own, and the email he should reply to?", {quick: [{id: "call", label: "Book a call instead"}]});
        return;
      }
      if (/project|film|video|site|website|launch|landing|deck|motion|build|design|need|want/.test(t) || st.stage === "idle") {
        this.setState({reason: "project", stage: "note", lead: {...st.lead, note: text}});
        if (email) return this.finish(email, "");
        this.astraSay("Got it. Rough timing, and the email he should reply to?", {quick: [{id: "call", label: "Book a call instead"}]});
        return;
      }
      this.astraSay("That one's not in my notes, so you'd have to ask him. Leave an email and I'll make sure he does.", {quick: [{id: "project", label: "Leave details"}, {id: "built", label: "What has he built?"}]});
      return;
    }
    if (st.stage === "note") {
      if (email) return this.finish(email, text.replace(email, "").trim());
      this.setState({lead: {...st.lead, note: [st.lead.note, text].filter(Boolean).join("\n")}, stage: "email"});
      this.astraSay("And the email he should reply to?", {quick: []});
      return;
    }
    if (st.stage === "email") {
      if (!email) { this.astraSay("That doesn't look like an email. Just the address is fine.", {quick: []}); return; }
      return this.finish(email, "");
    }
    if (st.stage === "filtered") {
      if (/(misread|not a pitch|real project|hiring|genuine|actually)/i.test(text)) return this.handle("not_pitch");
      this.astraSay("Still a no from me. If it turns into a real project one day, the door's open.", {quick: [{id: "go_work", label: "Show me the work"}]});
      return;
    }
    if (email) return this.finish(email, "");
    this.astraSay("It's with him. Anything else?", {quick: this.Q_DONE});
  };

  sendMsg = () => {
    const text = this.state.draft.trim();
    if (!text || this.state.typing) return;
    this.setState({draft: ""});
    this.userSay(text);
    this.astraReply(text);
  };

  /* ---------------- misc helpers ---------------- */

  asciiT = 0;
  asciiFrame = () => {
    const el = this.asciiEl;
    if (!el) return;
    const chars = " .:-=+*#%@";
    const cols = 46, rows = 16;
    const mx = this.am ? this.am.x : 0.5, my = this.am ? this.am.y : 0.5;
    let out = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const nx = x / cols, ny = y / rows;
        const d = Math.hypot(nx - mx, (ny - my) * 1.5);
        const v = Math.sin(d * 14 - this.asciiT * 2.2) * 0.5 + 0.5;
        const f = v * (1 - Math.min(1, d * 1.3));
        out += chars[Math.max(0, Math.min(chars.length - 1, Math.round(f * (chars.length - 1))))];
      }
      out += "\n";
    }
    el.textContent = out;
  };
  startAscii = () => {
    if (this.reduced) return;
    if (this._raf) cancelAnimationFrame(this._raf);
    const tick = () => {
      if (!this.asciiEl || document.hidden) { this._raf = null; return; }
      this.asciiT += 0.045;
      this.asciiFrame();
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  };
  stopAscii = () => { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; } };

  easePt = (e) => {
    const r = this.easeEl.getBoundingClientRect();
    return {x: ((e.clientX - r.left) / r.width) * 200, y: ((e.clientY - r.top) / r.height) * 200};
  };

  tabs = [
    {t: "Product and brand", b: "The product experience for a reliability engine, plus the brand it all sits inside. Built by the same person, so they never argued with each other."},
    {t: "Launch films and Wrapped", b: "Direction, design and animation for the films that explain what the agent reads before it acts, and the year-in-review teams actually shared."},
    {t: "Website and design system", b: "The live site written in code inside the company design system, and the token set that keeps product and marketing from drifting apart."}
  ];

  
  render() {

    const s = this.state;
    const on = "#1f1e1e", off = "rgba(0,0,0,.4)";
    const workOn = (s.route === "work" || s.route === "ent" || s.route === "comp" || s.route === "cont");
    const motionOn = (s.route === "motion" || s.route === "motiondetail");
    const x1 = +(s.h1.x / 200).toFixed(2), y1 = +((200 - s.h1.y) / 200).toFixed(2);
    const x2 = +(s.h2.x / 200).toFixed(2), y2 = +((200 - s.h2.y) / 200).toFixed(2);
    const p = s.scrub;
    const bar = (o) => Math.round(20 + 80 * Math.abs(Math.sin(p * 3.1 + o))) + "%";
    const tw = (i) => s.tab === i ? "100%" : "0%";
    const stepLabel = {idle: "", ask: "Questions", note: "Details", email: "Reply address", done: "Passed to Nesar", filtered: "Filtered"}[s.stage] || "";

    
    const v = {

      pageOpacity: 1,
      isHome: s.route === "home", isWork: s.route === "work",
      isEnt: s.route === "ent", isComp: s.route === "comp", isCont: s.route === "cont",
      isMotion: s.route === "motion", isMotionDetail: s.route === "motiondetail",
      isLab: s.route === "lab", isAbout: s.route === "about", isContact: s.route === "contact",
      isPrivacy: s.route === "privacy",
      isNow: s.route === "now",
      isPrivacy: s.route === "privacy",
      isNow: s.route === "now",
      cWork: workOn ? on : off, cMotion: motionOn ? on : off,
      cLab: s.route === "lab" ? on : off, cAbout: s.route === "about" ? on : off,
      goHome: () => this.nav("home"), goWork: () => this.nav("work"),
      goEntelligence: () => this.nav("ent"), goComposio: () => this.nav("comp"), goContlo: () => this.nav("cont"),
      goMotion: () => this.nav("motion"), goMotionDetail: () => this.nav("motiondetail"),
      goLab: () => this.nav("lab"), goAbout: () => this.nav("about"), goContact: () => this.nav("contact"),
      goPrivacy: () => this.nav("privacy"),
      goNow: () => this.nav("now"),
      goPrivacy: () => this.nav("privacy"),
      goNow: () => this.nav("now"),

      curtainY: s.curtain === "sweep" ? "translateY(calc(100vh + 80px))" : "translateY(0)",
      curtainTr: s.curtain === "sweep" ? "transform 620ms cubic-bezier(.3,0,.2,1)" : "none",
      curtainOp: s.curtain === "idle" ? 0 : 1,
      pageName: this.labels[s.route] || "",
      toggleMenu: () => this.setState({menuOpen: !s.menuOpen}, () => { if (!s.menuOpen) this.menuButtonRef?.focus(); }),
      menuRows: s.menuOpen ? "1fr" : "0fr",
      burger: s.menuOpen ? "0 0 0 #1f1e1e,0 0 0 #1f1e1e" : "0 -5px 0 #1f1e1e,0 5px 0 #1f1e1e",
      menuButtonRef: (el) => { this.menuButtonRef = el; },
      cHome: s.route === "home" ? on : off,
      menuHome: () => this.nav("home"), menuWork: () => this.nav("work"), menuMotion: () => this.nav("motion"),
      menuLab: () => this.nav("lab"), menuAbout: () => this.nav("about"), menuContact: () => this.nav("contact"),
      menuPrivacy: () => this.nav("privacy"),
      menuNow: () => this.nav("now"),

      share: this.share,
      shareLabel: s.shared ? "Link copied" : "Share",

      tab0: () => this.setState({tab: 0}), tab1: () => this.setState({tab: 1}), tab2: () => this.setState({tab: 2}),
      t0: tw(0), t1: tw(1), t2: tw(2),
      tabTitle: this.tabs[s.tab].t, tabBody: this.tabs[s.tab].b,

      openReel: () => this.setState({reel: true}),
      closeReel: () => this.setState({reel: false}),
      reelDisplay: s.reel ? "block" : "none",

      onFrameMove: (e) => {
        const host = e.currentTarget;
        this.setState({cursor: {x: e.clientX, y: e.clientY, label: host.getAttribute("data-label") || "Open"}});
      },
      onFrameLeave: () => this.setState({cursor: null}),
      cursorDisplay: s.cursor ? "block" : "none",
      cursorLabel: s.cursor ? s.cursor.label : "",
      cursorPos: s.cursor ? "translate(" + (s.cursor.x + 14) + "px," + (s.cursor.y + 14) + "px)" : "translate(-300px,-300px)",

      scrubRef: (el) => { this.scrubEl = el; },
      scrubPct: Math.round(p * 100) + "%",
      scrubDots: 0.2 + p * 0.6,
      sceneNo: "0" + (1 + Math.min(4, Math.floor(p * 5))),
      bar1: bar(0), bar2: bar(0.8), bar3: bar(1.6), bar4: bar(2.4), bar5: bar(3.2),

      easeRef: (el) => { this.easeEl = el; },
      easeDown: (e) => {
        const pt = this.easePt(e);
        const d1 = Math.hypot(pt.x - s.h1.x, pt.y - s.h1.y);
        const d2 = Math.hypot(pt.x - s.h2.x, pt.y - s.h2.y);
        this.setState({drag: d1 < d2 ? 1 : 2});
        if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
      },
      easeMove: (e) => {
        if (!s.drag) return;
        const pt = this.easePt(e);
        const c = {x: Math.max(0, Math.min(200, pt.x)), y: Math.max(-60, Math.min(260, pt.y))};
        this.setState(s.drag === 1 ? {h1: c} : {h2: c});
      },
      easeUp: () => { if (s.drag) this.setState({drag: 0}); },
      easePath: "M0 200 C" + s.h1.x + " " + s.h1.y + " " + s.h2.x + " " + s.h2.y + " 200 0",
      h1x: s.h1.x, h1y: s.h1.y, h2x: s.h2.x, h2y: s.h2.y,
      easeCss: "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")",

      asciiRef: (el) => {
        this.asciiEl = el;
        if (el) { this.asciiFrame(); this.startAscii(); } else { this.stopAscii(); }
      },
      asciiMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        this.am = {x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height};
      },

      chat: s.chat.map((m) => ({
        text: m.text,
        align: m.role === "user" ? "flex-end" : "flex-start",
        bg: m.role === "user" ? "#1f1e1e" : "#ffffff",
        fg: m.role === "user" ? "#ffffff" : "#1f1e1e",
        border: m.role === "user" ? "1px solid #1f1e1e" : "1px solid rgb(232,232,232)"
      })),
      typing: s.typing,
      draft: s.draft,
      chatRef: (el) => { this.chatEl = el; if (el) { el.setAttribute("role", "log"); el.setAttribute("aria-live", "polite"); el.setAttribute("aria-relevant", "additions"); } if (el && !this._kick) { this._kick = true; if (s.chat.length === 0) this.startAstra(); } if (el) this.scrollChat(); },
      chatStep: stepLabel,
      placeholder: s.stage === "idle" ? "Or type what you need" : s.stage === "email" ? "you@company.com" : s.stage === "note" ? "Details, and your email if you have it handy" : "Type a message",
      "aria-label": "Message Astra",
      quick: s.quick,
      showStarter: s.chat.length === 0 && !s.typing,
      showQuick: s.quick.length > 0 && !s.typing,
      onQuick: this.onQuick,
      resetChat: this.resetChat,
      onDraft: (e) => this.setState({draft: e.target.value}),
      onKey: (e) => { if (e.key === "Enter") this.sendMsg(); },
      send: () => this.sendMsg(),
      sendLabel: "Send message",
        };
    return (
<div className="app-canvas">


<div style={{background: "rgb(252,252,252)", color: "#1f1e1e", minHeight: "100vh", overflowX: "hidden"}}>

<nav data-nav="desktop" style={{position: "fixed", zIndex: "60", top: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px", padding: "6px", borderRadius: "999px", background: "rgba(252,252,252,.72)", backdropFilter: "blur(28px) saturate(140%)", WebkitBackdropFilter: "blur(28px) saturate(140%)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.6),0 8px 30px rgba(0,0,0,.08)", maxWidth: "calc(100vw - 20px)"}}>
  <button sc-camel-on-click="{v.goHome}" title="Home" style={{border: "0", background: "#1f1e1e", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600", lineHeight: "120%", width: "40px", height: "40px", borderRadius: "999px", display: "grid", placeItems: "center", flex: "none"}}>N</button>
  <button sc-camel-on-click="{v.goWork}" style={{border: "0", background: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", lineHeight: "120%", padding: "13px 11px", borderRadius: "999px", whiteSpace: "nowrap", color: v.cWork}}>Work</button>
  <button sc-camel-on-click="{v.goMotion}" style={{border: "0", background: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", lineHeight: "120%", padding: "13px 11px", borderRadius: "999px", whiteSpace: "nowrap", color: v.cMotion}}>Motion</button>
  <button sc-camel-on-click="{v.goLab}" style={{border: "0", background: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", lineHeight: "120%", padding: "13px 11px", borderRadius: "999px", whiteSpace: "nowrap", color: v.cLab}}>Lab</button>
  <button sc-camel-on-click="{v.goAbout}" style={{border: "0", background: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", lineHeight: "120%", padding: "13px 11px", borderRadius: "999px", whiteSpace: "nowrap", color: v.cAbout}}>About</button>
  <button sc-camel-on-click="{v.goContact}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "999px", padding: "13px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", whiteSpace: "nowrap", flex: "none", marginLeft: "2px"}}>Talk to Astra</button>
</nav>

<nav data-nav="mobile" style={{position: "fixed", zIndex: "60", top: "12px", left: "12px", right: "12px", flexDirection: "column", alignItems: "stretch", gap: "0", padding: "6px", borderRadius: "28px", overflow: "hidden", transition: "border-radius 220ms cubic-bezier(.2,.8,.2,1)", background: "rgba(252,252,252,.72)", backdropFilter: "blur(28px) saturate(140%)", WebkitBackdropFilter: "blur(28px) saturate(140%)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.6),0 8px 30px rgba(0,0,0,.08)"}}>
  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px"}}>
    <button sc-camel-on-click="{v.goHome}" title="Home" style={{border: "0", background: "#1f1e1e", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600", lineHeight: "120%", width: "44px", height: "44px", borderRadius: "999px", display: "grid", placeItems: "center", flex: "none"}}>N</button>
    <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "120%", color: "rgba(0,0,0,.4)", flex: "1", textAlign: "center"}}>{v.pageName}</span>
    <button sc-camel-on-click="{v.goContact}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "999px", height: "44px", padding: "0 16px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", whiteSpace: "nowrap", flex: "none", display: "flex", alignItems: "center", gap: "8px"}}><span style={{width: "7px", height: "7px", borderRadius: "999px", background: "#fff", display: "block"}}></span>Astra</button>
    <button sc-camel-on-click="{v.toggleMenu}" title="Menu" style={{cursor: "pointer", background: "#fff", border: "1px solid rgb(232,232,232)", width: "44px", height: "44px", borderRadius: "999px", display: "grid", placeItems: "center", flex: "none", padding: "0"}}><span style={{width: "16px", height: "2px", background: "#1f1e1e", display: "block", transition: "box-shadow 200ms cubic-bezier(.2,.8,.2,1)", boxShadow: v.burger}}></span></button>
  </div>
  <div style={{display: "grid", transition: "grid-template-rows 320ms cubic-bezier(.32,.72,0,1)", gridTemplateRows: v.menuRows}}>
    <div style={{overflow: "hidden", minHeight: "0"}}>
      <div style={{padding: "10px 6px 6px", display: "grid", gap: "2px"}}>
        <button sc-camel-on-click="{v.menuHome}" style={{textAlign: "left", cursor: "pointer", background: "none", border: "0", padding: "0 14px", height: "48px", borderRadius: "14px", fontSize: "16px", fontWeight: "500", lineHeight: "120%", color: v.cHome}}>Home</button>
        <button sc-camel-on-click="{v.menuWork}" style={{textAlign: "left", cursor: "pointer", background: "none", border: "0", padding: "0 14px", height: "48px", borderRadius: "14px", fontSize: "16px", fontWeight: "500", lineHeight: "120%", color: v.cWork}}>Work</button>
        <button sc-camel-on-click="{v.menuMotion}" style={{textAlign: "left", cursor: "pointer", background: "none", border: "0", padding: "0 14px", height: "48px", borderRadius: "14px", fontSize: "16px", fontWeight: "500", lineHeight: "120%", color: v.cMotion}}>Motion</button>
        <button sc-camel-on-click="{v.menuLab}" style={{textAlign: "left", cursor: "pointer", background: "none", border: "0", padding: "0 14px", height: "48px", borderRadius: "14px", fontSize: "16px", fontWeight: "500", lineHeight: "120%", color: v.cLab}}>Lab</button>
        <button sc-camel-on-click="{v.menuAbout}" style={{textAlign: "left", cursor: "pointer", background: "none", border: "0", padding: "0 14px", height: "48px", borderRadius: "14px", fontSize: "16px", fontWeight: "500", lineHeight: "120%", color: v.cAbout}}>About</button>
        <button sc-camel-on-click="{v.menuContact}" style={{marginTop: "6px", cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "999px", height: "48px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Talk to Astra</button>
      </div>
    </div>
  </div>
</nav>



<main style={{opacity: v.pageOpacity, transition: "opacity 150ms linear"}}>

<sc-if value="{v.isHome}" hint-placeholder-val="{v.true}">
<div data-page-root="true"><main id="main-content" role="main">
  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0", textAlign: "center"}}>
    <h1 style={{fontSize: "clamp(36px,7vw,72px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", animation: "fUp 700ms cubic-bezier(.32,.72,0,1) both"}}>From first frame to shipped code</h1>
    <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px auto 0", maxWidth: "52ch"}}>Designer who builds, for AI products</p>
    <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "28px", flexWrap: "wrap"}}>
      <button sc-camel-on-click="{v.goWork}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>See the work</button>
      <button sc-camel-on-click="{v.openReel}" style={{cursor: "pointer", background: "transparent", color: "#1f1e1e", border: "1px solid rgb(232,232,232)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Watch the reel</button>
    </div>
    <div style={{marginTop: "44px", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,#f2f2f4,#1f1e1e)", aspectRatio: "16/9", position: "relative"}}>
      <div style={{position: "absolute", inset: "16%", borderRadius: "999px", border: "1px solid rgba(255,255,255,.25)"}}></div>
      <div style={{position: "absolute", inset: "30%", borderRadius: "999px", background: "radial-gradient(circle at 36% 30%,#fff,#8f8f8f 55%,#1f1e1e)"}}></div>
      <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,.8)", animation: "fRun 6s linear infinite"}}></div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>I don’t hand it off.</h2>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "62ch"}}>Founding designer at Entelligence AI, previously the only designer at Composio. I make the product, the film and the site. Then I write the code for the parts that have to feel exact.</p>

    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
      <div style={{position: "relative", borderRadius: "24px", overflow: "hidden", background: "#1f1e1e", minHeight: "420px", gridColumn: "span 1"}}>
        <div style={{position: "absolute", inset: "0", display: "grid", placeItems: "center"}}><div style={{width: "58%", aspectRatio: "1", borderRadius: "999px", background: "radial-gradient(circle at 36% 30%,#fff,#8f8f8f 52%,#1f1e1e)"}}></div></div>
        <div style={{position: "absolute", left: "28px", right: "28px", bottom: "28px", fontSize: "20px", fontWeight: "500", lineHeight: "115%", color: "#fff"}}>Launch films that explain what the product actually does</div>
      </div>
      <div style={{display: "grid", gap: "16px"}}>
        <div style={{position: "relative", borderRadius: "24px", overflow: "hidden", background: "#f2f2f4", minHeight: "202px", padding: "clamp(20px,4.5vw,28px)"}}>
          <div style={{fontSize: "20px", fontWeight: "500", lineHeight: "115%", maxWidth: "22ch"}}>Product design for developer-facing AI</div>
          <div style={{position: "absolute", right: "24px", bottom: "24px", display: "flex", gap: "6px", alignItems: "flex-end", height: "64px"}}>
            <span style={{width: "14px", background: "#d4d4d4", borderRadius: "3px", height: "40%"}}></span>
            <span style={{width: "14px", background: "#a4a4a5", borderRadius: "3px", height: "70%"}}></span>
            <span style={{width: "14px", background: "#1f1e1e", borderRadius: "3px", height: "100%"}}></span>
          </div>
        </div>
        <div style={{position: "relative", borderRadius: "24px", overflow: "hidden", background: "#f2f2f4", minHeight: "202px", padding: "clamp(20px,4.5vw,28px)"}}>
          <div style={{fontSize: "20px", fontWeight: "500", lineHeight: "115%", maxWidth: "22ch"}}>Websites designed and shipped in code</div>
          <div style={{position: "absolute", right: "24px", bottom: "24px", width: "120px", height: "72px", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)", padding: "10px"}}>
            <div style={{height: "6px", width: "60%", background: "#1f1e1e", borderRadius: "99px"}}></div>
            <div style={{height: "5px", width: "88%", background: "#e8e8e8", borderRadius: "99px", marginTop: "7px"}}></div>
            <div style={{height: "5px", width: "72%", background: "#e8e8e8", borderRadius: "99px", marginTop: "5px"}}></div>
          </div>
        </div>
      </div>
      <div style={{position: "relative", borderRadius: "24px", overflow: "hidden", background: "#f2f2f4", minHeight: "420px"}}>
        <div style={{position: "absolute", left: "28px", right: "28px", top: "28px", fontSize: "20px", fontWeight: "500", lineHeight: "115%"}}>Design systems that product and marketing both use</div>
        <div style={{position: "absolute", left: "28px", right: "28px", bottom: "28px", display: "flex", gap: "8px", flexWrap: "wrap"}}>
          <span style={{width: "44px", height: "44px", borderRadius: "12px", background: "#1f1e1e"}}></span>
          <span style={{width: "44px", height: "44px", borderRadius: "12px", background: "#5e636e"}}></span>
          <span style={{width: "44px", height: "44px", borderRadius: "12px", background: "#a4a4a5"}}></span>
          <span style={{width: "44px", height: "44px", borderRadius: "12px", background: "#d4d4d4"}}></span>
          <span style={{width: "44px", height: "44px", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)"}}></span>
        </div>
      </div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "40px", alignItems: "center"}}>
      <div>
        <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0"}}>One designer,<br />a whole company’s surface</h2>
        <div style={{display: "flex", gap: "8px", marginTop: "32px"}}>
          <div sc-camel-on-click="{v.tab0}" style={{flex: "1", height: "4px", borderRadius: "10px", background: "rgba(0,0,0,.2)", position: "relative", overflow: "hidden", cursor: "pointer"}}><div style={{position: "absolute", inset: "0", borderRadius: "10px", background: "#1f1e1e", transformOrigin: "left", width: v.t0}}></div></div>
          <div sc-camel-on-click="{v.tab1}" style={{flex: "1", height: "4px", borderRadius: "10px", background: "rgba(0,0,0,.2)", position: "relative", overflow: "hidden", cursor: "pointer"}}><div style={{position: "absolute", inset: "0", borderRadius: "10px", background: "#1f1e1e", width: v.t1}}></div></div>
          <div sc-camel-on-click="{v.tab2}" style={{flex: "1", height: "4px", borderRadius: "10px", background: "rgba(0,0,0,.2)", position: "relative", overflow: "hidden", cursor: "pointer"}}><div style={{position: "absolute", inset: "0", borderRadius: "10px", background: "#1f1e1e", width: v.t2}}></div></div>
        </div>
        <div style={{marginTop: "20px"}}>
          <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>{v.tabTitle}</p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0", maxWidth: "46ch"}}>{v.tabBody}</p>
        </div>
        <button sc-camel-on-click="{v.goEntelligence}" style={{marginTop: "28px", cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Read the case study</button>
      </div>
      <div style={{borderRadius: "24px", overflow: "hidden", background: "#fff", border: "1px solid rgb(232,232,232)", aspectRatio: "4/3", position: "relative"}}>
        <div style={{position: "absolute", left: "8%", right: "8%", top: "14%", bottom: "0", borderRadius: "16px 16px 0 0", background: "#1f1e1e"}}></div>
        <div style={{position: "absolute", left: "16%", right: "16%", top: "32%", bottom: "0", borderRadius: "12px 12px 0 0", background: "#f2f2f4"}}></div>
        <div style={{position: "absolute", left: "24%", right: "24%", top: "52%", bottom: "0", borderRadius: "10px 10px 0 0", background: "#fff", border: "1px solid rgb(232,232,232)", borderBottom: "0"}}></div>
      </div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>What I can do for you</h2>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>Six things, all done by the same person. Nothing gets lost between the idea and the thing that ships.</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "16px", height: "16px", border: "2px solid #1f1e1e", borderRadius: "4px", display: "block"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>Product UI and UX</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Research, wireframes, prototypes and final screens for developer-facing AI products: code review, incident intelligence, dashboards, onboarding and docs.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "18px", height: "12px", border: "2px solid #1f1e1e", borderRadius: "3px", display: "block"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>Websites</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Marketing sites and landing pages, from information architecture to the live build. Hero motion and interactive sections included.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "0", height: "0", borderLeft: "12px solid #1f1e1e", borderTop: "7px solid transparent", borderBottom: "7px solid transparent", marginLeft: "3px", display: "block"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>Launch videos</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Films that make a product make sense on launch day: script, storyboard, styleframes, animation, and the cut-downs for social.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "16px", height: "16px", border: "2px solid #1f1e1e", borderRadius: "999px", display: "block"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>Motion graphics</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Product explainers, interface motion, title work, 3D modelling and rendering, and year-in-review pieces like Entelligence Wrapped. Frame by frame when it matters.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "16px", height: "2px", background: "#1f1e1e", display: "block", boxShadow: "0 5px 0 #1f1e1e,0 -5px 0 #1f1e1e"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>Shipping it in code</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Next.js, React and Tailwind for the pages and interactions; design systems with real tokens; small agents and automations that do actual work.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
        <div style={{width: "42px", height: "42px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center"}}><span style={{width: "14px", height: "14px", border: "2px solid #1f1e1e", borderRadius: "999px", display: "block", boxShadow: "5px 5px 0 -2px #1f1e1e"}}></span></div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "18px 0 0"}}>SEO and content</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>Three years in digital marketing before design. SEO, programmatic SEO, analytics and content systems that make a site findable and measurable, not just pretty.</p>
      </div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Selected work</h2>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
      <button sc-camel-on-click="{v.goEntelligence}" style={{textAlign: "left", cursor: "pointer", border: "0", padding: "32px", borderRadius: "24px", background: "#1f1e1e", color: "#fff", minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px"}}>
        <div>
          <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Entelligence AI</p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "8px 0 0"}}>Founding designer. Product, brand, the live website, launch films, Wrapped, the Leaderboard, the design system and the investor decks.</p>
        </div>
        <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)"}}>2025 to present · 6 artifacts</span>
      </button>
      <div style={{display: "grid", gap: "16px"}}>
        <button sc-camel-on-click="{v.goComposio}" style={{textAlign: "left", cursor: "pointer", border: "0", padding: "32px", borderRadius: "24px", background: "#f2f2f4", minHeight: "142px"}}>
          <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Composio</p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A year of launches and the deck behind a $25M Series A.</p>
        </button>
        <button sc-camel-on-click="{v.goContlo}" style={{textAlign: "left", cursor: "pointer", border: "0", padding: "32px", borderRadius: "24px", background: "#f2f2f4", minHeight: "142px"}}>
          <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Contlo / SuperAGI</p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Whitepaper, blog visuals and early brand marketing.</p>
        </button>
      </div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Tools I work in</h2>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "52ch"}}>Design, motion and code at one desk. The same person opens Figma in the morning and pushes the build at night.</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Design and prototyping</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Research, wireframes, hi-fi, prototypes</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px"}}>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Figma</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Framer</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Adobe XD</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Photoshop</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Illustrator</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Lightroom</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Canva</span>
        </div>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Motion and 3D</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Launch films, explainers, modelling, rendering</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px"}}>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>After Effects</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Premiere Pro</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Blender</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Adobe Dimension</span>
        </div>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Code and web</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>From hand-written apps to sites a marketer can edit</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px"}}>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Next.js</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>React</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>TypeScript</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Tailwind</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>PostgreSQL</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Supabase</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>WordPress</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Wix</span>
        </div>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>AI and fast building</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Agents that do work, and tools that ship a v1 in a day</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px"}}>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Claude</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Vercel AI SDK</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>v0</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Lovable</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Replit</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Automated outreach systems</span>
        </div>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "28px", gridColumn: "1 / -1"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Growth and content</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Three years of marketing before design. It still shapes how I structure a page.</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px"}}>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>SEO</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Programmatic SEO</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>E-commerce SEO</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Google Analytics</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Web content writing</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Social media management</span>
          <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Lead generation systems</span>
        </div>
      </div>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0"}}>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", flexWrap: "wrap"}}>
      <div>
        <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0"}}>Things I built on my own</h2>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "14px 0 0", maxWidth: "52ch"}}>Nobody asked for these. Some are running with real users, some are free tools, some are open source.</p>
      </div>
      <button sc-camel-on-click="{v.goLab}" style={{cursor: "pointer", background: "transparent", color: "#1f1e1e", border: "1px solid rgb(232,232,232)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>See the lab</button>
    </div>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
      <button sc-camel-on-click="{v.goLab}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#1f1e1e", color: "#fff", padding: "32px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px"}}>
        <div><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Theta Academy</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "6px 0 0"}}>Multi-tenant SaaS for running cricket academies, branches, coaches, rosters, attendance and fees.</p></div>
        <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)"}}>Next.js · PostgreSQL · live</span>
      </button>
      <button sc-camel-on-click="{v.goLab}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#f2f2f4", padding: "32px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px"}}>
        <div><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>MessagebotWP</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>WhatsApp automation platform with real users and real ops decisions.</p></div>
        <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Next.js · Supabase · Baileys</span>
      </button>
      <button sc-camel-on-click="{v.goLab}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#f2f2f4", padding: "32px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px"}}>
        <div><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>AI Onboard</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px 0 0"}}>A Claude-powered interview that turns a ten-minute conversation into a personal engagement persona.</p></div>
        <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Claude · open source</span>
      </button>
    </div>
  </section>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(64px,10vw,96px) 24px 0", textAlign: "center"}}>
    <div style={{width: "100px", height: "100px", margin: "0 auto", borderRadius: "32px", background: "#1f1e1e", display: "grid", placeItems: "center"}}><span style={{width: "34px", height: "34px", border: "3px solid #fff", borderRadius: "999px", display: "block"}}></span></div>
    <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "28px 0 0"}}>Let’s make something that moves.</h2>
    <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "14px auto 0", maxWidth: "46ch"}}>Roles, freelance, or a launch that needs to land. Astra, my assistant, takes the first conversation</p>
    <button sc-camel-on-click="{v.goContact}" style={{marginTop: "26px", cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Talk to Astra</button>
    <button sc-camel-on-click="{v.share}" style={{margin: "26px 0 0 8px", cursor: "pointer", background: "transparent", color: "#1f1e1e", border: "1px solid rgb(232,232,232)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>{v.shareLabel}</button>
  </section>
</div>
</sc-if>

<sc-if value="{v.isWork}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Three companies.<br />The only designer at each one.</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "58ch"}}>Each page goes artifact by artifact: what it was, what the problem was, what I did, and how it was built</p>

  <div style={{display: "grid", gap: "16px", marginTop: "48px"}}>
    <button sc-camel-on-click="{v.goEntelligence}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center"}}>
      <div>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Entelligence AI · Founding designer · 2025 to present</p>
        <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>The whole surface of an AI company, built by one person</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 0", maxWidth: "54ch"}}>Product experience, brand, the live website in code, launch films, Entelligence Wrapped, the engineering Leaderboard, the design system, and the decks the founders take into fundraising.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#1f1e1e", aspectRatio: "4/3", position: "relative", overflow: "hidden"}}>
        <div style={{position: "absolute", left: "10%", right: "10%", top: "22%", bottom: "0", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.26)", borderBottom: "0", borderRadius: "16px 16px 0 0"}}></div>
        <div style={{position: "absolute", left: "22%", right: "22%", top: "46%", bottom: "0", background: "#fff", borderRadius: "12px 12px 0 0"}}></div>
      </div>
    </button>

    <button sc-camel-on-click="{v.goComposio}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center"}}>
      <div>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Composio · Designer · 2024 to 2025</p>
        <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>A year of launches, and the deck behind a $25M Series A</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 0", maxWidth: "54ch"}}>The only designer at an agentic-AI infrastructure company: SWE-Kit and MCP launch sites, launch films and creatives, the Series A pitch deck, and the company website redesigned and rebuilt.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#fff", border: "1px solid rgb(232,232,232)", aspectRatio: "4/3", display: "grid", placeItems: "center"}}>
        <span style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "600", lineHeight: "110%"}}>$25<span style={{color: "#d4d4d4"}}>M</span></span>
      </div>
    </button>

    <button sc-camel-on-click="{v.goContlo}" style={{textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center"}}>
      <div>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Contlo / SuperAGI · Marketing generalist · 2024</p>
        <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>Where the AI work started</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 0", maxWidth: "54ch"}}>Marketing, growth and early product work across an early-stage AI ecosystem: a SuperAGI whitepaper, blog visuals, outreach systems and programmatic SEO.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#1f1e1e", aspectRatio: "4/3", position: "relative", overflow: "hidden"}}>
        <div style={{position: "absolute", inset: "24%", border: "1px solid rgba(255,255,255,.4)"}}></div>
        <div style={{position: "absolute", inset: "36%", background: "linear-gradient(180deg,#fff,#a4a4a5)"}}></div>
      </div>
    </button>
  </div>

  <div style={{marginTop: "clamp(56px,9vw,80px)"}}>
    <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Skills, and where each one was earned</h2>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "14px auto 0", maxWidth: "56ch"}}>Not a list of logos. Each skill is tied to the place it was actually used, so you can check it against the work above.</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Product design and UX</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · Composio · Contlo</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>UX research, wireframing, prototyping and high-fidelity screens in Figma. Learned formally through the Google UX certificate track, then used daily on a reliability engine for developers: code review, incident intelligence, dashboards, onboarding, docs. Sub-brand UI and UX at Contlo.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Motion design and video</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · Composio</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Launch films for Agent Insights, SWE-Kit and MCP. Entelligence Wrapped. Product explainers and interface motion. After Effects and Premiere Pro for the films, Blender for 3D modelling, rendering and animation.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Web design and build</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · Composio · UIPEP</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The live entelligence.ai, designed and coded. The Composio site redesigned, rebuilt and migrated to WordPress. Responsive web design and WordPress development from the UIPEP years, plus Framer and Wix builds along the way.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Design systems</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Built and maintain the component library and token set used across product and marketing, with motion tokens next to colour and spacing. The system is the deliverable, not a page describing one.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Pitch decks and brand</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Composio · Entelligence · Contlo</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The deck behind Composio's $25M Series A, and the decks Entelligence's founders take into fundraising. Brand and marketing creative at all three, including a SuperAGI whitepaper and a repeatable blog thumbnail system.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Code, agents and automation</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · Lab</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Next.js, React, TypeScript, Tailwind, PostgreSQL and Supabase. Shipped the Entelligence site in code, and on the side a multi-tenant academy SaaS, a WhatsApp automation platform, a Claude-powered onboarding tool, and Astra on this site.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "28px", gridColumn: "1 / -1"}}>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Growth, SEO and content</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Contlo · UIPEP · Versatile Digi · self-employed</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>SEO and e-commerce SEO, programmatic SEO and automated outreach and lead-generation systems at Contlo, Google Analytics, web content writing, social media management and campaigns. Three years of this before design is why the sites I build are structured to be found, not just looked at.</p>
      </div>
    </div>
  </div>

  <div style={{marginTop: "clamp(56px,9vw,80px)"}}>
    <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Before design</h2>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "14px auto 0", maxWidth: "54ch"}}>Three years in digital marketing. It is where I learned to think about users before pixels, and why SEO still shapes how I structure a site.</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>UIPEP Technologies · Oct 2021 to Jan 2024</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Digital marketing associate</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Two years and four months across two roles: SEO, content, web and WordPress builds, 3D renders, and digital campaigns. The first job where I had to care what a stranger did on a page, not what it looked like.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Versatile Digi · May 2021 to Oct 2021</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Digital marketing</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Campaigns and content for small businesses. Fast, measurable, and unforgiving about what actually converts.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Self-employed · Jun 2021 to present</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Blogging, SEO and 3D experiments</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Where the WordPress, search and Blender habits come from. Still running on the side.</p>
      </div>
    </div>
  </div>
</div>
</sc-if>

<sc-if value="{v.isEnt}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <button sc-camel-on-click="{v.goWork}" style={{cursor: "pointer", background: "none", border: "0", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>← Work</button>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "16px 0 0", maxWidth: "18ch"}}>The whole surface of an AI company, built by one person</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0", maxWidth: "62ch"}}>Entelligence builds a production reliability engine for engineering teams. It reviews every pull request against the team’s own incident history, watches production, and heals what breaks, so the same class of bug never ships twice.</p>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(150px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Role</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Founding designer</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Years</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>2025 to present</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Team</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Only designer, first year</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Live</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>entelligence.ai</p></div>
  </div>

  <div ref={v.scrubRef} style={{marginTop: "32px", position: "relative", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,#5e636e,#1f1e1e)", height: "clamp(240px,38vw,480px)"}}>
    <div style={{position: "absolute", inset: "0", backgroundImage: "radial-gradient(rgba(255,255,255,.26) 1px,transparent 1px)", backgroundSize: "22px 22px", opacity: v.scrubDots}}></div>
    <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "#fff", boxShadow: "0 0 24px rgba(255,255,255,.8)", left: v.scrubPct}}></div>
    <div style={{position: "absolute", left: "7%", right: "7%", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "14px", alignItems: "flex-end", height: "44%"}}>
      <div style={{flex: "1", background: "rgba(255,255,255,.95)", borderRadius: "5px", height: v.bar1}}></div>
      <div style={{flex: "1", background: "rgba(255,255,255,.6)", borderRadius: "5px", height: v.bar2}}></div>
      <div style={{flex: "1", background: "#fff", borderRadius: "5px", height: v.bar3}}></div>
      <div style={{flex: "1", background: "rgba(255,255,255,.45)", borderRadius: "5px", height: v.bar4}}></div>
      <div style={{flex: "1", background: "rgba(255,255,255,.75)", borderRadius: "5px", height: v.bar5}}></div>
    </div>
    <div style={{position: "absolute", left: "24px", bottom: "20px", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)"}}>Scene {v.sceneNo} · scroll to scrub</div>
  </div>

  <div style={{maxWidth: "760px", margin: "clamp(56px,9vw,80px) auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>01 · The problem</p>
    <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>A company that sells reliability to engineers cannot look approximate.</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0"}}>Everything a developer saw had to argue the same case: the product, the site, the film, the deck. There was one designer to make all of it. The audience is developers, so the visual argument had to be precise before it was pretty: dense information, honest states, no marketing gloss over an engineering product. Motion carried what a static screen could not explain, what the agent reads, when it acts, and what changes because of it.</p>
  </div>

  <div style={{marginTop: "clamp(56px,9vw,80px)"}}>
    <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Six artifacts, one system</h2>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Website</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Designed and built in code, motion included.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Agent Insights</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A launch film that shows the agent’s reasoning.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Leaderboard</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A public ranking surface for engineering teams.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Wrapped</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A year of engineering data, told as a story.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Design system</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Tokens and components shared by product and marketing.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Investor decks</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>The decks the founders take into fundraising.</p></div>
    </div>
  </div>

  <div style={{marginTop: "clamp(56px,9vw,80px)", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>The website, written in code</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The site that is live now was designed and built by me inside the company design system, including the hero, the motion and the interactive sections. Building it myself removed the round trip where timing gets approximated by someone who did not animate it.</p>
      <div style={{marginTop: "20px", display: "grid", gap: "10px"}}>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "0"}}>Information architecture rebuilt around what a developer needs to believe, in order.</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "0"}}>Hero motion driven by tokens, so a duration change is a design edit, not a code review.</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "0"}}>Reduced motion designed as its own state rather than switched off.</p>
      </div>
    </div>
    <div style={{borderRadius: "24px", background: "linear-gradient(180deg,#a4a4a5,#1f1e1e)", aspectRatio: "4/3", position: "relative", overflow: "hidden"}}>
      <div style={{position: "absolute", left: "8%", right: "8%", top: "18%", bottom: "0", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)", borderBottom: "0", borderRadius: "16px 16px 0 0"}}></div>
      <div style={{position: "absolute", left: "18%", right: "18%", top: "40%", bottom: "0", background: "#fff", borderRadius: "12px 12px 0 0"}}></div>
    </div>
  </div>

  <div style={{marginTop: "16px", borderRadius: "24px", background: "#1f1e1e", color: "#fff", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div style={{borderRadius: "24px", background: "#000", aspectRatio: "16/10", position: "relative", overflow: "hidden", order: "2"}}>
      <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,.28)"}}></div>
      <div style={{position: "absolute", inset: "32%", borderRadius: "999px", background: "radial-gradient(circle at 36% 30%,#fff,#8f8f8f 58%,#1f1e1e)"}}></div>
      <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,.8)", animation: "fRun 6s linear infinite"}}></div>
    </div>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Agent Insights, explained in ninety seconds</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "12px 0 0"}}>Developers do not trust a review bot that cannot show its reasoning. The film makes the invisible input visible (incident history, past pull requests, production signals) before it shows a single output.</p>
      <button sc-camel-on-click="{v.goMotionDetail}" style={{marginTop: "22px", cursor: "pointer", background: "#fff", color: "#1f1e1e", border: "0", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>See the motion breakdown</button>
    </div>
  </div>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "16px", marginTop: "16px"}}>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Leaderboard</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 20px"}}>A public surface where engineering teams see how they rank. The design problem is density: a lot of comparable numbers that have to stay readable and stay honest.</p>
      <div style={{display: "grid", gap: "10px"}}>
        <div style={{display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "14px", color: "rgba(0,0,0,.4)", width: "20px"}}>01</span><span style={{flex: "1", height: "10px", background: "#1f1e1e", borderRadius: "99px"}}></span></div>
        <div style={{display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "14px", color: "rgba(0,0,0,.4)", width: "20px"}}>02</span><span style={{flex: "1", height: "10px", background: "#a4a4a5", borderRadius: "99px", maxWidth: "76%"}}></span></div>
        <div style={{display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "14px", color: "rgba(0,0,0,.4)", width: "20px"}}>03</span><span style={{flex: "1", height: "10px", background: "#d4d4d4", borderRadius: "99px", maxWidth: "52%"}}></span></div>
      </div>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Wrapped</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 20px"}}>A year of engineering activity turned into something a team wants to share. Data first, narrative second, motion last. In that order, or it becomes decoration.</p>
      <div style={{borderRadius: "16px", background: "#fff", border: "1px solid rgb(232,232,232)", height: "120px", display: "grid", placeItems: "center", fontSize: "26px", fontWeight: "600", lineHeight: "130%"}}>2025</div>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Design system</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 20px"}}>One token set and component library across product and marketing, so a launch page and a settings screen cannot drift apart. Motion tokens sit in the same file as colour and spacing.</p>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}>
        <span style={{width: "40px", height: "40px", borderRadius: "12px", background: "#1f1e1e"}}></span>
        <span style={{width: "40px", height: "40px", borderRadius: "12px", background: "#5e636e"}}></span>
        <span style={{width: "40px", height: "40px", borderRadius: "12px", background: "#a4a4a5"}}></span>
        <span style={{width: "40px", height: "40px", borderRadius: "12px", background: "#d4d4d4"}}></span>
        <span style={{width: "40px", height: "40px", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)"}}></span>
      </div>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Investor decks</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 20px"}}>The decks the founders take into fundraising. Structure and hierarchy, not decoration. Every slide has one claim and the evidence for it.</p>
      <div style={{border: "1.5px dashed #e8e8e8", borderRadius: "16px", height: "120px", display: "grid", placeItems: "center", textAlign: "center", padding: "16px"}}>
        <div><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "0"}}>Not public</p><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Confidential material stays out of the portfolio</p></div>
      </div>
    </div>
  </div>

  <div style={{maxWidth: "760px", margin: "clamp(56px,9vw,80px) auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>02 · How it was built</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Design and implementation were the same job. The component library is the deliverable, not a Figma page describing one, and the motion lives in tokens rather than in a spec document that goes stale the week after it is written.</p>

    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "56px 0 0"}}>03 · Outcome</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The website, the launch films, Wrapped, the Leaderboard and the fundraising decks all came out of one system built by one person. Public outcome numbers pending approval.</p>

    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "56px 0 0"}}>04 · Reflection</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Being the only designer is not a story about volume. It is a story about deciding fast, keeping one system, and knowing which things deserve to be beautiful.</p>
  </div>

  <button sc-camel-on-click="{v.goComposio}" style={{width: "100%", marginTop: "clamp(48px,8vw,64px)", cursor: "pointer", textAlign: "left", background: "#1f1e1e", color: "#fff", border: "0", borderRadius: "24px", padding: "clamp(24px,4vw,44px)"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>Next project</p>
    <p style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", margin: "10px 0 0"}}>Composio →</p>
  </button>
</div>
</sc-if>

<sc-if value="{v.isComp}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <button sc-camel-on-click="{v.goWork}" style={{cursor: "pointer", background: "none", border: "0", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>← Work</button>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "16px 0 0", maxWidth: "18ch"}}>A year of launches at an AI infrastructure company</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0", maxWidth: "62ch"}}>Composio builds agentic-AI infrastructure. I was the only designer through a year of launches and a fundraise, everything that had to look sharp in front of developers and investors came through one person.</p>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(150px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Role</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Designer</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Years</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>2024 to 2025</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Team</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Only designer</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Launches</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>SWE-Kit · MCP</p></div>
  </div>

  <div style={{marginTop: "32px", borderRadius: "24px", background: "#f2f2f4", height: "clamp(220px,32vw,400px)", display: "grid", placeItems: "center", position: "relative", overflow: "hidden"}}>
    <span style={{fontSize: "clamp(56px,11vw,140px)", fontWeight: "600", lineHeight: "110%"}}>$25<span style={{color: "#d4d4d4"}}>M</span></span>
    <p style={{position: "absolute", left: "24px", bottom: "22px", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Series A, led by Lightspeed Venture Partners</p>
  </div>

  <div style={{maxWidth: "760px", margin: "clamp(56px,9vw,80px) auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>01 · The problem</p>
    <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>Infrastructure is hard to show.</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0"}}>Nothing has a screen, the value is in what a developer stops having to build, and every launch has to land in a day. Two launches, a fundraise and a website rebuild in the same year, with no design team to absorb the load. The answer was a repeatable launch kit: one narrative shape, one type and layout system, and motion that could be re-cut for each release instead of rebuilt.</p>
  </div>

  <div style={{marginTop: "clamp(56px,9vw,80px)", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>The Series A deck</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The deck behind a $25M Series A led by Lightspeed. My part was structure and hierarchy: what goes on one slide, what order the argument runs in, and how a number is shown so it reads in four seconds from the back of a room.</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The slides themselves stay confidential. What is shareable is the system underneath, the narrative shape and the layout grammar that made forty slides feel like one document.</p>
    </div>
    <div style={{display: "grid", gap: "12px"}}>
      <div style={{display: "flex", gap: "12px"}}>
        <div style={{flex: "1", aspectRatio: "16/10", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)", padding: "12px"}}><div style={{height: "7px", width: "60%", background: "#1f1e1e", borderRadius: "99px"}}></div><div style={{height: "6px", width: "86%", background: "#e8e8e8", borderRadius: "99px", marginTop: "8px"}}></div><div style={{height: "6px", width: "70%", background: "#e8e8e8", borderRadius: "99px", marginTop: "6px"}}></div></div>
        <div style={{flex: "1", aspectRatio: "16/10", borderRadius: "12px", background: "#1f1e1e", display: "grid", placeItems: "center", color: "#fff", fontSize: "20px", fontWeight: "600"}}>$25M</div>
      </div>
      <div style={{display: "flex", gap: "12px"}}>
        <div style={{flex: "1", aspectRatio: "16/10", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)"}}></div>
        <div style={{flex: "1", aspectRatio: "16/10", borderRadius: "12px", background: "#fff", border: "1px solid rgb(232,232,232)", padding: "12px", display: "flex", alignItems: "flex-end", gap: "6px"}}><span style={{flex: "1", height: "30%", background: "#d4d4d4", borderRadius: "3px"}}></span><span style={{flex: "1", height: "58%", background: "#a4a4a5", borderRadius: "3px"}}></span><span style={{flex: "1", height: "86%", background: "#1f1e1e", borderRadius: "3px"}}></span></div>
      </div>
      <div style={{border: "1.5px dashed #e8e8e8", borderRadius: "12px", padding: "14px", textAlign: "center"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", margin: "0"}}>Slides not shown · sanitised structure only</p></div>
    </div>
  </div>

  <div style={{marginTop: "16px", borderRadius: "24px", background: "#1f1e1e", color: "#fff", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div style={{borderRadius: "24px", background: "linear-gradient(180deg,#a4a4a5,#000)", aspectRatio: "16/10", position: "relative", overflow: "hidden", order: "2"}}>
      <div style={{position: "absolute", left: "0", right: "0", bottom: "0", height: "56%", display: "flex", alignItems: "flex-end", gap: "8px", padding: "22px"}}>
        <div style={{flex: "1", height: "30%", background: "rgba(255,255,255,.8)", borderRadius: "3px"}}></div>
        <div style={{flex: "1", height: "62%", background: "rgba(255,255,255,.62)", borderRadius: "3px"}}></div>
        <div style={{flex: "1", height: "90%", background: "#fff", borderRadius: "3px"}}></div>
        <div style={{flex: "1", height: "46%", background: "rgba(255,255,255,.45)", borderRadius: "3px"}}></div>
        <div style={{flex: "1", height: "70%", background: "rgba(255,255,255,.7)", borderRadius: "3px"}}></div>
      </div>
    </div>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>SWE-Kit launch</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "12px 0 0"}}>A launch identity, a landing site and a film, aimed at developers who have already seen a hundred agent demos. The work was in showing the thing running rather than describing what it could do.</p>
    </div>
  </div>

  <div style={{marginTop: "16px", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div style={{borderRadius: "24px", background: "#1f1e1e", aspectRatio: "16/10", position: "relative", overflow: "hidden"}}>
      <div style={{position: "absolute", inset: "0", backgroundImage: "radial-gradient(rgba(255,255,255,.34) 1px,transparent 1px)", backgroundSize: "17px 17px"}}></div>
      <div style={{position: "absolute", left: "50%", top: "50%", width: "38%", height: "66%", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "conic-gradient(from 180deg,#fff,#5e636e,#fff)", animation: "fSpin 18s linear infinite"}}></div>
    </div>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>MCP launch</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>A protocol launch, which means the product is an idea about how two systems talk. The creative had one job: give that idea a shape people could point at, and repeat that shape everywhere the launch appeared.</p>
    </div>
  </div>

  <div style={{marginTop: "16px", borderRadius: "24px", background: "#f2f2f4", padding: "clamp(24px,4vw,48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
    <div style={{borderRadius: "24px", background: "#fff", border: "1px solid rgb(232,232,232)", aspectRatio: "16/10", padding: "24px", order: "2", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center"}}>
      <div style={{height: "10px", width: "44%", background: "#1f1e1e", borderRadius: "99px"}}></div>
      <div style={{height: "8px", width: "88%", background: "#e8e8e8", borderRadius: "99px"}}></div>
      <div style={{height: "8px", width: "76%", background: "#e8e8e8", borderRadius: "99px"}}></div>
      <div style={{display: "flex", gap: "10px", marginTop: "8px"}}><div style={{flex: "1", height: "44px", borderRadius: "12px", background: "#f2f2f4"}}></div><div style={{flex: "1", height: "44px", borderRadius: "12px", background: "#f2f2f4"}}></div><div style={{flex: "1", height: "44px", borderRadius: "12px", background: "#f2f2f4"}}></div></div>
    </div>
    <div>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>The website, redesigned and rebuilt</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>The company site was redesigned and rebuilt, and the whole thing migrated to a platform the marketing side could actually edit. That constraint shaped the design: every page had to be assemblable from a small set of blocks by someone who is not a designer.</p>
    </div>
  </div>

  <div style={{maxWidth: "760px", margin: "clamp(56px,9vw,80px) auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>02 · What I took from it</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Being the only designer through a fundraise year teaches triage. Not everything can be excellent at once, so you decide early which surfaces carry the argument and let the rest be merely correct. It also teaches you to build kits, because the second launch should not cost what the first one did.</p>
  </div>

  <button sc-camel-on-click="{v.goContlo}" style={{width: "100%", marginTop: "clamp(48px,8vw,64px)", cursor: "pointer", textAlign: "left", background: "#1f1e1e", color: "#fff", border: "0", borderRadius: "24px", padding: "clamp(24px,4vw,44px)"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>Next project</p>
    <p style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", margin: "10px 0 0"}}>Contlo / SuperAGI →</p>
  </button>
</div>
</sc-if>

<sc-if value="{v.isCont}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <button sc-camel-on-click="{v.goWork}" style={{cursor: "pointer", background: "none", border: "0", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>← Work</button>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "16px 0 0", maxWidth: "16ch"}}>Where the AI work started</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0", maxWidth: "62ch"}}>Marketing, growth and early product and UX work across the SuperAGI ecosystem during a period of rapid change, the point where marketing turned into designing for AI products. Automated outreach and lead-generation systems, programmatic SEO, sub-brand UI and UX, and the collateral that went with them.</p>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "16px", marginTop: "40px"}}>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <div style={{aspectRatio: "3/4", borderRadius: "16px", background: "#fff", border: "1px solid rgb(232,232,232)", position: "relative", overflow: "hidden", marginBottom: "20px"}}>
        <div style={{position: "absolute", left: "14%", right: "14%", top: "16%", height: "7px", background: "#1f1e1e", borderRadius: "99px"}}></div>
        <div style={{position: "absolute", left: "14%", right: "38%", top: "22%", height: "7px", background: "#1f1e1e", borderRadius: "99px"}}></div>
        <div style={{position: "absolute", left: "14%", right: "14%", top: "40%", bottom: "16%", border: "1px solid #e8e8e8", borderRadius: "8px"}}></div>
      </div>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>SuperAGI whitepaper</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Cover and internal sections. A long technical document needs a reading rhythm more than it needs illustration, hierarchy, section markers, and figures that survive being printed.</p>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <div style={{aspectRatio: "3/4", borderRadius: "16px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "16px", marginBottom: "20px"}}>
        <div style={{borderRadius: "10px", background: "#1f1e1e"}}></div>
        <div style={{borderRadius: "10px", background: "#a4a4a5"}}></div>
        <div style={{borderRadius: "10px", background: "#d4d4d4"}}></div>
        <div style={{borderRadius: "10px", background: "#5e636e"}}></div>
      </div>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Blog visuals and thumbnails</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A repeatable thumbnail system produced on WordPress, so posts stayed recognisable as a set without a designer touching every one.</p>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <div style={{aspectRatio: "3/4", borderRadius: "16px", background: "#1f1e1e", display: "grid", placeItems: "center", marginBottom: "20px"}}>
        <span style={{width: "42%", aspectRatio: "1", border: "2px solid #fff", borderRadius: "999px", display: "block"}}></span>
      </div>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Brand and marketing</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Early-stage brand work across Contlo and Verk, at the stage where the brand is still being argued about rather than applied.</p>
    </div>
  </div>

  <div style={{maxWidth: "760px", margin: "clamp(56px,9vw,80px) auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Why it matters</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>This is where marketing design became product thinking. Explaining an AI system to people who have not used one is the same problem I have been solving ever since, just with fewer screens and more paper.</p>
  </div>

  <button sc-camel-on-click="{v.goEntelligence}" style={{width: "100%", marginTop: "clamp(48px,8vw,64px)", cursor: "pointer", textAlign: "left", background: "#1f1e1e", color: "#fff", border: "0", borderRadius: "24px", padding: "clamp(24px,4vw,44px)"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>Back to the flagship</p>
    <p style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", margin: "10px 0 0"}}>Entelligence AI →</p>
  </button>
</div>
</sc-if>

<sc-if value="{v.isMotion}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Films that make software make sense</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>Direction, design and animation, and usually the page it ends up on</p>

  <div style={{marginTop: "44px", display: "grid", gap: "16px"}}>
    <button sc-camel-on-click="{v.goMotionDetail}" sc-camel-on-mouse-move="{v.onFrameMove}" sc-camel-on-mouse-leave="{v.onFrameLeave}" data-label="Open" style={{cursor: "none", border: "0", background: "#f2f2f4", borderRadius: "24px", padding: "clamp(24px,4vw,44px)", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center"}}>
      <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,#5e636e,#1f1e1e)"}}>
        <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,.3)"}}></div>
        <div style={{position: "absolute", inset: "32%", borderRadius: "999px", background: "radial-gradient(circle at 36% 32%,#fff,#8f8f8f 60%,#1f1e1e)"}}></div>
        <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,.8)", animation: "fRun 5s linear infinite"}}></div>
      </div>
      <div>
        <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>Agent Insights launch film</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 0"}}>Explaining what an agent actually reads before it comments on your pull request.</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "14px 0 0"}}>Entelligence · 2025 · Direction, design, animation</p>
      </div>
    </button>

    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))", gap: "16px"}}>
      <button sc-camel-on-click="{v.goMotionDetail}" sc-camel-on-mouse-move="{v.onFrameMove}" sc-camel-on-mouse-leave="{v.onFrameLeave}" data-label="Open" style={{cursor: "none", border: "0", background: "#f2f2f4", borderRadius: "24px", padding: "24px", textAlign: "left"}}>
        <div style={{aspectRatio: "16/10", borderRadius: "16px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "grid", placeItems: "center", fontSize: "26px", fontWeight: "600", lineHeight: "130%"}}>2025 Wrapped</div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "16px 0 0"}}>Entelligence Wrapped</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · 2025</p>
      </button>
      <button sc-camel-on-click="{v.goMotionDetail}" sc-camel-on-mouse-move="{v.onFrameMove}" sc-camel-on-mouse-leave="{v.onFrameLeave}" data-label="Open" style={{cursor: "none", border: "0", background: "#f2f2f4", borderRadius: "24px", padding: "24px", textAlign: "left"}}>
        <div style={{aspectRatio: "16/10", borderRadius: "16px", overflow: "hidden", background: "linear-gradient(180deg,#a4a4a5,#1f1e1e)", position: "relative"}}>
          <div style={{position: "absolute", left: "0", right: "0", bottom: "0", height: "58%", display: "flex", alignItems: "flex-end", gap: "8px", padding: "18px"}}>
            <div style={{flex: "1", height: "30%", background: "rgba(255,255,255,.8)", borderRadius: "3px"}}></div>
            <div style={{flex: "1", height: "62%", background: "rgba(255,255,255,.6)", borderRadius: "3px"}}></div>
            <div style={{flex: "1", height: "88%", background: "#fff", borderRadius: "3px"}}></div>
            <div style={{flex: "1", height: "44%", background: "rgba(255,255,255,.45)", borderRadius: "3px"}}></div>
          </div>
        </div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "16px 0 0"}}>SWE-Kit launch film</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Composio · 2024</p>
      </button>
      <button sc-camel-on-click="{v.goMotionDetail}" sc-camel-on-mouse-move="{v.onFrameMove}" sc-camel-on-mouse-leave="{v.onFrameLeave}" data-label="Open" style={{cursor: "none", border: "0", background: "#f2f2f4", borderRadius: "24px", padding: "24px", textAlign: "left"}}>
        <div style={{aspectRatio: "16/10", borderRadius: "16px", overflow: "hidden", background: "#1f1e1e", position: "relative"}}>
          <div style={{position: "absolute", inset: "0", backgroundImage: "radial-gradient(rgba(255,255,255,.34) 1px,transparent 1px)", backgroundSize: "16px 16px"}}></div>
          <div style={{position: "absolute", left: "50%", top: "50%", width: "40%", height: "70%", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "conic-gradient(from 180deg,#fff,#5e636e,#fff)", animation: "fSpin 18s linear infinite"}}></div>
        </div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "16px 0 0"}}>MCP launch creative</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Composio · 2025</p>
      </button>
    </div>
  </div>
</div>
</sc-if>

<sc-if value="{v.isMotionDetail}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <button sc-camel-on-click="{v.goMotion}" style={{cursor: "pointer", background: "none", border: "0", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>← Motion</button>
  <h1 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "16px 0 0", maxWidth: "18ch"}}>Agent Insights launch film</h1>

  <div style={{marginTop: "32px", position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,#5e636e,#1f1e1e)"}}>
    <div style={{position: "absolute", inset: "18%", borderRadius: "999px", border: "1px solid rgba(255,255,255,.28)"}}></div>
    <div style={{position: "absolute", inset: "30%", borderRadius: "999px", background: "radial-gradient(circle at 36% 30%,#fff,#8f8f8f 58%,#1f1e1e)"}}></div>
    <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,.85)", animation: "fRun 6s linear infinite"}}></div>
  </div>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(150px,100%),1fr))", gap: "16px", marginTop: "16px"}}>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Client</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Entelligence AI</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Role</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Direction, design, animation</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Year</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>2025</p></div>
    <div style={{borderRadius: "16px", background: "#f2f2f4", padding: "20px"}}><p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Type</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", margin: "6px 0 0"}}>Product launch film</p></div>
  </div>

  <div style={{maxWidth: "760px", margin: "72px auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>01 · Why it exists</p>
    <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>Developers do not trust a review bot that cannot show its reasoning.</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "16px 0 0"}}>The film makes the invisible input visible (incident history, past pull requests, production signals) before it shows a single output.</p>
  </div>

  <div style={{marginTop: "72px"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>02 · Storyboard</p>
    <div style={{display: "flex", gap: "12px", overflowX: "auto", padding: "16px 0 8px"}}>
      <div style={{flex: "none", width: "220px", aspectRatio: "16/10", borderRadius: "16px", background: "#1f1e1e", position: "relative"}}><div style={{position: "absolute", inset: "26%", border: "1px solid rgba(255,255,255,.4)", borderRadius: "6px"}}></div></div>
      <div style={{flex: "none", width: "220px", aspectRatio: "16/10", borderRadius: "16px", background: "#1f1e1e", position: "relative"}}><div style={{position: "absolute", left: "18%", right: "18%", top: "46%", height: "2px", background: "#fff"}}></div></div>
      <div style={{flex: "none", width: "220px", aspectRatio: "16/10", borderRadius: "16px", background: "#5e636e", position: "relative"}}><div style={{position: "absolute", inset: "24%", borderRadius: "999px", background: "rgba(255,255,255,.5)"}}></div></div>
      <div style={{flex: "none", width: "220px", aspectRatio: "16/10", borderRadius: "16px", background: "linear-gradient(120deg,#fff,#1f1e1e)"}}></div>
      <div style={{flex: "none", width: "220px", aspectRatio: "16/10", borderRadius: "16px", background: "#f2f2f4", display: "grid", placeItems: "center", fontSize: "16px", fontWeight: "500"}}>Final</div>
    </div>
  </div>

  <div style={{marginTop: "72px"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>03 · Styleframes</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: "16px", marginTop: "16px"}}>
      <div style={{aspectRatio: "4/3", borderRadius: "24px", background: "linear-gradient(180deg,#a4a4a5,#1f1e1e)"}}></div>
      <div style={{aspectRatio: "4/3", borderRadius: "24px", background: "#f2f2f4", position: "relative", overflow: "hidden"}}><div style={{position: "absolute", inset: "18%", border: "1px solid #1f1e1e", borderRadius: "999px"}}></div></div>
      <div style={{aspectRatio: "4/3", borderRadius: "24px", background: "#1f1e1e", position: "relative", overflow: "hidden"}}><div style={{position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(255,255,255,.16) 1px,transparent 1px)", backgroundSize: "100% 12px"}}></div></div>
    </div>
  </div>

  <div style={{maxWidth: "760px", margin: "72px auto 0"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>04 · Timing</p>
    <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "12px 0 0"}}>Every transition is a cut, not a dissolve. The pace was set against how long a developer will watch before scrolling away, the product appears before anyone has to be patient.</p>
  </div>

  <button sc-camel-on-click="{v.goEntelligence}" style={{width: "100%", marginTop: "clamp(48px,8vw,64px)", cursor: "pointer", textAlign: "left", background: "#1f1e1e", color: "#fff", border: "0", borderRadius: "24px", padding: "clamp(24px,4vw,44px)"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>The product story behind it</p>
    <p style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", margin: "10px 0 0"}}>Entelligence AI →</p>
  </button>
</div>
</sc-if>

<sc-if value="{v.isLab}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Things I built on my own</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>Personal projects, free tools and open-source work. Nobody asked for any of it, some of it has real users anyway</p>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "16px", marginTop: "44px"}}>
    <div style={{borderRadius: "24px", background: "#1f1e1e", color: "#fff", padding: "32px", gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "32px", alignItems: "center"}}>
      <div>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>Product · live with real academies</p>
        <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>Theta Academy</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "10px 0 0", maxWidth: "54ch"}}>A multi-tenant SaaS for running cricket academies in India, branches, coaches, student rosters, attendance, fees and receipts, with audit logging and role-based access. Designed, built and operated by one person, which is the whole point of the lab.</p>
        <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px"}}>
          <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Next.js</span>
          <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>PostgreSQL</span>
          <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>NextAuth</span>
          <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Multi-tenant</span>
        </div>
      </div>
      <div style={{borderRadius: "16px", background: "#000", aspectRatio: "4/3", padding: "22px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><span style={{height: "10px", width: "38%", background: "#fff", borderRadius: "99px", display: "block"}}></span><span style={{height: "22px", width: "64px", background: "rgba(255,255,255,.14)", borderRadius: "99px", display: "block"}}></span></div>
        <div style={{display: "flex", gap: "10px"}}><div style={{flex: "1", height: "64px", borderRadius: "12px", background: "rgba(255,255,255,.1)"}}></div><div style={{flex: "1", height: "64px", borderRadius: "12px", background: "rgba(255,255,255,.1)"}}></div><div style={{flex: "1", height: "64px", borderRadius: "12px", background: "rgba(255,255,255,.1)"}}></div></div>
        <div style={{height: "8px", width: "82%", background: "rgba(255,255,255,.2)", borderRadius: "99px"}}></div>
        <div style={{height: "8px", width: "64%", background: "rgba(255,255,255,.2)", borderRadius: "99px"}}></div>
        <div style={{height: "8px", width: "72%", background: "rgba(255,255,255,.2)", borderRadius: "99px"}}></div>
      </div>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Product · running</p>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>MessagebotWP</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A WhatsApp automation platform with real users and real ops decisions, the purest design-engineer proof: nobody asked, I built it, it runs.</p>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px"}}>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Next.js</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Supabase</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Prisma</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Baileys</span>
      </div>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Open source · free</p>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>AI Onboard</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A Claude-powered onboarding interview that turns a short conversation into a personalised engagement persona for Twitter. Take it, fork it, change the questions.</p>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px"}}>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Claude</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Next.js</span>
      </div>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Open source · free</p>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>This portfolio</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>nesar.build is itself a design-engineering piece, Next.js, typed MDX content, motion tokens, and Astra wired into the contact flow. The repo is public.</p>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px"}}>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Next.js</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Tailwind</span>
        <span style={{background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>PostHog</span>
      </div>
    </div>

    <div style={{borderRadius: "24px", border: "1.5px dashed #e8e8e8", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Agent · live on this site</p>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Astra</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>My assistant and the front door to this site. Astra asks who you are, answers questions about my work from a curated knowledge file, filters out vendor pitches, and only passes real conversations to my inbox.</p>
      <button sc-camel-on-click="{v.goContact}" style={{marginTop: "18px", cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Talk to Astra</button>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "32px", gridColumn: "1 / -1"}}>
      <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Free tools · run right here</p>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>Two small things for other designers</p>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Easing inspector</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 20px"}}>Drag the handles. The dot runs on the curve you make.</p>
      <div style={{display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center"}}>
        <svg ref={v.easeRef} sc-camel-on-pointer-down="{v.easeDown}" sc-camel-on-pointer-move="{v.easeMove}" sc-camel-on-pointer-up="{v.easeUp}" sc-camel-on-pointer-leave="{v.easeUp}" sc-camel-view-box="0 0 200 200" style={{width: "200px", height: "200px", flex: "none", background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "16px", touchAction: "none", cursor: "crosshair"}}>
          <path d="M0 200 L200 0" stroke="#e8e8e8" strokeWidth="1" strokeDasharray="3 4"></path>
          <path d="{v.easePath}" fill="none" stroke="#1f1e1e" strokeWidth="2"></path>
          <line x1="0" y1="200" x2="{v.h1x}" y2="{v.h1y}" stroke="#d4d4d4" strokeWidth="1"></line>
          <line x1="200" y1="0" x2="{v.h2x}" y2="{v.h2y}" stroke="#d4d4d4" strokeWidth="1"></line>
          <circle cx="{v.h1x}" cy="{v.h1y}" r="7" fill="#1f1e1e"></circle>
          <circle cx="{v.h2x}" cy="{v.h2y}" r="7" fill="#fff" stroke="#1f1e1e" strokeWidth="2"></circle>
        </svg>
        <div style={{flex: "1", minWidth: "180px"}}>
          <div style={{position: "relative", height: "40px", borderRadius: "999px", background: "#fff", border: "1px solid rgb(232,232,232)", overflow: "hidden"}}>
            <div style={{position: "absolute", top: "50%", width: "20px", height: "20px", marginTop: "-10px", marginLeft: "-10px", borderRadius: "999px", background: "#1f1e1e", animation: "fRun 1.8s infinite", animationTimingFunction: v.easeCss}}></div>
          </div>
          <p style={{margin: "14px 0 0", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", wordBreak: "break-all"}}>{v.easeCss}</p>
        </div>
      </div>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>ASCII resolver</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 20px"}}>Move your pointer across the field. Still frames becoming motion, the cheapest way possible.</p>
      <pre ref={v.asciiRef} sc-camel-on-mouse-move="{v.asciiMove}" style={{margin: "0", fontFamily: "ui-monospace,SFMono-Regular,monospace", fontSize: "10px", lineHeight: "1.05", letterSpacing: "0", color: "#1f1e1e", background: "#fff", border: "1px solid rgb(232,232,232)", borderRadius: "16px", padding: "18px", overflow: "hidden", cursor: "crosshair", whiteSpace: "pre", minHeight: "204px"}}></pre>
    </div>

    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Cut transition</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 20px"}}>You have been using it since you opened the site. Every page change is an edit point, not a fade.</p>
      <button sc-camel-on-click="{v.goHome}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Trigger a cut</button>
    </div>

  </div>
</div>
</sc-if>

<sc-if value="{v.isAbout}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0 auto", textAlign: "center", maxWidth: "20ch"}}>Mechanical engineer. Marketer. Designer. Then I stopped waiting for someone else to build it.</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "52ch"}}>The short version of how a diploma in machines ended up shipping motion and code for AI companies in Bengaluru</p>

  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "40px", alignItems: "stretch"}}>
    <div style={{borderRadius: "24px", background: "#f2f2f4", position: "relative", overflow: "hidden", minHeight: "380px"}}>
      <div style={{position: "absolute", left: "50%", top: "18%", width: "48%", aspectRatio: "1", transform: "translateX(-50%)", borderRadius: "999px", background: "radial-gradient(circle at 38% 32%,#fff,#5e636e 62%,#1f1e1e)"}}></div>
      <div style={{position: "absolute", left: "18%", right: "18%", top: "56%", bottom: "0", borderRadius: "44px 44px 0 0", background: "#1f1e1e"}}></div>
      <p style={{position: "absolute", left: "20px", bottom: "16px", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Portrait · AI-generated character goes here</p>
    </div>
    <div style={{borderRadius: "24px", background: "#1f1e1e", color: "#fff", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px"}}>
      <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>I care less about whether a screen looks pretty and more about whether the thing works for the person using it.</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>That sentence sounds obvious until the product is AI and the user is a developer with forty tabs open and no patience. Then it becomes the whole job.</p>
    </div>
  </div>

  <div style={{marginTop: "clamp(48px,8vw,64px)"}}>
    <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>How I got here, in four wrong turns</h2>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>01 · Machines</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>A diploma in mechanical engineering</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Where I learned that a drawing is a promise about how something will behave. I still design that way. Nothing goes on a page unless I know what it does.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>02 · Marketing</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Three years of SEO, content and campaigns</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Versatile Digi, then UIPEP. The first time a stranger's behaviour on a page was my problem. Also where the WordPress, Blender and Photoshop habits started, mostly out of impatience with waiting for someone else.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>03 · Design</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>Only designer, twice, at AI companies</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A few months at Contlo, a year at Composio through a $25M Series A, then founding designer at Entelligence AI. Being the only one means you learn triage fast and stop waiting for permission.</p>
      </div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>04 · Building</p>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>I stopped handing things off</p>
        <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Landing pages in code, motion frame by frame, agents that do real work, a SaaS running for real academies. The site you are reading is one of them. So is Astra.</p>
      </div>
    </div>
  </div>

  <div style={{marginTop: "clamp(48px,8vw,64px)"}}>
    <h2 style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Things I will argue about</h2>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))", gap: "16px", marginTop: "32px"}}>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Milliseconds are a design decision</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>If the easing is wrong, the screen is wrong. I will not write it in a spec and hope.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Ship, then refine</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>A live imperfect thing teaches more than a perfect file nobody has used.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Works beats pretty</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Beautiful is what correct looks like when you are done. It is not a substitute.</p></div>
      <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,4.5vw,28px)"}}><p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Say the real thing early</p><p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "8px 0 0"}}>Politeness theatre costs weeks. Direct feedback costs a minute of awkwardness.</p></div>
    </div>
  </div>

  <div style={{marginTop: "clamp(48px,8vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px"}}>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Off the clock</p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "10px 0 0"}}>Bengaluru. Cricket, both watching it and building software for the academies that teach it. A blog that has been quietly running since 2021. 3D experiments that occasionally escape into client work.</p>
    </div>
    <div style={{borderRadius: "24px", background: "#f2f2f4", padding: "clamp(20px,5vw,32px)"}}>
      <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>The timeline, for the record</p>
      <div style={{marginTop: "14px", display: "grid", gap: "10px"}}>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Founding designer · Entelligence AI</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>May 2025 to present</span></div>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Designer · Composio</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Jul 2024 to Apr 2025</span></div>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Marketing generalist · Contlo / SuperAGI</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Mar 2024 to Jun 2024</span></div>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Digital marketing · UIPEP Technologies</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Oct 2021 to Jan 2024</span></div>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Digital marketing · Versatile Digi</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>May 2021 to Oct 2021</span></div>
        <div style={{display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap"}}><span style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%"}}>Blogger · self-employed</span><span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>Jun 2021 to present</span></div>
      </div>
    </div>
  </div>

  <button sc-camel-on-click="{v.goContact}" style={{width: "100%", marginTop: "clamp(48px,8vw,64px)", cursor: "pointer", textAlign: "left", background: "#1f1e1e", color: "#fff", border: "0", borderRadius: "24px", padding: "clamp(24px,4vw,44px)"}}>
    <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(255,255,255,.4)", margin: "0"}}>Want the long version?</p>
    <p style={{fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", margin: "10px 0 0"}}>Ask Astra →</p>
  </button>
</div>
</sc-if>

<sc-if value="{v.isContact}" hint-placeholder-val="{v.true}">
<div data-page-root="true" style={{maxWidth: "840px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
  <h1 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>Talk to Astra first</h1>
  <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "16px auto 0", maxWidth: "50ch"}}>Astra is my assistant. She gets you to the right place in a couple of messages, books a call if you want one, and passes the real conversations to me.</p>

  <div style={{marginTop: "36px", borderRadius: "24px", background: "#f2f2f4", overflow: "hidden"}}>
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", padding: "18px clamp(16px,4vw,24px)", borderBottom: "1px solid rgba(0,0,0,.06)"}}>
      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
        <span style={{width: "36px", height: "36px", borderRadius: "12px", background: "#1f1e1e", display: "grid", placeItems: "center"}}><span style={{width: "12px", height: "12px", border: "2px solid #fff", borderRadius: "999px", display: "block"}}></span></span>
        <div>
          <p style={{fontSize: "16px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Astra</p>
          <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "0"}}>Nesar’s assistant · online</p>
        </div>
      </div>
      <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
        <span style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)"}}>{v.chatStep}</span>
        <button sc-camel-on-click="{v.share}" style={{cursor: "pointer", borderRadius: "12px", padding: "8px 12px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", border: "1px solid rgb(232,232,232)", background: "#fff", color: "#1f1e1e"}}>{v.shareLabel}</button>
        <button sc-camel-on-click="{v.resetChat}" style={{cursor: "pointer", borderRadius: "12px", padding: "8px 12px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", border: "1px solid rgb(232,232,232)", background: "#fff", color: "#1f1e1e"}}>Start over</button>
      </div>
    </div>

    <div ref={v.chatRef} style={{padding: "clamp(16px,4vw,24px)", display: "flex", flexDirection: "column", gap: "10px", minHeight: "340px", maxHeight: "min(460px,55vh)", overflow: "auto"}}>
      <sc-if value="{v.showStarter}" hint-placeholder-val="{v.false}">
        <div style={{margin: "auto 0", textAlign: "center", padding: "24px 8px"}}>
          <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Astra, Nesar's assistant.</p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "6px auto 0", maxWidth: "40ch"}}>Pick what you're here for, or just type. Two messages and you're usually done.</p>
        </div>
      </sc-if>
      <sc-for list="{v.chat}" as="m" hint-placeholder-count="0">
        <div style={{maxWidth: "86%", padding: "12px 16px", borderRadius: "16px", fontSize: "16px", fontWeight: "500", lineHeight: "140%", whiteSpace: "pre-wrap", animation: "fUp 500ms cubic-bezier(.16,1,.3,1) both", alignSelf: v.m.align, background: v.m.bg, color: v.m.fg, border: v.m.border}}>{v.m.text}</div>
      </sc-for>
      <sc-if value="{v.typing}" hint-placeholder-val="{v.false}">
        <div style={{alignSelf: "flex-start", padding: "12px 16px", borderRadius: "16px", background: "#fff", border: "1px solid rgb(232,232,232)", display: "flex", gap: "5px", alignItems: "center", height: "44px"}}>
          <span style={{width: "6px", height: "6px", borderRadius: "999px", background: "#1f1e1e", opacity: ".3"}}></span>
          <span style={{width: "6px", height: "6px", borderRadius: "999px", background: "#1f1e1e", opacity: ".55"}}></span>
          <span style={{width: "6px", height: "6px", borderRadius: "999px", background: "#1f1e1e"}}></span>
        </div>
      </sc-if>
    </div>

    <sc-if value="{v.showQuick}" hint-placeholder-val="{v.false}">
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap", padding: "0 clamp(16px,4vw,24px) 16px"}}>
        <sc-for list="{v.quick}" as="q" hint-placeholder-count="0">
          <button sc-camel-on-click="{v.onQuick}" data-q="{v.q.id}" style={{cursor: "pointer", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", border: "1px solid rgb(232,232,232)", background: "#fff", color: "#1f1e1e"}}>{v.q.label}</button>
        </sc-for>
      </div>
    </sc-if>

    <div style={{display: "flex", gap: "10px", padding: "16px clamp(16px,4vw,24px) clamp(16px,4vw,24px)", borderTop: "1px solid rgba(0,0,0,.06)"}}>
      <input value="{v.draft}" sc-camel-on-change="{v.onDraft}" sc-camel-on-key-down="{v.onKey}" placeholder="{v.placeholder}" style={{flex: "1", border: "1px solid rgb(232,232,232)", background: "#fff", borderRadius: "16px", padding: "14px 18px", fontSize: "16px", fontWeight: "500", color: "#1f1e1e", outline: "none", minWidth: "0"}} style-focus="border-color:#1f1e1e" />
      <button sc-camel-on-click="{v.send}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%", flex: "none"}}>Send</button>
    </div>
  </div>

  <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", textAlign: "center", margin: "18px auto 0", maxWidth: "56ch"}}>Astra answers from a knowledge file I wrote and saves the conversation so I can pick it up where you left off. Vendor pitches stop with her. Prefer email? hello@nesar.build works too.</p>
</div>
</sc-if>

</main>

<footer style={{maxWidth: "1200px", margin: "96px auto 0", padding: "0 24px 48px"}}>
  <div style={{display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center"}}>
    <a href="https://www.linkedin.com/in/nesar24/" target="_blank" rel="noopener" style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%"}}>LinkedIn</a>
    <a href="mailto:hello@nesar.build" style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%"}}>Email</a>
    <button sc-camel-on-click="{v.share}" style={{border: "0", background: "none", cursor: "pointer", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%"}}>{v.shareLabel}</button>
    <button sc-camel-on-click="{v.goWork}" style={{border: "0", background: "none", cursor: "pointer", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%"}}>Work</button>
    <button sc-camel-on-click="{v.goMotion}" style={{border: "0", background: "none", cursor: "pointer", padding: "0", fontSize: "14px", fontWeight: "500", lineHeight: "140%"}}>Motion</button>
  </div>
  <div style={{height: "1px", background: "rgba(0,0,0,.1)", margin: "20px 0"}}></div>
  <div style={{display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap"}}>
    <p style={{fontSize: "12px", fontWeight: "400", lineHeight: "140%", opacity: ".4", margin: "0"}}>Nesar B · Bengaluru, India</p>
    <p style={{fontSize: "12px", fontWeight: "400", lineHeight: "140%", opacity: ".4", margin: "0"}}>All rights reserved</p>
  </div>
  <div style={{marginTop: "14px", display: "grid", gap: "6px"}}>
    <p style={{fontSize: "11px", fontWeight: "400", lineHeight: "140%", opacity: ".4", margin: "0"}}>1. Work shown is design and motion work produced in-role; company brands belong to their owners.</p>
    <p style={{fontSize: "11px", fontWeight: "400", lineHeight: "140%", opacity: ".4", margin: "0"}}>2. Confidential material, internal product screens, fundraising slides and unpublished metrics, is deliberately left out.</p>
  </div>
</footer>

<div style={{position: "fixed", inset: "0", zIndex: "80", pointerEvents: "none", display: v.reelDisplay}}>
  <div sc-camel-on-click="{v.closeReel}" style={{position: "absolute", inset: "0", background: "rgba(0,0,0,.26)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", pointerEvents: "auto", animation: "fFade 220ms linear"}}></div>
  <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "min(900px,92vw)", pointerEvents: "auto", animation: "fSheet 380ms cubic-bezier(.32,.72,0,1)", background: "rgb(252,252,252)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,.24)"}}>
    <div style={{aspectRatio: "16/9", background: "linear-gradient(180deg,#5e636e,#1f1e1e)", position: "relative", overflow: "hidden"}}>
      <div style={{position: "absolute", inset: "18%", borderRadius: "999px", border: "1px solid rgba(255,255,255,.28)"}}></div>
      <div style={{position: "absolute", inset: "30%", borderRadius: "999px", background: "radial-gradient(circle at 36% 30%,#fff,#8f8f8f 58%,#1f1e1e)"}}></div>
      <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,.85)", animation: "fRun 4s linear infinite"}}></div>
    </div>
    <div style={{padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap"}}>
      <div>
        <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0"}}>Reel · selected motion, 2024 to 2025</p>
        <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "rgba(0,0,0,.4)", margin: "4px 0 0"}}>Entelligence · Composio</p>
      </div>
      <button sc-camel-on-click="{v.closeReel}" style={{cursor: "pointer", background: "#1f1e1e", color: "#fff", border: "1px solid rgb(114,114,114)", borderRadius: "16px", padding: "14px 22px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>Close</button>
    </div>
  </div>
</div>

<div style={{position: "fixed", zIndex: "90", pointerEvents: "none", left: "0", top: "0", fontSize: "14px", fontWeight: "500", lineHeight: "120%", padding: "8px 14px", borderRadius: "12px", background: "#1f1e1e", color: "#fff", whiteSpace: "nowrap", display: v.cursorDisplay, transform: v.cursorPos}}>{v.cursorLabel}</div>

<div style={{position: "fixed", left: "0", right: "0", top: "-40px", height: "20px", zIndex: "100", pointerEvents: "none", willChange: "transform", background: "rgb(252,252,252)", boxShadow: "0 0 22px 14px rgba(252,252,252,.95)", transform: v.curtainY, transition: v.curtainTr, opacity: v.curtainOp}}></div>
</div>





</div>
    );
  }
}
