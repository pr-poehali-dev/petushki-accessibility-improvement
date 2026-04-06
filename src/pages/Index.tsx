import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/bad9241b-eabf-4312-bc91-bb40b4bc4cc0/files/b018bc6d-264f-4793-a6d0-7c9ff6237c92.jpg";

const SERVICES = [
  {
    icon: "Zap",
    title: "Разработка сайтов",
    desc: "Создаём быстрые, современные сайты, которые привлекают клиентов и работают на результат.",
    color: "purple",
  },
  {
    icon: "TrendingUp",
    title: "Digital-маркетинг",
    desc: "Комплексное продвижение в интернете: SEO, контекстная реклама, таргетинг в соцсетях.",
    color: "cyan",
  },
  {
    icon: "Palette",
    title: "Брендинг и дизайн",
    desc: "Создаём уникальный визуальный образ бренда, который запоминается и вызывает доверие.",
    color: "pink",
  },
  {
    icon: "BarChart3",
    title: "Аналитика и стратегия",
    desc: "Анализируем данные, находим точки роста и выстраиваем стратегию для вашего бизнеса.",
    color: "purple",
  },
  {
    icon: "Shield",
    title: "IT-безопасность",
    desc: "Защищаем ваш бизнес от киберугроз: аудит, мониторинг, защита данных клиентов.",
    color: "cyan",
  },
  {
    icon: "Headphones",
    title: "Техподдержка 24/7",
    desc: "Всегда на связи. Решаем технические проблемы быстро, чтобы ваш бизнес не останавливался.",
    color: "pink",
  },
];

const PORTFOLIO = [
  { title: "E-commerce платформа", cat: "Разработка", color: "from-purple-900 to-indigo-900" },
  { title: "Корпоративный портал", cat: "Дизайн", color: "from-cyan-900 to-blue-900" },
  { title: "Мобильное приложение", cat: "Маркетинг", color: "from-pink-900 to-rose-900" },
  { title: "Бренд-стратегия", cat: "Брендинг", color: "from-violet-900 to-purple-900" },
  { title: "Маркетплейс услуг", cat: "Разработка", color: "from-teal-900 to-cyan-900" },
  { title: "Рекламная кампания", cat: "Маркетинг", color: "from-fuchsia-900 to-pink-900" },
];

const STATS = [
  { num: "200+", label: "Проектов завершено" },
  { num: "98%", label: "Довольных клиентов" },
  { num: "8 лет", label: "На рынке" },
  { num: "40+", label: "Специалистов" },
];

