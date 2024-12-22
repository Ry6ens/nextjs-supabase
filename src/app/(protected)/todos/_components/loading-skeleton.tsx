import React from "react";

export function LoadingSkeleton() {
	return (
		<div className="w-full max-w-4xl animate-pulse rounded-lg flex flex-col items-center min-h-screen">
			<div className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
				<div className="space-y-4 p-4">
					<div className="h-[62px] bg-neutral-200 rounded-lg" />
					<div className="h-[62px] bg-neutral-200 rounded-lg" />
					<div className="h-[62px] bg-neutral-200 rounded-lg" />
					<div className="h-[62px] bg-neutral-200 rounded-lg" />
				</div>
			</div>
		</div>
	);
}
