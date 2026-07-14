/* Auto-extracted from EaseHawk_TITAN_Website.html — do not hand-edit */
// @ts-nocheck
import * as THREE from "three";

export type TitanUniverseOptions = {
  container: HTMLElement;
  sectionIds: string[];
  isMobile: boolean;
  reduced: boolean;
  getIntroStart: () => number;
};

export function runTitanUniverse(options: TitanUniverseOptions): () => void {
  const { container, sectionIds, isMobile, reduced, getIntroStart } = options;
  const sections = sectionIds;
  /* ================================================================
   THREE.JS UNIVERSE
   ================================================================ */
if (reduced) return () => {};

let renderer: THREE.WebGLRenderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
} catch {
  container.style.display = "none";
  return () => {};
}

const stage = container;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050508, 0.0011);
const camera = new THREE.PerspectiveCamera(58, window.innerWidth/window.innerHeight, 1, 2000);
camera.position.set(0, 0, 330);

const N = isMobile ? 6500 : 13000;
const BRAND = [ new THREE.Color(0xFFDD00), new THREE.Color(0xFF810F), new THREE.Color(0x7D7DDD), new THREE.Color(0xF5F4F8) ];

/* ---- formation generators ---- */
function arr(){ return new Float32Array(N*3); }
const rnd = (a,b)=>a+Math.random()*(b-a);

function palette(weights){ // weights [y,o,v,w]
  const c = new Float32Array(N*3);
  const total = weights.reduce((s,w)=>s+w,0);
  for(let i=0;i<N;i++){
    let r = Math.random()*total, k=0;
    while(r > weights[k]){ r-=weights[k]; k++; }
    const col = BRAND[k];
    const dim = rnd(0.35, 1.0);
    c[i*3]=col.r*dim; c[i*3+1]=col.g*dim; c[i*3+2]=col.b*dim;
  }
  return c;
}

