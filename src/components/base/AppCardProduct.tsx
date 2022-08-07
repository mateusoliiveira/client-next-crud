import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";
import { Product } from "../../interfaces/Product";
import { formatDate, formatToBRL } from "../../_utils";

const AppCardProduct = ({
	info,
	children,
}: {
	info: Product;
	children: any;
}) => {
	const router = useRouter();
	return (
		<Card key={info.id}>
			<>
				<div className="flex justify-between">
					<h5
						className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white cursor-pointer"
						onClick={() => router.push("/product/" + info.id)}
					>
						{info.name}
					</h5>
					<h5 className="text-md font-bold tracking-tight text-gray-400 dark:text-white">
						há {formatDate(info.created_at)}
					</h5>
				</div>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{formatToBRL(info.price * info.quantity)} total | {info.quantity}un
				</p>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{formatToBRL(info.price)} pç.
				</p>
				{children}
			</>
		</Card>
	);
};

export default AppCardProduct;
