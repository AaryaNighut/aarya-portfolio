"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeSnippet {
  name: string;
  language: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    name: "MediAI.py",
    language: "python",
    code: `from fastapi import FastAPI
from sklearn.ensemble import RandomForestClassifier
import numpy as np

app = FastAPI()
model = RandomForestClassifier(n_estimators=100)

@app.post("/api/v1/diagnose")
async def diagnose(symptoms: list[int]):
    # Predict health conditions with AI
    prediction = model.predict([symptoms])
    prob = model.predict_proba([symptoms])
    return {
        "status": "success",
        "result": prediction[0],
        "confidence": float(max(prob[0]))
    }`,
  },
  {
    name: "AlertExa.tsx",
    language: "typescript",
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AIProctor = () => {
  const [violations, setViolations] = useState(0);

  const detectTabSwitch = () => {
    setViolations(prev => prev + 1);
    triggerProctorAlert("Tab switch detected");
  };

  return (
    <motion.div className="glass-panel p-6 rounded-2xl">
      <h3 className="text-yellow-400 font-bold">AlertExa AI Proctor</h3>
      <p>Face Detection & Audio Monitor: Active</p>
    </motion.div>
  );
};`,
  },
  {
    name: "server.js",
    language: "javascript",
    code: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/api/bus/schedule', verifyToken, async (req, res) => {
  const { routeId, driverId, departureTime } = req.body;
  const schedule = await BusSchedule.create({
    route: routeId,
    driver: driverId,
    time: departureTime,
    status: 'Active'
  });
  return res.status(201).json(schedule);
});`,
  }
];

export default function CodingMockup() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = snippets[activeTab].code;
    let index = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      // Type multiple characters at a time for long snippets to keep it engaging
      const charsToType = fullText.substring(index, index + 3);
      setDisplayedText((prev) => prev + charsToType);
      index += 3;

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        
        // Wait 4 seconds after typing finishes, then switch tabs
        const timeout = setTimeout(() => {
          setActiveTab((prev) => (prev + 1) % snippets.length);
        }, 4000);
        
        return () => clearTimeout(timeout);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-sm text-slate-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#070a12]/90 border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs text-slate-500 font-semibold tracking-wider">AARYA_IDE</div>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex bg-[#070a12]/50 border-b border-white/[0.04] overflow-x-auto select-none scrollbar-none">
        {snippets.map((snippet, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx !== activeTab) {
                setActiveTab(idx);
              }
            }}
            className={`px-4 py-2 text-xs border-r border-white/[0.04] transition-all flex items-center gap-2 ${
              idx === activeTab
                ? "bg-[#0b0f19] text-yellow-400 border-t-2 border-t-yellow-500 font-medium"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                snippet.language === "python"
                  ? "bg-yellow-500"
                  : snippet.language === "typescript"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            />
            {snippet.name}
          </button>
        ))}
      </div>

      {/* Code Editor Area */}
      <div className="p-6 h-[260px] overflow-y-auto relative scrollbar-none">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-slate-600 text-right pr-4 select-none w-8 border-r border-white/[0.04]">
            {Array.from({ length: Math.max(12, displayedText.split("\n").length) }).map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>
          {/* Typed Code */}
          <pre className="pl-4 flex-1 whitespace-pre-wrap break-all leading-6 text-slate-300 overflow-x-auto selection:bg-yellow-500/20">
            <code className="block">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-1.5 h-4 bg-yellow-400 ml-0.5 align-middle"
              />
            </code>
          </pre>
        </div>
        {/* Glowing Ambient Light */}
        <div className="absolute right-4 bottom-4 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl pointer-events-none select-none" />
      </div>
    </div>
  );
}
