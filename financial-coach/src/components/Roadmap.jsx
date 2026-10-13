import React from 'react';
import { siteData } from '../data/content';

export default function Roadmap() {
  const { roadmap } = siteData;

  return (
    <section className="section-wrapper section-wrapper--white" id="roadmap">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Engineering Approach</span>
          <h2 className="section-title">From Requirements to Production</h2>
          <p className="section-subtitle">
            A disciplined execution framework applied across high-throughput FinTech CRM platforms, broker integrations, and autonomous applications.
          </p>
        </div>

        <div className="roadmap-grid">
          {roadmap.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
