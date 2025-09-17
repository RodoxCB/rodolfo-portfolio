import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    emailjs.sendForm(
      'service_0tblcsh',   // substitua pelo Service ID do EmailJS
      'template_b6h89sh',  // substitua pelo Template ID do EmailJS
      formRef.current,
      'wkWVdyy2laiZjxhWT'    // substitua pelo Public Key (User ID) do EmailJS
    ).then(
      () => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        formRef.current?.reset();
        setSending(false);
      },
      (error) => {
        console.error('EmailJS Error:', error);
        alert('Oops! Something went wrong, please try again.');
        setSending(false);
      }
    );
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Contact Me</h2>
                
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-2xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-2xl">
            <h3 className="text-xl mb-6 text-white">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">rodolfo.cristanbehr@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">+55 (27) 99904-2844</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span className="text-white/80">Guarapari, BR</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg mb-4 text-white">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/RodoxCB" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </a>

                <a href="https://linkedin.com/in/rodolfo-behr-30134674" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-2xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-2xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  name="name"
                  placeholder="Your Name"
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-white/50 shadow-lg"
                  required
                />
              </div>
              <div>
                <Input 
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-white/50 shadow-lg"
                  required
                />
              </div>
              <div>
                <Input 
                  name="subject"
                  placeholder="Subject"
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-white/50 shadow-lg"
                  required
                />
              </div>
              <div>
                <Textarea 
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none shadow-lg"
                  required
                />
              </div>
              <Button 
                type="submit"
                disabled={sending}
                className="w-full backdrop-blur-xl bg-blue-600/80 hover:bg-blue-700/80 text-white shadow-xl border border-blue-400/30 transition-all duration-300"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
