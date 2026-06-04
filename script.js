const fallbackProjects = [
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

let projects = [];
const apiEndpoint = '/api/projects';
const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter) {
  projectGrid.innerHTML = '';

  const filtered = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'completed') return project.status === 'completed';
    if (filter === 'in-progress') return project.status === 'in-progress';
    return project.category === filter;
  });

  filtered.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const statusLabel = project.status === 'completed' ? 'Completed' : 'In Progress';
    const badgeClass = project.status === 'completed' ? 'completed' : 'in-progress';

    card.innerHTML = `
      <div>
        <h2 class="card-title">${project.title}</h2>
        <p class="card-description">${project.description}</p>
      </div>
      <div class="card-tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="status-badge ${badgeClass}">${statusLabel}</span>
        <div class="card-actions">
          <a class="action-btn" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          <a class="action-btn" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>
          <a class="action-btn secondary" href="${project.video}" target="_blank" rel="noreferrer">Video Demo</a>
        </div>
      </div>
    `;

    projectGrid.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
});

async function loadProjects() {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    projects = await response.json();
  } catch (error) {
    projects = fallbackProjects;
  }
  renderProjects('all');
}

loadProjects();
