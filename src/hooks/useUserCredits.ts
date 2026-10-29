import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/video';

const STORAGE_KEY_USER = 'cineflow_user_free_v3';
const DAILY_CREDIT_AMOUNT = 1000;
const LICENSE_DAYS = 730; // 2 years
const LICENSE_EXPIRY = 'October 28, 2028';

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function calculateDaysDifference(dateStr1: string, dateStr2: string): number {
  try {
    const d1 = new Date(dateStr1).getTime();
    const d2 = new Date(dateStr2).getTime();
    const diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    return isNaN(diff) ? 0 : Math.max(0, diff);
  } catch {
    return 0;
  }
}

const INITIAL_DEMO_USER: User = {
  id: 'usr_free_2year_creator',
  name: 'Alex Mercer',
  email: 'alex.director@example.com',
  credits: 5000, // Starts with accumulated credits
  plan: 'pro',
  lastClaimDate: getTodayString(),
  streakDays: 3,
  rolloverCredits: 3000, // Rolled over from previous unused days
  licenseYears: 2,
  licenseExpiry: LICENSE_EXPIRY,
  daysRemaining: LICENSE_DAYS,
};

export function useUserCredits() {
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        const parsed = JSON.parse(stored);
        const today = getTodayString();
        const lastClaim = parsed.lastClaimDate || today;
        const daysPassed = calculateDaysDifference(lastClaim, today);

        let newCredits = parsed.credits || 5000;
        let newRollover = parsed.rolloverCredits || 0;
        let newStreak = parsed.streakDays || 1;

        // "na use hone per aur ho jana" -> Unused daily credits rollover & accumulate!
        if (daysPassed > 0) {
          const accumulatedMissedCredits = daysPassed * DAILY_CREDIT_AMOUNT;
          newCredits += accumulatedMissedCredits;
          newRollover += accumulatedMissedCredits;
          newStreak = daysPassed === 1 ? newStreak + 1 : 1;
        }

        return {
          ...parsed,
          credits: Math.max(newCredits, 1000),
          rolloverCredits: newRollover,
          streakDays: newStreak,
          lastClaimDate: today,
          plan: 'pro',
          licenseYears: 2,
          licenseExpiry: LICENSE_EXPIRY,
          daysRemaining: LICENSE_DAYS,
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isInsufficientCreditsOpen, setIsInsufficientCreditsOpen] = useState<boolean>(false);
  const [isDailyBonusModalOpen, setIsDailyBonusModalOpen] = useState<boolean>(false);
  const [hasClaimedToday, setHasClaimedToday] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {}
  }, [user]);

  // Completely free: deduction never blocks, and credits replenish automatically
  const deductCredits = useCallback((amount: number): boolean => {
    setUser((prev) => ({
      ...prev,
      credits: Math.max(0, prev.credits - amount),
    }));
    return true; // Always succeeds!
  }, []);

  const refundCredits = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + amount,
    }));
  }, []);

  const addCredits = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + amount,
      rolloverCredits: prev.rolloverCredits + amount,
    }));
  }, []);

  // Claim Daily 1,000 Credits + Streak Bonus
  const claimDailyCredits = useCallback(() => {
    const streakBonus = Math.min(500, user.streakDays * 50);
    const totalClaim = DAILY_CREDIT_AMOUNT + streakBonus;

    setUser((prev) => ({
      ...prev,
      credits: prev.credits + totalClaim,
      rolloverCredits: prev.rolloverCredits + totalClaim,
      lastClaimDate: getTodayString(),
      streakDays: prev.streakDays + 1,
    }));
    setHasClaimedToday(true);
    return totalClaim;
  }, [user.streakDays]);

  const loginDemoUser = useCallback((name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      credits: Math.max(prev.credits, 5000),
      plan: 'pro',
    }));
    setIsAuthModalOpen(false);
  }, []);

  const logoutUser = useCallback(() => {
    setUser({
      id: `usr_${Date.now()}`,
      name: 'Guest Creator',
      email: '',
      credits: 3000,
      plan: 'pro',
      lastClaimDate: getTodayString(),
      streakDays: 1,
      rolloverCredits: 2000,
      licenseYears: 2,
      licenseExpiry: LICENSE_EXPIRY,
      daysRemaining: LICENSE_DAYS,
    });
  }, []);

  return {
    user,
    credits: user.credits,
    streakDays: user.streakDays,
    rolloverCredits: user.rolloverCredits,
    daysRemaining: user.daysRemaining,
    licenseExpiry: user.licenseExpiry,
    hasClaimedToday,
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
    isUnlimitedFree: true,
  };
}
