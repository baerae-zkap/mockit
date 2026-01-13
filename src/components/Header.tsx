'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const SHORTCUTS = [
  { keys: ['⌘', 'V'], description: '이미지 붙여넣기' },
  { keys: ['⌘', '⇧', 'C'], description: '캔버스 클립보드에 복사' },
  { keys: ['⌘', 'S'], description: '이미지 내보내기' },
];

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-secondary)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div className="px-5 py-4 flex items-center justify-between">
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                단축키
              </h2>
              <motion.button
                whileHover={{ scale: 0.95, backgroundColor: 'var(--bg-hover)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="px-5 pb-5 space-y-2">
              {SHORTCUTS.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <kbd
                        key={keyIndex}
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold min-w-[36px] text-center"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  return (
    <>
      <header
        className="h-14 flex items-center justify-between px-5"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-primary)' }}
          >
            <span className="text-white text-sm font-bold">O</span>
          </div>
          <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            Ollim
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShortcutsOpen(true)}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--bg-hover)]"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <HelpCircle className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </motion.button>
          <ThemeToggle />
        </div>
      </header>
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </>
  );
}
