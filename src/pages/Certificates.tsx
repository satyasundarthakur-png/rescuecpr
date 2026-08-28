import { useEffect, useRef, useState } from 'react'
import { Download, Printer, Save, RefreshCw, Upload, X, Pencil, Eye, Share2, Mail, BookmarkPlus, LayoutTemplate } from 'lucide-react'
import { courses } from '../data/seed'
import { useAuth } from '../hooks/useAuth'
import CertificateCard, { type CertificateSignature } from '../components/CertificateCard'
import type { Certificate } from '../types/domain'

const PASSING_SCORE = 80

interface CertTemplate {
  name: string
  courseId: string
  primarySig: CertificateSignature
  secondaryEnabled: boolean
  secondarySig: CertificateSignature
  sealEnabled: boolean
}

function todayInput() {
  return new Date().toISOString().slice(0, 10)
}

function genCertificateNumber(courseKey: string) {
  const hash = Math.floor(100000 + Math.random() * 900000)
  return `RPA-${courseKey}-${hash}`
}

function ImageUploadField({
  label, value, onChange,
}: { label: string; value?: string | undefined; onChange: (dataUrl: string | undefined) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="text-xs font-medium text-slate-500 mb-1.5">{label}</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700 transition-colors"
        >
          <Upload size={13} /> {value ? 'Replace image' : 'Upload PNG / SVG'}
        </button>
        {value && (
          <>
            <img src={value} alt="" className="h-8 max-w-[90px] object-contain border border-slate-200 rounded bg-slate-50 px-1" />
            <button type="button" onClick={() => onChange(undefined)} className="text-slate-400 hover:text-alert-500">
              <X size={14} />
            </button>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}

export default function Certificates() {
  const { user } = useAuth()
  const canEdit = user?.role === 'instructor' || user?.role === 'admin'

  const [editMode, setEditMode] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  const [learnerName, setLearnerName] = useState(user?.fullName ?? 'Demo Learner')
  const [courseId, setCourseId] = useState('course-bls')
  const [completionDate, setCompletionDate] = useState(todayInput())
  const [scorePercent, setScorePercent] = useState(88)
  const [certificateNumber, setCertificateNumber] = useState('RPA-BLS-000123')

  const [primarySig, setPrimarySig] = useState<CertificateSignature>({ name: '', title: 'Instructor' })
  const [secondaryEnabled, setSecondaryEnabled] = useState(false)
  const [secondarySig, setSecondarySig] = useState<CertificateSignature>({ name: '', title: 'Medical Director' })
  const [sealEnabled, setSealEnabled] = useState(false)
  const [sealDataUrl, setSealDataUrl] = useState<string | undefined>(undefined)
  const [templates, setTemplates] = useState<CertTemplate[]>([])
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false)

  useEffect(() => {
    try {
      setTemplates(JSON.parse(localStorage.getItem('rpa-cert-templates') ?? '[]'))
    } catch {
      setTemplates([])
    }
  }, [])

  const course = courses.find((c) => c.id === courseId)!
  const certificate: Certificate = {
    id: 'cert-draft',
    userId: user?.id ?? 'demo-learner',
    courseId,
    completionDate: new Date(completionDate).toISOString(),
    scorePercent,
    certificateNumber,
  }
  const passed = scorePercent >= PASSING_SCORE

  async function generatePdfBlob(): Promise<{ blob: Blob; filename: string } | null> {
    if (!printRef.current) return null
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')])
    const canvas = await html2canvas(printRef.current, { backgroundColor: '#ffffff', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    const filename = `${learnerName.replace(/\s+/g, '-').toLowerCase()}-${course.key.toLowerCase()}-certificate.pdf`
    return { blob: pdf.output('blob'), filename }
  }

  async function handleDownloadPdf() {
    if (!passed) return
    const result = await generatePdfBlob()
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleShare() {
    if (!passed) return
    const result = await generatePdfBlob()
    if (!result) return
    const file = new File([result.blob], result.filename, { type: 'application/pdf' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `${course.subtitle} certificate`, text: `${learnerName}'s ${course.subtitle} training completion certificate` })
        return
      } catch {
        // user cancelled or share failed — fall through to download
      }
    }
    // Fallback for browsers without file-sharing support: just download it.
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleEmail() {
    if (!passed) return
    await handleDownloadPdf()
    const subject = encodeURIComponent(`${learnerName} — ${course.subtitle} completion certificate`)
    const body = encodeURIComponent(
      `Hi,\n\nAttached is ${learnerName}'s training completion certificate for ${course.subtitle} (Certificate ID: ${certificateNumber}).\n\n` +
      `The PDF has just been downloaded to your device — please attach it here before sending, since browsers can't attach files to an email automatically.\n\n— ResusPro Academy`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  function handleSaveTemplate() {
    const name = window.prompt('Name this template (e.g. "BLS — standard sign-off"):', `${course.key} template`)
    if (!name) return
    const templates = JSON.parse(localStorage.getItem('rpa-cert-templates') ?? '[]') as CertTemplate[]
    const next = [...templates.filter((t) => t.name !== name), {
      name, courseId, primarySig, secondaryEnabled, secondarySig, sealEnabled,
    }]
    localStorage.setItem('rpa-cert-templates', JSON.stringify(next))
    setTemplates(next)
  }

  function applyTemplate(t: CertTemplate) {
    setCourseId(t.courseId)
    setPrimarySig(t.primarySig)
    setSecondaryEnabled(t.secondaryEnabled)
    setSecondarySig(t.secondarySig)
    setSealEnabled(t.sealEnabled)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Certificates</h1>
          <p className="text-slate-500 text-sm mt-1">Training completion records — not official body certification (see disclaimer below each card).</p>
        </div>
        {canEdit && (
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 no-print">
            <button
              onClick={() => setEditMode(false)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!editMode ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
            >
              <Eye size={13} /> Preview Mode
            </button>
            <button
              onClick={() => setEditMode(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${editMode ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
            >
              <Pencil size={13} /> Edit Mode
            </button>
          </div>
        )}
      </div>

      {canEdit && editMode && (
        <div className="no-print rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Student name</label>
              <input
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                list="demo-learners"
                placeholder="Select or type a learner"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
              />
              <datalist id="demo-learners">
                <option value="Demo Learner" />
                <option value="Asha Rao" />
                <option value="Priya Menon" />
                <option value="Rahul Singh" />
              </datalist>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.subtitle} ({c.key})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Completion date</label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Score %</label>
              <input
                type="number"
                min={0}
                max={100}
                value={scorePercent}
                onChange={(e) => setScorePercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${passed ? 'border-slate-300 focus:ring-clinical-300' : 'border-alert-500 focus:ring-amber-300'}`}
              />
              <div className={`text-xs mt-1 ${passed ? 'text-slate-400' : 'text-alert-500 font-medium'}`}>
                {passed ? `Meets ${PASSING_SCORE}% passing threshold` : `Below ${PASSING_SCORE}% passing threshold`}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Certificate ID</label>
              <div className="flex items-center gap-2">
                <input
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-clinical-300"
                />
                <button
                  type="button"
                  onClick={() => setCertificateNumber(genCertificateNumber(course.key))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700"
                >
                  <RefreshCw size={13} /> Autogen ID
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <div className="text-sm font-semibold text-slate-800 mb-3">Signatures & seal</div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={primarySig.name}
                    onChange={(e) => setPrimarySig((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Instructor name"
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
                  />
                  <input
                    value={primarySig.title}
                    onChange={(e) => setPrimarySig((s) => ({ ...s, title: e.target.value }))}
                    placeholder="Title"
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
                  />
                </div>
                <ImageUploadField
                  label="Instructor signature"
                  value={primarySig.imageDataUrl}
                  onChange={(v) => setPrimarySig((s) => ({ ...s, imageDataUrl: v }))}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <input type="checkbox" checked={secondaryEnabled} onChange={(e) => setSecondaryEnabled(e.target.checked)} className="rounded border-slate-300" />
                  Add second sign-off (Medical Director / Training Coordinator)
                </label>
                {secondaryEnabled && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={secondarySig.name}
                        onChange={(e) => setSecondarySig((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Name"
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
                      />
                      <input
                        value={secondarySig.title}
                        onChange={(e) => setSecondarySig((s) => ({ ...s, title: e.target.value }))}
                        placeholder="Title"
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinical-300"
                      />
                    </div>
                    <ImageUploadField
                      label="Second signature"
                      value={secondarySig.imageDataUrl}
                      onChange={(v) => setSecondarySig((s) => ({ ...s, imageDataUrl: v }))}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
                <input type="checkbox" checked={sealEnabled} onChange={(e) => setSealEnabled(e.target.checked)} className="rounded border-slate-300" />
                Show institutional seal / stamp
              </label>
              {sealEnabled && (
                <ImageUploadField label="Seal image" value={sealDataUrl} onChange={setSealDataUrl} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={() => setSavedAt(new Date().toLocaleTimeString())}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-clinical-600 text-white text-sm font-medium hover:bg-clinical-700"
            >
              <Save size={14} /> Save Changes
            </button>
            {savedAt && <span className="text-xs text-slate-400">Saved locally at {savedAt} (demo — not yet wired to a backend)</span>}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 no-print flex-wrap">
        <button
          onClick={handleDownloadPdf}
          disabled={!passed}
          title={!passed ? `Certificate is below the ${PASSING_SCORE}% passing threshold` : undefined}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-600"
        >
          <Download size={14} /> Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700"
        >
          <Printer size={14} /> Print Certificate
        </button>
        <button
          onClick={handleShare}
          disabled={!passed}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Share2 size={14} /> Share
        </button>
        <button
          onClick={handleEmail}
          disabled={!passed}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Mail size={14} /> Email Certificate
        </button>
        {canEdit && (
          <>
            <button
              onClick={handleSaveTemplate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700"
            >
              <BookmarkPlus size={14} /> Save as Template
            </button>
            {templates.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setTemplateMenuOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-clinical-400 hover:text-clinical-700"
                >
                  <LayoutTemplate size={14} /> Load Template
                </button>
                {templateMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-20">
                    {templates.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => { applyTemplate(t); setTemplateMenuOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-clinical-50 hover:text-clinical-700"
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="space-y-6">
        <CertificateCard
          ref={printRef}
          certificate={certificate}
          learnerName={learnerName}
          courseTitle={course.subtitle}
          passingScore={PASSING_SCORE}
          primarySignature={primarySig.name || primarySig.imageDataUrl ? primarySig : undefined}
          secondarySignature={secondaryEnabled ? secondarySig : undefined}
          sealDataUrl={sealEnabled ? sealDataUrl : undefined}
        />
      </div>
    </div>
  )
}
