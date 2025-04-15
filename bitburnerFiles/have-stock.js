const symbolMap = new Map([
  ["WDS", []],
  ["ECP", ["ecorp"]],
  ["MGCP", ["megacorp"]],
  ["BLD", ["blade"]],
  ["CLRK", ["clarkinc"]],
  ["OMTK", ["omnitek"]],
  ["FSIG", ["4sigma"]],
  ["KGI", ["kuai-gong"]],
  ["DCOMM", ["defcomm"]],
  ["VITA", ["vitalife"]],
  ["ICRS", ["icarus"]],
  ["UNV", ["univ-energy"]],
  ["AERO", ["aerocorp"]],
  ["SLRS", ["solaris"]],
  ["GPH", ["global-pharm"]],
  ["NVMD", ["nova-med"]],
  ["LXO", ["lexo-corp"]],
  ["RHOC", ["rho-construction"]],
  ["APHE", ["alpha-ent"]],
  ["SYSC", ["syscore"]],
  ["CTK", ["comptek"]],
  ["NTLK", ["netlink"]],
  ["OMGA", ["omega-net"]],
  ["JGN", ["joesguns"]],
  ["SGC", ["sigma-cosmetics"]],
  ["CTYS", ["catalyst"]],
  ["MDYN", ["microdyne"]],
  ["TITN", ["titan-labs"]],
  ["FLCM", ["fulcrumtech", "fulcrumassets"]],
  ["STM", ["stormtech"]],
  ["HLS", ["helios", "The-Cave"]],
  ["OMN", ["omnia"]],
  ["FNS", ["foodnstuff"]]
]);
function ownedStock(ns)
/** @param {NS} ns */
export async function main(ns) {
  let sym = symbolMap;
  // how to call a key
  // ns.tprint(sym.get("FNS"));
  // how to list all entries
  for (const x of sym.entries()) {
    ns.tprint(x)
  }

}