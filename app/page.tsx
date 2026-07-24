import Image from "next/image";
import Link from "next/link";

import { AffiliationNotice } from "@/components/affiliation-notice";
import { TeacherCard } from "@/components/teacher-card";
import { teachers } from "@/content/teachers";

const instrumentCount = new Set(
  teachers.flatMap((teacher) => teacher.instruments),
).size;
const rates = teachers
  .map((teacher) => Number.parseInt(teacher.rate.match(/\d+/)?.[0] ?? "", 10))
  .filter((rate) => Number.isFinite(rate));
const rateRange = `$${Math.min(...rates)} to $${Math.max(...rates)} per 45 minutes`;

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">A personal lesson roster</p>
          <h1>
            <span>Find the teacher</span>
            <span>who makes practice click.</span>
          </h1>
          <p className="home-hero__lead">
            Browse teacher-owned profiles, teaching clips, and rates shared
            through your director&apos;s personal recommendation list.
          </p>
          <div className="action-group">
            <a className="action action--primary" href="#teachers">
              Meet teachers
            </a>
            <Link className="action action--secondary" href="/register">
              Register
            </Link>
          </div>
        </div>
        <div className="roster-stage" aria-label="Teacher roster preview">
          <Image
            className="roster-stage__image"
            src="/images/hero-piano-hands.webp"
            width={1600}
            height={900}
            sizes="(max-width: 768px) calc(100vw - 32px), 52vw"
            alt="Hands playing piano keys in a quiet band rehearsal room"
          />
          <div className="roster-stage__orbit" aria-hidden="true" />
          <div className="roster-stage__brief">
            <span className="roster-stage__brief-label">How it works</span>
            <ol className="roster-stage__steps">
              {[
                "Send one private request",
                "The coordinator introduces you",
                "Schedule directly with the teacher",
              ].map((step, index) => (
                <li
                  className="roster-stage__step"
                  key={step}
                  style={{ "--step-index": index } as React.CSSProperties}
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="home-hero__meta">
          <span>{teachers.length} teachers on this roster</span>
          <span>{instrumentCount} instruments</span>
          <span>{rateRange}</span>
          <span>Monthly scheduling</span>
        </div>
      </section>

      <div className="page-frame">
        <AffiliationNotice />
      </div>

      <section className="teacher-roster page-frame" id="teachers">
        <div className="section-heading">
          <h2>Three teachers. Three distinct ways in.</h2>
          <p>
            Compare instruments, teaching style, and rates before choosing who
            feels right for your student.
          </p>
        </div>
        <div className="teacher-grid">
          {teachers.map((teacher, index) => (
            <TeacherCard
              teacher={teacher}
              featured={index === 0}
              key={teacher.slug}
            />
          ))}
        </div>
      </section>

      <section className="registration-callout page-frame">
        <div className="registration-callout__media">
          <Image
            src="/images/instrument-cases-band-hall.webp"
            width={1600}
            height={900}
            sizes="(max-width: 768px) calc(100vw - 32px), 46vw"
            alt="Instrument cases lined along a band-hall wall"
          />
        </div>
        <div>
          <h2>Know who you want to meet?</h2>
          <p>
            Send one private request with only the details needed to make an
            introduction.
          </p>
        </div>
        <Link className="action action--primary" href="/register">
          Start request
        </Link>
      </section>
    </main>
  );
}
