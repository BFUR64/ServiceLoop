import { IconSettings } from "@tabler/icons-react";
import "./Nav.scss";

interface NavProp {
  isPrimary: boolean;
}

export function Nav({ isPrimary = false }: NavProp) {
  const hidden = isPrimary ? "" : "nav-bar__action--hidden";

  return (
    <nav className="nav-bar">
      <h2>ServiceLoop</h2>
      <button
        disabled={!isPrimary}
        className={`nav-bar__action ${hidden}`}
        onClick={() => console.log("I am clicked!")}
      >
        <IconSettings />
      </button>
    </nav>
  );
}

export default Nav;