function fGalaxy(){ // hero: spiral nebula around core
  const p = arr();
  for(let i=0;i<N;i++){
    const arm = i%3, t = Math.random();
    const r = 30 + Math.pow(t,0.7)*260;
    const a = arm*(Math.PI*2/3) + t*4.2 + rnd(-0.25,0.25);
    p[i*3]   = Math.cos(a)*r + rnd(-8,8);
    p[i*3+1] = rnd(-1,1)*(26 - t*18) ;
    p[i*3+2] = Math.sin(a)*r + rnd(-8,8);
  }
  return p;
}
function fGrid(){ // strategy: digital twin city grid
  const p = arr();
  const side = Math.ceil(Math.sqrt(N/2));
  for(let i=0;i<N;i++){
    if(i%2===0){ // ground lattice
      const gx = (i/2)%side, gz = Math.floor((i/2)/side);
      p[i*3]   = (gx-side/2)*7 + rnd(-.6,.6);
      p[i*3+1] = -60 + rnd(-.8,.8);
      p[i*3+2] = (gz-side/2)*7 + rnd(-.6,.6);
    }else{ // rising columns
      const cx = Math.floor(rnd(-6,7))*28, cz = Math.floor(rnd(-6,7))*28;
      p[i*3]=cx+rnd(-4,4); p[i*3+1]=-60+Math.random()*rnd(30,120); p[i*3+2]=cz+rnd(-4,4);
    }
  }
  return p;
}
function fSwarm(){ // ai: agent clusters
  const p = arr();
  const hubs = [[0,0,0],[130,40,-30],[-130,30,30],[70,-70,60],[-80,-60,-60],[0,110,-40]];
  for(let i=0;i<N;i++){
    const h = hubs[i%hubs.length];
    const r = Math.pow(Math.random(),0.5)*(i%hubs.length===0?46:30);
    const th = Math.random()*Math.PI*2, ph = Math.acos(rnd(-1,1));
    p[i*3]   = h[0]+r*Math.sin(ph)*Math.cos(th);
    p[i*3+1] = h[1]+r*Math.cos(ph);
    p[i*3+2] = h[2]+r*Math.sin(ph)*Math.sin(th);
  }
  return p;
}
function fStreams(){ // data: converging pipelines
  const p = arr();
  for(let i=0;i<N;i++){
    const lane = i%7, t = Math.random();
    const y0 = (lane-3)*36;
    const x = -240 + t*480;
    const converge = Math.min(1, Math.max(0,(x+60)/180));
    p[i*3]   = x;
    p[i*3+1] = y0*(1-converge*0.92) + rnd(-3,3);
    p[i*3+2] = rnd(-14,14)*(1-converge*0.6);
  }
  return p;
}
function fLattice(){ // cloud: constellation shells
  const p = arr();
  for(let i=0;i<N;i++){
    const shell = [92,150,205][i%3];
    const th = Math.random()*Math.PI*2, ph = Math.acos(rnd(-1,1));
    const snap = 0.22;
    const sth = Math.round(th/snap)*snap + rnd(-0.02,0.02);
    const sph = Math.round(ph/snap)*snap + rnd(-0.02,0.02);
    p[i*3]   = shell*Math.sin(sph)*Math.cos(sth);
    p[i*3+1] = shell*Math.cos(sph);
    p[i*3+2] = shell*Math.sin(sph)*Math.sin(sth);
  }
  return p;
}
function fRings(){ // platforms: orbital rings
  const p = arr();
  for(let i=0;i<N;i++){
    const ring = i%4;
    if(ring===0){ // core sphere
      const r = Math.pow(Math.random(),0.6)*34;
      const th=Math.random()*Math.PI*2, ph=Math.acos(rnd(-1,1));
      p[i*3]=r*Math.sin(ph)*Math.cos(th); p[i*3+1]=r*Math.cos(ph); p[i*3+2]=r*Math.sin(ph)*Math.sin(th);
    }else{
      const R = 70+ring*52, a = Math.random()*Math.PI*2;
      const tilt = ring*0.5;
      const x = Math.cos(a)*R, z = Math.sin(a)*R;
      p[i*3]=x; p[i*3+1]=z*Math.sin(tilt)*0.45+rnd(-2,2); p[i*3+2]=z*Math.cos(tilt);
    }
  }
  return p;
}
function fBlocks(){ // engineering: modular cubes
  const p = arr();
  const cells=[[-70,-40,0],[0,-40,0],[70,-40,0],[-35,25,0],[35,25,0],[0,90,0]];
  for(let i=0;i<N;i++){
    const c = cells[i%cells.length];
    // points on cube surface
    const s = 26;
    const face = Math.floor(Math.random()*6);
    let x=rnd(-s,s), y=rnd(-s,s), z=rnd(-s,s);
    if(face===0)x=s; if(face===1)x=-s; if(face===2)y=s; if(face===3)y=-s; if(face===4)z=s; if(face===5)z=-s;
    p[i*3]=c[0]+x; p[i*3+1]=c[1]+y; p[i*3+2]=c[2]+z*0.6;
  }
  return p;
}
const GLOBE_R = 118;
function fGlobe(){ // global: the earth
  const p = arr();
  for(let i=0;i<N;i++){
    const th = Math.random()*Math.PI*2, ph = Math.acos(rnd(-1,1));
    const band = Math.abs(Math.cos(ph));
    const r = GLOBE_R * (0.995 + (Math.sin(th*6+ph*8)>0.4?0.012:0)) ;
    p[i*3]   = r*Math.sin(ph)*Math.cos(th);
    p[i*3+1] = r*Math.cos(ph)*0.985;
    p[i*3+2] = r*Math.sin(ph)*Math.sin(th);
    if(band>0.93 && Math.random()<0.6){ // thin poles slightly
      p[i*3]*=0.4; p[i*3+2]*=0.4;
    }
  }
  return p;
}
function fHoney(){ // industries: honeycomb wall
  const p = arr();
  const hexR = 26;
  const cols=9, rows=6;
  for(let i=0;i<N;i++){
    const cell = i % (cols*rows);
    const cx = (cell%cols - (cols-1)/2) * hexR*1.78;
    const cyr = Math.floor(cell/cols);
    const cy = (cyr-(rows-1)/2) * hexR*1.54 + (cell%cols%2? hexR*0.77:0);
    const a = Math.floor(Math.random()*6)/6*Math.PI*2 + Math.PI/6;
    const a2 = a + Math.PI/3;
    const t = Math.random();
    p[i*3]   = cx + (Math.cos(a)*(1-t)+Math.cos(a2)*t)*hexR*0.86;
    p[i*3+1] = cy + (Math.sin(a)*(1-t)+Math.sin(a2)*t)*hexR*0.86;
    p[i*3+2] = rnd(-6,6);
  }
  return p;
}
function fWave(){ // work: calm field
  const p = arr();
  const side = Math.ceil(Math.sqrt(N));
  for(let i=0;i<N;i++){
    const gx=i%side, gz=Math.floor(i/side);
    const x=(gx-side/2)*6.4, z=(gz-side/2)*6.4;
    p[i*3]=x;
    p[i*3+1]=-70 + Math.sin(x*0.035)*14 + Math.cos(z*0.03)*14;
    p[i*3+2]=z;
  }
  return p;
}
function fConstellation(){ // products: core + 8 satellites
  const p = arr();
  const sats=[];
  for(let k=0;k<8;k++){ const a=k/8*Math.PI*2; sats.push([Math.cos(a)*165, Math.sin(a)*165*0.5, Math.sin(a)*70]); }
  for(let i=0;i<N;i++){
    if(i%3===0){ // core
      const r=Math.pow(Math.random(),0.55)*52;
      const th=Math.random()*Math.PI*2, ph=Math.acos(rnd(-1,1));
      p[i*3]=r*Math.sin(ph)*Math.cos(th); p[i*3+1]=r*Math.cos(ph)*0.8; p[i*3+2]=r*Math.sin(ph)*Math.sin(th);
    }else if(i%3===1){ // satellites
      const s=sats[i%8];
      const r=Math.pow(Math.random(),0.5)*20;
      const th=Math.random()*Math.PI*2, ph=Math.acos(rnd(-1,1));
      p[i*3]=s[0]+r*Math.sin(ph)*Math.cos(th); p[i*3+1]=s[1]+r*Math.cos(ph); p[i*3+2]=s[2]+r*Math.sin(ph)*Math.sin(th);
    }else{ // threads
      const s=sats[i%8]; const t=Math.random();
      p[i*3]=s[0]*t+rnd(-3,3); p[i*3+1]=s[1]*t+rnd(-3,3); p[i*3+2]=s[2]*t+rnd(-3,3);
    }
  }
  return p;
}
function fHex(){ // finale: the EaseHawk hexagon
  const p = arr();
  const R=120;
  const verts=[];
  for(let k=0;k<6;k++){ const a=k/6*Math.PI*2 - Math.PI/2; verts.push([Math.cos(a)*R, Math.sin(a)*R]); }
  for(let i=0;i<N;i++){
    if(i%5<4){ // hex edges (double stroke like the logo)
      const e=i%6; const a=verts[e], b=verts[(e+1)%6];
      const t=Math.random();
      const inset = (i%2===0)?1:0.82;
      p[i*3]   = (a[0]*(1-t)+b[0]*t)*inset + rnd(-1.6,1.6);
      p[i*3+1] = (a[1]*(1-t)+b[1]*t)*inset + rnd(-1.6,1.6);
      p[i*3+2] = rnd(-5,5);
    }else{ // inner arrow spark
      p[i*3]=rnd(-18,30); p[i*3+1]=rnd(-22,10); p[i*3+2]=rnd(-4,4);
    }
  }
  return p;
}
function fRibbon(){ // branding: flowing brand-energy ribbons
  const p = arr();
  for(let i=0;i<N;i++){
    const lane = i%3, t = Math.random();
    const x = -270 + t*540;
    p[i*3]   = x;
    p[i*3+1] = Math.sin(x*0.021 + lane*2.1)*46 + (lane-1)*52 + rnd(-4,4);
    p[i*3+2] = Math.cos(x*0.016 + lane*1.3)*36 + rnd(-6,6);
  }
  return p;
}
function fField(){ // clients: quiet star wall
  const p = arr();
  for(let i=0;i<N;i++){
    p[i*3]=rnd(-320,320); p[i*3+1]=rnd(-190,190); p[i*3+2]=rnd(-160,-20);
  }
  return p;
}
function fScatter(){
  const p = arr();
  for(let i=0;i<N;i++){
    p[i*3]=rnd(-600,600); p[i*3+1]=rnd(-420,420); p[i*3+2]=rnd(-600,300);
  }
  return p;
}

