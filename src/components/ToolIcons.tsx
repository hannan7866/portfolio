import React from "react";

export function ReactIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120)" />
      <circle r="2" fill="#61DAFB" />
    </svg>
  );
}

export function NextjsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="currentColor">
      <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" data-framer-name="Base" fill="#ffffff" r="90" />
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="black" />
        <rect fill="black" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function NodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#68A063">
      <path d="M12 2l10 5.8v11.6L12 25.2l-10-5.8V7.8L12 2zm0 2.3L4.1 8.9v8.4L12 21.9l7.9-4.6V8.9L12 4.3z" />
    </svg>
  );
}

export function PythonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2l.01 2.2h4.8v.7H5.2S2 6.7 2 11.8s2.8 4.9 2.8 4.9h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.05 2.7-2.6V4.8S17 2 11.9 2z" fill="#3776AB" />
      <path d="M12.1 22c5 0 4.7-2.2 4.7-2.2l-.01-2.2H12v-.7h6.8s3.2.4 3.2-4.7-2.8-4.9-2.8-4.9h-1.7v2.4s.1 2.8-2.8 2.8H9.9s-2.7-.05-2.7 2.6v3.9s-.2 2.8 4.9 2.8z" fill="#FFD438" />
      <circle cx="9.2" cy="4.4" r=".7" fill="#fff" />
      <circle cx="14.8" cy="19.6" r=".7" fill="#fff" />
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 13.8c-.3.8-.9 1.5-1.7 1.9-.8.4-1.8.6-2.9.6-1.1 0-2-.2-2.7-.6-.7-.4-1.2-1-1.5-1.7l1.7-1c.2.5.5.9.9 1.1.4.3.9.4 1.6.4.6 0 1.1-.1 1.4-.4.4-.3.5-.6.5-1 0-.3-.1-.6-.3-.8-.2-.2-.5-.4-1-.5l-1.3-.4c-.9-.3-1.6-.7-2-1.2-.4-.5-.6-1.1-.6-1.9 0-.8.3-1.5.8-2.1.6-.6 1.4-.9 2.5-.9 1 0 1.8.2 2.5.7.7.4 1.1 1 1.3 1.7l-1.7.9c-.2-.4-.4-.7-.7-.9-.3-.2-.7-.3-1.3-.3-.5 0-.9.1-1.2.3-.3.2-.4.5-.4.8 0 .3.1.5.3.7.2.2.6.3 1.1.5l1.2.4c.9.3 1.6.7 2 1.2.5.5.7 1.2.7 2zM18.8 8.8h-3v8.5h-2.1V8.8h-3V7.2h8.1v1.6z" fill="#fff" />
    </svg>
  );
}

export function PostgresIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.5c-.7.7-1.7 1.1-2.8 1.1-1.4 0-2.6-.6-3.4-1.6l1.3-1.3c.5.7 1.3 1.1 2.1 1.1.7 0 1.3-.2 1.8-.7.4-.4.6-1 .6-1.6 0-.8-.4-1.4-1.5-1.9l-1.1-.5C10.7 10.3 10 9.2 10 8c0-1.1.4-2.1 1.2-2.8.8-.7 1.8-1.1 3-1.1 1.2 0 2.2.4 3 1.2l-1.3 1.3c-.5-.5-1.1-.8-1.7-.8-.6 0-1.1.2-1.5.6-.4.4-.6.9-.6 1.5 0 .7.4 1.3 1.4 1.7l1.1.5c1.8.8 2.5 1.9 2.5 3.2.1 1.2-.4 2.3-1.1 3.2z" fill="#336791" />
    </svg>
  );
}

export function MongoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 6 7.5 6 13.5C6 17.5 9 21.5 12 22C15 21.5 18 17.5 18 13.5C18 7.5 12 2 12 2Z" fill="#47A248" />
      <path d="M12 2V22C12.5 22 13 21.8 13.5 21.5C16 19.5 18 16.5 18 13.5C18 7.5 12 2 12 2Z" fill="#3FA037" />
    </svg>
  );
}

export function SupabaseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13.2 21.7L3.4 11.2C2.7 10.4 3.3 9.1 4.4 9.1H11.5V2.3C11.5 1.5 12.5 1.1 13.1 1.7L22.9 12.2C23.6 13 23 14.3 21.9 14.3H14.8V21.1C14.8 21.9 13.8 22.3 13.2 21.7Z" fill="#3ECF8E" />
    </svg>
  );
}

export function SqliteIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 4.2 2 7v10c0 2.8 4.5 5 10 5s10-2.2 10-5V7c0-2.8-4.5-5-10-5zm0 2c4.4 0 8 1.6 8 3s-3.6 3-8 3-8-1.6-8-3 3.6-3 8-3zm0 7c4.4 0 8 1.6 8 3s-3.6 3-8 3-8-1.6-8-3 3.6-3 8-3z" fill="#003B57" />
    </svg>
  );
}

export function FigmaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8 2h4v4H8a2 2 0 1 1 0-4z" fill="#F24E1E" />
      <path d="M12 2h4a2 2 0 1 1 0 4h-4V2z" fill="#FF7262" />
      <path d="M12 6h4a2 2 0 1 1 0 4h-4V6z" fill="#1ABCFE" />
      <path d="M8 6h4v4H8a2 2 0 1 1 0-4z" fill="#A259FF" />
      <path d="M8 10h4v4H8a2 2 0 1 1 0-4z" fill="#0ACF83" />
      <circle cx="14" cy="12" r="2" fill="#1ABCFE" />
      <path d="M8 14h4v2a2 2 0 1 1-4 0v-2z" fill="#0ACF83" />
    </svg>
  );
}

export function OpenAIIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FF1E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-3.16 19.49l.16-.9a9 9 0 0 1-4.83-4.83l.9-.16A10 10 0 0 0 12 22a10 10 0 0 0 3.16-19.49l-.16.9a9 9 0 0 1 4.83 4.83l-.9.16A10 10 0 0 0 12 2z"/>
      <circle cx="12" cy="12" r="3" fill="#FF1E56" fillOpacity="0.2" />
    </svg>
  );
}

export function GitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F05032">
      <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.4-.1 1.9.4.6.6.7 1.4.4 2.1l2.6 2.6c.7-.3 1.5-.2 2.1.4.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.7-1.5-.4-2.2L12.7 11v5.2c.2.1.4.3.5.5.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.3-.3.6-.5.9-.6V11c.3-.1.6-.3.9-.6l-2.6-2.6L2.4 13.1c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.7-.6.7-1.6.1-2.3z" />
    </svg>
  );
}

export function PostmanIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF6C37">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#38B2AC">
      <path d="M12 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.4.8.2 1.4.8 2 1.5C13.2 11.2 14.6 12 17 12c2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.4-.8-.2-1.4-.8-2-1.5C15.8 6.8 14.4 6 12 6zm-7 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.4.8.2 1.4.8 2 1.5C6.2 17.2 7.6 18 10 18c2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.4-.8-.2-1.4-.8-2-1.5C8.8 12.8 7.4 12 5 12z" />
    </svg>
  );
}

export function DockerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm6 0h2v2h-2zM2 13.5C2 17.1 4.9 20 8.5 20c4.1 0 7.8-2.6 9.5-6.5h4c-.3-1.5-1.5-2.5-3-2.5h-15C3 11 2 12.1 2 13.5z" />
    </svg>
  );
}

export function ReduxIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#764ABC">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zm3.5-4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zM7.5 12.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z" />
    </svg>
  );
}
