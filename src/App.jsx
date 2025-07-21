
import { useState } from 'react';
import './App.css';
import logoJpg from './assets/logo_santander2.jpg';

const menuItems = [
  { name: 'Homepage', icon: '🏠' },
  { name: 'Tribus', icon: '👥' },
  { name: 'Herramientas', icon: '🛠️' },
  { name: 'Documentación', icon: '📄' },
];


function App() {
  const [selected, setSelected] = useState('Homepage');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Handler para mostrar el menú solo si el mouse está muy cerca del borde izquierdo
  const handleMouseMove = (e) => {
    if (e.clientX <= 40) {
      setSidebarVisible(true);
    } else if (sidebarVisible && e.clientX > 260) {
      setSidebarVisible(false);
    }
  };

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
          {selected === 'Tribus' && (
            <>
              <h1>Tribus</h1>
              <p>Conoce las diferentes tribus y equipos dentro de QA.</p>
            </>
          )}
          {selected === 'Herramientas' && (
            <>
              <h1>Herramientas</h1>
              <p>Accede a las herramientas clave para tu trabajo diario.</p>
            </>
          )}
          {selected === 'Documentación' && (
            <>
              <h1>Documentación</h1>
              <p>Encuentra guías, manuales y procesos de QA.</p>
            </>
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