/* formation + palette + camera-z per chapter */
const F = [
  {pos:fGalaxy(),        col:palette([3,3,3,2]),   z:330, ry:0.00},
  {pos:fGrid(),          col:palette([1,1,6,2]),   z:300, ry:0.25},
  {pos:fSwarm(),         col:palette([2,6,1,1.5]), z:310, ry:0.10},
  {pos:fStreams(),       col:palette([2,1,6,1.5]), z:300, ry:0.00},
  {pos:fLattice(),       col:palette([6,1,2,1.5]), z:380, ry:0.30},
  {pos:fRings(),         col:palette([2,6,2,1]),   z:330, ry:0.15},
  {pos:fBlocks(),        col:palette([1.5,2,6,1.5]),z:300, ry:0.35},
  {pos:fRibbon(),        col:palette([5,4,3,1]),   z:310, ry:0.00},
  {pos:fGlobe(),         col:palette([6,2,2,2]),   z:340, ry:0.00},
  {pos:fHoney(),         col:palette([2,6,1,1.5]), z:300, ry:0.00},
  {pos:fWave(),          col:palette([3,1,2,5]),   z:320, ry:0.10},
  {pos:fConstellation(), col:palette([4,2,4,1.5]), z:360, ry:0.20},
  {pos:fField(),         col:palette([3,2,3,4]),   z:330, ry:0.05},
  {pos:fHex(),           col:palette([5,3,2,1]),   z:280, ry:0.00}
];
const scatter = fScatter();

