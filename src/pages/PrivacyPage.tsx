import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: February 26, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>We collect only the information necessary to provide and improve the Service: email address upon registration and basic usage analytics. We do not collect payment information or personally identifiable data beyond what you voluntarily provide.</p>

          <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
          <p>Your information is used solely to operate the Service, manage your account, and improve user experience. We do not sell, rent, or share your personal information with third parties.</p>

          <h2 className="text-xl font-semibold text-foreground">3. Third-Party Embeds</h2>
          <p>Our Service embeds content from third-party sources. These third parties may use cookies and tracking technologies. We have no control over and are not responsible for their privacy practices. We recommend reviewing their privacy policies.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
          <p>We use essential cookies for authentication and session management. Third-party embedded content may set additional cookies over which we have no control.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Contact</h2>
          <p>For privacy-related questions, please contact us through our website.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
