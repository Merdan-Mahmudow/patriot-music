import './index.css';
import { Link } from '@tanstack/react-router';
import MenuBlock from '../MenuBlock';



export default function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`menu-content ${isOpen ? 'open' : ''}`}>
      <ul className="menu">
        <li><Link to="/">Главная</Link></li>
        <li><a href="https://t.me/PATRIOT_MNGR">Тех.Поддержка</a></li>
        <li><a href="https://t.me/PATRIOT_MNGR">FAQ</a></li>
        <MenuBlock/>
      </ul>
    </div>
  );
}