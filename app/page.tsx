import Link from "next/link";

function makeCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function Home() {
  const code = makeCode();
  return (
    <main className="landing">
      <div className="film-strip" aria-hidden="true" />
      <section className="hero">
        <p className="eyebrow">A date-night decision maker</p>
        <h1>What are we<br /><em>watching?</em></h1>
        <p className="lede">Bring your three picks. Rank the six. Let the movie gods decide.</p>
        <Link className="button primary" href={`/session/${code}`}>Start movie night <span>→</span></Link>
        <p className="hint">No accounts. Just share the link with your favorite person.</p>
      </section>
      <div className="reel" aria-hidden="true">✦ &nbsp; ◉ &nbsp; ✦ &nbsp; ◉ &nbsp; ✦</div>
    </main>
  );
}
