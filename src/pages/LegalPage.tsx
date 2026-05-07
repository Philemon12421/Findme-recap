interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'disclaimer';
}

const content = {
  privacy: {
    title: "Privacy Policy",
    body: `
      ## 1. Introduction
      Welcome to Findme ("we," "our," or "us"). We are committed to protecting your personal data and your privacy. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our username and domain checking service.

      ## 2. Information We Collect
      **2.1 Personal Information:** We do not require account creation for basic searches. However, if you use our "Save" features, we store preferences locally on your device via LocalStorage.
      **2.2 Search Data:** When you search for a handle, we process that query in real-time. We do not maintain a permanent database of your search history unless explicitly saved to your personal dashboard.
      **2.3 Log Files:** Like most websites, we collect certain information automatically, including IP addresses, browser type, and time stamps for security and performance monitoring.

      ## 3. How We Use Information
      We use the collected data to:
      - Provide and maintain our Service.
      - Optimize our AI Identity matching algorithms.
      - Protect against malicious automated scraping of our system.
      - Comply with legal obligations (e.g., AdSense compliance).

      ## 4. Third-Party Services
      Our tool interacts with 1000+ third-party APIs (e.g., GitHub, Instagram). When you click a link to a result, you are entering a third-party site governed by their own privacy policies.

      ## 5. Cookies and Tracking
      We use strictly necessary cookies for session management. We may use Google AdSense or Analytics, which use cookies to serve ads based on prior visits. You can opt-out by visiting the Google Ad and Content Network privacy policy.

      ## 6. Your Data Rights
      Depending on your location (e.g., GDPR/CCPA), you have rights to access, delete, or port your data. Since most data is stored in your browser's LocalStorage, you can clear it at any time by clearing your browser cache.
    `
  },
  terms: {
    title: "Terms of Service",
    body: `
      ## 1. Acceptance of Terms
      By accessing or using Findme, you agree to be bound by these Terms of Service and all applicable laws and regulations.

      ## 2. Use License
      Permission is granted to use Findme for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      - Attempt to decompile or reverse engineer any software contained on the Service.
      - Remove any copyright or other proprietary notations.
      - Use automated scripts or "bots" to scrape information from the service.
      - Transfer the materials to another person or "mirror" the materials on any other server.

      ## 3. Disclaimer
      The materials on Findme are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

      ## 4. Accuracy of Results
      While we strive for 100% accuracy, Findme relies on third-party API responses which may be cached, rate-limited, or inaccurate. We are not responsible for errors in availability status.

      ## 5. Limitations
      In no event shall Findme or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.

      ## 6. Governing Law
      These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the operator resides, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
    `
  },
  cookies: {
    title: "Cookie Policy",
    body: `
      ## What Are Cookies
      Cookies are small text files used to store small pieces of information. They are stored on your device when the website is loaded in your browser.
      
      ## How We Use Cookies
      - **Essential:** We use cookies to manage user sessions and prevent cross-site request forgery attacks.
      - **Analytics:** We may use cookies to understand how visitors interact with the website.
      - **Advertising:** Our advertising partners like Google AdSense might use cookies to show you more relevant ads.
      
      ## Controlling Cookies
      You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of our "Save" and "AI" features.
    `
  },
  disclaimer: {
    title: "Legal Disclaimer",
    body: `
      Findme is an independent search engine and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with GitHub, Facebook, Instagram, TikTok, Snapchat, or any other social media platform mentioned on this site.
      
      The names of these platforms, as well as related names, marks, emblems, and images are registered trademarks of their respective owners. The use of these names is purely for identification and informational purposes.
    `
  }
};

export default function LegalPage({ type }: LegalPageProps) {
  const page = content[type];
  
  return (
    <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div className="prose prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:mt-8 font-medium">
        {page.body}
      </div>
    </div>
  );
}
