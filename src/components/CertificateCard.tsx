import { Award, ShieldCheck } from 'lucide-react'
import type { Certificate } from '../types/domain'

// Original design. Deliberately does NOT imitate any official AHA/ACLS/PALS card
// layout, color system, or seal — see Section 21: completing this app must never be
// presented as equivalent to an official AHA/ILCOR certification.
export default function CertificateCard({
  certificate, learnerName, courseTitle,
}: { certificate: Certificate; learnerName: string; courseTitle: string }) {
  return (
    <div className="glow-card relative w-full max-w-xl mx-auto rounded-2xl border border-clinical-200 bg-white shadow-md overflow-hidden">
      <div className="h-2.5 bg-gradient-to-r from-clinical-600 via-gold-500 to-brand-blue-600" />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-clinical-700">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold tracking-wide">ResusPro Academy</span>
          </div>
          <Award size={28} className="text-gold-500" />
        </div>

        <div className="mt-8 text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400">Training Completion Certificate</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{learnerName}</div>
          <div className="mt-1 text-sm text-slate-500">has completed the training module</div>
          <div className="mt-1 text-lg font-medium text-clinical-700">{courseTitle}</div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="text-slate-400">Completed</div>
            <div className="font-medium text-slate-800">{new Date(certificate.completionDate).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-slate-400">Score</div>
            <div className="font-medium text-slate-800">{certificate.scorePercent}%</div>
          </div>
          <div>
            <div className="text-slate-400">Certificate ID</div>
            <div className="font-medium text-slate-800">{certificate.certificateNumber}</div>
          </div>
        </div>

        <div className="mt-8 text-[11px] leading-relaxed text-slate-400 border-t border-slate-100 pt-4">
          This certificate documents completion of a training simulation within ResusPro Academy. It is not an
          official AHA, ILCOR, ERC, or other governing-body certification and does not replace an accredited
          certification course, institutional credentialing, or clinical supervision.
        </div>
      </div>
    </div>
  )
}
