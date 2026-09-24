import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import styles from './index.module.css'

const t = (id: string, message: string) => translate({ id, message })

const cards = [
  { key: 'start', to: '/docs/getting-started/overview', title: 'Getting started', text: 'What Nexwall Firewall is, how the web interface is organized and how to do the first configuration.' },
  { key: 'install', to: '/docs/installation/requirements-and-images', title: 'Installation', text: 'Requirements, the disk image, and how to run it on hardware or on a virtual machine.' },
  { key: 'operation', to: '/docs/operation-analytics/dashboard', title: 'Operation & Analytics', text: 'Dashboard, live traffic, connections, performance charts and logs.' },
  { key: 'policy', to: '/docs/policy/firewall-rules', title: 'Policy', text: 'Firewall rules, NAT, port forwarding, zones and reusable objects.' },
  { key: 'security', to: '/docs/security-services/application-control', title: 'Security Services', text: 'Application control, intrusion prevention, DNS filtering and IP or country blocking.' },
  { key: 'network', to: '/docs/network/interfaces-routing', title: 'Network', text: 'Interfaces, routing, SD-WAN, DNS and DHCP, QoS and the reverse proxy.' },
  { key: 'vpn', to: '/docs/vpn/remote-access-openvpn', title: 'VPN', text: 'Remote access, site-to-site tunnels with OpenVPN and IPsec, and WireGuard.' },
  { key: 'identity', to: '/docs/access-identity/users-groups', title: 'Access & Identity', text: 'User databases and the captive portal for guest networks.' },
  { key: 'infrastructure', to: '/docs/infrastructure/backup-recovery', title: 'Infrastructure', text: 'Backup and recovery, system settings and updates, certificates and high availability.' },
  { key: 'administration', to: '/docs/administration/central-management', title: 'Administration', text: 'Central management of many firewalls, licensing and your account.' },
  { key: 'help', to: '/docs/help/troubleshooting', title: 'Help', text: 'Troubleshooting by symptom, command line reference and frequently asked questions.' }
]

const slides = [
  { key: 'dashboard', src: '/img/screenshots/dashboard-overview.png', captionId: 'home.slide.dashboard', caption: 'Dashboard' },
  { key: 'monitoring', src: '/img/screenshots/dashboard-overview-content.png', captionId: 'home.slide.monitoring', caption: 'Live system status' },
  { key: 'connections', src: '/img/screenshots/operation-connections-content.png', captionId: 'home.slide.connections', caption: 'Connections table' },
  { key: 'policy', src: '/img/screenshots/policy-zones.png', captionId: 'home.slide.policy', caption: 'Zones and policies' },
  { key: 'ipsec', src: '/img/screenshots/vpn-ipsec-site-to-site-content.png', captionId: 'home.slide.ipsec', caption: 'IPsec site-to-site tunnels' },
  { key: 'openvpn', src: '/img/screenshots/vpn-remote-access-content.png', captionId: 'home.slide.openvpn', caption: 'Remote access with OpenVPN' },
  { key: 'identity', src: '/img/screenshots/access-users-ad.png', captionId: 'home.slide.identity', caption: 'Active Directory users' }
]

const AUTO_ADVANCE_MS = 5000

function HeroSlider(): ReactNode {
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
            src={slide.src}
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
        <HeroSlider />
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
      </main>
    </Layout>
  )
}
