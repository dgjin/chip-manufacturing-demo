import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center circuit-pattern">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <AlertTriangle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">页面未找到</p>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          您访问的页面不存在或已被移除。请返回首页继续探索芯片制造工艺流程。
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
        >
          <Home className="h-4 w-4" />
          返回首页
        </Link>
      </div>
    </div>
  );
}
