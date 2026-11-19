import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'
import howtoItems from './howto-sidebar.json'

const category = (label: string, items: string[]) => ({
  type: 'category' as const,
  label,
  collapsed: true,
  items
})

const sidebars: SidebarsConfig = {
  manual: [
    category('Getting started', [
      'getting-started/overview',
      'getting-started/quick-start',
      'getting-started/web-interface',
      'getting-started/concepts'
    ]),
    category('Installation', [
      'installation/requirements-and-images',
      'installation/install-vm-and-hardware'
    ]),
    category('Operation & Analytics', [
      'operation-analytics/dashboard',
      'operation-analytics/threat-analytics',
      'operation-analytics/traffic-analytics',
      'operation-analytics/monitor-connections',
      'operation-analytics/performance',
      'operation-analytics/logs'
    ]),
    category('Policy', [
      'policy/firewall-rules',
      'policy/nat-port-forwarding',
      'policy/zones-policies',
      'policy/objects'
    ]),
    category('Security Services', [
      'security-services/application-control',
      'security-services/ips',
      'security-services/dns-filtering',
      'security-services/ip-geo-blocking',
      'security-services/advanced-collective-protection',
      'security-services/web-protection'
    ]),
    category('Network', [
      'network/interfaces-routing',
      'network/sd-wan',
      'network/dns-dhcp',
      'network/qos',
      'network/reverse-proxy'
    ]),
    category('VPN', [
      'vpn/remote-access-openvpn',
      'vpn/site-to-site-tunnels',
      'vpn/wireguard'
    ]),
    category('Access & Identity', ['access-identity/users-groups', 'access-identity/captive-portal']),
    category('Administration', [
      'administration/central-management',
      'administration/licensing-account',
      'infrastructure/backup-recovery',
      'infrastructure/system',
      'infrastructure/certificates',
      'infrastructure/high-availability'
    ])
  ],
  howto: howtoItems as any,
  help: [
    'help/troubleshooting',
    'help/kba-01-health-check',
    category('Access and internet', [
      'help/kba-02-web-interface',
      'help/kba-03-no-internet',
      'help/kba-04-site-unreachable',
      'help/kba-05-dns'
    ]),
    category('Features', [
      'help/kba-06-vpn',
      'help/kba-07-app-control',
      'help/kba-08-slow',
      'help/kba-09-charts-db',
      'help/kba-10-updates'
    ]),
    category('Controller and clients', [
      'help/controller-registration-troubleshooting',
      'help/teams-microsoft-365-signin',
      'help/windows-offline-icon-sign-in'
    ]),
    category('Command line in depth', [
      'help/kba-14-connectivity',
      'help/kba-15-dns-deep-dive',
      'help/kba-16-services',
      'help/kba-17-support-package'
    ]),
    category('Inspection and performance', [
      'help/kba-18-fast-path',
      'help/kba-19-inspection-settings',
      'help/kba-20-throughput-sizing',
      'help/kba-21-dpi-engine-stall',
      'help/kba-22-unknown-applications'
    ]),
    category('Threat Shield', [
      'help/kba-23-threat-shield-troubleshooting',
      'help/kba-24-threat-shield-lists'
    ]),
    category('Web certificate and licensing', [
      'help/kba-25-web-certificate',
      'help/kba-26-licensing'
    ]),
    category('Reference', [
      'help/command-line-and-faq',
      'help/cli-logs-and-debugging',
      'help/network-troubleshooting-tools',
      'help/service-and-log-reference',
      'help/understanding-uci',
      'help/install-from-image'
    ])
  ]
}

export default sidebars
