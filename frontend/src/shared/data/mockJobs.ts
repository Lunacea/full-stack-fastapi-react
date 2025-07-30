import { JobListing, SearchStats, JobFilters } from "../types"

export const mockJobs: JobListing[] = [
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

export const searchStats: SearchStats = {
  location: "岩手県盛岡市",
  totalJobs: 1250
}

export const jobFilters: JobFilters = {
  jobCategories: [
    { value: "cooking", label: "調理" },
    { value: "office", label: "事務" },
    { value: "sales", label: "営業" },
    { value: "nursing", label: "看護・介護" },
    { value: "education", label: "教育" },
    { value: "it", label: "IT・エンジニア" },
    { value: "design", label: "デザイン・クリエイティブ" },
    { value: "service", label: "サービス・接客" }
  ],
  employmentTypes: [
    { value: "full-time", label: "正社員" },
    { value: "part-time", label: "アルバイト・パート" },
    { value: "dispatch", label: "派遣社員" },
    { value: "contract", label: "契約社員" },
    { value: "commission", label: "業務委託" },
    { value: "new-graduate", label: "新卒" }
  ],
  salaryTypes: [
    { value: "hourly", label: "時給" },
    { value: "monthly", label: "月給" },
    { value: "yearly", label: "年収" }
  ]
} 