/* ---- points ---- */
const geo = new THREE.BufferGeometry();
const posAttr = new THREE.BufferAttribute(new Float32Array(F[0].pos), 3);
const colAttr = new THREE.BufferAttribute(new Float32Array(F[0].col), 3);
const rndArr = new Float32Array(N);
for(let i=0;i<N;i++) rndArr[i]=Math.random();
geo.setAttribute('position', posAttr);
geo.setAttribute('color', colAttr);
geo.setAttribute('aRand', new THREE.BufferAttribute(rndArr,1));

const mat = new THREE.ShaderMaterial({
  transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, vertexColors:true,
  uniforms:{
    uTime:{value:0},
    uSize:{value: isMobile? 2.3 : 2.9},
    uMouse:{value:new THREE.Vector2(-10,-10)},
    uDim:{value:1},
    uFlow:{value:0}
  },
  vertexShader:`
    attribute float aRand;
    varying vec3 vColor;
    varying float vBoost;
    uniform float uTime;
    uniform float uSize;
    uniform vec2 uMouse;
    uniform float uFlow;
    void main(){
      vColor = color;
      vec3 p = position;
      float w = sin(uTime*(0.6+aRand*0.9) + aRand*6.2831);
      p += normalize(p + vec3(0.001)) * w * (1.7 + aRand*2.3);
      /* perpetual breathing so the universe never freezes */
      p *= 1.0 + 0.014 * sin(uTime*0.7 + aRand*6.2831);
      /* orbital drift — each particle slowly circles */
      float dr = uTime * (0.02 + aRand*0.05);
      float cs = cos(dr), sn = sin(dr);
      p.xz = mat2(cs,-sn,sn,cs) * p.xz;
      /* scroll velocity streaks — the universe rushes as you move */
      p.y += uFlow * (6.0 + aRand*18.0);
      vec4 mv = modelViewMatrix * vec4(p,1.0);
      vec4 proj = projectionMatrix * mv;
      vec2 ndc = proj.xy / proj.w;
      float d = distance(ndc, uMouse);
      vBoost = smoothstep(0.35, 0.0, d);
      gl_PointSize = uSize * (0.6 + aRand*0.9) * (1.0 + vBoost*1.4) * (300.0 / -mv.z);
      gl_Position = proj;
    }`,
  fragmentShader:`
    varying vec3 vColor;
    varying float vBoost;
    uniform float uDim;
    void main(){
      vec2 uv = gl_PointCoord - 0.5;
      float a = smoothstep(0.5, 0.22, length(uv));
      gl_FragColor = vec4(vColor*(1.15+vBoost*1.2), a*(0.85+vBoost*0.15)*uDim);
    }`
});
const points = new THREE.Points(geo, mat);
scene.add(points);

