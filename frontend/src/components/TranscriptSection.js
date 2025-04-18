import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { formatTimestamp } from "../utils/formatTimestamp";

const TranscriptSection = ({
	transcripts,
	transcriptContainerRef,
	handleDownloadTranscript,
	handleClearTranscript,
}) => {
	return (
		<div className="my-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-medium text-gray-900 dark:text-white text-center">
					Live Transcript
				</h2>
				<div>
					<button
						onClick={() => handleDownloadTranscript(transcripts)}
						disabled={transcripts.length === 0}
						className={`flex items-center text-gray-900 dark:text-white ${
							transcripts.length === 0
								? "opacity-50 cursor-not-allowed"
								: "hover:text-blue-600 dark:hover:text-blue-500"
						} transition-colors duration-200`}
						aria-label="Download"
					>
						<span className="mr-2">Download Transcript</span>
						<ArrowDownTrayIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
			<div
				ref={transcriptContainerRef}
				className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-h-96 overflow-y-auto"
			>
				{transcripts.length === 0 ? (
					<p className="text-gray-500 dark:text-gray-400 text-center">
						No transcripts yet...
					</p>
				) : (
					transcripts.map((t, index) => (
						<div
							key={index}
							className="border-b border-blue-600 last:border-b-0 py-2 px-4 my-2 bg-blue-600 dark:text-gray-100 text-white whitespace-pre-wrap rounded-lg break-words w-fit max-w-[85%] mr-auto"
						>
							<span className="text-gray-100">
								[{formatTimestamp(t.timestamp)}] {t.speaker}:{" "}
							</span>
							<span className="text-gray-100 dark:text-white ">{t.text}</span>
						</div>
					))
				)}
			</div>
			<div className="flex justify-end mt-4">
				<button
					onClick={handleClearTranscript}
					disabled={transcripts.length === 0}
					className={`py-2 px-4 border rounded-lg ${
						transcripts.length === 0
							? "opacity-50 cursor-not-allowed text-gray-500 border-gray-500"
							: "border-red-500 text-red-500 hover:text-red-700 dark:hover:text-red-700"
					} transition-colors duration-200`}
					aria-label="Clear transcript"
				>
					Clear Transcript
				</button>
			</div>
		</div>
	);
};

export default TranscriptSection;
