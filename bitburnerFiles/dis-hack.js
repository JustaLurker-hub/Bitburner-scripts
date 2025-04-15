/** @param {NS} ns */
export async function main(ns) {
    let servers;

    servers = scanAll(ns);
ns.tprint(servers)

}
function scanAll(ns, host, servers) {
    let hosts = ns.scan(host);
    for (let i = 0; i < hosts.length; i++) {
        if (!servers.has(hosts[i])) {
            servers.add(hosts[i]);
            scanAll(ns, hosts[i], servers);
        }
    }
}
async function scanAndNuke(ns) {
    let servers = new Set(["home"]);
    scanAll(ns, "home", servers);
    let accessibleServers = new Set();
    for (let server of servers) {
        if (await ns.hasRootAccess(server)) {
            accessibleServers.add(server)
        } else {
            let portOpened = 0;
            if (await ns.fileExists("BruteSSH.exe")) {
                await ns.brutessh(server);
                portOpened++;
            }
            if (await ns.fileExists("FTPCrack.exe")) {
                await ns.ftpcrack(server);
                portOpened++;
            }
            if (await ns.fileExists("HTTPWorm.exe")) {
                await ns.httpworm(server);
                portOpened++;
            }
            if (await ns.fileExists("relaySMTP.exe")) {
                await ns.relaysmtp(server);
                portOpened++;
            }
            if (await ns.fileExists("SQLInject.exe")) {
                await ns.sqlinject(server);
                portOpened++;
            }
            if (await ns.getServerNumPortsRequired(server) <= portOpened) {
                await ns.nuke(server);
                accessibleServers.add(server);
            }
        }
    }
    return accessibleServers;
}
