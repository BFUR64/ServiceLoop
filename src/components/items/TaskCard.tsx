import ActionCard from "./ActionCard";
import "./TaskCard.scss";

interface TaskProp {
  id: string;
  name: string;
  priority: boolean;
}

export function TaskCard({ id, name, priority }: TaskProp) {
  return (
    <div className="task-card">
      <ActionCard id={id} priority={priority} />

      <div className="task-card__info">{name}</div>
    </div>
  );
}

export default TaskCard;
