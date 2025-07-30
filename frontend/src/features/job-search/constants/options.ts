import { SelectOption } from "../types"

// 職種オプション
export const jobCategoryOptions: SelectOption[] = [
  { value: "sales", label: "営業" },
  { value: "office", label: "事務" },
  { value: "cooking", label: "調理" },
  { value: "nursing", label: "看護・介護" },
  { value: "education", label: "教育" },
  { value: "it", label: "IT・エンジニア" },
  { value: "design", label: "デザイン・クリエイティブ" },
  { value: "service", label: "サービス・接客" },
  { value: "construction", label: "建設・土木" },
  { value: "manufacturing", label: "製造・工場" },
  { value: "logistics", label: "物流・倉庫" },
  { value: "medical", label: "医療・薬剤師" },
  { value: "beauty", label: "美容・エステ" },
  { value: "finance", label: "金融・保険" },
  { value: "consulting", label: "コンサルティング" },
  { value: "other", label: "その他" }
]

// 雇用形態オプション
export const employmentTypeOptions: SelectOption[] = [
  { value: "full-time", label: "正社員" },
  { value: "part-time", label: "アルバイト・パート" },
  { value: "dispatch", label: "派遣社員" },
  { value: "contract", label: "契約社員" },
  { value: "commission", label: "業務委託" },
  { value: "new-graduate", label: "新卒" }
]

// こだわりオプション
export const preferenceOptions: SelectOption[] = [
  { value: "remote", label: "リモートワーク" },
  { value: "flexible", label: "フレックスタイム" },
  { value: "no-overtime", label: "残業なし" },
  { value: "weekend-off", label: "土日休み" },
  { value: "holiday", label: "長期休暇" },
  { value: "benefits", label: "福利厚生充実" },
  { value: "training", label: "研修制度" },
  { value: "career", label: "キャリアアップ" },
  { value: "transport", label: "交通費支給" },
  { value: "social-insurance", label: "社会保険完備" },
  { value: "bonus", label: "賞与・ボーナス" },
  { value: "raise", label: "昇給あり" }
]

// 給与タイプオプション
export const salaryTypeOptions: SelectOption[] = [
  { value: "hourly", label: "時給" },
  { value: "daily", label: "日給" },
  { value: "monthly", label: "月給" },
  { value: "yearly", label: "年収" }
] 