---
title: Command line and FAQ
sidebar_position: 2
description: Useful commands over SSH, where things live, and frequent questions.
---

# Command line and FAQ

## Reaching the command line

Use SSH with the `root` user, or the console of the virtual machine or the hardware. SSH settings are in
**Infrastructure > System**, in the SSH tab. Log in with a key if you disabled password login.

The system is OpenWrt based, so its tools are the ones of that ecosystem.

## The configuration

The configuration lives in plain text files under `/etc/config`, managed with the `uci` tool.

```bash
uci show network            # everything about the network
uci show firewall           # zones, rules, forwards
uci get system.@system[0].hostname
uci changes                 # what is pending
```

The web interface writes to the same files. Changes you make from the command line with `uci set` must be saved with
`uci commit <config>`, and the affected service must be reloaded.

## Everyday commands

| Goal | Command |
|---|---|
| Read the log | `logread`, and `logread -f` to follow it |
| Restart a service | `/etc/init.d/<service> restart` |
| List services | `ls /etc/init.d` |
| Interface addresses | `ip -4 addr`, `ip -6 addr` |
| Routes | `ip route` |
| Interface status | `ifstatus wan` and `ifstatus lan` |
| Firewall rules as loaded | `nft list ruleset` |
| Connection tracking | `conntrack -L` |
| Test the internet | `ping -c 3 1.1.1.1`, then `ping -c 3 example.com` |
| Version | `cat /etc/os-release` |
| Free disk and memory | `df -h`, `free -m` |

Restarting "a service" means the right one for what you are working on, not always the same thing. See
[Service and log command reference](service-and-log-reference.md) for which service backs each feature in the web
interface, and what to search its log for. Almost everything you can change also lives in a UCI configuration file, which is what makes the
web interface, the API and the command line always agree — see [What is UCI, and why it
matters](understanding-uci.md).

## Where things are

| What | Where |
|---|---|
| Configuration | `/etc/config/` |
| Startup scripts | `/etc/init.d/` |
| Certificates for the web server | managed from **Infrastructure > Certificates** |
| Traffic classification data | `/etc/netifyd/` |
| System log | in memory, read with `logread` |

## Frequently asked questions

**What is the default address and password?**
The LAN answers on `192.168.1.1`. The user is `root` and the password is `Nexwall,1234`. Change it on the first login.

**Can I run it on a virtual machine?**
Yes. Use UEFI firmware, give it at least two network adapters and 4 GB of memory. See
[Install on a virtual machine or hardware](../installation/install-vm-and-hardware.md).

**Why is my change not active?**
Most changes are staged. Use **Apply changes** in the banner. See
[Using the web interface](../getting-started/web-interface.md).

**I lost the changes I made before a reboot.**
Pending changes that were not applied are lost when the unit restarts. Applied changes are kept.

**Does it work without a subscription?**
Yes. The firewall, the VPNs, the intrusion prevention system, the free Threat Shield lists and the base application
catalog work without one. A subscription adds the features listed in
[Licensing and account](../administration/licensing-account.md).

**Where is my data sent?**
Nowhere unless you turn on a feature that needs it. Traffic Analytics sends traffic metadata when you enable it, and a
unit connected to a controller sends its logs and metrics to that controller.

**How do I move a configuration to another unit?**
Take a backup and restore it on the new unit. See [Backup and recovery](../infrastructure/backup-recovery.md).

**How do I connect many sites?**
Use [site-to-site tunnels](../vpn/site-to-site-tunnels.md) or [WireGuard](../vpn/wireguard.md), and manage the units with
[central management](../administration/central-management.md).

**How do I get to a state I know?**
Use the **Factory reset** tab, and restore a backup afterwards.
