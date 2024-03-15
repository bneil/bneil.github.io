+++
title = "Resume"
slug = "resume"
date = "2020-10-20"
description = "resume"
noComment = true
+++

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
    transform: translateX(-100%); /* Start off-screen */
  }
  100% {
    transform: translateX(calc(100vw + 100%)); /* Move off-screen on the right */
  }
}


</style>



## Driven Technologist: Transforming Visions into Realities

<img class="thumbnail" src="/images/wild-report.jpg" width="320" align="left" /><p/>


Over a decade of experience in spearheading cutting-edge technological solutions, bridging the gap between business objectives and technical excellence. A technical leader with a proven track record of architecting scalable, resilient, and high-performance systems that drive innovation and propel growth.

With a deep passion for continuous learning and an unwavering commitment to staying ahead of the curve, I thrive in dynamic environments where challenges are met with creative problem-solving and a relentless pursuit of excellence.

But most importantly im able <br/>

🚀👩‍💻🔥 to use 💻⚡️🌟 emojis 🏆⌨️💪 for great good! 🥳🎉 

### Technology Summary

**Frontend:** Vue.js, Next.js/React, Backbone.js (yeah ive been at this awhile)<br/>
**Backend:** Go, Rust, Scala, Akka, Java, Thrift/Protobuf, NATS<br/>
**DevOps:** Docker, Kubernetes, Jenkins, Drone, GitLab, Ambassador, OpenFaaS<br/>
**Databases:** PostgreSQL, MySQL, Redis, Cassandra, Turso, Pocketbase<br/>
**Clouds:** AWS, GCP, Fly.io<br/>

<i>Ive left alot off this list in the hopes it wouldn't be distracting. Lots of technology has come and gone over the past twenty years</i>

------
<div class="spaceship-container"></div>

### Experience

**Compliable** *CTO Co-Founder* __Sept 2020 to Present__<br/>

Same role just now with a new name!

**Technical Toolset** Docker, Aws Stack, Go

**REBRIC** *Chief Technical Officer* __Nov 2016 to Sept 2020__ <br/>

- Lead the long-term technical strategy development and tactical execution of those strategies at Rebric
- Directed technical teams and resources in solutions for design, development and delivery services to benefit the buisness
- Developed a road map to optimize the rollout of the Rebric infrastructure
- Launched development, testing and production environments for all Rebric infrastructure
- Articulated a clear vision, to drive technical discussions throughout the SDLC lifecycle to be in parity with the buisness

**Technical Toolset** Docker, Jenkins, Ambassador, Play, Rust, Go Microservices, OpenFaas, GCP, AWS.

**REBRIC** *Senior Consultant* __Nov 2016 to Feb 2020__<br/>

- Working as a consultant to help companies modernize their architecture which includes evangelizing kubernetes, docker swarm mode, jenkins and general civil discourse
- Contributed to a large shared groovy pipeline
- Cordinated host upgrades within a very structured entrprise environment
- Mentored and held brown bag session on containerization technology
- Proposed, designed and implemented a realtime deployment tracker used by XLR
- Created a custom alarm dashboard for quick diagnose of microservice issues

**Technical Toolset** Docker, Jenkins, Bitbucket, Go

------
**AppThis LLC** *Senior Fullstack Engineer* __Mar 2015 to Nov 2016__ <br/>

- Primary sysadmin / devops lead for the entirety of the AppThis infrastructure
- Created a monitoring platform that integrates applications written in python, node, scala and php using ganglia/graphana as a front.
- Created a "link-validator" that is able to validate every offer in the AppThis system through a world wide proxy which has generated millions in revenue by removing broken ads and cultivating more responsive networks
- Contributed in creating a video platform that was able to serve 2k requests per second on all major mobile phone devices
- Developed a real time log aggregation pipeline that spans each aws region that incorporates a resilient pub/sub consumer application which can self heal during any downtime that AppThis experiences
- Gave programming sessions on diverse topics including advanced functional programming using Scala/Erlang

**Technical Toolset** Scala, Akka, RabbitMQ, AWS, ScalaTest, SaltStack

------
**Dire Wolf Digital** *Senior Engineer* __Jul 2011 to Mar 2015__ <br/>

- Tasked with adapting and expanding the DWD infrastructure to meet the goals of internal and external stake holders.
- Customized Chef recipes/cookbooks for use in deployment to Amazon EC2 and automated control through RunDeck
- Produce modules to support ejabberd chat, which is used in all public facing DWD games
- Developed scripts used to migrate large amounts of information from expiring games to new database infrastructure. (75 million rows converted under twenty minutes)
- Designed and implemented internal tools utilized by all projects at DWD

**Technical Toolset** Scala, Akka, Bootstrap, Backbone.js, Thrift/Protobuf, Cassandra, Postgres

------
**Sony Online Entertainment** *Lead Developer* __May 2006 to Jul 2011__ <br/>

- Lead, manage and mentor a team of web developers to align strategic goals of the company
- Work closely with artists and producers on projects with short changing deadlines; develop feature-rich websites and applications.
- Create and maintain high volume websites and work towards the success of many projects for both the marketing and platform departments.
- Developed SOE frameworks for Facebook and helped build out strategies for client and server-side technologies to meet those growing ends.
- Designed, maintained and worked with every website at SOE and contributed to the success of many titles for the company.
- Trained consistently on new technologies to adapt to current and future projects to create the best scalable web frameworks for SOE and partners.

**Technical Toolset** Java, Dojo, Prototype, Velocity, Tomcat, Perforce

------

### Education

**Bachelor of Computer Information Systems** __2000 to 2003__
DeVry University, Phoenix, Arizona


### Let's Collaborate

Are you seeking a seasoned technologist to drive innovation and unlock new possibilities for your organization? Let's connect and explore how we can join forces to bring your vision to life.

#### Contact Me

- Email: [ben@neil-concepts.com](mailto:ben@neil-concepts.com)


---

<script>
function explodeSpaceship(event) {
  const spaceship = event.target;
  spaceship.textContent = '💥';

  setTimeout(() => {
    spaceship.remove();
  }, 1000);
}

function createSpaceships(count) {
  const container = document.querySelector('.spaceship-container');

  for (let i = 0; i < count; i++) {
    const spaceship = document.createElement('div');
    spaceship.className = 'spaceship';
    spaceship.textContent = '👾';
    container.appendChild(spaceship);

    spaceship.style.top = `${Math.random() * 80}vh`;
    spaceship.style.animationDelay = `${Math.random() * 10}s`;

    spaceship.addEventListener('click', explodeSpaceship);
  }
}


createSpaceships(5);

</script>
