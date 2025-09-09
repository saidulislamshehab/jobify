import React, { useState } from 'react';
import './myfinances.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';

const TABS = [
  { id: 'movements', label: 'Account movements' },
  { id: 'cards', label: 'Credit cards' },
  { id: 'add-credit', label: 'Add credit' },
  { id: 'withdrawal', label: 'Withdrawal method' },
  { id: 'invoice', label: 'Invoice information' },
];

const MyFinances = () => {
  const [activeTab, setActiveTab] = useState('movements');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'movements':
        return (
          <div className="mf-card">
            <div className="mf-empty">
              <div className="mf-empty-left">
                <h2 className="mf-title">My account movements</h2>
                <div className="mf-info">
                  <div className="mf-info-item">
                    <div className="mf-bullet">✓</div>
                    <div className="mf-info-text">
                      Review in detail all your transactions within the platform, including your current balance.
                    </div>
                  </div>
                  <div className="mf-info-item">
                    <div className="mf-bullet">✓</div>
                    <div className="mf-info-text">
                      Filter transactions by date and export a copy in .CSV format.
                    </div>
                  </div>
                </div>
                <a href="/my-projects" className="mf-primary-btn">Go to my projects!</a>
              </div>
              <div className="mf-empty-illustration" aria-hidden="true">
                <div className="mf-illustration-laptop" />
              </div>
            </div>
          </div>
        );
      case 'cards':
        return (
          <div className="mf-card">
            <h2 className="mf-title">Associate a new credit card</h2>
            <div className="cc-wrap">
              <form
                className="cc-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="cc-field">
                  <label className="cc-label">Number</label>
                  <input
                    className="cc-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <div className="cc-field">
                  <label className="cc-label">Name and last name</label>
                  <input
                    className="cc-input"
                    type="text"
                    placeholder="As it appears on the card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="cc-row">
                  <div className="cc-field">
                    <label className="cc-label">Expiration</label>
                    <input
                      className="cc-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="cc-field">
                    <label className="cc-label">Security code</label>
                    <div className="cc-cvv-wrap">
                      <input
                        className="cc-input"
                        type="password"
                        inputMode="numeric"
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                      <span className="cc-cvv-info" title="3 or 4 digits on your card" />
                    </div>
                  </div>
                </div>

                <div className="cc-actions">
                  <button type="submit" className="mf-primary-btn cc-next">Next</button>
                </div>
              </form>

              <div className="cc-preview" aria-hidden="true">
                <div className="cc-card">
                  <div className="cc-chip" />
                  <div className="cc-number">
                    {(cardNumber || '•••• •••• •••• ••••').replace(/(\d{4})(?=\d)/g, '$1 ')}
                  </div>
                  <div className="cc-footer">
                    <div className="cc-exp">
                      <div className="cc-label-mini">MM/YY</div>
                      <div>{cardExpiry || 'MM/YY'}</div>
                    </div>
                    <div className="cc-name">{cardName || 'NAME LAST NAME'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'add-credit':
        return (
          <div className="mf-card alt"><div className="mf-placeholder">Add funds to your account balance.</div></div>
        );
      case 'withdrawal':
        return (
          <div className="mf-card alt"><div className="mf-placeholder">Set up how you want to get paid.</div></div>
        );
      case 'invoice':
        return (
          <div className="mf-card alt"><div className="mf-placeholder">Configure your billing and invoice details.</div></div>
        );
      default:
        return null;
    }
  };

  // get user from storage only to show name in the nav, similar to dashboard
  let user = null;
  try {
    const u = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (u) user = JSON.parse(u);
  } catch {}

  return (
    <div className="mf-page">
      <DashboardNav user={user} />

      <div className="mf-container">
        <div className="mf-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`mf-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>

      <button className="mf-help-btn">❓ Help</button>
      <Footer />
    </div>
  );
};

export default MyFinances;


