/**
 * @param {AutocompleteData} data - context about the game, useful when autocompleting
 * @param {string[]} args - current arguments, not including "run script.js"
 * @returns {string[]} - the array of possible autocomplete options
 */
export function autocomplete(data, args) {
  const servers = data.servers;
  return [...servers, "argument0", "argument1", "argument2"];
}
/** @param {NS} ns */
export async function main(ns) {
  const args = ns.args;
  ns.tprint(args[0], args[1], args[2]);
  const player = ns.getPlayer()
  const server = ns.getServer();
  const target = ns.args[0];
  const maxRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
  let servMaxMoney = ns.getServerMaxMoney(target);
  let servCurrentMoney = ns.getServerMoneyAvailable(target);
  let ramPerThread = ns.getScriptRam("/shared/weaken.js");
  let securityThresh = ns.getServerMinSecurityLevel(target);
  let currentSercurity = ns.getServerSecurityLevel(target);

  if (!ns.fileExists("/shared/grow.js")) {
    ns.scp([
        "/shared/weaken.js",
        "/shared/grow.js",
        "/shared/hack.js",
        "/shared/share.js"
      ], server);
  }

  while ((servCurrentMoney < servMaxMoney) || (currentSercurity > securityThresh)) {
    let threads = Math.floor((maxRam / ramPerThread) * 0.5);
    ns.run("/shared/grow.js", threads, target);
    ns.run("/shared/weaken.js", threads, target);
    servCurrentMoney = ns.getServerMoneyAvailable(target);
    currentSercurity = ns.getServerSecurityLevel(target);
  }
  while (true) {
    let nThreads = Math.floor(maxRam / ramPerThread);
    let hThread = Math.floor(nThreads / 13);
    let gThreads = Math.floor((nThreads / 13) * 2);
    let wThread = Math.floor((nThreads / 13) * 10);
    let hTime = ns.formulas.hacking.hackTime(target, player);
  }

}
function diff(num1, num2) {
  if (num1 > num2) {
    return num1 - num2
  } else {
    return num2 - num1
  }
}