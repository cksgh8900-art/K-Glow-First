import { ProcessStep, ProblemSolutionItem, ServiceCapability, FaqItem } from './types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    stage: "STAGE 01",
    phaseTitle: "생산 및 FTWZ 입고",
    actor: "brand",
    actorLabel: "한국 브랜드사 (Brand)",
    title: "품질 중심의 제품 생산 및 인도 FTWZ로 안전한 물품 인도",
    description: "국내 브랜드사는 독보적인 제품 제조 후, K-Glow의 마스터 가이드를 연동하여 인도 무관세 자유무역지역(FTWZ)으로 안전하게 제품을 운송하여 인도합니다.",
    details: [
      "국내 브랜드사 주도로 인도 FTWZ 보세구역까지 제품 안전 발송 및 입고 진행",
      "인도의 적도 기후 유통 환경에 대비하기 위한 브랜드 맞춤형 보관 솔루션 사전 조율",
      "복잡한 보세창고 입고 연동용 물류 서류 작성에 대관 전반적 가이드라인 실시간 매핑"
    ]
  },
  {
    id: 2,
    stage: "STAGE 02",
    phaseTitle: "현지 통관 및 FBA 입고",
    actor: "india_office",
    actorLabel: "K-Glow 인도 현지 법인 (India Office)",
    title: "인도 법인 명의 수임 서류 작성 및 Amazon India FBA 완벽 이송",
    description: "인도 FTWZ 보세구역에 안전하게 보관된 제품을 K-Glow 인도 현지 정식 법인 명의로 신속하게 수입 및 통관 서류를 작성하여 Amazon India FBA 창고로 최종 입고시킵니다.",
    details: [
      "K-Glow 인도 현지 법인이 수입 대행사 명의(Importer of Record)로서 면밀한 통관 매치업 진행",
      "수탁 보관 물량 중 실제 세일즈 오더가 발생하는 볼륨에 한해 수시 유연하게 세관 분할 통관 수행",
      "아마존 글로벌 규격에 정합된 라벨 인쇄, 외관 패키징 재검수 거쳐 델리 허브에서 FBA 안전 세팅"
    ]
  },
  {
    id: 3,
    stage: "STAGE 03",
    phaseTitle: "마케팅 및 운영",
    actor: "korea_office",
    actorLabel: "K-Glow 한국 법인 (Korea HQ)",
    title: "글로벌 채널 마케팅 및 브랜드 자산 스케일업",
    description: "한국의 숙련된 이커머스 전문가 및 크리에이티브팀이 국경을 넘어 채널 점유율을 확장합니다. Amazon 운영, 광고 ROAS 최적화, 맞춤형 인플루언서 브랜딩 및 1:1 CS 대응까지 원스톱으로 관리합니다.",
    details: [
      "현지 고객 특화 키워드 최적화(SEO) 및 현지 뷰티 플랫폼 순위 고속 부스팅",
      "인도/미국 현지 뷰티 메가 크리에이터 연계 브랜드 가치 제고 마케팅",
      "실시간 대시보드를 연계한 스마트 재고 알림(Out-of-Stock pre-signal) 시스템 운영"
    ]
  }
];

