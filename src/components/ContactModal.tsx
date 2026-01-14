import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Linkedin, Github } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export function ContactModal({ isOpen, onClose, theme = 'dark' }: ContactModalProps) {
  const contactOptions = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      sublabel: 'Connect professionally',
      href: 'https://www.linkedin.com/in/zayd-alnuweiri/',
      color: '#0077b5',
      gradient: 'from-blue-500/20 to-blue-600/20',
    },
    {
      icon: Mail,
      label: 'Email',
      sublabel: 'Send me a message',
      href: 'mailto:zhmalnuweiri@gmail.com',
      color: '#ea4335',
      gradient: 'from-red-500/20 to-red-600/20',
    },
    {
      icon: Github,
      label: 'GitHub',
      sublabel: 'Check out my work',
      href: 'https://github.com/zalnuweiri',
      color: '#ffffff',
      gradient: 'from-gray-500/20 to-gray-600/20',
    },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            className="relative bg-[#111111] border border-gray-800/50 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
              <p className="text-gray-400 text-sm">Choose your preferred way to connect</p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {contactOptions.map((option, index) => (
                <motion.a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${option.gradient} border border-white/5 hover:border-white/10 transition-all group cursor-pointer`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${option.color}33, ${option.color}11)`,
                    }}
                  >
                    <option.icon className="w-6 h-6" style={{ color: option.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium group-hover:text-white transition-colors">
                      {option.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{option.sublabel}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
              <p className="text-gray-500 text-xs">Available for freelance projects</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}