const GITHUB_USERNAME = "gitgotgut"
const GITHUB_API = "https://api.github.com"

export interface ContributionDay {
  date: string // YYYY-MM-DD
  count: number
}

/**
 * Safely fetch JSON from a URL, returning null on any error.
 */
async function safeFetchJson(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, {
      headers: githubHeaders(),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const text = await res.text()
    if (!text || text.trim().length === 0) return null
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * Fetch all public repos for the user.
 */
async function fetchRepos(): Promise<string[]> {
  const data = await safeFetchJson(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  )
  if (!Array.isArray(data)) return []
  return data.map((r: { name: string }) => r.name)
}

/**
 * Fetch commit activity (last 52 weeks) for a single repo.
 * GitHub's stats API may return 202 (computing) on first call — we handle gracefully.
 */
async function fetchWeeklyActivity(
  repo: string
): Promise<{ week: number; total: number; days: number[] }[]> {
  const data = await safeFetchJson(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/stats/commit_activity`
  )
  if (!Array.isArray(data)) return []
  return data
}

/**
 * Aggregate contribution data across all repos into a daily heatmap.
 * Fetched server-side with 24h ISR revalidation.
 */
export async function getContributionData(): Promise<{
  days: ContributionDay[]
  totalContributions: number
}> {
  try {
    const repos = await fetchRepos()

    const allActivity = await Promise.all(
      repos.map((repo) => fetchWeeklyActivity(repo))
    )

    const dayMap = new Map<string, number>()

    for (const repoWeeks of allActivity) {
      for (const week of repoWeeks) {
        if (week.days) {
          for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const dayCount = week.days[dayIndex]
            if (dayCount > 0) {
              const date = new Date(week.week * 1000)
              date.setDate(date.getDate() + dayIndex)
              const dateStr = date.toISOString().split("T")[0]
              dayMap.set(dateStr, (dayMap.get(dateStr) || 0) + dayCount)
            }
          }
        }
      }
    }

    const days = Array.from(dayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const totalContributions = days.reduce((sum, d) => sum + d.count, 0)

    return { days, totalContributions }
  } catch {
    // Graceful fallback if GitHub API is unavailable during build
    return { days: [], totalContributions: 0 }
  }
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "carlo.dev-portfolio",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}
