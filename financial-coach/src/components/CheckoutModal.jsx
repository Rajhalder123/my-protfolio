import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Download, 
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [cardData, setCardData] = useState({
    name: 'Amanda Peterson',
    number: '•••• •••• •••• 4242',
    exp: '08/29',
    cvc: '884',
    zip: '10001'
  });

  if (!isOpen) return null;

  const basePrice = 79.99;
  const discountAmount = discountApplied ? 16.00 : 0.00;
  const finalPrice = (basePrice - discountAmount).toFixed(2);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TRANSFORM20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code. Try using "TRANSFORM20" for 20% off!');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      const generatedId = `FC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsCompleted(false);
    setDiscountApplied(false);
    setCouponCode('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} style={{ color: 'var(--brand)' }} />
            <h3>Secure Fintech Enrollment Checkout</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {!isCompleted ? (
            <div>
              {/* Product Summary */}
              <div style={{ background: 'var(--light-accent)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ color: 'var(--ink)', fontSize: '1.05rem', marginBottom: '4px' }}>
                      FinTech &amp; CRM Engineering Engagement (Consultation &amp; Architecture)
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      YoForex Acting CTO &amp; Full-Stack Specialist • Immediate / 15-Day Notice
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--ink)' }}>
                      ${finalPrice}
                    </div>
                    {discountApplied && (
                      <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 700 }}>
                        20% Off Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Coupon Code Section */}
              {!discountApplied ? (
                <form onSubmit={applyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. TRANSFORM20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-input"
                    style={{ flex: 1, padding: '8px 14px', fontSize: '0.88rem' }}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    <Tag size={14} />
                    Apply
                  </button>
                </form>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#065f46', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.86rem' }}>
                  <Sparkles size={16} />
                  <span>Promo <strong>TRANSFORM20</strong> applied! Saved $16.00.</span>
                </div>
              )}

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Payment Method</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'card' ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                      background: paymentMethod === 'card' ? 'var(--brand-light)' : '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <CreditCard size={16} />
                    Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'applepay' ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                      background: paymentMethod === 'applepay' ? 'var(--brand-light)' : '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}
                  >
                    Apple / Google Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'crypto' ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                      background: paymentMethod === 'crypto' ? 'var(--brand-light)' : '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}
                  >
                    Crypto / USDC
                  </button>
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handlePay}>
                <div className="form-group">
                  <label className="form-label">Cardholder Full Name</label>
                  <input
                    type="text"
                    required
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="form-label">Expires</label>
                    <input
                      type="text"
                      required
                      value={cardData.exp}
                      onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">CVC</label>
                    <input
                      type="text"
                      required
                      value={cardData.cvc}
                      onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={cardData.zip}
                      onChange={(e) => setCardData({ ...cardData, zip: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-brand btn-lg"
                  style={{ width: '100%', marginTop: '14px', fontSize: '1.05rem' }}
                >
                  {isProcessing ? 'Securing Transaction...' : `Pay $${finalPrice} & Join Cohort`}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--brand)' }} />
                  <span>256-Bit Bank-Grade Encryption • 30-Day Money-Back Guarantee</span>
                </div>
              </form>
            </div>
          ) : (
            /* Completed Screen */
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto' }}>
                <CheckCircle2 size={42} />
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '8px' }}>
                Welcome to the Cohort, {cardData.name}!
              </h3>

              <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', marginBottom: '22px' }}>
                Your enrollment is confirmed. We have granted you instant access to the Student Portal & Smart Budgeting Toolkit.
              </p>

              <div style={{ background: 'var(--light-accent)', padding: '18px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', fontSize: '0.88rem' }}>
                <div style={{ marginBottom: '6px' }}><strong>Order ID:</strong> #{orderId}</div>
                <div style={{ marginBottom: '6px' }}><strong>Program:</strong> Financial Coach 6-Week Masterclass</div>
                <div style={{ marginBottom: '6px' }}><strong>Amount Paid:</strong> ${finalPrice} (One-Time)</div>
                <div style={{ marginBottom: '6px' }}><strong>Start Date:</strong> May 22, 2027 (Course orientation)</div>
                <div><strong>Coach Access:</strong> Priority direct feedback unlocked</div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleReset}
                  className="btn btn-brand"
                  style={{ flex: 1 }}
                >
                  Enter Student Portal
                  <ExternalLink size={16} />
                </button>
                <button
                  onClick={() => alert(`Receipt #${orderId} downloaded successfully.`)}
                  className="btn btn-outline"
                >
                  <Download size={16} />
                  Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
