import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DMCAPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">DMCA Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: February 26, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">Notice</h2>
          <p>SarmaxStream respects the intellectual property rights of others and expects its users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond promptly to notices of alleged copyright infringement.</p>

          <h2 className="text-xl font-semibold text-foreground">Important Clarification</h2>
          <p><strong className="text-foreground">SarmaxStream does not host, upload, or store any video content on its servers.</strong> All media is provided by and embedded from non-affiliated third-party sources. We function as a search engine that indexes publicly available links on the internet.</p>

          <h2 className="text-xl font-semibold text-foreground">Filing a DMCA Takedown Notice</h2>
          <p>If you believe that content accessible through our Service infringes your copyright, please provide the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identification of the copyrighted work claimed to be infringed.</li>
            <li>Identification of the material that is claimed to be infringing, including the URL.</li>
            <li>Your contact information (name, address, telephone number, email).</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner.</li>
            <li>A statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the owner.</li>
            <li>Your physical or electronic signature.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">Response</h2>
          <p>Upon receiving a valid DMCA notice, we will promptly remove or disable access to the allegedly infringing link. Since we do not host any content, we will remove the link/reference from our index.</p>

          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>DMCA notices can be sent to us via the contact information on our website. Please note that misrepresentations in a DMCA notice may result in liability for damages under Section 512(f) of the DMCA.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DMCAPage;
