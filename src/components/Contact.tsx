import { Info } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact } from "../data/engage";
import { ButtonLink } from "./ui/ButtonLink";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type FormStatus = "idle" | "error" | "validated";

interface FormValues {
  name: string;
  email: string;
  organization: string;
  reason: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  reason: "",
  message: "",
};

const inputClasses =
  "w-full rounded-sm border border-forest-900/15 bg-ivory px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 transition-colors focus:border-clay-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-500";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("validated");
    } else {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="bg-ivory py-20 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        {/* Contact information */}
        <div>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.headline} />
          <Reveal delay={0.1} className="mt-6 space-y-8">
            <p className="text-base leading-relaxed text-charcoal/70">
              Whether you're a partner, a supporter, or simply curious about our
              work — we'd love to hear from you.
            </p>

            <address className="not-italic">
              <p className="eyebrow text-clay-600">SHELIFT Headquarters</p>
              <p className="mt-3 text-base leading-relaxed text-charcoal/75">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.city}
              </p>
            </address>

            <div className="flex flex-wrap gap-4">
              <ButtonLink href={`mailto:${contact.email}`} variant="primary" withArrow>
                Email Us
              </ButtonLink>
              <ButtonLink href={`tel:${contact.phoneHref}`} variant="outline-dark">
                {contact.phone}
              </ButtonLink>
            </div>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={0.2} className="mt-10">
            <div className="relative flex aspect-[16/9] items-center justify-center rounded-sm border border-dashed border-forest-900/25 bg-sand-50">
              <span className="sr-only">Map placeholder</span>
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-clay-500/90 text-ivory shadow-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p className="absolute bottom-3 text-xs font-semibold tracking-wide text-charcoal/55">
                Kampala, Uganda — map to be embedded
              </p>
            </div>
          </Reveal>
        </div>
        {/* Contact form */}
        <Reveal delay={0.15} className="mt-2">
          <div className="rounded-sm border border-forest-900/10 bg-sand-50 p-6 sm:p-8 lg:p-10">
            {status === "validated" ? (
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
                  Your message has been validated and is ready to send. To
                  complete delivery, this form needs to be connected to SHELIFT's
                  email service or backend — in the meantime, you can reach the
                  team directly at{" "}
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
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-forest-950">Send a message</h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  We read every message and respond as soon as we can.
                </p>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 rounded-sm border border-clay-300 bg-clay-50 px-4 py-3 text-sm font-semibold text-clay-800"
                  >
                    A few fields need your attention before sending.
                  </p>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
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
                    <select
                      id="reason"
                      value={values.reason}
                      onChange={(e) => handleChange("reason", e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Please choose…</option>
                      {contact.reasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
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
                      className={inputClasses}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs font-semibold text-clay-700">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-950 px-8 py-3 text-sm font-bold tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-500"
                    >
                      Send Message
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </button>
                    <p className="flex items-center gap-2 text-xs text-charcoal/50">
                      <Info className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      Frontend validation only — wire this form to an email provider or backend when live.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </Reveal>
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