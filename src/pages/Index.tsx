import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/bad9241b-eabf-4312-bc91-bb40b4bc4cc0/files/bb9a3e87-6877-4999-b480-434cb17bed25.jpg";

const SERVICES = [
  {
    icon: "Car",
    title: "Оценка транспорта",
    desc: "Независимая оценка рыночной стоимости автомобилей, спецтехники и иных транспортных средств для суда, страховой или сделки.",
    color: "purple",
  },
  {
    icon: "Building2",
    title: "Оценка недвижимости",
    desc: "Определяем рыночную стоимость квартир, домов, земельных участков, коммерческой недвижимости. Отчёт принимается всеми банками и судами.",
    color: "cyan",
  },
  {
    icon: "Package",
    title: "Оценка прочего имущества",
    desc: "Оценка оборудования, мебели, предметов быта, бизнеса и иных активов для любых юридических целей.",
    color: "pink",
  },
  {
    icon: "ShieldAlert",
    title: "Экспертиза авто после ДТП",
    desc: "Независимая экспертиза повреждений транспортного средства после дорожно-транспортного происшествия. Защищаем ваши интересы перед страховой компанией.",
    color: "purple",
  },
  {
    icon: "Flame",
    title: "Экспертиза после пожара",
    desc: "Независимая экспертиза домов и квартир, пострадавших от огня. Фиксируем ущерб и готовим документы для получения компенсации.",
    color: "cyan",
  },
  {
    icon: "Droplets",
    title: "Экспертиза после залива",
    desc: "Оценка ущерба квартиры или офиса после залива соседями. Помогаем получить справедливое возмещение через суд или переговоры.",
    color: "pink",
  },
  {
    icon: "Paintbrush",
    title: "Экспертиза качества ремонта",
    desc: "Выявляем строительные недостатки, нарушения технологий и отступления от договора. Заключение эксперта для суда и переговоров с подрядчиком.",
    color: "purple",
  },
  {
    icon: "HardHat",
    title: "Строительно-техническая экспертиза",
    desc: "Комплексное обследование зданий и сооружений: оценка несущих конструкций, выявление дефектов, определение причин разрушений.",
    color: "cyan",
  },
];

const PORTFOLIO = [
  { title: "Оценка авто после ДТП", cat: "Транспорт", num: "01", color: "from-blue-900 to-indigo-900" },
  { title: "Оценка квартиры для ипотеки", cat: "Недвижимость", num: "02", color: "from-cyan-900 to-blue-900" },
  { title: "Экспертиза после пожара", cat: "Страховой случай", num: "03", color: "from-orange-900 to-red-900" },
  { title: "Строительная экспертиза", cat: "Здания и сооружения", num: "04", color: "from-violet-900 to-purple-900" },
  { title: "Экспертиза ремонта", cat: "Качество работ", num: "05", color: "from-teal-900 to-cyan-900" },
  { title: "Оценка коммерческой недвижимости", cat: "Бизнес", num: "06", color: "from-slate-900 to-blue-900" },
];

const STATS = [
  { num: "1500+", label: "Выполненных экспертиз" },
  { num: "98%", label: "Дел выиграно в суде" },
  { num: "10 лет", label: "Опыта работы" },
  { num: "24ч", label: "Выезд эксперта" },
];

const ADVANTAGES = [
  { icon: "Scale", title: "Независимость", desc: "Работаем только в интересах заказчика, без давления страховых и застройщиков." },
  { icon: "FileCheck", title: "Юридическая сила", desc: "Наши отчёты принимаются всеми судами, банками и государственными органами." },
  { icon: "Clock", title: "Быстрый выезд", desc: "Эксперт выезжает на объект в течение 24 часов после обращения." },
  { icon: "BadgeCheck", title: "Сертифицированные эксперты", desc: "Все специалисты аттестованы и состоят в СРО оценщиков." },
];

