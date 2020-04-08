function ParticleSystem(graphics, spec) {
    let that = {};
    let particles = [];

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        spec.image = loadImage(spec.image);

        that.draw = function() {
            //graphics.drawRectangle(spec);
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }

    that.update = function(elapsedTime, center, angle, makeNew) {
        let keepMe = [];
        spec.center = {
            x: center.x + 30 * Math.cos(angle),
            y: center.y + 30 * Math.sin(angle),
        };
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        if(makeNew) {
            for (let particle = 0; particle < 5; particle++) {
                let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
                let p = create({
                    image: spec.image,
                    center: { x: spec.center.x, y: spec.center.y },
                    size: {x: size, y: size},
                    rotation: 0,
                    speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev)),
                    direction: Random.nextThrustVector(angle),
                    lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),
                });
                particles.push(p);
            }
        }
    };


    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };

    return that;
}


function ParticleSystemCircular(graphics, spec) {
    let that = {};
    let particles = [];
    let more = 5;

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        spec.image = loadImage(spec.image);

        that.draw = function() {
            //graphics.drawRectangle(spec);
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }

    that.update = function(elapsedTime) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        if(more) {
            for (let particle = 0; particle < 15; particle++) {
                let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
                let p = create({
                    image: spec.image,
                    center: { x: spec.center.x, y: spec.center.y },
                    size: {x: size, y: size},
                    rotation: 0,
                    speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                    direction: Random.nextCircleVector(),
                    lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
                });
                particles.push(p);
            }
            more--;
        }
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };

    return that;
}