/* ---- Enterprise Intelligence Core ---- */
const coreGroup = new THREE.Group();
const hexGeo = new THREE.CylinderGeometry(24,24,30,6,1,true);
const coreWire = new THREE.Mesh(hexGeo, new THREE.MeshBasicMaterial({color:0xFFDD00, wireframe:true, transparent:true, opacity:0.55}));
const coreInner = new THREE.Mesh(new THREE.CylinderGeometry(15,15,20,6), new THREE.MeshBasicMaterial({color:0xFF810F, transparent:true, opacity:0.16}));
const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(44,1), new THREE.MeshBasicMaterial({color:0x7D7DDD, wireframe:true, transparent:true, opacity:0.16}));
// glow sprite
const gcv = document.createElement('canvas'); gcv.width=gcv.height=128;
const gcx = gcv.getContext('2d');
const grad = gcx.createRadialGradient(64,64,0,64,64,64);
grad.addColorStop(0,'rgba(255,221,0,.85)'); grad.addColorStop(0.35,'rgba(255,129,15,.35)'); grad.addColorStop(1,'rgba(255,129,15,0)');
gcx.fillStyle=grad; gcx.fillRect(0,0,128,128);
const glow = new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(gcv), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false}));
glow.scale.set(150,150,1);
coreGroup.add(glow, coreWire, coreInner, shell);
scene.add(coreGroup);
/* core visibility per formation (scale) */
const coreScale = [1, 0.0, 0.35, 0.0, 0.0, 0.55, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.0, 0.55];
/* per-chapter particle brightness — text must overpower the universe */
const dimArr = [1, 0.66, 0.68, 0.66, 0.7, 0.68, 0.66, 0.7, 0.95, 0.66, 0.62, 0.9, 0.68, 0.95];

/* ---- Comet layer: perpetual flow across every chapter ---- */
const CN = isMobile? 60 : 140;
const cGeo = new THREE.BufferGeometry();
const cPos = new Float32Array(CN*3);
const cVel = new Float32Array(CN*3);
const cCol = new Float32Array(CN*3);
function respawnComet(i){
  cPos[i*3]=rnd(-500,500); cPos[i*3+1]=rnd(-300,300); cPos[i*3+2]=rnd(-450,150);
  const sp = rnd(0.6,1.8);
  cVel[i*3]=rnd(-1,1)*sp; cVel[i*3+1]=rnd(-0.5,0.5)*sp; cVel[i*3+2]=rnd(0.2,1)*sp;
  const col = BRAND[Math.floor(Math.random()*3)];
  cCol[i*3]=col.r; cCol[i*3+1]=col.g; cCol[i*3+2]=col.b;
}
for(let i=0;i<CN;i++) respawnComet(i);
cGeo.setAttribute('position', new THREE.BufferAttribute(cPos,3));
cGeo.setAttribute('color', new THREE.BufferAttribute(cCol,3));
const cMat = new THREE.PointsMaterial({size:2.6, vertexColors:true, transparent:true, opacity:0.55, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true});
const comets = new THREE.Points(cGeo, cMat);
scene.add(comets);

