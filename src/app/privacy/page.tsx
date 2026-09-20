export default function PrivacyPage() {
  return (
    <div className="space-y-8 py-8 max-w-3xl mx-auto font-sans text-sm">
      <h1 className="text-3xl font-medium tracking-tight">Privacy Policy</h1>
      
      <div className="space-y-4 text-[var(--n-graphite)] leading-relaxed">
        <p>
          I respect your privacy and don't believe in invasive tracking. This plain-English policy explains what gets tracked and how it's handled on nesar.build.
        </p>

        <h2 className="text-lg font-bold text-[var(--n-ink)]">1. Analytics</h2>
        <p>
          We use PostHog for anonymous behavioral analytics (pages viewed, buttons clicked, motion preview engagement). No personal data or full IP addresses are stored without your explicit action.
        </p>

        <h2 className="text-lg font-bold text-[var(--n-ink)]">2. Astra Agent Conversations</h2>
        <p>
          When you interact with Astra, your visitor name/role is used in-session for context. Message contents are processed through an API adapter to generate answers from curated portfolio knowledge. Raw chat messages are not sold, leaked, or indexed into private databases.
        </p>

        <h2 className="text-lg font-bold text-[var(--n-ink)]">3. Contact Form Submissions</h2>
        <p>
          Information submitted through the contact form (name, email, company, message) is stored securely in our database and used strictly for responding to your inquiry.
        </p>
      </div>
    </div>
  );
}
