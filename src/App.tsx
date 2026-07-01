import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, TrendingUp, Coins, ShieldCheck, CheckCircle2, ArrowRight,
  MapPin, Sparkles, Phone, Mail, Lock, Building, Award, Clock,
  Compass, Database, Menu, X, ChevronDown, HelpCircle, Truck, DollarSign
} from 'lucide-react';

// @ts-ignore
import heroMapVisual from './assets/images/hero_map_visual_1781575693556.jpg';
// @ts-ignore
import ftwzWarehouseAmbient from './assets/images/india_ftwz_warehouse_1781844449776.jpg';
// @ts-ignore
import usaTiktokLivestream from './assets/images/usa_tiktok_livestream_1781576835623.jpg';

export default function App() {
  // --- 1. 상태 관리 (복구 및 수정) ---
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cargoValue, setCargoValue] = useState<number>(50000);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openProblemIndex, setOpenProblemIndex] = useState<number | null>(0);
  const [selectedStrengthModal, setSelectedStrengthModal] = useState<number | null>(null);
  
  // 폼 관련 상태 (문법 오류 수정됨)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false); 
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    companyName: '',
    brandName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });

  // 스크롤 감지 (디자인용)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problems', 'strategy', 'process', 'why', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          return;
        }
      }
      if (window.scrollY < 100) setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. 구글 앱스 스크립트 연동 로직 (최종 수정) ---
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim()) errors.companyName = '회사명을 입력해 주세요.';
    if (!formData.brandName.trim()) errors.brandName = '브랜드명을 입력해 주세요.';
    if (!formData.contactName.trim()) errors.contactName = '담당자명을 입력해 주세요.';
    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해 주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!formData.phone.trim()) errors.phone = '연락처를 입력해 주세요.';
    if (!formData.message.trim()) errors.message = '문의 내용을 입력해 주세요.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSending(true);

    // 유저님의 최신 구글 앱스 스크립트 주소
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx93A3zDFBj9jPnDLcuYg30WrPlMcVuP4qqYnmbahJjqSqU3lVXJdaIXvAy5PS3IUpEow/exec';

    const googleSheetData = {
      company: formData.companyName,
      brand: formData.brandName,
      applicant: formData.contactName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    };

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleSheetData)
      });
      setFormSubmitted(true);
      alert('성공적으로 접수되었습니다!');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setFormData({ companyName: '', brandName: '', contactName: '', email: '', phone: '', message: '' });
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9f6] text-[#1e293b] antialiased" id="home">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-orange-100/40 bg-[#fafaf8]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#cf5c36] to-[#c5a880] flex items-center justify-center text-white font-display font-bold text-xl transition-transform group-hover:scale-105">K</span>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-lg tracking-wider text-slate-900 leading-none">K-GLOW</span>
              <span className="text-[10px] font-semibold tracking-widest text-[#b54624] uppercase">Global Accelerator</span>
            </div>
          </a>
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#problems" className="text-sm font-semibold text-slate-600 hover:text-[#b54624]">비즈니스 난제</a>
            <a href="#strategy" className="text-sm font-semibold text-slate-600 hover:text-[#b54624]">2-Track 전략</a>
            <a href="#process" className="text-sm font-semibold text-slate-600 hover:text-[#b54624]">3자 프로세스</a>
            <a href="#why" className="text-sm font-semibold text-slate-600 hover:text-[#b54624]">K-Glow 강점</a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-[#b54624]">FAQ</a>
          </nav>
          <a href="#contact" className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-[#b54624]">글로벌 입점 문의</a>
        </div>
      </header>

      {/* HERO SECTION - 복구됨 */}
      <section className="relative pt-32 pb-40 bg-[#070b13] text-white overflow-hidden" style={{ backgroundImage: `linear-gradient(rgba(7, 11, 19, 0.9), rgba(7, 11, 19, 0.9)), url(${heroMapVisual})`, bgSize: 'cover' }}>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            K-Beauty 글로벌 진출<br />
            <span className="bg-gradient-to-r from-[#e07a5f] to-[#c5a880] bg-clip-text text-transparent">미국, 인도 시장의 선점 파트너</span>
          </h1>
          <p className="text-lg text-slate-300">한국 본사와 인도 현지 법인을 직접 운영하는 유일한 파트너입니다.</p>
          <div className="flex justify-center gap-4">
            <a href="#contact" className="px-8 py-4 bg-[#b54624] rounded-xl font-bold">무료 진단 신청</a>
            <a href="#strategy" className="px-8 py-4 bg-white/10 rounded-xl font-bold">전략 보기</a>
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION - 복구됨 */}
      <section className="py-24 bg-white" id="problems">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-3xl font-black">비즈니스 실무 병목의 해결</h2></div>
          <div className="space-y-4">
            <div className="p-6 border rounded-2xl">
              <h3 className="font-bold text-xl mb-2">01. 인허가 및 CDSCO 반려 문제</h3>
              <p className="text-slate-600 text-sm">현지 법인 명의 Importer 허가를 통해 즉각적인 패스를 제공합니다.</p>
            </div>
            <div className="p-6 border rounded-2xl">
              <h3 className="font-bold text-xl mb-2">02. 고율 관세 및 자금 동결</h3>
              <p className="text-slate-600 text-sm">FTWZ 면세창고 보관 후 소량 분할 통관으로 자금 유동성을 확보합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY & CALCULATOR - 복구됨 */}
      <section className="py-24 bg-[#fafaf8]" id="strategy">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">2-Track 전략 및 비용 시뮬레이션</h2>
          <div className="bg-slate-900 rounded-3xl p-10 text-white">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">인도 수입 화물 관세 절감 계산</h3>
                <input type="range" min="5000" max="200000" step="5000" value={cargoValue} onChange={(e)=>setCargoValue(Number(e.target.value))} className="w-full h-2 bg-slate-700 accent-orange-500 rounded-lg appearance-none cursor-pointer" />
                <p className="mt-4 text-sm">예정 화물 원가: <span className="text-orange-500 font-bold">${cargoValue.toLocaleString()}</span></p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl text-center"><span className="block text-xs">일반 관세</span><span className="text-xl font-bold">${Math.round(cargoValue*0.38).toLocaleString()}</span></div>
                <div className="bg-orange-500/20 p-4 rounded-xl text-center border border-orange-500/50"><span className="block text-xs">K-Glow 첫날 관세</span><span className="text-2xl font-black text-orange-500">$0</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM - 완벽 수정됨 */}
      <section className="py-24 bg-slate-950 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black leading-tight">가속 입점 문의</h2>
            <p className="text-slate-400">성분 인허가 및 제안 주시면 전문진이 즉시 검토합니다.</p>
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3"><Mail className="text-orange-500" /> <span>benjamin@kglowofficial.co.kr</span></div>
              <div className="flex items-center gap-3"><Phone className="text-orange-500" /> <span>+82 10-3040-0321</span></div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/60 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form key="form" onSubmit={handleInquirySubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">회사명 *</label>
                      <input type="text" value={formData.companyName} onChange={e=>setFormData({...formData, companyName:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white" placeholder="주식회사 케이스타코스" />
                      {formErrors.companyName && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.companyName}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">브랜드명 *</label>
                      <input type="text" value={formData.brandName} onChange={e=>setFormData({...formData, brandName:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white" placeholder="GLOWDERM" />
                      {formErrors.brandName && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.brandName}</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">신청 담당자명 *</label>
                      <input type="text" value={formData.contactName} onChange={e=>setFormData({...formData, contactName:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white" placeholder="담당자 이름" />
                      {formErrors.contactName && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.contactName}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">연락 번호 *</label>
                      <input type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white" placeholder="010-0000-0000" />
                      {formErrors.phone && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.phone}</span>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">이메일 주소 *</label>
                    <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white" placeholder="email@example.com" />
                    {formErrors.email && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">상세 문의 내용 *</label>
                    <textarea rows={3} value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-white" placeholder="내용을 입력하세요." />
                    {formErrors.message && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.message}</span>}
                  </div>
                  <button type="submit" disabled={isSending} className="w-full py-4 bg-orange-600 rounded-xl font-bold hover:bg-orange-500 disabled:opacity-50 transition-all">
                    {isSending ? "전송 중..." : "K-Glow 가속 제안 전송"}
                  </button>
                </motion.form>
              ) : (
                <div className="py-20 text-center space-y-6">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">접수 완료!</h3>
                  <button onClick={resetForm} className="px-6 py-2 bg-slate-800 rounded-lg text-xs">새로 문의하기</button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 text-center text-xs text-slate-500 border-t border-white/5">
        <p>&copy; 2026 K-Glow Global Accelerator. All rights reserved.</p>
      </footer>
    </div>
  );
}