const TEAM = [
  { name: "Александр Петров", role: "CEO & Основатель", emoji: "👨‍💼" },
  { name: "Мария Соколова", role: "Арт-директор", emoji: "👩‍🎨" },
  { name: "Дмитрий Козлов", role: "Lead Developer", emoji: "👨‍💻" },
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

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center animate-pulse-glow">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl tracking-wider text-white">NOVA<span className="neon-text-purple">TEAM</span></span>
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
            <button
              onClick={() => scrollTo("contact")}
              className="btn-neon px-5 py-2 rounded-lg text-sm font-semibold text-white"
            >
              Заказать
            </button>
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
            <button onClick={() => scrollTo("contact")} className="btn-neon px-5 py-3 rounded-lg text-sm font-semibold text-white mt-2">
              Заказать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080c14]/50 to-[#080c14]" />

        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl animate-float2" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-pink-600/10 blur-3xl animate-float-delay" />

        <div className="absolute top-20 right-20 w-20 h-20 border border-purple-500/30 rotate-45 animate-float hidden md:block" />
        <div className="absolute bottom-32 left-20 w-12 h-12 border border-cyan-500/30 rotate-12 animate-float2 hidden md:block" />
        <div className="absolute top-40 left-40 w-6 h-6 bg-purple-500/50 rounded-full animate-float-delay hidden md:block" />
        <div className="absolute bottom-48 right-48 w-4 h-4 bg-cyan-400/50 rounded-full animate-float hidden md:block" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-8 animate-slide-up">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Ваш надёжный партнёр в digital
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-slide-up">
            <span className="text-white">МЫ СОЗДАЁМ</span>
            <br />
            <span className="gradient-text animate-gradient-shift">БУДУЩЕЕ</span>
            <br />
            <span className="text-white">ВАШЕГО БИЗНЕСА</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed">
            Комплексные digital-решения для роста бизнеса. Разработка, маркетинг, брендинг — всё под одной крышей.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-neon px-8 py-4 rounded-xl text-base font-semibold text-white"
            >
              Оставить заявку
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              className="btn-outline-neon px-8 py-4 rounded-xl text-base font-semibold"
            >
              Смотреть работы
            </button>
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
              Полный спектр digital-услуг для вашего бизнеса
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="service-card rounded-2xl p-7 h-full cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${colorMap[s.color]}`}>
                    <Icon name={s.icon} size={22} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-purple-400 text-sm font-medium group cursor-pointer">
                    <span>Подробнее</span>
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
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
              Портфолио
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              НАШИ <span className="neon-text-cyan">РАБОТЫ</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Проекты, которыми мы гордимся</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <AnimatedSection key={i}>
                <div className="portfolio-card cursor-pointer">
                  <div className={`bg-gradient-to-br ${p.color} h-56 flex items-center justify-center relative`}>
                    <div className="text-7xl opacity-20 font-display">0{i + 1}</div>
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
                О нас
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                МЫ — КОМАНДА <span className="neon-text-purple">ПРОФЕССИОНАЛОВ</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Более 8 лет мы помогаем бизнесу расти в digital-среде. Наша команда из 40+ специалистов создаёт решения, которые работают на результат.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Мы верим, что каждый проект уникален. Поэтому предлагаем индивидуальный подход и полное погружение в задачи клиента.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Результат", "Качество", "Скорость", "Честность"].map((v) => (
                  <span key={v} className="px-4 py-2 rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium">
                    {v}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 gap-4">
                {TEAM.map((t, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 flex items-center gap-5 hover:border-purple-500/40 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                      {t.emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-purple-400 text-sm">{t.role}</div>
                    </div>
                  </div>
                ))}
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
              Контакты
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              ОСТАВЬТЕ <span className="neon-text-purple">ЗАЯВКУ</span>
            </h2>
            <p className="text-gray-400">Расскажите о вашем проекте — мы свяжемся в течение часа</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center neon-border-purple">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Icon name="CheckCircle" size={36} className="text-purple-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
                <p className="text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
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
                      placeholder="+7 (999) 123-45-67"
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@company.ru"
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Услуга</label>
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
                  <label className="block text-gray-400 text-sm mb-2">Расскажите о проекте</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Опишите вашу задачу, цели, сроки..."
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-neon w-full py-4 rounded-xl font-semibold text-white text-base flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </button>

                <p className="text-center text-gray-600 text-xs">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "Phone", label: "+7 (999) 123-45-67", sub: "Пн-Пт 9:00-18:00" },
              { icon: "Mail", label: "hello@novateam.ru", sub: "Отвечаем за 1 час" },
              { icon: "MapPin", label: "Москва", sub: "Работаем по всей России" },
            ].map((c, i) => (
              <div key={i} className="glass-card rounded-xl p-5 text-center hover:border-purple-500/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                  <Icon name={c.icon} size={18} className="text-purple-400" />
                </div>
                <div className="text-white text-sm font-medium">{c.label}</div>
                <div className="text-gray-500 text-xs mt-1">{c.sub}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-500/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-display text-sm tracking-wider text-gray-400">NOVA<span className="text-purple-400">TEAM</span></span>
          </div>
          <p className="text-gray-600 text-xs">© 2024 NOVATEAM. Все права защищены.</p>
          <div className="flex items-center gap-4">
            {["Instagram", "Linkedin", "Youtube"].map((s) => (
              <button key={s} className="w-8 h-8 rounded-lg border border-purple-500/20 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-200">
                <Icon name={s} size={14} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;