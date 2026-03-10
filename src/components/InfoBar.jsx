'use client';

export default function InfoBar() {
  return (
    <div className="info-bar-section">
      <div className="info-bar">
        {/* Card 1 – Personal Assessment (White) */}
        <div className="info-card card-left">
          <h3>Start your personalized<br/>path to natural balance</h3>
          <a href="#products">Personal Assessment &rarr;</a>
        </div>

        {/* Card 2 – Enhanced Formula (White center line) */}
        <div className="info-card card-center">
          <div className="info-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31" />
              <path d="M14 9.3V1.99" />
              <path d="M8.5 2h7" />
              <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
              <path d="M5.52 16h12.96" />
            </svg>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <p>
              Experience our<br/>newly enhanced<br/>natural formula
            </p>
            <div className="info-dots">
              <div className="info-dot active" />
              <div className="info-dot" />
              <div className="info-dot" />
              <div className="info-dot" />
            </div>
          </div>
        </div>

        {/* Card 3 – Social Proof (Black) */}
        <div className="info-card card-right">
          <div className="avatars-group">
             {/* Realistic avatars based on reference */}
             <img src="https://i.pravatar.cc/150?img=12" className="avatar-img" style={{zIndex: 4}} alt="User"/>
             <img src="https://i.pravatar.cc/150?img=5" className="avatar-img" style={{zIndex: 3}} alt="User"/>
             <img src="https://i.pravatar.cc/150?img=33" className="avatar-img" style={{zIndex: 2}} alt="User"/>
          </div>
          <div style={{ marginLeft: '16px' }}>
            <div className="info-stat-number">+14K</div>
            <div className="info-stat-text">People have already<br/>optimized their wellness</div>
          </div>
        </div>
      </div>
    </div>
  );
}
