import {
  Home,
  BookOpen,
  Compass,
  FlaskConical,
  Microscope,
  Sigma,
  Network,
  Sparkles,
  Library,
  Settings,
  Clock,
  Bookmark,
  Users,
  Beaker,
  Calculator,
  Layers,
  Atom,
} from 'lucide-react';
import { disciplines } from '@/data/disciplines';
import { applications } from '@/data/applications';

export const simulationsNav = [
  { label: 'Simulation Centre', to: '/laboratory' },
  { label: 'Superposition', to: '/laboratory/superposition' },
  { label: 'Entanglement', to: '/laboratory/entanglement' },
  { label: 'Double-Slit', to: '/laboratory/double-slit' },
  { label: 'Quantum Tunnelling', to: '/laboratory/tunnelling' },
  { label: 'Wavefunction', to: '/laboratory/wavefunction' },
  { label: 'Bloch Sphere', to: '/laboratory/bloch-sphere' },
  { label: 'Circuit Builder', to: '/laboratory/circuit-builder' }
];

export const knowledgeNav = [
  { label: 'All disciplines', to: '/knowledge' },
  ...disciplines.map((d) => ({ label: d.name, to: `/knowledge/${d.slug}` }))
];

export const discoverNav = [
  { label: 'Concepts', to: '/explore?type=Concept' },
  { label: 'Theories', to: '/explore?type=Theory' },
  { label: 'Particles', to: '/explore?type=Particle' },
  { label: 'Equations', to: '/mathematics?tab=equations' },
  { label: 'Experiments', to: '/experiments' },
  { label: 'Scientists', to: '/scientists' },
  { label: 'Applications', to: '/applications' },
  { label: 'Discoveries', to: '/timeline' }
];

export const researchNav = [
  { label: 'Research Explorer', to: '/research?tab=explorer' },
  { label: 'Publications', to: '/research?tab=publications' },
  { label: 'Research Projects', to: '/research?tab=projects' },
  { label: 'Citation Manager', to: '/research?tab=citations' },
  { label: 'Research Notes', to: '/research?tab=notes' },
  { label: 'Discovery Timeline', to: '/timeline' }
];

export const mathematicsNav = [
  { label: 'Equation Library', to: '/mathematics?tab=equations' },
  { label: 'Linear Algebra', to: '/mathematics?tab=linear-algebra' },
  { label: 'Complex Numbers', to: '/mathematics?tab=complex' },
  { label: 'Vectors', to: '/mathematics?tab=vectors' },
  { label: 'Probability', to: '/mathematics?tab=probability' },
  { label: 'Graphing', to: '/mathematics?tab=graphing' },
  { label: 'Dirac Notation', to: '/mathematics?tab=dirac' }
];

export const sidebarSections = [
  {
    title: 'Workspace',
    items: [
      { label: 'Home', to: '/', icon: Home },
      { label: 'Quantum Subjects', to: '/knowledge', icon: BookOpen },
      { label: 'Discover', to: '/explore', icon: Compass }
    ]
  },
  {
    title: 'Scientific tools',
    items: [
      { label: 'Laboratory', to: '/laboratory', icon: FlaskConical },
      { label: 'Research Centre', to: '/research', icon: Microscope },
      { label: 'Mathematics', to: '/mathematics', icon: Sigma },
      { label: 'Knowledge Graph', to: '/graph', icon: Network },
      { label: 'Quantum AI', to: '/assistant', icon: Sparkles }
    ]
  },
  {
    title: 'Library',
    items: [
      { label: 'Saved Articles', to: '/collections?tab=saved', icon: Bookmark },
      { label: 'Collections', to: '/collections?tab=collections', icon: Library },
      { label: 'Reading History', to: '/collections?tab=history', icon: Clock },
      { label: 'Settings', to: '/settings', icon: Settings }
    ]
  }
];

export const dockItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Knowledge', to: '/knowledge', icon: Atom },
  { label: 'Laboratory', to: '/laboratory', icon: FlaskConical },
  { label: 'Research', to: '/research', icon: Microscope },
  { label: 'Mathematics', to: '/mathematics', icon: Sigma },
  { label: 'Graph', to: '/graph', icon: Network },
  { label: 'AI', to: '/assistant', icon: Sparkles },
  { label: 'Collections', to: '/collections', icon: Layers },
  { label: 'Settings', to: '/settings', icon: Settings }
];

export const topMenus = [
  { label: 'Knowledge', to: '/knowledge', items: knowledgeNav.slice(0, 9) },
  { label: 'Laboratory', to: '/laboratory', items: simulationsNav },
  { label: 'Research', to: '/research', items: researchNav },
  { label: 'Mathematics', to: '/mathematics', items: mathematicsNav },
  { label: 'Discover', to: '/explore', items: discoverNav }
];

export const secondaryIcons = { Users, Beaker, Calculator, Clock };
export const applicationCount = applications.length;