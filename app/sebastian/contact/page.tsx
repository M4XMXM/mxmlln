import { contact } from "../data";

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h2
        className="mb-8 text-3xl"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Contact
      </h2>
      <p className="text-[15px] leading-relaxed text-neutral-700">
        {contact.intro}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
        <a
          href={contact.redux.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-black"
        >
          {contact.redux.label}
        </a>
        . Thank you!
      </p>
      <div className="mt-10 space-y-2 text-[15px]">
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="underline underline-offset-4 hover:text-black"
          >
            {contact.email}
          </a>
        </p>
        <p className="text-neutral-700">{contact.phone}</p>
      </div>
      <a
        href={`mailto:${contact.email}`}
        className="mt-10 inline-block border border-neutral-900 px-8 py-3 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-neutral-900 hover:text-white"
      >
        Send an email
      </a>
    </div>
  );
}
