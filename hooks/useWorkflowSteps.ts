"use client";

import { useEffect } from "react";

export function useWorkflowSteps(trackId = "wfTrack", intervalMs = 1100) {
  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;

    const steps = track.querySelectorAll(".wf-step");
    if (!steps.length) return;

    let index = 0;
    const timer = window.setInterval(() => {
      steps.forEach((step, i) => {
        step.classList.toggle("lit", i === index);
      });
      index = (index + 1) % steps.length;
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [trackId, intervalMs]);
}
