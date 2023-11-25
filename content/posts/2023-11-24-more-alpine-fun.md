---
title: more-alpine-fun
description: "Little after thanksgiving coding"
date: 2023-11-25T04:22:04.784Z
preview: ""
draft: false
tags: ["NaBloPoMo2023"]
categories: ["challenge"]
---

Started thinking that I wanted to have an explosion after someone signs up for an email. So I started researching how one would create an explosion. Found some code similar code for jquery that seems like it may work. Like much of my actual css/javascript experience when working with particles, so much feels like a hail mary. 

```javascript
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createParticle(id, x, y) {
    return {
        id,
        x,
        y,
        scale: 1,
        speed: randomInt(1, 5),
        angle: randomInt(0, 360),
        rotation: randomInt(0, 360),
    };
}

function updateParticles(particles) {
    particles.forEach((particle, index) => {
        particle.x += Math.cos((particle.angle * Math.PI) / 180) * particle.speed;
        particle.y += Math.sin((particle.angle * Math.PI) / 180) * particle.speed;
        particle.speed *= 0.98;
        particle.scale *= 0.98;
        particle.rotation += 5;

        if (particle.scale < 0.1) {
            particles.splice(index, 1);
        }
    });
}
```

looks like the css is something like this

```css
.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #ff0;
    border-radius: 50%;
    transform-origin: center center;
}
```

So that should look like some nice confetti. After spending some time, I was unable to actually get it showing up with Alpine, but as I make progress, ill let you know. Right now the 'explosion' code looks like

```javascript
    const buttonRect = this.$el.querySelector('button').getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        const particle = createParticle(
                Date.now() + i, //for the id
                buttonRect.left + buttonRect.width / 2, //little wiggle
                buttonRect.top + buttonRect.height / 2 //little wobble
        );

        this.particles.push(particle);
    }

    const animate = () => {
        updateParticles(this.particles);
        requestAnimationFrame(animate);
    };

    animate();
```

So feels like im close, im creating 30 particles near the button that is doing the action. So I think im just messing up something simple. But im also trying to relax while watching 'Me, Myself and Irene', so im kinda snorting while programming right now. So till tomorrow!