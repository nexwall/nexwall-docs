---
title: 'KBA-0024: Threat Shield: where the lists come from and what they cost'
sidebar_position: 34
description: 'What the block lists are, how they are delivered and verified, and how much memory each category needs.'
---

# KBA-0024: Threat Shield: where the lists come from and what they cost

**Applies to.** Nexwall Firewall 26.2.1.

## What it is

Threat Shield blocks two kinds of things with lists that Nexwall builds every day on its own server from vetted open sources:

- **Domains** (DNS filtering): the firewall's own DNS server (dnsmasq, through adblock) answers "not found" for a listed domain and for all
  its subdomains. Categories: malware, phishing, ransomware, scams and fraud, crypto mining, DoH/VPN/Tor/proxy bypass, adult, gambling,
  piracy, drugs, advertising and tracking, and a larger extended malware set.
- **IP addresses** (IP blocking): banIP drops traffic to and from listed addresses. Categories: botnet command and control, known attackers.

There is no cloud DNS service involved: the lists are files on the firewall and DNS stays local. The lists are delivered through the license
service (trial or subscription), signed, and checked on the firewall before use. Without a license no Nexwall lists are provided.


## How it works

1. Every 30 minutes (random delay) `nexwall-threat-feeds sync` asks the license server for the signed catalog of the current bundle.
2. It verifies the signature, then downloads **only the categories that are switched on**, checking the size and SHA-256 of every file (compressed and plain).
3. adblock and banIP read the lists as local files (`file:///mnt/data/threat-feeds/<version>/dns-<category>.txt`). They are reloaded only when
   something changed, not on a timer.
4. If the license service is not answering, the lists on the firewall stay. If the license ends, the lists are taken away once.

First start: **all** categories are switched on (every address list and every domain category), but only where nothing was chosen yet and only when
the domain lists take at most a quarter of the installed memory (75 bytes per domain; the whole catalog is about 3.3 million domains, 250 MB, so a unit
with about 1 GiB or more qualifies). A smaller unit gets only the categories marked as default (malware, phishing, ransomware, scams, botnet C2, known
attackers). The setup wizard also switches the services on. The DNS Filtering and IP & Geo Blocking pages have an **Enable all** switch that drives the
Nexwall lists (the third-party lists of banIP are not touched). Choices made with earlier versions are carried over (adult, gambling, piracy, DoH/VPN bypass, malware, privacy lists).


## Memory and speed

DNS lists cost about **75 bytes per domain** in dnsmasq (measured: 1.8 million domains = 134 MB). Plan before switching on large categories:

| Category | Entries (2026-10) | About |
|---|---|---|
| Malware (core) | 195,000 | 15 MB |
| Phishing | 486,000 | 36 MB |
| Scams and fraud | 186,000 | 14 MB |
| Ransomware, crypto mining, drugs, bypass, piracy | 2,000 to 54,000 each | 0.2 to 4 MB |
| Gambling | 226,000 | 17 MB |
| Advertising and tracking | 408,000 | 31 MB |
| Adult | 953,000 | 71 MB |
| Malware (extended, includes the core one) | 735,000 | 55 MB |

The default set is about 870,000 domains (65 MB). Everything together is about 3.3 million domains (250 MB), 12% of a 2 GiB unit: the memory
warning of the DNS page (20% / 35% of the installed memory) tells when the switched-on lists are too many.
Reloading dnsmasq with a large list interrupts DNS for a few seconds (about 10 seconds with 1.8 million domains); that is why reloads happen only when the lists change (usually once a day).


## Geo-blocking and the memory warning

Country blocks (banIP `country` feed) come from the same signed bundle: `nexwall-threat-feeds status` lists `country_v4` and `country_v6`, and the files are under `/mnt/data/threat-feeds/<bundle>/geo/`. The data is registry allocation data, so a few addresses may sit in another country than their users. Without a license banIP keeps its own download.
In the DNS blocklist page, a warning appears when the switched-on lists need more than a fifth of the installed memory, and an error above a third; switch off large categories or add memory.
