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
          <div className="mf-card alt"><div className="mf-placeholder">Manage your saved credit cards here.</div></div>
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


