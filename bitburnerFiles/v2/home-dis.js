/** @param {NS} ns */
export async function main(ns) {
  let ramAvaliable = 1;
  let threads = ns.args[0];
  let i = 0;
  let targets1 = ["hong-fang-tea", "sigma-cosmetics", "foodnstuff", "max-hardware", "iron-gym"
    , "neo-net", "joesguns", "nectar-net", "harakiri-sushi", "zer0"];
  let targets2 = ["crush-fitness", "omega-net", "silver-helix", "the-hub", "phantasy",
    "johnson-ortho", "rothman-uni", "netlink", "catalyst", "computek"]

  for (let server of targets1) {
    if (i < 10) {
      ns.run('homehack.js', 1, server, threads);
      i++;
    }
  }
  for (let server2 of targets2) {
    if (ns.fileExists("relaySMTP.exe", "home")) {
      if (i < 20) {
        ns.run('homehack.js', 1, server2, threads);
        i++;
      }
    }
  }
}