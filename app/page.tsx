import { makeCode } from "../utils/code";

export const dynamic = "force-dynamic";

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

        <form className="name-form" method="get" action={`/session/${code}`}>
          <div className="name-fields">
            <label className="field">
              <span>Your name</span>
              <input name="you" type="text" defaultValue="You" />
            </label>
            <label className="field">
              <span>Their name</span>
              <input name="them" type="text" defaultValue="Them" />
            </label>
          </div>

          <button className="button primary" type="submit">
            Start movie night <span>→</span>
          </button>
        </form>
      </section>
    </main>
  );
}
