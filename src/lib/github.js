import { now, profile } from './content';

const CACHE_KEY = 'gh-activity-v2';

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(value) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable: skip caching */
  }
}

const withDescriptions = (repos) =>
  repos.map((r) => ({ ...r, description: now.github.descriptions[r.name] || r.description || '' }));

export const githubSnapshot = () => ({
  live: false,
  publicRepos: now.github.publicRepos,
  repos: withDescriptions(
    now.github.repos.map((r) => ({
      ...r,
      url: `${profile.links.github}/${r.name}`,
    }))
  ),
});

/**
 * Recently updated portfolio repositories (the ones described in now.json).
 * Falls back to the bundled snapshot if the API is unreachable or rate-limited.
 */
export async function loadGithubActivity(signal) {
  const cached = readCache();
  if (cached) return cached;

  const user = profile.links.githubUser;
  const res = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=20`, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error('GitHub API unavailable');

  const reposJson = await res.json();
  const shown = new Set(Object.keys(now.github.descriptions));
  const repos = reposJson
    .filter((r) => !r.fork && shown.has(r.name))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      language: r.language,
      pushedAt: r.pushed_at,
      url: r.html_url,
      description: r.description,
    }));

  const result = {
    live: true,
    publicRepos: now.github.publicRepos,
    repos: withDescriptions(repos),
  };
  writeCache(result);
  return result;
}

/** "Jun 2026". Fixed locale and time zone so build-time and browser output match. */
export function monthYear(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}
