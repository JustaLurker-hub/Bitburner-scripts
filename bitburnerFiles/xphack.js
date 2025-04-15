/** @param {NS} ns */
export async function main(ns) {
  let tartget = ns.args[0];
  let servers = ns.getServer();
  const server = JSON.stringify(servers);
  let duration = 0;
  let ramAvaliable = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
  let ramPerThread = 0.16;
  let threads = Math.floor(ramAvaliable / ramPerThread);
  let servSercurity = ns.getServerSecurityLevel(tartget);
  let minSercurity = ns.getServerMinSecurityLevel(tartget);
  // let manipulateStock = false;
  // let sleepDuration = ns.getWeakenTime(tartget)//start_time - Date.now();
  // let additionalMsec = "";
  // const hgwOptions = {
  //   stock: manipulateStock,
  //   additionalMsec: sleepDuration
  // }

const files = [
  "/shared/weaken.js",
  "/shared/grow.js",
  "/shared/hack.js",
  "/shared/share.js"
];
if (!ns.fileExists(files, tartget)) {
  ns.scp(files, tartget);
  }
  do {
    await ns.weaken(tartget, threads);
  } while(minSercurity > servSercurity && ramAvaliable > threads)
}

