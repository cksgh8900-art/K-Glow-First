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
  Phone,
  Mail,
  Lock,
  Building,
  Award,
  Clock,
  Compass,
  Database,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  Truck,
  DollarSign,
  Settings,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

// @ts-ignore
import heroMapVisual from './assets/images/hero_map_visual_1781575693556.jpg';
// @ts-ignore
import ftwzWarehouseAmbient from './assets/images/india_ftwz_warehouse_1781844449776.jpg';
// @ts-ignore
import usaTiktokLivestream from './assets/images/usa_tiktok_livestream_1781576835623.jpg';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cargoValue, setCargoValue] = useState<number>(50000);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openProblemIndex, setOpenProblemIndex] = useState<number | null>(0);
  const [openStrengthIndex, setOpenStrengthIndex] = useState<number | null>(0);
  const [selectedStrengthModal, setSelectedStrengthModal] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Google Apps Script Connection States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appsScriptUrl, setAppsScriptUrl] = useState(() => {
    return localStorage.getItem('kglow_apps_script_url') || (import.meta as any).env?.VITE_APPS_SCRIPT_URL || '';
  });
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);
  const [testSentStatus, setTestSentStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Sync scroll positions for section active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problems', 'strategy', 'process', 'why', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    if (appsScriptUrl) {
      try {
        // Submit using text/plain to avoid CORS preflight options blocks on certain environments
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            companyName: formData.companyName,
            brandName: formData.brandName,
            contactName: formData.contactName,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            category: formData.category,
            india: formData.india,
            usa: formData.usa,
            timestamp: new Date().toISOString()
          })
        });

        // With no-cors, we can't inspect the body, but success means the network accepted the request.
        setFormSubmitted(true);
      } catch (err: any) {
        console.error('Google Sheets transmission error:', err);
        setSubmitError('구글 시트 연동 전송 중 일시적인 기술적 오류가 발생했습니다. 아래 제어판에서 연동 URL 상태를 확인해 주세요.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // If URL is not set yet, process normally as a local mockup success, but provide guidance.
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const [copied, setCopied] = useState(false);

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

  const handleTestSend = async () => {
    if (!appsScriptUrl) {
      alert('연동할 구글 Apps Script 웹 앱 URL을 먼저 입력하고 저장해 주세요.');
      return;
    }
    setTestSentStatus('sending');
    try {
      await fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          companyName: 'K-Glow 테스트 기업',
          brandName: '테스트 브랜드',
          contactName: '테스트 담당자',
          phone: '010-0000-0000',
          email: 'test@kglowofficial.co.kr',
          message: '스프레드시트 연동 테스트를 위한 테스트 데이터입니다.',
          category: 'skincare',
          india: true,
          usa: true,
          timestamp: new Date().toISOString()
        })
      });
      setTestSentStatus('success');
      setTimeout(() => setTestSentStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setTestSentStatus('error');
      setTimeout(() => setTestSentStatus('idle'), 4000);
    }
  };

  const handleCopyCode = () => {
    const appsScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 첫 번째 행에 헤더가 없을 경우 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수 시간 (Timestamp)", 
        "회사명 / 법인명", 
        "브랜드명", 
        "신청 담당자명", 
        "연락 번호", 
        "이메일 주소", 
        "관심 카테고리",
        "인도 진출 여부",
        "미국 진출 여부",
        "문의 내용"
      ]);
      // 헤더 스타일링 (어두운 회색 배경, 흰색 볼드 텍스트)
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground("#334155");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
    }
    
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.companyName || "",
      data.brandName || "",
      data.contactName || "",
      data.phone || "",
      data.email || "",
      data.category || "",
      data.india ? "Y" : "N",
      data.usa ? "Y" : "N",
      data.message || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "구글 시트 기록 성공" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}`;

    navigator.clipboard.writeText(appsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9f6] text-[#1e293b] antialiased" id="home">
      
      {/* HEADER SECTION - Glassmorphism Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-orange-100/40 bg-[#fafaf8]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Element */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#cf5c36] to-[#c5a880] flex items-center justify-center text-white font-display font-bold text-xl shadow-md transition-transform group-hover:scale-105">K</span>
            <div className="flex flex-col select-none text-left">
              <span className="font-display font-black text-lg tracking-wider text-slate-900 group-hover:text-[#cf5c36] transition-colors leading-none mb-0.5">K-GLOW</span>
              <span className="text-[10px] font-semibold tracking-widest text-[#b54624] uppercase leading-none">Global Accelerator</span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#problems" className={`flex items-center text-sm font-semibold tracking-tight transition-colors duration-200 ${activeSection === 'problems' ? 'text-[#b54624]' : 'text-slate-600 hover:text-slate-900'}`}>
              비즈니스 난제
            </a>
            <a href="#strategy" className={`flex items-center text-sm font-semibold tracking-tight transition-colors duration-200 ${activeSection === 'strategy' ? 'text-[#b54624]' : 'text-slate-600 hover:text-slate-900'}`}>
              2-Track 전략
            </a>
            <a href="#process" className={`flex items-center text-sm font-semibold tracking-tight transition-colors duration-200 ${activeSection === 'process' ? 'text-[#b54624]' : 'text-slate-600 hover:text-slate-900'}`}>
              3자 프로세스
            </a>
            <a href="#why" className={`flex items-center text-sm font-semibold tracking-tight transition-colors duration-200 ${activeSection === 'why' ? 'text-[#b54624]' : 'text-slate-600 hover:text-slate-900'}`}>
              K-Glow 강점
            </a>
            <a href="#faq" className={`flex items-center text-sm font-semibold tracking-tight transition-colors duration-200 ${activeSection === 'faq' ? 'text-[#b54624]' : 'text-slate-600 hover:text-slate-900'}`}>
              자주 묻는 질문
            </a>
          </nav>

          {/* Contact Direct Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-[#b54624] transition-all duration-300 shadow-sm"
            >
              글로벌 입점 문의
            </a>
          </div>

          {/* Mobile responsive toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg px-4 py-6"
            >
              <div className="flex flex-col space-y-3">
                <a
                  href="#problems"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  비즈니스 난제
                </a>
                <a
                  href="#strategy"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  2-Track 전략
                </a>
                <a
                  href="#process"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  3자 프로세스
                </a>
                <a
                  href="#why"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  K-Glow 강점
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  자주 묻는 질문
                </a>
                <div className="pt-3 border-t border-slate-100 flex">
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
                  >
                    가속 입점 문의
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - Premium Minimal Layout */}
      <section 
        className="relative overflow-hidden text-white pt-32 pb-40 bg-no-repeat bg-cover bg-center bg-[#070b13]"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(7, 11, 19, 0.95), rgba(7, 11, 19, 0.85)), url(${heroMapVisual})` 
        }}
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold backdrop-blur-sm">
            <Compass className="w-4 h-4 text-[#e07a5f]" />
            <span className="text-slate-300 font-medium">Korea & India Entity Hub Operational</span>
          </div>

          {/* Master Heading */}
          <div className="space-y-6">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12] break-keep">
              K-Beauty 글로벌 진출<br />
              <span className="bg-gradient-to-r from-[#e07a5f] to-[#c5a880] bg-clip-text text-transparent">
                미국, 인도 시장 진입을 위한<br />
                안전하고 빠른 파트너
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light font-sans max-w-2xl mx-auto break-keep">
              한국 본사와 인도 델리 현지 법인을 직접 소유·운영하는 유일한 독점 파트너.<br />
              현지 지사를 통해 까다로운 CDSCO 인허가 단계를 막힘없이 진행하고<br />
              미국 시장의 매출 확보 및 자금 순환 구조까지 연계 지원합니다.
            </p>
          </div>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#b54624] text-white font-bold text-base hover:bg-[#cf5c36] shadow-lg shadow-[#b54624]/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              무료 글로벌 진단 신청
            </a>
            <a
              href="#strategy"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold text-base transition-all duration-300"
            >
              2-Track 전략 보기
            </a>
          </div>

          {/* Pure Key Stats indicators */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-slate-300">
            <div className="space-y-1">
              <span className="block font-display font-extrabold text-2xl sm:text-3xl text-white">100%</span>
              <span className="text-xs text-slate-400 font-semibold">인도 라이선스 직소유</span>
            </div>
            <div className="space-y-1 border-x border-white/10">
              <span className="block font-display font-extrabold text-2xl sm:text-3xl text-white">0%</span>
              <span className="text-xs text-slate-400 font-semibold">통관 보류 리스크 해소</span>
            </div>
            <div className="space-y-1">
              <span className="block font-display font-extrabold text-2xl sm:text-3xl text-white">320%+</span>
              <span className="text-xs text-slate-400 font-semibold">미국 광고 성과 평균</span>
            </div>
          </div>

        </div>
      </section>

      {/* PROBLEMS SECTION - 3 Column Clear Bento */}
      <section className="py-24 bg-white text-left" id="problems">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Troubles in Global Expansion</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-snug">
              수출 대행사가 해결하기 어려운 진짜<br />
              <span className="text-[#b54624]">비즈니스 실무 병목</span>은 이것입니다.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "01",
                label: "인허가 장벽",
                title: "해외 보완 검역 및 CDSCO의 지속적인 반려 문제",
                desc: "의약품통제국(CDSCO) 성분 검사 보완 지시를 즉각 해결하지 못해, 준비해 둔 글로벌 마케팅 및 브랜드 런칭 시점이 무기한 지연되곤 합니다.",
                solution: "현지 자사 법인 명의의 Importer 라이선스를 통한 신속한 통관 진행"
              },
              {
                id: "02",
                label: "자금 동결",
                title: "고율의 수입 선납 관세로 인한 운영 자금 부담",
                desc: "한국에서 물품을 출하하는 즉시 고율의 관세(약 38%)를 선납해야 하므로, 현지 판매가 활성화되기도 전에 상당한 초기 자금이 묶이게 됩니다.",
                solution: "지정 FTWZ(자유무역지대) 보관 후 실제 판매량에 맞춘 순차적 통관"
              },
              {
                id: "03",
                label: "운영 부재",
                title: "현지 마케팅 성과 미흡 및 소통 조율의 어려움",
                desc: "해외 현지 대행사는 한국 브랜드 고유의 가치와 디자인 감각을 이해하기 어렵고, 국내 본사 인력은 현지 매체 최적화 및 광고 집행 경험이 부족해 비효율적인 마케팅 예산 소모가 발생합니다.",
                solution: "한국 본사 전담 마케팅 실시간 관리 및 미국·인도 맞춤형 미디어 광고 통합 집행"
              }
            ].map((problem, idx) => {
              const isOpen = openProblemIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#b54624] bg-white shadow-md' : 'border-slate-200 bg-white hover:border-[#b54624]/30'}`}
                >
                  <button
                    onClick={() => setOpenProblemIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-red-650 px-2 py-0.5 rounded bg-red-50">제한 {problem.id}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{problem.label}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug">
                        {problem.title}
                      </h3>
                    </div>
                    <span className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#b54624]/10 text-[#b54624]' : 'text-slate-500'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-slate-100 space-y-4">
                          <p className="text-sm leading-relaxed text-slate-600 font-light font-sans break-keep">
                            {problem.desc}
                          </p>
                          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/40 text-sm">
                            <span className="text-[10px] font-extrabold text-[#cf5c36] uppercase block mb-1">K-Glow 해법</span>
                            <span className="font-bold text-slate-800">{problem.solution}</span>
                          </div>
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

      {/* STRATEGY & COMPACT CALCULATOR SECTION */}
      <section className="py-24 bg-[#fafaf8] text-left border-t border-orange-100/30" id="strategy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">K-Glow 2-Track Model</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              매월 안정적인 정산과 글로벌 인프라 선점,<br />
              <span className="text-[#b54624]">전략적 양방향 진출</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20">
            
            {/* Track 1: USA (Left) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden border border-slate-900">
              <div className="space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded bg-white/15 text-[#e07a5f] font-mono text-xs font-bold uppercase tracking-wider">
                  Track 1 : 미국 (USA Market)
                </span>
                <h3 className="text-2xl font-display font-black text-white leading-tight">
                  안정적인 캐시플로우(Cash Flow) 확보
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light break-keep">
                  미국 Amazon FBA 정밀 키워드 Editing을 바탕으로 성과 중심의 ROAS 세팅과 함께 미국 숏폼 세일즈 TikTok Shop Affiliate 계약 마케팅을 투입합니다. 매월 안정적인 정산을 바탕으로 한국 브랜드사의 자금 흐름을 원활하게 보장합니다.
                </p>
                
                <div className="overflow-hidden rounded-xl bg-slate-900 aspect-video relative">
                  <img 
                    src={usaTiktokLivestream} 
                    alt="USA Livestream Content" 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] text-emerald-400 font-bold block bg-emerald-500/10 py-1 px-2.5 rounded w-max">미국 TikTok Shop 인플루언서 제휴 캠페인</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-slate-400">
                <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Target Channels</span>
                <span className="font-bold text-white">Amazon USA (PPC/FBA), TikTok Shop Shop Live</span>
              </div>
            </div>

            {/* Track 2: INDIA (Right) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden border border-slate-900">
              <div className="space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded bg-white/15 text-[#c5a880] font-mono text-xs font-bold uppercase tracking-wider">
                  Track 2 : 인도 (India Market)
                </span>
                <h3 className="text-2xl font-display font-black text-white leading-tight">
                  세계 최대 14억 오디언스 기반 독점지 선점
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light break-keep">
                  인도 델리 현지의 독점 면세물류 창고(FTWZ) 인프라를 연계하고 자사 수입 라이선스를 이용해 성분 통관 지연 및 검역 지연 리스크를 최소화합니다. 장기적 브랜드 소유가치를 극대화하여 독점 인프라 성장을 가속합니다.
                </p>

                <div className="overflow-hidden rounded-xl bg-slate-900 aspect-video relative">
                  <img 
                    src={ftwzWarehouseAmbient} 
                    alt="India FTWZ Logistics" 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] text-amber-300 font-bold block bg-amber-500/10 py-1 px-2.5 rounded w-max font-sans">인도 독점 지정 스마트 보세물류기지(FTWZ)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-slate-400">
                <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Target Channels</span>
                <span className="font-bold text-white">Amazon India, Nykaa, Myntra, Tata CLiQ</span>
              </div>
            </div>

          </div>

          {/* Minimal FTWZ Calculator */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
                <div className="text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a880] font-mono block">FTWZ (Free Trade Warehousing Zone) Cost Saving</span>
                  <h4 className="text-xl font-bold font-display text-white">자금 보존 시뮬레이터 (Cost Calculator)</h4>
                </div>
                <span className="px-3 py-1 rounded bg-[#b54624] text-white text-xs font-semibold">인도 수입 실질 관세율: 38% 적용 기준</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-300">인도 수입 예정 화물 원가 (USD):</span>
                    <span className="font-black text-brand-400 text-base font-mono text-[#e07a5f]">${cargoValue.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    value={cargoValue}
                    onChange={(e) => setCargoValue(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#e07a5f]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>$5k (최소 테스트)</span>
                    <span>$100k (중형 매칭 화물)</span>
                    <span>$200k (대형 물류량)</span>
                  </div>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">일반 직항 선납 관세</span>
                    <span className="text-sm font-black text-slate-300 font-mono">${Math.round(cargoValue * 0.38).toLocaleString()}</span>
                  </div>
                  <div className="bg-[#b54624]/10 p-4 rounded-xl border border-[#b54624]/30 space-y-1 text-center">
                    <span className="text-[10px] text-[#e07a5f] block font-bold">K-Glow 초기 납부 관세</span>
                    <span className="text-base font-extrabold text-[#e07a5f] font-mono animate-pulse">$0</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-xs text-slate-300 text-center">
                🔥 K-Glow의 FTWZ 솔루션을 활용하면 초기에 묶이지 않고 세이브할 수 있는 <span className="text-[#e07a5f] font-bold font-mono">${Math.round(cargoValue * 0.38).toLocaleString()} USD</span> 자금을 미국 광고 마케팅에 즉각 투자하여 효율을 극대화할 수 있습니다.
              </div>

            </div>
          </div>

        </div>
      </section>
      <section className="py-24 bg-white border-y border-orange-100/20 text-left" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Step-By-Step Operational Timeline</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              한국 - K-Glow 인도 - K-Glow 한국<br />
              <span className="text-[#b54624]">유기적인 3자 원스톱 프로세스</span> 파이프라인
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between border border-slate-800 shadow-md">
              <div className="absolute top-4 right-8 font-display font-black text-7xl text-white/[0.02] pointer-events-none select-none">
                01
              </div>
              
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-[#e07a5f] text-[10px] font-bold uppercase tracking-widest font-mono">STAGE 01. BRAND</span>
                <h3 className="text-lg font-bold">인도 FTWZ로 안전한 물품 이송</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light font-sans break-keep">
                  국내 브랜드사는 우수한 물품을 생산한 뒤, K-Glow의 선적 가이드에 맞추어 인도 지정 면세 자유무역지역(FTWZ)으로 직송 이송합니다.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
                <div className="flex gap-2">
                  <span className="text-xs text-[#e07a5f]">✔</span>
                  <span>FTWZ 면세 물량 서류 가이던스 일치화</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#e07a5f]">✔</span>
                  <span>화장품 전용 항온 항습 보존 물류 및 실시간 관리</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between border border-slate-800 shadow-md">
              <div className="absolute top-4 right-8 font-display font-black text-7xl text-white/[0.02] pointer-events-none select-none">
                02
              </div>
              
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-[#c5a880] text-[10px] font-bold uppercase tracking-widest font-mono">STAGE 02. INDIA OFFICE</span>
                <h3 className="text-lg font-bold">인도 법인 명의 통관 및 현지 입고</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light font-sans break-keep">
                  K-Glow의 정식 현지 법인 명의로 신속하게 수입 통관 절차를 진행하여 지정 FBA 창고 또는 현지 채널 물류창고로 안전하게 입고 및 관리를 이관합니다.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
                <div className="flex gap-2">
                  <span className="text-xs text-[#c5a880]">✔</span>
                  <span>현지 법인 수입대행 명의 즉시 대행 승인</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#c5a880]">✔</span>
                  <span>판매 실적에 맞춘 스마트 소량 통관 처리</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between border border-slate-800 shadow-md">
              <div className="absolute top-4 right-8 font-display font-black text-7xl text-white/[0.02] pointer-events-none select-none">
                03
              </div>
              
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-[#e07a5f] text-[10px] font-bold uppercase tracking-widest font-mono">STAGE 03. KOREA HQ</span>
                <h3 className="text-lg font-bold">글로벌 채널 마케팅 통합 지원</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light font-sans break-keep">
                  국내 최고 수준의 K-Beauty 성장 전문팀이 미국 키워드 최적화(SEO)와 맞춤 크리에이티브 퍼포먼스 광고, 브랜드 평판 및 CS 관리를 대행합니다.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
                <div className="flex gap-2">
                  <span className="text-xs text-[#e07a5f]">✔</span>
                  <span>미국 및 인도 로컬 뷰티 크리에이터 제휴 숏폼 부스트</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#e07a5f]">✔</span>
                  <span>실시간 물류 현황 및 자금 통합 대시보드 모니터링 지원</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHY K-GLOW - 3-Column Scanner Grid & Gateway Modal */}
      <section className="py-24 bg-[#fafaf8] text-left border-b border-orange-100/20" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">Why Choose K-Glow?</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-snug">
              일반 유통 대행사와는 다른<br />
              <span className="text-[#b54624]">K-Glow만의 3대 차별적 강점</span>
            </h2>
            <p className="text-sm text-slate-550 font-light font-sans max-w-lg mx-auto leading-relaxed break-keep">
              해외 진출 의사결정에 가장 핵심적인 3대 차별화 요소를 선정했습니다. 카드를 클릭하시면 상세한 전략 설명을 확인하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "01",
                label: "독점 안정성",
                icon: <Building className="w-6 h-6 text-[#cf5c36]" />,
                iconBg: "bg-[#e07a5f]/10",
                title: "현지 법인 직접 보유의 안정성",
                shortDesc: "인도 델리 현지에 정식 라이선스를 보유한 K-Glow 현지 자사 법인이 브랜드의 CDSCO 수입 승인과 유통 관리 전 과정을 법적 테두리 내에서 완벽하게 보호합니다."
              },
              {
                id: "02",
                label: "물류 혁신",
                icon: <Coins className="w-6 h-6 text-emerald-600" />,
                iconBg: "bg-emerald-500/10",
                title: "인도 지정 FTWZ 물류 강점",
                shortDesc: "화장품 수입 시 38% 고율의 수입 관세를 미리 선납할 필요 없이, K-Glow 전용 면세 물류 창고에 보관하며 실제 판매가 완료된 수량만큼만 순차적으로 통관시킵니다."
              },
              {
                id: "03",
                label: "수익 안전",
                icon: <Award className="w-6 h-6 text-amber-600" />,
                iconBg: "bg-[#c5a880]/10",
                title: "미국 - 인도 2-Track 자본 시너지",
                shortDesc: "미국 아마존 및 틱톡숍의 매월 안정적인 정산 자금력을 기반으로 유동 자금을 공급받고, 이를 인도 시장 안착을 위한 현지 브랜드 마케팅에 효율적으로 순환 투자합니다."
              }
            ].map((strength, idx) => {
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedStrengthModal(idx)}
                  className="group relative p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-[#b54624]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 text-left"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${strength.iconBg}`}>
                        {strength.icon}
                      </div>
                      <span className="text-2xl font-black text-slate-150 group-hover:text-[#b54624]/15 transition-colors font-mono">{strength.id}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-[#cf5c36] px-2 py-0.5 rounded bg-orange-50">{strength.label}</span>
                        <span className="text-[10px] font-bold text-[#b54624] tracking-widest uppercase">Click to Read</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#b54624] transition-colors">
                        {strength.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500 font-light font-sans break-keep pt-1">
                        {strength.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#b54624]">
                    <span>상세 가이드 보기</span>
                    <span className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-[#b54624]/10 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>



        </div>
      </section>

      {/* FAQ SECTION - Pruned and Simplified */}
      <section className="py-24 bg-white text-left" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#b54624] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase">FAQ Help Desk</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              글로벌 확장이 처음인 브랜드를 위한<br />
              <span className="text-[#b54624]">핵심 팩트 체크</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "인도 CDSCO 인증 시 성분 보완 지시를 이미 받았는데 해결이 가능할까요?",
                a: "K-Glow 현지 전문가들이 즉시 반려 사유를 철저히 분석하여, 현지 법인 명의의 인허가 서류 보완 및 수정 절차를 신속히 대행합니다. 정식 법적 절차 내에서 반려 리스크를 원천 해결하고 합법적인 수입 승인을 받도록 밀착 지원합니다."
              },
              {
                q: "인도 시장 진출 시 최초 물류 규모 제한이 필수로 요구되나요?",
                a: "초기 파일럿 컨테이너 및 LCL 소량 선적(최소 $5,000 상당)으로도 유연한 시장 진입이 가능합니다. 자사 전용 면세 물류 창고(FTWZ) 인프라를 사용하므로 물량이 적더라도 수입 관세 선납 부담이 전혀 없습니다."
              },
              {
                q: "미국 마케팅 수익을 인도 시장 안착 비용으로 선순환시키는 구조가 궁금합니다.",
                a: "미국 아마존 및 틱톡숍(Track 1)에서 매월 발생하는 정산금을 통해 안정적인 매출 자금을 확보하고, 이를 통해 미국 시장의 광고비 조달은 물론, 긴 시간이 소요되는 인도 시장의 인허가 및 초기 유통 대기 자금을 유기적으로 상호 보완하고 완충하도록 설계되어 있습니다."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-2xl border border-orange-100/30 bg-[#fafaf8] overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-orange-50/30 transition-colors gap-4"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-[#b54624] text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-150 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {faq.a}
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

      {/* CTA & CONTACT FORM */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-[#101725] to-[#1e1411] text-white relative text-left" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Context (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-widest text-[#e07a5f] bg-brand-500/10 px-3.5 py-1.5 rounded-full uppercase border border-[#e07a5f]/20 font-mono">Launch with K-Glow</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-tight break-keep">
                  더 늦기 전에,<br />
                  <span className="bg-gradient-to-r from-[#e07a5f] to-[#c5a880] bg-clip-text text-transparent">
                    K-Glow의 압도적 속도
                  </span>를 장착하십시오.
                </h2>
                <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed max-w-xl break-keep">
                  인도 14억 소비 시장의 영토적 퍼스트 무버가 될 것인가, 시기 장벽에 락(Lock)이 걸린 지연자들에 남을 것인가. 성분 검사 전과정은 철저한 비공개 비즈니스 연맹(NDA)으로 보호 보장됩니다.
                </p>
              </div>

              {/* Contacts */}
              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#e07a5f]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono mb-0.5">Contact E-Mail</span>
                    <span className="text-sm font-semibold text-slate-200">benjamin@kglowofficial.co.kr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#c5a880]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono mb-0.5">HQ Direct phone</span>
                    <span className="text-sm font-semibold text-slate-200">+82 10-3040-0321</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form (Right) */}
            <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-sm self-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleInquirySubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="font-bold text-lg text-white">가속 입점 및 비공개 사전 타당성 진단</h4>
                      <p className="text-xs text-slate-400 mt-1">기본 제안 내용 등록 즉시 전문 관세/물류진의 매칭 검사가 무상 수행됩니다.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">회사명 / 법인명 *</label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="예: 주식회사 케이스타코스"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white"
                        />
                        {formErrors.companyName && <span className="text-[10px] text-red-400 block mt-1">{formErrors.companyName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">브랜드명 *</label>
                        <input
                          type="text"
                          value={formData.brandName}
                          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                          placeholder="예: GLOWDERM"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white"
                        />
                        {formErrors.brandName && <span className="text-[10px] text-red-400 block mt-1">{formErrors.brandName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">신청 담당자명 *</label>
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="예: 최동진 본부장"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white"
                        />
                        {formErrors.contactName && <span className="text-[10px] text-red-400 block mt-1">{formErrors.contactName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">연락 번호 *</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="예: 010-1234-5678"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white"
                        />
                        {formErrors.phone && <span className="text-[10px] text-red-400 block mt-1">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">이메일 주소 *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="예: contact@yourbrand.cos"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-400 block mt-1">{formErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">성분 인허가 애로사항 및 제안 사항 *</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        placeholder="예: 인도 CDSCO 성분 반려 대응 여부, FTWZ(자유무역지대)를 통한 관세 절감 방안 및 미국 아마존 입점 일정이 궁금합니다."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-white leading-relaxed"
                      />
                      {formErrors.message && <span className="text-[10px] text-red-400 block mt-1">{formErrors.message}</span>}
                    </div>

                     {submitError && (
                      <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-300 text-xs rounded-lg break-keep leading-relaxed">
                        ⚠️ {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#b54624] hover:bg-[#cf5c36] disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          K-Glow 글로벌 제안서 전송 중...
                        </>
                      ) : (
                        'K-Glow 글로벌 제안서 전송'
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                      <span className="text-xl font-bold">✔</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">협력 문의 접수 완료</h4>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto break-keep">
                        문의가 성공적으로 접수되었습니다. K-Glow 미주 광고 전문가 및 인도 법인 담당자가 접수해주신 성분 및 브랜드 정보를 면밀히 분석한 후 24시간 내에 가이드라인을 제공해 드리겠습니다.
                      </p>
                    </div>

                    {!appsScriptUrl && (
                      <div className="mx-auto max-w-sm p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 leading-relaxed break-keep text-left">
                        💡 <strong>알림:</strong> 현재 구글 시트 연동 URL이 설정되어 있지 않아 문의 내용이 임시 접수되었습니다. 아래 제어판에서 구글 Apps Script 웹 앱 URL을 등록하시면 스프레드시트에 실시간으로 기록됩니다.
                      </div>
                    )}

                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-700"
                    >
                      새로운 문의 추가 등록
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5 text-left text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#b54624] flex items-center justify-center text-white font-bold text-xs">K</span>
                <span className="font-display font-black text-base tracking-wider text-white">K-GLOW</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 max-w-sm font-light break-keep">
                본사와 인도 자사 법인을 직접 연계하여 동시 운영함으로써, 한국 뷰티 브랜드사의 현지 통관 지연 문제를 해결하고 성공적인 글로벌 시장 진출과 브랜드 확장을 지원합니다.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold text-xs tracking-wider block">Korea Headquarter</span>
              <p className="font-light text-slate-400 leading-relaxed font-sans">
                경기도 성남시 분당구 황새울로360번길 21, 1005호<br />
                K-Glow 한국 사옥 글로벌 비즈니스 기획센터<br />
                TEL: +82-10-3040-0321
              </p>
            </div>

            <div className="space-y-2 font-sans">
              <span className="text-white font-bold text-xs tracking-wider block">India Coporation (Delhi)</span>
              <p className="font-light text-slate-400 leading-relaxed">
                7F, 703, PALM COURT, Gurgaon, Gurugram, haryana, 122007<br />
                K-Glow India Import & Tax Settlement Bureau<br />
                Email: benjamin@kglowofficial.co.kr
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <p>&copy; {new Date().getFullYear()} K-Glow Global Accelerator. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#problems" className="hover:text-slate-300">비즈니스 자문</a>
              <a href="#strategy" className="hover:text-slate-300">이용 약관</a>
              <a href="#contact" className="hover:text-slate-300">비공개 비밀유지 협약(NDA)</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STRATEGIC GATEWAY MODAL */}
      <AnimatePresence>
        {selectedStrengthModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStrengthModal(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Dialog container with clean scaling and subtle shadows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] text-slate-800 z-10"
            >
              {/* Top Accent Gradient Border */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#e07a5f] to-[#c5a880]" />

              <div className="p-6 sm:p-8 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest text-[#cf5c36] uppercase bg-orange-50 px-2 py-0.5 rounded leading-none block w-max">
                    K-Glow 핵심 전략 {selectedStrengthModal === 0 ? "01" : selectedStrengthModal === 1 ? "02" : "03"}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none">
                    {selectedStrengthModal === 0 
                      ? "현지 법인 직접 소유의 안정성" 
                      : selectedStrengthModal === 1 
                      ? "인도 지정 FTWZ 물류 강점" 
                      : "미국 - 인도 2-Track 자본 시너지"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStrengthModal(null)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Detailed Content Section */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-sm leading-relaxed text-slate-600 font-light pr-4">
                {selectedStrengthModal === 0 ? (
                  <>
                    <p className="break-keep text-[#b54624] font-semibold text-xs py-1 px-3.5 bg-orange-50/60 rounded-xl">
                      💡 대리점 위탁 수입이 아닌, CDSCO 라이선스를 당사 인도 법인 명의로 정식 등록하여 100% 안전한 브랜드의 라이선스 권리를 보장합니다.
                    </p>
                    <div className="space-y-4 pt-1">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">CDSCO 라이선스 소유권 분쟁 차단</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          인도 의약품통제국(CDSCO)에서 수입 등록증을 현지 대리점 명의로 발행할 경우, 향후 대리점과의 계약 변경이나 결별 시 브랜드사의 인허가권이 묶여 수출이 중단되는 리스크가 큽니다. K-Glow는 현지 자사 법인 명의로 수입 등록을 처리하여 브랜드사의 영업 권익과 권리를 완벽히 보호해 드립니다.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">실시간 통관 긴급 대응</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          K-Glow 델리 지사와 한국 본부가 긴밀히 공조하여 통관 과정에서 예기치 못하게 발생하는 보완 요청에 즉각적으로 서류 조치를 취함으로써 세관 정체 리스크를 최소화합니다.
                        </p>
                      </div>
                    </div>
                  </>
                ) : selectedStrengthModal === 1 ? (
                  <>
                    <p className="break-keep text-emerald-700 font-semibold text-xs py-1 px-3.5 bg-emerald-50/60 rounded-xl">
                      💡 수입 통관 시 약 38%의 고율 관세를 미리 선납할 필요 없이, 전용 FTWZ(자유무역지대)에 보관하며 실제 판매된 분량만큼만 나누어 부분 통관을 진행합니다.
                    </p>
                    <div className="space-y-4 pt-1">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">수입 관세 선납이 없는 현금 흐름 최적화</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          인도 세관에 선적물이 도착하자마자 고액의 수입 관세를 일시에 선납해야 하는 일반 수출입 방식과 달리, K-Glow 전용 FTWZ(자유무역지대)를 이용해 무세 상태로 안전하게 이송하여 보관할 수 있습니다.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">실제 판매 실적에 맞춘 순차 관세 정산</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          온라인 쇼핑몰, 뷰티 플랫폼 등 인도 메이저 멀티채널에서 실제 주문 및 판매가 일어난 물량에 비례해 수시로 부분 통관 및 세금 정산을 진행하므로, 불필요한 초기 운영 자본 소모를 철저히 방지합니다.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="break-keep text-[#c5a880] font-semibold text-xs py-1 px-3.5 bg-[#c5a880]/15 rounded-xl">
                      💡 성장이 상대적으로 완만한 인도 시장 진입기 동안 미국 틱톡숍/아마존의 매월 안정적인 매출 정산금을 연계하여 자금 순환을 활성화합니다.
                    </p>
                    <div className="space-y-4 pt-1">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">매월 안정적인 미국 캐시플로우 확보</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          인도 CDSCO 인허가 획득 및 초기 유통 안착기 동안 빠르게 매출 및 정산이 발생하는 미국 Amazon 및 TikTok Shop 채널을 먼저 가동하여 안정적인 현금 흐름을 선제 확보합니다.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-xs tracking-tight">리스크 분산과 시장 안착을 위한 재투자</span>
                        <p className="text-xs break-keep text-slate-500 font-normal">
                          미국 시장에서 확보한 안정적인 매출 수익을 차세대 성장 동력 시장인 인도 로컬 인플루언서 제휴 및 타겟 마케팅 비용으로 연계 투자함으로써 브랜드의 글로벌 성장을 가속합니다.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Direct Action Link */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 mt-6">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-black block font-sans uppercase">Action Gateway</span>
                    <span className="font-bold text-xs text-slate-800 break-keep">K-Glow 무료 맞춤 가이드라인 신청하기</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStrengthModal(null);
                      // Fill message content programmatically
                      const strengthName = selectedStrengthModal === 0 
                        ? "현지 법인 직접 소유의 안정성" 
                        : selectedStrengthModal === 1 
                        ? "인도 지정 FTWZ 물류 강점" 
                        : "미국 - 인도 2-Track 자본 시너지";
                      setFormData(prev => ({
                        ...prev,
                        message: `K-Glow 3대 강점 중 [${strengthName}] 부분과 관하여 당사 브랜드 입점 사전 타당성 분석 진단을 희망합니다.`
                      }));
                      // Smooth scroll
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#b54624] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    문의하기로 이동
                  </button>
                </div>
              </div>

              {/* Bottom footer with light info stats */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-semibold font-mono">
                Safe Enterprise Access Secured · CONFIDENTIAL NDA PROTECTED
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
