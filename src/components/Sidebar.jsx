import Icon1 from "../assets/icon-1.svg";
import Icon2 from "../assets/icon-2.svg";
import Icon3 from "../assets/icon-3.svg";
import Icon4 from "../assets/icon-4.svg";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul>
          <li>
            <img src={Icon1} alt="icône méditation" />
          </li>
          <li>
            <img src={Icon2} alt="icône natation" />
          </li>
          <li>
            <img src={Icon3} alt="icône cyclisme" />
          </li>
          <li>
            <img src={Icon4} alt="icône musculation" />
          </li>
        </ul>
      </nav>
      <p className="sidebar__copyright">Copyright, SportSee 2020</p>
    </aside>
  );
}
