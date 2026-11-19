import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'

const t = (id: string, message: string) => translate({ id, message })

const cards = [
  { key: 'start', to: '/docs/getting-started/overview', title: 'Getting started', text: 'What Nexwall Firewall is, how the web interface is organized and how to do the first configuration.' },
  { key: 'install', to: '/docs/installation/requirements-and-images', title: 'Installation', text: 'Requirements, the installer ISO, and how to install it on hardware or on a virtual machine.' },
  { key: 'operation', to: '/docs/operation-analytics/dashboard', title: 'Operation & Analytics', text: 'Dashboard, live traffic, connections, performance charts and logs.' },
  { key: 'policy', to: '/docs/policy/firewall-rules', title: 'Policy', text: 'Firewall rules, NAT, port forwarding, zones and reusable objects.' },
  { key: 'security', to: '/docs/security-services/application-control', title: 'Security Services', text: 'Application control, intrusion prevention, DNS filtering and IP or country blocking.' },
  { key: 'network', to: '/docs/network/interfaces-routing', title: 'Network', text: 'Interfaces, routing, SD-WAN, DNS and DHCP, QoS and the reverse proxy.' },
  { key: 'vpn', to: '/docs/vpn/remote-access-openvpn', title: 'VPN', text: 'Remote access, site-to-site tunnels with OpenVPN and IPsec, and WireGuard.' },
  { key: 'identity', to: '/docs/access-identity/users-groups', title: 'Access & Identity', text: 'User databases and the captive portal for guest networks.' },
  { key: 'administration', to: '/docs/administration/central-management', title: 'Administration', text: 'Central management, licensing and your account, backup and recovery, system settings and updates, certificates and high availability.' },
  { key: 'help', to: '/docs/help/troubleshooting', title: 'Help', text: 'Troubleshooting by symptom, command line reference and frequently asked questions.' }
]

const slides = [
  { key: 'dashboard', captionId: 'home.slide.fw.dashboard', caption: 'Your whole firewall on one dashboard' },
  { key: 'traffic-analytics', captionId: 'home.slide.fw.traffic-analytics', caption: 'Who uses the network, when and for what' },
  { key: 'connections', captionId: 'home.slide.fw.connections', caption: 'Live connection tracking' },
  { key: 'firewall-rules', captionId: 'home.slide.fw.firewall-rules', caption: 'Firewall rules that read like plain language' },
  { key: 'zones-policies', captionId: 'home.slide.fw.zones-policies', caption: 'Zone-based policy, by default' },
  { key: 'app-control', captionId: 'home.slide.fw.app-control', caption: 'Control applications and categories' },
  { key: 'web-protection', captionId: 'home.slide.fw.web-protection', caption: 'Web protection by category, with inspection where it matters' },
  { key: 'ips', captionId: 'home.slide.fw.ips', caption: 'Intrusion prevention with live engine health' },
  { key: 'interfaces', captionId: 'home.slide.fw.interfaces', caption: 'LAN, WAN and VPN at a glance' },
  { key: 'performance', captionId: 'home.slide.fw.performance', caption: 'Live performance of the whole unit' },
  { key: 'routing', captionId: 'home.slide.fw.routing', caption: 'Routes and gateways, clear and editable' },
  { key: 'dns-dhcp', captionId: 'home.slide.fw.dns-dhcp', caption: 'DNS and DHCP for every network' },
  { key: 'dns-filtering', captionId: 'home.slide.fw.dns-filtering', caption: 'DNS filtering by category' },
  { key: 'objects', captionId: 'home.slide.fw.objects', caption: 'Reusable objects for rules and policies' },
  { key: 'ip-geo', captionId: 'home.slide.fw.ip-geo', caption: 'Block IPs and whole countries' },
  { key: 'atp', captionId: 'home.slide.fw.atp', caption: 'Advanced threat protection with collective intelligence' },
  { key: 'sd-wan', captionId: 'home.slide.fw.sd-wan', caption: 'SD-WAN with several internet links' },
  { key: 'qos', captionId: 'home.slide.fw.qos', caption: 'Traffic priority with QoS' },
  { key: 'reverse-proxy', captionId: 'home.slide.fw.reverse-proxy', caption: 'Publish internal sites with the reverse proxy' },
  { key: 'wireguard', captionId: 'home.slide.fw.wireguard', caption: 'WireGuard tunnels, built in' },
  { key: 'captive-portal', captionId: 'home.slide.fw.captive-portal', caption: 'Captive portal for guest networks' },
  { key: 'central-management', captionId: 'home.slide.fw.central-management', caption: 'Central management from the cloud controller' },
  { key: 'licensing', captionId: 'home.slide.fw.licensing', caption: 'Licensing and subscription at a glance' },
  { key: 'backup', captionId: 'home.slide.fw.backup', caption: 'Backup and restore in one page' },
  { key: 'certificates', captionId: 'home.slide.fw.certificates', caption: 'Certificates, ready to use' },
  { key: 'remote-access', captionId: 'home.slide.fw.remote-access', caption: 'Remote access VPN, built in' }
]

const AUTO_ADVANCE_MS = 5000

function HeroSlider(): ReactNode {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reducedMotionRef.current) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const goTo = (next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.sliderFrame}>
        {slides.map((slide, i) => (
          <img
            key={slide.key}
            className={styles.sliderImage}
            data-active={i === index}
            src={`/img/screenshots/fw/${locale}/${slide.key}.png`}
            loading={i === 0 ? 'eager' : 'lazy'}
            alt={t(slide.captionId, slide.caption)}
            aria-hidden={i === index ? undefined : true}
          />
        ))}
        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.sliderArrowPrev}`}
          onClick={() => goTo(index - 1)}
          aria-label={t('home.slide.prev', 'Previous screenshot')}
        >
          ‹
        </button>
        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.sliderArrowNext}`}
          onClick={() => goTo(index + 1)}
          aria-label={t('home.slide.next', 'Next screenshot')}
        >
          ›
        </button>
        <div className={styles.sliderCaption}>{t(slides[index].captionId, slides[index].caption)}</div>
      </div>
      <div className={styles.sliderDots}>
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            className={styles.sliderDot}
            data-active={i === index}
            onClick={() => goTo(i)}
            aria-label={t('home.slide.goTo', 'Show screenshot {n}').replace('{n}', String(i + 1))}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={t('home.title', 'Nexwall Firewall Documentation')}
      description="Administration guide for Nexwall Firewall"
    >
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('home.title', 'Nexwall Firewall Documentation')}</h1>
        <p className={styles.heroSubtitle}>
          {t('home.subtitle', 'Everything you need to install, configure and operate Nexwall Firewall, from the first boot to managing many sites.')}
        </p>
        <div className={styles.buttons}>
          <Link className="button button--lg button--secondary" to="/docs/getting-started/overview">
            {t('home.start', 'Get started')}
          </Link>
          <Link className="button button--lg button--outline button--secondary" to="/docs/installation/requirements-and-images">
            {t('home.install', 'Install')}
          </Link>
        </div>
      </header>
      <main className="container">
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.key} className={styles.card} to={card.to}>
              <h2 className={styles.cardTitle}>{t(`home.card.${card.key}.title`, card.title)}</h2>
              <p className={styles.cardText}>{t(`home.card.${card.key}.text`, card.text)}</p>
            </Link>
          ))}
        </div>
        <HeroSlider />
      </main>
    </Layout>
  )
}
