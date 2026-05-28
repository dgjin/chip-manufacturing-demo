import { Link, useLocation } from 'react-router-dom';
import { processStepMetas } from '@/data/stepMetas';
import { Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="返回首页">
          <div className="relative">
            <Cpu className="h-6 w-6 text-primary group-hover:text-chip-glow transition-colors" aria-hidden="true" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-chip-glow/30 transition-colors" />
          </div>
          <span className="font-bold text-lg text-gradient-cyan">芯片制造全流程</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {processStepMetas.map((step, index) => {
            const isActive = location.pathname === `/process/${step.id}`;
            return (
              <Link
                key={step.id}
                to={`/process/${step.id}`}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-primary/20 text-primary shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
              >
                <span className="opacity-50 mr-1">{String(index + 1).padStart(2, '0')}</span>
                {step.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="切换导航菜单"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav id="mobile-menu" className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-3 grid grid-cols-2 gap-1">
            {processStepMetas.map((step, index) => {
              const isActive = location.pathname === `/process/${step.id}`;
              return (
                <Link
                  key={step.id}
                  to={`/process/${step.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  <span className="opacity-50 mr-1">{index + 1}.</span>
                  {step.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