export const PROBLEMS_AND_SOLUTIONS: ProblemSolutionItem[] = [
  {
    id: 1,
    problemTitle: "수개월이 걸리는 해외 화장품 복잡한 인허가 및 불투명한 통관 지연",
    problemDesc: "특히 까다롭기로 정평이 난 인도 CDSCO(의약품통제국) 성분 검사와 돌발적인 세관 억류 때문에 준비한 마케팅 시기를 해외에서 허무하게 놓치곤 합니다.",
    solutionTitle: "경험 기반의 로드맵 설계 및 자체 현지 수입 면허를 통한 원스톱 승인",
    solutionDesc: "K-Glow는 인도 자사 법인이 취득한 수입 허가(Importer of Record) 라이선스를 즉시 투입하고 현지 특화 전문 관세 법인을 통해 고속 검수를 통과합니다.",
    iconName: "ShieldAlert"
  },
  {
    id: 2,
    problemTitle: "글로벌 FBA 보관 수수료 완납 및 급격히 발생하는 악재 재고비",
    problemDesc: "수출하자마자 선입금되는 세금과 관세, 대규모 현지 창고 보관료는 스타트업 및 중견 뷰티 브랜드사에 회계상 급격한 유동성 정체를 초래합니다.",
    solutionTitle: "인도 FTWZ(자유무역구역) 스마트 면세 보관 및 인스턴트 분할 통관",
    solutionDesc: "FTWZ에 면세 상태로 대량 입고시켜 둔 후, 실시간 예상 소강량에 맞추어 주 단위로 통관하여 출하합니다. 세금 및 물류 고정 비용을 최대 60% 이상 캐시 세이브할 수 있습니다.",
    iconName: "TrendingDown"
  },
  {
    id: 3,
    problemTitle: "단순 리스폰스 없는 대행사 운영과 글로벌 마케팅 감각의 부재",
    problemDesc: "해외 매니저는 현지 사정에 어둡고, 현지 에이전시는 한국 브랜드 고유의 에스테틱 헤리티지와 비주얼 아이텐티티를 살리지 못해 광고비만 공중 소모됩니다.",
    solutionTitle: "한국 본사의 브랜드 헤리티지 기획력 + 미국 & 인도 현지 데이터 드리븐 최적화",
    solutionDesc: "K-Glow 한국 영양 전담 마케터진이 직접 톤앤매너를 지휘하며 미국 TikTok Shop 크리에이터 쇼케이스, 인도 고관여 채널을 동시에 공략하여 고효율 퍼포먼스를 만들어냅니다.",
    iconName: "RefreshCw"
  }
];

