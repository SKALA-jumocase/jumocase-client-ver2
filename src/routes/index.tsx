import { createFileRoute } from "@tanstack/react-router";
import TraditionalDrink from "../shared/components/forms/TraditionalDrink";
import Specialty from "../shared/components/forms/Specialty";
import Region from "../shared/components/forms/Region";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto my-8 flex flex-row gap-8">
      <TraditionalDrink />
      <Specialty />
      <Region />
    </div>
  );
}
