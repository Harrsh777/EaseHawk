import { COMPANY_PROFILE_PATH } from "@/lib/routes";

export function ProfileFab() {
  return (
    <a
      className="profile-fab"
      href={COMPANY_PROFILE_PATH}
      download
      aria-label="Download Company Profile"
    >
      <span className="pf-ic">
        <svg viewBox="0 0 44 44" aria-hidden="true">
          <polygon
            points="22,3 39,12.5 39,31.5 22,41 5,31.5 5,12.5"
            fill="rgba(255,221,0,.08)"
            stroke="#FFDD00"
            strokeWidth="1.5"
          />
          <path
            d="M22 13v11M16.5 19.5L22 25l5.5-5.5M15 30h14"
            fill="none"
            stroke="#FFDD00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="pf-tx">Download Company Profile</span>
    </a>
  );
}
