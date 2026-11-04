// Creative Outlet entries. The page sorts them newest first by `date`.
export type CreativeVideoEntry = {
  slug: string;
  type: "video";
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  description: string;
  /** Video file in public/, played muted in a loop without controls. */
  video: string;
  /** Still image of the last frame, shown under reduced motion. */
  still: string;
  width: number;
  height: number;
};

export type CreativeEntry = CreativeVideoEntry;

export const creativeEntries: CreativeEntry[] = [
  {
    slug: "the-ball",
    type: "video",
    title: "The Ball",
    date: "2026-11-04",
    description:
      "My first pencil animation in Procreate. A ball, a few bounces and a very dramatic ending.",
    video: "/creative/the-ball.mp4",
    still: "/creative/the-ball-last-frame.webp",
    width: 1056,
    height: 576,
  },
];
