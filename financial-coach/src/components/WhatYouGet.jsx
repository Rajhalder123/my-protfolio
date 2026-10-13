import React from 'react';
import { CheckCircle, PieChart, ShoppingBag, Target } from 'lucide-react';
import { siteData } from '../data/content';

export default function WhatYouGet() {
  const { outcomes } = siteData;

  const iconMap = {
    'check-circle': CheckCircle,
    'pie-chart': PieChart,
    'shopping-bag': ShoppingBag,
    'target': Target
  };

  return (
    <section className="section-wrapper section-wrapper--subtle">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Engineering Standards</span>
          <h2 className="section-title">What I Deliver to Every Engineering Team</h2>
          <p className="section-subtitle">
            Reliable distributed systems, sub-millisecond market feeds, strict server trust boundaries, and proactive ownership beyond just writing code.
          </p>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((item) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <div key={item.id} className="outcome-card">
                <div className="outcome-icon">
                  <Icon size={26} />
                </div>
                <h3 className="outcome-title">{item.title}</h3>
                <p className="outcome-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
