---
title: 'How to set DNS servers and local DNS names'
sidebar_position: 20
description: 'Choose the upstream DNS servers and create names that resolve to local addresses.'
---

# How to set DNS servers and local DNS names

The firewall answers DNS for the LAN. It forwards unknown names to upstream servers and answers local names itself.

**Where:** **Network** > **DNS & DHCP**

## Steps

1. Open the page and choose the tab **DNS**.
2. Under **DNS forwarding servers** click **Add DNS server** and enter the address of each upstream server. Leave it empty to use the servers of the WAN.
3. Set the **DNS domain** (local suffix) if you use one. Keep **Rebind protection** on and add the domains that legitimately resolve to private addresses under **Domain whitelist**.
4. Save. Now open the tab **DNS records** and click **Add DNS record**.
5. Fill the **Hostname** (for example `nas.empresa.local`) and the **IP address**. Use **Wildcard DNS record** to answer for every subdomain. Save.

## Check that it worked

- From a client, `nslookup nas.empresa.local 192.168.1.1` returns the address.

## If it does not work

- Names do not resolve: [KBA-0005](../../help/kba-05-dns.md) and [KBA-0015](../../help/kba-15-dns-deep-dive.md).
- A public name must resolve to a private address for internal users only: create the record here.

## Related guides

- [How to enable and tune the DHCP server](dhcp-server.md)
- [How to block malicious domains (DNS Filtering)](../security/dns-filtering.md)
