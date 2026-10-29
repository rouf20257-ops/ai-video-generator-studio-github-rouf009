/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CineFlow 2.5 - AI Video, Image & Audio Generator Platform
 * Gemini Omni Flash 1.1 + Sora 2.0 • 2-Year Free License (2026-2028)
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieNotice } from './components/CookieNotice';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HomePage } from './pages/HomePage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import {
  DemoAuthModal,
  InsufficientCreditsModal,
  SettingsModal,
  DailyBonusModal,
} from './components/Modals';
import { useUserCredits } from './hooks/useUserCredits';
import { useGenerationsHistory } from './hooks/useGenerationsHistory';
import { setVideoProvider, UnifiedMediaProvider } from './services/videoService';

function AppContent() {
  const { showToast } = useToast();

  // Dark/Light theme state (Dark by default, persisted in localStorage)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cineflow_theme');
      if (saved) return saved === 'dark';
    } catch {}
    return true; // dark by default
  });

  const [isMockMode, setIsMockMode] = useState<boolean>(true);

  // User credit & 2-year license hook with daily 1,000 rollover credits
  const {
    user,
    credits,
    streakDays,
    rolloverCredits,
    daysRemaining,
    licenseExpiry,
    claimDailyCredits,
    deductCredits,
    refundCredits,
    addCredits,
    loginDemoUser,
    logoutUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isInsufficientCreditsOpen,
    setIsInsufficientCreditsOpen,
    isDailyBonusModalOpen,
    setIsDailyBonusModalOpen,
  } = useUserCredits();

  // Generations history hook
  const {
    generations,
    addGeneration,
    deleteGeneration,
    toggleFavorite,
  } = useGenerationsHistory();

  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [authIsSignUp, setAuthIsSignUp] = useState(false);

  // Sync dark theme to <html>
  useEffect(() => {
    try {
      localStorage.setItem('cineflow_theme', isDarkMode ? 'dark' : 'light');
    } catch {}

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Provider Engine Toggle
  const handleToggleMockMode = () => {
    const nextMock = !isMockMode;
    setIsMockMode(nextMock);
    setVideoProvider(new UnifiedMediaProvider());
    showToast({
      type: 'info',
      title: nextMock ? 'Simulation Sandbox Mode' : 'Live Engine Mode Active',
      message: 'Gemini Omni Flash 1.1 & Sora models ready.',
    });
  };

  const handleOpenAuth = (isSignUp: boolean = false) => {
    setAuthIsSignUp(isSignUp);
    setIsAuthModalOpen(true);
  };

  const handleOpenPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetCredits = () => {
    addCredits(1000);
    showToast({
      type: 'info',
      title: 'Credits Refilled',
      message: 'Added 1,000 free bonus credits.',
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem('cineflow_generations_v2');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans transition-colors duration-200">
      {/* Sticky Glass Navbar */}
      <Navbar
        user={user}
        credits={credits}
        onOpenAuth={handleOpenAuth}
        onLogout={logoutUser}
        onOpenPricing={handleOpenPricing}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isMockMode={isMockMode}
        onToggleMockMode={handleToggleMockMode}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenDailyBonus={() => setIsDailyBonusModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userCredits={credits}
                streakDays={streakDays}
                rolloverCredits={rolloverCredits}
                daysRemaining={daysRemaining}
                onDeductCredits={deductCredits}
                onRefundCredits={refundCredits}
                onAddCredits={addCredits}
                generations={generations}
                onAddGeneration={addGeneration}
                onDeleteGeneration={deleteGeneration}
                onToggleFavorite={toggleFavorite}
                onOpenDailyBonus={() => setIsDailyBonusModalOpen(true)}
                isMockMode={isMockMode}
              />
            }
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Cookie / Session Cache Notice */}
      <CookieNotice />

      {/* Scroll-to-Top Floating Button */}
      <ScrollToTopButton />

      {/* Global Modals */}
      <DemoAuthModal
        isOpen={isAuthModalOpen}
        isSignUpDefault={authIsSignUp}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={loginDemoUser}
      />

      <InsufficientCreditsModal
        isOpen={isInsufficientCreditsOpen}
        onClose={() => setIsInsufficientCreditsOpen(false)}
        onRefillFreeCredits={() => {
          addCredits(1000);
          setIsInsufficientCreditsOpen(false);
          showToast({
            type: 'success',
            title: '+1,000 Free Credits Refilled',
            message: 'Your 2-year free license compute is replenished.',
          });
        }}
      />

      <DailyBonusModal
        isOpen={isDailyBonusModalOpen}
        onClose={() => setIsDailyBonusModalOpen(false)}
        onClaim={claimDailyCredits}
        credits={credits}
        streakDays={streakDays}
        rolloverCredits={rolloverCredits}
        daysRemaining={daysRemaining}
        licenseExpiry={licenseExpiry}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetCredits={handleResetCredits}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}
