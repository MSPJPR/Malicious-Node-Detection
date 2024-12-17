class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.reputation = 100;  // Default reputation
    this.isMalicious = false;
    this.lastBehavior = 'normal';  // Track last behavior
  }

  move() {
    // Logic to move nodes around the screen
    this.x += Math.random() * 10 - 5; // Random movement
    this.y += Math.random() * 10 - 5;
  }

  updateReputation() {
    if (this.isMalicious) {
      this.reputation -= 10;  // Decrease reputation for malicious nodes
    } else {
      this.reputation += 5;   // Increase reputation for normal nodes
    }

    // Reputation decay: decrease over time
    this.reputation = Math.max(this.reputation - 0.1, 0);  // Decay value, never go below 0
  }

  resetReputation() {
    this.reputation = 100;  // Reset to initial value
  }

  performBehavior() {
    // Randomly decide if the node will act malicious or not
    if (Math.random() < 0.2) {
      this.isMalicious = true;
      this.lastBehavior = 'malicious';
    } else {
      this.isMalicious = false;
      this.lastBehavior = 'normal';
    }
  }
}

const nodes = [];
const nodeCount = 20;  // Increased number of nodes for better scalability
const maliciousThreshold = 50;  // Threshold to identify malicious nodes

// Create nodes
for (let i = 0; i < nodeCount; i++) {
  let x = Math.random() * 400;
  let y = Math.random() * 400;
  nodes.push(new Node(i, x, y));
}

function renderNodes() {
  const networkDiv = document.getElementById('network');
  networkDiv.innerHTML = '';

  nodes.forEach(node => {
    const nodeDiv = document.createElement('div');
    nodeDiv.classList.add('node');
    nodeDiv.style.left = node.x + 'px';
    nodeDiv.style.top = node.y + 'px';

    if (node.isMalicious) {
      nodeDiv.classList.add('malicious');
    }

    networkDiv.appendChild(nodeDiv);
  });
}

function simulateNetwork() {
  nodes.forEach(node => {
    node.move();
    node.updateReputation();
    node.performBehavior();  // Perform random behavior (malicious or normal)
  });

  // Check for malicious nodes and trigger alerts if needed
  nodes.forEach(node => {
    if (node.reputation < maliciousThreshold && !node.isMalicious) {
      node.isMalicious = true;  // Make it malicious if its reputation is too low
      alert(`Node ${node.id} is now considered malicious!`);
    }
  });

  renderNodes();
}

// Function to send packet and affect a random node's reputation
function sendPacket() {
  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
  if (Math.random() < 0.5) {
    randomNode.reputation -= 20;  // Decrease reputation when a packet is sent (simulating a failed node)
    alert(`Packet sent to Node ${randomNode.id}. Reputation decreased.`);
  } else {
    randomNode.reputation += 10;  // Increase reputation for successful packet forwarding
    alert(`Packet sent to Node ${randomNode.id}. Reputation increased.`);
  }
}

setInterval(simulateNetwork, 1000); // Update every second