/* ---- Delivery arcs (globe chapter) ---- */
const HUBS = [[28.6,77.2],[24.7,46.7],[25.2,55.3],[25.3,51.5],[41.9,-87.6],[43.7,-79.4]];
function ll2v(lat,lng,r){
  const ph=(90-lat)*Math.PI/180, th=(lng+180)*Math.PI/180;
  return new THREE.Vector3(-r*Math.sin(ph)*Math.cos(th), r*Math.cos(ph), r*Math.sin(ph)*Math.sin(th));
}
const arcGroup = new THREE.Group();
const arcMat = new THREE.LineBasicMaterial({color:0xFFDD00, transparent:true, opacity:0, blending:THREE.AdditiveBlending});
const hubMat = new THREE.PointsMaterial({color:0xFF810F, size:5, transparent:true, opacity:0, sizeAttenuation:true, blending:THREE.AdditiveBlending});
const origin = ll2v(HUBS[0][0],HUBS[0][1],GLOBE_R);
const hubPts = [];
HUBS.forEach((h,i)=>{
  const v = ll2v(h[0],h[1],GLOBE_R);
  hubPts.push(v.x,v.y,v.z);
  if(i===0) return;
  const mid = origin.clone().add(v).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_R*1.35);
  const curve = new THREE.QuadraticBezierCurve3(origin, mid, v);
  const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
  arcGroup.add(new THREE.Line(g, arcMat));
});
const hubGeo = new THREE.BufferGeometry();
hubGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(hubPts),3));
arcGroup.add(new THREE.Points(hubGeo, hubMat));
scene.add(arcGroup);

/* ---- scroll → formation ---- */
let anchors = [];
function measure(){
  anchors = sections.map(id=>{
    const el = document.getElementById(id);
    return el ? el.offsetTop + Math.min(el.offsetHeight, window.innerHeight)*0.5 : 0;
  });
}
measure();
const onResize = () => {
  measure();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onResize);

function targetF(){
  const p = window.scrollY + window.innerHeight*0.55;
  if(p<=anchors[0]) return 0;
  for(let i=0;i<anchors.length-1;i++){
    if(p < anchors[i+1]){
      return i + (p-anchors[i])/(anchors[i+1]-anchors[i]);
    }
  }
  return anchors.length-1;
}
const smooth = t => t*t*(3-2*t);
const lerp = (a,b,t)=>a+(b-a)*t;

let displayF = 0, introMix = 0;
let lastScrollY = window.scrollY, flowV = 0;
const mouse = new THREE.Vector2(-10,-10);
let mx=0,my=0;
window.addEventListener('pointermove', e=>{
  mouse.set(e.clientX/window.innerWidth*2-1, -(e.clientY/window.innerHeight*2-1));
  mx = (e.clientX/window.innerWidth-0.5); my = (e.clientY/window.innerHeight-0.5);
},{passive:true});

let hidden=false;
document.addEventListener("visibilitychange", onVisibility);
function onVisibility() {
  hidden = document.hidden;
}

const pArr = posAttr.array, cArr = colAttr.array;
let lastF = -999, lastIntro = -1;

