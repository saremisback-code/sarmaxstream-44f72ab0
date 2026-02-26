import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: February 26, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing and using SarmaxStream ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
          <p>SarmaxStream is a search engine and link aggregator. We do not host, upload, or store any video files on our servers. All content is provided by non-affiliated third-party services. We simply index publicly available content from the internet, much like a search engine.</p>

          <h2 className="text-xl font-semibold text-foreground">3. No Hosting Disclaimer</h2>
          <p>SarmaxStream does not host any content. All media is embedded from third-party sources over which we have no control. We are not responsible for the content, accuracy, or legality of material hosted on third-party websites.</p>

          <h2 className="text-xl font-semibold text-foreground">4. User Responsibility</h2>
          <p>Users are solely responsible for ensuring that their use of the Service complies with all applicable local, state, national, and international laws and regulations. You agree not to use the Service for any unlawful purpose.</p>

          <h2 className="text-xl font-semibold text-foreground">5. DMCA & Copyright</h2>
          <p>We respect the intellectual property rights of others. If you believe content linked through our Service infringes your copyright, please see our <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link> page for takedown procedures.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>The Service is provided "as is" without any warranties. SarmaxStream and its operators shall not be liable for any damages arising from the use or inability to use the Service, including but not limited to direct, indirect, incidental, or consequential damages.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
