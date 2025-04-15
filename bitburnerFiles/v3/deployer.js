import { scanAllServers } from '/helpers.js'
/** @param {NS} ns */
export async function main(ns) {
  const severList = scanAllServers(ns);
  for (let server of severList) {

    function ramAvailable(ns) {
      let ramAvailabe = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
      let threads = Math.floor(ramAvailabe / ramPerThread);
      return threads;
    }
    ns.scp([
      "/shared/weaken.js",
      "/shared/grow.js",
      "/shared/hack.js",
      "/shared/share.js"
    ], server);
    while (ns.hasRootAccess) {
      for (let p of server) {
        if (p.includes('pserv')) {
          let thread = ramAvailable;
          ns.exec('/shared/share.js', p, thread);
          await ns.sleep(10010);
        }
      }
    }
  }
  // ns.tprint(isPserv)




  //   ns.killall(server);
  //   while (tserv) {
  //     let openPorts = 0;
  //     if (ns.fileExists('BruteSSH.exe')) {
  //       ns.brutessh(server);
  //       openPorts++;
  //     }
  //     if (ns.fileExists('FTPCrack.exe')) {
  //       ns.ftpcrack(server);
  //       openPorts++;
  //     }
  //     if (ns.fileExists('RelaySMTP.exe')) {
  //       ns.relaysmtp(server);
  //       openPorts++;
  //     }
  //     if (ns.fileExists('HTTPWorm.exe')) {
  //       ns.httpworm(server);
  //       openPorts++;
  //     }
  //     if (ns.fileExists('SQLInject.exe')) {
  //       ns.sqlinject(server);
  //       openPorts++;
  //     }
  //     if (ns.getServerNumPortsRequired(server) <= openPorts) {
  //       ns.nuke(server);
  //     }
  //   }
}


