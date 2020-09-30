'use strict';

function transform () {
  const ticket = document.getElementById('ticket').value;
  const title = document.getElementById('title').value;
  const select = document.getElementById("ticket-type");
  const ticketType = select.options[select.selectedIndex].value;
  let branch = ticketType + "/" + ticket.toString().toUpperCase() + "-" + title.toString().trim().toLowerCase().replace(/[\W_]+/g, '-');
  if (branch.endsWith('-')){
    branch = branch.slice(0, -1);
  }
  document.getElementById('branch').innerText = branch;
  const gitCommands = document.getElementById('gitCommands');
  gitCommands.innerText = "git fetch && git checkout "+ branch;
}
