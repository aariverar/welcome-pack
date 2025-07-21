import { useState } from 'react';
import './App.css';
import logoJpg from './assets/logo_santander2.jpg';
import ConfluencePageEditor from './components/ConfluencePageEditor';
import ConfluencePageList from './components/ConfluencePageList';
import ConfluencePageView from './components/ConfluencePageView';

const menuItems = [
  { name: 'Homepage', icon: '🏠' },
  { name: 'Tribus', icon: '👥' },
  { name: 'Herramientas', icon: '🛠️' },
  { name: 'Documentación', icon: '📄' },
];

const confluenceSections = ['Tribus', 'Herramientas', 'Documentación'];

function getInitialPages() {
  try {
    return JSON.parse(localStorage.getItem('confluencePages')) || {};
  } catch {
    return {};
  }
}

function App() {
  const [selected, setSelected] = useState('Homepage');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [pages, setPages] = useState(getInitialPages());
  const [showEditor, setShowEditor] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [viewPage, setViewPage] = useState(null);

  // Handler para mostrar el menú solo si el mouse está muy cerca del borde izquierdo
  const handleMouseMove = (e) => {
    if (e.clientX <= 40) {
      setSidebarVisible(true);
    } else if (sidebarVisible && e.clientX > 260) {
      setSidebarVisible(false);
    }
  };

  const handleCreatePage = (section) => {
    setCurrentSection(section);
    setShowEditor(true);
  };

  const handleSavePage = (page) => {
    const updated = { ...pages };
    if (!updated[currentSection]) updated[currentSection] = [];
    updated[currentSection].push(page);
    setPages(updated);
    localStorage.setItem('confluencePages', JSON.stringify(updated));
    setShowEditor(false);
    setCurrentSection(null);
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
    setCurrentSection(null);
  };

  const handleSelectPage = (page) => setViewPage(page);
  const handleBackView = () => setViewPage(null);

  return (
    <div
      className="santander-app"
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >
      <aside className={`sidebar${sidebarVisible ? ' show' : ' hide'}`}> 
        <div className="sidebar-header">
          <img src={logoJpg} alt="Santander" className="santander-logo" />
        </div>
        <nav>
          {menuItems.map(item => (
            <div
              key={item.name}
              className={`menu-item${selected === item.name ? ' active' : ''}`}
              onClick={() => setSelected(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>
      <main className={`main-content${sidebarVisible ? ' shift' : ''}`}> 
        <section className="content-card">
          {selected === 'Homepage' && (
            <>
              <h1>Bienvenido al Onboarding QA</h1>
              <p>Esta web te ayudará a integrarte al equipo de aseguramiento de calidad de Santander.</p>
            </>
          )}
          {confluenceSections.includes(selected) && (
            <>
              <h1>{selected}</h1>
              <p>{selected === 'Tribus' ? 'Conoce las diferentes tribus y equipos dentro de QA.' : selected === 'Herramientas' ? 'Accede a las herramientas clave para tu trabajo diario.' : 'Encuentra guías, manuales y procesos de QA.'}</p>
              <button className="confluence-btn create" onClick={() => handleCreatePage(selected)}>
                + Crear página
              </button>
              <ConfluencePageList pages={pages[selected] || []} onSelect={handleSelectPage} />
            </>
          )}
          {viewPage && (
            <ConfluencePageView page={viewPage} onBack={handleBackView} />
          )}
          {showEditor && (
            <ConfluencePageEditor onSave={handleSavePage} onCancel={handleCancelEditor} />
          )}
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <img src={logoJpg} alt="Santander" className="footer-logo" />
          <span className="footer-text">© {new Date().getFullYear()} Santander QA | Bienvenido al equipo | Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
