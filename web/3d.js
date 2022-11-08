function init() {
    if (timerId !== undefined) clearInterval(timerId);
    world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s²
    world.defaultContactMaterial.contactEquationStiffness = 1e6;
    world.defaultContactMaterial.contactEquationRegularizationTime = 3;
    world.solver.iterations = 30;
    world.allowSleep = true;
    world.broadphase = new CANNON.SAPBroadphase(this.world);

    // Create a plane
    ground = new CANNON.Body({
        mass: 0 // mass=0 will produce a static body automatically
    });
    ground.addShape(new CANNON.Box(new CANNON.Vec3(500, 500, 10))); //new CANNON.Plane()
    world.addBody(ground);
    lastTime = second();
    addNew();
    timerId = setInterval(physics);
}

function physics() {
    if (lastTime !== undefined) {
        //var dt = (time - lastTime) / 1000;
        var dt = (second() - lastTime) / 1000;
        world.step(fixedTimeStep); //, dt, maxSubSteps);
    }

    lastTime = second();
}

function addNew() {
    let newBody = new CANNON.Body({
        mass: 500, // kg
        //allowSleep: true,
        position: new CANNON.Vec3(random(-50, 50), random(-50, 50), random(800, 1800)), // m
        // shape: new CANNON.Box(new CANNON.Vec3(random(40, 90), random(40, 90), random(40, 90)))
        shape: new CANNON.Sphere(random(30,50))
    });
    // newBody.quaternion.setFromAxisAngle(new CANNON.Vec3(random(), random(), random()), random(2 * Math.PI));
    let s = floor(random(5));
    newBody.fill = pFill[0];
    newBody.stroke = pStroke[0];
    newBody.restitution = 0;

    world.addBody(newBody);
}

var angle = 0

function drawShapes() {

    
    if (frameCount % 10 == 0) gfr = (gfr + frameRate()) / 2;


    // var axis = new CANNON.Vec3(x,y,z);
    // var angle = Math.PI / 3;
    // var angle = 0.3;
    var axis = new CANNON.Vec3(x,y,1);
    ground.quaternion.setFromAxisAngle(axis, 1);
    // angle += 0.001

    push();
    //lights();
    cam.apply();
    
        // Ground
        push();
        //noStroke();

            stroke(63);
            strokeWeight(2);
            
            // translate(0, 0, -0.5); // drop the floor a bit

            let rot = new CANNON.Vec3();
            ground.quaternion.toEuler(rot);

            translate(0,0,0);

            rotateY(rot.y);
            rotateZ(rot.z);
            rotateX(rot.x);
            // rotateX(x);
            // rotateY(y);
            
            // rotateZ(z);
            // rotate(1,createVector(x, y,z));
            //plane(1000);
            for (let i = 0; i <= 10; i++) {
                line(i * 100 - 500, -500, 0, i * 100 - 500, 500, 0);
                line(-500, i * 100 - 500, 0, 500, i * 100 - 500, 0);
            }


            // fill(255, 255, 255, 0);
            fill(0,100);
            rect(-500, -500, 1000, 1000);
        pop();

        directionalLight(63, 102, 127, 1, 1, 0);
        pointLight(255, 127, 0, 0, 0, 0);
        pointLight(255, 25, 0, 0, -1000, 1000);
        ambientMaterial(153);

        for (let i = 1; i < world.bodies.length; i++) {
            let body = world.bodies[i];
            push();
            //fill(body.fill[0],body.fill[1],body.fill[2]);
            //stroke(body.stroke[0],body.stroke[1],body.stroke[2]);
            //strokeWeight(0.5);
            noStroke();
            translate(body.position.x, body.position.y, body.position.z);
            let rot = new CANNON.Vec3();
            body.quaternion.toEuler(rot);
            //console.log(body.restitution)
            rotateY(rot.y);
            rotateZ(rot.z);
            rotateX(rot.x);
            // let s = body.shapes[0].halfExtents;
            // box(s.x * 2, s.y * 2, s.z * 2);
            let r = body.shapes[0].radius
            // console.log(body)
            sphere(r)
            pop();
        }
        for (let i = 1; i < world.bodies.length; i++) {
            if (world.bodies[i].position.z < -0){
                world.removeBody(world.bodies[i]);
                serial.write('b');
            }
                
        }
    pop();

    push(); // HUD display: world coordinates
        ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 5000);
        noStroke();
        fill(63);
        rect(-width / 2 + 16, -height / 2 + 78, 99, 29);
        rect(-width / 2 + 16, -height / 2 + 112, 99, 29);
        fill(255);
        text(nfs(gfr, 1, 2), -width / 2 + 20, -height / 2 + 40);
        text(world.bodies.length, -width / 2 + 20, -height / 2 + 70);
        text("Reset", -width / 2 + 20, -height / 2 + 100);
        text("Drop", -width / 2 + 20, -height / 2 + 132);
    pop();
}