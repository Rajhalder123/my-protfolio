import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  DollarSign, 
  Percent, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function FintechToolsHub({ onOpenCheckout }) {
  const [activeTab, setActiveTab] = useState('debt');

  // Tool 1: Debt Accelerator State
  const [debtBalance, setDebtBalance] = useState(18000);
  const [debtApr, setDebtApr] = useState(19.5);
  const [minPayment, setMinPayment] = useState(450);
  const [extraPayment, setExtraPayment] = useState(250);

  // Tool 2: Compound Wealth State
  const [startingPrincipal, setStartingPrincipal] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(15);
  const [annualReturn, setAnnualReturn] = useState(9.0);

  // Tool 3: Financial Health Audit State
  const [quizAnswers, setQuizAnswers] = useState({
    emergency: 2,
    debt: 1,
    budget: 2,
    investing: 1
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- Calculations for Tool 1 (Debt) ---
  const calculateDebt = () => {
    const monthlyRate = debtApr / 100 / 12;
    const totalMonthly = minPayment + extraPayment;
    
    // Check if payment covers interest
    const interestFirstMonth = debtBalance * monthlyRate;
    if (totalMonthly <= interestFirstMonth) {
      return { months: 999, totalInterest: 999999, interestSaved: 0, date: 'Never (Increase payment)' };
    }

    // Standard payoff (min payment only)
    let balMin = debtBalance;
    let monthsMin = 0;
    let interestMin = 0;
    while (balMin > 0 && monthsMin < 360) {
      const int = balMin * monthlyRate;
      interestMin += int;
      const prin = minPayment - int;
      balMin -= prin;
      monthsMin++;
    }

    // Accelerated payoff
    let balAcc = debtBalance;
    let monthsAcc = 0;
    let interestAcc = 0;
    while (balAcc > 0 && monthsAcc < 360) {
      const int = balAcc * monthlyRate;
      interestAcc += int;
      const prin = totalMonthly - int;
      balAcc -= prin;
      monthsAcc++;
    }

    const saved = Math.max(0, interestMin - interestAcc);
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthsAcc);

    return {
      months: monthsAcc,
      totalInterest: Math.round(interestAcc),
      interestSaved: Math.round(saved),
      payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
  };

  const debtResults = calculateDebt();

  // --- Calculations for Tool 2 (Compound Wealth) ---
  const calculateWealth = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    let futureValue = startingPrincipal * Math.pow(1 + r, n);
    for (let i = 1; i <= n; i++) {
      futureValue += monthlyContribution * Math.pow(1 + r, n - i);
    }
    const totalContributed = startingPrincipal + (monthlyContribution * n);
    const compoundGrowth = futureValue - totalContributed;

    return {
      totalValue: Math.round(futureValue),
      contributed: Math.round(totalContributed),
      growth: Math.round(compoundGrowth)
    };
  };

  const wealthResults = calculateWealth();

  // --- Calculations for Tool 3 (Financial Score) ---
  const calculateScore = () => {
    const scores = {
      emergency: [5, 12, 20, 25],
      debt: [5, 12, 20, 25],
      budget: [5, 12, 20, 25],
      investing: [5, 12, 20, 25]
    };
    const total = 
      scores.emergency[quizAnswers.emergency] +
      scores.debt[quizAnswers.debt] +
      scores.budget[quizAnswers.budget] +
      scores.investing[quizAnswers.investing];
    return total;
  };

  return (
    <section className="section-wrapper tools-hub-wrapper" id="tools">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} />
            Fintech Technology Engine
          </span>
          <h2 className="section-title">Interactive Quantitative &amp; FinTech Engine</h2>
          <p className="section-subtitle">
            Experience the proprietary financial calculation algorithms and planning tools built with precision full-stack engineering.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tool-tabs-bar">
          <button
            onClick={() => setActiveTab('debt')}
            className={`tool-tab-btn ${activeTab === 'debt' ? 'active' : ''}`}
          >
            <ShieldAlert size={18} />
            Debt Snowball / Avalanche Simulator
          </button>

          <button
            onClick={() => setActiveTab('wealth')}
            className={`tool-tab-btn ${activeTab === 'wealth' ? 'active' : ''}`}
          >
            <TrendingUp size={18} />
            Compound Wealth Projector
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`tool-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
          >
            <Calculator size={18} />
            2-Minute Financial Health Audit
          </button>
        </div>

        {/* TOOL 1: DEBT SIMULATOR */}
        {activeTab === 'debt' && (
          <div className="calculator-card">
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--ink)' }}>
                Debt-Free Timeline &amp; Interest Savings Engine
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Simulate how applying accelerated debt repayment algorithms cuts years off liabilities.
              </p>
            </div>

            <div className="calc-grid">
              {/* Sliders */}
              <div>
                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Total Debt Balance</span>
                    <span className="slider-value">${debtBalance.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="60000"
                    step="500"
                    value={debtBalance}
                    onChange={(e) => setDebtBalance(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Average APR Interest Rate</span>
                    <span className="slider-value">{debtApr}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    step="0.5"
                    value={debtApr}
                    onChange={(e) => setDebtApr(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Current Minimum Monthly Payment</span>
                    <span className="slider-value">${minPayment}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="25"
                    value={minPayment}
                    onChange={(e) => setMinPayment(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label" style={{ color: 'var(--brand)', fontWeight: 700 }}>
                      + Extra Accelerator Payment (From Coach Budget)
                    </span>
                    <span className="slider-value" style={{ color: 'var(--brand)' }}>
                      +${extraPayment}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>
              </div>

              {/* Calculated Results */}
              <div className="calc-result-box">
                <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand)' }}>
                  Projected Payoff Blueprint
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Estimated Debt-Free Date:</span>
                  <span className="calc-stat-num highlight">{debtResults.payoffDate}</span>
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Months to 100% Freedom:</span>
                  <span className="calc-stat-num">{debtResults.months} Months</span>
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Interest Saved with Accelerator:</span>
                  <span className="calc-stat-num highlight" style={{ color: '#4ade80' }}>
                    +${debtResults.interestSaved.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={onOpenCheckout}
                  className="btn btn-brand"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  Learn Module 1 Strategy ($79.99)
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: WEALTH COMPOUNDER */}
        {activeTab === 'wealth' && (
          <div className="calculator-card">
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--ink)' }}>
                Compound Wealth & Automated Net Worth Projector
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                See how smart, consistent investing taught in Module 2 turns modest monthly sums into lasting generational wealth.
              </p>
            </div>

            <div className="calc-grid">
              {/* Sliders */}
              <div>
                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Starting Investment</span>
                    <span className="slider-value">${startingPrincipal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={startingPrincipal}
                    onChange={(e) => setStartingPrincipal(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Monthly Contribution</span>
                    <span className="slider-value">${monthlyContribution}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="3000"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Time Horizon (Years)</span>
                    <span className="slider-value">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="35"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Expected Annual Return</span>
                    <span className="slider-value">{annualReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="14"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>
              </div>

              {/* Calculated Results */}
              <div className="calc-result-box">
                <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand)' }}>
                  Total Wealth Outcome
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Projected Portfolio Value:</span>
                  <span className="calc-stat-num highlight" style={{ fontSize: '1.75rem', color: '#4ade80' }}>
                    ${wealthResults.totalValue.toLocaleString()}
                  </span>
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Your Total Deposits:</span>
                  <span className="calc-stat-num">${wealthResults.contributed.toLocaleString()}</span>
                </div>

                <div className="calc-stat-row">
                  <span className="calc-stat-label">Free Compound Interest Growth:</span>
                  <span className="calc-stat-num highlight" style={{ color: '#facc15' }}>
                    +${wealthResults.growth.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={onOpenCheckout}
                  className="btn btn-brand"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  Master Wealth Building ($79.99)
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: 2-MINUTE FINANCIAL HEALTH AUDIT */}
        {activeTab === 'audit' && (
          <div className="calculator-card" style={{ maxWidth: '820px' }}>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--ink)' }}>
                2-Minute Financial Health Diagnostic
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Answer 4 quick baseline questions to identify your #1 financial bottleneck and tailored roadmap.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Question 1 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', fontSize: '0.95rem' }}>
                  1. How many months of emergency living expenses do you have saved in cash?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['0 Months (Living paycheck to paycheck)', '1-2 Months (Small buffer)', '3-6 Months (Standard safe zone)', '6+ Months (Fully fortified)'].map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, emergency: i })}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: quizAnswers.emergency === i ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                        background: quizAnswers.emergency === i ? 'var(--brand-light)' : '#ffffff',
                        fontWeight: quizAnswers.emergency === i ? 700 : 500,
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        color: 'var(--ink)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', fontSize: '0.95rem' }}>
                  2. What is your current high-interest debt status (Credit Cards, Personal Loans)?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['Overwhelming (> $15k)', 'Moderate ($5k - $15k)', 'Low (< $5k)', 'Zero (100% Debt-Free)'].map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, debt: i })}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: quizAnswers.debt === i ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                        background: quizAnswers.debt === i ? 'var(--brand-light)' : '#ffffff',
                        fontWeight: quizAnswers.debt === i ? 700 : 500,
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        color: 'var(--ink)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', fontSize: '0.95rem' }}>
                  3. How reliably do you track your monthly cash flow and expenses?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['No system / guessing', 'Occasional mental check', 'Monthly spreadsheet tracker', 'Automated system & zero leaks'].map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, budget: i })}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: quizAnswers.budget === i ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                        background: quizAnswers.budget === i ? 'var(--brand-light)' : '#ffffff',
                        fontWeight: quizAnswers.budget === i ? 700 : 500,
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        color: 'var(--ink)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', fontSize: '0.95rem' }}>
                  4. How active is your automated investing for long-term retirement?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['Haven’t started yet', 'Irregular contributions', 'Consistent 401(k) / IRA', 'Maxed diversified portfolio'].map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, investing: i })}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: quizAnswers.investing === i ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                        background: quizAnswers.investing === i ? 'var(--brand-light)' : '#ffffff',
                        fontWeight: quizAnswers.investing === i ? 700 : 500,
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        color: 'var(--ink)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Assessment Card */}
              <div style={{ background: 'var(--ink)', color: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '28px', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brand)', fontWeight: 700 }}>
                    Your Financial Health Index:
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 800, color: '#facc15' }}>
                    {calculateScore()}/100
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                    {calculateScore() < 50
                      ? 'Status: Vulnerable cashflow. Priority: Module 1 Debt-Free Game Plan.'
                      : calculateScore() < 75
                      ? 'Status: Balanced baseline. Priority: Module 3 Personalized Budget & Systems.'
                      : 'Status: Prime for acceleration. Priority: Module 2 Investing & Wealth Protection.'}
                  </div>
                </div>

                <button
                  onClick={onOpenCheckout}
                  className="btn btn-brand btn-lg"
                >
                  Unlock Your Personalized Course Plan
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
