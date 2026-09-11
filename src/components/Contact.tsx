import { AlertCircle, ChevronDown, Info, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact } from "../data/engage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type FormStatus = "idle" | "error" | "sending" | "sent" | "failed";

interface FormValues {
  name: string;
  email: string;
  organization: string;
  reason: string;
  message: string;
  /** Honeypot — bots fill it, humans never see it. */
  website: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  reason: "",
  message: "",
  website: "",
};

const inputClasses =
  "w-full rounded-xl border border-forest-900/15 bg-ivory px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 transition-all focus:border-clay-500 focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-500";

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      next.message = "Please tell us a little about your enquiry.";
    } else if (values.message.trim().length < 10) {
      next.message = "Please add a few more details so we can respond well.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    /* Honeypot filled → almost certainly a bot. Show success and drop it. */
    if (values.website.trim() !== "") {
      setStatus("sent");
      return;
    }

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          organization: values.organization.trim(),
          reason: values.reason,
          message: values.message.trim(),
          website: values.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("sent");
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("failed");
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        {/* Editorial header: heading left, invitation right */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={contact.eyebrow} title={contact.headline} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 lg:ml-auto">
              Whether you're a partner, a supporter, or simply curious about our work — we'd love
              to hear from you.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
          {/* Contact information — dark card */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-forest-950 p-7 sm:p-8">
              {/* Ambient decoration */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-forest-700/60 blur-[90px]" />
                <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-clay-700/25 blur-[90px]" />
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
              </div>

              <div className="relative">
                <p className="eyebrow text-gold-400">SHELIFT Headquarters</p>
                <address className="mt-4 space-y-3 text-[0.95rem] not-italic leading-relaxed text-forest-100/85">
                  <p className="flex items-start gap-3">
                    <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" strokeWidth={1.75} />
                    <span>
                      {contact.address.line1}
                      <br />
                      {contact.address.line2}
                      <br />
                      {contact.address.city}
                    </span>
                  </p>
                </address>
              </div>

              <div className="relative mt-6 space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-4 rounded-xl border border-ivory/12 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-950 text-gold-300 ring-1 ring-ivory/15 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-ivory">
                    <Mail aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow text-gold-400">Email</span>
                    <span className="mt-1 block truncate text-[0.95rem] font-bold text-ivory">
                      {contact.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${contact.phoneHref}`}
                  className="group flex items-center gap-4 rounded-xl border border-ivory/12 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-950 text-gold-300 ring-1 ring-ivory/15 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-ivory">
                    <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="eyebrow text-gold-400">Phone</span>
                    <span className="mt-1 block text-[0.95rem] font-bold text-ivory">
                      {contact.phone}
                    </span>
                  </span>
                </a>
              </div>

              {/* Live map - SHELIFT Headquarters, Plot 12 Jinja Road, Nakawa, Kampala */}
              <figure className="relative mt-6 flex-1 overflow-hidden rounded-xl border border-ivory/12 bg-white/[0.04]">
                <div className="relative h-full min-h-64 w-full">
                  <iframe
                    title="Map showing SHELIFT Headquarters - Plot 12, Jinja Road, Nakawa Division, Kampala, Uganda"
                    src="https://www.google.com/maps?q=Plot%2012%20Jinja%20Road%20Nakawa%20Division%20Kampala%20Uganda&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-ivory/10 px-4 py-3">
                  <span className="text-xs font-semibold tracking-wide text-forest-100/70">
                    Plot 12, Jinja Road - Nakawa Division, Kampala, Uganda
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plot+12+Jinja+Road+Nakawa+Division+Kampala+Uganda"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline shrink-0 text-xs font-bold text-gold-300 transition-colors hover:text-gold-400"
                  >
                    Open in Maps
                  </a>
                </figcaption>
              </figure>
            </div>
          </Reveal>

          {/* Contact form — light card */}
          <Reveal delay={0.15}>
            <div className="h-full rounded-2xl border border-forest-900/10 bg-white p-6 shadow-[0_24px_55px_-32px_rgba(11,26,18,0.35)] sm:p-8 lg:p-10">
            {status === "sent" ? (
              <div
                role="status"
                className="flex h-full min-h-80 flex-col items-center justify-center text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-800">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-2xl text-forest-950">
                  Thank you, {values.name.split(" ")[0] || "friend"}.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
                  Your message has been sent successfully. We'll get back to you
                  as soon as we can.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 text-sm font-bold text-forest-800 underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : status === "failed" ? (
              <div
                role="alert"
                className="flex h-full min-h-80 flex-col items-center justify-center text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-clay-50 text-clay-600">
                  <AlertCircle aria-hidden="true" className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-forest-950">
                  Something went wrong.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
                  We couldn't send your message right now. Please try again or
                  reach us directly at{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-bold text-clay-600 underline-offset-4 hover:underline"
                  >
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 text-sm font-bold text-forest-800 underline-offset-4 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-950 text-gold-300">
                    <MessageSquare aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-forest-950">Send a message</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">
                      We read every message and respond as soon as we can.
                    </p>
                  </div>
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-clay-600/25 bg-clay-50 p-4"
                  >
                    <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                    <p className="text-sm leading-relaxed text-clay-800">
                      A few fields need your attention before sending.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                  {/* Honeypot — visually hidden; bots that fill it are dropped. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                    />
                  </div>
                  <FormField
                    id="name"
                    label="Name"
                    required
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => handleChange("name", v)}
                    autoComplete="name"
                  />
                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => handleChange("email", v)}
                    autoComplete="email"
                  />
                <div className="sm:col-span-2">
                    <label
                      htmlFor="organization"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={values.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                      placeholder="Organization (optional)"
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="reason"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70"
                    >
                      Reason for contacting
                    </label>
                    <div className="relative">
                      <select
                        id="reason"
                        value={values.reason}
                        onChange={(e) => handleChange("reason", e.target.value)}
                        aria-describedby="reason-hint"
                        className={`${inputClasses} appearance-none pr-10`}
                      >
                        <option value="">Please choose…</option>
                        {contact.reasons.map((reason) => (
                          <option key={reason} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40"
                      />
                    </div>
                    <p id="reason-hint" className="mt-1.5 text-xs text-charcoal/45">
                      Optional — it helps us route your enquiry.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70"
                    >
                      Message <span aria-hidden="true" className="text-clay-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={values.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your enquiry…"
                      aria-required="true"
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${inputClasses} min-h-32 resize-y`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs font-semibold text-clay-700">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-4 border-t border-forest-900/10 pt-6">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-950 px-8 py-3 text-sm font-bold tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-500 disabled:opacity-60 disabled:hover:bg-forest-950"
                    >
                      {status === "sending" ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                    <p className="flex items-center gap-2 text-xs text-charcoal/50">
                      <Info className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      We love to hear from you.
                    </p>
                  </div>
                </form>
              </>
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function FormField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  required,
  autoComplete,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70"
      >
        {label} {required && <span aria-hidden="true" className="text-clay-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-clay-700">
          {error}
        </p>
      )}
    </div>
  );
}