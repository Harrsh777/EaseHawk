"use client";

import { FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/routes";

export type LandingFormConfig = {
  subjectPrefix: string;
  source: string;
  email?: string;
};

type LandingPageFormProps = {
  config: LandingFormConfig;
};

export function LandingPageForm({ config }: LandingPageFormProps) {
  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const body = [
      `Name: ${name}`,
      `Work email: ${data.get("email")}`,
      `Company: ${(data.get("company") || "-").toString()}`,
      "",
      "What they need:",
      data.get("message"),
      "",
      `Source: ${config.source}`,
    ].join("\n");

    const mailto = `mailto:${config.email ?? CONTACT_EMAIL}?subject=${encodeURIComponent(`${config.subjectPrefix}${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form id="lpForm" noValidate onSubmit={onSubmit}>
      <div className="fg2">
        <label className="f-field">
          <span>Full name *</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
          />
        </label>
        <label className="f-field">
          <span>Work email *</span>
          <input
            type="email"
            name="email"
            required
            placeholder="name@company.com"
          />
        </label>
      </div>
      <label className="f-field">
        <span>Company</span>
        <input type="text" name="company" placeholder="Organisation" />
      </label>
      <label className="f-field">
        <span>What do you need? *</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="A sentence or two is enough — we'll do the digging."
        />
      </label>
      <button
        className="cta"
        type="submit"
        style={{ marginTop: 20, width: "100%" }}
      >
        Send — a human replies in one business day
      </button>
      <p className="f-note">
        Opens in your email client, pre-addressed to the EaseHawk team.
      </p>
    </form>
  );
}
