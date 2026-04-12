import React, { useState } from 'react'
import { useJobDetails } from '../hooks/useJobDetails'
import { useParams } from 'react-router-dom'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard  = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='bg-white rounded-4xl overflow-hidden hover:border-[#3a455e] transition'>
            <div className='flex gap-3 p-4 py-6 cursor-pointer' onClick={() => setOpen(o => !o)}>
                <span className='self-start text-[13px] font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/20 px-2 py-[2px] rounded'>Q{index + 1}</span>
                <p className='flex-1 text-md font-medium text-[#644D46] leading-relaxed'>{item.question}</p>
                <span className={`transition ${open ? "rotate-180 text-[#AE4113]" : "text-[#644D46]"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='px-4 pb-4 border-t border-[#2a3348] pt-3 flex flex-col gap-3'>
                    <div className='q-card__section'>
                        <span className='text-[10px] uppercase font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/20 px-2 py-[2px] rounded'>Intention</span>
                        <p className='text-normal text-[#644D46] mt-1'>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='text-[10px] uppercase font-bold text-[#16A34A] bg-[#DCFCE6] border border-green-400/20 px-2 py-[2px] rounded'>Model Answer</span>
                        <p className='text-normal text-[#644D46] mt-1'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='relative pl-14 py-3'>
        <div className='flex items-center gap-2'>
            <span className='text-[10px] font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/30 px-2 py-[2px] rounded-full'>Day {day.day}</span>
            <h3 className='text-normal font-semibold'>{day.focus}</h3>
        </div>
        <ul className='mt-2 flex flex-col gap-1'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex gap-2 text-sm text-[#644D46]'>
                    <span className='w-[5px] h-[5px] bg-[#AE4113] rounded-full mt-2' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)



const AIReportPage = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { jobId } = useParams()
    console.log("Fetching AI report for jobId:", jobId)
    const { aiReport, loading, error } = useJobDetails(jobId)
    console.log("AI Report:", aiReport)
    if(loading) return <p>Loading AI report...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>
    if(!aiReport) return <p className='text-gray-500'>No AI report found.</p>

    const scoreColor =
    aiReport.matchScore >= 80
      ? "border-green-500"
      : aiReport.matchScore >= 60
      ? "border-yellow-500"
      : "border-red-500"

  return (
    <div className="space-y-6">
      
        <div className="flex w-full max-w-7xl mx-auto min-h-screen bg-[#FBF9F8] ">
          {/* ── Left Nav ── */}
          <nav className="w-[220px] py-4 flex flex-col justify-between">
            <div className="nav-content flex flex-col flex-1  px-4 pb-6 gap-4 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center gap-2 w-full text-sm text-[#644D46] px-3 py-2 font-bold rounded-full transition
                     ${activeNav === item.id 
                     ? "bg-[#F6E6E0] text-[#AE4113]" 
                     : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="interview-nav__icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* ── Center Content ── */}
          <main className="flex-1 p-4 overflow-y-auto">
            {activeNav === "technical" && (
              <section>
                <div className="flex gap-3 items-center border-b border-[#2a3348] pb-4 mb-4">
                  <h2 className="text-2xl font-bold">Technical Questions</h2>
                  <span className="text-xs bg-[#fc9472] px-3 py-1 rounded-full text-[#92472F] font-bold">
                    {aiReport.technicalQuestions.length} questions
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {aiReport.technicalQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "behavioral" && (
              <section>
                <div className="flex gap-3 items-center border-b border-[#2a3348] pb-4 mb-4">
                  <h2 className='text-2xl font-bold'>Behavioral Questions</h2>
                  <span className="text-xs bg-[#fa9776] px-3 py-1 rounded-full text-[#92472F] font-bold">
                    {aiReport.behaviouralQuestions.length} questions
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {aiReport.behaviouralQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "roadmap" && (
              <section>
                <div className="flex gap-3 items-center border-b border-[#2a3348] pb-4 mb-4">
                  <h2 className="text-2xl font-bold">Preparation Road Map</h2>
                  <span className="">
                    {aiReport.preparationPlan.length}-day plan
                  </span>
                </div>
                <div className="relative">
                    <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#AE4113] to-transparent" />
                  {aiReport.preparationPlan.map((day) => (
                    <RoadMapDay key={day.day} day={day} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* ── Right Sidebar ── */}
          <aside className="w-[280px] p-4 flex flex-col gap-6">
            {/* Match Score */}
            <div className="flex bg-white rounded-4xl p-4 flex-col items-center gap-2">
              <p className="text-normal uppercase text-[#2a3348]">Match Score</p>
              <div className={`w-[90px] h-[90px] rounded-full border-4 flex items-center justify-center flex-col ${scoreColor}`}>
                <span className="text-2xl font-bold">
                  {aiReport.matchScore}
                </span>
                <span className="text-xs text-gray-400">%</span>
              </div>
              <p className="text-lg text-green-400 text-center">Strong match <br /> for this role</p>
            </div>

            {/* Skill Gaps */}
            <div className="skill-gaps bg-[#F5F3F2] rounded-4xl p-6 flex flex-col">
              <p className="text-normal uppercase text-gray-500 mb-2">Skill Gaps</p>
              <div className="flex flex-wrap gap-2">
                {aiReport.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`text-sm px-3 py-1 font-medium rounded border 
                        ${gap.severity === "high"
                        ? "text-red-400 border-red-400/30 bg-red-400/10"
                        : gap.severity === "medium"
                        ? "text-[#FE9D7E] border-yellow-400/30 bg-[#FE9D7E]/10"
                        : "text-[#4CAF50] border-green-400/30 bg-[#4CAF50]/30"
                    }`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

    </div>
  );
}

export default AIReportPage
