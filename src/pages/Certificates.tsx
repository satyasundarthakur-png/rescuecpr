import { courses } from '../data/seed'
import { useAuth } from '../hooks/useAuth'
import CertificateCard from '../components/CertificateCard'
import type { Certificate } from '../types/domain'

// Demo certificate records — in production these come from the `certificates` table,
// generated only after Section 21's completion + scoring requirements are actually met.
const demoCertificates: Certificate[] = [
  { id: 'cert-1', userId: 'demo-learner', courseId: 'course-bls', completionDate: new Date().toISOString(), scorePercent: 88, certificateNumber: 'RPA-BLS-000123' },
]

export default function Certificates() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Certificates</h1>
        <p className="text-slate-500 text-sm mt-1">Training completion records — not official body certification (see disclaimer below each card).</p>
      </div>
      <div className="space-y-6">
        {demoCertificates.map((cert) => {
          const course = courses.find((c) => c.id === cert.courseId)!
          return (
            <CertificateCard key={cert.id} certificate={cert} learnerName={user?.fullName ?? 'Learner'} courseTitle={course.subtitle} />
          )
        })}
      </div>
    </div>
  )
}
