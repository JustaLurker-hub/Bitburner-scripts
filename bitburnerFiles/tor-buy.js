/** @param {NS} ns */
export async function main(ns) {
   const interval = 2000;

    var keepRunning = ns.args.length > 0 && ns.args[0] == "-c";
    if (!keepRunning)
        ns.print(`tor-manager will run once. Run with argument "-c" to run continuously.`)

    let hasTor = () => ns.scan("home").includes("darkweb");
    if (hasTor())
        return ns.print('Player already has Tor');
    do {
        if (hasTor()) {
            ns.toast(`Purchased the Tor router!`, 'success');
            break;
        }
        ns.singularity.purchaseTor();
        if (keepRunning)
            await ns.sleep(interval);
    }
    while (keepRunning);
}
