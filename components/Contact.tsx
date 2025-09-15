import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Contact Me</h2>
        <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
          Ready to work together? I'd love to hear about your project and discuss how we can bring your ideas to life.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 shadow-2xl ring-1 ring-white/20">
            <h3 className="text-xl mb-6 text-white">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">rodolfo.behr@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">San Francisco, CA</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg mb-4 text-white">Follow Me</h4>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 shadow-2xl ring-1 ring-white/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Your Name"
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white placeholder:text-white/50 shadow-lg ring-1 ring-white/10"
                  required
                />
              </div>
              <div>
                <Input 
                  type="email"
                  placeholder="Your Email"
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white placeholder:text-white/50 shadow-lg ring-1 ring-white/10"
                  required
                />
              </div>
              <div>
                <Input 
                  placeholder="Subject"
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white placeholder:text-white/50 shadow-lg ring-1 ring-white/10"
                  required
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message"
                  rows={5}
                  className="backdrop-blur-lg bg-white/15 border-white/30 text-white placeholder:text-white/50 resize-none shadow-lg ring-1 ring-white/10"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full backdrop-blur-lg bg-blue-600/80 hover:bg-blue-700/80 text-white shadow-xl ring-1 ring-blue-400/30 border border-blue-400/30 transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}