import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ChapterContentSchema, type ChapterContent } from "@/lib/schemas";
import { padChapter } from "@/lib/utils";

export const TIMOTHY_BOOKS = {
  "1-timothy": {
    slug: "1-timothy",
    name: "1 Timothy",
    chapterCount: 6,
    verseCounts: [20, 15, 16, 16, 25, 21]
  },
  "2-timothy": {
    slug: "2-timothy",
    name: "2 Timothy",
    chapterCount: 4,
    verseCounts: [18, 26, 17, 22]
  }
} as const;

export type TimothyBookSlug = keyof typeof TIMOTHY_BOOKS;
export type TimothyBookConfig = (typeof TIMOTHY_BOOKS)[TimothyBookSlug];

export type ChapterAdjacency = {
  previous: number | null;
  next: number | null;
};

const contentRoot = join(process.cwd(), "content");

export function getTimothyBookConfig(bookSlug: TimothyBookSlug): TimothyBookConfig {
  return TIMOTHY_BOOKS[bookSlug];
}

export function getTimothyStaticParams(bookSlug: TimothyBookSlug) {
  const { chapterCount } = getTimothyBookConfig(bookSlug);
  return Array.from({ length: chapterCount }, (_, index) => ({ chapter: String(index + 1) }));
}

export function parseTimothyChapterNumber(
  bookSlug: TimothyBookSlug,
  chapter: number | string
): number | null {
  const rawChapter = String(chapter);
  if (!/^[1-9]\d*$/.test(rawChapter)) return null;

  const chapterNumber = Number(rawChapter);
  const { chapterCount } = getTimothyBookConfig(bookSlug);
  if (!Number.isSafeInteger(chapterNumber) || chapterNumber > chapterCount) return null;

  return chapterNumber;
}

export function getTimothyChapter(
  bookSlug: TimothyBookSlug,
  chapter: number | string
): ChapterContent | null {
  const chapterNumber = parseTimothyChapterNumber(bookSlug, chapter);
  if (chapterNumber === null) return null;

  const config = getTimothyBookConfig(bookSlug);
  const chapterPath = join(contentRoot, config.slug, `chapter-${padChapter(chapterNumber)}.json`);
  if (!existsSync(chapterPath)) return null;

  const parsed = ChapterContentSchema.parse(JSON.parse(readFileSync(chapterPath, "utf8")));
  const expectedVerseCount = config.verseCounts[chapterNumber - 1];

  if (parsed.chapterNumber !== chapterNumber) {
    throw new Error(
      `${config.name} ${chapterNumber} loaded chapterNumber ${parsed.chapterNumber}.`
    );
  }

  if (parsed.verses.length !== expectedVerseCount) {
    throw new Error(
      `${config.name} ${chapterNumber} has ${parsed.verses.length} verses; expected ${expectedVerseCount}.`
    );
  }

  parsed.verses.forEach((verse, index) => {
    const expectedReference = `${config.name} ${chapterNumber}:${index + 1}`;
    if (verse.verse !== expectedReference) {
      throw new Error(
        `${config.name} ${chapterNumber} contains ${verse.verse}; expected ${expectedReference}.`
      );
    }
  });

  return parsed;
}

export function getTimothyChapterAdjacency(
  bookSlug: TimothyBookSlug,
  chapter: number | string
): ChapterAdjacency | null {
  const chapterNumber = parseTimothyChapterNumber(bookSlug, chapter);
  if (chapterNumber === null) return null;

  const { chapterCount } = getTimothyBookConfig(bookSlug);
  return {
    previous: chapterNumber > 1 ? chapterNumber - 1 : null,
    next: chapterNumber < chapterCount ? chapterNumber + 1 : null
  };
}