function applyFormation(f, im){
  const i0 = Math.min(F.length-1, Math.floor(f));
  const i1 = Math.min(F.length-1, i0+1);
  const t = smooth(f - i0);
  const A = F[i0].pos, B = F[i1].pos, CA = F[i0].col, CB = F[i1].col;
  for(let i=0;i<N*3;i++){
    let v = A[i] + (B[i]-A[i])*t;
    if(im<1) v = scatter[i] + (v-scatter[i])*im;
    pArr[i] = v;
    cArr[i] = CA[i] + (CB[i]-CA[i])*t;
  }
  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;
  return {i0,i1,t};
}

const clock = new THREE.Clock();
function tick(){
  requestAnimationFrame(tick);
  if(hidden) return;
  const el = clock.getElapsedTime();
  mat.uniforms.uTime.value = el;
  mat.uniforms.uMouse.value.lerp(mouse, 0.08);

  const introStart = getIntroStart();
  if (introStart && introMix < 1) {
    introMix = Math.min(1, (performance.now() - introStart) / 3000);
  }
  const tf = targetF();
  displayF += (tf - displayF)*0.055;

  /* scroll-velocity flow */
  const dv = (window.scrollY - lastScrollY); lastScrollY = window.scrollY;
  flowV += (Math.max(-40,Math.min(40,dv)) - flowV) * 0.08;
  mat.uniforms.uFlow.value = flowV * 0.045;

  let seg = {i0:Math.floor(displayF), i1:Math.min(F.length-1,Math.floor(displayF)+1), t:displayF%1};
  if(Math.abs(displayF-lastF)>0.0004 || Math.abs(introMix-lastIntro)>0.001){
    seg = applyFormation(displayF, smooth(introMix));
    lastF = displayF; lastIntro = introMix;
  }

  /* camera + rotation */
  const z = lerp(F[seg.i0].z, F[seg.i1].z, smooth(seg.t));
  const ry = lerp(F[seg.i0].ry, F[seg.i1].ry, smooth(seg.t));
  camera.position.z += (z - camera.position.z)*0.05;
  camera.position.x += (mx*26 - camera.position.x)*0.04;
  camera.position.y += (-my*20 - camera.position.y)*0.04;
  camera.lookAt(0,0,0);
  points.rotation.y = ry + el*0.03 + displayF*0.22;
  points.rotation.x = Math.sin(el*0.08)*0.03;

  /* dim behind content */
  const dTarget = lerp(dimArr[seg.i0]??0.4, dimArr[seg.i1]??0.4, smooth(seg.t));
  mat.uniforms.uDim.value += (dTarget - mat.uniforms.uDim.value)*0.06;

  /* core */
  const cs0 = coreScale[seg.i0]??0, cs1 = coreScale[seg.i1]??0;
  const cs = lerp(cs0, cs1, smooth(seg.t));
  const pulse = 1 + Math.sin(el*1.6)*0.05;
  coreGroup.scale.setScalar(Math.max(0.0001, cs*pulse));
  coreGroup.visible = cs > 0.02;
  coreWire.rotation.y = el*0.3;
  shell.rotation.y = -el*0.18; shell.rotation.x = el*0.1;

  /* arcs during globe chapter (index 7) */
  const gp = Math.max(0, 1 - Math.abs(displayF - 8));
  arcMat.opacity = gp*0.75;
  hubMat.opacity = gp*0.95;
  arcGroup.rotation.copy(points.rotation);
  arcGroup.visible = gp > 0.02;

  /* comets always flowing */
  for(let i=0;i<CN;i++){
    cPos[i*3]+=cVel[i*3]; cPos[i*3+1]+=cVel[i*3+1]; cPos[i*3+2]+=cVel[i*3+2];
    if(Math.abs(cPos[i*3])>560 || Math.abs(cPos[i*3+1])>340 || cPos[i*3+2]>200) respawnComet(i);
  }
  cGeo.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}
tick();
  return () => {
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    renderer.dispose();
    container.innerHTML = "";
  };
}
