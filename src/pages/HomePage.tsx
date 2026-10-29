import { useState } from 'react';
import { Hero } from '../components/Hero';
import { GeneratorTool } from '../components/GeneratorTool';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { ShowcaseGallery } from '../components/ShowcaseGallery';
import { UseCases } from '../components/UseCases';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { CtaBanner } from '../components/CtaBanner';
import { EarlyAccessModal, TopUpModal } from '../components/Modals';
import { PricingPlan, CreditTopUp } from '../data/mockData';
import { Generation } from '../types/video';
import { useToast } from '../components/Toast';

interface HomePageProps {
  userCredits: number;
  streakDays?: number;
  rolloverCredits?: number;
  daysRemaining?: number;
  onDeductCredits: (amount: number) => boolean;
  onRefundCredits: (amount: number) => void;
  onAddCredits: (amount: number) => void;
  generations: Generation[];
  onAddGeneration: (video: Generation) => void;
  onDeleteGeneration: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenDailyBonus?: () => void;
  isMockMode: boolean;
}

export function HomePage({
  userCredits,
  streakDays = 3,
  rolloverCredits = 3000,
  daysRemaining = 730,
  onDeductCredits,
  onRefundCredits,
  onAddCredits,
  generations,
  onAddGeneration,
  onDeleteGeneration,
  onToggleFavorite,
  onOpenDailyBonus,
  isMockMode,
}: HomePageProps) {
  const { showToast } = useToast();
  const [earlyAccessPlan, setEarlyAccessPlan] = useState<PricingPlan | null>(null);
  const [activeTopUp, setActiveTopUp] = useState<CreditTopUp | null>(null);

  const handleScrollToGenerator = () => {
    const el = document.getElementById('generator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToShowcase = () => {
    const el = document.getElementById('showcase');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUsePromptInGenerator = (prompt: string) => {
    handleScrollToGenerator();
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = prompt;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    showToast({
      type: 'info',
      title: 'Prompt Loaded Into Studio',
      message: 'Configure your parameters and synthesize.',
    });
  };

  const handleConfirmTopUp = (credits: number) => {
    onAddCredits(credits);
    setActiveTopUp(null);
    showToast({
      type: 'success',
      title: `+${credits} Credits Added!`,
      message: 'Your compute balance has been updated.',
    });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <Hero
        onStartGenerating={handleScrollToGenerator}
        onWatchExamples={handleScrollToShowcase}
      />

      {/* 2. The Core Generator Tool (46% Left, 54% Right) */}
      <GeneratorTool
        userCredits={userCredits}
        streakDays={streakDays}
        rolloverCredits={rolloverCredits}
        daysRemaining={daysRemaining}
        onDeductCredits={onDeductCredits}
        onRefundCredits={onRefundCredits}
        generations={generations}
        onAddGeneration={onAddGeneration}
        onDeleteGeneration={onDeleteGeneration}
        onToggleFavorite={onToggleFavorite}
        onOpenDailyBonus={onOpenDailyBonus}
        isMockMode={isMockMode}
      />

      {/* 3. Features Section (6 Cards 3x2 Grid) */}
      <Features />

      {/* 4. How It Works (3 Steps) */}
      <HowItWorks onGoToGenerator={handleScrollToGenerator} />

      {/* 5. Showcase Gallery (9 Videos, Autoplay on Hover, Lightbox) */}
      <ShowcaseGallery onUsePrompt={handleUsePromptInGenerator} />

      {/* 6. Use Cases (Vertical Tabs / Mobile Accordion) */}
      <UseCases onUsePrompt={handleUsePromptInGenerator} />

      {/* 7. Pricing (Monthly/Yearly, 3 Tiers, Top-up Row) */}
      <Pricing
        onSelectPlan={(plan) => setEarlyAccessPlan(plan)}
        onTopUpCredits={(topup) => setActiveTopUp(topup)}
      />

      {/* 8. Testimonials (3 Creator Cards) */}
      <Testimonials />

      {/* 9. FAQ (10 Accordion Items) */}
      <FAQ />

      {/* 10. Final Call to Action Banner */}
      <CtaBanner onStartGenerating={handleScrollToGenerator} />

      {/* Modals */}
      <EarlyAccessModal
        isOpen={earlyAccessPlan !== null}
        planName={earlyAccessPlan?.name || 'Creator Plan'}
        onClose={() => setEarlyAccessPlan(null)}
        onAwardBonusCredits={onAddCredits}
      />

      <TopUpModal
        topup={activeTopUp}
        onClose={() => setActiveTopUp(null)}
        onConfirm={handleConfirmTopUp}
      />
    </>
  );
}
