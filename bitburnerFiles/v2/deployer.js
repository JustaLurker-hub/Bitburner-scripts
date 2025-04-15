/**
 * @param {AutocompleteData} data - context about the game, useful when autocompleting
 * @param {string[]} args - current arguments, not including "run script.js"
 * @returns {string[]} - the array of possible autocomplete options
 */
export function autocomplete(data, args) {
  const servers = data.servers;
  return [...servers, "argument0", "argument1", "argument2"];
}
const cyan = "\u001b[36m";
const green = "\u001b[32m";
const red = "\u001b[31m";
const reset = "\u001b[0m";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('ALL');
  ns.ui.openTail;

  let target = ns.args[0];
  let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  let servers = [];
  let ramPerThread = ns.getScriptRam("/shared/weaken.js");
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
      , seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  let serversToScan = ns.scan("home");
  while (serversToScan.length > 0) {
    let server = serversToScan.shift();
    if (!servers.includes(server) && server !== "home" && !server.startsWith("pser")) {
      servers.push(server);
      serversToScan = serversToScan.concat(ns.scan(server));
      ns.scp([
        "/shared/weaken.js",
        "/shared/grow.js",
        "/shared/hack.js",
        "/shared/share.js"
      ], server);
      if (!server.includes('pserv')) {
        // if (ns.isRunning)
        ns.killall(server);
      }
      // if (!ns.fileExists('new-early-hack.js', serverName)) {
      //   ns.scp('new-early-hack.js', serverName);
      // }

      let openPorts = 0;
      if (ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(server);
        openPorts++;
      }
      if (ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(server);
        openPorts++;
      }
      if (ns.fileExists('RelaySMTP.exe')) {
        ns.relaysmtp(server);
        openPorts++;
      }
      if (ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(server);
        openPorts++;
      }
      if (ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(server);
        openPorts++;
      }
      if (ns.getServerNumPortsRequired(server) <= openPorts) {
        ns.nuke(server);
      }

    }
  }
  if (ns.hasRootAccess(target)) {
    while (true) {
      let sleeptime = 3000;
      // ns.tprint(servers)
      for (let server of servers) {
        if (ns.hasRootAccess(server)) {
          let ramAvailabe = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
          let threads = Math.floor(ramAvailabe / ramPerThread);
          if (threads > 0) {
            if (ns.getServerSecurityLevel(target) > securityThresh) {
              sleeptime = ns.getWeakenTime(target);
              ns.exec('/shared/weaken.js', server, threads, target);
              ns.print(`${green}` + server + ' weaken ' + target + `${reset}`);
              ns.print(`${red}` + msToTime(sleeptime) + `${reset}`);
            } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
              sleeptime = ns.getGrowTime(target);
              ns.exec('/shared/grow.js', server, threads, target);
              ns.print(`${green}` + server + ' grow ' + target + `${reset}`);
              ns.print(`${red}` + msToTime(sleeptime) + `${reset}`);
            } else {
              sleeptime = ns.getHackTime(target)
              ns.exec('/shared/hack.js', server, threads, target);
              ns.print(`${green}` + server + ' hack ' + target + `${reset}`);
              ns.print(`${red}` + msToTime(sleeptime) + `${reset}`);
            }
          }
        }
      }
      await ns.sleep(sleeptime + 100);
    }
  }
}

