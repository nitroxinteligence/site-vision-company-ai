"use client";

import React from 'react';
import styled from 'styled-components';

interface NeonCheckboxProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}

const NeonCheckbox = ({ checked, onCheckedChange, id }: NeonCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <StyledWrapper>
      <label className="neon-checkbox">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={handleChange}
          id={id}
        />
        <div className="neon-checkbox__frame">
          <div className="neon-checkbox__box">
            <div className="neon-checkbox__check-container">
              <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                <path d="M3,12.5l7,7L21,5" />
              </svg>
            </div>
            <div className="neon-checkbox__glow" />
            <div className="neon-checkbox__borders">
              <span /><span /><span /><span />
            </div>
          </div>
          <div className="neon-checkbox__effects">
            <div className="neon-checkbox__particles">
              <span /><span /><span /><span /> <span /><span /><span /><span /> <span /><span /><span /><span />
            </div>
            <div className="neon-checkbox__rings">
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
            </div>
            <div className="neon-checkbox__sparks">
              <span /><span /><span /><span />
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .neon-checkbox {
    --primary: #ffffff;
    --primary-dark: #2ac854;
    --primary-light: #8cff9b;
    --size: 30px;
    position: relative;
    width: var(--size);
    height: var(--size);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
  }

  .neon-checkbox input {
    display: none;
  }

  .neon-checkbox__frame {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .neon-checkbox__box {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    border: 2px solid var(--primary-dark);
    transition: all 0.4s ease;
  }

  .neon-checkbox__check-container {
    position: absolute;
    inset: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .neon-checkbox__check {
    width: 80%;
    height: 80%;
    fill: none;
    stroke: var(--primary);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    transform-origin: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .neon-checkbox__glow {
    position: absolute;
    inset: -2px;
    border-radius: 6px;
    background: var(--primary);
    opacity: 0;
    filter: blur(8px);
    transform: scale(1.2);
    transition: all 0.4s ease;
  }

  .neon-checkbox__borders {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    overflow: hidden;
  }

  .neon-checkbox__borders span {
    position: absolute;
    width: 40px;
    height: 1px;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .neon-checkbox__borders span:nth-child(1) {
    top: 0;
    left: -100%;
    animation: borderFlow1 2s linear infinite;
  }

  .neon-checkbox__borders span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 1px;
    height: 40px;
    animation: borderFlow2 2s linear infinite;
  }

  .neon-checkbox__borders span:nth-child(3) {
    bottom: 0;
    right: -100%;
    animation: borderFlow3 2s linear infinite;
  }

  .neon-checkbox__borders span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 1px;
    height: 40px;
    animation: borderFlow4 2s linear infinite;
  }

  .neon-checkbox__effects {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .neon-checkbox__particles {
    position: absolute;
    inset: 0;
  }

  .neon-checkbox__particles span {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 6px var(--primary);
  }

  .neon-checkbox__rings {
    position: absolute;
    inset: -20px;
    pointer-events: none;
  }

  .neon-checkbox__rings .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid var(--primary);
    opacity: 0;
    transform: scale(0);
  }

  .neon-checkbox__sparks {
    position: absolute;
    inset: 0;
  }

  .neon-checkbox__sparks span {
    position: absolute;
    width: 20px;
    height: 1px;
    background: linear-gradient(90deg, var(--primary), transparent);
    opacity: 0;
  }

  /* Hover Effects */
  .neon-checkbox:hover .neon-checkbox__box {
    border-color: var(--primary);
    transform: scale(1.05);
  }

  /* Checked State */
  .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__box {
    border-color: var(--primary);
    background: rgba(88, 232, 119, 0.1);
  }

  .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__check {
    stroke-dashoffset: 0;
    transform: scale(1.1);
  }

  .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__glow {
    opacity: 0.2;
  }

  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__borders
    span {
    opacity: 1;
  }

  /* Particle Animations */
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__particles
    span {
    animation: particleExplosion 0.6s ease-out forwards;
  }

  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__rings
    .ring {
    animation: ringPulse 0.6s ease-out forwards;
  }

  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__sparks
    span {
    animation: sparkFlash 0.6s ease-out forwards;
  }

  /* Staggered Animations */
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__particles
    span:nth-child(1) {
    animation-delay: 0s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__particles
    span:nth-child(2) {
    animation-delay: 0.05s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__particles
    span:nth-child(3) {
    animation-delay: 0.1s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__particles
    span:nth-child(4) {
    animation-delay: 0.15s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__rings
    .ring:nth-child(1) {
    animation-delay: 0s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__rings
    .ring:nth-child(2) {
    animation-delay: 0.1s;
  }
  .neon-checkbox
    input:checked
    ~ .neon-checkbox__frame
    .neon-checkbox__rings
    .ring:nth-child(3) {
    animation-delay: 0.2s;
  }

  /* Animation Keyframes */
  @keyframes particleExplosion {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%)
        translateX(
          calc(
            (var(--size) * 1.5) * cos(calc(var(--i, 0) * 1turn / 12))
          )
        )
        translateY(
          calc(
            (var(--size) * 1.5) * sin(calc(var(--i, 0) * 1turn / 12))
          )
        );
      opacity: 0;
    }
  }

  @keyframes ringPulse {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 0.35;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @keyframes sparkFlash {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(calc(var(--i, 0) * 90deg));
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%)
        translateX(calc(var(--size) * 0.75))
        rotate(calc(var(--i, 0) * 90deg));
    }
  }

  @keyframes borderFlow1 {
    0% {
      left: -100%;
    }
    50%, 100% {
      left: 100%;
    }
  }

  @keyframes borderFlow2 {
    0% {
      top: -100%;
    }
    50%, 100% {
      top: 100%;
    }
  }

  @keyframes borderFlow3 {
    0% {
      right: -100%;
    }
    50%, 100% {
      right: 100%;
    }
  }

  @keyframes borderFlow4 {
    0% {
      bottom: -100%;
    }
    50%, 100% {
      bottom: 100%;
    }
  }
`;

export default NeonCheckbox;