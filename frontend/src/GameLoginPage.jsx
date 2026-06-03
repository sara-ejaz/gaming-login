import { useState, useEffect } from "react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.5 + 0.1,
}));

const HexGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
        <polygon
          points="28,2 52,14 52,34 28,46 4,34 4,14"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.8"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

const ScanLine = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
    <div
      className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60"
      style={{
        animation: "scanline 4s linear infinite",
        top: "0%",
      }}
    />
  </div>
);

export default function GameLoginPage() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async() => {
    if (!useremail || !password) {
      setError("AUTHENTICATION FIELDS REQUIRED");
      return;
    }
    try{

      const responce = await fetch("http://localhost:5000/login",{
        method:"post",
        headers:{ 
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          email : useremail,
          password : password
        })
      });
      const data = await responce.json();
  
      console.log(data);

      setError("");
      setLoading(true);
      setTimeout(() => setLoading(false), 2500);
    }

    catch(err){
      console.log(err);
      setError("Server connection fails...")
    }

  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        @keyframes scanline {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 102%; opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes data-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 200%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(50% 0 20% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 1px); }
          80% { clip-path: inset(70% 0 5% 0); transform: translate(2px, -1px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes loader-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .glitch-text { position: relative; }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch-active::before {
          color: #ff003c;
          animation: glitch-1 0.2s linear;
          left: 2px;
        }
        .glitch-active::after {
          color: #00f0ff;
          animation: glitch-1 0.2s linear reverse;
          left: -2px;
        }
        .input-cyber {
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: #e0f7fa;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .input-cyber:focus {
          outline: none;
          border-color: rgba(0, 240, 255, 0.7);
          background: rgba(0, 240, 255, 0.06);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.04);
        }
        .input-cyber::placeholder { color: rgba(0, 240, 255, 0.25); font-family: 'Rajdhani', sans-serif; letter-spacing: 0.1em; }
        .btn-cyber {
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 240, 255, 0.05) 100%);
          border: 1px solid rgba(0, 240, 255, 0.5);
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-cyber::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-cyber:hover::before { opacity: 1; }
        .btn-cyber:hover {
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.9);
        }
        .btn-cyber:active { transform: scale(0.98); }
        .card-cyber {
          background: rgba(6, 12, 22, 0.85);
          border: 1px solid rgba(0, 240, 255, 0.15);
          box-shadow: 0 0 80px rgba(0, 240, 255, 0.05), 0 40px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0, 240, 255, 0.1);
        }
        .corner-decoration::before, .corner-decoration::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(0, 240, 255, 0.6);
          border-style: solid;
        }
        .corner-tl::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr::after { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .loading-bar-fill {
          animation: loader-bar 2.5s ease-in-out forwards;
        }
      `}</style>

      <div
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        style={{ background: "#020810", fontFamily: "'Rajdhani', sans-serif" }}
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 40, 80, 0.4) 0%, transparent 70%)"
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-64" style={{
            background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 100, 160, 0.15) 0%, transparent 70%)"
          }} />
          <HexGrid />
        </div>

        {/* Floating particles */}
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "#00f0ff",
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: "0 0 4px rgba(0, 240, 255, 0.8)",
            }}
          />
        ))}

        {/* Rotating rings - left side */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border border-cyan-500/10"
              style={{ animation: "spin-slow 20s linear infinite" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60" />
            </div>
            <div className="absolute inset-4 rounded-full border border-cyan-500/15"
              style={{ animation: "counter-spin 15s linear infinite" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
            </div>
            <div className="absolute inset-8 rounded-full border border-cyan-500/20"
              style={{ animation: "spin-slow 10s linear infinite" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/30" />
            </div>
          </div>
        </div>

        {/* Right decorative rings */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full border border-cyan-500/10"
              style={{ animation: "counter-spin 25s linear infinite" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
            </div>
            <div className="absolute inset-3 rounded-full border border-cyan-500/20"
              style={{ animation: "spin-slow 18s linear infinite" }} />
          </div>
        </div>

        {/* Main card */}
        <div
          className="relative w-full max-w-md mx-4 rounded-2xl card-cyber corner-decoration corner-tl corner-tr overflow-hidden"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <ScanLine />

          {/* Top accent bar */}
          <div className="h-px w-full" style={{
            background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)"
          }} />

          {/* Header section */}
          <div className="px-8 pt-8 pb-6 text-center relative">
            {/* Logo mark */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute w-16 h-16 rounded-full border border-cyan-500/30"
                style={{ animation: "spin-slow 8s linear infinite" }} />
              <div className="absolute w-12 h-12 rounded-full border border-cyan-500/20"
                style={{ animation: "counter-spin 6s linear infinite" }} />
              <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                  <polygon points="20,2 38,12 38,28 20,38 2,28 2,12"
                    stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.06)" />
                  <polygon points="20,8 32,15 32,25 20,32 8,25 8,15"
                    stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />
                  <circle cx="20" cy="20" r="4" fill="rgba(0,240,255,0.3)" stroke="#00f0ff" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div
              className={`font-orbitron text-2xl font-black tracking-widest glitch-text ${glitch ? "glitch-active" : ""}`}
              data-text="NEXUS PROTOCOL"
              style={{ color: "#00f0ff", textShadow: "0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2)" }}
            >
              NEXUS PROTOCOL
            </div>
            <div className="font-rajdhani text-xs tracking-[0.4em] mt-1"
              style={{ color: "rgba(0,240,255,0.35)" }}>
              SECURE AUTHENTICATION GATEWAY
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-green-400"
                  style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                <div className="relative w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="font-rajdhani text-xs tracking-widest" style={{ color: "rgba(74,222,128,0.7)" }}>
                SERVER ONLINE — SECTOR 7
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-8 h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.2), transparent)"
          }} />

          {/* Form */}
          <div className="px-8 py-6 space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="font-rajdhani text-xs tracking-widest uppercase"
                style={{ color: "rgba(0,240,255,0.5)" }}>
                {focused === "user" || useremail ? "▸ PLAYER ID" : "▸ PLAYER ID"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input-cyber w-full px-4 py-3 font-rajdhani text-sm tracking-wider"
                  placeholder="ENTER CALLSIGN..."
                  value={useremail}
                  onChange={e => setUseremail(e.target.value)}
                  onFocus={() => setFocused("user")}
                  onBlur={() => setFocused(null)}
                  style={{ fontSize: "14px", letterSpacing: "0.1em" }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="rgba(0,240,255,0.35)" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-rajdhani text-xs tracking-widest uppercase"
                style={{ color: "rgba(0,240,255,0.5)" }}>▸ ACCESS CODE</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input-cyber w-full px-4 py-3 pr-10 font-rajdhani text-sm tracking-wider"
                  placeholder="ENTER CIPHER KEY..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused("pass")}
                  onBlur={() => setFocused(null)}
                  style={{ fontSize: "14px", letterSpacing: "0.15em" }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="rgba(0,240,255,0.35)" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="rgba(0,240,255,0.35)" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded"
                style={{ background: "rgba(255,0,60,0.08)", border: "1px solid rgba(255,0,60,0.3)" }}>
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,80,100,0.9)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="font-rajdhani text-xs tracking-widest" style={{ color: "rgba(255,100,120,0.9)" }}>
                  {error}
                </span>
              </div>
            )}

            {/* Remember + Forgot row */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-4 h-4">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border peer-checked:bg-cyan-500/20 peer-checked:border-cyan-400/70 transition-all"
                    style={{ border: "1px solid rgba(0,240,255,0.25)", background: "transparent" }}>
                    <svg className="w-3 h-3 hidden peer-checked:block" viewBox="0 0 12 12" fill="#00f0ff">
                      <path d="M2 6l3 3 5-5" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                </div>
                <span className="font-rajdhani text-xs tracking-widest"
                  style={{ color: "rgba(0,240,255,0.35)" }}>PERSIST SESSION</span>
              </label>
              <button className="font-rajdhani text-xs tracking-widest transition-all hover:opacity-100"
                style={{ color: "rgba(0,240,255,0.4)" }}>
                RECOVER ACCESS →
              </button>
            </div> */}

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn-cyber w-full py-3.5 mt-2 font-orbitron text-sm font-semibold tracking-widest relative"
              style={{
                color: loading ? "rgba(0,240,255,0.4)" : "#00f0ff",
                textShadow: loading ? "none" : "0 0 15px rgba(0,240,255,0.6)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-4 h-4" style={{ animation: "spin-slow 1s linear infinite" }}
                    viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                  AUTHENTICATING...
                </span>
              ) : "INITIALIZE CONNECTION"}
            </button>

            {/* Loader bar */}
            {loading && (
              <div className="h-0.5 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(0,240,255,0.1)" }}>
                <div className="h-full loading-bar-fill rounded-full"
                  style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.3), #00f0ff, rgba(0,240,255,0.3))" }} />
              </div>
            )}
          </div>

          {/* Bottom divider */}
          <div className="mx-8 h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent)"
          }} />

          {/* Footer */}
          <div className="px-8 py-5 space-y-3">
            <div className="text-center">
              <span className="font-rajdhani text-xs tracking-wider"
                style={{ color: "rgba(0,240,255,0.3)" }}>
                NO ACCOUNT? &nbsp;
              </span>
              <button className="font-rajdhani text-xs tracking-wider font-semibold transition-all hover:opacity-100"
                style={{ color: "rgba(0,240,255,0.6)", textShadow: "0 0 10px rgba(0,240,255,0.3)" }}>
                REQUEST CLEARANCE →
              </button>
            </div>

            {/* OAuth options */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(0,240,255,0.08)" }} />
              <span className="font-rajdhani text-xs tracking-widest"
                style={{ color: "rgba(0,240,255,0.2)" }}>ALT PROTOCOL</span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,240,255,0.08)" }} />
            </div>

            <div className="flex gap-3">
              {[
                { label: "DISCORD", icon: "M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" },
                { label: "STEAM", icon: "M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" },
                { label: "EPIC", icon: "M11.996 0L0 6.24v11.52L11.996 24 24 17.76V6.24L11.996 0zm6.255 17.01H5.749L5.75 6.99h2.501v7.52h1.502V8.492h2.499v6.018h1.499V6.99h2.5v10.02z" },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 transition-all hover:opacity-80"
                  style={{
                    background: "rgba(0,240,255,0.03)",
                    border: "1px solid rgba(0,240,255,0.12)",
                    borderRadius: "4px",
                  }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="rgba(0,240,255,0.4)">
                    <path d={icon} />
                  </svg>
                  <span className="font-rajdhani text-xs tracking-widest"
                    style={{ color: "rgba(0,240,255,0.4)" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full" style={{
            background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)"
          }} />

          {/* Version tag */}
          <div className="px-8 py-2.5 flex justify-between items-center"
            style={{ background: "rgba(0,0,0,0.3)" }}>
            <span className="font-rajdhani text-xs tracking-widest"
              style={{ color: "rgba(0,240,255,0.15)" }}>v4.7.2-ALPHA</span>
            <span className="font-rajdhani text-xs tracking-widest"
              style={{ color: "rgba(0,240,255,0.15)" }}>
              <span style={{ animation: "blink 1.2s ease infinite", display: "inline-block" }}>█</span>
              &nbsp;SECURE LINK ACTIVE
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
