import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function Page() {
	return (
		<main className="mt-[80px] flex flex-col items-center gap-6">
			<h1>
				Chapter 1 Homework - <b>Todo List</b>
			</h1>
			<Button asChild>
				<Link href="/todos">Go to Todo List</Link>
			</Button>
		</main>
	);
}
