import React from 'react';

const TermsConditions = () => {
  return (
    <div className="main-container max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing and using the Addis Bank Job Portal, you agree to comply with and be bound by these terms and conditions. If you do not agree, please do not use this portal.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">2. Eligibility</h2>
        <p className="text-gray-700">
          The Job Portal is open to individuals who meet the qualifications specified in each job listing. You must provide accurate and complete information during the application process.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">3. Use of the Portal</h2>
        <p className="text-gray-700">
          You agree to use the portal only for lawful purposes and not to upload false, misleading, or offensive content. Misuse of the portal may lead to account termination or legal action.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">4. Privacy and Data Protection</h2>
        <p className="text-gray-700">
          Addis Bank respects your privacy. Your data will be handled in accordance with our Privacy Policy. Personal information submitted via the portal is used solely for recruitment purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">5. Application Status and Feedback</h2>
        <p className="text-gray-700">
          While we aim to keep applicants informed, Addis Bank reserves the right not to provide individual feedback or status updates on all applications due to volume.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">6. Modification of Terms</h2>
        <p className="text-gray-700">
          Addis Bank reserves the right to modify these terms at any time. Continued use of the portal after changes indicates your acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">7. Contact Information</h2>
        <p className="text-gray-700">
          For questions or concerns regarding these terms, please contact our HR department at <a href="mailto:hr@addisbanksc.com" className="text-blue-600 hover:underline">hr@addisbanksc.com</a>.
        </p>
      </section>

    </div>
  );
};

export default TermsConditions;
