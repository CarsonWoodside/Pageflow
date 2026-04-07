import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createCanvas } from '@napi-rs/canvas';

const publicDir = join(process.cwd(), 'public');
mkdirSync(publicDir, { recursive: true });

const brand = '#2D4A3E';
const parchment = '#F5F0E8';

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = parchment;
  ctx.fillRect(0, 0, size, size);

  const inset = size * 0.12;
  const width = size - inset * 2;
  const height = size - inset * 2;

  ctx.fillStyle = brand;
  ctx.beginPath();
  ctx.moveTo(inset, inset + height * 0.14);
  ctx.quadraticCurveTo(inset, inset, inset + width * 0.12, inset);
  ctx.lineTo(inset + width * 0.44, inset + height * 0.12);
  ctx.quadraticCurveTo(inset + width * 0.5, inset + height * 0.15, inset + width * 0.5, inset + height * 0.24);
  ctx.lineTo(inset + width * 0.5, inset + height * 0.88);
  ctx.quadraticCurveTo(inset + width * 0.48, inset + height * 0.82, inset + width * 0.38, inset + height * 0.8);
  ctx.lineTo(inset + width * 0.12, inset + height * 0.74);
  ctx.quadraticCurveTo(inset, inset + height * 0.72, inset, inset + height * 0.58);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(inset + width, inset + height * 0.14);
  ctx.quadraticCurveTo(inset + width, inset, inset + width * 0.88, inset);
  ctx.lineTo(inset + width * 0.56, inset + height * 0.12);
  ctx.quadraticCurveTo(inset + width * 0.5, inset + height * 0.15, inset + width * 0.5, inset + height * 0.24);
  ctx.lineTo(inset + width * 0.5, inset + height * 0.88);
  ctx.quadraticCurveTo(inset + width * 0.52, inset + height * 0.82, inset + width * 0.62, inset + height * 0.8);
  ctx.lineTo(inset + width * 0.88, inset + height * 0.74);
  ctx.quadraticCurveTo(inset + width, inset + height * 0.72, inset + width, inset + height * 0.58);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = parchment;
  ctx.lineWidth = Math.max(4, size * 0.024);
  ctx.beginPath();
  ctx.moveTo(size / 2, inset + height * 0.2);
  ctx.lineTo(size / 2, inset + height * 0.82);
  ctx.stroke();

  return canvas.toBuffer('image/png');
}

for (const size of [192, 512]) {
  const buffer = drawIcon(size);
  writeFileSync(join(publicDir, `icon-${size}.png`), buffer);
}
