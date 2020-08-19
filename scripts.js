'use strict';

function transform () {
  const ticket = document.getElementById('ticket').value;
  const title = document.getElementById('title').value;
  var select = document.getElementById("ticket-type");
  var ticketType = select.options[select.selectedIndex].value;
  const branch = ticketType + "/" + ticket.toString().toUpperCase() + "-" + title.toString().trim().toLowerCase().replace(/[\W_]+/g, '-');
  document.getElementById('branch').innerText = branch;
  const gitCommands = document.getElementById('gitCommands');
  gitCommands.innerText = "git fetch && git checkout "+ branch;
}
