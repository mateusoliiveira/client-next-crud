import { Toast } from "flowbite-react";
import React from "react";
import { handleFeedbackColor } from "../../_utils";

const AlertCondition = ({ messages, status }: any) => {
	return (
		<div className="flex justify-center mb-5 mt-5">
			{messages ? (
				<div className={`flex flex-col md:flex-row gap-2`}>
					{Array.isArray(messages) ? (
						messages.map((msg: string, index: number) => {
							return (
								<Toast key={index}>
									<div
										className={`inline-flex h-8 w-8 shrink-0 border border-${handleFeedbackColor(
											status
										)} text-${handleFeedbackColor(
											status
										)} items-center justify-center rounded-lg ml-2 mr-4 shadow-sm text-sm font-normal`}
									>
										{">"}
									</div>
									<div
										className={`mr-2 px-5 text-sm font-normal text-${handleFeedbackColor(
											status
										)}`}
									>
										{msg}
									</div>
									<Toast.Toggle />
								</Toast>
							);
						})
					) : (
						<div className="flex flex-col gap-4">
							<Toast>
								<div
									className={`inline-flex h-8 w-8 shrink-0 border border-${handleFeedbackColor(
										status
									)} text-${handleFeedbackColor(
										status
									)} items-center justify-center rounded-lg ml-2 mr-4 shadow-sm text-sm font-normal`}
								>
									{">"}
								</div>
								<div
									className={`ml-2 px-5 text-sm font-normal text-${handleFeedbackColor(
										status
									)}`}
								>
									{messages}
								</div>
								<Toast.Toggle />
							</Toast>
						</div>
					)}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default AlertCondition;
