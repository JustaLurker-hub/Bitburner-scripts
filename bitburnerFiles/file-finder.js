/** @param {NS} ns */
export async function main(ns) {
  let servers = [];
  let serversToScan = ns.scan("home");
  while (serversToScan.length > 0) {
    let server = serversToScan.shift();
    if (!servers.includes(server) && server !== "home") {
      servers.push(server);
      serversToScan = serversToScan.concat(ns.scan(server));
    }
  }

  for (let server of servers) {
    let contract = ns.ls(server);
    let files = [];
    for (let cct of contract)
      if (cct.endsWith('.cct')) {
        files.push(cct);
      }
    if (files.length > 0) {
      ns.tprint(server + ' ' + files);
    }
  }
}

