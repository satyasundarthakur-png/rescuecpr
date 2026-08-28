import { forwardRef } from 'react'
import { Award, ShieldCheck, AlertTriangle } from 'lucide-react'
import type { Certificate } from '../types/domain'

// Original design in ResusPro Academy's own identity. Deliberately does NOT imitate any
// official AHA/ACLS/PALS card layout, color system, security border, or seal — see
// Section 21: completing this app must never be presented as equivalent to an official
// AHA/ILCOR certification, and this file must never gain elements (anti-counterfeit
// borders, "verify authenticity" QR codes, etc.) that imply real institutional
// verification this app doesn't provide. Signature and seal images are supplied by the
// instructor/institution issuing this internal training record — they must not be a
// copy of an official AHA/ILCOR/ERC seal or signature.
export interface CertificateSignature {
  name: string
  title: string
  imageDataUrl?: string | undefined
}

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <path d="M2 20 C2 9 9 2 20 2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M2 30 C2 14.5 14.5 2 30 2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="2" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
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
    <div ref={ref} className="glow-card relative w-full max-w-xl mx-auto rounded-2xl bg-white shadow-md overflow-hidden">
      <div className="h-2.5 bg-gradient-to-r from-clinical-600 via-gold-500 to-brand-blue-600" />

      {/* decorative frame */}
      <div className="relative m-3 rounded-lg border-2 border-clinical-200 p-[3px]">
        <div className="rounded-md border border-gold-300/70 p-8 relative overflow-hidden">
          <CornerFlourish className="absolute top-2 left-2 w-9 h-9 text-clinical-400" />
          <CornerFlourish className="absolute top-2 right-2 w-9 h-9 text-clinical-400 -scale-x-100" />
          <CornerFlourish className="absolute bottom-2 left-2 w-9 h-9 text-clinical-400 -scale-y-100" />
          <CornerFlourish className="absolute bottom-2 right-2 w-9 h-9 text-clinical-400 -scale-x-100 -scale-y-100" />

          {/* faint central watermark of the academy mark */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto w-56 h-56 text-clinical-100 opacity-60 pointer-events-none" fill="none">
            <path d="M50 82 C 26 64 8 48 8 30 C 8 16 19 6 32 6 C 40 6 46 11 50 18 C 54 11 60 6 68 6 C 81 6 92 16 92 30 C 92 48 74 64 50 82 Z" fill="currentColor" />
          </svg>

          <div className="relative">
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
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: SERIF }}>
                Training Completion Certificate
              </div>
              <div className="mt-4 text-3xl text-slate-900" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                {learnerName || 'Learner Name'}
              </div>
              <div className="mt-2 text-sm text-slate-500">has successfully completed</div>
              <div className="mt-3 inline-block px-5 py-1.5 rounded-md bg-clinical-600 text-white text-sm font-semibold tracking-wide">
                {courseTitle}
              </div>
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
              <img src={sealDataUrl} alt="" className="absolute bottom-0 right-0 h-20 w-20 object-contain opacity-90 pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default CertificateCard
