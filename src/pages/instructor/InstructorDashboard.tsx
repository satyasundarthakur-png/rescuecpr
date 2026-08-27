import { courses, questions } from '../../data/seed'

const demoLearners = [
  { name: 'A. Rao', course: 'BLS', completion: 92, avgScore: 88, atRisk: false },
  { name: 'S. Iyer', course: 'ACLS', completion: 41, avgScore: 54, atRisk: true },
  { name: 'K. Menon', course: 'PALS', completion: 76, avgScore: 79, atRisk: false },
]

export default function InstructorDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Instructor Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Learner performance and content status across {courses.length} courses.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Total learners', '128'],
          ['Active this week', '54'],
          ['Avg completion', '68%'],
          ['Avg score', '77%'],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-sm font-medium text-slate-500 mb-3">Learners at risk</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="pb-2">Name</th><th className="pb-2">Course</th><th className="pb-2">Completion</th><th className="pb-2">Avg score</th>
            </tr>
          </thead>
          <tbody>
            {demoLearners.map((l) => (
              <tr key={l.name} className="border-b border-slate-50 last:border-0">
                <td className="py-2">{l.name}{l.atRisk && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-alert-500/10 text-alert-500">At risk</span>}</td>
                <td className="py-2">{l.course}</td>
                <td className="py-2">{l.completion}%</td>
                <td className="py-2">{l.avgScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-sm font-medium text-slate-500 mb-3">Content pending clinical review</div>
        <div className="space-y-2 text-sm">
          {questions.filter((q) => q.status !== 'published').slice(0, 5).map((q) => (
            <div key={q.id} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
              <span className="text-slate-700 truncate max-w-md">{q.text}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 capitalize">{q.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
