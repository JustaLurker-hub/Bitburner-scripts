/** @param {NS} ns */
export async function main(ns) {
  await ns.sleep(10);
  let target = ns.args[0];
  let respawn = ns.read("/shared/respawn.txt");
  let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  // let ramPerThread = ns.getScriptRam("/shared/weaken.js");
  // let ramAvailabe = (ns.getServerMaxRam('home') - 10000) - ns.getServerUsedRam('home');
  let threads = ns.args[1];//Math.floor(ramAvailabe / ramPerThread);
  while (threads > 0 && respawn !== "false") {
    let sleeptime = 3000;
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      sleeptime = ns.getWeakenTime(target);
      ns.run('/shared/weaken.js', threads, target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      sleeptime = ns.getGrowTime(target);
      ns.run('/shared/grow.js', threads, target);
    } else {
      sleeptime = ns.getHackTime(target)
      ns.run('/shared/hack.js', threads, target);
    }
    // await ns.sleep(sleeptime + 100);
    if (respawn == "true") {
      ns.spawn("homehack.js", { threads: 1, spawnDelay: sleeptime }, target, threads)
    } else {
      ns.scriptKill("homehack.js");
    }
  }
}