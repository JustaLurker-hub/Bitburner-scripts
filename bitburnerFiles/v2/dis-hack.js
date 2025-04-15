import { targetFinder } from '/target-finder.js'
/** @param {NS} ns */
export async function main(ns) {
  let targets = targetFinder(ns);
  let ramPerThread = ns.getScriptRam("hack-v1.js");

  let servers = [];
  for (let top10 of targets) {
    servers.push(top10.key);
  }
  let i = 0;
  if (i = 0) {
    for (let target of servers) {
      let ramAvailabe = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
      let thread = (Math.floor(ramAvailabe / ramPerThread) / 10);
      thread = Math.floor(thread);
      ns.exec('/v2/hack-v1.js', target);
      i++
    }
  }
  // ns.tprint(server);
}