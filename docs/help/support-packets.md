---
title: "Support Packets: diagnostics run from the controller"
sidebar_position: 25
description: What the Support Packets are, what they can and cannot do on the firewall, and how to run them from the Support screen of the cloud controller.
---

# Support Packets: diagnostics run from the controller

**What it is.** A Support Packet is a fixed, documented diagnostic that the firewall carries inside the image. The cloud controller can ask the firewall to run one of them and bring the result back, redacted and zipped, to the support ticket. It is the same information that the command-line articles of this section collect by hand (for example [KBA-0001](kba-01-health-check) and [KBA-0017](kba-17-support-package)), without opening a terminal.

**Applies to.** Nexwall Firewall 26.2.2 or later, managed by the Nexwall Cloud Controller. Earlier versions show "this firewall version does not support remote diagnostics".

## What a packet can and cannot do

- There are 26 packets, in groups: health, connectivity, DNS, services and logs, inspection and performance, Threat Shield, licence and certificate, and packet traces. The full list, with the inputs and the article behind each one, is published at [support.nexwall.com.br](https://support.nexwall.com.br/en/#packets), on the **Support Packets** tab.
- A packet only reads. The packet traces (class R1) watch matching traffic for a few seconds and stop on their own. Nothing changes the configuration.
- The firewall runs only the packets installed with the image. It accepts a packet name and the inputs listed for that packet (an address, a name, a port, a number of lines); anything else is refused. It never runs a free command line.
- Every run has a time limit, an output limit, and only one packet runs at a time.
- Passwords, keys and tokens are removed from the result before it leaves the controller.

On the firewall the packets are read-only files in `/usr/share/nexwall/support-packets` (one `.sh` and one `.json` per packet). You can read them there, and `ubus call ns.support list` shows which ones are installed.

## Run a packet from the controller

1. Open **Support** in the controller menu and select the firewall.
2. Under **Select Support Packet**, choose a packet. Its documentation appears in the middle panel: what it checks, the inputs, the limits and the article to read.
3. Fill in the inputs, tick the confirmation box, and select **Run**. The button stays disabled until the box is ticked.
4. Read the result in the middle panel. **Download** (top right of the panel) saves the results of the session as one zip file.
5. To get help, attach the zip file to your ticket in the chat panel, by pasting or by choosing a file.

## When to run which packet

| Symptom | Packets, in this order |
|---|---|
| You do not know where to start | `health-check`, then `links-routes` |
| No internet or slow | `links-routes`, `ping`, `dns-resolve`, `path-mtu`, `throughput` |
| A site or application is blocked | `packet-1` (who dropped it), then `packet-2` or `packet-3`, `dpi-unknown`, `threat-shield` |
| Connections drop or stall | `dpi-stall`, `conntrack`, `fastpath-state`, `path-mtu` |
| Names do not resolve | `dns-resolve`, `dns-config`, `dns-trace` |
| A port or service is unreachable | `port-test`, `https-check`, `listening`, `traceroute` |
| Web interface or certificate | `web-cert`, `services-state`, `service-detail` |
| Licence | `license-state` |
| The team asks for a full report | `support-package` |

For the packet traces, start the packet and then repeat the problem (open the site, ping from the client) while it runs.

## Related articles

[KBA-0001](kba-01-health-check), [KBA-0014](kba-14-connectivity), [KBA-0016](kba-16-services), [KBA-0017](kba-17-support-package).
