import React, { useState, useEffect, use } from "react";
import axios from "axios";
import io from "socket.io-client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const socket = io("http://localhost:3001");

function App() {
	const [meetingUrl, setMeetingUrl] = useState("");
	const [transcripts, setTranscripts] = useState([]);
	const [status, setStatus] = useState("");
	const [darkMode, setDarkMode] = useState(false);

	// Toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
		localStorage.setItem("darkMode", !darkMode);
	};

	useEffect(() => {
		const storedDarkMode = localStorage.getItem("darkMode");
		if (storedDarkMode) {
			setDarkMode(storedDarkMode === "true");
		}
	}, []);

	// Handle real-time transcript updates
	useEffect(() => {
		socket.on("transcript", (transcript) => {
			console.log("transcript: ", transcript);
			setTranscripts((prev) => [...prev, transcript]);
		});
		return () => socket.off("transcript");
	}, []);

	// Deploy bot
	const handleDeployBot = async () => {
		if (!meetingUrl) {
			setStatus("Please enter a valid Google Meet URL");
			return;
		}
		setStatus("Deploying bot...");
		try {
			const response = await axios.post("http://localhost:3001/deploy-bot", {
				meeting_url: meetingUrl,
			});
			setStatus(`Bot deployed with ID: ${response.data.bot_id}`);
		} catch (error) {
			setStatus("Error deploying bot");
			console.error(error);
		}
	};

	return (
		<div
			className={`min-h-screen ${
				darkMode ? "dark bg-gray-900" : "bg-gray-100"
			} transition-colors duration-300`}
		>
			{/* Navbar */}
			<nav className="shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<a href="/">
								{darkMode ? (
									<img
										width="108"
										loading="lazy"
										alt=""
										src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66c1f6a9a8b687fd5181e167_logo.svg"
										class="logo-light"
									/>
								) : (
									<img
										width="108"
										loading="lazy"
										alt="Recall.ai logo"
										src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66b294e51ee15f18dd2b171e_recall-logo.svg"
										class="logo-dark"
									/>
								)}
							</a>
						</div>
						<div className="flex items-center">
							<a
								href="https://docs.recall.ai"
								target="_blank"
								class="flex mr-4"
								rel="noreferrer"
							>
								<div className="text-gray-900 dark:text-white">
									<p>API&nbsp;Docs</p>
								</div>
								{darkMode ? (
									<img
										src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66c2007505674a449fc3f6ec_arrow-up-right-inverted.svg"
										loading="lazy"
										alt="API Docs"
									/>
								) : (
									<img
										src="https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/66b295b81c2b6822fd45ae62_icon-arrow-up-right.svg"
										loading="lazy"
										alt="API Docs"
									/>
								)}
							</a>
							<button
								onClick={toggleDarkMode}
								className={`${
									darkMode
										? "bg-yellow-400 hover:bg-yellow-500 text-black"
										: "bg-blue-800 dark:hover:bg-blue-900 text-white"
								} p-2 rounded-full focus:outline-none transition-colors duration-300`}
								aria-label="Toggle dark mode"
							>
								{darkMode ? (
									<SunIcon className="h-6 w-6" />
								) : (
									<MoonIcon className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-semibold dark:text-gray-50 mb-6 text-center">
					Google Meet Transcription Bot
				</h1>

				{/* Input and Button */}
				<div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
					<input
						type="text"
						placeholder="Enter Google Meet URL"
						value={meetingUrl}
						onChange={(e) => setMeetingUrl(e.target.value)}
						className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					/>
					<button
						onClick={handleDeployBot}
						disabled={!meetingUrl}
						className={`${
							!meetingUrl
								? "cursor-not-allowed"
								: "cursor-pointer hover:bg-blue-700"
						} px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
					>
						Deploy Bot
					</button>
				</div>

				{/* Status Message */}
				<p className="text-center mb-6 text-red-600 dark:text-red-400">
					{status}
				</p>

				{/* Live Transcript Section */}
				<div className="my-8">
					<h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 text-center">
						Live Transcript
					</h2>
					<div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-h-96 overflow-y-auto">
						{transcripts.length === 0 ? (
							<p className="text-gray-500 dark:text-gray-400 text-center">
								No transcripts yet...
							</p>
						) : (
							transcripts.map((t, index) => (
								<div
									key={index}
									className="border-b border-gray-200 dark:border-gray-700 py-2 last:border-b-0"
								>
									<span className="text-gray-600 dark:text-gray-300">
										[{t.timestamp.toFixed(2)}s] {t.speaker}:{" "}
									</span>
									<span className="text-gray-900 dark:text-white">
										{t.text}
									</span>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
