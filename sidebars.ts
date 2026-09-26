import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

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
      'operation-analytics/monitor-connections',
      'operation-analytics/traffic-analytics',
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
      'security-services/ip-geo-blocking'
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
    category('Infrastructure', [
      'infrastructure/backup-recovery',
      'infrastructure/system',
      'infrastructure/certificates',
      'infrastructure/high-availability'
    ]),
    category('Administration', ['administration/central-management', 'administration/licensing-account'])
  ],
  help: [
    'help/troubleshooting',
    'help/command-line-and-faq',
    'help/controller-registration-troubleshooting',
    'help/service-and-log-reference',
    'help/understanding-uci'
  ]
}

export default sidebars
