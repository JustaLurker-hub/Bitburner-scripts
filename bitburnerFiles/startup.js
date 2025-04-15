/**
 * @param {AutocompleteData} data - context about the game, useful when autocompleting
 * @param {string[]} args - current arguments, not including "run script.js"
 * @returns {string[]} - the array of possible autocomplete options
 */
export function autocomplete(data, args) {
  const servers = data.servers;
  return [...servers];
}
/** @param {NS} ns */
export async function main(ns) {
  // ns.disableLog("ALL");

  let wait = 10000;
  let test;
  let player = ns.getPlayer();
  let hackLvl = player.skills.hacking;
  let strLvl = player.skills.strength;
  let defLvl = player.skills.defense;
  let dexLvl = player.skills.dexterity;
  let agiLvl = player.skills.agility;
  let playerStats = { hac: hackLvl, str: strLvl, def: defLvl, dex: dexLvl, agi: agiLvl };
  let foucus = () => !ns.singularity.getOwnedAugmentations().includes("Neuroreceptor Management Implant");

  // ns.tprint(currentAct.crimeType);

  //First prog run
  // ns.run("go.js", 1);
  // ns.run("stats.js", 1);

  do {
    var goto = foucus();
    ns.singularity.commitCrime("Mug", goto);
    let currentAct = ns.singularity.getCurrentWork();

    if (strLvl && defLvl && dexLvl && agiLvl < 80) {
      if (currentAct.crimeType !== "Mug") {continue}
        ns.singularity.commitCrime("Mug", goto);
      await ns.sleep(wait);
    }
    if (strLvl && defLvl && dexLvl && agiLvl > 80) {
      if (currentAct.crimeType !== "Homicide") {continue}
        ns.singularity.commitCrime("Homicide", goto);
      await ns.sleep(wait);
    }
    await ns.sleep(wait);
  }
  while (strLvl && defLvl && dexLvl && agiLvl < 120);

  //     ns.exec('/v2/deployer.js', 'home', 1, servers);
  //     ns.exec('stats.js', 'home', 1);
  //     ns.exec('go.js');
  //     ns.exec('stockmaster.js');

}