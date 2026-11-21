import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import LabShell, { ControlSlider, Readout } from '@/components/lab/LabShell';
import { Chip } from '@/components/common/Kit';
import Formula from '@/components/math/Formula';

const DEG = Math.PI / 180;

const PRESETS = [
  { label: '|0⟩', theta: 0, phi: 0 },
  { label: '|1⟩', theta: 180, phi: 0 },
  { label: '|+⟩', theta: 90, phi: 0 },
  { label: '|−⟩', theta: 90, phi: 180 },
  { label: '|+i⟩', theta: 90, phi: 90 }
];

export default function BlochSphere() {
  const mountRef = useRef(null);
  const refs = useRef({});
  const [theta, setTheta] = useState(60);
  const [phi, setPhi] = useState(45);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglError(true);
      return undefined;
    }

    const width = mount.clientWidth || 520;
    const height = mount.clientHeight || 320;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const cam = { az: 0.7, el: 0.34, r: 3.1 };

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 36, 26),
      new THREE.MeshBasicMaterial({ color: 0x23c8ff, wireframe: true, transparent: true, opacity: 0.1 })
    );
    scene.add(sphere);

    const equator = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.004, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0x23c8ff, transparent: true, opacity: 0.45 })
    );
    equator.rotation.x = Math.PI / 2;
    scene.add(equator);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.003, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0x9a65ff, transparent: true, opacity: 0.25 })
    );
    ring2.rotation.y = Math.PI / 2;
    scene.add(ring2);

    const axisSpec = [
      { dir: new THREE.Vector3(1, 0, 0), color: 0x23c8ff },
      { dir: new THREE.Vector3(0, 0, 1), color: 0x9a65ff },
      { dir: new THREE.Vector3(0, 1, 0), color: 0xbcd4e8 }
    ];
    axisSpec.forEach(({ dir, color }) => {
      const start = dir.clone().multiplyScalar(-1.28);
      const end = dir.clone().multiplyScalar(1.28);
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 }));
      scene.add(line);
    });

    const vectorGroup = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.013, 0.013, 1, 10),
      new THREE.MeshBasicMaterial({ color: 0xc16bff })
    );
    shaft.position.y = 0.5;
    vectorGroup.add(shaft);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.14, 14), new THREE.MeshBasicMaterial({ color: 0xe0b3ff }));
    head.position.y = 1.02;
    vectorGroup.add(head);
    scene.add(vectorGroup);

    const tipGlow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 12), new THREE.MeshBasicMaterial({ color: 0xf0e2ff }));
    scene.add(tipGlow);

    refs.current = { renderer, scene, camera, cam, vectorGroup, tipGlow };

    let frame = 0;
    const animate = () => {
      const { az, el, r } = refs.current.cam;
      camera.position.set(r * Math.cos(el) * Math.sin(az), r * Math.sin(el), r * Math.cos(el) * Math.cos(az));
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth || width;
      const h = mount.clientHeight || height;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(mount);

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      refs.current.cam.az -= dx * 0.008;
      refs.current.cam.el = Math.max(-1.2, Math.min(1.2, refs.current.cam.el + dy * 0.006));
    };
    const onUp = () => { dragging = false; };

    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    const { vectorGroup, tipGlow } = refs.current;
    if (!vectorGroup) return;
    const th = theta * DEG;
    const ph = phi * DEG;
    const v = new THREE.Vector3(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph));
    vectorGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
    vectorGroup.scale.set(1, v.length(), 1);
    tipGlow.position.copy(v);
  }, [theta, phi]);

  const p0 = Math.pow(Math.cos((theta * DEG) / 2), 2);
  const p1 = Math.pow(Math.sin((theta * DEG) / 2), 2);

  return (
    <LabShell
      title="Bloch Sphere"
      subtitle="Interactive three-dimensional representation of a single-qubit state."
      visual="sphere"
      note="The vector is drawn from the exact parameterisation of a pure qubit state. Drag the sphere to rotate the view; the state itself is set by the polar and azimuthal angles."
      readouts={
        <>
          <Readout label="Polar θ" value={`${theta.toFixed(0)}°`} />
          <Readout label="Azimuthal φ" value={`${phi.toFixed(0)}°`} />
          <Readout label="P(|0⟩)" value={`${(p0 * 100).toFixed(1)}%`} />
          <Readout label="P(|1⟩)" value={`${(p1 * 100).toFixed(1)}%`} />
        </>
      }
      controls={
        <>
          <ControlSlider label="Polar angle θ" value={theta} min={0} max={180} step={1} onChange={setTheta} unit="°" />
          <ControlSlider label="Azimuthal angle φ" value={phi} min={0} max={360} step={1} onChange={setPhi} unit="°" />
          <div>
            <p className="qp-label mb-1.5">Preset states</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <Chip key={p.label} active={theta === p.theta && phi === p.phi} onClick={() => { setTheta(p.theta); setPhi(p.phi); }}>
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 p-2.5">
            <p className="qp-label mb-1.5">State notation</p>
            <Formula tex={'|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle'} display />
            <p className="mono mt-1.5 text-[9.5px] text-[#8fa8c2]">
              cos(θ/2) = {Math.cos((theta * DEG) / 2).toFixed(3)} · sin(θ/2) = {Math.sin((theta * DEG) / 2).toFixed(3)}
            </p>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-[#7088a5]">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[var(--qp-accent)]" /> x</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[var(--qp-accent)]" /> y</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#bcd4e8]" /> z</span>
          </div>
        </>
      }
    >
      <div className="relative h-[340px] w-full bg-[radial-gradient(circle_at_50%_45%,rgba(35,200,255,0.07),transparent_62%)]">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />
        {webglError && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="text-[11.5px] leading-relaxed text-[#a8bcd3]">
              The 3D view needs WebGL, which this browser has disabled. The probabilities and state notation in the panel
              remain fully computed.
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-2 left-3 text-[9.5px] text-[#5f7893]">drag to rotate</div>
        <div className="pointer-events-none absolute right-3 top-2 mono text-[9.5px] text-[#5f7893]">
          θ={theta.toFixed(0)}° φ={phi.toFixed(0)}°
        </div>
      </div>
    </LabShell>
  );
}