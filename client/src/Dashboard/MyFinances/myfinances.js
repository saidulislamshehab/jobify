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
  const [addCurrency, setAddCurrency] = useState('USD');
  const [addAmount, setAddAmount] = useState('');
  const [addMethod, setAddMethod] = useState('card');
  const [withdrawMethod, setWithdrawMethod] = useState('payoneer');
  const [withdrawThresholdEnabled, setWithdrawThresholdEnabled] = useState(false);
  const [withdrawThreshold, setWithdrawThreshold] = useState('Pay me regardless of the amount');
  const [withdrawSchedule, setWithdrawSchedule] = useState('');
  const [invoiceLegalName, setInvoiceLegalName] = useState('');
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [invoiceCity, setInvoiceCity] = useState('');
  const [invoiceCountry, setInvoiceCountry] = useState('Bangladesh');
  const [invoiceTaxId, setInvoiceTaxId] = useState('');
  const [invoiceZipCode, setInvoiceZipCode] = useState('');
  const [invoiceState, setInvoiceState] = useState('');

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
          <div className="mf-card">
            <h2 className="mf-title">Add credit to my account</h2>
            <div className="ac-grid">
              <div>
                <div className="cc-field">
                  <label className="cc-label">Amount</label>
                  <div className="ac-amount">
                    <select className="ac-currency" value={addCurrency} onChange={(e)=>setAddCurrency(e.target.value)}>
                      <option value="USD">USD</option>
                    </select>
                    <input className="ac-input" type="number" min="0" step="1" placeholder="0" value={addAmount} onChange={(e)=>setAddAmount(e.target.value)} />
                  </div>
                </div>

                <div className="ac-methods">
                  <label className="ac-method">
                    <input type="radio" name="add-method" checked={addMethod==='card'} onChange={()=>setAddMethod('card')} />
                    <div className="ac-method-box">
                      <div className="ac-method-title">Credit card in U.S. dollars <span className="ac-pill">Suggested</span></div>
                      <div className="ac-logos">
                        <span className="logo visa" />
                        <span className="logo mc" />
                        <span className="logo amex" />
                      </div>
                    </div>
                  </label>

                  <label className="ac-method">
                    <input type="radio" name="add-method" checked={addMethod==='paypal'} onChange={()=>setAddMethod('paypal')} />
                    <div className="ac-method-box">
                      <div className="ac-method-title">Paypal</div>
                      <div className="ac-logos"><span className="logo paypal" /></div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="ac-summary">
                <div className="ac-summary-box">
                  <div className="ac-summary-title">Amount to add</div>
                  <div className="ac-summary-value">{addCurrency} {Number(addAmount||0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'withdrawal':
        return (
          <div className="mf-card">
            <h2 className="mf-title">Set up your withdrawal methods</h2>

            <div className="wm-info">
              <div className="wm-info-title">Do you need more info?</div>
              <button className="wm-help">Visit our Help Center</button>
            </div>
            <div className="wm-note">Important: Regardless of which method you choose to be paid with, Jobify will not add any extra fees to the specified amounts.</div>

            <div className="wm-option">
              <label className="wm-radio">
                <input type="radio" name="withdraw" checked={withdrawMethod==='payoneer'} onChange={()=>setWithdrawMethod('payoneer')} />
                <div className="wm-box">
                  <div className="wm-title">International Bank Transfer + International Debit Card</div>
                  <div className="wm-provider">Payoneer</div>
                </div>
              </label>
              <button className="wm-cta">Sign up</button>
            </div>

            <div className="wm-option">
              <label className="wm-radio">
                <input type="radio" name="withdraw" checked={withdrawMethod==='paypal'} onChange={()=>setWithdrawMethod('paypal')} />
                <div className="wm-box">
                  <div className="wm-title">Receive your payments into your PayPal account</div>
                  <div className="wm-provider">PayPal</div>
                </div>
              </label>
              <button className="wm-cta">Sign up</button>
            </div>

            <div className="wm-card">
              <div className="wm-card-title">Do not withdraw my balance unless the amount exceeds...</div>
              <label className="wm-toggle">
                <input type="checkbox" checked={withdrawThresholdEnabled} onChange={(e)=>setWithdrawThresholdEnabled(e.target.checked)} />
                <span>Enable threshold</span>
              </label>
              <select className="wm-select" value={withdrawThreshold} onChange={(e)=>setWithdrawThreshold(e.target.value)}>
                <option>Pay me regardless of the amount</option>
                <option>USD 50</option>
                <option>USD 100</option>
                <option>USD 250</option>
              </select>
              <div className="wm-small">Important: If you select an amount, you will only be able to withdraw your funds once your balance reaches this amount. The minimum applies only for monthly and biweekly payments, not for weekly payments.</div>
            </div>

            <div className="wm-card">
              <div className="wm-card-title">Specify when you want to withdraw your funds:</div>
              <div className="wm-schedule">
                <label className="wm-schedule-item">
                  <input type="radio" name="schedule" checked={withdrawSchedule==='beginning'} onChange={()=>setWithdrawSchedule('beginning')} />
                  <span>Beginning of the month (between the 1st and 5th)</span>
                </label>
                <label className="wm-schedule-item">
                  <input type="radio" name="schedule" checked={withdrawSchedule==='middle'} onChange={()=>setWithdrawSchedule('middle')} />
                  <span>Middle of the month (between the 15th and 20th)</span>
                </label>
                <label className="wm-schedule-item">
                  <input type="radio" name="schedule" checked={withdrawSchedule==='weekly'} onChange={()=>setWithdrawSchedule('weekly')} />
                  <span>Weekly (every Wednesday)</span>
                </label>
              </div>
            </div>

            <div className="wm-actions">
              <button className="wm-cancel">Cancel</button>
              <button className="wm-save">Save changes</button>
            </div>
          </div>
        );
      case 'invoice':
        return (
          <div className="mf-card">
            <h2 className="mf-title">Invoice information</h2>
            <p className="invoice-description">
              This information will be used for the receipts generated for your clients, as well as for the receipts you download from Jobify.
            </p>
            
            <form className="invoice-form" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="invoice-grid">
                <div className="invoice-column">
                  <div className="cc-field">
                    <label className="cc-label">Legal name</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="Legal name"
                      value={invoiceLegalName}
                      onChange={(e) => setInvoiceLegalName(e.target.value)}
                    />
                  </div>
                  
                  <div className="cc-field">
                    <label className="cc-label">Legal address</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="Legal address"
                      value={invoiceAddress}
                      onChange={(e) => setInvoiceAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="cc-field">
                    <label className="cc-label">City</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="City"
                      value={invoiceCity}
                      onChange={(e) => setInvoiceCity(e.target.value)}
                    />
                  </div>
                  
                  <div className="cc-field">
                    <label className="cc-label">Country</label>
                    <select
                      className="cc-input"
                      value={invoiceCountry}
                      onChange={(e) => setInvoiceCountry(e.target.value)}
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>
                
                <div className="invoice-column">
                  <div className="cc-field">
                    <label className="cc-label">Tax ID</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="Tax ID"
                      value={invoiceTaxId}
                      onChange={(e) => setInvoiceTaxId(e.target.value)}
                    />
                  </div>
                  
                  <div className="cc-field">
                    <label className="cc-label">Zip code</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="Zip code"
                      value={invoiceZipCode}
                      onChange={(e) => setInvoiceZipCode(e.target.value)}
                    />
                  </div>
                  
                  <div className="cc-field">
                    <label className="cc-label">State</label>
                    <input
                      className="cc-input"
                      type="text"
                      placeholder="State"
                      value={invoiceState}
                      onChange={(e) => setInvoiceState(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="invoice-actions">
                <button type="submit" className="invoice-save-btn">Save</button>
              </div>
            </form>
          </div>
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


