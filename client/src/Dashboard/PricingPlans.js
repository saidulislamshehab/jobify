import React, { useState } from 'react';
import './PricingPlans.css';

const PricingPlans = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState('quarterly'); // 'monthly' or 'quarterly'

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      description: 'For those who prefer to focus on one project at a time.',
      price: 'Free',
      originalPrice: null,
      features: [
        '2 weekly contacts',
        '1 ongoing projects',
        'Withdraw your earnings at the beginning of the month'
      ],
      isCurrent: true,
      buttonText: 'My current plan'
    },
    {
      name: 'Beginner',
      description: 'For people looking for occasional side projects.',
      price: billingCycle === 'quarterly' ? 'USD 3.92' : 'USD 4.00',
      originalPrice: billingCycle === 'quarterly' ? 'USD 4.00' : null,
      features: [
        'Everything in the Free Plan, plus:',
        '5 skills listed on your profile',
        '7 weekly contacts',
        '2 ongoing projects',
        'Withdraw your funds in the middle of the month'
      ],
      isCurrent: false,
      buttonText: 'Select the Beginner Plan'
    },
    {
      name: 'Professional',
      description: 'For people looking for occasional side projects.',
      price: billingCycle === 'quarterly' ? 'USD 13.52' : 'USD 16.00',
      originalPrice: billingCycle === 'quarterly' ? 'USD 16.00' : null,
      features: [
        'Everything in the Beginner Plan, plus:',
        '17 weekly contacts',
        '5 ongoing projects',
        'Make and accept video calls',
        'Weekly withdrawals'
      ],
      isCurrent: false,
      buttonText: 'Select the Professional Plan'
    },
    {
      name: 'Explorer',
      description: 'For freelancers looking to significantly expand their project portfolio.',
      price: billingCycle === 'quarterly' ? 'USD 19.92' : 'USD 24.00',
      originalPrice: billingCycle === 'quarterly' ? 'USD 24.00' : null,
      features: [
        'Everything in the Professional Plan, plus:',
        'Higher plan badge',
        'See what other freelancers are working on',
        'Make and accept video calls',
        'Priority support',
        '52 weekly contacts',
        'Unlimited ongoing projects',
        'Weekly withdrawals'
      ],
      isCurrent: false,
      buttonText: 'Select the Explorer Plan'
    }
  ];

  return (
    <div className="pricing-overlay" onClick={onClose}>
      <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pricing-header">
          <h2 className="pricing-title">A plan for each stage of your professional career</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="billing-toggle">
          <div className="billing-options">
            <label className="billing-option">
              <input
                type="radio"
                name="billing"
                value="monthly"
                checked={billingCycle === 'monthly'}
                onChange={(e) => setBillingCycle(e.target.value)}
              />
              <span>Monthly billing</span>
            </label>
            <label className="billing-option">
              <input
                type="radio"
                name="billing"
                value="quarterly"
                checked={billingCycle === 'quarterly'}
                onChange={(e) => setBillingCycle(e.target.value)}
              />
              <span>Quarterly billing</span>
              {billingCycle === 'quarterly' && (
                <span className="discount-badge">20% discount</span>
              )}
            </label>
          </div>
        </div>

        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div key={plan.name} className={`pricing-card ${plan.isCurrent ? 'current-plan' : ''}`}>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-pricing">
                {plan.originalPrice && (
                  <span className="original-price">{plan.originalPrice}</span>
                )}
                <span className="current-price">{plan.price}</span>
                {plan.price !== 'Free' && (
                  <span className="billing-period">/month</span>
                )}
                {plan.price !== 'Free' && (
                  <span className="billing-frequency">Billed on a quarterly basis</span>
                )}
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <span className="checkmark">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`plan-button ${plan.isCurrent ? 'current-plan-btn' : 'select-plan-btn'}`}
                disabled={plan.isCurrent}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
