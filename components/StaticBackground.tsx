export function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full">
      {/* Основной градиентный фон */}
      <div 
        className="w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 30%, #f0fdf4 60%, #ecfccb 100%)'
        }}
      />
      
      {/* Дополнительные статичные волновые паттерны */}
      <div className="absolute inset-0">
        {/* Первый волновой слой */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-10"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(46, 125, 50, 0.15)"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3L1248,213.3L1248,320L1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Второй волновой слой */}
        <svg
          className="absolute bottom-0 left-0 w-full h-48 opacity-8"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(76, 175, 80, 0.12)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,170.7L1248,181.3L1248,320L1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Третий волновой слой */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-6"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(129, 199, 132, 0.08)"
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,213.3C960,213,1056,203,1152,192L1248,181.3L1248,320L1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Дополнительные декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Тонкие круговые паттерны */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-ekogumus-green/3 to-transparent"></div>
        <div className="absolute top-40 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-ekogumus-green-light/4 to-transparent"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-ekogumus-green-lighter/2 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-ekogumus-brown/3 to-transparent"></div>
      </div>
    </div>
  );
}