export const SERVICE_CAPABILITIES: ServiceCapability[] = [
  {
    id: 1,
    market: "USA",
    title: "Track 1: 미국 (USA Markt) - 즉각적인 캐시플로 확보",
    highlight: "아마존 US 최상위 검색 노출 및 쇼퍼블 숏폼 TikTok Shop 침투 퍼포먼스",
    benefits: [
      {
        title: "TikTok Shop 인플루언서 하이퍼 매칭 루프",
        description: "팔로워 10만~100만 단위의 검증된 US 로컬 뷰티 크리에이터에게 일관된 샘플 스퀘어를 제공하고 공동 수수료 방안(Affiliate)을 자동 계약하여 바이럴 대란을 유도합니다.",
        badge: "틱톡 공략 독점 가이드"
      },
      {
        title: "Amazon PPC 정밀 키워드 오디팅 및 성과형 ROAS 세팅",
        description: "트래픽이 확실한 K-beauty 전문 키워드를 타게팅하여 타 경쟁사 카테고리 대비 최대 35% 낮은 CPC(클릭당 비용)로 브랜드 샵의 상위 랭킹 안착율을 높입니다.",
        badge: "평균 ROAS 320%대 돌파"
      },
      {
        title: "실시간 세일즈 부스팅으로 신속한 대금 회수 가속화",
        description: "고전적 장기 수출 계약 마진의 부동성을 깨고, 틱톡/아마존 직접 유통 채널로 얻은 매출 수익금을 최단 속도 정산하여 지속 가능한 자금 유동성을 보장합니다.",
        badge: "Cash Flow 즉시 확보"
      }
    ]
  },
  {
    id: 2,
    market: "India",
    title: "Track 2: 인도 (India Market) - 미래 성장 폭발력 선점",
    highlight: "세계 최대 잠재 소비자(14억)와 아시아 최고 성장률 뷰티 시장의 독점 전진기지 구축",
    benefits: [
      {
        title: "독점적 인도 FTWZ(자유무역지대) 듀얼 물류 허브 설계",
        description: "한국에서 선적한 귀사의 소중한 화장품이 인도 영토 내 무관세 지대인 FTWZ에 안전하게 수입 대기 상태로 적재됩니다. 필요한 물량만 수시 세관 통가함으로써 이자 비용 및 리스크를 완벽 제어합니다.",
        badge: "업계 유일 인프라 가동"
      },
      {
        title: "CDSCO 검사 및 수입 화장품 정식 정부 인허가 원스톱 대리",
        description: "수집부터 반려 통보, 서류 누락 걱정 없이 K-Glow의 인도 현지 전담 변호사 및 통관 관리가 직접 검증 서류를 정리하여 안정적인 브랜드 인증 발급을 성공적으로 책임집니다.",
        badge: "공식 해외 대리인 역할 수행"
      },
      {
        title: "Nykaa, Myntra 등 초대형 인도 플랫폼 옴니채널 연계성",
        description: "Amazon India 로켓 성장을 디딤돌 삼아, 인도 현지 No.1 뷰티 플랫폼 NYKAA와 MYNTRA 등 대형 럭셔리 마켓플레이스 입점 및 주요 현지 백화점 쇼케이스 입점 컨설팅 지원.",
        badge: "현지 유통 로드맵 제공"
      }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "인도 화장품 시장은 CDSCO 허가 취득이 무척 어렵다고 들었습니다, K-Glow와 연대하면 기간이 어느 정도 단축되나요?",
    answer: "인도 의약품통제국(CDSCO) 화장품 등록은 개별 브랜드가 현지 대리인 없이 추진할 경우 거절 보류와 피드백 대기로 최소 6개월에서 1년 이상이 소요됩니다. K-Glow는 인도 자사 현지 법인이 서류 대행 대리인(Local Authorized Representative) 역할을 공식 수임하며, 기존 검수를 마친 포뮬러 매핑 전술을 활용해 통과 기간을 평균 2~3개월 이내로 극적으로 단축시킵니다."
  },
  {
    question: "FTWZ(Free Trade Warehousing Zone)를 이용하면 구체적으로 어떤 재무적 이점이 있나요?",
    answer: "인반 통관은 인도 도착 순간 전체 화물 가액의 약 30~41%에 달하는 고율의 조세를 즉각 완납해야 수입이 가능합니다. 반면 K-Glow의 FTWZ 솔루션은 비관세 지역 상태에 화물을 보관하므로, 당장 관세를 한 푼도 내지 않고 창고에 입고시킬 수 있으며 차후 매주/매달 온라인 주문 배송량에 상응하는 소규모 수량에 대해서만 부과세를 납부하여 즉시 통관시킵니다. 따라서 세금 선납 부담을 80% 이상 장기 지연시켜 회사 자금을 다른 고운용 영역에 융통시킬 수 있습니다."
  },
  {
    question: "해외 마케팅 대행 외에 추가적인 브랜드 매니징도 같이 지원하나요?",
    answer: "K-Glow는 단순히 노출만 만드는 마케팅 대행사가 아닙니다. '글로벌 엑셀러레이터'로서 물류 전반, 통관 보류 리스크 관리, 로컬 브랜딩 가이드 라인 빌드, CS 관리 및 인도와 미국의 이커머스 채널 정산까지 귀사의 전 사적인 파트너 부서처럼 직접 기획하고 집행해 드리는 유기적 성장 가속 서비스를 전면 실행합니다."
  },
  {
    question: "미국 Track 1과 인도 Track 2를 동시에 개시하여 진행해야 하나요?",
    answer: "아니요, 브랜드 본사의 유동 단계와 보유 자금 우선순위에 맞추어 유연하게 설계할 수 있습니다. 즉각적인 매출(Cash Flow)과 트렌드 리프팅)이 급선무인 브랜드는 미국 Track 1(틱톡 숍 및 아마존 US)부터 단기 기획하여 개시할 수 있고, 미래 투자를 염두에 두고 중장기 거대 점유율 브랜드 자산을 쌓으려는 곳은 인도 Track 2부터 집중 안착시키는 형태로 커스텀 지원도 가능합니다."
  }
];

export interface DesignPromptItem {
  id: string;
  sectionName: string;
  usage: string;
  style: string;
  engine: string;
  prompt: string;
}

export const DESIGN_PROMPTS: DesignPromptItem[] = [
  {
    id: "prompt-hero",
    sectionName: "Hero Section (영웅 메인 섹션)",
    usage: "랜딩페이지 최상단 헤드 헤로 배경 명품 비주얼 또는 와이드 와이드 배너 슬레이트",
    style: "Minimal Luxury Commercial Photography, High-End Studio Ambient",
    engine: "Midjourney v6.0 / DALL-E 3",
    prompt: "A luxurious and professional corporate global logistics abstract visual, showing a premium dark blue glass map connecting Seoul (South Korea) and New Delhi (India) with glowing golden light paths. High-end cosmetic bottles reflecting elegant warm light in the foreground, minimalist luxury aesthetic, 3D render, octa-render, ultra-realistic, corporate business style, cinematic lighting, 8k resolution --ar 16:9 --v 6.0"
  },
  {
    id: "prompt-problem",
    sectionName: "Problem & Solution (애로 극복 대비)",
    usage: "기존 통관 지연 장벽 카드 및 K-Glow의 검인 라이선스 통과 비교 메타 그래픽",
    style: "Modern Flat Isometric Vector Illustration Design",
    engine: "DALL-E 3 / Midjourney v6.0",
    prompt: "A sleek minimalist conceptual flat vector illustration. A luxurious shipping container trapped behind high red neon laser beams (symbolizing customs barrier and cdsco regulations) vs a glowing green open gateway with a secure shield on a rich dark slate grey background. High-contrast modern corporate colors, clean flat-design aesthetics --ar 4:3"
  },
  {
    id: "prompt-ftwz",
    sectionName: "FTWZ Special Logistics (자유무역 보세물류)",
    usage: "인도 정부 공인 FTWZ 보세물류 허브 내 특수 스마트 적재 및 분할 출고 프로세스 강조",
    style: "High-Tech Industrial & Clean Room Ambient",
    engine: "Midjourney v6.0 / DALL-E 3",
    prompt: "Inside an extremely high-tech modern automated shipping warehouse with glowing warm orange and amber safety ambient lighting. Pristine robotic arms neatly organizing glass-bottled luxury beauty products on golden-trimmed slate shelves. Volumetric light rays piercing through, clean modern logistics center, photorealistic, cinematic lighting --ar 16:9 --v 6.0"
  },
  {
    id: "prompt-usa",
    sectionName: "Track 1: USA (미국 틱톡숍 인플루언서)",
    usage: "비디오 숏폼 쇼케이스, 라이브 커머스 세일즈 부스팅 전개용 역동적 라이프스타일 컷",
    style: "Warm Aesthetic Digital Studio Shoot, Shallow Depth-of-field",
    engine: "Midjourney v6.0",
    prompt: "A premium close-up of a hand holding a modern smartphone, displaying a beautiful live streaming cosmetic seller talking to camera. The background is a cozy, trendy boutique studio with subtle neon decorations, warm pink and gold lighting. Professional product set, lifestyle cinematic depth-of-field, high-end commercial photo --ar 4:3"
  },
  {
    id: "prompt-why",
    sectionName: "Why K-Glow (양국간 밀착 글로벌 동맹)",
    usage: "서울 사옥 전문가와 뉴델리 델리 공항 수입 전담 지사 법인의 신뢰적 연대감 강조",
    style: "Elite Corporate Executive Profile Photography",
    engine: "Midjourney v6.0",
    prompt: "Two professional confident business leaders (one Korean and one Indian) shaking hands warmly, standing in front of a sleek high-rise glass window overlooking the modern Gurugram DLF Cybercity skyline at golden hour sunset. Beautiful lens flare, global strategic alliance atmosphere, clean professional focus --ar 16:9 --v 6.0"
  },
  {
    id: "prompt-cta",
    sectionName: "CTA: Global Expansion Invite (종격 전진 지원)",
    usage: "상담 신청 폼 헤더 백그라운드 디자인 또는 기획 타당성 검사 앰비언트 카드",
    style: "Minimal Matte Premium Clay Render, Fine Interior Close-up",
    engine: "DALL-E 3 / Midjourney v6.0",
    prompt: "A close-up of a premium minimalist white marble office desk, a glowing golden corporate invitation letter icon on a clean desktop screen, warm morning sunlight casting soft long shadows, elegant aesthetic, ultra-minimal workspace, modern premium business branding --ar 16:9"
  }
];
