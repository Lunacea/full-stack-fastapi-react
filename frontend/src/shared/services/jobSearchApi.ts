import { SearchFormValues } from "@/features/job-search/types"
import { JobListing } from "@/shared/types"

// 検索結果の型定義
export interface SearchResult {
  jobs: JobListing[]
  totalCount: number
  currentPage: number
  totalPages: number
}

// 検索パラメータの型定義
export interface SearchParams extends SearchFormValues {
  page?: number
  limit?: number
}

// Mock APIクライアント
class JobSearchApi {
  private mockJobs: JobListing[] = [
    {
      id: 1,
      title: "調理スタッフ",
      company: "レストランABC",
      location: "岩手県盛岡市",
      salary: "時給1,200円〜1,500円",
      workHours: "8時間/日",
      employmentType: "アルバイト・パート",
      description: "お客様に美味しい料理を提供する調理スタッフを募集しています。経験不問で、やる気のある方を歓迎します。",
      features: ["経験不問", "研修あり", "交通費支給", "社員登用制度あり"]
    },
    {
      id: 2,
      title: "事務スタッフ",
      company: "株式会社XYZ",
      location: "岩手県盛岡市",
      salary: "月給25万円〜30万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "経理・総務業務を担当する事務スタッフを募集しています。Excel、Wordの基本操作ができる方を歓迎します。",
      features: ["社会保険完備", "各種手当あり", "残業手当", "有給休暇"]
    },
    {
      id: 3,
      title: "営業職",
      company: "営業会社DEF",
      location: "岩手県盛岡市",
      salary: "月給30万円〜40万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "新規顧客開拓から既存顧客のフォローまで、営業活動全般を担当していただきます。",
      features: ["成果報酬", "車両手当", "通信費支給", "研修制度"]
    },
    {
      id: 4,
      title: "看護師",
      company: "医療法人GHI",
      location: "岩手県盛岡市",
      salary: "月給35万円〜45万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "患者様のケアと医療チームの一員として、質の高い看護サービスを提供していただきます。",
      features: ["夜勤手当", "資格手当", "社会保険完備", "研修制度"]
    },
    {
      id: 5,
      title: "ITエンジニア",
      company: "IT企業JKL",
      location: "岩手県盛岡市",
      salary: "月給40万円〜60万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "Webアプリケーションの開発・保守を担当していただきます。React、TypeScriptの経験がある方を歓迎します。",
      features: ["リモートワーク可", "技術研修", "書籍購入支援", "フレックスタイム"]
    },
    {
      id: 6,
      title: "デザイナー",
      company: "デザイン会社MNO",
      location: "岩手県盛岡市",
      salary: "月給30万円〜40万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "WebサイトやアプリのUI/UXデザインを担当していただきます。Figma、Adobe Creative Suiteの使用経験がある方を歓迎します。",
      features: ["リモートワーク可", "デザイン研修", "ツール購入支援", "フレックスタイム"]
    },
    {
      id: 7,
      title: "接客スタッフ",
      company: "カフェPQR",
      location: "岩手県盛岡市",
      salary: "時給1,000円〜1,300円",
      workHours: "6時間/日",
      employmentType: "アルバイト・パート",
      description: "お客様に温かい接客サービスを提供していただきます。明るく元気な方を歓迎します。",
      features: ["研修あり", "制服貸与", "交通費支給", "社員登用制度あり"]
    },
    {
      id: 8,
      title: "教育スタッフ",
      company: "学習塾STU",
      location: "岩手県盛岡市",
      salary: "月給25万円〜35万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "小中学生の学習指導を担当していただきます。教員免許や塾講師の経験がある方を歓迎します。",
      features: ["研修制度", "社会保険完備", "各種手当", "有給休暇"]
    },
    {
      id: 9,
      title: "物流スタッフ",
      company: "物流会社VWX",
      location: "岩手県盛岡市",
      salary: "時給1,100円〜1,400円",
      workHours: "8時間/日",
      employmentType: "アルバイト・パート",
      description: "商品の仕分け、梱包、配送作業を担当していただきます。体力に自信のある方を歓迎します。",
      features: ["研修あり", "制服貸与", "交通費支給", "社員登用制度あり"]
    },
    {
      id: 10,
      title: "製造スタッフ",
      company: "製造会社YZA",
      location: "岩手県盛岡市",
      salary: "月給25万円〜35万円",
      workHours: "8時間/日",
      employmentType: "正社員",
      description: "製品の製造・品質管理を担当していただきます。製造業の経験がある方を歓迎します。",
      features: ["研修制度", "社会保険完備", "各種手当", "有給休暇"]
    }
  ]

