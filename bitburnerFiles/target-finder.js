/** @param {NS} ns */
export function targetFinder(ns) {

  let servers = [];

  let serversToScan = ns.scan("home");
  while (serversToScan.length > 0) {
    let server = serversToScan.shift();
    if (!servers.includes(server) && server !== "home") {
      servers.push(server);
      serversToScan = serversToScan.concat(ns.scan(server));
    }
  }
  const target = new Map();
  for (let server of servers) {
    let serverMoney = ns.getServerMaxMoney(server);
    let sHack = ns.getServerRequiredHackingLevel(server);
    let pHack = ns.getHackingLevel();
    let hackable = pHack >= sHack;

    if (hackable) {
      target.set(server, serverMoney);
    }
  }
  const targetSort = new Map([...target.entries()].sort((a, b) => b[1] - a[1]));
  const targetArray = [...targetSort].map(([key, value]) => ({ key, value }));
  let i = 0;
  const top10 = [];
  while (i < 10) {
    let item = targetArray.shift();
    top10.push(item);
    i++;
    let targetList = item.key;
    ns.tprint(targetList);
    // return targetList;
  }
}
export async function main(ns) {
  targetFinder(ns);
}