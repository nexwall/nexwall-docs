---
title: Controller registration troubleshooting
sidebar_position: 3
description: Diagnose join and connection problems between a unit and a controller, on both sides, from the command line.
---

# Controller registration troubleshooting

This goes deeper than the [basic check](troubleshooting.md#the-unit-will-not-register-or-connect-to-the-controller) and
needs SSH access to the unit, and to the controller host. Use it when a unit will not join a controller, drops the
connection repeatedly, or connects but the controller cannot reach it.

## How registration works

1. On the controller, adding a unit generates a **join code**: a base64 string containing the controller's address, a
   registration token, and the new unit's ID. The controller also issues an OpenVPN client certificate for that ID, but
   the unit has not used it yet.
2. On the unit, entering the join code starts `ns-plug`, which calls the controller's registration endpoint with the
   token and the unit's details.
3. The controller checks the token and the certificate it issued, stores the unit's credentials, and returns the VPN
   configuration.
4. The unit brings up an OpenVPN tunnel to the controller. On connect, the controller assigns it a VPN address and
   creates a proxy route so its web interface and API are reachable through the controller.

A stall at any step narrows down where to look: no response to the join code is a unit-side or network problem; a
connected VPN with no proxy route is a controller-side problem.

## On the unit

### Check the current state

```bash
ubus call ns.plug status
```

`status` is one of `unregistered`, `pending` (registered but the tunnel is not up), or `connected`. `push_last_sent`
shows when metrics were last sent to the controller, `-1` if never.

### Registration commands

```bash
# register with a join code
echo '{"join_code":"<code>","tls_verify":true,"unit_name":"fw1.example.com","description":""}' | ubus call ns.plug register

# unregister and clear local state
ubus call ns.plug unregister

# restart the client without changing its configuration
ubus call ns.plug restart
```

The join code is just base64 JSON, so you can inspect one without registering:

```bash
echo '<code>' | base64 -d
# {"unit_id":"...","token":"...","fqdn":"controller.example.com"}
```

This catches the two most common mistakes: a code copied from the wrong controller, or one that is stale because the
unit was already added and re-added on the controller since it was generated.

### Service, configuration and logs

| What | Command |
|---|---|
| Restart the client | `/etc/init.d/ns-plug restart` |
| Current configuration | `uci show ns-plug` |
| Client logs | `logread \| grep -i ns-plug` |
| Generated OpenVPN config | `cat /usr/share/ns-plug/client.conf` (only exists after a successful registration) |
| Tunnel interface | `ip -4 addr show tun-nsplug` (only appears once the tunnel is up) |

`ns-plug` is supervised by `procd` and restarts on its own if it crashes, so a unit stuck in `pending` is usually
retrying quietly rather than stopped. `logread` shows each attempt and its result.

### Reading the exit behavior

`ns-plug` fails fast on missing configuration and gives up after five failed attempts to reach the controller:

| Exit code | Meaning |
|---|---|
| 1 | No controller address configured |
| 2 | No unit ID configured |
| 3 | No token configured |
| 4 | Controller returned `409` (this unit ID is already registered under a different account); local credentials are cleared |
| 5 | Controller unreachable after 5 attempts (10 seconds) |

Codes 1–3 mean the join code never got applied — repeat the registration step. Code 4 means the unit was removed and
re-added on the controller, or the join code was reused; remove the unit on the controller first, or use a fresh join
code. Code 5 is a network problem: confirm the unit can resolve and reach the controller's address on port 443, and
that its clock is correct (a wrong clock fails the TLS handshake).

## On the controller

### Find the logs

The API container logs each registration attempt to stderr, prefixed with `[RegisterUnit]` or `[AddUnit]`:

```bash
podman logs <api-container-name> 2>&1 | grep -i registerunit
# or, with docker:
docker logs <api-container-name> 2>&1 | grep -i registerunit
```

The OpenVPN server container's logs cover the tunnel itself (handshake and certificate errors), and the proxy
container's logs cover routing once a unit is connected.

### What the error messages mean

| Message | Cause | Fix |
|---|---|---|
| `registration token required` | The unit sent no token at all | Old or corrupted `ns-plug` build; re-register with a fresh join code |
| `invalid registration token` | The token in the join code does not match the controller's current one | The controller's registration token changed since the code was issued, or the code is from a different controller |
| `unit not allowed, no certificate found` | The unit ID in the request was never added on the controller | Add the unit on the controller to generate a new join code, and use that one |
| `unit subscription is required` | The controller requires subscriptions but the unit sent none | Check the unit's subscription status, or the controller's subscription requirement |
| `unit with subscription is not allowed` | The controller does not expect subscriptions but the unit sent one | The opposite mismatch of the row above |
| HTTP `409` (no message body) | A unit with this ID is already registered under a different username | Remove the existing unit on the controller before re-adding it |
| `cannot retrieve openvpn config: ...` / `cannot write credentials file` | The controller could not read its own PKI files or write to its credentials directory | Check permissions and that the volume holding the OpenVPN PKI and credentials directory is mounted and writable |

### Confirm the unit record

With an admin token:

```bash
curl -s -H "Authorization: Bearer <token>" https://<controller>/api/units/<unit_id>
```

`registered` and `vpn_connected_since` show whether the controller considers the unit registered and currently
connected. If `vpn_connected_since` never updates after the unit reports `connected` locally, the problem is on the
controller side of the tunnel, not the unit.

### Tunnel and proxy route

- The API container waits for the OpenVPN management socket at `/etc/openvpn/run/mgmt.sock` before it starts; if its
  logs show `Socket not found!`, the OpenVPN server was not up yet or the two containers do not share that volume.
- Once a unit connects, a route file appears at `/etc/openvpn/proxy/<unit_id>.yaml` inside the proxy's configuration
  directory. If the unit shows as connected but this file is missing, the connect hook did not finish — check that the
  reporting database is reachable, since the hook also updates it.
- Check the certificate has not expired: `openssl x509 -in /etc/openvpn/pki/issued/<unit_id>.crt -noout -enddate`.
  Certificates are renewed automatically with six months of validity left, but only while the controller is running to
  do it.

### Replay a registration manually

To tell apart a unit-side problem from a controller-side one, call the endpoint directly from the controller host with
the same fields `ns-plug` sends:

```bash
curl -s -H "Content-Type: application/json" -H "RegistrationToken: <token>" \
  https://<controller>/api/units/register -X POST \
  --data '{"unit_id":"<unit_id>","unit_name":"test","username":"test","password":"test","version":"","subscription_type":""}'
```

A response here that differs from what the unit sees means the difference is in what the unit sends or how it reaches
the controller, not in the controller's own logic.

## Related pages

- [Central management](../administration/central-management.md)
- [Logs](../operation-analytics/logs.md)
- [Command line and FAQ](command-line-and-faq.md)
