/** @param {NS} ns */
export async function main(ns) {
ns.write("/shared/respawn.txt", ns.args[0].toString(), "w");
}