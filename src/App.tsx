import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Book, 
  Heart, 
  Zap, 
  Crown, 
  Eye, 
  Flame,
  ChevronDown,
  X
} from 'lucide-react';

interface Symbol {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

interface CoatStyle {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const symbols: Symbol[] = [
  {
    id: 1,
    name: "Волчья голова",
    description: "Символ преданности, храбрости и защиты семьи. Волк олицетворяет верность и готовность защищать близких.",
    icon: <Shield className="w-6 h-6" />,
    imageUrl: "/images/symbols/wolf-head.png"
  },
  {
    id: 2,
    name: "Открытая книга с оливковой ветвью",
    description: "Знание и мудрость в сочетании с миром. Стремление к образованию и гармоничному сосуществованию.",
    icon: <Book className="w-6 h-6" />,
    imageUrl: "/images/symbols/book-olive.png"
  },
  {
    id: 3,
    name: "Рука с молнией",
    description: "Сила действия и решительность. Способность принимать важные решения и воплощать их в жизнь.",
    icon: <Zap className="w-6 h-6" />,
    imageUrl: "/images/symbols/hand-lightning.png"
  },
  {
    id: 4,
    name: "Сердце с лентой",
    description: "Любовь, единство и семейные узы. Основа всех отношений и источник жизненной силы.",
    icon: <Heart className="w-6 h-6" />,
    imageUrl: "/images/symbols/heart-ribbon.png"
  },
  {
    id: 5,
    name: "Медведь",
    description: "Сила, мощь и защита. Символ непоколебимости и готовности отстаивать свои принципы.",
    icon: <Crown className="w-6 h-6" />,
    imageUrl: "/images/symbols/bear.png"
  },
  {
    id: 6,
    name: "Орёл",
    description: "Высота духа, свобода и острота ума. Стремление к возвышенным целям и ясность видения.",
    icon: <Eye className="w-6 h-6" />,
    imageUrl: "/images/symbols/eagle.png"
  },
  {
    id: 7,
    name: "Факел в дереве",
    description: "Знания, передаваемые через поколения. Свет истины, который никогда не угасает в роду.",
    icon: <Flame className="w-6 h-6" />,
    imageUrl: "/images/symbols/torch-tree.png"
  }
];

const coatStyles: CoatStyle[] = [
  {
    id: 1,
    name: "Классическая геральдика",
    description: "Традиционный геральдический стиль с четкими линиями и символическими цветами",
    imageUrl: "/images/coat-styles/classic-heraldic.png"
  },
  {
    id: 2,
    name: "Геральдический реализм",
    description: "Детализированное исполнение с реалистичными элементами и богатой текстурой",
    imageUrl: "/images/coat-styles/heraldic-realism.png"
  },
  {
    id: 3,
    name: "Гравюрный стиль",
    description: "Винтажное исполнение в стиле старинных гравюр с тонкой штриховкой",
    imageUrl: "/images/coat-styles/engraving-style.png"
  },
  {
    id: 4,
    name: "Фэнтези-стиль",
    description: "Художественная интерпретация с мистическими элементами и богатой детализацией",
    imageUrl: "/images/coat-styles/fantasy-style.png"
  }
];

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting] as const;
};

// Animated section component
const AnimatedSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

function App() {
  const [selectedImage, setSelectedImage] = useState<CoatStyle | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      {/* Header */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-gray-800/5 to-transparent"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-12 relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-400/15 to-purple-500/10 blur-3xl rounded-full" />
            <Shield className="w-20 h-20 mx-auto mb-8 text-slate-700 relative z-10" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light text-slate-900 mb-8 leading-tight tracking-tight animate-slide-up">
            Герб семьи
            <span className="block font-medium bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 bg-clip-text text-transparent">
              Синяковых
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            «Через мудрость — к силе,<br />
            через любовь — к истине»
          </p>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }} />
          
          <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Каждый символ нашего герба несёт глубокий смысл, отражая ценности и традиции, 
            передаваемые из поколения в поколение
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </header>

      {/* Symbols Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 mb-8 tracking-tight">
              Символы герба
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Семь священных символов, каждый из которых воплощает важнейшие ценности нашего рода
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {symbols.map((symbol, index) => (
              <AnimatedSection
                key={symbol.id}
                delay={index * 100}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center mb-8 mx-auto text-slate-600 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-gray-200/50">
                    {symbol.icon}
                  </div>
                  
                  <h3 className="text-xl font-medium text-slate-900 mb-4 text-center tracking-tight">
                    {symbol.name}
                  </h3>
                  
                  <p className="text-slate-600 text-center leading-relaxed text-sm font-light">
                    {symbol.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coat Styles Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50/50 to-slate-100/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 mb-8 tracking-tight">
              Стили герба
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Четыре уникальных художественных интерпретации нашего родового герба
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coatStyles.map((style, index) => (
              <AnimatedSection
                key={style.id}
                delay={index * 150}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(style)}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1 border border-gray-100">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-slate-100">
                    <img
                      src={style.imageUrl}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.parentElement?.querySelector('.placeholder');
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="placeholder absolute inset-0 bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center hidden">
                      <Shield className="w-16 h-16 text-slate-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-slate-900 mb-4 tracking-tight">
                      {style.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {style.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 mb-8 tracking-tight">
              История герба
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-8" />
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-gray-50/20 rounded-3xl" />
              
              <div className="relative z-10">
                <p className="text-lg text-slate-700 leading-relaxed mb-8 font-light">
                  Герб семьи Синяковых создан как воплощение многовековых традиций и ценностей нашего рода. 
                  Каждый элемент тщательно выбран и несёт глубокий символический смысл, отражая путь семьи 
                  через времена испытаний и триумфов.
                </p>
                
                <p className="text-lg text-slate-700 leading-relaxed mb-8 font-light">
                  В центре герба располагается щит, разделённый на семь частей, каждая из которых рассказывает 
                  свою историю. Волчья голова напоминает о преданности и защите, открытая книга с оливковой 
                  ветвью символизирует стремление к знаниям и миру.
                </p>
                
                <p className="text-lg text-slate-700 leading-relaxed font-light">
                  Девиз «Через мудрость — к силе, через любовь — к истине» отражает философию жизни, 
                  которой следует наш род: истинная сила приходит через понимание, а истина открывается 
                  только тем, кто живёт с любовью в сердце.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-900">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Shield className="w-10 h-10 mx-auto text-slate-400 mb-6" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto" />
          </div>
          
          <p className="text-slate-300 font-light text-lg leading-relaxed mb-4">
            Семья Синяковых. Все права защищены.<br />
            Герб создан на основе семейных ценностей и истории.
          </p>
          
          <p className="text-slate-500 text-sm font-light">
            © 2024 • Традиции, передаваемые через поколения
          </p>
        </AnimatedSection>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-in">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-200 shadow-lg border border-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="aspect-square max-h-[60vh] bg-gradient-to-br from-gray-50 to-slate-100 relative">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector('.placeholder');
                  if (placeholder) {
                    (placeholder as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="placeholder absolute inset-0 bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center hidden">
                <Shield className="w-24 h-24 text-slate-400" />
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
                {selectedImage.name}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;