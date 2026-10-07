export default function WorldScene({ onNavigate, onBack }) {
  return (
    <main className="world-scene">
      <div className="world-sky" />
      <div className="world-mountains" />
      <div className="world-ground" />
      <div className="world-fog" />

      <header className="world-header">
        <button className="world-brand" onClick={onBack}>THE CHRONICLES OF<br /><strong>ANANDI RAGHAVI</strong></button>
        <span>THE REALM</span>
      </header>

      <section className="guide-card">
        <div className="guide-portrait">⚔</div>
        <p className="eyebrow">WELCOME, TRAVELLER</p>
        <h1>Choose your path.</h1>
        <p>Explore the armory, read the chronicles, or visit the hall where the work of the journey is kept.</p>
      </section>

      <div className="realm-paths">
        <button onClick={() => onNavigate('armory')}><span>⚔</span><strong>ARMORY</strong><small>Skills & technologies</small></button>
        <button onClick={() => onNavigate('chronicles')}><span>📖</span><strong>CHRONICLES</strong><small>Education & experience</small></button>
        <button onClick={() => onNavigate('hall')}><span>🏆</span><strong>HALL OF FAME</strong><small>Projects & achievements</small></button>
        <button onClick={() => onNavigate('guild')}><span>🛡</span><strong>THE GUILD</strong><small>Awards & leadership</small></button>
      </div>
    </main>
  );
}
