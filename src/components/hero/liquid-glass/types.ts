export type Droplet = {
  id: number;
  x: number;
  y: number;
  r: number;
  area: number;
  vx: number;
  vy: number;
  alive: boolean;
  wanderAngle: number;
  wanderSpeed: number;
  softPrevX: number;
  softPrevY: number;
  softOffX: number;
  softOffY: number;
  softVelX: number;
  softVelY: number;
};

export type MouseState = {
  x: number;
  y: number;
  active: boolean;
  down: boolean;
};
