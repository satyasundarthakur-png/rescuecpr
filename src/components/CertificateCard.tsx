import { forwardRef } from 'react'
import { Award, ShieldCheck, AlertTriangle } from 'lucide-react'
import type { Certificate } from '../types/domain'

// Original design. Deliberately does NOT imitate any official AHA/ACLS/PALS card
// layout, color system, or seal — see Section 21: completing this app must never be
// presented as equivalent to an official AHA/ILCOR certification. Signature and seal
// images are supplied by the instructor/institution issuing this internal training
// record — they must not be a copy of an official AHA/ILCOR/ERC seal or signature.
export interface CertificateSignature {
  name: string
  title: string
  imageDataUrl?: string | undefined
}

const CertificateCard = forwardRef<HTMLDivElement, {
  certificate: Certificate
  learnerName: string
  courseTitle: string
  passingScore?: number | undefined
  primarySignature?: CertificateSignature | undefined
  secondarySignature?: CertificateSignature | undefined
  sealDataUrl?: string | undefined
}>(function CertificateCard(
  { certificate, learnerName, courseTitle, passingScore = 80, primarySignature, secondarySignature, sealDataUrl },
  ref,
) {
  const passed = certificate.scorePercent >= passingScore

  return (
    <div ref={ref} className="glow-card relative w-full max-w-xl mx-auto rounded-2xl border border-clinical-200 bg-white shadow-md overflow-hidden">
      <div className="h-2.5 bg-gradient-to-r from-clinical-600 via-gold-500 to-brand-blue-600" />
      <div className="p-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-clinical-700">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold tracking-wide">ResusPro Academy</span>
          </div>
          <Award size={28} className="text-gold-500" />
        </div>

        {!passed && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-alert-500 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <AlertTriangle size={13} /> Below {passingScore}% passing threshold — not eligible for completion status
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400">Training Completion Certificate</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{learnerName || 'Learner Name'}</div>
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
            <div className={`font-medium ${passed ? 'text-slate-800' : 'text-alert-500'}`}>{certificate.scorePercent}%</div>
          </div>
          <div>
            <div className="text-slate-400">Certificate ID</div>
            <div className="font-medium text-slate-800">{certificate.certificateNumber}</div>
          </div>
        </div>

        {(primarySignature || secondarySignature) && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            {primarySignature && (
              <div className="text-center">
                <div className="h-12 flex items-end justify-center">
                  {primarySignature.imageDataUrl
                    ? <img src={primarySignature.imageDataUrl} alt="" className="max-h-12 max-w-[160px] object-contain" />
                    : <div className="text-slate-300 text-xs italic">No signature uploaded</div>}
                </div>
                <div className="border-t border-slate-300 mt-1 pt-1">
                  <div className="text-xs font-medium text-slate-800">{primarySignature.name || 'Instructor'}</div>
                  <div className="text-[10px] text-slate-400">{primarySignature.title || 'Instructor'}</div>
                </div>
              </div>
            )}
            {secondarySignature && (
              <div className="text-center">
                <div className="h-12 flex items-end justify-center">
                  {secondarySignature.imageDataUrl
                    ? <img src={secondarySignature.imageDataUrl} alt="" className="max-h-12 max-w-[160px] object-contain" />
                    : <div className="text-slate-300 text-xs italic">No signature uploaded</div>}
                </div>
                <div className="border-t border-slate-300 mt-1 pt-1">
                  <div className="text-xs font-medium text-slate-800">{secondarySignature.name || 'Medical Director'}</div>
                  <div className="text-[10px] text-slate-400">{secondarySignature.title || 'Medical Director'}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-[11px] leading-relaxed text-slate-400 border-t border-slate-100 pt-4">
          This certificate documents completion of a training simulation within ResusPro Academy. It is not an
          official AHA, ILCOR, ERC, or other governing-body certification and does not replace an accredited
          certification course, institutional credentialing, or clinical supervision.
        </div>

        {sealDataUrl && (
          <img src={sealDataUrl} alt="" className="absolute bottom-6 right-6 h-20 w-20 object-contain opacity-90 pointer-events-none" />
        )}
      </div>
    </div>
  )
})

export default CertificateCard
