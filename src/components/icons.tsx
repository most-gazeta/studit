interface IconProps {
  className?: string;
  strokeWidth?: number;
}

function base(props: IconProps) {
  return {
    className: props.className ?? "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: props.strokeWidth ?? 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
}

export const IconLogo = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 7.5v6.2c0 1.5-1 2.3-2.3 2.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M15 7.5c1.6 0 2.5.9 2.5 2.4 0 1.9-2.5 1.7-2.5 3.6 0 1.5 1 2.5 2.6 2.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconPlay = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4.8v14.4c0 .8.9 1.3 1.6.9l11-7.2c.6-.4.6-1.4 0-1.8l-11-7.2c-.7-.4-1.6.1-1.6.9z" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 12.6l5 5L19.5 7" />
  </svg>
);

export const IconCheckCircle = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.2 12.4l2.6 2.6 5-5.4" />
  </svg>
);

export const IconX = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconXCircle = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
  </svg>
);

export const IconBulb = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.2 1.3 1.4 2.1h4.2c.2-.8.6-1.5 1.4-2.1A6 6 0 0 0 12 3z" />
  </svg>
);

export const IconWarn = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5l9.3 16a1 1 0 0 1-.9 1.5H3.6a1 1 0 0 1-.9-1.5l9.3-16a1 1 0 0 1 1.8 0z" />
    <path d="M12 9.5v4.5M12 17.4v.1" />
  </svg>
);

export const IconInfo = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.4v.1" />
  </svg>
);

export const IconBook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
  </svg>
);

export const IconCode = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
  </svg>
);

export const IconTerminal = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M7 9l3.5 3L7 15M13 15h4" />
  </svg>
);

export const IconTrophy = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 4h8v6a4 4 0 0 1-8 0V4z" />
    <path d="M8 5H4.5v1.5A3.5 3.5 0 0 0 8 10M16 5h3.5v1.5A3.5 3.5 0 0 1 16 10" />
    <path d="M12 14v3.5M8.5 21h7M10 17.5h4v3.5h-4z" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16M13.5 5.5L20 12l-6.5 6.5" />
  </svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 12H4M10.5 5.5L4 12l6.5 6.5" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6.5h16M4 12h16M4 17.5h10" />
  </svg>
);

export const IconReset = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 5v5h5" />
    <path d="M4.9 10A8 8 0 1 1 4 14" />
  </svg>
);

export const IconEye = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconCopy = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 3h9A1.5 1.5 0 0 1 14.5 4.5V5" />
  </svg>
);

export const IconZap = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
);

export const IconFlag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 21V4" />
    <path d="M5.5 4.5c4-2.2 7 2 12.5 0v9c-5.5 2-8.5-2.2-12.5 0" />
  </svg>
);

export const IconLayers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l9 4.8-9 4.8-9-4.8L12 3z" />
    <path d="M3.6 12.5L12 17l8.4-4.5M3.6 16.5L12 21l8.4-4.5" />
  </svg>
);

export const IconRocket = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 15.5c5.5-4 7-8.5 7-12-3.5 0-8 1.5-12 7" />
    <path d="M7 10.5L3.5 12l3 1.5M13.5 17l1.5 3.5 1.5-3" />
    <path d="M9.5 14.5l-4 4M12 15.5L8.5 12" />
    <circle cx="14.5" cy="9.5" r="1.6" />
  </svg>
);

export const IconChevron = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconHome = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11l8-7 8 7v9.5a1 1 0 0 1-1 1h-4.5V15h-5v6.5H5a1 1 0 0 1-1-1V11z" />
  </svg>
);

export const IconTarget = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" />
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M2.5 20c1-3.2 3.4-5 6.5-5s5.5 1.8 6.5 5" />
    <path d="M15.5 5.4a3.5 3.5 0 0 1 0 6.2M17.5 15.4c2 .7 3.4 2.3 4 4.6" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.5l7.5 3v6c0 5-3.2 8.5-7.5 10-4.3-1.5-7.5-5-7.5-10v-6l7.5-3z" />
    <path d="M8.8 12l2.2 2.2 4.2-4.6" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H14" />
    <path d="M10 12h10M16.5 8.5L20 12l-3.5 3.5" />
  </svg>
);

export const IconDownload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5V15M7.5 10.5L12 15l4.5-4.5" />
    <path d="M4 16.5v2.5A1.5 1.5 0 0 0 5.5 20.5h13a1.5 1.5 0 0 0 1.5-1.5v-2.5" />
  </svg>
);

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L20.5 20.5" />
  </svg>
);

export const IconFlame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21.5c3.9 0 6.5-2.6 6.5-6.2 0-2.5-1.4-4.4-2.8-6C14.3 7.6 13 6 13 3.5c-3 1.6-4.3 4.2-4.1 6.6-.9-.3-1.6-1-1.9-2.2-1.3 1.4-2.5 3.4-2.5 5.4 0 3.6 2.6 6.2 6.5 6.2z" />
  </svg>
);

export const IconLock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14.5v2" />
  </svg>
);

export const IconCrown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 8l4 3.5L12 5l4.5 6.5L20.5 8l-1.8 10H5.3L3.5 8z" />
    <path d="M5.3 18h13.4" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16h16" />
    <path d="M8 16v-5M12.5 16V7M17 16v-8" />
  </svg>
);

export const IconKey = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="14.5" r="4.5" />
    <path d="M11.5 11.5L19.5 3.5M16 7l2.5 2.5M13.5 9.5L16 12" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

export const IconTrash = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6.5h16M9.5 6V4.5A1.5 1.5 0 0 1 11 3h2a1.5 1.5 0 0 1 1.5 1.5V6" />
    <path d="M6 6.5l.8 12A2 2 0 0 0 8.8 20.5h6.4a2 2 0 0 0 2-1.9l.8-12.1" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);
