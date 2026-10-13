import React from 'react';
import { siteData } from '../data/content';

export default function TrustStats() {
  const { stats } = siteData;

  return (
    <section className="section-wrapper section-wrapper--subtle" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">
                {stat.number}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
