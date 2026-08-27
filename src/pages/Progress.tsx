import { learningObjectives } from '../data/seed'

// Demo mastery values — production reads from the learner_mastery table.
const demoMastery: Record<string, number> = {
  'lo-CPR': 92, 'lo-BLS': 81, 'lo-ACLS': 67, 'lo-PALS': 74, 'lo-NALS': 58, 'lo-ATLS': 70,
}

export default function Progress() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Your Progress</h1>
        <p className="text-slate-500 text-sm mt-1">Mastery by learning objective.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        {learningObjectives.map((lo) => {
          const value = demoMastery[lo.id] ?? 0
          return (
            <div key={lo.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-700">{lo.label}</span>
                <span className="font-medium text-slate-900">{value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-clinical-500 rounded-full" style={{ width: `${value}%` }} />
              </div>
              {value < 70 && <div className="text-xs text-amber-600 mt-1">Recommended review</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
