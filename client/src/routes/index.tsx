import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getTasks } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="muted">muted</Button>
        <Button variant="outline">outline</Button>
        <Button variant="teritary">teritary</Button>
      </div>
      {data?.map(task => (
        <div key={task.id} className="flex items-center gap-2">
          <h3>{task.name}</h3>
          <Checkbox defaultChecked={task.done} />
        </div>
      ))}
    </div>
  );
}
