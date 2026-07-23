import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliationNotice } from "@/components/affiliation-notice";
import { VideoFacade } from "@/components/video-facade";
import { getTeacher, teachers } from "@/content/teachers";

type TeacherPageProps = {
  readonly params: Promise<{ readonly slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return teachers.map((teacher) => ({ slug: teacher.slug }));
}

export async function generateMetadata({
  params,
}: TeacherPageProps): Promise<Metadata> {
  const { slug } = await params;
  const teacher = getTeacher(slug);

  if (teacher === undefined) {
    return { title: "Teacher not found" };
  }

  return {
    title: teacher.name,
    description: `${teacher.name} teaches ${teacher.instruments.join(
      " and ",
    )}. View rates, bio, and sample hosted media.`,
  };
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const { slug } = await params;
  const teacher = getTeacher(slug);

  if (teacher === undefined) {
    notFound();
  }

  return (
    <main id="main-content">
      <section className="profile-hero page-frame">
        <div className="profile-hero__identity">
          <p className="eyebrow">Private music teacher</p>
          <h1>{teacher.name}</h1>
          <p>{teacher.instruments.join(" / ")}</p>
          <div className="action-group">
            <Link
              className="action action--primary"
              href={`/register?teacher=${teacher.slug}`}
            >
              Request lessons
            </Link>
            <Link className="action action--secondary" href="/#teachers">
              Back to roster
            </Link>
          </div>
        </div>
        <div className={`profile-hero__art profile-hero__art--${teacher.slug}`}>
          <Image
            src={teacher.image.src}
            width={1600}
            height={900}
            sizes="(max-width: 768px) calc(100vw - 32px), 48vw"
            alt={teacher.image.alt}
            style={{ objectPosition: teacher.image.position }}
            preload
          />
          <b>{teacher.instruments[0]}</b>
        </div>
        <div className="profile-hero__rate">
          <span>Current rate</span>
          <strong>{teacher.rate}</strong>
          <p>{teacher.rateNote}</p>
        </div>
      </section>

      <div className="page-frame">
        <AffiliationNotice
          detail={`Self-reported affiliation: ${teacher.selfReportedAffiliation}`}
        />
      </div>

      <section className="profile-story page-frame">
        <div className="profile-story__heading">
          <h2>A lesson room with a clear next step.</h2>
          <div className="profile-story__media">
            <Image
              src="/images/sheet-music-band-hall.webp"
              width={1600}
              height={900}
              sizes="(max-width: 768px) calc(100vw - 32px), 42vw"
              alt="Sheet music waiting on a stand in warm band-hall light"
            />
          </div>
        </div>
        <div className="profile-story__copy">
          {teacher.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="profile-media page-frame">
        <div className="section-heading">
          <h2>See the media privacy choice.</h2>
          <p>
            Each hosted clip stays local until you choose to connect to its
            video provider.
          </p>
        </div>
        <div className="video-grid">
          {teacher.videos.map((video) => (
            <VideoFacade
              teacherName={teacher.name}
              teacherInitials={teacher.initials}
              video={video}
              key={`${video.host}-${video.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
