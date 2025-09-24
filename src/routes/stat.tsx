import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/stat"!</div>
}
