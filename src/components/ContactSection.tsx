"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Download, CheckCircle, AlertCircle, FileText, Loader2, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [nextUrl, setNextUrl] = useState("http://localhost:3000/contact-success");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNextUrl(`${window.location.origin}/contact-success`);
    }
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    const { name, email, subject, message } = formState;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const { name, email, subject, message } = formState;

    try {
      const res = await fetch("https://formsubmit.co/ajax/aaryanighut07@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _captcha: "false",
          _template: "table",
          _subject: "New Portfolio Contact Message",
          _next: nextUrl
        }),
      });

      setIsSubmitting(false);

      if (res.ok) {
        const data = await res.json();
        if (data.success === false || data.success === "false") {
          const msg = data.message || "";
          if (msg.toLowerCase().includes("activation") || msg.toLowerCase().includes("active")) {
            console.warn(
              "FormSubmit email is not activated.\nPlease activate the email from the FormSubmit activation link."
            );
          }
          throw new Error(msg || "FormSubmit error");
        }
        showToast("success", "Message sent successfully. I'll get back to you soon.");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        let msg = "";
        try {
          const errData = await res.json();
          msg = errData.message || "";
        } catch (_) {}
        if (msg.toLowerCase().includes("activation") || msg.toLowerCase().includes("active")) {
          console.warn(
            "FormSubmit email is not activated.\nPlease activate the email from the FormSubmit activation link."
          );
        }
        throw new Error(msg || "FormSubmit response error");
      }
    } catch (err: any) {
      console.error("Failed submitting contact form:", err);
      setIsSubmitting(false);
      showToast("error", "Unable to send message. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const socials = [
    { icon: FaGithub, href: "https://github.com/AaryaNighut", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/aarya-nighut-855939339", label: "LinkedIn" },
    { icon: SiLeetcode, href: "https://leetcode.com/u/aaryanighut07/", label: "LeetCode" },
    { icon: Mail, href: "mailto:aaryanighut07@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="contact"
      className="relative pt-12 pb-16 bg-transparent selection:bg-yellow-500/20 overflow-hidden"
    >
      {/* Background glow filters */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-yellow-500/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none" />

      {/* Floating Success / Error Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span className="text-xs md:text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-6">
        
        {/* Section Header: Center Aligned, Large Bold Font, Modern Premium Typography */}
        <div className="flex flex-col items-center text-center gap-3 select-none relative z-10 w-full">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Contact
          </h2>
        </div>

        {/* Two-Column Grid Layout: 40% Left, 60% Right (Moved upward with mb-8 header spacing) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center lg:items-stretch w-full relative z-10 mt-2">
          
          {/* Left Column (40%): Professional Contact Info */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-white uppercase select-none">
                  Connection Nodes
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {"I'm always open to discussing new opportunities, collaborations, innovative projects, hackathons, internships, and AI-based development. Feel free to connect with me, and I'll get back to you as soon as possible."}
                </p>
              </div>

              {/* Contact Detail Cards */}
              <div className="flex flex-col gap-3">
                {/* Location Card */}
                <div className="flex items-center gap-4 group p-4 rounded-2xl border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/85 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all duration-500 ease-out hover:-translate-y-0.5">
                  <div className="p-2.5 rounded-xl bg-[#0a1128] border border-white/[0.05] text-yellow-500 group-hover:border-yellow-500/20 group-hover:scale-105 transition-all duration-300">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[8px] font-bold tracking-wider text-slate-500 uppercase select-none">CURRENT LOCATION</span>
                    <span className="text-xs text-slate-300 font-semibold truncate">Thane, Maharashtra, India</span>
                  </div>
                </div>

                {/* Email Card */}
                <a
                  href="mailto:aaryanighut07@gmail.com"
                  className="flex items-center gap-4 group p-4 rounded-2xl border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/85 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all duration-500 ease-out hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-[#0a1128] border border-white/[0.05] text-yellow-500 group-hover:border-yellow-500/20 group-hover:scale-105 transition-all duration-300">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[8px] font-bold tracking-wider text-slate-500 uppercase select-none">PRIMARY EMAIL</span>
                    <span className="text-xs text-slate-300 font-semibold truncate">aaryanighut07@gmail.com</span>
                  </div>
                </a>

                {/* Mobile Card */}
                <a
                  href="tel:+919172074296"
                  className="flex items-center gap-4 group p-4 rounded-2xl border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/85 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all duration-500 ease-out hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-[#0a1128] border border-white/[0.05] text-yellow-500 group-hover:border-yellow-500/20 group-hover:scale-105 transition-all duration-300">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[8px] font-bold tracking-wider text-slate-500 uppercase select-none">MOBILE NUMBER</span>
                    <span className="text-xs text-slate-300 font-semibold truncate">+91 91720 74296</span>
                  </div>
                </a>

                {/* Resume Download Card */}
                <a
                  href="/Aarya_Nighut_Resume.pdf"
                  download="Aarya_Nighut_Resume.pdf"
                  className="flex items-center gap-4 group p-4 rounded-2xl border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/85 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all duration-500 ease-out hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-[#0a1128] border border-white/[0.05] text-yellow-500 group-hover:border-yellow-500/20 group-hover:scale-105 transition-all duration-300">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[8px] font-bold tracking-wider text-slate-500 uppercase select-none font-mono flex items-center gap-1">
                      RESUME <Download className="w-2.5 h-2.5 text-yellow-500 animate-bounce" />
                    </span>
                    <span className="text-xs text-slate-300 font-semibold truncate">Download My Resume</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Networks Links */}
            <div className="flex flex-col gap-3 mt-auto">
              <span className="text-[8px] font-bold tracking-wider text-slate-500 uppercase select-none text-center lg:text-left">
                NETWORK LINKS
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {socials.map((soc, idx) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.href}
                      target={soc.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-[#0C1220] hover:border-yellow-500/30 text-slate-400 hover:text-yellow-500 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] flex items-center justify-center cursor-pointer group"
                      title={soc.label}
                    >
                      <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (60%): Premium Contact Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative p-6 md:p-8 rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#111827]/90 to-[#111827]/75 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-yellow-500/[0.02] blur-xl pointer-events-none" />

              <form noValidate action="https://formsubmit.co/aaryanighut07@gmail.com" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Hidden Inputs */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                <input type="hidden" name="_next" value={nextUrl} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[8px] font-bold text-slate-500 uppercase tracking-wider select-none">
                      Visitor Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#0a1128] text-xs text-white focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 placeholder:text-slate-600"
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <span className="text-[9px] font-semibold text-red-400 pl-1">
                        {errors.name}
                      </span>
                    )}
                  </div>
 
                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[8px] font-bold text-slate-500 uppercase tracking-wider select-none">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#0a1128] text-xs text-white focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 placeholder:text-slate-600"
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && (
                      <span className="text-[9px] font-semibold text-red-400 pl-1">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[8px] font-bold text-slate-500 uppercase tracking-wider select-none">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#0a1128] text-xs text-white focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="e.g. Project Collaboration"
                  />
                  {errors.subject && (
                    <span className="text-[9px] font-semibold text-red-400 pl-1">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[8px] font-bold text-slate-500 uppercase tracking-wider select-none">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#0a1128] text-xs text-white focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 resize-none placeholder:text-slate-600"
                    placeholder="Type your message details here..."
                  />
                  {errors.message && (
                    <span className="text-[9px] font-semibold text-red-400 pl-1">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full md:w-fit px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] shadow-md select-none cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>Transmit Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
