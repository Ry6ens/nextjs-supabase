import React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbProps = {
	label: string;
	href: string;
	active?: boolean;
};

export default function Breadcrumbs({
	breadcrumbs,
}: {
	breadcrumbs: BreadcrumbProps[];
}) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem key={breadcrumb.href}>
							{breadcrumb.active ? (
								<BreadcrumbPage className="text-neutral-400">
									{breadcrumb.label}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={breadcrumb.href}>
										{breadcrumb.href === "/" ? (
											<HomeIcon className="h-4 w-4" />
										) : (
											breadcrumb.label
										)}
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < breadcrumbs.length - 1 ? (
							<BreadcrumbSeparator key={breadcrumb.href + index} />
						) : null}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
