/** @param {NS} ns */
export function serverScaner(ns) {
  let servers = [];
  let serversToScan = ns.scan("home");
  while (serversToScan.length > 0) {
    let server = serversToScan.shift();
    if (!servers.includes(server) && server !== ("home", "pserv")) {
      servers.push(server);
      serversToScan = serversToScan.concat(ns.scan(server));
    }
  }
  return servers;
}
export async function accessibleServers(ns) {
  let targets = serverScaner(ns);
  let accessibleServers = new Set();
    for (let server of targets) {
        if (await ns.hasRootAccess(server)) {
            accessibleServers.add(server)
        } else {
            let portOpened = 0;
            if (await ns.fileExists("BruteSSH.exe")) {
                await ns.brutessh(server);
                portOpened++;
            }
            if (await ns.fileExists("FTPCrack.exe")) {
                await ns.ftpcrack(server);
                portOpened++;
            }
            if (await ns.fileExists("HTTPWorm.exe")) {
                await ns.httpworm(server);
                portOpened++;
            }
            if (await ns.fileExists("relaySMTP.exe")) {
                await ns.relaysmtp(server);
                portOpened++;
            }
            if (await ns.fileExists("SQLInject.exe")) {
                await ns.sqlinject(server);
                portOpened++;
            }
            if (await ns.getServerNumPortsRequired(server) <= portOpened) {
                await ns.nuke(server);
                accessibleServers.add(server);
            }
        }
    }
    return accessibleServers;
}