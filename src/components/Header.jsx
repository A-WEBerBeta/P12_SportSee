import Logo from "../assets/logo.svg";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li>
            <img src={Logo} alt="Logo SportSee" />
          </li>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglages</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </header>
  );
}
