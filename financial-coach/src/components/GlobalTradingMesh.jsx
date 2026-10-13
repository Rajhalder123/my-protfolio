import React, { useEffect, useRef, useState } from 'react';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  Activity,
  Layers,
  Zap,
  Server,
  Check,
  Play,
  Pause,
  Database,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Radio,
  Send
} from 'lucide-react';

// Institutional Multi-Region Financial Hubs (Equinix & Tier-1 Infrastructure)
const HUBS = [
  {
    id: 'tyo',
    name: 'Tokyo',
    tag: 'YO_CORE · 14ms',
    lat: 35.6,
    lon: 139.6,
    color: '#0284c7',
    pulseColor: '#38bdf8',
    haloColor: 'rgba(56, 189, 248, 0.70)',
    facility: 'Equinix TY2 Data Center',
    role: 'YoForex Primary Core & Acting CTO Architecture Engine',
    latency: '14ms Cluster Sync',
    stack: 'Node.js, Redis Streams, MetaTrader 5 Bridge, WebSockets',
    throughput: '42,000 req/sec',
    badge: 'YO_CORE ACTIVE'
  },
  {
    id: 'lon',
    name: 'London',
    tag: 'LSE · LIQUIDITY',
    lat: 51.5,
    lon: -0.12,
    color: '#0284c7',
    pulseColor: '#38bdf8',
    haloColor: 'rgba(56, 189, 248, 0.65)',
    facility: 'Equinix LD4 Slough',
    role: 'Tier-1 FX Prime Brokerage & FIX 4.4 Bridge',
    latency: '18ms Prime Broker Stream',
    stack: 'C++ Manager API, FIX Protocol, Fast Feed Router',
    throughput: '65,000 msgs/sec',
    badge: 'PRIME ROUTER'
  },
  {
    id: 'nyc',
    name: 'New York',
    tag: 'MT5 · 12ms',
    lat: 40.7,
    lon: -74.0,
    color: '#0c2133',
    pulseColor: '#38bdf8',
    haloColor: 'rgba(56, 189, 248, 0.75)',
    facility: 'Equinix NY4 Secaucus',
    role: 'MetaTrader 5 Direct Server Gateway',
    latency: '12ms Execution Bridge',
    stack: 'MT5 APIServer, Redis In-Memory State, ZeroMQ',
    throughput: '80,000 orders/sec',
    badge: 'MT5 GATEWAY'
  },
  {
    id: 'sgp',
    name: 'Singapore',
    tag: 'SGX · APAC',
    lat: 1.35,
    lon: 103.8,
    color: '#a855f7',
    pulseColor: '#c084fc',
    haloColor: 'rgba(168, 85, 247, 0.75)', // Radiant purple halo as in reference
    facility: 'Equinix SG1 / SG3 Hub',
    role: 'APAC Regional Cross-Border Routing & Multi-Tenant Engine',
    latency: '16ms Low-Latency Arb Pipe',
    stack: 'Go Microservices, Docker, Kafka Event Queue',
    throughput: '38,000 msgs/sec',
    badge: 'APAC CROSSING'
  },
  {
    id: 'dxb',
    name: 'Dubai',
    tag: 'GATEWAY · MENA',
    lat: 25.2,
    lon: 55.3,
    color: '#9aa83a',
    pulseColor: '#a3e635',
    haloColor: 'rgba(163, 230, 53, 0.70)', // Lime green halo
    facility: 'Datamena DX1 Hub',
    role: 'MENA Brokerage CRM & Client Portal Gateway',
    latency: '22ms Client Sync',
    stack: 'React 19, FastAPI, PostgreSQL Double-Entry Wallet Ledger',
    throughput: '24,000 req/sec',
    badge: 'CRM CLUSTER'
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    tag: 'EUREX · CORE',
    lat: 50.1,
    lon: 8.68,
    color: '#10b981',
    pulseColor: '#34d399',
    haloColor: 'rgba(52, 211, 153, 0.65)',
    facility: 'Equinix FR2 Frankfurt',
    role: 'European Institutional Clearing Router',
    latency: '15ms Order Routing',
    stack: 'Rust Order Matcher, Nginx Edge Proxies',
    throughput: '50,000 msgs/sec',
    badge: 'CLEARING HUB'
  },
  {
    id: 'mum',
    name: 'Mumbai',
    tag: 'DEV · ARCH',
    lat: 19.0,
    lon: 72.8,
    color: '#9aa83a',
    pulseColor: '#a3e635',
    haloColor: 'rgba(163, 230, 53, 0.70)', // Lime green halo
    facility: 'BKC Financial Tech Center (MAKAUT \'25)',
    role: 'Core Systems Architecture & CRM Engineering Base',
    latency: '14ms Production Mesh',
    stack: 'Full-Stack Architecture, Redis Pub/Sub, Multi-Tenant CRM',
    throughput: '35,000 req/sec',
    badge: 'ENGINEERING HQ'
  },
  {
    id: 'syd',
    name: 'Sydney',
    tag: 'PACIFIC · OTC',
    lat: -33.8,
    lon: 151.2,
    color: '#d97706',
    pulseColor: '#f59e0b',
    haloColor: 'rgba(245, 158, 11, 0.70)', // Amber halo as in reference
    facility: 'Equinix SY3 Alexandria',
    role: 'Oceania OTC Desk & Liquidity Feeder',
    latency: '28ms Pacific Cross',
    stack: 'WebSocket Push Cluster, Caching Layer',
    throughput: '18,000 msgs/sec',
    badge: 'PACIFIC DESK'
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    tag: 'HKEX · FEED',
    lat: 22.3,
    lon: 114.1,
    color: '#a855f7',
    pulseColor: '#c084fc',
    haloColor: 'rgba(168, 85, 247, 0.75)', // Radiant purple halo as in reference
    facility: 'Equinix HK1 Data Center',
    role: 'High-Throughput Order Replication Hub',
    latency: '17ms Tick Stream',
    stack: 'Zero-Copy Ring Buffer, WebSocket Distributor',
    throughput: '55,000 msgs/sec',
    badge: 'REPLICATION'
  }
];

