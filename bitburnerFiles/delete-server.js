/** @param {NS} ns */
export async function main(ns) {
  let name = ns.args[0];
  ns.killall(name);
  ns.deleteServer(name);
}