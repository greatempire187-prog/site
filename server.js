const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const projects = [
  {
    title: 'Neon Task Manager',
    description: 'A powerful productivity app that tracks tasks with real-time progress and smart reminders.',
    tags: ['Vue', 'Firebase', 'PWA'],
    status: 'completed',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'API Analytics Hub',
    description: 'Dashboard for API metrics, error tracking, and traffic spikes in one centralized view.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    status: 'completed',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Crypto Portfolio',
    description: 'A responsive portfolio tracker with live price updates, trends, and portfolio analysis.',
    tags: ['React', 'Chart.js', 'CoinGecko'],
    status: 'in-progress',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Serverless Billing API',
    description: 'A lightweight API for subscription billing, invoices, and payment events.',
    tags: ['AWS Lambda', 'Stripe', 'REST'],
    status: 'completed',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Job Board Explorer',
    description: 'Search and filter developer roles across remote listings with custom alerts.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'in-progress',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Weather Forecast API',
    description: 'A public API delivering hourly and daily weather predictions with location lookup.',
    tags: ['Python', 'Flask', 'OpenWeather'],
    status: 'completed',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Design System Library',
    description: 'Component library for consistent UI patterns, themes, and reusable styling.',
    tags: ['CSS', 'Web Components', 'Storybook'],
    status: 'completed',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Chatbot API Service',
    description: 'Secure messaging API supporting authentication, session history, and webhooks.',
    tags: ['Go', 'gRPC', 'JWT'],
    status: 'in-progress',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Portfolio Landing',
    description: 'A polished developer landing page with animations, testimonials, and contact flow.',
    tags: ['Next.js', 'CSS Animations', 'SEO'],
    status: 'completed',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Notification Service',
    description: 'API for multi-channel alerts, templates, and delivery tracking for apps.',
    tags: ['Ruby', 'Sinatra', 'Postgres'],
    status: 'in-progress',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Event Scheduler',
    description: 'Calendar booking app with automated scheduling and availability management.',
    tags: ['TypeScript', 'Tailwind', 'GraphQL'],
    status: 'completed',
    category: 'web-app',
    github: '#',
    demo: '#',
    video: '#'
  },
  {
    title: 'Metrics Collector',
    description: 'API system that gathers application metrics and exposes analytics endpoints.',
    tags: ['Java', 'Spring Boot', 'Prometheus'],
    status: 'completed',
    category: 'api',
    github: '#',
    demo: '#',
    video: '#'
  }
];

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/projects') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projects));
    return;
  }

  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  const ext = path.extname(filePath) || '.html';
  const fullPath = path.join(__dirname, filePath);

  try {
    const data = await fs.readFile(fullPath);
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port);
