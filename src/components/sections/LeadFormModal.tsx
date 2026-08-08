"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phoneNumber: ''
  });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { contextSafe } = useGSAP({ scope: overlayRef });

  // Handle Entrance Animation
  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.85, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }
      );
    }
  }, [isOpen]);

  const handleClose = contextSafe(() => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 10, duration: 0.2 });
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.2, 
        delay: 0.1,
        onComplete: () => {
          setStatus('idle');
          setFormData({ fullName: '', workEmail: '', companyName: '', phoneNumber: '' });
          onClose();
        }
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(handleClose, 2500); // auto close after success
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[20px]"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-slate-200"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
        >
          ✕
        </button>
        
        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{message}</h3>
            <p className="text-slate-500">Our enterprise team will reach out to you shortly.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Book a Demo</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Discover how Accredian can transform your organization's technical capabilities.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.workEmail}
                  onChange={e => setFormData({...formData, workEmail: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all"
                  placeholder="Acme Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">{message}</p>
              )}

              <button 
                type="submit"
                disabled={status === 'pending'}
                className="mt-2 w-full px-6 py-3.5 rounded-xl bg-[#1D4ED8] text-white font-bold hover:bg-[#1e40af] disabled:opacity-70 transition-colors flex justify-center items-center"
              >
                {status === 'pending' ? 'Submitting...' : 'Request Demo'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
