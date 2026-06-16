import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  TrendingUp,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
  Layers,
  Store,
  Phone,
  Mail,
  FileText,
  Lock,
  Settings,
  Activity,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Building,
  Award,
  Clock,
  ExternalLink,
  Plus,
  Compass,
  Copy,
  Database,
  Menu
} from 'lucide-react';
import { Inquiry, ProcessStep, ProblemSolutionItem, ServiceCapability, FaqItem } from './types';
import { PROCESS_STEPS, PROBLEMS_AND_SOLUTIONS, SERVICE_CAPABILITIES, FAQS } from './data';
// @ts-ignore
import heroMapVisual from './assets/images/hero_map_visual_1781575693556.jpg';
// @ts-ignore
import customsBarrierGraphic from './assets/images/customs_barrier_graphic_1781575885337.jpg';
// @ts-ignore
import ftwzWarehouseAmbient from './assets/images/ftwz_warehouse_ambient_1781576033572.jpg';
// @ts-ignore
import usaTiktokLivestream from './assets/images/usa_tiktok_livestream_1781576835623.jpg';


// Initial dummy inquiries to showcase the Admin Inquiry management system right away if local storage is empty
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    companyName: '(주)라온코스메틱',
    brandName: 'LAONPURE',
    brandUrl: 'https://example-laonpure.com',
    contactName: '김지현 수석',
    email: 'jh.kim@raoncos.co.kr',
    phone: '010-1234-5678',
    category: 'skincare',
    status: 'reviewing',
    message: '인도  Nykaa 입점과 미국 아마존 연동 진출을 동시에 모색하고 있는 브랜드입니다. 현재 한국에서 CDSCO 인증 절차를 단독 시도하다 보완 명령이 내려져 해결책이 시급합니다. FTWZ 물류 보관 관세 이월 혜택에 상세 설명을 전해 받고 싶습니다.',
    createdAt: '2026-06-15T11:24:00-07:00',
    targetMarkets: { india: true, usa: true }
  },
  {
    id: 'inq-2',
    companyName: '블러썸뷰티 그룹',
    brandName: 'BLOSSOM_GLOW',
    brandUrl: 'https://example-blossomglow.com',
    contactName: '박민우 본부장',
    email: 'mw.park@blossombeauty.com',
    phone: '010-9876-5432',
    category: 'makeup',
    status: 'new',
    message: '미국 시장 틱톡 숍 완판 이력을 바탕으로, 현금 유동성(Cash Flow)을 단단히 굳히면서 아시아 최대 전략지인 인도 FBA 진입 타당성을 타진해 보고 싶습니다.',
    createdAt: '2026-06-15T16:15:00-07:00',
    targetMarkets: { india: true, usa: true }
  }
];

