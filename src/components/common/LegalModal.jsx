import React from 'react';
import { FileText, ShieldCheck, X } from 'lucide-react';

const legalContent = {
  terms: {
    title: 'Terms & Conditions',
    icon: FileText,
    sections: [
      ['Agreement', 'By browsing this website or placing an order, you agree to these Terms & Conditions. If you do not agree, please do not use the website or place an order.'],
      ['Products & Compatibility', 'Product images are for illustration and minor differences in colour or finish may occur. Please check the exact iPhone model, size, colour, and variant before ordering. Case Matrix is not responsible for an incorrect selection made at checkout.'],
      ['Orders, Pricing & Payment', 'An order is accepted only after payment is successfully received and an order confirmation is issued. Prices, product availability, discounts, and specifications may change without prior notice. Payment processing is handled through the available payment provider, and Case Matrix does not store complete card or banking credentials.'],
      ['Shipping & Delivery', 'Orders are shipped to the address provided by the customer. Delivery estimates are indicative and may be affected by the delivery location, courier delays, weather, public holidays, or incomplete address details. Risk of delay caused by incorrect customer information remains with the customer.'],
      ['Returns, Refunds & Exchanges', 'Return or exchange requests must be raised through our support channel within the applicable return period shown for the order. Items must be unused, undamaged, and returned with original packaging and proof of purchase. Approved refunds are issued through the original payment method after inspection. Items damaged through misuse, accidents, liquid exposure, or normal wear may not qualify.'],
      ['Warranty', 'Where a product warranty is offered, it covers eligible manufacturing defects for the stated warranty period. It does not cover accidental damage, improper installation, scratches, misuse, unauthorised modification, or ordinary wear and tear. Warranty claims may require photographs, order details, and inspection of the product.'],
      ['Acceptable Use', 'You must not misuse this website, interfere with its operation, attempt unauthorised access, submit fraudulent information, or use our content for unlawful purposes.'],
      ['Intellectual Property', 'The Case Matrix name, branding, product descriptions, photographs, graphics, and website content belong to Case Matrix or its licensors. They may not be copied, modified, or commercially reused without written permission.'],
      ['Changes & Governing Law', 'We may update these terms when our services or legal obligations change. The latest version will be displayed on this page. These terms are governed by the applicable laws of India, subject to the jurisdiction of the appropriate courts.'],
      ['Contact', 'For questions about an order or these terms, contact us through the Contact page or the WhatsApp support link provided on this website.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    icon: ShieldCheck,
    sections: [
      ['Scope', 'This Privacy Policy explains how Case Matrix collects, uses, stores, and shares information when you browse our website, submit an enquiry, or place an order.'],
      ['Information We Collect', 'Depending on how you use the website, we may collect your name, email address, phone number, delivery address, billing details, selected products, order history, enquiry messages, and information you choose to provide through WhatsApp or contact forms.'],
      ['How We Use Information', 'We use information to confirm and fulfil orders, arrange delivery, provide customer support, respond to enquiries, process returns or warranty requests, prevent fraud, maintain website security, and improve our products and services.'],
      ['Payments & Service Providers', 'Payments are processed by third-party payment providers. Case Matrix does not store complete card numbers, CVV codes, or banking passwords. We may share the minimum information needed with payment providers, couriers, technology providers, and support partners to complete your request.'],
      ['Cookies & Usage Data', 'The website may use essential browser storage, cookies, or similar technologies to remember preferences, support cart functionality, understand basic website usage, and improve performance. You can manage cookies through your browser settings, though some features may not work correctly when they are disabled.'],
      ['Data Retention', 'We retain information only for as long as reasonably necessary to provide services, maintain transaction records, resolve disputes, meet accounting requirements, and comply with applicable law.'],
      ['Security & Sharing', 'We use reasonable administrative and technical safeguards to protect personal information. We do not sell personal information. Information may be disclosed where necessary to provide a requested service, comply with law, protect our rights, or prevent fraud and security threats.'],
      ['Your Choices & Rights', 'You may ask us to access, correct, update, or delete personal information, subject to applicable legal and operational requirements. You may also ask us to stop non-essential promotional communication. Requests can be made through our Contact page.'],
      ['Children’s Privacy', 'Our website is intended for general customers and is not directed at children. We do not knowingly request personal information from children without appropriate consent.'],
      ['Policy Updates & Contact', 'We may update this policy when our practices or legal obligations change. The latest version and update date will be shown here. For privacy questions or requests, contact Case Matrix through the Contact page or WhatsApp support link.'],
    ],
  },
};

export default function LegalModal({ documentType, onClose }) {
  if (!documentType) return null;

  const document = legalContent[documentType];
  const Icon = document.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#100d0a] border border-amber-500/25 shadow-2xl text-slate-300">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">{document.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal document"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[calc(85vh-73px)] overflow-y-auto px-5 sm:px-6 py-5 space-y-5 text-xs leading-relaxed">
          <p className="text-slate-400">Last updated: September 23, 2026</p>
          {document.sections.map(([heading, text]) => (
            <section key={heading}>
              <h3 className="mb-1.5 text-sm font-bold text-amber-400">{heading}</h3>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
