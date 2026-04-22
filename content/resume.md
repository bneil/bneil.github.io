+++
title = "Resume"
slug = "resume"
date = "2024-02-20"
description = "resume"
DisableComments = true
+++
<style>
.tech {
  display: inline;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  
  background: linear-gradient(
    120deg,
    rgba(0, 51, 13, 0.08) 0%,
    rgba(0, 51, 13, 0.12) 100%
  );
  color: #004d1a; 
  font-family: 'Courier New', monospace;
  font-size: 1em;
  
  padding: 0.1em 0.3em;
  margin: 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 77, 26, 0.2);
  
  white-space: normal;
  letter-spacing: normal;
  vertical-align: baseline;
  position: static;
  line-height: inherit;
  
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.tech:hover {
  background: linear-gradient(
    120deg,
    rgba(0, 51, 13, 0.15) 0%,
    rgba(0, 51, 13, 0.2) 100%
  );
  border-color: rgba(0, 77, 26, 0.4);
  color: #004d1a;
  text-shadow: 0 0 8px rgba(0, 77, 26, 0.3);
  transform: scale(1.05);
}

@media (prefers-color-scheme: dark) {
  .tech {
    background: linear-gradient(
      120deg,
      rgba(0, 255, 65, 0.08) 0%,
      rgba(0, 255, 65, 0.12) 100%
    );
    border-color: rgba(0, 255, 65, 0.3);
    color: #00ff41;
  }
  
  .tech:hover {
    background: linear-gradient(
      120deg,
      rgba(0, 255, 65, 0.15) 0%,
      rgba(0, 255, 65, 0.25) 100%
    );
    border-color: rgba(0, 255, 65, 0.5);
    color: #00ff41;
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.5);
  }

  #score {
    color: #00e639 !important;
    background: rgba(0, 255, 65, 0.1) !important;
    border-color: rgba(0, 255, 65, 0.25) !important;
  }

  #game-container {
    border-color: rgba(0, 255, 65, 0.15) !important;
    background: rgba(0, 255, 65, 0.02) !important;
  }
}
</style>
<style>
 .thumbnail {
   max-width: 200px;
   border-radius: 8px;
   transition: filter 0.3s ease;
   margin-right:10px;
 }

 .thumbnail:hover {
   filter: brightness(1.2) saturate(1.2);
 }

.spaceship-container {
  position: fixed;
  top: 0;
  left: 0;
}

.spaceship {
  position: absolute;
  font-size: 2.5rem;
  transform: translateX(-100%);
  animation: rocket 30s linear infinite;
  cursor: crosshair;
  opacity: .88;
  z-index: 99;
}

@keyframes rocket {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(calc(100vw + 100%)); 
  }
}

.retro-button {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #006622 0%, #004d1a 100%);
  border: none;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0, 77, 26, 0.35), inset 0 1px 0 rgba(255,255,255,0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.02em;
}

.retro-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 77, 26, 0.45), inset 0 1px 0 rgba(255,255,255,0.15);
  background: linear-gradient(135deg, #007a29 0%, #006622 100%);
}

.retro-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 77, 26, 0.3);
}

