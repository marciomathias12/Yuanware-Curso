/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Package, 
  Globe, 
  Star,
  ArrowRight,
  Menu,
  X,
  Quote
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import heroVideo from "./videos/loop.mp4";
import imagemMembros from "./src/assets/ft-site-curso.png";
import prova1 from "./src/assets/prova1.png";
import prova2 from "./src/assets/prova2.png";
import prova3 from "./videos/prova3.mov";

// --- CONFIGURAÇÕES RÁPIDAS (EDITE AQUI) ---
const CHECKOUT_URL = "https://pay.cakto.com.br/37c7rwz_690415"; // Link do seu checkout
const VSL_VIDEO_ID = "seRCBG2q0I8"; // ID do vídeo (YouTube/Vimeo/etc)
const HERO_BG_IMAGE = "/hero-bg.png"; // Imagem de fundo do Hero (Upload your image to the root and rename it to hero-bg.png)
// ------------------------------------------

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-12 md:py-20 px-4 md:px-12 lg:px-24 overflow-hidden ${className}`}>
    {children}
  </section>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  onClick 
}: { 
  children: ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline', 
  className?: string,
  onClick?: () => void
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:scale-105 active:scale-95",
    secondary: "bg-white text-black hover:bg-gray-100 active:scale-95",
    outline: "border border-white/20 text-white hover:bg-white/10 active:scale-95"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6 md:p-8 flex flex-col gap-3 md:gap-4 hover:border-brand-orange/50 transition-colors group"
  >
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
      <Icon size={20} md:size={24} />
    </div>
    <h3 className="text-lg md:text-xl font-bold font-display">{title}</h3>
    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center bg-black/20 backdrop-blur-sm border-b border-white/5">
        <div className="text-xl font-display font-bold tracking-tighter">YUAN<span className="text-brand-orange">WARE</span></div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => scrollToSection('sobre')} className="hover:text-white transition-colors">Sobre</button>
          <button onClick={() => scrollToSection('conteudo')} className="hover:text-white transition-colors">Conteúdo</button>
          <button onClick={() => scrollToSection('ferramentas')} className="hover:text-white transition-colors">Ferramentas</button>
          <Button variant="outline" className="py-2 px-6 text-sm" onClick={() => window.open(CHECKOUT_URL, '_blank')}>
            Começar Agora
          </Button>
        </div>

        <button className="md:hidden text-white ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-3xl font-display p-6"
        >
          <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <button onClick={() => scrollToSection('sobre')} className="hover:text-brand-orange transition-colors">Sobre</button>
          <button onClick={() => scrollToSection('conteudo')} className="hover:text-brand-orange transition-colors">Conteúdo</button>
          <button onClick={() => scrollToSection('ferramentas')} className="hover:text-brand-orange transition-colors">Ferramentas</button>
          <Button className="w-full mt-4" onClick={() => window.open(CHECKOUT_URL, '_blank')}>Começar Agora</Button>
        </motion.div>
      )}

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-0 w-full z-40 px-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="pointer-events-auto"
        >
          <Button className="w-full shadow-2xl shadow-brand-orange/40 py-5" onClick={() => window.open(CHECKOUT_URL, '_blank')}>
            GARANTIR MINHA VAGA <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>

      {/* SEÇÃO 1 — HERO DE ALTO IMPACTO */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1] md:leading-[0.9] tracking-tighter"
          >
            DOMINE A <span className="text-gradient">IMPORTAÇÃO</span> E ESCALE SEU NEGÓCIO
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl px-2"
          >
            Aprenda a importar com estratégia, controle total de custos e marketing de alta performance. Transforme caixas em lucro real.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
          >
            <Button className="w-full sm:w-auto" onClick={() => window.open(CHECKOUT_URL, '_blank')}>
              Quero Começar Agora <ChevronRight size={20} />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => scrollToSection('vsl')}>
              Assistir Apresentação <Play size={18} fill="currentColor" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 2 — VSL LOGO NO TOPO */}
      <Section id="vsl" className="bg-glow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-3 md:mb-4">ASSISTA A APRESENTAÇÃO</h2>
            <p className="text-gray-400 text-sm md:text-base">Entenda como funciona o método YuanWare em poucos minutos.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-orange/20"
          >
            {/* COLOQUE SEU VÍDEO AQUI (YouTube/Vimeo Embed) */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VSL_VIDEO_ID}?autoplay=0&rel=0`}
              title="YuanWare VSL"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
          
          <div className="mt-12 flex justify-center">
            <Button onClick={() => window.open(CHECKOUT_URL, '_blank')}>
              Garantir Minha Vaga <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 3 — EXPLICAÇÃO RÁPIDA DO CURSO */}
      <Section id="sobre" className="bg-zinc-950">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">O QUE É O <span className="text-brand-orange">YUANWARE?</span></h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              O YuanWare não é apenas um curso de importação. É um ecossistema completo desenhado para quem quer profissionalizar a operação de trazer produtos para o Brasil.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Unimos o conhecimento técnico de logística e tributação com estratégias de marketing digital para que você não apenas importe, mas construa um negócio sólido e lucrativo.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                "Método validado de ponta a ponta",
                "Ferramentas exclusivas inclusas",
                "Foco total em lucro e escala"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-medium text-left">
                  <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SEÇÃO 4 — PARA QUEM É O CURSO */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">PARA QUEM É ESTE <span className="text-brand-orange">MÉTODO?</span></h2>
          <p className="text-gray-400 text-sm md:text-base px-4">Identifique se você está no momento certo para dar esse passo.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard 
            icon={Users} 
            title="Iniciantes do Zero" 
            description="Para quem quer começar a importar mas não sabe por onde dar o primeiro passo com segurança."
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Empreendedores" 
            description="Para quem busca uma nova fonte de renda ou quer iniciar um negócio próprio de revenda."
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Importadores Atuais" 
            description="Para quem já importa mas sofre com taxas inesperadas, atrasos e falta de previsibilidade."
          />
          <FeatureCard 
            icon={Globe} 
            title="Focados em Escala" 
            description="Para quem quer estruturar uma operação profissional e sair do amadorismo da importação casual."
          />
          <FeatureCard 
            icon={Star} 
            title="Vendedores" 
            description="Para quem já tem o produto mas não sabe como usar o marketing para vender e posicionar sua marca."
          />
          <FeatureCard 
            icon={Package} 
            title="Buscadores de Lucro" 
            description="Para quem quer clareza absoluta sobre margens, custos de frete e precificação correta."
          />
        </div>
      </Section>

      {/* SEÇÃO 5 — O QUE A PESSOA VAI APRENDER */}
      <Section id="conteudo" className="bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 md:mb-16 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">O QUE VOCÊ VAI <span className="text-brand-orange">DOMINAR</span></h2>
              <p className="text-gray-400 text-sm md:text-base">Um cronograma pensado para sua evolução prática, do pedido à entrega.</p>
            </div>
            <Button variant="outline" className="w-full md:w-auto" onClick={() => window.open(CHECKOUT_URL, '_blank')}>Ver Grade Completa</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Fundamentos", desc: "Entenda o mercado, como encontrar fornecedores confiáveis e evitar golpes." },
              { title: "Logística e Fretes", desc: "Aprenda as melhores rotas, tipos de frete e como otimizar o tempo de entrega." },
              { title: "Tributação e Taxas", desc: "Chega de surpresas. Aprenda a calcular impostos e taxas de importação com precisão." },
              { title: "Marketing de Vendas", desc: "Como criar anúncios que vendem, posicionar seu produto e criar desejo no cliente final." },
              { title: "Gestão de Margem", desc: "O segredo do lucro está na compra. Aprenda a precificar para ter escala e sustentabilidade." },
              { title: "Operação Profissional", desc: "Como estruturar seu negócio no Brasil para crescer sem perder o controle." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="text-brand-orange font-display font-bold text-4xl opacity-20">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SEÇÃO 6 — PROVA SOCIAL */}
      <Section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow-warm opacity-10 pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-2 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-display font-bold leading-tight mb-4">
              QUEM JÁ ESTÁ <span className="text-gradient">NO JOGO</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
              Veja o que os nossos alunos estão falando sobre a metodologia YuanWare e como ela transformou suas operações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-sm relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-orange/10 p-2 glass-card"
            >
              <img src={prova1} alt="Prova Social 1" className="w-full h-auto rounded-3xl object-cover object-top" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-orange/10 p-2 glass-card"
            >
              <video src={prova3} controls playsInline className="w-full h-auto rounded-3xl object-cover object-center"></video>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-sm relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-orange/10 p-2 glass-card"
            >
              <img src={prova2} alt="Prova Social 2" className="w-full h-auto rounded-3xl object-cover object-top" />
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "gostei muito do curso, ja fiz minha primeira importação e ja consegui revender meu primeiro produto, com as dicas de vendas que o pessoal do yuanware deu.",
              "Assim que comprei o curso ja me chamaram no whatsapp falando que tinha suporte para qualquer duvida, 24h por dia e 7 dias da semana, a real é que chamei 1 vez só, e foi só pra agradecer pelo excelente curso que eles tem, não tive nenuma duvida com nada... e gostei muito das aulas de marketing.",
              "Gostei muito do curso e achei o preço ótimo porque além do curso que é vitalício vêm com o sistema deles junto, e o suporte deles é de outro nível. Top dms."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 md:p-8 flex flex-col gap-4 text-left border-brand-orange/10 hover:border-brand-orange/30 transition-colors relative"
              >
                <Quote size={24} className="text-brand-orange/20 absolute top-6 right-6" />
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{text}"
                </p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-black uppercase">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Aluno Verificado</div>
                    <div className="text-xs text-brand-orange flex items-center gap-1">
                      <CheckCircle2 size={12} /> Compra Confirmada
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
              <ShieldCheck size={24} /> VERIFICADO
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
              <Star size={24} /> 4.9/5 ESTRELAS
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
              <CheckCircle2 size={24} /> 100% SEGURO
            </div>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 7 — SISTEMA DE DECLARAÇÃO INCLUSO */}
      <Section id="ferramentas" className="bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 w-full"
          >
            <div className="glass-card p-2 md:p-4 overflow-hidden shadow-2xl">
              <div className="bg-zinc-900 rounded-xl p-4 md:p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-500 font-mono uppercase tracking-widest">YuanWare System v2.0</div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="h-3 md:h-4 w-1/2 bg-white/5 rounded" />
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="h-16 md:h-20 bg-brand-orange/10 rounded-lg border border-brand-orange/20 flex flex-col items-center justify-center gap-1.5 md:gap-2">
                      <FileText size={18} md:size={20} className="text-brand-orange" />
                      <span className="text-[8px] md:text-[10px] text-brand-orange font-bold">GERAR DECLARAÇÃO</span>
                    </div>
                    <div className="h-16 md:h-20 bg-white/5 rounded-lg border border-white/5 flex flex-col items-center justify-center gap-1.5 md:gap-2">
                      <Package size={18} md:size={20} className="text-gray-500" />
                      <span className="text-[8px] md:text-[10px] text-gray-500 font-bold">PRODUTOS</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="h-1.5 md:h-2 w-full bg-white/5 rounded" />
                    <div className="h-1.5 md:h-2 w-3/4 bg-white/5 rounded" />
                    <div className="h-1.5 md:h-2 w-full bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">SISTEMA DE <span className="text-brand-orange">DECLARAÇÃO</span></h2>
            <p className="text-gray-400 text-base md:text-lg mb-8">
              Esqueça planilhas confusas e erros manuais. Nosso sistema exclusivo automatiza o processo de declaração para que você tenha segurança jurídica e agilidade.
            </p>
            
            <ul className="space-y-4">
              {[
                "Adicione produtos com um clique",
                "Gere declarações prontas para uso",
                "Organize sua operação de forma inteligente",
                "Reduza erros que custam caro"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-brand-orange" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 8 — CALCULADORA INCLUSA */}
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">CALCULADORA DE <span className="text-brand-orange">LUCRO REAL</span></h2>
            <p className="text-gray-400 text-base md:text-lg mb-8">
              Saiba exatamente quanto vai sobrar no seu bolso antes mesmo de fechar o pedido. Nossa calculadora considera todas as variáveis do mercado brasileiro.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Custos de Origem", icon: Globe },
                { label: "Frete Internacional", icon: Package },
                { label: "Taxas e Impostos", icon: ShieldCheck },
                { label: "Margem de Lucro", icon: TrendingUp }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                  <item.icon size={18} className="text-brand-orange" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 bg-gradient-to-br from-brand-orange/10 to-transparent"
          >
            <div className="flex items-center gap-4 mb-8">
              <Calculator size={32} className="text-brand-orange" />
              <h4 className="text-2xl font-bold font-display">Simulador de Viabilidade</h4>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
                  <span>Preço do Produto (CNY)</span>
                  <span>¥ 150.00</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-brand-orange" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
                  <span>Peso Estimado (KG)</span>
                  <span>2.5 kg</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-brand-orange" />
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 font-bold">LUCRO ESTIMADO</span>
                <span className="text-3xl font-bold text-green-500">R$ 452,00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SEÇÃO 9 — MARKETING COMO DIFERENCIAL */}
      <Section className="bg-brand-orange text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">IMPORTAR É SÓ O COMEÇO. <span className="opacity-60">VENDER É O QUE TE FAZ CRESCER.</span></h2>
          <p className="text-black/70 text-base md:text-xl mb-8 md:mb-10 font-medium">
            Muitos cursos ensinam a comprar. Nós ensinamos você a construir uma marca e vender seus produtos no Brasil usando estratégias de marketing digital de elite.
          </p>
          <Button variant="secondary" className="mx-auto w-full md:w-auto" onClick={() => window.open(CHECKOUT_URL, '_blank')}>
            Quero o Método Completo
          </Button>
        </div>
      </Section>

      {/* SEÇÃO 10 — ÁREA DE MEMBROS */}
      <Section className="bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 md:mb-16">SUA NOVA <span className="text-brand-orange">CASA</span></h2>
          
          <div className="relative aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={imagemMembros} 
              alt="Área de Membros" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-4">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-brand-orange flex items-center justify-center text-black shadow-2xl shadow-brand-orange/40">
                <Play size={28} md:size={40} fill="currentColor" />
              </div>
              <span className="font-display font-bold text-sm md:text-xl tracking-widest uppercase px-4">Acesso imediato após o checkout</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12">
            {[
              "Aulas Organizadas",
              "Materiais de Apoio",
              "Suporte Prioritário",
              "Atualizações Vitalícias"
            ].map((item, i) => (
              <div key={i} className="p-3 md:p-4 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] md:text-sm font-bold text-gray-400 uppercase">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SEÇÃO 11 — O QUE ESTÁ INCLUSO */}
      <Section className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">MUITO MAIS QUE <span className="text-brand-orange">AULAS</span></h2>
          <p className="text-gray-400 text-sm md:text-base px-4">Você recebe o kit completo para operar como um profissional desde o primeiro dia.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10">
          <div className="glass-card p-6 md:p-10 text-center flex flex-col items-center gap-4 md:gap-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <Play size={28} md:size={32} fill="currentColor" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display">Curso em Vídeo</h3>
            <p className="text-gray-400 text-sm md:text-base">Aulas práticas, direto ao ponto, gravadas em alta definição para você assistir quando quiser.</p>
          </div>
          
          <div className="glass-card p-6 md:p-10 text-center flex flex-col items-center gap-4 md:gap-6 border-brand-orange/30 md:scale-105 shadow-2xl shadow-brand-orange/10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-orange flex items-center justify-center text-black">
              <ShieldCheck size={28} md:size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display">Ferramentas Premium</h3>
            <p className="text-gray-300 text-sm md:text-base">Acesso exclusivo ao Sistema de Declaração e Calculadora de Lucro YuanWare.</p>
          </div>
          
          <div className="glass-card p-6 md:p-10 text-center flex flex-col items-center gap-4 md:gap-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <TrendingUp size={28} md:size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display">Módulo Marketing</h3>
            <p className="text-gray-400 text-sm md:text-base">Estratégias de venda e posicionamento para você não ficar com estoque parado.</p>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 12 — CTA FINAL */}
      <Section className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-glow pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 md:gap-8">
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-tight">PRONTO PARA <span className="text-gradient">PROFISSIONALIZAR</span> SUA OPERAÇÃO?</h2>
          <p className="text-gray-400 text-base md:text-xl px-4">
            Evite erros caros, use as melhores ferramentas e aprenda a vender como os grandes players do mercado.
          </p>
          
          <div className="flex flex-col items-center gap-4 w-full px-4">
            <Button className="w-full md:w-auto text-lg md:text-xl py-5 md:py-6 px-8 md:px-12" onClick={() => window.open(CHECKOUT_URL, '_blank')}>
              QUERO ME INSCREVER AGORA <ChevronRight size={24} />
            </Button>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1"><Star size={14} md:size={16} /> 7 Dias de Garantia</div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <p className="text-xs text-gray-300 font-bold uppercase tracking-widest">
                <span className="text-white">54 alunos</span> ativos agora
              </p>
            </div>
            
            <div className="flex justify-center text-brand-amber gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2026 YuanWare - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
