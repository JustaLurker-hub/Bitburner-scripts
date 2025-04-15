/** @param {NS} ns */
export async function main(ns) {
  let moneyAvaliable = ns.getServerMoneyAvailable('home');
  let newMember = ns.gang.canRecruitMember();
  let gNames = [];

  while (true) {
    if (newMember) {
      let i = 0;
      let name = 'g-'
      let fName = ns.gang.recruitMember(name + i);
      i++
      fName.push(gNames)
    } else { await ns.sleep(5000) }
 
  }
}