  // 検索フィルタリング関数
  private filterJobs(params: SearchParams): JobListing[] {
    let filteredJobs = [...this.mockJobs]

    // 場所でフィルタリング
    if (params.location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(params.location.toLowerCase())
      )
    }

    // キーワードでフィルタリング
    if (params.keyword) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(params.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(params.keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(params.keyword.toLowerCase()) ||
        job.features.some(feature =>
          feature.toLowerCase().includes(params.keyword.toLowerCase())
        )
      )
    }

    // 職種でフィルタリング
    if (params.jobCategories && params.jobCategories.length > 0) {
      // 職種のマッピング（実際の実装ではより詳細なマッピングが必要）
      const categoryMapping: Record<string, string[]> = {
        cooking: ["調理"],
        office: ["事務"],
        sales: ["営業"],
        nursing: ["看護", "介護"],
        education: ["教育"],
        it: ["IT", "エンジニア"],
        design: ["デザイン", "クリエイティブ"],
        service: ["サービス", "接客"]
      }

      filteredJobs = filteredJobs.filter(job => {
        return params.jobCategories!.some(category => {
          const keywords = categoryMapping[category] || []
          return keywords.some(keyword =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(keyword.toLowerCase())
          )
        })
      })
    }

    // 雇用形態でフィルタリング
    if (params.employmentTypes && params.employmentTypes.length > 0) {
      const employmentMapping: Record<string, string[]> = {
        "full-time": ["正社員"],
        "part-time": ["アルバイト", "パート"],
        "dispatch": ["派遣社員"],
        "contract": ["契約社員"],
        "commission": ["業務委託"],
        "new-graduate": ["新卒"]
      }

      filteredJobs = filteredJobs.filter(job => {
        return params.employmentTypes!.some(type => {
          const keywords = employmentMapping[type] || []
          return keywords.some(keyword =>
            job.employmentType.toLowerCase().includes(keyword.toLowerCase())
          )
        })
      })
    }

    // こだわりでフィルタリング
    if (params.preferences && params.preferences.length > 0) {
      const preferenceMapping: Record<string, string[]> = {
        "remote": ["リモートワーク可"],
        "training": ["研修", "研修制度"],
        "benefits": ["社会保険完備", "各種手当"],
        "flexible": ["フレックスタイム"],
        "experience": ["経験不問"],
        "transport": ["交通費支給"]
      }

      filteredJobs = filteredJobs.filter(job => {
        return params.preferences!.some(preference => {
          const keywords = preferenceMapping[preference] || []
          return keywords.some(keyword =>
            job.features.some(feature =>
              feature.toLowerCase().includes(keyword.toLowerCase())
            )
          )
        })
      })
    }

    // 給与でフィルタリング
    if (params.salary && (params.salary.min || params.salary.max)) {
      filteredJobs = filteredJobs.filter(job => {
        const salaryText = job.salary.toLowerCase()
        const salaryType = params.salary.type

        // 給与タイプの確認
        if (salaryType === 'hourly' && !salaryText.includes('時給')) return false
        if (salaryType === 'monthly' && !salaryText.includes('月給')) return false
        if (salaryType === 'yearly' && !salaryText.includes('年収')) return false

        // 金額範囲の確認（簡易実装）
        if (params.salary.min || params.salary.max) {
          // 実際の実装ではより詳細な金額パースが必要
          return true // 簡易実装のため常にtrue
        }

        return true
      })
    }

    return filteredJobs
  }

  // 検索実行
  async searchJobs(params: SearchParams): Promise<SearchResult> {
    // 実際のAPI呼び出しをシミュレート
    await new Promise(resolve => setTimeout(resolve, 500))

    const filteredJobs = this.filterJobs(params)
    const page = params.page || 1
    const limit = params.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredJobs.length / limit)

    return {
      jobs: paginatedJobs,
      totalCount: filteredJobs.length,
      currentPage: page,
      totalPages
    }
  }

  // 統計情報取得
  async getSearchStats(): Promise<{ location: string; totalJobs: number }> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return {
      location: "岩手県盛岡市",
      totalJobs: this.mockJobs.length
    }
  }
}

// シングルトンインスタンス
export const jobSearchApi = new JobSearchApi() 