export default function App() {
  // Navigation active state for style highlights
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track select tabs (USA vs India)
  const [selectedTrack, setSelectedTrack] = useState<'USA' | 'India'>('USA');

  // Core Process Active Phase Slider
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // FTWZ interactive calculator cargo value (USD)
  const [cargoValue, setCargoValue] = useState<number>(50000);

  // Copied prompt feedback notification state
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Redesigned interactive Problem & Solution hover card state
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    companyName: '',
    brandName: '',
    brandUrl: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'skincare' as Inquiry['category'],
    message: '',
    india: true,
    usa: true
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Client-side Inquiry Persistence for Admin Console
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState<Inquiry | null>(null);
  const [adminNote, setAdminNote] = useState('');

  // Hydrate local storage inquiries
  useEffect(() => {
    const saved = localStorage.getItem('kglow_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        setInquiries(INITIAL_INQUIRIES);
      }
    } else {
      setInquiries(INITIAL_INQUIRIES);
      localStorage.setItem('kglow_inquiries', JSON.stringify(INITIAL_INQUIRIES));
    }
  }, []);

  // Sync scroll positions for section active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ['hero', 'problems', 'strategy', 'process', 'why', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          const offsetHeight = el.offsetHeight;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy to clipboard helper for image prompts kit
  const handleCopyPrompt = (promptText: string, id: string) => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedPromptId(id);
      setTimeout(() => {
        setCopiedPromptId(null);
      }, 2000);
    }).catch(() => {
      // safe fallback for iframe environments where clipboard API might be blocked
      const textArea = document.createElement('textarea');
      textArea.value = promptText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedPromptId(id);
        setTimeout(() => {
          setCopiedPromptId(null);
        }, 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    });
  };

  // Save inquiry handler
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) errors.companyName = '회사명(법인명)을 입력해 주세요.';
    if (!formData.brandName.trim()) errors.brandName = '브랜드명을 입력해 주세요.';
    if (!formData.contactName.trim()) errors.contactName = '담당자명을 입력해 주세요.';
    if (!formData.email.trim()) {
      errors.email = '이메일 주소를 입력해 주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!formData.phone.trim()) errors.phone = '연락처를 입력해 주세요.';
    if (!formData.message.trim()) errors.message = '문의 내용을 구체적으로 기록해 주세요.';
    if (!formData.india && !formData.usa) errors.targetMarkets = '희망 진출 대상국을 최소 하나 이상 선택해 주세요.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Auto-scroll to first error element
      const firstErrKey = Object.keys(errors)[0];
      const el = document.getElementsByName(firstErrKey)[0];
      if (el) el.focus();
      return;
    }

    setFormErrors({});
    
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      companyName: formData.companyName,
      brandName: formData.brandName,
      brandUrl: formData.brandUrl || undefined,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      status: 'new',
      message: formData.message,
      createdAt: new Date().toISOString(),
      targetMarkets: {
        india: formData.india,
        usa: formData.usa
      }
    };

    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('kglow_inquiries', JSON.stringify(updatedInquiries));
    setFormSubmitted(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      companyName: '',
      brandName: '',
      brandUrl: '',
      contactName: '',
      email: '',
      phone: '',
      category: 'skincare',
      message: '',
      india: true,
      usa: true
    });
    setFormSubmitted(false);
  };

  // Admin: Update Inquiry status
  const updateInquiryStatus = (id: string, newStatus: Inquiry['status']) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('kglow_inquiries', JSON.stringify(updated));
    if (selectedInquiryDetail && selectedInquiryDetail.id === id) {
      setSelectedInquiryDetail({ ...selectedInquiryDetail, status: newStatus });
    }
  };

  // Admin: Delete Inquiry
  const deleteInquiry = (id: string) => {
    if (confirm('해당 입점 문의 신청을 삭제하시겠습니까?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('kglow_inquiries', JSON.stringify(updated));
      setSelectedInquiryDetail(null);
    }
  };

  // Render Category Label
  const getCategoryLabel = (cat: Inquiry['category']) => {
    switch (cat) {
      case 'skincare': return '스킨케어 (Skincare)';
      case 'makeup': return '메이크업 (Makeup)';
      case 'hairbody': return '헤어/바디 (Hair & Body)';
      default: return '기타 뷰티 및 부대 카테고리';
    }
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded-full border border-red-200">신규 신청</span>;
      case 'reviewing':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-600 rounded-full border border-amber-200">검토 분석중</span>;
      case 'processing':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-200">상담 배정</span>;
      case 'done':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200">협의 완료</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fafaf8]" id="home">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-45 w-full border-b border-orange-100/40 bg-[#fafaf8]/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group shrink-0">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-luxury-gold flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">K</span>
            <div className="flex flex-col select-none whitespace-nowrap">
              <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-slate-900 group-hover:text-brand-600 transition-colors duration-200 leading-none mb-0.5">K-GLOW</span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#b54624]/80 uppercase leading-none">Global Accelerator</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            <a href="#problems" className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeSection === 'problems' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>비즈니스 난제</a>
            <a href="#strategy" className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeSection === 'strategy' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>2-Track 전략</a>
            <a href="#process" className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeSection === 'process' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>3자 협업 프로세스</a>
            <a href="#why" className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeSection === 'why' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>K-Glow 강점</a>
            <a href="#faq" className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${activeSection === 'faq' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>자주 묻는 질문</a>
          </nav>

          {/* Contact Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-block px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm whitespace-nowrap hover:bg-brand-600 transition-all duration-300 shadow-md hover:shadow-brand-500/20 hover:-translate-y-0.5 active:translate-y-0"
              id="header_cta_btn"
            >
              가속 입점 문의
            </a>
            
            {/* Tablet & Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile/Tablet Dropdown Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="lg:hidden absolute right-4 sm:right-6 top-[72px] w-52 rounded-2xl border border-orange-100/40 bg-white/95 backdrop-blur-md shadow-xl z-50 overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  <a
                    href="#problems"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${activeSection === 'problems' ? 'bg-orange-50/60 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    비즈니스 난제
                  </a>
                  <a
                    href="#strategy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${activeSection === 'strategy' ? 'bg-orange-50/60 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    2-Track 전략
                  </a>
                  <a
                    href="#process"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${activeSection === 'process' ? 'bg-orange-50/60 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    3자 협업 프로세스
                  </a>
                  <a
                    href="#why"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${activeSection === 'why' ? 'bg-orange-50/60 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    K-Glow 강점
                  </a>
                  <a
                    href="#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${activeSection === 'faq' ? 'bg-orange-50/60 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    자주 묻는 질문
                  </a>
                  <div className="pt-2 sm:hidden border-t border-slate-100 mt-2">
                    <a
                      href="#contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-brand-600 transition-colors"
                    >
                      가속 입점 문의
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ADMIN CONSOLE COMPONENT: Hidden collapsible controller */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1e293b] text-slate-100 overflow-hidden border-b border-slate-700 shadow-inner"
            id="admin_console_panel"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700 pb-4 mb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-brand-500" />
                    <h2 className="text-lg font-bold tracking-tight text-white">K-Glow 상담 승인 관리자 원장 (Inquiry Ledger)</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">사용자 페이지에서 제출한 입점 신청 문의내역이 즉각 저장되며 상태 제어 및 메모가 가능한 가상 시뮬레이션입니다.</p>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* List portion */}
                <div className="lg:col-span-5 bg-slate-900 rounded-lg p-4 border border-slate-700 max-h-80 overflow-y-auto">
                  <span className="text-xs font-bold text-luxury-gold uppercase tracking-widest block mb-3">접수 리스트 ({inquiries.length}건)</span>
                  {inquiries.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-sm">
                      접수된 상담 문의가 아직 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiryDetail(inq);
                            setAdminNote('');
                          }}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-200 hover:bg-slate-800 ${selectedInquiryDetail?.id === inq.id ? 'border-brand-500 bg-slate-800/80' : 'border-slate-800 bg-[#1e293b]'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-sm text-slate-100">{inq.companyName}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(inq.createdAt).toLocaleDateString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <div className="space-x-1.5">
                              <span className="text-brand-500 font-semibold">[{inq.brandName}]</span>
                              <span className="text-[#c5a880]">{getCategoryLabel(inq.category).split(' ')[0]}</span>
                            </div>
                            {getStatusBadge(inq.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Detail view portion */}
                <div className="lg:col-span-7 bg-slate-900 rounded-lg p-5 border border-slate-700">
                  {selectedInquiryDetail ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-3 gap-3">
                        <div>
                          <p className="text-xs text-slate-400">인증 및 가속 대기 브랜드</p>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            {selectedInquiryDetail.companyName} 
                            <span className="text-sm font-normal text-slate-300">({selectedInquiryDetail.brandName})</span>
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiryDetail.id, 'reviewing')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${selectedInquiryDetail.status === 'reviewing' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                          >
                            검토중
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiryDetail.id, 'processing')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${selectedInquiryDetail.status === 'processing' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                          >
                            상담배정
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiryDetail.id, 'done')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${selectedInquiryDetail.status === 'done' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                          >
                            수행완료
                          </button>
                          <button
                            onClick={() => deleteInquiry(selectedInquiryDetail.id)}
                            className="p-1 bg-red-950/40 text-red-400 rounded hover:bg-red-950 hover:text-red-300"
                            title="상담정보 파기"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                        <div>
                          <span className="text-slate-400 block mb-1">담당자 및 직책</span>
                          <span className="font-semibold text-slate-100">{selectedInquiryDetail.contactName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-1">파트너 연계 연락망</span>
                          <span className="font-semibold text-slate-100">{selectedInquiryDetail.phone}</span>
                        </div>
                        <div className="sm:col-span-1">
                          <span className="text-slate-400 block mb-1">제안 이메일 주소</span>
                          <span className="font-semibold text-slate-100">{selectedInquiryDetail.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-1">희망 타겟 마켓 포트폴리오</span>
                          <span className="font-semibold text-slate-100">
                            {selectedInquiryDetail.targetMarkets.india ? '🇮🇳 인도 진출 (Track 2) ' : ''}
                            {selectedInquiryDetail.targetMarkets.usa ? '🇺🇸 미국 진출 (Track 1)' : ''}
                          </span>
                        </div>
                        {selectedInquiryDetail.brandUrl && (
                          <div className="sm:col-span-2 border-t border-slate-700/60 pt-2 flex items-center justify-between">
                            <span className="text-slate-400">브랜드 공식 자사몰</span>
                            <a
                              href={selectedInquiryDetail.brandUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#c5a880] hover:underline flex items-center gap-1"
                            >
                              {selectedInquiryDetail.brandUrl} <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block mb-1">협력 요청 및 통관 문의 사항</span>
                        <div className="p-3 bg-[#1e293b] rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {selectedInquiryDetail.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-slate-500 text-sm">
                      좌측 문의 목록에서 파트너십 내역을 선택하면<br />K-Glow 현지 담당자용 원장 상세보기가 로드됩니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION WITH MAP BACKGROUND */}
      <section 
        className="relative overflow-hidden text-white pt-24 pb-32 bg-no-repeat bg-cover bg-center lg:bg-[length:112%_auto] lg:bg-[position:80%_35%] bg-[#0f1624]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(15, 22, 36, 0.95) 15%, rgba(15, 22, 36, 0.8) 60%, rgba(15, 22, 36, 0.94) 100%), url(${heroMapVisual})` 
        }}
        id="hero"
      >
        
        {/* Glow Ambient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-orange-500/5 to-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill / Badge */}
          <div className="flex justify-center md:justify-start mb-8">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#e07a5f] animate-pulse" />
              <span className="bg-gradient-to-r from-brand-100 to-luxury-gold bg-clip-text text-transparent">Korea & India Dual Entity Hub Operational</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copywriter portion */}
            <div className="lg:col-span-7 space-y-8 text-center md:text-left">
              
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight break-keep"
                >
                  K-Beauty 글로벌 성장,<br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#e07a5f] via-[#c5a880] to-[#fae6df] bg-clip-text text-transparent animate-glow-text">
                    인도와 미국 시장
                  </span>을 잇는<br className="hidden sm:inline" />
                  독보적 2-Track 전략
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-light mx-auto md:mx-0 break-keep"
                >
                  K-Glow는 한국 본사와 인도 현지 법인을 직접 운영하는 글로벌 뷰티 액셀러레이터입니다. 복잡한 물류·인허가 혁신과 정교한 현지 채널 퍼포먼스를 연계하여 K-뷰티 마케팅의 확실한 지속력(Cash Flow)과 막강한 미래가치를 구축합니다.
                </motion.p>
              </div>

              {/* Strategy Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto md:mx-0"
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:border-[#e07a5f]/40 transition-colors duration-300 group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase whitespace-nowrap">Track 01</span>
                    <span className="font-semibold text-xs text-white uppercase tracking-widest font-mono">USA Market Focus</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#e07a5f] transition-colors duration-200">즉각적 현금 유동성 (Cash Flow)</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">미국 Amazon 및 TikTok Shop 유기적 캠페인 운영 대행을 바탕으로 속도감 높은 세일즈와 안정적 자본 루프를 보장합니다.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:border-[#c5a880]/40 transition-colors duration-300 group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-brand-500/10 text-[#c5a880] border border-[#c5a880]/30 font-bold uppercase whitespace-nowrap">Track 02</span>
                    <span className="font-semibold text-xs text-white uppercase tracking-widest font-mono">India Market Preemption</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#c5a880] transition-colors duration-200">세계 최대 독점 잠재 영토 선점</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">인도 현지 법인 네트워크를 가동하여 복잡한 세관 장벽(FTWZ 및 CDSCO 특권)을 허물고 14억 인도 오디언스를 선점합니다.</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
              >
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-brand-500 text-white font-bold text-base hover:bg-brand-600 shadow-xl shadow-brand-500/15 transition-all duration-300 hover:-translate-y-1"
                >
                  무료 글로벌 타당성 진단 신청
                </a>
                <a
                  href="#strategy"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-base transition-all duration-300"
                >
                  전략 자세히 보기
                </a>
              </motion.div>

              {/* Simple Proof points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex items-center justify-center md:justify-start gap-8 pt-4 border-t border-white/5 text-slate-400 text-xs text-left"
              >
                <div>
                  <span className="block font-display font-medium text-lg text-white">100%</span>
                  인도 현지 직소유 법인
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="block font-display font-medium text-lg text-white">0%</span>
                  통관 지연 리스크 보장
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="block font-display font-medium text-lg text-white">320%+</span>
                  미국 Amazon 평균 PPC ROAS
                </div>
              </motion.div>

            </div>

            {/* Graphic illustration column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative bg-slate-900/60 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl group"
              >
                <div className="absolute -top-3 -right-2 z-15 px-3 py-1 bg-brand-500 rounded-full text-[10px] font-bold tracking-widest text-white uppercase shadow-md shadow-brand-500/20">GLOBAL NET</div>
                
                {/* Simulated live visual dashboard depicting Dual Tracks */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-semibold text-slate-400 tracking-wider">K-GLOW DUAL TRACK MAP</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#c5a880] font-mono">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      LIVE ROUTING OK
                    </span>
                  </div>

                  {/* HIGH-RES GENERATED VISUAL MAP */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-inner relative aspect-video bg-slate-950">
                    <img 
                      src={heroMapVisual} 
                      alt="K-Glow Global Logistics Gold-Path Luxury Map" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent flex flex-col justify-end p-4 text-left pointer-events-none">
                      <p className="text-white text-[11px] font-medium leading-snug drop-shadow-sm font-sans mb-0.5">서울 본사 - 뉴델리 법인 골드 이월 관세 노선도</p>
                      <p className="text-slate-400 text-[9px] font-light leading-none">Minimally Curated Dual-Track Custom Design</p>
                    </div>
                  </div>

                  {/* Korea Hub Node */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 relative text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#e07a5f]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">K-Glow Korea (HQ)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Campaign Command</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light">글로벌 마케팅 기획 | 인플루언서 제휴 모델링 | 물류 총괄 원격 동기화</p>
                  </div>

                  {/* Dual Tracks Branch */}
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="p-3.5 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/20 relative">
                      <span className="text-[10px] text-[#c5a880] font-mono block mb-1">TRACK 1: USA</span>
                      <h5 className="text-xs font-bold text-white mb-1">Amazon & TikTok</h5>
                      <span className="text-[10px] text-emerald-400 font-bold block bg-emerald-500/10 py-0.5 px-1.5 rounded w-max text-center">Fast Cash flow</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#e07a5f]/10 border border-[#e07a5f]/20 relative">
                      <span className="text-[10px] text-[#e07a5f] font-mono block mb-1">TRACK 2: INDIA</span>
                      <h5 className="text-xs font-bold text-white mb-1">FTWZ & CDSCO</h5>
                      <span className="text-[10px] text-amber-300 font-bold block bg-amber-500/10 py-0.5 px-1.5 rounded w-max text-center">Future Value</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400 text-center leading-relaxed">
                    🌟 <strong className="text-slate-100">FTWZ 장점:</strong> 인도 보세 창고에 무관세로 재고 입고 후 최적량만 분할 출고하여 세금 납부 장기 연기 가능!
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="py-24 bg-white relative" id="problems">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Difficulties in Global Scaling</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight break-keep">
              해외 수출 대행사의 뻔한 언어 장벽,<br className="hidden sm:inline" />
              <span className="text-brand-600">진짜 병목</span>은 다른 곳에 있습니다.
            </h2>
            <p className="text-slate-600 font-light text-base leading-relaxed break-keep">
              영어 소통이 가능하다고 글로벌 진출이 보증되지 않습니다. 대행사가 절대 해결해 주지 않던 진짜 화장품 수출 수입 장애 요소들을 철저히 분석하여 우회로를 개척해 드립니다.
            </p>
          </div>

          {/* Main 2-column layout with problems list on left and beautiful generated visual map on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side: Problems & Solutions list */}
            <div className="lg:col-span-12">
              {/* Desktop version: stacked cards with dynamic sliding/fanning hover effect */}
              <div className="hidden lg:block relative w-full h-[580px]" onMouseLeave={() => setActiveProblemId(null)}>
                <div className="absolute inset-x-0 top-[-24px] text-right pr-4 mb-2 pointer-events-none select-none text-[10px] font-mono tracking-widest text-[#cf5c36]/85 flex items-center justify-end gap-1.5 font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-rose-500" /> 마우스 커서를 올리면 해결책이 펼쳐집니다
                </div>
                {PROBLEMS_AND_SOLUTIONS.map((item) => {
                  const cardId = item.id;
                  
                  // Helper style resolution function
                  const getStyle = () => {
                    const baseClass = "absolute left-0 right-0 w-full rounded-3xl border transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden cursor-pointer p-6 sm:p-8 min-h-[390px] h-[390px] shadow-lg hover:shadow-2xl";
                    
                    // Default state
                    if (activeProblemId === null) {
                      if (cardId === 1) return {
                        className: `${baseClass} bg-gradient-to-b from-white to-[#faf9f6]/90 border-orange-100/40`,
                        style: { transform: 'translateY(0px) scale(0.96)', zIndex: 10, opacity: 0.95 }
                      };
                      if (cardId === 2) return {
                        className: `${baseClass} bg-gradient-to-b from-white to-[#faf9f6]/95 border-orange-100/50`,
                        style: { transform: 'translateY(75px) scale(0.98)', zIndex: 20, opacity: 0.98 }
                      };
                      return {
                        className: `${baseClass} bg-gradient-to-b from-white to-[#faf9f6] border-orange-100/70`,
                        style: { transform: 'translateY(150px) scale(1)', zIndex: 30, opacity: 1 }
                      };
                    }
                    
                    // Card 1 is active (hovered)
                    if (activeProblemId === 1) {
                      if (cardId === 1) return {
                        className: `${baseClass} bg-white border-brand-500/30`,
                        style: { transform: 'translateY(-10px) scale(1.02)', zIndex: 35, opacity: 1 }
                      };
                      if (cardId === 2) return {
                        className: `${baseClass} bg-slate-50 border-slate-200/50`,
                        style: { transform: 'translateY(410px) scale(0.95)', zIndex: 10, opacity: 0.4 }
                      };
                      return {
                        className: `${baseClass} bg-slate-50 border-slate-200/50`,
                        style: { transform: 'translateY(475px) scale(0.93)', zIndex: 5, opacity: 0.3 }
                      };
                    }
                    
                    // Card 2 is active (hovered)
                    if (activeProblemId === 2) {
                      if (cardId === 1) return {
                        className: `${baseClass} bg-slate-50 border-slate-200/50`,
                        style: { transform: 'translateY(-5px) scale(0.94)', zIndex: 5, opacity: 0.3 }
                      };
                      if (cardId === 2) return {
                        className: `${baseClass} bg-white border-brand-500/30`,
                        style: { transform: 'translateY(50px) scale(1.02)', zIndex: 35, opacity: 1 }
                      };
                      return {
                        className: `${baseClass} bg-slate-50 border-slate-200/50`,
                        style: { transform: 'translateY(460px) scale(0.95)', zIndex: 10, opacity: 0.4 }
                      };
                    }
                    
                    // Card 3 is active (hovered)
                    if (cardId === 1) return {
                      className: `${baseClass} bg-slate-50 border-slate-200/50`,
                      style: { transform: 'translateY(-10px) scale(0.93)', zIndex: 5, opacity: 0.3 }
                    };
                    if (cardId === 2) return {
                      className: `${baseClass} bg-slate-50 border-slate-200/50`,
                      style: { transform: 'translateY(45px) scale(0.95)', zIndex: 10, opacity: 0.4 }
                    };
                    return {
                      className: `${baseClass} bg-white border-brand-500/30`,
                      style: { transform: 'translateY(110px) scale(1.02)', zIndex: 35, opacity: 1 }
                    };
                  };
                  
                  const resolved = getStyle();
                  
                  return (
                    <div
                      key={item.id}
                      className={resolved.className}
                      style={resolved.style}
                      onMouseEnter={() => setActiveProblemId(cardId)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-stretch">
                        
                        {/* Left split: The Problem */}
                        <div className="p-4 flex flex-col justify-center space-y-4 pr-6 border-r border-dashed border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs font-mono border border-red-100">0{item.id}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-450">The Problem</span>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-[#cf5c36] text-base leading-snug mb-2 font-display">
                              {item.problemTitle}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-500 font-light font-sans">
                              {item.problemDesc}
                            </p>
                          </div>
                        </div>

                        {/* Right split: K-Glow Solution */}
                        <div className="p-4 flex flex-col justify-center space-y-4 pl-6 relative">
                          <div className="absolute top-4 right-4 text-[#b54624]/20 animate-pulse">
                            <Sparkles className="w-8 h-8" />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#cf5c36]">K-Glow Answer</span>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-base leading-snug mb-2 font-display">
                              {item.solutionTitle}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-600 font-light font-sans">
                              {item.solutionDesc}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile/Tablet version: Beautiful intuitive accordion */}
              <div className="lg:hidden flex flex-col gap-4">
                {PROBLEMS_AND_SOLUTIONS.map((item) => {
                  const isOpened = activeProblemId === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="rounded-2xl border border-orange-100/60 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                    >
                      {/* Accordion Trigger (Problem part) */}
                      <button
                        onClick={() => setActiveProblemId(isOpened ? null : item.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start gap-4 focus:outline-none focus:ring-0 active:bg-orange-50/25 transition-all duration-200"
                      >
                        <span className="w-7 h-7 shrink-0 rounded-lg bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs font-mono border border-red-100 mt-0.5">0{item.id}</span>
                        <div className="flex-1 space-y-1.5 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-450">The Problem</span>
                            {!isOpened && (
                              <span className="text-[9px] font-semibold text-brand-505 font-mono bg-orange-100/30 text-[#b54624] px-1.5 py-0.5 rounded">눌러서 해결책 보기</span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 leading-snug text-left">
                            {item.problemTitle}
                          </h4>
                          {isOpened && (
                            <p className="text-[11px] leading-relaxed text-slate-500 font-light mt-2 animate-fade-in text-left">
                              {item.problemDesc}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 mt-2 text-slate-405">
                          <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isOpened ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                      </button>

                      {/* Accordion Content (Solution Part) */}
                      {isOpened && (
                        <div className="p-5 sm:p-6 bg-brand-50/15 border-t border-orange-50/60 text-left space-y-3 animate-fade-in">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#cf5c36]">K-Glow Answer</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-950 leading-snug">
                            {item.solutionTitle}
                          </h4>
                          <p className="text-[11px] leading-relaxed text-slate-600 font-light font-sans">
                            {item.solutionDesc}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRACK STRATEGY SECTION (USA & INDIA) */}
      <section className="py-24 bg-gradient-to-b from-[#fafaf8] to-white relative overflow-hidden" id="strategy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">K-Glow 2-Track Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight break-keep">
              수익(Cash Flow)과 자산가치를 동시에,<br className="hidden sm:inline" />
              <span className="text-brand-600">전략적 양방향 타겟 노선</span>
            </h2>
            <p className="text-slate-600 font-light text-base leading-relaxed break-keep">
              속전속결 미국 마켓 플레이스에서의 빠른 정산으로 캐시 카우를 늘리고, 세계 최고 성장 잠재지인 인도 마켓에서 인프라 독점 권위를 굳혀 강력한 미래 성장을 가져갑니다.
            </p>

            {/* Strategy Select Toggle Buttons */}
            <div className="inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200 mt-6">
              <button
                onClick={() => setSelectedTrack('USA')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${selectedTrack === 'USA' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇺🇸 Track 1 (미국 즉각 캐시플로)
              </button>
              <button
                onClick={() => setSelectedTrack('India')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${selectedTrack === 'India' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇮🇳 Track 2 (인도 미래 타겟 선점)
              </button>
            </div>
          </div>

          {/* Interactive display of Track details */}
          <AnimatePresence mode="wait">
            {SERVICE_CAPABILITIES.filter(item => item.market === selectedTrack).map((capability) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                
                {/* Left card detail context summary */}
                <div className="lg:col-span-4 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#e07a5f]/10 rounded-full blur-3xl p-1" />
                  
                  <div className="space-y-5 relative z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/10 font-mono text-xs font-bold text-slate-100 tracking-wider">
                      {capability.market === 'USA' ? 'TRACK 1 - CASH FLOW CORE' : 'TRACK 2 - FUTURE GROWTH ASSET'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                      {capability.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {capability.highlight}
                    </p>
                  </div>

                  {/* Visual Asset integration depending on Market Track */}
                  <div className="overflow-hidden rounded-xl border border-white/5 relative aspect-video bg-slate-900 group/track-img my-5">
                    <img 
                      src={capability.market === 'USA' ? usaTiktokLivestream : ftwzWarehouseAmbient} 
                      alt={capability.market === 'USA' ? "TikTok Shop USA Live Stream Visual Asset" : "India FTWZ Warehouse Visual Asset"} 
                      className="w-full h-full object-cover group-hover/track-img:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent flex flex-col justify-end p-3 text-left">
                      <p className="text-white text-[10px] font-bold leading-none mb-0.5">
                        {capability.market === 'USA' ? '미국 틱톡숍 & 인플루언서 제휴 라이브' : '인도 법인 전담 스마트 적재 보세창고'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/10 relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e07a5f]/10 flex items-center justify-center text-[#e07a5f]">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs text-slate-400">주요 타겟 서비스 채널</span>
                        <span className="text-sm font-bold text-white">
                          {capability.market === 'USA' ? 'Amazon US, TikTok Shop Affiliate' : 'Amazon India, Nykaa, Myntra, Tata Cliq'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right grid: Three key benefits details */}
                <div className="lg:col-span-8 grid grid-cols-1 gap-6">
                  {capability.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-6 sm:p-8 rounded-2xl bg-white border border-orange-100/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-[#c5a880]/30"
                    >
                      <div className="space-y-2 text-left flex-1 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 text-[10px] font-bold bg-orange-50 text-[#cf5c36] rounded border border-orange-100">STEP 0{bIdx + 1}</span>
                          <span className="text-sm font-bold text-slate-900">{benefit.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">
                          {benefit.description}
                        </p>
                      </div>

                      {benefit.badge && (
                        <span className="px-3 py-1 bg-[#faf9f6] text-[#b54624] text-xs font-bold rounded-full border border-orange-200/50 shrink-0 select-none">
                          {benefit.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* FTWZ LOGISTICS ADVANTAGE HIGHLIGHTER */}
          <div className="mt-16 pt-16 border-t border-orange-100/40">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden text-left shadow-2xl">
              
              {/* Background ambient gold mesh */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                
                {/* Header title */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#e07a5f] animate-pulse" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a880] font-mono">India FTWZ (Free Trade Warehousing Zone) Benefit</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-snug">
                      인도 시장 성공의 승부처: <span className="bg-gradient-to-r from-[#ff825c] to-[#f3bd82] bg-clip-text text-transparent font-black drop-shadow-xs">FTWZ 스마트 물류 혁신</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-light max-w-2xl leading-relaxed">
                      글로벌 브랜드들이 인도 진출 후 80% 이상 좌초되는 주원인은 고율의 화장품 선납 관세(약 38%)와 무자비한 보관 통관 보류 때문입니다. K-Glow는 인도 정부 승인 FTWZ 보세물류 허브를 자체 활용하여 이 리스크를 제로화합니다.
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0 text-center md:text-right">
                    <span className="block text-[9px] text-[#c5a880] font-mono font-bold">INDIA TARGET BENEFIT</span>
                    <span className="text-sm font-black text-white">초기 관세 납부 0% 이월 보장</span>
                  </div>
                </div>

                {/* Grid comparing General vs FTWZ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Option A: General customs */}
                  <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">X</div>
                        <span className="text-xs font-bold text-slate-300">일반 직항 항공/해상 수입 통관</span>
                      </div>
                      <span className="text-[10px] text-red-400 font-mono font-bold bg-red-500/15 px-2.5 py-0.5 rounded-full border border-red-500/20">고리스크 유발</span>
                    </div>

                    <div className="border-t border-white/5 pt-3 space-y-3.5 text-xs text-slate-400">
                      <div className="flex justify-between items-center">
                        <span className="font-light text-slate-450">초기 관세 결제 타이밍</span>
                        <span className="font-bold text-slate-300">화물 인도 항구 도착 즉시 (DAY 1)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-light text-slate-450">인도 화장품 관세율</span>
                        <span className="font-bold text-slate-300">38.3% (BCD + SWS + IGST) 전액</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-light text-slate-450">CDSCO 성분 반려 리스크</span>
                        <span className="font-bold text-slate-300">물류 전량 압류 및 폐기 또는 반송 처분</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-light text-slate-450">아마존 FBA 입점 재입고 주기</span>
                        <span className="font-bold text-slate-300">인천 재발송시 평균 3~4주 소요</span>
                      </div>
                    </div>
                  </div>

                  {/* Option B: K-Glow FTWZ */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1c1d2e] to-[#12131c] border-2 border-[#e07a5f] space-y-4 relative shadow-xl shadow-[#e07a5f]/10">
                    <div className="absolute top-0 right-10 -translate-y-1/2 px-3 py-1 bg-brand-500 rounded-full text-[10px] font-bold text-white shadow-md animate-bounce">
                      🔑 독점 혜택 추천
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black shadow-md shadow-emerald-500/25">O</div>
                        <span className="text-sm font-bold text-white drop-shadow-md">K-Glow FTWZ 스마트 보세 물류</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 font-mono font-bold bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-400/40 shadow-xs">압도적 이점</span>
                    </div>

                    <div className="border-t border-white/10 pt-3 space-y-3.5 text-xs">
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-bold text-slate-100 drop-shadow-sm shrink-0">초기 관세 결제 타이밍</span>
                        <span className="font-extrabold text-[#f3bd82] border-b border-dashed border-[#f3bd82]/40 pb-0.5 text-right">실 판매 발생 시, 소량 단위 분할 납부</span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-bold text-slate-100 drop-shadow-sm shrink-0">검인 검역 보류 상황 대응</span>
                        <span className="font-extrabold text-[#f3bd82] border-b border-dashed border-[#f3bd82]/40 pb-0.5 text-right">FTWZ 대기 구역서 안전 배분 보존 & 조율</span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-bold text-slate-100 drop-shadow-sm shrink-0">아마존 FBA 입점 재입고 주기</span>
                        <span className="font-extrabold text-[#f3bd82] border-b border-dashed border-[#f3bd82]/40 pb-0.5 text-right">현지 델리 FTWZ서 보급 발송 (2일 이내)</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Live Simulation Calculator Slate */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#faf9f6]/5 border border-white/5 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Database className="w-4 h-4 text-brand-500" />
                        실시간 자본 절약 및 세금 유예 시뮬레이터 (FTWZ Live Calculator)
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light">슬라이더를 조절하여 인도 현지 통관 물량 자본 유동성 확보 금액을 가상 산정해 보십시오.</p>
                    </div>
                    <div className="px-3.5 py-1.5 bg-brand-500/20 text-[#e07a5f] rounded-lg border border-brand-500/10 text-xs font-mono font-black">
                      실 물류 관세율: 38% 시뮬레이션 적용
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-6">
                    
                    {/* Slider Column */}
                    <div className="md:col-span-6 space-y-4 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-300">인도 수입 예정 화물 원가 총액:</span>
                        <span className="font-black text-brand-400 text-sm font-mono">${cargoValue.toLocaleString()} USD</span>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="range"
                          min="5000"
                          max="200000"
                          step="5000"
                          value={cargoValue}
                          onChange={(e) => setCargoValue(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>$5,000 (소량테스트)</span>
                          <span>$100,000 (표준컨테이너)</span>
                          <span>$200,000 (대형물량)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg text-[11px] text-slate-300 leading-relaxed font-light">
                        💡 <strong className="text-white">CDSCO 보완 명령 발생 시:</strong> 일반 통관은 전체 통관 보류로 자본이 고사하지만, <span className="text-[#c5a880] font-semibold">K-Glow FTWZ</span> 보존 시 검수 통과분만 단계적으로 부분 수입 출고하여 타 부속 제품의 유통을 즉시 마케팅 실행시킬 수 있습니다.
                      </div>
                    </div>

                    {/* Result Card Column */}
                    <div className="md:col-span-6 grid grid-cols-2 gap-4">
                      
                      {/* Cost metrics card 1 */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                        <span className="block text-[10px] text-red-400 font-bold uppercase">일반 통관시 선지출 세금</span>
                        <span className="block text-lg font-black text-slate-200 font-mono font-bold">
                          ${Math.round(cargoValue * 0.38).toLocaleString()}
                        </span>
                        <p className="text-[9px] text-slate-500 leading-tight">컨테이너 인도 도착 시 즉각 세관 선결제 필요 (자본 락)</p>
                      </div>

                      {/* Cost metrics card 2 */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#c5a880]/10 to-brand-500/10 border border-[#c5a880]/30 text-center space-y-1 relative overflow-hidden">
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                        <span className="block text-[10px] text-[#c5a880] font-bold uppercase">K-Glow FTWZ 첫날 지출 관세</span>
                        <span className="block text-xl font-black text-brand-400 font-mono font-bold animate-pulse text-brand-500">
                          $0
                        </span>
                        <p className="text-[9px] text-[#c5a880] leading-tight">초기 관세 부담 제로! 판매량만큼만 영리하게 주단위 분할 정산</p>
                      </div>

                      {/* Cash flow leverage advantage box full width */}
                      <div className="col-span-2 p-3 bg-brand-500/10 rounded-xl border border-brand-500/20 text-center">
                        <span className="text-xs font-semibold text-white">
                          🔥 K-Glow 활용 시 추가 확보되는 <span className="text-brand-400 text-sm font-black font-mono">${Math.round(cargoValue * 0.38).toLocaleString()} USD</span> 현금 유동성!
                        </span>
                        <p className="text-[10px] text-slate-300 mt-1">이 보존 자금 전액을 미국 브랜드 세션 마켓 마케팅(TikTok/Amazon PPC)에 재투자하여 즉각 캐시를 폭증시킬 수 있습니다.</p>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE 3-WAY PROCESS SECTION */}
      <section className="py-24 bg-white relative border-y border-orange-50/50" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Step-By-Step Operation Flow</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight break-keep">
              한국 - K-Glow 인도 - K-Glow 한국<br className="hidden sm:inline" />
              <span className="text-brand-600">유기적 3자 밀착 가속 파이프라인</span>
            </h2>
            <p className="text-slate-600 font-light text-base leading-relaxed break-keep">
              통관, 풀필먼트 및 현지 온라인 판매 채널 활성화를 위한 책임 협력망을 확인해 보세요. 역할 분담이 확실하여 브랜드사에 추가 인력 고용과 물류 실패가 발생하지 않습니다.
            </p>

            {/* Step navigation selectors */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#faf9f6] rounded-xl border border-orange-100 max-w-xl mx-auto mt-6">
              {PROCESS_STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveProcessStep(step.id)}
                  className={`py-2 px-1 sm:px-3 rounded-lg text-xs font-bold transition-all duration-300 ${activeProcessStep === step.id ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <span className="block text-[8px] opacity-75 font-mono mb-0.5">{step.stage}</span>
                  {step.phaseTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Stepped Timeline visual card rendering with animations */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {PROCESS_STEPS.filter(step => step.id === activeProcessStep).map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-[#111827] to-[#1f2937] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 text-left relative overflow-hidden"
                >
                  {/* Watermark identifier */}
                  <div className="absolute top-4 right-8 font-display font-black text-8xl text-white/[0.03] select-none pointer-events-none uppercase">
                    {step.stage}
                  </div>

                  {/* Step Actor Label */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
                    <span className="px-3 py-1 rounded-full bg-white/10 uppercase font-mono text-xs font-bold tracking-wider text-[#c5a880] border border-white/10">
                      {step.actorLabel}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-brand-500 text-xs font-bold tracking-widest block uppercase font-mono mb-1">{step.stage} CORE MISSION</span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-300 font-light text-sm leading-relaxed max-w-3xl">
                        {step.description}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#c5a880] block mb-4">가속 운영 세부 세션 가이드 (Operation Guideline)</span>
                      <div className="space-y-3">
                        {step.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-[#e07a5f] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                              {dIdx + 1}
                            </span>
                            <span className="text-xs font-normal text-slate-200 leading-relaxed">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => {
                        if (activeProcessStep < 3) {
                          setActiveProcessStep(curr => curr + 1);
                        } else {
                          setActiveProcessStep(1);
                        }
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-[#c5a880] hover:text-[#e07a5f] transition-colors duration-200"
                    >
                      <span>{activeProcessStep === 3 ? "첫 단계로 회전" : "다음 협업 과정 파악"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* WHY K-GLOW ADVANTAGES SECTION */}
      <section className="py-24 bg-[#fafaf8]" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Why Choose K-Glow?</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight break-keep">
              글로벌 파트너를 원하십니까,<br className="hidden sm:inline" />
              <span className="text-brand-600">성장에만 미쳐있는 동반체</span>를 원하십니까?
            </h2>
            <p className="text-slate-600 font-light text-base leading-relaxed break-keep">
              K-Glow는 계약 수수료만 정산하는 단순 에이전트가 아닙니다. 현지에 자기 자본 법인을 박고 직접 허가 면허와 전용 세관 창고 인프라를 마련하여, 원팀으로 동반 가치를 창출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Edge Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-orange-100/40 shadow-sm space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-[#e07a5f]/10 text-brand-500 flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-slate-900 leading-snug">현지 법인 보유의<br className="hidden md:inline" /> 독점 안정성</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  인도 델리 현지에 정식 수입 통관 라이선스를 보유한 K-Glow 독점 자사 법인을 직접 가동합니다. 대리점의 일방 계약 파기나 통관 보류로 인한 재정 리스크가 100% 원친 해수됩니다.
                </p>
              </div>
            </div>

            {/* Edge Card 2 */}
            <div className="p-8 rounded-2xl bg-white border border-orange-100/40 shadow-sm space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-slate-900 leading-snug">물류 혁신 특권<br className="hidden md:inline" /> (인도 FTWZ 소유)</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  해외에 화장품이 닿자마자 고율의 세금을 선지급할 필요가 없습니다. K-Glow만의 면세물류 전진보초구인 FTWZ 특혜를 주선하여 주 단위, 판매 실적 단위로 영리하게 부분 수입 통관시킵니다.
                </p>
              </div>
            </div>

            {/* Edge Card 3 */}
            <div className="p-8 rounded-2xl bg-white border border-orange-100/40 shadow-sm space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-[#c5a880]/10 text-luxury-gold flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-slate-900 leading-snug">2-Track 완벽한<br className="hidden md:inline" /> 수익 안전 대칭성</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  회사의 장기 성장을 위해 인도 시장 타겟 선순위를 개설하면서도, 동시 미국 아마존 및 고효율 미국 틱톡 숍 제휴 캠페인을 통하여 단기 운영 자본을 매주 속도감 높게 확보해 드립니다.
                </p>
              </div>
            </div>

          </div>

          {/* Quick interactive testimonial or message panel */}
          <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden text-center border border-slate-800 shadow-xl group max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block font-mono">Accelerator Direct Voice</span>
                <p className="text-base font-light text-slate-200 leading-relaxed italic max-w-2xl mx-auto break-keep">
                  &ldquo;글로벌 이커머스는 단순 샵 개설로 성공을 보장하지 않습니다. 물류 통관 체인에 락이 걸리지 않는 압도적인 인프라 속권, 그리고 기획과 성과 측정에 지독할 정도의 한국적 마인드가 일맥상통해야 비로소 브랜드 가치가 안착됩니다. K-Glow는 그 성공 공식의 유일한 전도사입니다.&rdquo;
                </p>
                <span className="block text-xs font-semibold text-slate-400">— K-Glow Korea & India Co-Founders Team</span>
              </div>
              
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-block px-10 py-3.5 rounded-xl bg-[#c5a880] text-slate-950 font-bold text-xs hover:bg-[#b54624] hover:text-white transition-colors duration-350 text-center shadow-lg shadow-[#c5a880]/15"
                >
                  1:1 입점 자문 일정 선예약
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white relative" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">FAQ HELP DESK</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight break-keep">
              글로벌 확장이 처음인 브랜드를 위한<br className="hidden sm:inline" />
              <span className="text-brand-600">비즈니스 현실적 팩트 체크</span>
            </h2>
            <p className="text-slate-500 text-sm font-light max-w-xl mx-auto break-keep">
              허가가 거절되지는 않을지, 자금이 묶이지는 않을지 등 브랜드가 맞닥뜨릴 현실적인 고충에 즉설으로 가감 없이 안내해 드립니다.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-orange-100/40 bg-gradient-to-r from-white to-[#fafaf8] overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-orange-50/50 transition-colors duration-200 gap-4"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-500 text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION (CTA) & CONTACT FORM SECTION */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-[#101725] to-[#1e1411] text-white relative" id="contact">
        
        {/* Glow ambient orbs */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Copywriter segment */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6 text-center md:text-left">
                <span className="text-xs font-bold tracking-widest text-[#e07a5f] bg-brand-500/10 px-3.5 py-1.5 rounded-full uppercase border border-[#e07a5f]/20 font-mono">Ready to Scale?</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-tight break-keep">
                  더 늦기 전에,<br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#e07a5f] via-[#c5a880] to-white bg-clip-text text-transparent">
                    K-Glow의 폭발적 가속력
                  </span>을<br className="hidden sm:inline" />
                  장착하십시오.
                </h2>
                <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-xl break-keep">
                  인도 14억 초대형 내수 뷰티 시장의 선점주가 될 것인지, 아니면 수개월 수억 원의 통관 수취 실패를 지켜보기만 하는 관망자가 될 것인지. 최고의 2-Track 비즈니스 동맹을 수여받으십시오.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  *모든 입점 타당성 진단과 1:1 상담은 비공개 준수각서(NDA) 가이드라인 아래 성분을 보호하고 진행됩니다.
                </p>
              </div>

              {/* Direct corporate desk connections */}
              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#e07a5f]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Global Desk Hotline Identifier</span>
                    <span className="text-sm font-semibold text-slate-200">benjamin@kglowofficial.co.kr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#c5a880]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Korea Office Direct Dial</span>
                    <span className="text-sm font-semibold text-slate-200">+82 (0)10-3040-0321</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest">India Office Location Address</span>
                    <span className="text-sm font-normal text-slate-300">7F, 703, PALM COURT, PALM COURT, MG ROAD Industrial Estate Gurgaon, Sector 16, Gurugram,Gurugram, Haryana, 122007</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Form segment */}
            <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-sm self-center">
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="consultation-form"
                    onSubmit={handleInquirySubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    <div className="border-b border-white/10 pb-4 mb-2">
                      <h4 className="font-bold text-lg text-white">가속 입점 및 비공개 사전 타당성 진단 신청</h4>
                      <p className="text-xs text-slate-400 mt-1">간단한 세부내역만 보내주셔도 자사 물류/관세 전문진이 24시간 내 분석 피드백을 회신 드립니다.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">회사명 / 법인명 *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="예: 주식회사 케이뷰티스타"
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${formErrors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                        />
                        {formErrors.companyName && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.companyName}</span>}
                      </div>

                      {/* Brand Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">브랜드명 *</label>
                        <input
                          type="text"
                          name="brandName"
                          value={formData.brandName}
                          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                          placeholder="예: GLOWLAB"
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${formErrors.brandName ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                        />
                        {formErrors.brandName && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.brandName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Contact Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">신청자명 / 직함 *</label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="예: 홍길동 팀장"
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${formErrors.contactName ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                        />
                        {formErrors.contactName && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.contactName}</span>}
                      </div>

                      {/* Phone Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">연락처 *</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="예: 010-1234-5678"
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                        />
                        {formErrors.phone && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Location */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">이메일 주소 *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="예: partner@company.com"
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                        />
                        {formErrors.email && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.email}</span>}
                      </div>

                      {/* Brand Url */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">브랜드 웹사이트 / 쇼핑몰 URL (선택)</label>
                        <input
                          type="url"
                          name="brandUrl"
                          value={formData.brandUrl}
                          onChange={(e) => setFormData({ ...formData, brandUrl: e.target.value })}
                          placeholder="예: https://brandmall.cos"
                          className="w-full bg-[#111827] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    {/* Target markets checklist selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">원하시는 가속 타겟 마켓 (중복 가능) *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                          <input
                            type="checkbox"
                            checked={formData.india}
                            onChange={(e) => setFormData({ ...formData, india: e.target.checked })}
                            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-brand-500 focus:ring-brand-500"
                          />
                          🇮🇳 인도 시장 선점 (Track 2)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                          <input
                            type="checkbox"
                            checked={formData.usa}
                            onChange={(e) => setFormData({ ...formData, usa: e.target.checked })}
                            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-[#c5a880] focus:ring-[#c5a880]"
                          />
                          🇺🇸 미국 수익 강화 (Track 1)
                        </label>
                      </div>
                      {formErrors.targetMarkets && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.targetMarkets}</span>}
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">대표 뷰티 품목 카테고리 *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Inquiry['category'] })}
                        className="w-full bg-[#111827] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="skincare">스킨케어 (기초화장품, 에센스, 마스크팩 등)</option>
                        <option value="makeup">선케어 & 베이스 메이크업 (쿠션, 파운데이션 등)</option>
                        <option value="hairbody">헤어 & 바디 케어 제품군</option>
                        <option value="other">기타 뷰티 디바이스 및 부자재</option>
                      </select>
                    </div>

                    {/* Details input form */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">전략적 애로사항 및 통관/마케팅 협업 필요 항목 명기 *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="예: 현재 국내 CDSCO 검인 절차가 중단되어 피드백이 시급합니다. 무관세 수하창고 FTWZ 활용 시 예상 보장료와 초기 아마존 입점 조율 일정이 조견되는지 확인 부탁드립니다."
                        className={`w-full bg-[#111827] border rounded-lg p-4 text-xs text-white leading-relaxed focus:outline-none focus:ring-1 ${formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-brand-500 focus:border-brand-500'}`}
                      />
                      {formErrors.message && <span className="text-[10px] text-red-400 font-semibold block mt-1">{formErrors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 cursor-pointer text-center"
                    >
                      K-Glow 가속 솔루션 승인 문의 제출
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">가속 협력 문의 신청서 접수 완료!</h4>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                        성공적으로 물망에 등재되었습니다. K-Glow 한국 영양 마케팅 데스크 및 인도 델리 지부 통관 매니저가 성분 데이터 검토 후 24시간 내 유선 혹은 제안 이메일로 회신 드리겠습니다.
                      </p>
                    </div>

                    <div className="text-xs text-amber-300 font-bold bg-amber-500/10 p-3.5 rounded-lg border border-amber-500/20 max-w-sm mx-auto">
                      💡 아래 <strong className="underline">원장 실시간 확인</strong> 버튼을 클릭하면 제출된 정보의 가상 검증 원장 처리가 즉각 가능한 관리자 모드로 토글됩니다.
                    </div>

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={resetForm}
                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                      >
                        신규 파트 제안 작성
                      </button>
                      <button
                        onClick={() => {
                          setIsAdminOpen(true);
                          // Auto scroll to admin console anchor
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#b54624] text-[#1e293b] hover:text-white text-xs font-bold rounded-lg transition-all"
                      >
                        원장 실시간 확인
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5 text-left text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding segment */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold font-display text-sm">K</span>
                <span className="font-display font-black text-lg tracking-wider text-white">K-GLOW</span>
                <span className="px-2 py-0.5 rounded text-[8px] bg-[#c5a880]/10 text-[#c5a880] border border-[#c5a880]/20 font-mono font-bold">ACCELERATOR</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 max-w-sm font-light break-keep">
                K-Glow는 한국 본사와 인도 현지 법인을 직접 동시 가용 운영하여 K-beauty 스타트업 브랜드의 인도 통관, 물류, 마케팅, CS 성장을 전격 보조 지원하고 미주 마케팅 및 운영 대행하는 글로벌 액셀러레이터입니다.
              </p>
            </div>

            {/* Offices & Locations */}
            <div className="space-y-3">
              <span className="text-white font-bold text-xs uppercase tracking-widest block mb-1">Korea Headquarter</span>
              <p className="font-light text-slate-400 leading-relaxed">
                경기도 성남시 분당구 황새울로360번길 21, 10층 1005호<br />
                K-Glow 한국 사옥 커머스 비즈니스 유닛<br />
                TEL: +82-10-3040-0321 | FAX: +82-2-567-8903
              </p>
            </div>

            {/* India Entity */}
            <div className="space-y-3">
              <span className="text-white font-bold text-xs uppercase tracking-widest block mb-1">India Corporation (New Delhi)</span>
              <p className="font-light text-slate-400 leading-relaxed font-sans">
                7F, 703, PALM COURT, PALM COURT, MG ROAD Industrial Estate Gurgaon, Sector 16, Gurugram,Gurugram, Haryana, 122007<br />
                K-Glow India Import Clearance Center<br />
                E-mail: benjamin@kglowofficial.co.kr
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <p>&copy; {new Date().getFullYear()} K-Glow Global Beauty Accelerator Inc. All rights reserved.</p>
            
            <div className="flex gap-6">
              <a href="#problems" className="hover:text-slate-300">비즈니스 자문</a>
              <a href="#strategy" className="hover:text-slate-300">이용 약관</a>
              <a href="#contact" className="hover:text-slate-300">개인정보 보호법률(NDA)</a>
              <button onClick={() => { setIsAdminOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#c5a880] hover:underline">시뮬레이터 원장 포털</button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
