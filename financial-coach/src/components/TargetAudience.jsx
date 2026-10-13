import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Users,
  CheckCircle2 
} from 'lucide-react';
import { siteData } from '../data/content';

export default function TargetAudience() {
  const { audience } = siteData;

  const iconMap = {
    'graduation-cap': GraduationCap,
    'briefcase': Briefcase,
    'trending-up': TrendingUp,
    'award': Award,
    'users': Users
  };

  return (
    <section className="section-wrapper section-wrapper--subtle" id="audience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Target Organizations</span>
          <h2 className="section-title">Who I Partner &amp; Engineer With</h2>
          <p className="section-subtitle">
            From regulated financial brokerages to fast-scaling trading applications, I engineer robust{' '}
            <strong style={{ color: 'var(--ink)' }}>CRM back-offices</strong> and{' '}
            <strong style={{ color: 'var(--brand)' }}>MetaTrader 5 integrations</strong> that operate with zero friction.
          </p>
        </div>

        <div className="audience-grid">
          {audience.map((item) => {
            const Icon = iconMap[item.icon] || CheckCircle2;
            return (
              <div key={item.id} className="audience-card">
                <div className="audience-icon">
                  <Icon size={28} />
                </div>
                <h3 className="audience-title">{item.title}</h3>
                <p className="audience-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
