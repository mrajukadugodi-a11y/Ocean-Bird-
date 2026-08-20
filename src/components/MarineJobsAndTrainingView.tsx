import React, { useState } from 'react';
import {
  MARITIME_JOBS,
  MARITIME_TRAINING_CENTERS,
  MARITIME_RECRUITMENT_AGENCIES,
} from '../data/southAsiaData';
import { MaritimeJob, MaritimeTrainingCenter, MaritimeRecruitmentAgency } from '../types';
import {
  Briefcase,
  GraduationCap,
  Building2,
  Users,
  Search,
  Filter,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  ShieldCheck,
  FileText,
  MapPin,
  Send,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Anchor,
  Ship,
  Sparkles,
  Heart,
  UserCheck,
  HeartHandshake,
  AlertCircle,
  PlusCircle,
  X,
} from 'lucide-react';

export const MarineJobsAndTrainingView: React.FC = () => {
  // Navigation Tabs: 'jobs' | 'training' | 'agencies'
  const [activeSubTab, setActiveSubTab] = useState<'jobs' | 'training' | 'agencies'>('jobs');

  // Jobs Filter State
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [ageFilter, setAgeFilter] = useState<number>(25);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Job for Detailed View Modal
  const [selectedJobModal, setSelectedJobModal] = useState<MaritimeJob | null>(null);

  // Job Application Form Modal State
  const [applyJob, setApplyJob] = useState<MaritimeJob | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantAge, setApplicantAge] = useState(24);
  const [applicantGender, setApplicantGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [applicantCountry, setApplicantCountry] = useState('India');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantExp, setApplicantExp] = useState('Fresher / Trainee');
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  // Filter Jobs
  const filteredJobs = MARITIME_JOBS.filter((job) => {
    // Dept Filter
    if (selectedDept !== 'All' && job.department !== selectedDept) return false;

    // Gender Filter
    if (selectedGender === 'Female Preferred' && job.genderEligibility !== 'Female Preferred') return false;

    // Age Filter (must fall in job's minAge - maxAge)
    if (ageFilter < job.minAge || ageFilter > job.maxAge) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDept = job.department.toLowerCase().includes(q);
      const matchVessel = job.vesselType.toLowerCase().includes(q);
      const matchQual = job.qualificationRequired.toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchVessel && !matchQual) return false;
    }

    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    const trackingId = `RPSL-APP-${Math.floor(Math.random() * 90000 + 10000)}`;
    setApplicationSuccess(trackingId);

    setTimeout(() => {
      setApplyJob(null);
      setApplicationSuccess(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
    }, 4000);
  };

  return (
    <div id="marine-jobs-and-training-view" className="space-y-8 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 rounded-2xl p-6 border border-sky-900/50 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
              <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>IMO STCW ACCREDITED MARITIME RECRUITMENT & TRAINING HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Marine Line Jobs, Training & Recruitment Centers</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Explore onboard and shore-based maritime careers for all age groups (18 to 60+), male & female seafarers, DG Shipping accredited academies, and verified RPSL recruitment agencies.
            </p>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('jobs')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'jobs'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs & Vacancies ({MARITIME_JOBS.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('training')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'training'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Training Academies ({MARITIME_TRAINING_CENTERS.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('agencies')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === 'agencies'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Recruitment Agencies ({MARITIME_RECRUITMENT_AGENCIES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB TAB 1: MARITIME JOBS PORTAL */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
                <Filter className="w-4 h-4" />
                <span>Filter Maritime Vacancies</span>
              </div>

              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search job title, qualification, vessel type..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Department Filter */}
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Department / Sector</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none"
                >
                  <option value="All">All Departments & Sectors</option>
                  <option value="Deck & Navigation">Deck & Navigation</option>
                  <option value="Engine & Electrical">Engine & Electrical</option>
                  <option value="Cruise Hospitality & Service">Cruise Hospitality & Service</option>
                  <option value="Catering & Galley">Catering & Galley</option>
                  <option value="Medical & Wellness">Medical & Wellness</option>
                  <option value="Port & Logistics">Port & Logistics</option>
                  <option value="Maritime Security & IT">Maritime Security & IT</option>
                </select>
              </div>

              {/* Gender Preference Filter */}
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Gender Preference / Eligibility</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-bold focus:outline-none"
                >
                  <option value="All">All Gender Eligibility (Male & Female)</option>
                  <option value="Female Preferred">Female Preferred Opportunities</option>
                </select>
              </div>

              {/* Applicant Age Filter Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Your Age Bracket:</span>
                  <span className="text-amber-400 font-mono">{ageFilter} Years Old</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>18 Yrs</span>
                  <span>35 Yrs</span>
                  <span>60+ Yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                        {job.department}
                      </span>
                      <h3 className="font-extrabold text-base text-white mt-1.5 leading-snug">
                        {job.title}
                      </h3>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                      {job.vacanciesCount} Openings
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Monthly Salary:</span>
                      <strong className="text-emerald-400 font-bold">
                        ${job.monthlySalaryUSD.toLocaleString()} USD / ₹{job.monthlySalaryINR.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Age Eligibility:</span>
                      <strong className="text-amber-300 font-mono">{job.minAge} - {job.maxAge} Years</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Gender Eligibility:</span>
                      <span className="text-cyan-300 font-bold">{job.genderEligibility}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Vessel / Station:</span>
                      <span className="text-slate-200">{job.vesselType}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Key Qualification:</div>
                    <p className="text-slate-300 line-clamp-2">{job.qualificationRequired}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Job Benefits Highlights:</div>
                    <div className="flex flex-wrap gap-1">
                      {job.benefits.slice(0, 3).map((b, i) => (
                        <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedJobModal(job)}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Full Details & Duties</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setApplyJob(job)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
              <div className="font-bold text-white">No jobs match your selected age or category filters.</div>
              <p className="text-xs">Adjust your age slider or department filters to see open vacancies.</p>
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 2: MARITIME TRAINING ACADEMIES */}
      {activeSubTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>STCW 2010 & DG SHIPPING ACCREDITED TRAINING CENTRES</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Maritime Training Academies for Male & Female Cadets
            </h2>
            <p className="text-xs text-slate-400">
              Get certified for pre-sea navigation, marine engineering, cruise hospitality, and women cadetship programs with high placement rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARITIME_TRAINING_CENTERS.map((center) => (
              <div
                key={center.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{center.countryFlag}</span>
                      <div>
                        <h3 className="font-extrabold text-base text-white">{center.name}</h3>
                        <div className="text-xs text-cyan-400 font-semibold flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{center.cityLocation}, {center.country}</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                      {center.placementAssistanceRatePct}% Placement Rate
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-400 font-semibold">Accreditation & Approval:</div>
                    <div className="text-amber-300 font-bold">{center.accreditation}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 uppercase">Featured Courses & Programs</div>
                    <div className="space-y-2">
                      {center.coursesOffered.map((course, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-white">
                            <span>{course.courseName}</span>
                            <span className="text-emerald-400">${course.feeUSD} USD Fee</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Duration: {course.durationWeeks} Weeks</span>
                            <span className="text-cyan-300">Target: {course.targetGender}</span>
                            <span className="font-mono">Age: {course.eligibilityAge}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5 text-slate-400 text-[11px]">
                    <div>Phone: <a href={`tel:${center.contactPhone}`} className="text-white hover:underline">{center.contactPhone}</a></div>
                    <div>Email: <a href={`mailto:${center.contactEmail}`} className="text-cyan-400 hover:underline">{center.contactEmail}</a></div>
                  </div>

                  <a
                    href={center.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center space-x-1.5"
                  >
                    <span>Academy Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 3: MARITIME RECRUITMENT AGENCIES */}
      {activeSubTab === 'agencies' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>VERIFIED GOVERNMENT APPROVED RECRUITMENT & MANNING AGENCIES (RPSL)</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Official Government Approved Manning Agencies
            </h2>
            <p className="text-xs text-slate-400">
              Direct crew recruitment, seaman book endorsement, visa assistance, and job placements through verified RPSL licensed agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARITIME_RECRUITMENT_AGENCIES.map((agency) => (
              <div
                key={agency.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{agency.countryFlag}</span>
                      <div>
                        <h3 className="font-extrabold text-base text-white">{agency.agencyName}</h3>
                        <div className="text-xs text-emerald-400 font-bold mt-0.5">{agency.licenseNumber}</div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                      {agency.activeJobsCount} Active Vacancies
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white font-semibold">{agency.city}, {agency.country}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Contact Officer:</span>
                      <span className="text-amber-300 font-bold">{agency.contactPerson}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Official Phone:</span>
                      <a href={`tel:${agency.phone.split('/')[0]}`} className="text-cyan-400 hover:underline font-bold">
                        {agency.phone}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Specialization Sectors</div>
                    <div className="flex flex-wrap gap-1">
                      {agency.specialization.map((spec, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          ⚓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={`mailto:${agency.email}`}
                    className="text-xs text-cyan-400 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{agency.email}</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveSubTab('jobs');
                      setSearchQuery(agency.agencyName.split(' ')[0]);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all"
                  >
                    View Agency Jobs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedJobModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                {selectedJobModal.department}
              </span>
              <h2 className="text-xl font-bold text-white">{selectedJobModal.title}</h2>
              <p className="text-xs text-slate-400">Posted by {selectedJobModal.recruitmentAgency}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="text-slate-500 text-[10px]">Monthly Salary</div>
                <div className="font-extrabold text-emerald-400 text-sm">
                  ${selectedJobModal.monthlySalaryUSD.toLocaleString()} USD
                </div>
                <div className="text-[10px] text-slate-400">₹{selectedJobModal.monthlySalaryINR.toLocaleString()}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">Age Range</div>
                <div className="font-bold text-amber-300">{selectedJobModal.minAge} - {selectedJobModal.maxAge} Years</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">Contract Term</div>
                <div className="font-bold text-white">{selectedJobModal.contractDurationMonths} Months</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase">Key Responsibilities & Duties</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedJobModal.keyDuties.map((duty, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase">Benefits & Allowances</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedJobModal.benefits.map((b, idx) => (
                  <div key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedJobModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setApplyJob(selectedJobModal);
                  setSelectedJobModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Apply For This Position</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB APPLICATION MODAL */}
      {applyJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setApplyJob(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase">Official RPSL Job Application</span>
              <h2 className="text-xl font-bold text-white mt-1">Apply for {applyJob.title}</h2>
              <p className="text-xs text-slate-400">Position ID: {applyJob.id} • {applyJob.recruitmentAgency}</p>
            </div>

            {applicationSuccess ? (
              <div className="p-5 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-center space-y-2 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="font-extrabold text-base text-white">APPLICATION SUBMITTED SUCCESSFULLY!</div>
                <div className="text-xs text-emerald-300">Your RPSL Tracking Reference ID: <strong className="font-mono underline">{applicationSuccess}</strong></div>
                <p className="text-[11px] text-slate-300">The recruitment officer will contact you on your provided phone number within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Rahul Sharma / Fatima Begum"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Age (Years)</label>
                    <input
                      type="number"
                      min={applyJob.minAge}
                      max={applyJob.maxAge}
                      required
                      value={applicantAge}
                      onChange={(e) => setApplicantAge(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Gender</label>
                    <select
                      value={applicantGender}
                      onChange={(e: any) => setApplicantGender(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Mobile Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 / +880 / +94..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="applicant@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Experience / Certification Level</label>
                  <select
                    value={applicantExp}
                    onChange={(e) => setApplicantExp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Fresher / Trainee">Fresher / Trainee (Needs STCW Training)</option>
                    <option value="1-3 Years Experience">1-3 Years Experience (Active CDC / Passport)</option>
                    <option value="3+ Years Senior Experience">3+ Years Senior Officer / Specialist</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT CANDIDATE APPLICATION</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
