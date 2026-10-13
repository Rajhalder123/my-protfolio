import React from 'react';

export default function AnnouncementBar({ onOpenCheckout }) {
  return (
    <aside className="announcement-bar" aria-label="Professional Status Announcement">
      <div className="announcement-content">
        <span className="announcement-badge">PRODUCTION ACTIVE</span>
        <span>
          Full-Stack Engineer &amp; Acting CTO Responsibilities at <strong>YoForex</strong> · Open for FinTech &amp; CRM engineering roles
        </span>
        <button
          onClick={onOpenCheckout}
          className="btn btn-brand btn-sm"
          style={{ padding: '4px 14px', fontSize: '0.78rem' }}
        >
          Let's Connect
        </button>
      </div>
    </aside>
  );
}
