import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type OnboardingStep = {
    id: string;
    label: string;
    path: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
    { id: 'welcome', label: 'Select Tier & Apply', path: '/onboarding/infra-partner/welcome' },
    { id: 'documents', label: 'Upload Documents', path: '/onboarding/infra-partner/documents' },
    { id: 'pre-qualification', label: 'Pre-Qualification', path: '/onboarding/infra-partner/pre-qualification' },
    { id: 'select-territory', label: 'Select Territory', path: '/onboarding/infra-partner/select-territory' },
    { id: 'status', label: 'Application Status', path: '/onboarding/infra-partner/status' },
];

interface OnboardingContextType {
    currentStepIndex: number;
    completedSteps: string[];
    completeStep: (id: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (index: number) => void;
    onboardingData: any;
    updateData: (data: any) => void;
    qualifyTerritory: (id: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [onboardingData, setOnboardingData] = useState<any>({
        selectedTerritories: [],
        qualifiedTerritoryIds: [],
        isSubmitted: false,
        isTerritoryRequested: false
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Find current step based on path
    const currentStepIndex = ONBOARDING_STEPS.findIndex(step => {
        // Exact match or subpath (for territories which might be under onboarding)
        return location.pathname.startsWith(step.path);
    });

    const completeStep = (id: string) => {
        setCompletedSteps(prev => prev.includes(id) ? prev : [...prev, id]);
    };

    const nextStep = () => {
        if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
            const currentStep = ONBOARDING_STEPS[currentStepIndex];
            completeStep(currentStep.id);
            const nextStep = ONBOARDING_STEPS[currentStepIndex + 1];
            navigate(nextStep.path);
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            navigate(ONBOARDING_STEPS[currentStepIndex - 1].path);
        }
    };

    const setStep = (index: number) => {
        if (index >= 0 && index < ONBOARDING_STEPS.length) {
            navigate(ONBOARDING_STEPS[index].path);
        }
    };

    const updateData = (data: any) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
    };

    const qualifyTerritory = (id: string) => {
        setOnboardingData(prev => ({
            ...prev,
            isTerritoryRequested: true,
            qualifiedTerritoryIds: prev.qualifiedTerritoryIds.includes(id)
                ? prev.qualifiedTerritoryIds
                : [...prev.qualifiedTerritoryIds, id]
        }));
    };

    return (
        <OnboardingContext.Provider value={{
            currentStepIndex: currentStepIndex === -1 ? 0 : currentStepIndex,
            completedSteps,
            completeStep,
            nextStep,
            prevStep,
            setStep,
            onboardingData,
            updateData,
            qualifyTerritory
        }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}