type NavItem = { label: string; id: string };
const NAV: NavItem[] = [
  { label: "Главная", id: "hero" },
  { label: "Услуги", id: "services" },
  { label: "Портфолио", id: "portfolio" },
  { label: "О нас", id: "about" },
  { label: "Контакты", id: "contact" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

const colorMap: Record<string, string> = {
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/30",
};

const SEND_ORDER_URL = "https://functions.poehali.dev/088af494-521b-4ce6-8365-065d32f4baae";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setError("Ошибка отправки. Попробуйте ещё раз или позвоните нам.");
      }
    } catch {
      setError("Не удалось отправить заявку. Проверьте интернет-соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg">

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080c14]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-900/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center animate-pulse-glow">
              <Icon name="Scale" size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display text-lg tracking-wider text-white">ЭКС <span className="neon-text-purple">ГРУПП</span></span>
              <div className="text-gray-500 text-xs leading-none">Независимая экспертиза</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="tel:89190252423"
              className="btn-neon px-5 py-2 rounded-lg text-sm font-semibold text-white"
            >
              Позвонить
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#080c14]/98 backdrop-blur-xl border-t border-purple-500/20 px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-gray-300 hover:text-white py-2 border-b border-purple-900/30 text-sm font-medium">
                {n.label}
              </button>
            ))}
            <a href="tel:89190252423" className="btn-neon px-5 py-3 rounded-lg text-sm font-semibold text-white text-center mt-2">
              8-919-025-24-23
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/60 via-[#080c14]/40 to-[#080c14]" />

        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-float2" />

        <div className="absolute top-24 right-24 w-16 h-16 border border-purple-500/20 rotate-45 animate-float hidden md:block" />
        <div className="absolute bottom-40 left-24 w-10 h-10 border border-cyan-500/20 rotate-12 animate-float2 hidden md:block" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-8 animate-slide-up">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            ООО «ЭКС Групп» · Владимирская область
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-slide-up">
            <span className="text-white">НЕЗАВИСИМАЯ</span>
            <br />
            <span className="gradient-text animate-gradient-shift">ЭКСПЕРТИЗА</span>
            <br />
            <span className="text-white">И ОЦЕНКА</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed">
            Защищаем ваши интересы: оценка транспорта, недвижимости и имущества, экспертиза после ДТП, пожара, залива и некачественного ремонта.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-neon px-8 py-4 rounded-xl text-base font-semibold text-white"
            >
              Получить консультацию
            </button>
            <a
              href="tel:89190252423"
              className="btn-outline-neon px-8 py-4 rounded-xl text-base font-semibold text-center"
            >
              8-919-025-24-23
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollTo("services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-purple-400 transition-colors animate-float"
        >
          <Icon name="ChevronDown" size={32} />
        </button>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-purple-500/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <AnimatedSection key={i} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">{s.num}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
              <Icon name="Layers" size={14} />
              Наши услуги
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              ЧТО МЫ <span className="neon-text-purple">ДЕЛАЕМ</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Полный спектр независимой экспертизы и оценки имущества
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="service-card rounded-2xl p-6 h-full cursor-pointer">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${colorMap[s.color]}`}>
                    <Icon name={s.icon} size={20} />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2 leading-snug">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium group cursor-pointer">
                    <span>Заказать</span>
                    <Icon name="ArrowRight" size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 px-6 border-y border-purple-500/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              ПОЧЕМУ <span className="neon-text-cyan">ВЫБИРАЮТ НАС</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((a, i) => (
              <AnimatedSection key={i}>
                <div className="glass-card rounded-2xl p-6 text-center h-full hover:border-purple-500/40 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                    <Icon name={a.icon} size={24} className="text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2">{a.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
              <Icon name="Briefcase" size={14} />
              Примеры работ
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              НАШИ <span className="neon-text-cyan">КЕЙСЫ</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Реальные задачи, которые мы успешно решили</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <AnimatedSection key={i}>
                <div className="portfolio-card cursor-pointer">
                  <div className={`bg-gradient-to-br ${p.color} h-52 flex items-center justify-center relative`}>
                    <div className="font-display text-8xl font-bold opacity-10 text-white">{p.num}</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                    <div className="overlay">
                      <div>
                        <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">{p.cat}</span>
                        <div className="text-white font-bold text-lg mt-1">{p.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm mb-6">
                <Icon name="Users" size={14} />
                О компании
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                ООО <span className="neon-text-purple">«ЭКС ГРУПП»</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                Мы — независимая экспертная организация из Владимирской области. Более 10 лет помогаем физическим и юридическим лицам защищать свои права при спорах со страховыми компаниями, застройщиками, соседями и подрядчиками.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Наши эксперты — сертифицированные специалисты, состоящие в СРО. Заключения принимаются всеми судами России и государственными органами.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Независимость", "Аттестованные эксперты", "Суд и страховые", "Выезд за 24ч"].map((v) => (
                  <span key={v} className="px-4 py-2 rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium">
                    {v}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="glass-card rounded-2xl p-8 neon-border-purple">
                <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-purple-400" />
                  Контактная информация
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: "MapPin", label: "Адрес", value: "Владимирская обл., г. Петушки, ул. Маяковского, д. 29" },
                    { icon: "Phone", label: "Телефон", value: "8-919-025-24-23" },
                    { icon: "Mail", label: "Email", value: "payment@eks-gr.ru" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={c.icon} size={15} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-0.5">{c.label}</div>
                        <div className="text-white text-sm font-medium">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
              <Icon name="MessageCircle" size={14} />
              Бесплатная консультация
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              ОСТАВЬТЕ <span className="neon-text-purple">ЗАЯВКУ</span>
            </h2>
            <p className="text-gray-400">Расскажите о вашей ситуации — перезвоним в течение часа</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center neon-border-purple">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Icon name="CheckCircle" size={36} className="text-purple-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Заявка принята!</h3>
                <p className="text-gray-400">Наш эксперт свяжется с вами в ближайшее время.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Ваше имя *</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Телефон *</label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="8-919-025-24-23"
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@mail.ru"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Вид экспертизы / оценки</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#0e1420] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/60 transition-all duration-200 text-sm appearance-none"
                  >
                    <option value="" className="bg-[#0e1420]">Выберите услугу...</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title} className="bg-[#0e1420]">{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Опишите ситуацию</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Кратко опишите, что произошло и какая помощь нужна..."
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon w-full py-4 rounded-xl font-semibold text-white text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader" size={18} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </>
                  )}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-500/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
              <Icon name="Scale" size={14} className="text-white" />
            </div>
            <div>
              <span className="font-display text-sm tracking-wider text-gray-400">ЭКС <span className="text-purple-400">ГРУПП</span></span>
              <div className="text-gray-600 text-xs">Независимая экспертиза</div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-xs space-y-1">
            <div>© 2024 ООО «ЭКС Групп». Все права защищены.</div>
            <div>г. Петушки, ул. Маяковского, д. 29 · <a href="tel:89190252423" className="hover:text-purple-400 transition-colors">8-919-025-24-23</a></div>
          </div>
          <a
            href="mailto:payment@eks-gr.ru"
            className="text-gray-500 hover:text-purple-400 transition-colors text-sm flex items-center gap-2"
          >
            <Icon name="Mail" size={14} />
            payment@eks-gr.ru
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;