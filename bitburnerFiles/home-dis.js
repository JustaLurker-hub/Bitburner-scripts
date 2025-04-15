/** @param {NS} ns */
export async function main(ns) {
  ns.write("/shared/respawn.txt", "true", "w");
  // let ramAvaliable = 1;
  let threads = ns.args[0];
  let i = 0;
  let targets1 = ["hong-fang-tea", "sigma-cosmetics", "foodnstuff", "max-hardware", "iron-gym"
    , "neo-net", "joesguns", "nectar-net", "harakiri-sushi", "zer0"];
  let targets2 = ["crush-fitness", "omega-net", "silver-helix", "the-hub", "phantasy",
    "johnson-ortho", "rothman-uni", "netlink", "catalyst", "computek"]

  for (let server of targets1) {
    ns.brutessh(server);
    ns.nuke(server);
    if (i < 10) {
      ns.run('homehack.js', 1, server, threads);
      i++;
    }
  }
  for (let server2 of targets2) {
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.ftpcrack(server2);
      ns.relaysmtp(server2);
      ns.nuke(server2);
      if (i < 20) {
        ns.run('homehack.js', 1, server2, threads);
        i++;
      }
    }
  }
}
// async function myhack(ns) {
//   let target = ns.args[0];
//   let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
//   let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
//   // let ramPerThread = ns.getScriptRam("/shared/weaken.js");
//   // let ramAvailabe = (ns.getServerMaxRam('home') - 10000) - ns.getServerUsedRam('home');
//   let threads = ns.args[1];//Math.floor(ramAvailabe / ramPerThread);
//   while (threads > 0) {
//     let sleeptime = 3000;
//     if (ns.getServerSecurityLevel(target) > securityThresh) {
//       sleeptime = ns.getWeakenTime(target);
//       ns.run('/shared/weaken.js', threads, target);
//     } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
//       sleeptime = ns.getGrowTime(target);
//       ns.run('/shared/grow.js', threads, target);
//     } else {
//       sleeptime = ns.getHackTime(target)
//       ns.run('/shared/hack.js', threads, target);
//     }
//     await ns.sleep(sleeptime + 100);
//   }
// }