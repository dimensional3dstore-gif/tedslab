import { useCallback } from "react";
import { useUserCollection } from "@/lib/user-data";

export function useBookmarks() {
  const {
    value: bookmarks,
    save,
    user,
    error,
  } = useUserCollection<string[]>("bookmarks", "articles", []);

  const persist = useCallback((next: string[]) => save(next), [save]);
  const toggleBookmark = useCallback(
    (slug: string) => {
      if (!user) return;
      const next = bookmarks.includes(slug)
        ? bookmarks.filter((item) => item !== slug)
        : [...bookmarks, slug];
      save(next);
    },
    [bookmarks, save, user],
  );

  return { bookmarks, toggleBookmark, persist, user, error };
}
