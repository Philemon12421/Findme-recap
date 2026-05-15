interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'disclaimer';
}

const content = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "May 15, 2026",
    body: `
# Privacy Policy

Welcome to Findme ("Findme", "we", "our", or "us").

This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform and services.

---

## 1. Information We Collect

### Personal Information
We may collect limited information you voluntarily provide, including:
- Search queries
- Saved usernames or domains
- Feedback submissions
- Contact messages

### Automatically Collected Information
We may automatically collect:
- IP address
- Browser type
- Device information
- Operating system
- Usage statistics
- Access times and pages viewed

---

## 2. How We Use Information

We use information to:
- Operate and improve the Service
- Enhance search accuracy
- Detect abuse and security threats
- Analyze website performance
- Comply with legal obligations
- Personalize user experience

---

## 3. Local Storage

Findme may use:
- LocalStorage
- SessionStorage
- Browser cache

to save preferences and improve performance.

---

## 4. Cookies

We may use cookies for:
- Security
- Analytics
- Functionality
- Advertising

Third-party providers such as Google AdSense or Analytics may also use cookies.

---

## 5. Third-Party Services

Findme may interact with third-party platforms including:
- GitHub
- Instagram
- TikTok
- Facebook
- LinkedIn
- YouTube

We are not responsible for third-party privacy practices.

---

## 6. Data Security

We implement reasonable safeguards to protect your information, but no online service can guarantee complete security.

---

## 7. Your Rights

Depending on your region, you may have rights to:
- Access your data
- Delete your data
- Correct inaccurate data
- Restrict processing

---

## 8. Changes

We may update this Privacy Policy at any time. Continued use of the Service constitutes acceptance of changes.
`
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: "May 15, 2026",
    body: `
# Terms of Service

By using Findme, you agree to these Terms of Service.

---

## 1. Use of the Service

You may use Findme only for lawful purposes.

You agree not to:
- Reverse engineer the platform
- Abuse APIs
- Use automated scraping tools
- Attempt unauthorized access
- Distribute malicious software

---

## 2. Intellectual Property

All content, branding, software, and functionality belong to Findme unless otherwise stated.

---

## 3. Accuracy

We do not guarantee:
- Real-time availability accuracy
- Continuous uptime
- Error-free operation

Third-party services may affect results.

---

## 4. AI Features

AI-generated suggestions may contain inaccuracies and should not be treated as professional advice.

---

## 5. Limitation of Liability

Findme is provided "AS IS" without warranties of any kind.

We are not liable for:
- Data loss
- Business interruption
- Indirect damages
- Third-party failures

---

## 6. Termination

We reserve the right to suspend or terminate access for violations of these Terms.

---

## 7. Governing Law

These Terms are governed by applicable laws in the operator’s jurisdiction.
`
  },

  cookies: {
    title: "Cookie Policy",
    lastUpdated: "May 15, 2026",
    body: `
# Cookie Policy

This Cookie Policy explains how Findme uses cookies.

---

## What Are Cookies?

Cookies are small files stored on your device to improve website functionality and user experience.

---

## Types of Cookies We Use

### Essential Cookies
Required for:
- Security
- Login sessions
- Core functionality

### Analytics Cookies
Used to:
- Measure traffic
- Improve performance
- Understand visitor behavior

### Advertising Cookies
Used by advertising providers to deliver personalized ads.

---

## Managing Cookies

You can disable cookies through your browser settings, though some features may stop functioning properly.
`
  },

  disclaimer: {
    title: "Legal Disclaimer",
    lastUpdated: "May 15, 2026",
    body: `
# Legal Disclaimer

Findme is an independent platform and is not affiliated with:
- GitHub
- Instagram
- TikTok
- Facebook
- LinkedIn
- YouTube
- X (Twitter)

unless explicitly stated otherwise.

---

## Trademark Notice

All logos, trademarks, and brand names belong to their respective owners.

---

## No Guarantees

Username and domain availability may change at any time and are provided for informational purposes only.

---

## External Links

We are not responsible for the content or privacy practices of third-party websites linked through the Service.
`
  }
};

export default function LegalPage({ type }: LegalPageProps) {
  const page = content[type];

  return (
    <section className="min-h-screen bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-28 pb-24">
        
        <div className="mb-14">
          <div className="inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium bg-slate-50 text-slate-700">
            Legal Documentation
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            {page.title}
          </h1>

          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-2xl">
            Please read this document carefully before using Findme and its services.
          </p>

          <div className="mt-5 text-sm text-slate-500">
            Last Updated:{" "}
            <span className="font-semibold text-slate-700">
              {page.lastUpdated}
            </span>
          </div>
        </div>

        <article
          className="
            prose
            prose-slate
            max-w-none
            prose-headings:font-black
            prose-headings:text-slate-900
            prose-h1:text-3xl
            prose-h2:text-2xl
            prose-h2:mt-12
            prose-h2:border-b
            prose-h2:border-slate-200
            prose-h2:pb-3
            prose-p:text-slate-700
            prose-p:leading-8
            prose-li:text-slate-700
            prose-li:leading-8
            prose-strong:text-slate-900
            prose-a:text-blue-600
          "
        >
          <div
            dangerouslySetInnerHTML={{
              __html: page.body
                .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                .replace(/^\- (.*$)/gim, "<li>$1</li>")
                .replace(/\n\n/g, "<br /><br />")
            }}
          />
        </article>

        <div className="mt-20 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Findme. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
