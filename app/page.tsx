import Link from "next/link";

import { AffiliationNotice } from "@/components/affiliation-notice";
import { TeacherCard } from "@/components/teacher-card";
import { teachers } from "@/content/teachers";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">A personal lesson roster</p>
          <h1>
            <span>Find the teacher</span>
            <span>who makes practice</span>
            <span>click.</span>
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
          <div className="roster-stage__orbit" aria-hidden="true" />
          {teachers.map((teacher, index) => (
            <Link
              className={`roster-stage__card roster-stage__card--${index + 1}`}
              href={`/teachers/${teacher.slug}`}
              key={teacher.slug}
            >
              <span className="roster-stage__initials" aria-hidden="true">
                {teacher.initials}
              </span>
              <span>
                <strong>{teacher.name}</strong>
                <small>{teacher.instruments.join(" / ")}</small>
              </span>
            </Link>
          ))}
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
