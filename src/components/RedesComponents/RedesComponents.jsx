import "./style.css";
import redes from "/src/redes.json";
import { Link } from "react-router-dom";

function RedesComponents() {
  return (
    <ul className="redes">
      {redes.map((r) => {
        return (
          <li key={r.id}>
            {r.name !== "Email" ? (
              <Link to={`${r.url}`} target="_blank" className={`icon`}>
                <img src={`/icons/${r.icon}.png`} alt={`${r.name}`} />
              </Link>
            ) : (
              <a href={`mailto:${r.url}`} className="icon">
                <img src={`/icons/${r.icon}.png`} alt={`${r.name}`} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default RedesComponents;
