import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/industries")({
	component: IndustriesLayout,
});

function IndustriesLayout() {
	return <Outlet />;
}
