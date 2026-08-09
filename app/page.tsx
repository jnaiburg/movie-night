import Link from "next/link";
import { makeCode } from "../utils/code";

export default function Home() {
  const code = makeCode();
  return (
    <main className="landing">
      <div className="film-strip" aria-hidden="true" />
      <section className="hero">
        <h1>
          What are we
          <br />
          <em>watching?</em>
        </h1>
        <p className="lede">Bring your three picks. Rank the six. Let the movie gods decide.</p>
        <Link className="button primary" href={`/session/${code}`}>
          Start movie night <span>→</span>
        </Link>
      </section>
    </main>
  );
}
