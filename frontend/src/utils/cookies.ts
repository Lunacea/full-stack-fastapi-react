// Cookie管理ユーティリティ
export interface UserPreferences {
  favorites: number[] // お気に入り求人IDの配列
  history: number[] // 閲覧履歴求人IDの配列
  savedSearches: SavedSearch[] // 保存された検索条件
  theme: 'light' | 'dark' | 'system' // テーマ設定
}

export interface SavedSearch {
  id: string
  name: string
  query: string
  filters: {
    employmentType?: string
    jobCategory?: string
    salaryType?: string
  }
  createdAt: Date
}

const COOKIE_KEYS = {
  USER_PREFERENCES: 'stanby_user_preferences',
  FAVORITES: 'stanby_favorites',
  HISTORY: 'stanby_history',
  SAVED_SEARCHES: 'stanby_saved_searches',
  THEME: 'stanby_theme'
} as const

// Cookieの有効期限（30日）
const COOKIE_EXPIRES = 30

// Cookieを設定する関数
export function setCookie(name: string, value: string, days: number = COOKIE_EXPIRES): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

// Cookieを取得する関数
export function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return null
}

// Cookieを削除する関数
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

// お気に入り管理
export function getFavorites(): number[] {
  const favorites = getCookie(COOKIE_KEYS.FAVORITES)
  return favorites ? JSON.parse(favorites) : []
}

export function addToFavorites(jobId: number): void {
  const favorites = getFavorites()
  if (!favorites.includes(jobId)) {
    favorites.push(jobId)
    setCookie(COOKIE_KEYS.FAVORITES, JSON.stringify(favorites))
  }
}

export function removeFromFavorites(jobId: number): void {
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter(id => id !== jobId)
  setCookie(COOKIE_KEYS.FAVORITES, JSON.stringify(updatedFavorites))
}

export function isFavorite(jobId: number): boolean {
  const favorites = getFavorites()
  return favorites.includes(jobId)
}

// 閲覧履歴管理
export function getHistory(): number[] {
  const history = getCookie(COOKIE_KEYS.HISTORY)
  return history ? JSON.parse(history) : []
}

export function addToHistory(jobId: number): void {
  const history = getHistory()
  // 既存の履歴から削除（最新を先頭に）
  const filteredHistory = history.filter(id => id !== jobId)
  // 先頭に追加（最大50件まで）
  const updatedHistory = [jobId, ...filteredHistory].slice(0, 50)
  setCookie(COOKIE_KEYS.HISTORY, JSON.stringify(updatedHistory))
}

export function clearHistory(): void {
  deleteCookie(COOKIE_KEYS.HISTORY)
}

// 保存された検索条件管理
export function getSavedSearches(): SavedSearch[] {
  const savedSearches = getCookie(COOKIE_KEYS.SAVED_SEARCHES)
  return savedSearches ? JSON.parse(savedSearches) : []
}

export function saveSearch(search: Omit<SavedSearch, 'id' | 'createdAt'>): void {
  const savedSearches = getSavedSearches()
  const newSearch: SavedSearch = {
    ...search,
    id: Date.now().toString(),
    createdAt: new Date()
  }
  // 最大10件まで保存
  const updatedSearches = [newSearch, ...savedSearches].slice(0, 10)
  setCookie(COOKIE_KEYS.SAVED_SEARCHES, JSON.stringify(updatedSearches))
}

export function deleteSavedSearch(searchId: string): void {
  const savedSearches = getSavedSearches()
  const updatedSearches = savedSearches.filter(search => search.id !== searchId)
  setCookie(COOKIE_KEYS.SAVED_SEARCHES, JSON.stringify(updatedSearches))
}

// テーマ設定管理
export function getTheme(): 'light' | 'dark' | 'system' {
  const theme = getCookie(COOKIE_KEYS.THEME)
  return (theme as 'light' | 'dark' | 'system') || 'system'
}

export function setTheme(theme: 'light' | 'dark' | 'system'): void {
  setCookie(COOKIE_KEYS.THEME, theme)
}

// 統計情報
export function getFavoritesCount(): number {
  return getFavorites().length
}

export function getHistoryCount(): number {
  return getHistory().length
}

export function getSavedSearchesCount(): number {
  return getSavedSearches().length
} 