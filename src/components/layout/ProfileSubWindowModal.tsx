import React, { useState } from 'react';
import { X, UserCheck, Search, LogOut, Key, CheckCircle, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface ProfileSubWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileSubWindowModal: React.FC<ProfileSubWindowModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const [designation, setDesignation] = useState<'Author' | 'Reader'>('Author');
  const [referralCode, setReferralCode] = useState('ELEXA-VIP-7892');
  const [referralStatus, setReferralStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearchReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralCode.trim()) return;
    setReferralStatus(`Validating code "${referralCode}"... Code verified! +500 Magazine Credits unlocked.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface border border-border rounded-3xl shadow-elevation overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border/70 flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2 text-text-primary font-display font-semibold text-lg">
            <UserCheck className="w-5 h-5 text-accent" />
            Profile Account
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Avatar & User Details */}
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Alexander Mark"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20 shadow-md"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-display font-semibold text-text-primary">
                Alexander Mark
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-text-muted mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                alexander.mark@elexa.magazine
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-mono font-medium w-fit">
                <Sparkles className="w-3 h-3 fill-accent" /> {designation} Account
              </div>
            </div>
          </div>

          {/* Standalone Admin Studio Button */}
          {onOpenAdmin && (
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full p-3 rounded-2xl bg-accent-light/40 border border-accent/30 hover:border-accent text-accent font-semibold text-xs flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Launch Separate Admin Studio Portal</span>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold group-hover:translate-x-1 transition-transform">Enter →</span>
            </button>
          )}

          {/* Designation Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Account Designation
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-background border border-border/80">
              <button
                type="button"
                onClick={() => setDesignation('Author')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  designation === 'Author'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Author Mode
              </button>
              <button
                type="button"
                onClick={() => setDesignation('Reader')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  designation === 'Reader'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Reader Mode
              </button>
            </div>
          </div>

          {/* Referral Code Search */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-accent" /> Enter Referral Code
            </label>
            <form onSubmit={handleSearchReferral} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. ELEXA-REF-1234"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-text-primary text-background text-xs font-semibold flex items-center gap-1.5 hover:bg-accent hover:text-white transition-colors"
              >
                <Search className="w-3.5 h-3.5" /> Validate
              </button>
            </form>

            {referralStatus && (
              <div className="mt-1 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{referralStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/70 bg-background/50 flex items-center justify-between">
          <div className="text-xs text-text-muted font-mono">
            ID: ELEXA-90821-PRO
          </div>
          <button
            onClick={() => {
              alert("Logged out of ELEXA Magazine Platform.");
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};
