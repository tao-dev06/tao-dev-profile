const canvas = document.getElementById("signalCanvas");
const context = canvas.getContext("2d");
const nodes = [];
const nodeCount = 56;

function resizeCanvas() {
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function seedNodes() {
  nodes.length = 0;
  for (let index = 0; index < nodeCount; index += 1) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      radius: Math.random() * 1.8 + 0.7
    });
  }
}

function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  nodes.forEach((node) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
    if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(72, 216, 255, 0.78)";
    context.fill();
  });

  for (let a = 0; a < nodes.length; a += 1) {
    for (let b = a + 1; b < nodes.length; b += 1) {
      const dx = nodes[a].x - nodes[b].x;
      const dy = nodes[a].y - nodes[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        context.beginPath();
        context.moveTo(nodes[a].x, nodes[a].y);
        context.lineTo(nodes[b].x, nodes[b].y);
        context.strokeStyle = `rgba(183, 255, 90, ${0.14 * (1 - distance / 150)})`;
        context.lineWidth = 1;
        context.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  seedNodes();
});

resizeCanvas();
seedNodes();
draw();
