export interface TmdbPageData {
  tmdbPage: number
  offset: number
}

/**
 * Given a UI page (with 10 items per page) and TMDB returning 20 items per page,
 * returns the TMDB page to fetch and the offset within that page.
 *
 * UI page mapping:
 *   UI page 1 -> TMDB page 1, offset 0
 *   UI page 2 -> TMDB page 1, offset 10
 *   UI page 3 -> TMDB page 2, offset 0
 *   UI page 4 -> TMDB page 2, offset 10
 */
export const getTmdbPagination = (uiPage: number): TmdbPageData => {
  const tmdbPage = Math.ceil(uiPage / 2)
  const offset = uiPage % 2 === 0 ? 10 : 0
  return { tmdbPage, offset }
}
