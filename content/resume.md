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
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: #004d1a;
  background-color: #f5f5f5;
  border: 2px solid #004d1a;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 77, 26, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.retro-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 77, 26, 0.4);
  background-color: rgba(0, 77, 26, 0.1);
}

.retro-button:active {
  transform: translateY(0);
  box-shadow: 0 0 10px rgba(0, 77, 26, 0.2);
}

/* Dark mode button override */
@media (prefers-color-scheme: dark) {
  .retro-button {
    color: #00ff41;
    background-color: #001a00;
    border-color: #00ff41;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
  }
  
  .retro-button:hover {
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.4);
    background-color: rgba(0, 255, 65, 0.1);
  }
  
  .retro-button:active {
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
  }
}
</style>

<p style="text-align:center; position:absolute; top: 10%; right: 25%">
<button onclick="window.open('/resume.pdf', '_new')" class="retro-button" onclick="savePDF()">TAKE A COPY OF MY RESUME TOGO</button>
</p>

## Taking Systems From Complex to Automated
...and an avid bug squisher 🚫👾 wherever they popup

<div id="game-container" style="position: relative; height: 120px; border: 1px solid #ccc; overflow: hidden; margin-bottom: 20px;">
  <div class="spaceship-container"></div>
  <div id="game-controls" style="position: absolute; top: 10px; left: 10px; z-index: 100;">
    <button id="start-button" class="retro-button">Start Game</button>
    <button id="restart-button" class="retro-button" style="display: none;">Restart</button>
    <div id="score" style="margin-top: 10px; font-size: 1.4em; font-weight: bold; color: #00ff41; text-shadow: 0 0 10px #00ff41; transition: all 0.3s ease;">Score: 0</div>
  </div>
</div>

## About me...

<img class="thumbnail" src="/images/wild-report.jpg" width="320" align="left" /><p/>

Over a decade of experience in developing cutting-edge technological solutions, bridging the gap between business objectives and technical excellence. A technical leader with a proven track record of architecting scalable, resilient, and high-performance systems that drive innovation and propel growth.

With a deep passion for continuous learning and an unwavering commitment to staying ahead of the curve, I thrive in dynamic environments where challenges are met with creative problem-solving and technical innovation.

But most importantly im able <br/>

🚀👩‍💻🔥 to use 💻⚡️🌟 emojis 🏆⌨️💪 for great good! 🥳🎉 

### Technology Summary

**Frontend:** <span class="tech">Vue.js</span>, <span class="tech">Next.js</span>/<span class="tech">React</span>, <span class="tech">Flutter</span>/<span class="tech">Dart</span>, <span class="tech">Backbone.js</span><br/>
**Backend:** <span class="tech">Go</span>, <span class="tech">TypeScript</span>, <span class="tech">Rust</span>, <span class="tech">Scala</span>, <span class="tech">Akka</span>, <span class="tech">Java</span>, <span class="tech">Thrift</span>/<span class="tech">Protobuf</span>, <span class="tech">NATS</span><br/>
**DevOps:** <span class="tech">Docker</span>, <span class="tech">Kubernetes</span>, <span class="tech">Terraform</span>, <span class="tech">GitHub Actions</span>, <span class="tech">GitLab CI</span>, <span class="tech">Vault</span>, <span class="tech">Helm</span><br/>
**Databases:** <span class="tech">PostgreSQL</span>, <span class="tech">SQLite</span>, <span class="tech">Redis</span>, <span class="tech">DynamoDB</span>, <span class="tech">Elasticsearch</span>, <span class="tech">Kafka</span><br/>
**Clouds:** <span class="tech">AWS</span>, <span class="tech">GCP</span>, <span class="tech">Fly.io</span>, <span class="tech">Firebase</span><br/>

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
    0% {
      transform: scale(1);
      color: #00ff41;
      text-shadow: 0 0 10px #00ff41;
    }
    50% {
      transform: scale(1.3);
      color: #ffff00;
      text-shadow: 0 0 20px #ffff00;
    }
    100% {
      transform: scale(1);
      color: #00ff41;
      text-shadow: 0 0 10px #00ff41;
    }
  }
</style>


### Experience

**Modernize** *Consultant* __July 2024 to Present__<br/>

As a Senior Application Architect for ProWallet, I've focused on:
- Implementing Infrastructure as Code solutions with <span class="tech">Terraform</span>
- Establishing mobile deployment pipelines with <span class="tech">CodeMagic.io</span>
- Contributing <span class="tech">Flutter</span>/<span class="tech">Dart</span> mobile app development initiatives
- Integrating financial services with <span class="tech">Plaid</span>, Treasury Prime, and Incomm
- Modernizing legacy systems with <span class="tech">TypeScript</span> and <span class="tech">Firebase</span>
- Facilitating enterprise migration from Microsoft 365 to Google Suite

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

- Started as CTO in the early days, building proof of concept apps to get VCs excited
- Made it into TechStars 2019 Western Union Accelerator (pretty rad!)
- Helped other companies modernize their tech while we figured out our own path
- Specialized in making <span class="tech">DevOps</span> and <span class="tech">AWS</span> pipelines more approachable for established companies

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

- Lead, manage and mentor a team of web developers to align strategic goals of the company
- Work closely with artists and producers on projects with short changing deadlines; develop feature-rich websites and applications
- Create and maintain high volume websites and work towards the success of many projects for both the marketing and platform departments
- Developed SOE frameworks for <span class="tech">Facebook</span> and helped build out strategies for client and server-side technologies to meet those growing ends
- Designed, maintained and worked with every website at SOE and contributed to the success of many titles for the company
- Trained consistently on new technologies to adapt to current and future projects to create the best scalable web frameworks for SOE and partners

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