// High-speed trading pipelines categorized by topology
const ROUTES = [
  { from: 0, to: 1, label: 'BTC/USD', type: 'crypto' }, // Tokyo -> London
  { from: 1, to: 2, label: 'EUR/USD', type: 'mt5' },    // London -> New York
  { from: 2, to: 0, label: 'MT5_FEED', type: 'mt5' },   // New York -> Tokyo
  { from: 0, to: 3, label: 'ARB_PIPE', type: 'crypto' },// Tokyo -> Singapore
  { from: 3, to: 4, label: 'XAU/USD', type: 'mt5' },    // Singapore -> Dubai
  { from: 4, to: 5, label: 'ORDER_SYNC', type: 'crm' }, // Dubai -> Frankfurt
  { from: 5, to: 1, label: 'LSE_ROUTER', type: 'mt5' }, // Frankfurt -> London
  { from: 6, to: 4, label: 'MUM_DXB', type: 'crm' },    // Mumbai -> Dubai
  { from: 3, to: 8, label: 'APAC_MESH', type: 'crm' },  // Singapore -> Hong Kong
  { from: 8, to: 0, label: 'HK_TYO', type: 'crypto' }   // Hong Kong -> Tokyo
];

// Tag offsets to prevent label collisions on the 3D sphere
const TAG_OFFSETS = {
  fra: { dx: 8, dy: 10 },    // Frankfurt: below the node
  lon: { dx: 8, dy: -24 },   // London: above the node
  dxb: { dx: 8, dy: -20 },   // Dubai: above the node
  mum: { dx: 8, dy: 10 },    // Mumbai: below the node
  hkg: { dx: 8, dy: 10 },    // Hong Kong: below the node
  sgp: { dx: 8, dy: -20 },   // Singapore: above the node
  tyo: { dx: 8, dy: -14 },   // Tokyo: above
  syd: { dx: 8, dy: -14 },   // Sydney: above
  nyc: { dx: 8, dy: -14 }    // New York: above
};

// Target angles for dynamic corridor dancing
const CORRIDOR_ANGLES = {
  mt5: { rotY: -0.92, rotX: 0.58 },    // New York NY4 <-> London LD4
  crm: { rotY: -2.45, rotX: 0.36 },    // Dubai DX1 <-> Mumbai BKC <-> Tokyo TY2
  crypto: { rotY: -3.20, rotX: 0.30 }, // Tokyo TY2 <-> Singapore SG1 <-> Hong Kong
  all: { rotY: 0, rotX: 0.22 }
};

// Dynamic Topology Bridge Telemetry & Handshake Data
const BRIDGE_MODAL_DATA = {
  mt5: {
    type: 'mt5',
    title: 'MetaTrader 5 Low-Latency Bridge',
    badge: 'CONNECTED · MT5 BRIDGE',
    themeColor: '#38bdf8',
    corridor: 'Equinix NY4 (Secaucus) <—> Equinix LD4 (London Slough)',
    protocol: 'FIX 4.4 / MT5 Server APIServer Binary Gateway',
    basePing: 11.8,
    metrics: {
      latency: '11.8ms',
      throughput: '84,500 orders/sec',
      packetLoss: '0.00%',
      fillRate: '99.98% Zero-Slippage'
    },
    steps: [
      'TLS 1.3 Handshake: Dedicated Fiber Tunnel Established (2ms)',
      'MT5 APIServer Auth: Manager Session #482910 Verified (3ms)',
      'WebSocket Symbol Feed: EUR/USD, XAU/USD, BTC/USD Armed (2ms)',
      'Execution Engine: Zero-Slippage Routing to LD4 Gateway Active'
    ],
    liveTicker: [
      { sym: 'EUR/USD', bid: '1.08422', ask: '1.08423', tag: '0.1 pip' },
      { sym: 'XAU/USD', bid: '2,648.10', ask: '2,648.25', tag: '15c spread' },
      { sym: 'BTC/USD', bid: '94,820.50', ask: '94,821.10', tag: '+3.4%' }
    ],
    actionLabel: 'Simulate 2.50 Lot Order Fill',
    actionSuccess: 'ORDER EXECUTED: 2.50 LOTS EUR/USD · 11.4ms · ZERO SLIPPAGE · NY4 -> LD4'
  },
  crm: {
    type: 'crm',
    title: 'Multi-Broker CRM Cluster Mesh',
    badge: 'CONNECTED · CRM CLUSTER',
    themeColor: '#10b981',
    corridor: 'Datamena DX1 (Dubai) <—> Equinix TY2 (Tokyo) <—> BKC HQ',
    protocol: 'ACID Double-Entry Wallet Ledger / Redis Streams Pub/Sub',
    basePing: 14.2,
    metrics: {
      latency: '14.2ms',
      throughput: '28,000 req/sec',
      packetLoss: '0.00%',
      fillRate: '0 Drift (100% Audit Clean)'
    },
    steps: [
      'PostgreSQL Shards: Multi-Tenant Schema Partitioned & Synced',
      'Redis Pub/Sub Bus: Client Deposit Webhooks Synced (3ms)',
      'Automated KYC Pipeline: Tier-3 Instant Document Validation Armed',
      'Double-Entry Balance Audit: Mathematical Parity 100% Verified'
    ],
    liveTicker: [
      { sym: 'DEPOSIT_WEBHOOK', bid: '+$10,000 USDT', ask: 'TRC-20', tag: 'CONFIRMED' },
      { sym: 'IB_COMMISSION', bid: '$420.50 credited', ask: 'Tier-1 IB', tag: 'SYNCED' },
      { sym: 'KYC_VERIFY', bid: 'User #8821', ask: 'Tier-3 Auto', tag: 'APPROVED' }
    ],
    actionLabel: 'Trigger Deposit Webhook',
    actionSuccess: 'WEBHOOK PROCESSED: +$10,000 USDT · WALLET CREDITED · 0 DRIFT'
  },
  crypto: {
    type: 'crypto',
    title: 'High-Frequency Arbitrage Pipeline',
    badge: 'CONNECTED · HFT ARB PIPE',
    themeColor: '#a855f7',
    corridor: 'Equinix TY2 (Tokyo) <—> Equinix SG1 (Singapore)',
    protocol: 'ZeroMQ Micro-Bursts / WebSocket Depth-of-Market Ring Buffer',
    basePing: 8.4,
    metrics: {
      latency: '8.4ms',
      throughput: '55,000 msgs/sec',
      packetLoss: '0.00%',
      fillRate: '+0.038% Arb Delta'
    },
    steps: [
      'Binance / Bybit L2 Orderbook Depth: 50ms Snapshots Synced',
      'Arb Matcher Engine: Cross-Exchange Spread Delta Online (1ms)',
      'Order Router: Sub-Millisecond Execution Bridge Armed',
      'Risk Gate: Circuit Breaker & Max Drawdown Slippage Safeguard'
    ],
    liveTicker: [
      { sym: 'BTC/USDT Delta', bid: 'TY2 $94,820', ask: 'SG1 $94,858', tag: '+$38.00' },
      { sym: 'ETH/USDT Delta', bid: 'TY2 $3,240', ask: 'SG1 $3,242', tag: '+$2.00' }
    ],
    actionLabel: 'Execute Arbitrage Leg',
    actionSuccess: 'ARB EXECUTED: 0.85 BTC · +$38.40 SPREAD CAPTURE · 8.2ms'
  }
};

