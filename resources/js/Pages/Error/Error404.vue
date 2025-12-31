<template>
  <div class="error-page flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
    <p class="text-lg mb-6">Oops! Looks like you got lost. Play this mini-game while you're here!</p>
    
    <div class="game-container relative w-[600px] h-[400px] bg-blue-100 border-2 border-blue-500 rounded-lg overflow-hidden">
      <canvas ref="gameCanvas" width="600" height="400"></canvas>
      <div class="absolute top-2 left-2 text-xl font-bold">Score: {{ score }}</div>
      <div v-if="gameOver" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="text-center text-white">
          <h2 class="text-3xl mb-4">Game Over!</h2>
          <p class="text-xl mb-4">Final Score: {{ score }}</p>
          <button @click="restartGame" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Play Again</button>
        </div>
      </div>
    </div>
    <router-link to="/data-mapping" class="mt-6 text-blue-500 hover:underline">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {
      score: 0,
      gameOver: false,
      basket: { x: 250, width: 100, height: 20, speed: 100 },
      items: [],
      lastTime: 0,
      itemSpawnRate: 1000, // milliseconds
      lastSpawn: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.setupControls();
    this.startGame();
  },
  methods: {
    setupControls() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && this.basket.x > 0) {
          this.basket.x -= this.basket.speed;
        }
        if (e.key === 'ArrowRight' && this.basket.x < this.canvas.width - this.basket.width) {
          this.basket.x += this.basket.speed;
        }
      });
    },
    spawnItem() {
      const item = {
        x: Math.random() * (this.canvas.width - 20),
        y: 0,
        width: 20,
        height: 20,
        speed: 2 + Math.random() * 2,
      };
      this.items.push(item);
    },
    updateGame(timestamp) {
      if (this.gameOver) return;

      if (timestamp - this.lastSpawn > this.itemSpawnRate) {
        this.spawnItem();
        this.lastSpawn = timestamp;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw basket
      this.ctx.fillStyle = 'brown';
      this.ctx.fillRect(this.basket.x, this.canvas.height - this.basket.height, this.basket.width, this.basket.height);

      // Update and draw items
      this.items = this.items.filter(item => item.y < this.canvas.height);
      this.items.forEach(item => {
        item.y += item.speed;
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(item.x, item.y, item.width, item.height);

        // Check for collision with basket
        if (
          item.y + item.height > this.canvas.height - this.basket.height &&
          item.x + item.width > this.basket.x &&
          item.x < this.basket.x + this.basket.width
        ) {
          this.score += 10;
          this.items = this.items.filter(i => i !== item);
        }

        // Check for missed items
        if (item.y >= this.canvas.height) {
          this.gameOver = true;
        }
      });

      if (!this.gameOver) {
        requestAnimationFrame(this.updateGame.bind(this));
      }
    },
    startGame() {
      this.score = 0;
      this.gameOver = false;
      this.items = [];
      this.lastSpawn = 0;
      requestAnimationFrame(this.updateGame.bind(this));
    },
    restartGame() {
      this.startGame();
    },
  },
  beforeUnmount() {
    this.gameOver = true;
    window.removeEventListener('keydown', this.setupControls);
  },
};
</script>

<style scoped>
.error-page {
  font-family: Arial, sans-serif;
}
.game-container {
  position: relative;
}
</style>