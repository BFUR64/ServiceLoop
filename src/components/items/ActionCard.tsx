import {
  IconBookmark,
  IconBookmarkFilled,
  IconCheck,
  IconMessage,
} from "@tabler/icons-react";
import "./ActionCard.scss";

interface ActionProp {
  id: string;
  priority: boolean;
}

function ActionCard({ id, priority }: ActionProp) {
  return (
    <div className="action-card">
      <button className="action-card__action">
        <IconCheck />
      </button>

      <button className="action-card__action">
        <IconMessage />
      </button>

      <button className="action-card__action">
        {priority ? <IconBookmarkFilled /> : <IconBookmark />}
      </button>

      <button className="action-card__action action-card__action--edit">
        Edit
      </button>
    </div>
  );
}

export default ActionCard;
