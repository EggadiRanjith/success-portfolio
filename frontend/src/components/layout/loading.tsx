"use client";

import React, { useEffect, useState } from "react";

let hasShown = false;

export function LoadingScreen() {
  const [visible, setVisible] = useState(() => !hasShown);

  useEffect(() => {
    if (hasShown) return; // already shown this session
    const min = setTimeout(() => {
      setVisible(false);
      hasShown = true;
    }, 800);
    return () => clearTimeout(min);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-pure-black text-pure-white">
      <div className="text-center animate-in fade-in duration-400">
        <div className="text-h2 font-bold mb-4">Your Name</div>
        <div className="w-64 h-2 bg-pure-white/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full w-0 bg-pure-white animate-[loader_0.8s_ease-out_forwards]"></div>
        </div>
        <div className="text-caption text-silver-gray mt-3">Loading…</div>
      </div>
      <style jsx>{`
        @keyframes loader {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
