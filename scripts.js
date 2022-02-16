"use strict";

const branchRadios = document.querySelectorAll('input[name="branch_name"]');
const typeOfTicketRadios = document.querySelectorAll(
	'input[name="ticket_type"]'
);
const ticketIdTitle = document.getElementById("ticket_title");
const gitBranchEl = document.getElementById("branch");
const gitCommandsEl = document.getElementById("gitCommands");
const copiedEl = document.getElementById("copied");

const transformV2 = () => {
	copiedEl.style.visibility = "hidden";

	const masterBranchName = document.querySelector(
		'input[name="branch_name"]:checked'
	).value;

	const ticketType = document.querySelector(
		'input[name="ticket_type"]:checked'
	).value;

	const ticketIdTitle = document.querySelector(
		'input[name="ticket_title"]'
	).value;

	if (!ticketIdTitle) {
		gitBranchEl.innerText = "";
		gitCommandsEl.innerText = "";
		return;
	}

	const [ticketID, ticketTitle] = ticketIdTitle.split("  ");

	if (!ticketID) {
		gitBranchEl.innerText = "";
		gitCommandsEl.innerText = "";
		return;
	}

	let sanitizedBranchName =
		ticketType + "/" + ticketID.toString().toUpperCase().trim();

	if (ticketTitle) {
		sanitizedBranchName =
			sanitizedBranchName +
			"-" +
			ticketTitle
				.toString()
				.trim()
				.toLowerCase()
				.replace(/[\W_]+/g, "-");
	}

	if (sanitizedBranchName.endsWith("-")) {
		sanitizedBranchName = sanitizedBranchName.slice(0, -1);
	}

	gitBranchEl.innerText = sanitizedBranchName;

	gitCommandsEl.innerText =
		"git checkout " +
		masterBranchName +
		" && git pull && git fetch && git checkout -b " +
		sanitizedBranchName +
		" && git status";
};

const copyToClipboard = () => {
	navigator.clipboard.writeText(gitCommandsEl.innerText);
	copiedEl.style.visibility = "visible";
};

branchRadios.forEach((radio) => radio.addEventListener("change", transformV2));
typeOfTicketRadios.forEach((radio) =>
	radio.addEventListener("change", transformV2)
);
ticketIdTitle.addEventListener("change", transformV2);
ticketIdTitle.addEventListener("input", transformV2);
ticketIdTitle.addEventListener("paste", transformV2);
gitCommandsEl.addEventListener("click", copyToClipboard);
