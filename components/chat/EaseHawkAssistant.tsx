"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { brain, chipQueries } from "@/lib/chat-knowledge";

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (m) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[m] ?? m;
  });
}

export function EaseHawkAssistant() {
  const [open, setOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollMsgs = useCallback(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const addMessage = useCallback(
    (cls: string, html: string) => {
      const el = msgsRef.current;
      if (!el) return null;
      const div = document.createElement("div");
      div.className = `ehm ${cls}`;
      div.innerHTML = html;
      el.appendChild(div);
      scrollMsgs();
      return div;
    },
    [scrollMsgs],
  );

  const ask = useCallback(
    async (query: string, label?: string) => {
      if (busy || !query) return;
      setBusy(true);
      addMessage("user", escapeHtml(label ?? query));
      setChips([]);
      const typing = addMessage("bot typing", "<i></i><i></i><i></i>");
      const res = await brain(query);
      window.setTimeout(() => {
        typing?.remove();
        addMessage("bot", res.a);
        setChips(res.c ?? []);
        setBusy(false);
      }, 560);
    },
    [addMessage, busy],
  );

  const toggle = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next && !booted) {
        setBooted(true);
        addMessage(
          "bot",
          "Welcome — I'm the EaseHawk assistant, built the way we build assistants for clients (there's a bilingual EN/AR one of me running in production in Saudi Arabia). Ask me anything about the work — or press a chip.",
        );
        setChips([
          "What do you do?",
          "Show me proof",
          "Pricing",
          "Talk to a human",
        ]);
      }
      if (next) window.setTimeout(() => inputRef.current?.focus(), 350);
    },
    [addMessage, booted],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) toggle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  const submit = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    if (inputRef.current) inputRef.current.value = "";
    void ask(value);
  };

  return (
    <>
      <button
        id="ehChatBtn"
        type="button"
        aria-label="Ask EaseHawk"
        className={open ? "open" : undefined}
        onClick={() => toggle(!open)}
      >
        <svg viewBox="0 0 44 50" aria-hidden="true">
          <polygon
            points="22,3 40,13 40,37 22,47 4,37 4,13"
            fill="rgba(255,221,0,.09)"
            stroke="#FFDD00"
            strokeWidth="1.6"
          />
          <path
            d="M13 20h18M13 26h12"
            stroke="#FFDD00"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="31" cy="26" r="1.6" fill="#FFDD00" />
        </svg>
      </button>

      <div
        id="ehChat"
        role="dialog"
        aria-label="EaseHawk assistant"
        className={open ? "open" : undefined}
      >
        <div className="ehc-head">
          <span className="ehc-mark">
            <svg viewBox="0 0 44 50" aria-hidden="true">
              <polygon
                points="22,3 40,13 40,37 22,47 4,37 4,13"
                fill="rgba(255,221,0,.1)"
                stroke="#FFDD00"
                strokeWidth="1.6"
              />
              <path
                d="M13 20h18M13 26h12"
                stroke="#FFDD00"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <h4>EaseHawk Assistant</h4>
            <p>The kind we ship for clients</p>
          </div>
          <button
            id="ehClose"
            type="button"
            aria-label="Close"
            onClick={() => toggle(false)}
          >
            ✕
          </button>
        </div>

        <div id="ehMsgs" ref={msgsRef} />

        <div id="ehChips">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => void ask(chipQueries[chip] ?? chip, chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="ehc-in">
          <input
            id="ehInput"
            ref={inputRef}
            type="text"
            placeholder="Ask about our work, pricing, AI…"
            aria-label="Message"
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          <button id="ehSend" type="button" aria-label="Send" onClick={submit}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12l17-8-6 8 6 8-17-8z" fill="#0B0B10" />
            </svg>
          </button>
        </div>

        <div className="ehc-foot">
          Scripted assistant · a human replies to every enquiry within one
          business day
        </div>
      </div>
    </>
  );
}
