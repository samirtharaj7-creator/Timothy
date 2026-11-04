/* eslint-disable @next/next/no-html-link-for-pages -- Full document navigation is intentional for the static Pages export. */

import {
  ArrowRight,
  BookOpen,
  BookOpenCheck
} from "lucide-react";

const studyActions = [
  {
    title: "Introduction",
    href: "/background/",
    description: "Explore Timothy, the church at Ephesus, Paul's final years, and the setting of both letters.",
    icon: BookOpenCheck
  },
  {
    title: "1 Timothy",
    href: "/1-timothy/1/",
    description: "Read the six-chapter study of sound doctrine, prayer, worthy leaders, godliness, and contentment.",
    icon: BookOpen
  },
  {
    title: "2 Timothy",
    href: "/2-timothy/1/",
    description: "Read the four-chapter study of courage, suffering, the inspired Scriptures, and finishing the race.",
    icon: BookOpen
  }
] as const;

const bookPlans = [
  {
    id: "1-timothy",
    slug: "1-timothy",
    eyebrow: "First Letter to Timothy · Six Chapters",
    title: "1 Timothy",
    chapterCount: 6
  },
  {
    id: "2-timothy",
    slug: "2-timothy",
    eyebrow: "Second Letter to Timothy · Four Chapters",
    title: "2 Timothy",
    chapterCount: 4
  }
] as const;

export function HeroSection() {
  return (
    <section className="home-showcase">
      <div className="home-showcase-shell">
        <section className="home-showcase-hero" aria-labelledby="home-title">
          <div className="home-showcase-copy">
            <p className="home-title-prefix">The Letters to</p>
            <h1 id="home-title">Timothy</h1>
            <p className="home-showcase-description">
              {"Enter Paul's letters to his son in the faith, where sound teaching, faithful leadership, godly living, and courage under suffering take shape in the church at Ephesus and in Paul's last words from a Roman prison."}
            </p>
            <div className="home-showcase-actions">
              <a href="/1-timothy/1/" className="home-showcase-primary">
                Explore 1 Timothy
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/2-timothy/1/" className="home-showcase-secondary">
                Explore 2 Timothy
              </a>
              <a href="/background/" className="home-showcase-secondary">
                Read the Introduction
              </a>
            </div>
          </div>
        </section>

        <section className="home-action-grid" aria-label="Primary study paths">
          {studyActions.map((action) => {
            const Icon = action.icon;
            return (
              <a key={action.href} href={action.href} className="home-action-card">
                <span className="home-action-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <strong>{action.title}</strong>
                <span>{action.description}</span>
                <em>
                  Open
                  <ArrowRight className="h-4 w-4" />
                </em>
              </a>
            );
          })}
        </section>

        <section className="home-chapter-study" aria-labelledby="home-chapter-title">
          <div className="home-section-split">
            <div>
              <p className="home-section-kicker">Two-Letter Study</p>
              <h2 id="home-chapter-title">{"Choose a letter and follow Paul's counsel to Timothy."}</h2>
            </div>
            <p id="content-status">
              The complete 10-chapter reader places Scripture on the left and verse-by-verse
              exposition, historical context, and selected word studies on the right.
            </p>
          </div>

          <div className="home-chapter-group-grid">
            {bookPlans.map((book) => (
              <article key={book.id} id={book.id} className="home-chapter-group">
                <BookOpen className="home-chapter-group-icon h-6 w-6" />
                <p>{book.eyebrow}</p>
                <h3>{book.title}</h3>
                <div className="home-chapter-mini-grid">
                  {Array.from({ length: book.chapterCount }, (_, index) => index + 1).map((chapterNumber) => (
                    <a key={chapterNumber} href={`/${book.slug}/${chapterNumber}/`} aria-label={`${book.title} chapter ${chapterNumber}`}>
                      <span>{book.title}</span>
                      <strong>Chapter {chapterNumber}</strong>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
