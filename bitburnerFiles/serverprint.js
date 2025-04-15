import { scanAllServers } from './helpers.js'
/** @param {NS} ns */
export async function main(ns) {
ns.tprint(scanAllServers(ns))
}