@media (prefers-color-scheme: dark) {
  .retro-button {
    color: #0a0a0a;
    background: linear-gradient(135deg, #00e639 0%, #00cc33 100%);
    box-shadow: 0 2px 8px rgba(0, 255, 65, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .retro-button:hover {
    background: linear-gradient(135deg, #00ff41 0%, #00e639 100%);
    box-shadow: 0 4px 16px rgba(0, 255, 65, 0.45), inset 0 1px 0 rgba(255,255,255,0.25);
  }

  .retro-button:active {
    box-shadow: 0 1px 4px rgba(0, 255, 65, 0.25);
  }
}
</style>

<p style="text-align:center; position:absolute; top: 10%; right: 25%">
<button onclick="window.open('/resume.pdf', '_new')" class="retro-button" onclick="savePDF()">TAKE A COPY OF MY RESUME TOGO</button>
</p>

## Taking Systems From Complex to Automated
...and an avid bug squisher 🚫👾 wherever they popup

<div id="game-container" style="position: relative; height: 52px; border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden; margin-bottom: 12px; background: rgba(0,0,0,0.03);">
  <div class="spaceship-container"></div>
  <div id="game-controls" style="position: absolute; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 12px;">
    <div style="display: flex; gap: 8px;">
      <button id="start-button" class="retro-button">Start Game</button>
      <button id="restart-button" class="retro-button" style="display: none;">Restart</button>
    </div>
    <div id="score" style="font-size: 0.85em; font-weight: 700; font-family: system-ui, -apple-system, sans-serif; color: #004d1a; background: rgba(0,77,26,0.1); border: 1px solid rgba(0,77,26,0.2); border-radius: 999px; padding: 3px 12px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); letter-spacing: 0.03em;">Score: 0</div>
  </div>
</div>

## About me...

<img class="thumbnail" src="/images/wild-report.jpg" width="320" align="left" /><p/>

I've been building software since 2006, across gaming, ad tech, fintech, and now AI startups. That time has split between being deep in a codebase and running engineering teams as CTO, so I can go from a code review to a board conversation without much friction.

The throughline has been taking systems that are complicated and messy and making them easier to operate. Sometimes that's architecture. Sometimes it's just deleting code nobody understood.

But most importantly I'm able <br/>

🚀👩‍💻🔥 to use 💻⚡️🌟 emojis 🏆⌨️💪 for great good! 🥳🎉 

### Technology Summary

**Frontend:** <span class="tech">Vue.js</span>, <span class="tech">Next.js</span>/<span class="tech">React</span>, <span class="tech">Flutter</span>/<span class="tech">Dart</span>, <span class="tech">Backbone.js</span><br/>
**Backend:** <span class="tech">Go</span>, <span class="tech">TypeScript</span>, <span class="tech">Rust</span>, <span class="tech">Scala</span>, <span class="tech">Akka</span>, <span class="tech">Java</span>, <span class="tech">Thrift</span>/<span class="tech">Protobuf</span>, <span class="tech">NATS</span><br/>
**DevOps:** <span class="tech">Docker</span>, <span class="tech">Kubernetes</span>, <span class="tech">Terraform</span>, <span class="tech">OpenTofu</span>, <span class="tech">GitHub Actions</span>, <span class="tech">GitLab CI</span>, <span class="tech">Vault</span>, <span class="tech">Helm</span><br/>
**Project Tracking:** <span class="tech">Linear</span>, <span class="tech">Jira</span>, <span class="tech">Pivotal Tracker</span><br/>
**Databases:** <span class="tech">PostgreSQL</span>, <span class="tech">SQLite</span>, <span class="tech">Redis</span>, <span class="tech">DynamoDB</span>, <span class="tech">Elasticsearch</span>, <span class="tech">Kafka</span><br/>
**Clouds:** <span class="tech">AWS</span>, <span class="tech">GCP</span>, <span class="tech">Fly.io</span>, <span class="tech">Firebase</span><br/>
**AI Tooling:** <span class="tech">Claude</span>, <span class="tech">OpenCode</span>, <span class="tech">pi.dev</span><br/>

<i>Ive left alot off this list in the hopes it wouldn't be distracting. Lots of technology has come and gone over the past twenty years</i>

------

<style>
  .spaceship.explosion {
    animation: boom 0.5s ease-out forwards;
    transform-origin: center;
  }

  @keyframes boom {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(5);
      opacity: 0;
    }
  }

  @keyframes scoreBoost {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.25); background: rgba(0,200,80,0.25); }
    100% { transform: scale(1); }
  }
</style>


### Experience

**RedThread.ai** *Principal Engineer* __January 2025 to Present__<br/>

- Serving as Principal Engineer at an early-stage AI startup, collaborating on technical strategy and driving execution
- Leading SOC 2 compliance program as Security Officer, establishing security controls and audit readiness
- Architecting and managing cloud infrastructure on <span class="tech">GCP</span> using <span class="tech">OpenTofu</span> for Infrastructure as Code
- Building agentic automation pipelines via <span class="tech">Linear</span> to streamline engineering workflows
- Streamlining adoption of AI-native practices across the team, including code harnesses like <span class="tech">OpenCode</span>, <span class="tech">Claude</span>, and <span class="tech">pi.dev</span> with models used throughout

**Technical Toolset** <span class="tech">GCP</span>, <span class="tech">OpenTofu</span>, <span class="tech">Claude</span>, <span class="tech">OpenCode</span>, <span class="tech">pi.dev</span>, <span class="tech">Linear</span>

------

**Modernize** *Consultant* __July 2024 to January 2025__<br/>

Worked as Senior Application Architect for ProWallet:
- Built out Infrastructure as Code with <span class="tech">Terraform</span>
- Set up mobile deployment pipelines with <span class="tech">CodeMagic.io</span>
- Contributed to <span class="tech">Flutter</span>/<span class="tech">Dart</span> mobile app development
- Integrated financial services with <span class="tech">Plaid</span>, Treasury Prime, and Incomm
- Migrated legacy systems to <span class="tech">TypeScript</span> and <span class="tech">Firebase</span>
- Helped the company move from Microsoft 365 to Google Suite

------

**Compliable** *CTO Co-Founder* __Feb 2020 to July 2024__<br/>

- Co-founded and secured $3M in initial investment
- Established and led high-performing Platform, Infrastructure, and Product teams
- Architected the company's technical foundation and scaling strategy
- Mentored a talented team of 8 engineers, 2 product managers, and 1 infrastructure specialist
- Balanced innovation initiatives with operational excellence
- Achieved SOC 2 Type 2 compliance as Security Officer
- Served on the board, providing technical leadership and strategic direction

**Technical Toolset** <span class="tech">Docker</span>, <span class="tech">AWS</span> Stack, <span class="tech">Go</span>, <span class="tech">Flutter</span>, <span class="tech">Firebase</span>, <span class="tech">Terraform</span>

**REBRIC** *CTO / Consultant* __Nov 2016 to Feb 2020__ <br/>

- Joined as CTO early on, building proof of concept apps to pitch to investors
- Got into TechStars 2019 via the Western Union Accelerator
- Consulted for other companies while figuring out REBRIC's product direction
- Focused on making <span class="tech">DevOps</span> and <span class="tech">AWS</span> pipelines less painful for established engineering teams

**Technical Toolset** <span class="tech">Docker</span>, <span class="tech">Jenkins</span>, <span class="tech">Ambassador</span>, <span class="tech">Play</span>, <span class="tech">Rust</span>, <span class="tech">Go</span> Microservices, <span class="tech">OpenFaas</span>, <span class="tech">GCP</span>, <span class="tech">AWS</span>.

------
**AppThis LLC** *Senior Fullstack Engineer* __Mar 2015 to Nov 2016__ <br/>

- Primary sysadmin / devops lead for the entirety of the AppThis infrastructure
- Created a monitoring platform that integrates applications written in <span class="tech">Python</span>, <span class="tech">Node</span>, <span class="tech">Scala</span> and <span class="tech">PHP</span> using <span class="tech">Ganglia</span>/<span class="tech">Graphana</span> as a front
- Created a "link-validator" that is able to validate every offer in the AppThis system through a world wide proxy which has generated millions in revenue by removing broken ads and cultivating more responsive networks
- Contributed in creating a video platform that was able to serve 2k requests per second on all major mobile phone devices
- Developed a real time log aggregation pipeline that spans each <span class="tech">AWS</span> region that incorporates a resilient pub/sub consumer application which can self heal during any downtime that AppThis experiences
- Gave programming sessions on diverse topics including advanced functional programming using <span class="tech">Scala</span>/<span class="tech">Erlang</span>

**Technical Toolset** <span class="tech">Scala</span>, <span class="tech">Akka</span>, <span class="tech">RabbitMQ</span>, <span class="tech">AWS</span>, <span class="tech">ScalaTest</span>, <span class="tech">SaltStack</span>

------
**Dire Wolf Digital** *Senior Engineer* __Jul 2011 to Mar 2015__ <br/>

- Tasked with adapting and expanding the DWD infrastructure to meet the goals of internal and external stake holders
- Customized <span class="tech">Chef</span> recipes/cookbooks for use in deployment to <span class="tech">Amazon EC2</span> and automated control through <span class="tech">RunDeck</span>
- Produce modules to support <span class="tech">ejabberd</span> chat, which is used in all public facing DWD games
- Developed scripts used to migrate large amounts of information from expiring games to new database infrastructure. (75 million rows converted under twenty minutes)
- Designed and implemented internal tools utilized by all projects at DWD

**Technical Toolset** <span class="tech">Scala</span>, <span class="tech">Akka</span>, <span class="tech">Bootstrap</span>, <span class="tech">Backbone.js</span>, <span class="tech">Thrift</span>/<span class="tech">Protobuf</span>, <span class="tech">Cassandra</span>, <span class="tech">PostgreSQL</span>

------
**Sony Online Entertainment** *Lead Developer* __May 2006 to Jul 2011__ <br/>

- Led and mentored a team of web developers across marketing and platform projects
- Worked across nearly every public-facing SOE property, from game title sites to platform tools
- Built SOE's internal frameworks for <span class="tech">Facebook</span> integrations during peak social gaming growth
- Collaborated with artists and producers on tight timelines across multiple shipped titles

**Technical Toolset** <span class="tech">Java</span>, <span class="tech">Dojo</span>, <span class="tech">Prototype</span>, <span class="tech">Velocity</span>, <span class="tech">Tomcat</span>, <span class="tech">Perforce</span>

------

### Education

**Bachelor of Computer Information Systems** __2000 to 2003__
DeVry University, Phoenix, Arizona


### Let's Collaborate

I'm passionate about driving technological innovation and creating impactful solutions. If you're seeking a seasoned technologist to help transform your organization's vision into reality, let's connect and explore the possibilities.

#### Contact Me

- Email: [ben@neil-concepts.com](mailto:ben@neil-concepts.com)

---

<script>
document.addEventListener('DOMContentLoaded', () => {
  console.log('Resume game script loading...');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const scoreElement = document.getElementById('score');
  const container = document.querySelector('.spaceship-container');
  console.log('Elements found:', { startButton, restartButton, scoreElement, container });
  let score = 0;
  let gameInterval;

  function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
    // Trigger score animation
    scoreElement.style.animation = 'none';
    setTimeout(() => {
      scoreElement.style.animation = 'scoreBoost 0.5s ease-out';
    }, 10);
  }

  function explodeSpaceship(event) {
    const spaceship = event.target;
    
    // Get current position and stop the rocket animation
    const rect = spaceship.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    spaceship.style.animation = 'none';
    spaceship.style.left = (rect.left - containerRect.left + rect.width/2 - 6) + 'px';
    spaceship.style.top = (rect.top - containerRect.top + rect.height/2 - 20) + 'px';
    spaceship.style.position = 'absolute';
    
    // Change to explosion and animate
    spaceship.textContent = '💥';
    spaceship.classList.add('explosion');
    
    // Remove click listener to prevent multiple clicks
    spaceship.removeEventListener('click', explodeSpaceship);
    
    score++;
    updateScore();

    setTimeout(() => {
      spaceship.remove();
    }, 500);
  }

  function createSpaceship() {
    const spaceship = document.createElement('div');
    spaceship.className = 'spaceship';
    spaceship.textContent = '👾';
    container.appendChild(spaceship);

    spaceship.style.top = `${Math.random() * 80}vh`;
    spaceship.style.animationDelay = `${Math.random() * 10}s`;

    spaceship.addEventListener('click', explodeSpaceship);
  }

  function startGame() {
    console.log('Starting game...');
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    score = 0;
    updateScore();
    container.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        setTimeout(() => createSpaceship(), i * 200);
    }
  }

  function restartGame() {
    startGame();
  }

  if (startButton && restartButton) {
    console.log('Game buttons found, attaching event listeners');
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
  } else {
    console.error('Game buttons not found:', { startButton, restartButton });
  }
});
</script>