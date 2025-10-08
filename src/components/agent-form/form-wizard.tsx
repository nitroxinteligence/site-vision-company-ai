"use client";

import React, { useState, ReactElement, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GlobalStyles } from "./form-styles";
import { ProgressBar } from "./progress-bar";
import { FormData } from './form-types';

export interface StepComponentProps {
  onSave: (data: Partial<FormData>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormData;
  clientName?: string;
}

interface FormWizardProps {
  children?: ReactElement<StepComponentProps>[];
  initialStep?: number;
  onComplete?: () => void;
  formData: FormData;
  clientName?: string;
}

export function FormWizard({
  children,
  initialStep = 1,
  onComplete,
  formData,
  clientName,
}: FormWizardProps) {
  const childrenArray = React.Children.toArray(children);
  const totalSteps = childrenArray.length;
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderCurrentStep = () => {
    const component = childrenArray[currentStep - 1] as ReactElement<StepComponentProps>;
    if (React.isValidElement(component)) {
      return React.cloneElement(component, {
        ...component.props,
        onNext: nextStep,
        formData: formData,
        clientName: clientName,
      });
    }
    return component;
  };

  const triggerSubmit = () => {
    const form = document.getElementById("form-wizard-form");
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", position: "relative", paddingBottom: "60px" }}>
      <GlobalStyles />
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {renderCurrentStep()}
      </div>
      
      <div className="footer-nav">
        <div className="footer-nav-content">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderColor: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", borderRadius: "20px", padding: "0 1.5rem", fontWeight: "500", fontSize: "0.9rem", height: "38px" }}>
              <ChevronLeft size={16} /> Anterior
            </Button>
          )}
          
          <Button onClick={triggerSubmit} style={{ marginLeft: currentStep > 1 ? "auto" : "0", display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ffffff", color: "black", borderRadius: "20px", padding: "0 1.5rem", fontWeight: "500", fontSize: "0.9rem", height: "38px" }}>
            {currentStep < totalSteps ? "Próximo" : "Finalizar"} <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
