/** @param {NS} ns */
export async function main(ns) {

  let servers = ns.getPurchasedServers();
  let ram = 8;

  while (true) {
    for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
      let name = "pserv-" + i;
      while (ns.getPurchasedServerCost(ram) > ns.getServerMoneyAvailable("home")) {
        await ns.sleep(30000);
      }
      if (servers.includes(name)) {
        if (ns.getServerMaxRam(name) < ram) {
          ns.killall(name);
          ns.deleteServer(name);
        } else {
          continue;
        }
      }
      ns.purchaseServer(name, ram);
      ns.scp('new-early-hack.js', name, 'home');
      ns.exec('new-early-hack.js', name, 2, ns.args[0]);
    }

    ram *= 2;
    servers = ns.getPurchasedServers();
    await ns.sleep(50000);
  }
}