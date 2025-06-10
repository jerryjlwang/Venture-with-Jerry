
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect anonymous analytics data to understand how visitors interact with our website. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Page views and navigation patterns</li>
              <li>Device type (mobile, tablet, desktop)</li>
              <li>Browser type</li>
              <li>Referring websites</li>
              <li>Time spent on pages</li>
              <li>General geographic location (country/city level)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected data to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Improve website performance and user experience</li>
              <li>Understand which content is most valuable to our visitors</li>
              <li>Optimize our website for different devices and browsers</li>
              <li>Generate aggregate statistics about website usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard practices. We:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Do not collect personally identifiable information</li>
              <li>Use secure, encrypted storage for all analytics data</li>
              <li>Do not share individual visitor data with third parties</li>
              <li>Only use aggregated, anonymous data for analysis</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Choices</h2>
            <p className="mb-4">
              You have control over your data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You can decline analytics cookies when visiting our site</li>
              <li>You can change your cookie preferences at any time</li>
              <li>Declining cookies will not affect your ability to use our website</li>
              <li>We respect "Do Not Track" browser settings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
            <p className="mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Remember your cookie preferences</li>
              <li>Track anonymous analytics data (only with your consent)</li>
              <li>Improve website functionality</li>
            </ul>
            <p className="mt-4">
              Essential cookies are necessary for the website to function and cannot be disabled. 
              Analytics cookies are optional and require your explicit consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us through our website or email us directly.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
