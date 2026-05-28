import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { HomePage } from '@/components/layout/HomePage';
import { ProcessDetailPage } from '@/components/layout/ProcessDetailPage';
import { NotFoundPage } from '@/components/layout/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process/:id" element={<ProcessDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
