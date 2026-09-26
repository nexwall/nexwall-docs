---
title: What is UCI, and why it matters
sidebar_position: 5
description: The configuration system behind the web interface, the API and the command line, and how to use it for management and troubleshooting.
---

# What is UCI, and why it matters

UCI, the Unified Configuration Interface, is the configuration system OpenWrt introduced so that every service on the
system — networking, the firewall, DHCP, VPNs, and every Nexwall-specific feature — is configured the same way,
instead of each daemon inventing its own file format. Nexwall Firewall is built on OpenWrt and keeps this system, and
almost everything the web interface does ends up as a change to a UCI file. Knowing how it works makes the GUI's
behavior predictable, and gives you a second way to look at and fix a unit when the GUI is not enough.

## What it brings

- **One syntax for everything.** Learn it once and you can read or edit the configuration of any service, not just
  the ones you already know.
- **One source of truth.** The web interface, the API and the `uci` command line tool all read and write the exact
  same files. Nothing is cached or duplicated between them — see [Why the interfaces never
  disagree](#why-the-web-interface-the-api-and-the-cli-never-disagree) below.
- **Staged changes.** Edits made with the `uci` tool are held separately from the active configuration until you
  commit them, so a half-finished change cannot leave a file in a broken state.
- **Structure a text editor can't give you.** Config files are organized into typed sections with named options and
  lists, which is what lets tools generate, validate and diff configuration instead of just concatenating text.
- **A natural backup format.** Because configuration is just a set of small text files under one directory, backing
  it up, restoring it, or diffing two units against each other is simple. See [Backup and
  recovery](../infrastructure/backup-recovery.md).

## The data model

A UCI configuration file is called a **package**, and it lives at `/etc/config/<package>` — for example
`/etc/config/network`, `/etc/config/firewall`, `/etc/config/dpi`. Inside a package:

- A **section** groups related options and has a **type** (for example a `zone` section in the firewall package, or
  an `interface` section in the network package). A section can be **named** (`config interface 'lan'`) or
  **anonymous**, in which case UCI gives it an internal name like `@interface[0]` based on its position.
- An **option** holds a single value: `option proto 'static'`.
- A **list** holds several values for the same option name: multiple `list network 'lan'` lines under a firewall
  zone, for instance.

A short example, part of `/etc/config/network`:

```
config interface 'lan'
	option device 'br-lan'
	option proto 'static'
	option ipaddr '192.168.1.1'
	option netmask '255.255.255.0'
```

## Using it from the command line

| Task | Command |
|---|---|
| Show everything in a package | `uci show network` |
| Show one option | `uci get network.lan.ipaddr` |
| Change one option | `uci set network.lan.ipaddr='192.168.2.1'` |
| Add a value to a list | `uci add_list firewall.@zone[0].network='guest'` |
| Remove a value from a list | `uci del_list firewall.@zone[0].network='guest'` |
| Create a new anonymous section | `uci add firewall rule` |
| Give a section a name | `uci rename network.@interface[-1]='guest'` |
| Remove a section or option | `uci delete network.guest` |
| See what you have not committed yet | `uci changes` |
| Write staged changes to disk | `uci commit network` |
| Discard staged changes | `uci revert network` |
| Export a whole package as text | `uci export network` |
| Dump the whole config for a support request | `uci show` (no package name, everything) |

## Staged versus committed changes

`uci set`, `uci add`, `uci delete` and the `_list` variants do not touch `/etc/config/` right away. They write to a
pending changes area first, which is why `uci changes` can show you what is about to happen before it does. Only
`uci commit` writes them into the actual file; `uci revert` throws them away instead.

This distinction only applies to changes made through the `uci` tool. If you edit `/etc/config/network` directly
with a text editor, that change is already in the file — there is no separate commit step, and no pending state to
revert.

## After a change: reload the right service

Committing a UCI change updates the file, but the service that reads it usually keeps running with what it already
loaded until it is told to reload. Which service to restart, and how, is covered in [Service and log command
reference](service-and-log-reference.md) — the same table applies whether the change came from the web interface,
the API, or `uci` directly.

## Why the web interface, the API and the CLI never disagree

Nexwall's web interface and API are not a layer sitting on top of a database that happens to mirror the
configuration — they read and write the UCI files directly, through the same `python3-uci` bindings the `uci`
command line tool itself is built on. There is only one copy of the configuration on disk. A value you set with
`uci set` shows up in the web interface immediately after the page reloads, and a change made in the web interface
is visible to `uci get` immediately, with no synchronization step in between and nothing to get out of sync.

## Troubleshooting with UCI

- **A change in the GUI does not seem to have taken effect.** Check the option directly with `uci get`, and check
  `uci changes` for that package — a change made through the API can be staged without being committed if a request
  was interrupted partway through.
- **A feature behaves differently than the GUI shows.** Compare `uci show <package>` against what the page
  displays. If they already disagree at this level, the problem is in how the value is being read or applied, not
  in the web interface's rendering of it.
- **You need to hand someone your exact configuration for support**, without handing over a full backup: `uci show`
  dumps everything, `uci show <package>` dumps one service. Redact secrets (PSKs, passwords) before sharing either.
- **You changed something and a service will not start.** A hand-edited config file with a typo is a common cause.
  `uci show <package>` fails loudly on a malformed file, which is often faster than reading the service's own error
  output first.
- **You want to know what a backup actually contains.** A Nexwall backup is built with the standard OpenWrt
  `sysupgrade -b`, which always includes everything under `/etc/config/` — so restoring a backup is, at its core,
  putting back a known set of UCI files. See [Backup and recovery](../infrastructure/backup-recovery.md).

## Editing UCI directly, safely

Reach for a text editor on `/etc/config/<package>` when the web interface itself is unreachable, or when you need to
fix something the GUI has no control for. A few precautions:

- Take a backup first — see [Backup and recovery](../infrastructure/backup-recovery.md).
- After saving, run `uci show <package>` before restarting anything. It parses the file and will fail immediately on
  a syntax error, which is a much cheaper mistake to catch than finding out from a service that will not start.
- Restart only the service that reads that package — see [Service and log command
  reference](service-and-log-reference.md) — rather than rebooting the whole unit.
- Be especially careful with `/etc/config/network`: a mistake there can cut off the interface you are connected
  through. Keep a console session available (not only SSH over the network you are about to change) until you have
  confirmed the new configuration works.

## Related pages

- [Command line and FAQ](command-line-and-faq.md)
- [Service and log command reference](service-and-log-reference.md)
- [Backup and recovery](../infrastructure/backup-recovery.md)
- [System](../infrastructure/system.md)