export default function GlobalTradingMesh() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [isFullView, setIsFullView] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selectedHubIndex, setSelectedHubIndex] = useState(null);
  const [routeFilter, setRouteFilter] = useState('all'); // 'all' | 'mt5' | 'crypto' | 'crm'
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Live Connectivity Pop-Up State
  const [activeBridgeModal, setActiveBridgeModal] = useState(null);
  const [currentPing, setCurrentPing] = useState(11.8);
  const [isPinging, setIsPinging] = useState(false);
  const [simulationToast, setSimulationToast] = useState(null);
  const [heroCardDismissed, setHeroCardDismissed] = useState(false);

  // Simulated live execution stream for institutional telemetry
  const [executionTicks, setExecutionTicks] = useState([
    { id: 1, text: 'MT5_BRIDGE: EUR/USD · 2.50 lots · NY4 -> LD4', latency: '12ms', status: 'FILLED' },
    { id: 2, text: 'ARB_PIPE: BTC/USDT · $94,840 · TY2 -> SG1', latency: '9ms', status: 'SYNCED' }
  ]);

  // References for render loop state
  const isFullViewRef = useRef(isFullView);
  const zoomRef = useRef(zoom);
  const targetRotRef = useRef(null);
  const routeFilterRef = useRef(routeFilter);
  const isOrbitingRef = useRef(isOrbiting);

  useEffect(() => {
    isFullViewRef.current = isFullView;
  }, [isFullView]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    routeFilterRef.current = routeFilter;
  }, [routeFilter]);

  useEffect(() => {
    isOrbitingRef.current = isOrbiting;
  }, [isOrbiting]);

  // Live fluctuating ping jitter
  useEffect(() => {
    if (!activeBridgeModal) return;
    const base = activeBridgeModal.basePing || 12.0;
    setCurrentPing(base);

    const interval = setInterval(() => {
      const jitter = (Math.random() * 0.8 - 0.4).toFixed(1);
      setCurrentPing(parseFloat((base + parseFloat(jitter)).toFixed(1)));
    }, 2400);

    return () => clearInterval(interval);
  }, [activeBridgeModal?.type]);

  // Live order tick simulation
  useEffect(() => {
    const symbols = ['EUR/USD', 'BTC/USDT', 'XAU/USD', 'GBP/USD', 'USD/JPY', 'ETH/USD'];
    const hubsFrom = ['NY4', 'LD4', 'TY2', 'DX1', 'SG1'];
    const hubsTo = ['LD4', 'TY2', 'FR2', 'SG1', 'HK1'];

    const interval = setInterval(() => {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const hFrom = hubsFrom[Math.floor(Math.random() * hubsFrom.length)];
      const hTo = hubsTo[Math.floor(Math.random() * hubsTo.length)];
      const lat = Math.floor(8 + Math.random() * 12);
      const lots = (0.5 + Math.random() * 4.5).toFixed(2);

      const newTick = {
        id: Date.now(),
        text: `ROUTER: ${sym} · ${lots} lots · ${hFrom} -> ${hTo}`,
        latency: `${lat}ms`,
        status: lat < 12 ? 'SUB-MILLI' : 'EXECUTED'
      };

      setExecutionTicks(prev => [newTick, prev[0]]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll and handle ESC key for full view
  useEffect(() => {
    if (isFullView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullView(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Retina High-DPI handling
    const dpr = window.devicePixelRatio || 1;
    let width = 600;
    let height = 540;

    const setupCanvasSize = () => {
      if (!canvas.parentElement) return;
      if (isFullViewRef.current) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width || 600;
        height = rect.height || 540;
      }
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize);

    // Flying photon data packets
    const packets = ROUTES.map((r, i) => ({
      routeIdx: i,
      progress: Math.random(),
      speed: 0.007 + Math.random() * 0.008,
      color: i % 2 === 0 ? '#38bdf8' : '#a855f7',
      size: 3.0 + Math.random() * 1.2
    }));

    // Sphere lattice points
    const numPoints = 400;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      });
    }

    // Convert Lat/Lon to 3D Cartesian coordinates on unit sphere
    function latLonTo3D(lat, lon) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -(Math.sin(phi) * Math.cos(theta)),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      };
    }

    const hubPoints = HUBS.map(h => latLonTo3D(h.lat, h.lon));

    // Interactive Drag & Momentum State
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velX = 0.005;
    let velY = 0;
    let rotY = 0;
    let rotX = 0.22;

    const onMouseDown = (e) => {
      isDragging = true;
      targetRotRef.current = null;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        velX = deltaX * 0.005;
        velY = deltaY * 0.003;
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.8, Math.min(0.8, rotX));
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }

      // Check hover on hubs
      let nearestHub = null;
      let minDist = 26;
      projectedHubsCache.forEach((proj, idx) => {
        if (proj.z > 0) {
          const dist = Math.hypot(proj.px - mouseX, proj.py - mouseY);
          if (dist < minDist) {
            minDist = dist;
            nearestHub = HUBS[idx];
          }
        }
      });
      setHoveredHub(nearestHub);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        targetRotRef.current = null;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastMouseX;
        const deltaY = e.touches[0].clientY - lastMouseY;
        velX = deltaX * 0.005;
        velY = deltaY * 0.003;
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.8, Math.min(0.8, rotX));
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let projectedHubsCache = [];

    // Main 3D Render Loop
    function render() {
      // Shortest-path angular alignment and organic micro-dancing
      if (targetRotRef.current) {
        let diffY = (targetRotRef.current.rotY - rotY) % (Math.PI * 2);
        if (diffY > Math.PI) diffY -= Math.PI * 2;
        if (diffY < -Math.PI) diffY += Math.PI * 2;

        let diffX = targetRotRef.current.rotX - rotX;

        rotY += diffY * 0.085;
        rotX += diffX * 0.085;

        if (Math.abs(diffY) < 0.003 && Math.abs(diffX) < 0.003) {
          rotY = targetRotRef.current.rotY;
          rotX = targetRotRef.current.rotX;
          targetRotRef.current = null;
        }
      } else if (!isDragging) {
        if (routeFilterRef.current === 'all') {
          if (isOrbitingRef.current) {
            velX = velX * 0.96 + 0.006 * 0.04;
            velY = velY * 0.94;
            rotY += velX;
            rotX += velY;
          }
        } else {
          // Dynamic corridor dancing: subtle organic micro-oscillation while locked
          rotY += Math.sin(Date.now() * 0.0014) * 0.0006;
          rotX += Math.cos(Date.now() * 0.0018) * 0.0003;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const inFull = isFullViewRef.current;
      const baseRadius = inFull
        ? Math.min(width, height) * 0.35
        : Math.min(width, height) * 0.39;
      const radius = baseRadius * zoomRef.current;

      const centerX = inFull ? Math.max(width * 0.58, 480) : width / 2;
      const centerY = inFull ? height * 0.48 : height * 0.44;

      // 3D Matrix Projection Function
      function project(p) {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = 420 / (420 + z2 * radius);
        return {
          px: centerX + x1 * radius * scale,
          py: centerY + y2 * radius * scale,
          z: z2,
          scale
        };
      }

      // Pre-project hubs and lattice points
      projectedHubsCache = hubPoints.map(p => project(p));
      const projectedLattice = points.map(pt => project(pt));

      // =========================================================================
      // STEP 1: RENDER BACK HEMISPHERE (z < 0) - Behind the glass sphere
      // =========================================================================

      // Back lattice points (fainter, deep perspective)
      projectedLattice.forEach(proj => {
        if (proj.z <= 0) {
          const alpha = Math.max(0.04, (proj.z + 1.0) * 0.16);
          ctx.fillStyle = `rgba(12, 33, 51, ${alpha})`;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 1.1 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Back half of Equatorial Rings
      ctx.strokeStyle = 'rgba(12, 33, 51, 0.05)';
      ctx.lineWidth = 0.8;
      [-0.45, 0, 0.45].forEach((latY) => {
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= Math.PI * 2; a += 0.12) {
          const rRing = Math.sqrt(Math.max(0, 1 - latY * latY));
          const pt = project({ x: Math.cos(a) * rRing, y: latY, z: Math.sin(a) * rRing });
          if (pt.z <= 0) {
            if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
            else ctx.lineTo(pt.px, pt.py);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      });

      // =========================================================================
      // STEP 2: VOLUMETRIC GLASS SPHERE BODY ("LIGHT DEEP" GRADIENT AS IN IMAGE)
      // =========================================================================

      // Outer atmospheric ethereal halo
      const rimAtmosphere = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.85,
        centerX,
        centerY,
        radius * 1.35
      );
      rimAtmosphere.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      rimAtmosphere.addColorStop(0.5, 'rgba(154, 168, 58, 0.08)');
      rimAtmosphere.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = rimAtmosphere;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Main Glass Sphere Body: Luminous core + soft ice-cyan + light deep rim
      const sphereBodyGrad = ctx.createRadialGradient(
        centerX - radius * 0.18,
        centerY - radius * 0.15,
        radius * 0.08,
        centerX,
        centerY,
        radius
      );
      // Soft translucent lime/emerald ambient core as shown in reference image
      sphereBodyGrad.addColorStop(0, 'rgba(240, 253, 244, 0.45)');
      sphereBodyGrad.addColorStop(0.28, 'rgba(224, 242, 254, 0.40)');
      sphereBodyGrad.addColorStop(0.65, 'rgba(186, 230, 253, 0.32)');
      sphereBodyGrad.addColorStop(0.88, 'rgba(125, 211, 252, 0.24)');
      sphereBodyGrad.addColorStop(0.98, 'rgba(2, 132, 199, 0.14)');
      sphereBodyGrad.addColorStop(1.0, 'rgba(2, 132, 199, 0.0)');

      ctx.fillStyle = sphereBodyGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle spherical outer edge stroke
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // =========================================================================
      // STEP 3: RENDER FRONT HEMISPHERE (z > 0) - Crisp foreground elements
      // =========================================================================

      // Front half of Equatorial Rings
      ctx.strokeStyle = 'rgba(12, 33, 51, 0.14)';
      ctx.lineWidth = 1.1;
      [-0.45, 0, 0.45].forEach((latY) => {
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const rRing = Math.sqrt(Math.max(0, 1 - latY * latY));
          const pt = project({ x: Math.cos(a) * rRing, y: latY, z: Math.sin(a) * rRing });
          if (pt.z > 0) {
            if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
            else ctx.lineTo(pt.px, pt.py);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      });

      // Tilted Golden/Olive Orbital Ring (As in reference image)
      const orbitAngle = rotY * 1.3;
      ctx.strokeStyle = 'rgba(154, 168, 58, 0.40)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.08) {
        const rOrbit = 1.14;
        const pt = project({
          x: Math.cos(a + orbitAngle) * rOrbit,
          y: Math.sin(a * 2) * 0.1,
          z: Math.sin(a + orbitAngle) * rOrbit
        });
        if (a === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();

      // Front lattice points (sharp dark slate dots with depth shading)
      projectedLattice.forEach(proj => {
        if (proj.z > 0) {
          const alpha = Math.min(0.75, 0.25 + proj.z * 0.50);
          ctx.fillStyle = `rgba(12, 33, 51, ${alpha})`;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 1.5 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Parabolic Trading Arcs (Dynamically styled & lit by topology mode)
      const currentFilter = routeFilterRef.current;
      ROUTES.forEach((route) => {
        const isMatch = currentFilter === 'all' || route.type === currentFilter;
        const p1 = projectedHubsCache[route.from];
        const p2 = projectedHubsCache[route.to];

        if (p1.z > -0.25 || p2.z > -0.25) {
          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.18, (avgZ + 0.35) / 1.35) * (isMatch ? 1 : 0.12);

          const midX = (p1.px + p2.px) / 2;
          const midY = (p1.py + p2.py) / 2 - (isMatch ? 36 : 22) * Math.max(0.7, avgZ + 0.5);

          const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
          if (currentFilter === 'mt5' && isMatch) {
            // MT5 Mode: Electric Cyan & Institutional Gold
            grad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.95})`);
            grad.addColorStop(0.5, `rgba(245, 158, 11, ${alpha * 1.0})`);
            grad.addColorStop(1, `rgba(56, 189, 248, ${alpha * 0.95})`);
          } else if (currentFilter === 'crm' && isMatch) {
            // CRM Mode: Emerald Green & Vivid Lime Ledger Sync
            grad.addColorStop(0, `rgba(16, 185, 129, ${alpha * 0.95})`);
            grad.addColorStop(0.5, `rgba(163, 230, 53, ${alpha * 1.0})`);
            grad.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.95})`);
          } else if (currentFilter === 'crypto' && isMatch) {
            // Crypto Mode: Electric Cyan & Neon Violet
            grad.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.95})`);
            grad.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 1.0})`);
            grad.addColorStop(1, `rgba(6, 182, 212, ${alpha * 0.95})`);
          } else {
            // All Routes: Blue to Purple as in user's reference image
            grad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.90})`);
            grad.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 0.95})`);
            grad.addColorStop(1, `rgba(56, 189, 248, ${alpha * 0.90})`);
          }

          ctx.strokeStyle = grad;
          ctx.lineWidth = isMatch ? 2.6 : 1.0;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.quadraticCurveTo(midX, midY, p2.px, p2.py);
          ctx.stroke();
        }
      });

      // Glowing Photon Packets Traveling Across Arcs
      packets.forEach(packet => {
        const route = ROUTES[packet.routeIdx];
        const isMatch = currentFilter === 'all' || route.type === currentFilter;
        if (!isMatch) return;

        const speedBoost = currentFilter === 'crypto' ? 1.8 : (currentFilter === 'mt5' ? 1.4 : 1.0);
        packet.progress += packet.speed * speedBoost;
        if (packet.progress > 1) packet.progress = 0;

        const p1 = projectedHubsCache[route.from];
        const p2 = projectedHubsCache[route.to];

        if (p1.z > -0.25 || p2.z > -0.25) {
          const t = packet.progress;
          const avgZ = (p1.z + p2.z) / 2;
          const midX = (p1.px + p2.px) / 2;
          const midY = (p1.py + p2.py) / 2 - (isMatch ? 36 : 22) * Math.max(0.7, avgZ + 0.5);

          const px = (1 - t) * (1 - t) * p1.px + 2 * (1 - t) * t * midX + t * t * p2.px;
          const py = (1 - t) * (1 - t) * p1.py + 2 * (1 - t) * t * midY + t * t * p2.py;
          const packetZ = (1 - t) * p1.z + t * p2.z;

          if (packetZ > -0.15) {
            const glowColor = currentFilter === 'crm'
              ? '#10b981'
              : (currentFilter === 'crypto'
                ? '#a855f7'
                : (currentFilter === 'mt5' ? '#f59e0b' : '#38bdf8'));

            const glow = ctx.createRadialGradient(px, py, 0, px, py, packet.size * 3.8);
            glow.addColorStop(0, glowColor);
            glow.addColorStop(0.4, glowColor);
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px, py, packet.size * 3.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, packet.size * 0.70, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Hub Markers & Glowing Halos (Matching reference image exactly)
      HUBS.forEach((hub, idx) => {
        const proj = projectedHubsCache[idx];
        if (proj.z > -0.15) {
          const depthAlpha = Math.max(0.25, (proj.z + 0.3) / 1.3);
          const isHovered = hoveredHub && hoveredHub.id === hub.id;
          const isSelected = selectedHubIndex === idx;

          // Ethereal outer halo glow (radiant purple on SG/HK, cyan on TYO/NYC, lime on DXB/MUM, amber on SYD)
          const haloRadius = (isHovered || isSelected ? 16 : 12) * proj.scale;
          const haloGrad = ctx.createRadialGradient(proj.px, proj.py, 0, proj.px, proj.py, haloRadius);
          haloGrad.addColorStop(0, hub.haloColor);
          haloGrad.addColorStop(0.6, hub.haloColor);
          haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // Pulsing radar ring
          const pulseRadius = 5 + Math.sin(Date.now() * 0.005 + idx) * 3;
          ctx.strokeStyle = hub.pulseColor;
          ctx.globalAlpha = depthAlpha * 0.9;
          ctx.lineWidth = isHovered || isSelected ? 2.2 : 1.3;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, pulseRadius * proj.scale, 0, Math.PI * 2);
          ctx.stroke();

          // Core node dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, (isHovered || isSelected ? 5.5 : 4.0) * proj.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = isHovered || isSelected ? '#a3e635' : hub.color;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, (isHovered || isSelected ? 3.5 : 2.5) * proj.scale, 0, Math.PI * 2);
          ctx.fill();

          // Clean White Elevated City Badge (As in user's reference image)
          ctx.save();
          ctx.globalAlpha = depthAlpha;

          const labelText = isHovered || isSelected ? `${hub.name} [${hub.tag}]` : hub.name;
          ctx.font = '700 11px Montserrat, sans-serif';
          const textWidth = ctx.measureText(labelText).width;

          const offset = TAG_OFFSETS[hub.id] || { dx: 8, dy: -14 };
          const tagX = proj.px + offset.dx;
          const tagY = proj.py + offset.dy;

          // Soft drop shadow
          ctx.shadowColor = 'rgba(12, 33, 51, 0.12)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 2;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
          ctx.strokeStyle = isHovered || isSelected ? 'var(--brand)' : 'rgba(12, 33, 51, 0.12)';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.roundRect(tagX, tagY, textWidth + 12, 19, 5);
          ctx.fill();
          ctx.stroke();

          // Label text
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#0c2133';
          ctx.fillText(labelText, tagX + 6, tagY + 14);

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', setupCanvasSize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFullView]);

  // Handle topology mode selection with camera glide & modal trigger
  const handleSelectTopology = (modeKey) => {
    setRouteFilter(modeKey);
    setHeroCardDismissed(false);
    setSimulationToast(null);

    const angle = CORRIDOR_ANGLES[modeKey] || CORRIDOR_ANGLES.all;
    targetRotRef.current = { ...angle };

    if (modeKey === 'mt5') {
      setActiveBridgeModal(BRIDGE_MODAL_DATA.mt5);
    } else if (modeKey === 'crm') {
      setActiveBridgeModal(BRIDGE_MODAL_DATA.crm);
    } else if (modeKey === 'crypto') {
      setActiveBridgeModal(BRIDGE_MODAL_DATA.crypto);
    } else {
      setActiveBridgeModal(null);
    }
  };

  // Ping re-test with spinner
  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      if (activeBridgeModal) {
        const base = activeBridgeModal.basePing || 12.0;
        const newPing = (base + (Math.random() * 0.6 - 0.3)).toFixed(1);
        setCurrentPing(parseFloat(newPing));
      }
    }, 550);
  };

  // Instant simulated order fill or deposit webhook
  const handleSimulateAction = () => {
    if (!activeBridgeModal) return;
    setSimulationToast(activeBridgeModal.actionSuccess);

    const newTick = {
      id: Date.now(),
      text: activeBridgeModal.actionSuccess,
      latency: `${currentPing}ms`,
      status: 'VERIFIED'
    };
    setExecutionTicks(prev => [newTick, prev[0]]);

    setTimeout(() => {
      setSimulationToast(null);
    }, 4200);
  };

  // Focus camera on specific hub
  const focusHub = (idx) => {
    setSelectedHubIndex(idx);
    const hub = HUBS[idx];
    const radLat = hub.lat * (Math.PI / 180);
    const radLon = hub.lon * (Math.PI / 180);
    targetRotRef.current = {
      rotY: -radLon - Math.PI / 2,
      rotX: radLat
    };
  };

  const resetView = () => {
    setSelectedHubIndex(null);
    setZoom(1);
    targetRotRef.current = {
      rotY: 0,
      rotX: 0.22
    };
  };

  const handleContactRaj = () => {
    navigator.clipboard.writeText('rajhalder.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3200);
    window.location.href = 'mailto:rajhalder.dev@gmail.com?subject=Institutional%20FinTech%20Architecture%20Inquiry%20-%20Raj%20Halder';
  };

  const activeInspectedHub = selectedHubIndex !== null ? HUBS[selectedHubIndex] : (hoveredHub || HUBS[0]);

  return (
    <div
      className={`global-mesh-container ${isFullView ? 'is-fullview' : ''}`}
      ref={containerRef}
      style={{ cursor: 'grab' }}
    >
      {/* 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="mesh-canvas"
      />

      {/* HERO SECTION VIEW: Quick Floating HUD Bar with Topology Switchers */}
      {!isFullView && (
        <>
          <div className="globe-hero-hud-bar">
            <div className="globe-hero-tabs">
              {[
                { key: 'all', label: 'All Mesh', icon: Layers },
                { key: 'mt5', label: 'MT5 Bridge', icon: Zap },
                { key: 'crm', label: 'CRM Cluster', icon: Database },
                { key: 'crypto', label: 'Crypto Arb', icon: TrendingUp }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    className={`globe-hero-tab-btn ${routeFilter === tab.key ? 'active' : ''}`}
                    onClick={() => handleSelectTopology(tab.key)}
                    type="button"
                  >
                    <Icon size={12} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              className="globe-fullview-btn"
              onClick={() => setIsFullView(true)}
              title="Open Full View of Global Mesh"
              type="button"
            >
              <Maximize2 size={13} />
              <span>Full View</span>
            </button>
          </div>

          {/* Hero Floating Bridge Modal */}
          {activeBridgeModal && !heroCardDismissed && (
            <div className="globe-hero-bridge-card">
              <div className="gbm-header">
                <div className="gbm-title-wrap">
                  <span className="gbm-mode-badge">
                    <span className="live-pulse-dot" style={{ backgroundColor: activeBridgeModal.themeColor }} />
                    <span>{activeBridgeModal.badge}</span>
                  </span>
                  <div className="gbm-corridor font-mono">{activeBridgeModal.corridor}</div>
                </div>
                <button
                  className="gbm-close-btn"
                  onClick={() => setHeroCardDismissed(true)}
                  title="Dismiss Terminal Card"
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>

              {simulationToast && (
                <div className="gbm-toast-banner">
                  <Check size={12} />
                  <span>{simulationToast}</span>
                </div>
              )}

              <div className="gbm-body">
                <div className="gbm-metrics-strip">
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">PING:</span>
                    <span className="m-val text-brand font-mono">
                      {isPinging ? '...' : `${currentPing}ms`}
                    </span>
                  </div>
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">STATUS:</span>
                    <span className="m-val text-green font-mono">CONNECTED</span>
                  </div>
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">LOSS:</span>
                    <span className="m-val text-green font-mono">0.00%</span>
                  </div>
                </div>

                <div className="gbm-steps-list">
                  {activeBridgeModal.steps.slice(0, 3).map((st, i) => (
                    <div key={i} className="gbm-step-item">
                      <span className="step-num font-mono">0{i + 1}</span>
                      <span className="step-txt font-mono">{st}</span>
                      <Check size={11} className="step-ok text-green" />
                    </div>
                  ))}
                </div>

                <div className="gbm-actions">
                  <button
                    className="gbm-ping-btn"
                    onClick={handleTestPing}
                    disabled={isPinging}
                    type="button"
                  >
                    <RefreshCw size={12} className={isPinging ? 'spin-icon' : ''} />
                    <span>{isPinging ? '...' : 'Ping Test'}</span>
                  </button>
                  <button
                    className="gbm-action-sim"
                    onClick={handleSimulateAction}
                    type="button"
                  >
                    <Zap size={12} />
                    <span>{activeBridgeModal.actionLabel}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* FULL VIEW COMMAND CENTER */}
      {isFullView && (
        <>
          {/* Top Command Ribbon */}
          <div className="globe-fullview-header">
            <div className="globe-fv-title-group">
              <div className="globe-fv-badge">
                <span className="live-pulse-dot" /> PRODUCTION MESH ARCHITECTURE · LIVE REPLICA
              </div>
              <h2 className="globe-fv-title">Raj Halder — Global FinTech &amp; Trading Mesh</h2>
              <p className="globe-fv-subtitle">
                Institutional MetaTrader 5 Bridge, Cross-Border Order Routing &amp; Multi-Broker CRM Infrastructure.
              </p>
            </div>

            <div className="globe-fv-actions">
              <button
                className="globe-contact-cta"
                onClick={handleContactRaj}
                title="Direct Engineering Desk Email"
                type="button"
              >
                {copiedEmail ? <Check size={16} /> : <Zap size={16} />}
                <span>{copiedEmail ? 'Email Copied (rajhalder.dev@gmail.com)' : 'Contact / Hire Raj'}</span>
              </button>

              <button
                className="globe-fv-btn"
                onClick={() => setZoom(z => Math.min(1.6, z + 0.15))}
                title="Zoom In"
                type="button"
              >
                <ZoomIn size={16} />
              </button>
              <button
                className="globe-fv-btn"
                onClick={() => setZoom(z => Math.max(0.7, z - 0.15))}
                title="Zoom Out"
                type="button"
              >
                <ZoomOut size={16} />
              </button>
              <button
                className="globe-fv-btn"
                onClick={() => setIsOrbiting(o => !o)}
                title={isOrbiting ? 'Pause Orbit' : 'Resume Orbit'}
                type="button"
              >
                {isOrbiting ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                className="globe-fv-btn"
                onClick={resetView}
                title="Reset Camera"
                type="button"
              >
                <RotateCw size={15} />
                <span>Reset</span>
              </button>
              <button
                className="globe-fv-close-btn"
                onClick={() => setIsFullView(false)}
                title="Exit Full View (ESC)"
                type="button"
              >
                <X size={17} />
                <span>Exit Full View</span>
              </button>
            </div>
          </div>

          {/* Left Telemetry Sidebar */}
          <div className="globe-fv-sidebar">
            {/* 4 Core KPIs Grid */}
            <div className="fv-panel-card fv-kpis-panel">
              <div className="fv-kpi-grid">
                <div className="fv-kpi-item">
                  <span className="kpi-label">MT5 BRIDGE</span>
                  <span className="kpi-val text-brand">14ms WebSocket</span>
                </div>
                <div className="fv-kpi-item">
                  <span className="kpi-label">UPTIME SLA</span>
                  <span className="kpi-val">99.98% Avail</span>
                </div>
                <div className="fv-kpi-item">
                  <span className="kpi-label">ROLE</span>
                  <span className="kpi-val">YoForex Acting CTO</span>
                </div>
                <div className="fv-kpi-item">
                  <span className="kpi-label">LEDGER</span>
                  <span className="kpi-val text-green">ACID · 0 Drift</span>
                </div>
              </div>
            </div>

            {/* Route Topology Selector */}
            <div className="fv-panel-card">
              <div className="fv-card-header">
                <Layers size={13} className="text-brand" />
                <span>INTERACTIVE TOPOLOGY ROUTING</span>
              </div>
              <div className="fv-filter-tabs">
                {[
                  { key: 'all', label: 'All Routes (9)' },
                  { key: 'mt5', label: '⚡ MT5 Bridges' },
                  { key: 'crm', label: '🏢 CRM Sync' },
                  { key: 'crypto', label: '🪙 Crypto Arb' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    className={`fv-tab-btn ${routeFilter === tab.key ? 'active' : ''}`}
                    onClick={() => handleSelectTopology(tab.key)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Hub Deep Inspector */}
            <div className="fv-panel-card fv-hub-inspector">
              <div className="fv-card-header">
                <Server size={13} className="text-brand" />
                <span>FACILITY: {activeInspectedHub.name.toUpperCase()}</span>
                <span className="fv-badge-pill">{activeInspectedHub.badge}</span>
              </div>

              <div className="fv-hub-details">
                <div className="fv-detail-row">
                  <span className="detail-key">Primary Facility:</span>
                  <span className="detail-val font-mono">{activeInspectedHub.facility}</span>
                </div>
                <div className="fv-detail-row">
                  <span className="detail-key">Routing Role:</span>
                  <span className="detail-val">{activeInspectedHub.role}</span>
                </div>
                <div className="fv-detail-row">
                  <span className="detail-key">Engine Stack:</span>
                  <span className="detail-val text-brand font-mono">{activeInspectedHub.stack}</span>
                </div>
                <div className="fv-detail-row">
                  <span className="detail-key">Throughput Cap:</span>
                  <span className="detail-val font-mono">{activeInspectedHub.throughput}</span>
                </div>
                <div className="fv-detail-row">
                  <span className="detail-key">Cluster Latency:</span>
                  <span className="detail-val text-green font-mono">{activeInspectedHub.latency}</span>
                </div>
              </div>
            </div>

            {/* Real-Time Simulated Execution Stream */}
            <div className="fv-panel-card fv-execution-stream">
              <div className="fv-card-header">
                <Activity size={13} className="text-brand" />
                <span>LIVE EXECUTION STREAM</span>
              </div>
              <div className="fv-stream-list">
                {executionTicks.map(t => (
                  <div key={t.id} className="fv-stream-item">
                    <span className="stream-time">{t.latency}</span>
                    <span className="stream-text font-mono">{t.text}</span>
                    <span className="stream-status">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Connectivity Pop-Up Modal on Top-Right */}
          {activeBridgeModal && (
            <div className="globe-bridge-modal">
              <div className="gbm-header">
                <div className="gbm-title-wrap">
                  <span className="gbm-mode-badge">
                    <span className="live-pulse-dot" style={{ backgroundColor: activeBridgeModal.themeColor }} />
                    <span>{activeBridgeModal.badge}</span>
                  </span>
                  <div className="gbm-corridor font-mono">{activeBridgeModal.corridor}</div>
                </div>
                <button
                  className="gbm-close-btn"
                  onClick={() => setActiveBridgeModal(null)}
                  title="Close Connection Terminal"
                  type="button"
                >
                  <X size={15} />
                </button>
              </div>

              {simulationToast && (
                <div className="gbm-toast-banner">
                  <Check size={13} />
                  <span>{simulationToast}</span>
                </div>
              )}

              <div className="gbm-body">
                {/* Live Handshake Telemetry */}
                <div className="gbm-handshake-box">
                  <div className="gbm-handshake-title">LIVE CONNECTION PROTOCOL:</div>
                  <div className="gbm-steps-list">
                    {activeBridgeModal.steps.map((st, i) => (
                      <div key={i} className="gbm-step-item">
                        <span className="step-num font-mono">0{i + 1}</span>
                        <span className="step-txt font-mono">{st}</span>
                        <Check size={11} className="step-ok text-green" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="gbm-metrics-strip">
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">PING:</span>
                    <span className="m-val text-brand font-mono">
                      {isPinging ? '...' : `${currentPing}ms`}
                    </span>
                  </div>
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">STATUS:</span>
                    <span className="m-val text-green font-mono">CONNECTED</span>
                  </div>
                  <div className="gbm-metric-pill">
                    <span className="m-lbl">PACKET LOSS:</span>
                    <span className="m-val text-green font-mono">0.00%</span>
                  </div>
                </div>

                {/* Live Ticker Strip */}
                <div className="gbm-ticker-row">
                  {activeBridgeModal.liveTicker.map((tk, idx) => (
                    <div key={idx} className="gbm-ticker-pill">
                      <span className="text-brand font-bold">{tk.sym}:</span>
                      <span>{tk.bid}</span>
                      <span className="text-green text-xs font-mono">{tk.tag}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Controls */}
                <div className="gbm-actions">
                  <button
                    className="gbm-ping-btn"
                    onClick={handleTestPing}
                    disabled={isPinging}
                    type="button"
                  >
                    <RefreshCw size={13} className={isPinging ? 'spin-icon' : ''} />
                    <span>{isPinging ? 'Pinging Gateway...' : 'Re-test Latency Ping'}</span>
                  </button>
                  <button
                    className="gbm-action-sim"
                    onClick={handleSimulateAction}
                    type="button"
                  >
                    <Zap size={13} />
                    <span>{activeBridgeModal.actionLabel}</span>
                  </button>
                  <button
                    className="gbm-hire-btn"
                    onClick={handleContactRaj}
                    type="button"
                  >
                    <span>Connect</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Financial Hub Quick-Bar */}
          <div className="globe-fullview-bottom-bar">
            <div className="globe-fv-hubs-label">INSTITUTIONAL HUBS (CLICK TO FOCUS CAMERA):</div>
            <div className="globe-fv-hubs-list">
              {HUBS.map((hub, idx) => (
                <button
                  key={hub.id}
                  className={`globe-hub-pill ${selectedHubIndex === idx ? 'active' : ''}`}
                  onClick={() => focusHub(idx)}
                  type="button"
                >
                  <span className="hub-dot" style={{ backgroundColor: hub.pulseColor }} />
                  <span className="hub-name">{hub.name}</span>
                  <span className="hub-tag font-mono">{hub.tag.split('·')[1]?.trim() || hub.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
