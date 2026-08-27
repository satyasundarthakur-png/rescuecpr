import { Link } from '@tanstack/react-router'
import { modules } from '../data/seed'
import { computeCompetency } from '../engines/competencyEngine'
import { useAuth } from '../hooks/useAuth'

// Demo metrics — in production these come from progress/mastery tables, not hardcoded.
const demoInputs = {
  knowledge: 82, recognition: 74, decisionMaking: 76, technicalSequence: 70,
  teamCommunication: 68, timeCriticalResponse: 71, algorithmMastery: 91, simulationPerformance: 73,
}

export default function Dashboard() {
  const { user } = useAuth()
  const competency = computeCompetency(demoInputs)
  const continueModule = modules[1]!

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back{user ? `, ${user.fullName}` : ''}</h1>
        <p className="text-slate-500 text-sm mt-1">Here's where your training stands.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Overall completion', '54%'],
          ['Competency score', `${competency.overall}%`],
          ['Modules completed', '3 / 6'],
          ['Simulations completed', '2'],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-sm font-medium text-slate-500 mb-2">Continue Learning</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-900">{continueModule.title}</div>
            <div className="text-xs text-slate-500 mt-1">68% complete</div>
          </div>
          <Link to="/module/$moduleId" params={{ moduleId: continueModule.id }} className="px-4 py-2 bg-clinical-600 text-white rounded-lg text-sm font-medium hover:bg-clinical-700">
            Resume
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-sm font-medium text-slate-500 mb-3">Your Performance</div>
          <ul className="space-y-2 text-sm">
            {Object.entries(competency).filter(([k]) => k !== 'overall').map(([k, v]) => (
              <li key={k} className="flex items-center justify-between">
                <span className="capitalize text-slate-600">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-medium text-slate-900">{v}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-sm font-medium text-slate-500 mb-3">Recommended Practice</div>
          <p className="text-sm text-slate-600">
            Team communication and time-critical response are your lowest-scoring dimensions.
            Revisit the ACLS shockable-rhythm scenario to reinforce decision speed.
          </p>
          <Link to="/simulation/$scenarioId" params={{ scenarioId: "scn-acls-1" }} className="inline-block mt-3 text-sm font-medium text-clinical-600 hover:text-clinical-700">
            Practice now →
          </Link>
        </div>
      </div>
    </div>
  )
}
