import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/carlo", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/carlo", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/carlo", label: "X (Twitter)", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:px-6">
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <link.icon className="size-5" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Carlo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
