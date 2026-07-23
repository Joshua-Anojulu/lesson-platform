import Image from "next/image";
import Link from "next/link";

import type { Teacher } from "@/content/teachers";

type TeacherCardProps = {
  readonly teacher: Teacher;
  readonly featured?: boolean;
};

export function TeacherCard({ teacher, featured = false }: TeacherCardProps) {
  return (
    <article className={`teacher-card${featured ? " teacher-card--featured" : ""}`}>
      <Link
        className="teacher-card__link"
        href={`/teachers/${teacher.slug}`}
      >
        <div className={`teacher-card__art teacher-card__art--${teacher.slug}`}>
          <Image
            src={teacher.image.src}
            width={1600}
            height={900}
            sizes={
              featured
                ? "(max-width: 768px) calc(100vw - 32px), 58vw"
                : "(max-width: 768px) calc(100vw - 32px), 34vw"
            }
            alt=""
            style={{ objectPosition: teacher.image.position }}
          />
          <span aria-hidden="true">{teacher.initials}</span>
        </div>
        <div className="teacher-card__content">
          <div className="teacher-card__instruments">
            {teacher.instruments.join(" / ")}
          </div>
          <h3>{teacher.name}</h3>
          <p>{teacher.shortBio}</p>
          <div className="teacher-card__meta">
            <span>{teacher.rate}</span>
            <span aria-hidden="true">View profile</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
