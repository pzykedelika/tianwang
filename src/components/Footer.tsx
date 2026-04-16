"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks } from "@/lib/data";
import { Mail } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-4">
              TIAN<span className="text-accent">.</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Creative Director based in Adelaide, Australia.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/about#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Mail size={16} />
                {socialLinks.email}
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <InstagramIcon size={16} />
                @tianwang
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <LinkedInIcon size={16} />
                Tian Wang
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tian Wang. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Adelaide, Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
