---
title: Advanced and Collective Protection (AI)
sidebar_position: 6
description: Warnings about devices that behave like infected ones, and the shared lists of the Nexwall firewalls.
---

# Advanced and Collective Protection (AI)

**Security Services > Advanced and Collective Protection (AI)** has two protections on one page. Both need the Advanced
Threat Protection module of your plan (it is included in the trial).

| Protection | What it does | Blocks? |
|---|---|---|
| **Advanced Protection** | Scores every device of your inner networks against a behaviour model that runs on this firewall and raises a warning, with the reason in words, when one acts like an infected machine | No. Warnings are advisory |
| **Collective Protection** | Uses lists of outside addresses and domain names that several Nexwall firewalls found behind attacks and that Nexwall reviewed, and, if you allow it, sends reports of the same kind | Yes, through IP & Geo Blocking and DNS Filtering, only for entries Nexwall approved |

At the top right of the page a badge for each protection shows its state as the firewall really has it, not only the
switch: **running** (green), **degraded** (amber: it works, but something is wrong, and the notice under the badge says
what), **not running** (red: switched on, but the service is down), or **disabled**.

## Advanced Protection

Every minute the firewall scores each device of the inner networks against the behaviour model. It looks at how regular
the connections are, how much data goes out, uncommon ports, how many new destinations the device contacts, and the DNS
names it asks (generated-looking names, failed lookups). No payload and no full web address is read.

A device that looks like an infected one appears as a warning in **Operation & Analytics > Threat Analytics** (layer
Advanced Protection) and in the list at the bottom of this page, with the reasons. The warning is advisory: nothing is
blocked by this protection.

Switch it off with the toggle and **Save**, then apply the changes. The scoring service stops; the other protections are
not affected. The monitor on the page shows the CPU and memory of the service, how many connections and DNS names it
reads per minute, how long a scoring cycle takes and how many devices it follows.

## Collective Protection

Collective Protection adds two lists to the Nexwall threat lists: **Collective Defense: addresses** (used by IP & Geo
Blocking) and **Collective Defense: domains** (used by DNS Filtering). They are switched on once, when your firewall first
sees them; after that your choice stands. An entry is published to all firewalls only after at least three different
firewalls reported it and Nexwall reviewed it, and it expires fourteen days after it was last reported. The services that
apply the lists have to be on; the page says so when one is off.

### Reports

With **Send reports to Nexwall** on (the default), the firewall sends a short report when Advanced Protection finds a
device acting like an infected one, so that the other Nexwall firewalls can be protected from the same attacker. A report
contains only:

- the **outside** address or domain name that the device contacted or asked for,
- the kind of evidence (regular check-ins or a generated-looking name) and a score,
- the model version and the day.

A report never contains data: no files, no traffic, no web addresses or pages, no user names, and no address or name of
your internal network or of the device. Private addresses and names under private top-level names (`.lan`, `.local`,
`.internal`, ...) are removed on the firewall and again on the server. You can switch reports off at any time; the
protection of the firewall keeps working and still receives the shared lists. Read the privacy notice linked next to the
switch.

## Updates

The card **Model and list updates** shows what the firewall has from the Nexwall server: the behaviour model (name,
version, when it was trained, the window it looks at and its thresholds), the bundle of threat lists with the number of
shared addresses and domains, and the last report sent. Everything is signed: the firewall checks the signature and the
hash before it uses a file, and keeps the previous model when a new one is refused.

- **Update now** looks for a new model and new lists at once and sends a pending report.
- **Automatic updates of the model**: choose how often the model is looked for (every 1, 3, 6, 12 or 24 hours). The
  shared lists follow the schedule of the Threat Shield lists (every 30 minutes). Reports are sent at most once an hour.

## When the badge is not green

| Notice | Meaning | What to do |
|---|---|---|
| The scoring service is not running or has stopped reporting | Advanced Protection is on but the service is down | Wait a minute; if it stays, check the system log (`logread | grep nexwall-atp`) and contact support |
| No behaviour model is installed yet | The model has not been downloaded | Use **Update now**; check that the firewall can reach the Nexwall license server |
| The DNS names cannot be read | The packet view of the inner networks could not be opened, so the DNS signals are missing | Check that the inner interfaces exist; the view is retried every ten minutes |
| The model has not been checked for a long time | The Nexwall server cannot be reached or the check fails | Check the Internet connection and the license state |
| The shared list is off, or not downloaded | The list is not in use yet | Use **Update now**; the lists are switched on by the first update |
| IP & Geo Blocking / DNS Filtering is switched off | The shared list is not applied by a service that is off | Switch the service on in Security Services |

## What it cannot do

The behaviour model was trained on laboratory scenarios and is **advisory**. It can miss an infected device and it can
warn about a harmless one, for example a program that connects at regular intervals. Treat a warning as a reason to look
at the device, not as a verdict. It does not replace IPS, the antivirus or the sandbox, and it cannot see traffic that
does not cross the firewall or encrypted DNS. The measured figures are in the release notes.

## Command line

```
nexwall-atp status      # state of the service as JSON
nexwall-atp update      # look for a new model now
nexwall-atp rollback    # go back to the previous model
nexwall-atp report      # send the pending report now
```
