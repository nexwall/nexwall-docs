---
title: Web Protection
sidebar_position: 5
description: Block websites by category, inspect encrypted traffic where it matters, scan downloads for viruses and enforce SafeSearch and YouTube restrictions.
---

# Web Protection

**Security Services > Web Protection** controls which websites your users can reach and what they can download. It works in
three layers that you can use separately or together:

1. **Website categories** (blocking). Websites are sorted into 59 categories such as adult content, gambling, drugs, social
   networks, streaming, games, malware and phishing. A rule blocks the categories you choose for your networks or devices.
   No certificate is needed on the devices.
2. **Inspection of encrypted traffic.** For the categories you choose, the firewall opens the HTTPS connection through its web
   proxy, checks the certificate of the website and lets the antivirus scan the downloads. The devices must trust the
   firewall's inspection certificate.
3. **Antivirus.** ClamAV and YARA rules scan the files downloaded through inspected connections and plain web (HTTP) downloads of
   the same devices. An infected file is replaced by a block page and logged.

Web Protection is part of the Security Bundle (see [Licensing and account](../administration/licensing-account)). A unit in
its trial period can use it.

## Profiles: the quick way

In the setup wizard (and in **Application Control**) you can pick a profile. One choice creates the application rules **and** the
website rules:

| Profile | Websites blocked | Inspected and scanned | Family options |
|---|---|---|---|
| **Standard** | malware, phishing, hacking, cryptojacking, stalkerware, adult content, VPN and proxy anonymizers, encrypted DNS, piracy | file sharing, hosting, URL shorteners, webmail, forums | off |
| **School** | Standard plus gambling, drugs, violence, dating, social networks, streaming, games, entertainment | Standard plus AI services | SafeSearch on, YouTube Strict |
| **Restricted** | School plus shopping, sports, remote access, file sharing, advertising, cryptocurrency, URL shorteners | hosting, webmail, forums, AI services | SafeSearch on, YouTube Moderate |

The rules created by a profile are marked **From a profile** in the rule list. You can edit or delete them; choosing another
profile replaces only the rules that a profile created, never your own.

## Rules

Open **Security Services > Web Protection > Rules**.

- **Where it applies**: one or more zones (for example LAN) and, if you want, only some devices or networks (objects).
- **Block these categories**: the categories to block. Use **Allow only these categories** instead for an allow-list; the
  infrastructure categories (content delivery networks, software updates) stay open so the network keeps working.
- **TLS policy**: minimum TLS version, ciphers and certificate checks, and what happens when a check fails.
- **Inspect encrypted traffic**: for a rule with this option the categories you list are not blocked, they are **inspected**
  (decrypted, checked, scanned). Use a second rule to block other categories for the same devices.
- **Enforce SafeSearch** and **YouTube Restricted Mode**: see below.

Categories follow the catalog: a new website added to a category is covered without touching the rule. The catalog is
downloaded from the Nexwall license server and refreshed automatically; **Settings** shows its version and lets you update it
now. Only the categories your rules use are installed on the firewall.

:::note
Websites that are not in any category are allowed. To always allow or never inspect a site, add it as an **exception**.
:::

## Inspecting encrypted traffic

Each firewall creates its own certificate authority (CA) the first time inspection is needed. Install this certificate on every
device whose traffic is inspected, otherwise the browser shows a warning:

1. Open **Security Services > Web Protection > Inspection** and download the CA certificate.
2. Install it as a trusted root authority on the devices (Windows: certificate manager; macOS: Keychain Access; Linux and
   Android: the system certificate store or the browser's own store; companies distribute it with their device management).
3. Check one device by opening an inspected website: the certificate shown is issued by *Nexwall Firewall Inspection CA*.

Things worth knowing:

- The private key of the CA stays on the firewall and is not included in backups or images. **Rotate** the CA from the same
  page if you suspect it was exposed; the devices must then trust the new certificate.
- Sites that must never be opened (banking, government, health, education) are not in the inspected categories of the
  profiles. Add other sensitive sites as exceptions.
- If the web proxy stops answering, the firewall removes the redirect by itself and connections go straight to the internet
  (uninspected), and logs a message. When the proxy answers again the redirect returns.
- Browsers may try QUIC (UDP port 443). For inspected devices the firewall refuses it so the browser uses the inspected TLS
  connection (setting `block_quic`, on by default).
- Applications that pin their certificates (some banking and update clients) fail when inspected: add them as exceptions.
- Inspection uses CPU in proportion to the traffic it opens. Start with the categories you really need.

## Antivirus

Open **Security Services > Web Protection > Antivirus**.

- **Engines**: ClamAV (signatures from the ClamAV mirrors, updated several times a day) and YARA (rules from the Nexwall license
  server, refreshed weekly). Both scan every file; either one can stop it.
- **Storage**: the ClamAV signatures need about 300 MB and the engine about 1 GB of memory. The antivirus needs the data
  storage of the firewall and will not start without it. The first start downloads the signatures (a few minutes); the page
  shows their date and the state of each engine.
- **Maximum scan size**: larger files are not scanned. Choose whether they are **allowed** or **blocked**.
- **When the scanner is not available**: choose **fail open** (downloads continue) or **fail closed** (downloads are
  refused). If only one engine is down, the other one still decides and the page shows *degraded*.
- **Detections**: the last detections are listed with the client, the file size and the signature or rule that matched.

To test the antivirus safely download the EICAR test file (https://www.eicar.org/download-anti-malware-testfile/) from a
device that is covered by an inspecting rule: the download must be replaced by the block page.

## SafeSearch and YouTube Restricted Mode

A rule can force the safe modes of the search engines and YouTube for its devices:

- **Enforce SafeSearch**: Google (all country domains), Bing and DuckDuckGo return only filtered results.
- **YouTube Restricted Mode**: **Strict** hides most mature content (for children), **Moderate** hides less (for teenagers).

How it works: the firewall answers the names of these services with the address the providers publish for their safe modes, only
for the devices of the rule. Queries of those devices to **any** DNS server are redirected to it, so changing the DNS server on the
device does not help. DNS over HTTPS and TLS are blocked by the profiles. The options do not need the inspection certificate.

Limits: the options apply to devices, not to user accounts, there are no schedules or time quotas yet, and a child who can
install their own VPN or use a mobile network is outside the firewall.

## Logs

Blocked websites and antivirus detections appear in the **Log Viewer** (Application Control, Firewall traffic and System tabs;
the **Traffic and applications** tab shows what was used). The firewall keeps the hourly traffic reports for 35 days.

## Troubleshooting

| Symptom | Check |
|---|---|
| A blocked website still opens | The device is not in the rule's zones or objects; the website is in an exception; the category list is not installed yet (Settings shows the catalog state); the site uses a name that is not in any category. |
| Certificate warnings on inspected sites | The inspection CA is not installed on the device, or the device is not the one you think (check its address). |
| A site breaks only when inspected | It pins its certificate: add it as an exception. |
| The antivirus does not start | The data storage is missing (Storage page), the license does not include Antivirus / Sandbox, or the first signature download has not finished. |
| SafeSearch does not apply | The device is not in the rule's scope, the rule is disabled, or Web Protection is switched off (the banner at the top of the page says so). |
