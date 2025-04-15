/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];
  ns.scp('shared/share.js', target);
  let ramCost = ns.getScriptRam('/shared/share.js');
  let ramAvaliable = (ns.getServerMaxRam(target) - ns.getServerUsedRam(target));
  let ramReserve = ns.getServerMaxRam(target) * 0.10;
  if (ramReserve > 20) {
    ramReserve = 15;
  }
  let threads = Math.floor(ramAvaliable / ramCost);
  if (target.includes("pser")) {
    ns.exec('/shared/share.js', target, threads);
  }
  if (target.includes("home")) {
    threads = Math.floor((ramAvaliable / ramCost) - ramReserve);
    ns.exec('/shared/share.js', target, threads)
  }
}