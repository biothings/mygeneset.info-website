<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-35 -35 70 70">
    <ellipse class="shadow" cx="0" cy="30" rx="20" ry="5" />

    <g class="contents">
      <g class="briefcase">
        <rect
          class="handle"
          x="-7.5"
          y="-28"
          width="15"
          height="11"
          rx="3"
          ry="3"
        />

        <rect
          class="body"
          x="-30"
          y="-20"
          width="60"
          height="40"
          rx="5"
          ry="5"
        />

        <rect
          class="shine"
          x="-27"
          y="-17"
          width="54"
          height="34"
          rx="3"
          ry="3"
        />
      </g>

      <g class="dna">
        <line class="pair" x1="-16.5" y1="-6" x2="-16.5" y2="6" />
        <line class="pair" x1="-3.5" y1="6" x2="-3.5" y2="-6" />
        <line class="pair" x1="0" y1="-7.07" x2="0" y2="7.07" />
        <line class="pair" x1="3.5" y1="6" x2="3.5" y2="-6" />
        <line class="pair" x1="16.5" y1="-6" x2="16.5" y2="6" />

        <path
          class="strand_outline"
          d="
            M -20 7.07
            A 7.07 7.07 0 0 0 -15 5
            L -5 -5
            A 7.07 7.07 0 0 1 0 -7.07
          "
        />

        <path
          class="strand_a"
          d="
            M -20 7.07
            A 7.07 7.07 0 0 0 -15 5
            L -5 -5
            A 7.07 7.07 0 0 1 0 -7.07
          "
        />

        <path
          class="strand_outline"
          d="
            M -20 -7.07
            A 7.07 7.07 0 0 1 -15 -5
            L -5 5
            A 7.07 7.07 0 0 0 5 5
            L 15 -5
            A 7.07 7.07 0 0 1 20 -7.07
          "
        />

        <path
          class="strand_b"
          d="
            M -20 -7.07
            A 7.07 7.07 0 0 1 -15 -5
            L -5 5
            A 7.07 7.07 0 0 0 5 5
            L 15 -5
            A 7.07 7.07 0 0 1 20 -7.07
          "
        />

        <path
          class="strand_outline strand_delay"
          d="
            M -0.05 -7.07
            L 0 -7.07
            A 7.07 7.07 0 0 1 5 -5
            L 15 5
            A 7.07 7.07 0 0 0 20 7.07
          "
        />

        <path
          class="strand_a strand_delay"
          d="
            M -0.1 -7.07
            L 0 -7.07
            A 7.07 7.07 0 0 1 5 -5
            L 15 5
            A 7.07 7.07 0 0 0 20 7.07
          "
        />
      </g>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.shadow {
  fill: #00000010;
  animation: shadow 4s cubic-bezier(0.5, 0, 0.5, 1) forwards infinite;
}

@keyframes shadow {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
  100% {
    transform: scaleX(1);
  }
}

.contents {
  animation: contents 4s cubic-bezier(0.4, 0, 0.6, 1) forwards infinite;
}

@keyframes contents {
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
}

.briefcase {
  transition: transform ease 1s, opacity ease 0.5s;
  transform: scale(1);
  opacity: 1;
}

svg:hover .briefcase {
  transform: scale(1.5);
  opacity: 0;
}

.handle {
  fill: none;
  stroke: #264653;
  stroke-width: 2;
}

.body {
  fill: #81d4fa;
  stroke: #264653;
  stroke-width: 2;
}

.shine {
  fill: none;
  stroke: #caf0f8;
  stroke-width: 1;
  animation: shine 8s linear forwards infinite;
}

@keyframes shine {
  0% {
    stroke-dasharray: 5 80.425;
    stroke-dashoffset: 85.425;
  }
  50% {
    stroke-dasharray: 20 65.425;
  }
  100% {
    stroke-dasharray: 5 80.425;
    stroke-dashoffset: 0;
  }
}

.dna {
  transition: transform 0.5s ease;
}

svg:hover .dna {
  transform: rotate(-22.5deg) scale(1.5);
}

.pair {
  fill: none;
  stroke: #264653;
  stroke-width: 1.5;
  stroke-dasharray: 15 0;
  animation: pair 8s ease forwards infinite;
}

.pair:nth-child(1) {
  animation-delay: calc(0.1s + 0.25s * 1);
}

.pair:nth-child(2) {
  animation-delay: calc(0.1s + 0.25s * 3);
}

.pair:nth-child(3) {
  animation-delay: calc(0.1s + 0.25s * 4);
}

.pair:nth-child(4) {
  animation-delay: calc(0.1s + 0.25s * 5);
}

.pair:nth-child(5) {
  animation-delay: calc(0.1s + 0.25s * 7);
}

@keyframes pair {
  0% {
    stroke-dasharray: 15 0;
  }
  35% {
    stroke-dasharray: 15 0;
  }
  45% {
    stroke-dasharray: 0 15;
  }
  75% {
    stroke-dasharray: 0 15;
  }
  85% {
    stroke-dasharray: 15 0;
  }
  100% {
    stroke-dasharray: 15 0;
  }
}

.strand_outline {
  fill: none;
  stroke: #264653;
  stroke-width: 4;
}

.strand_a,
.strand_b {
  fill: none;
  stroke-width: 1.5;
}

.strand_outline,
.strand_a,
.strand_b {
  stroke-dasharray: 50.5 50.5;
  stroke-dashoffset: 202;
  animation: strand linear 8s forwards infinite;
}

.strand_a {
  stroke: #ef5350;
}

.strand_b {
  stroke: #ffc107;
}

@keyframes strand {
  0% {
    stroke-dashoffset: 202;
  }
  50% {
    stroke-dashoffset: 202;
  }
  75% {
    stroke-dashoffset: 151.5;
  }
  100% {
    stroke-dashoffset: 101;
  }
}

.strand_delay {
  animation-delay: 1s;
}
</style>
