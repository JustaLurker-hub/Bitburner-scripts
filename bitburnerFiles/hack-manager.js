const hackScript = "/shared/hack.js";
const growScript = "shared/grow.js";
const weakScript = "/shared/weaken.js";
const files = [hackScript, growScript, weakScript];
const slaveScript = 1.75;
/*
args
0 = target
1 = sleep time
2 = additionalmilsec
3 = stocks
 */

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL")
  ns.ui.openTail();
  let servers;
  let targets;
  let freeRam;
  let ramUsage;
  let homeRam = ns.getPurchasedServerMaxRam("home");
  let stocks = false;


  while (true) {
    servers = await scanAndNuke(ns);
    ns.print(`servers:${[...servers.values()]}`)
    for (let server of servers) {
      ns.scp(files, server);
      let target = getHackable(ns, servers);

      await ns.sleep(5000)
    }
  }
  freeRam = getFreeRams(ns, servers);
  targets = getHackable(ns, servers);
  

}
async function scanAndNuke(ns) {
  let servers = new Set(["home"]);
  scanAll(ns, "home", servers);
  var accessibleServers = new Set();
  for (let server of servers) {
    // if (server.startsWith("hacknet-node")) { continue; } // for BitNode 9 to permit hacking on the Hacknet Servers
    if (await ns.hasRootAccess(server)) {
      accessibleServers.add(server)
    } else {
      var portOpened = 0;
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
function scanAll(ns, host, servers) {
  var hosts = ns.scan(host);
  for (let i = 0; i < hosts.length; i++) {
    if (!servers.has(hosts[i])) {
      servers.add(hosts[i]);
      scanAll(ns, hosts[i], servers);
    }
  }
}
function getHackable(ns, servers) {

  var sortedServers = [...servers.values()].filter(server => ns.getServerMaxMoney(server) > 100000
    && ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
    && ns.getServerGrowth(server) > 1 && server != "n00dles").sort((a, b) =>
      profitsm["get"](b) - profitsm["get"](a))
  // unnatural usage of "get" to avoid stanek.get RAM calculation bug

  if (partialWeakGrow != null) {
    // prioritize a server which we have not initialized yet
    sortedServers.unshift(partialWeakGrow);
  }
}
function getFreeRams(ns, servers) {
  let serverRams = [];
  let overAllFreeRam = 0;
  let overAllMaxRam = 0;

  for (let server of servers) {
    const maxRam = ns.getServerMaxRam(server);
    const usedRam = ns.getServerUsedRam(server);
    let freeRam = maxRam - usedRam;
    freeRam = Math.floor(freeRam / slaveScript) * slaveScript;
    overAllMaxRam += maxRam;
    if (freeRam >= slaveScript) {
      serverRams.push({ host: server, freeRam: freeRam });
      overAllFreeRam += freeRam;
    }
  }
  serverRams.sort((a, b) => b.freeRam - a.freeRam);
  serverRams.sort((a, b) => (a.host == "home") - (b.host == "home"));

  return { serverRams, overAllFreeRam, overAllMaxRam };
}
