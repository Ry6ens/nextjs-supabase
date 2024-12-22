"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="p-4 md:p-8 flex flex-col items-center justify-between space-y-4">
			<h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
