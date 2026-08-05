import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Boise Basin Junk Removal collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
          Legal
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: August 3, 2026</p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-ink-muted">
          <p>
            {BUSINESS.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            respects your privacy. This policy explains what information we
            collect and how we use it.
          </p>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you contact us through our website, phone, or advertising
              forms (including Facebook lead ads), we may collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Service address</li>
              <li>Details about the junk removal job you&apos;re requesting</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Contact you about your quote or service request</li>
              <li>Schedule and coordinate junk removal services</li>
              <li>Send follow-up communications related to your service</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              We Do Not Sell Your Information
            </h2>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information to
              third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              How We Protect Your Information
            </h2>
            <p className="mt-2">
              We take reasonable measures to protect your personal
              information from unauthorized access, use, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Third-Party Services
            </h2>
            <p className="mt-2">
              We may use third-party platforms (such as Meta/Facebook) to run
              advertising and collect leads. Information submitted through
              these forms is subject to their respective privacy policies as
              well.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Your Choices
            </h2>
            <p className="mt-2">
              You may contact us at any time to ask what information we have
              on file, request corrections, or request deletion of your
              information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about this privacy policy, contact us at:
              <br />
              boisebasinjunkremoval@gmail.com
              <br />
              (208) 391-3730
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
