// Mock data for the DeLEN Infrastructure Partner Portal

export interface Territory {
  id: string;
  name: string;
  state: string;
  mwPotential: number;
  irradiance: number;
  status: 'available' | 'subscribed' | 'reserved' | 'allocated';
  adoption: 'Low' | 'Medium' | 'High';
  assignedPartner?: string;
  risk: 'Low' | 'Medium' | 'High';
}

export const territories: Territory[] = [
  { id: 'DLN-001', name: 'Uttar Pradesh Territory 1', state: 'Uttar Pradesh', mwPotential: 161, irradiance: 5.0, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-002', name: 'Uttar Pradesh Territory 2', state: 'Uttar Pradesh', mwPotential: 174, irradiance: 5.4, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-003', name: 'Uttar Pradesh Territory 3', state: 'Uttar Pradesh', mwPotential: 134, irradiance: 5.0, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-004', name: 'Uttar Pradesh Territory 4', state: 'Uttar Pradesh', mwPotential: 83, irradiance: 5.3, status: 'reserved', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-005', name: 'Uttar Pradesh Territory 5', state: 'Uttar Pradesh', mwPotential: 108, irradiance: 5.4, status: 'subscribed', adoption: 'Medium', assignedPartner: 'NovaSun Systems', risk: 'Medium' },
  { id: 'DLN-006', name: 'Uttar Pradesh Territory 6', state: 'Uttar Pradesh', mwPotential: 100, irradiance: 4.9, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-007', name: 'Uttar Pradesh Territory 7', state: 'Uttar Pradesh', mwPotential: 123, irradiance: 4.9, status: 'available', adoption: 'Medium', risk: 'Low' },
  { id: 'DLN-008', name: 'Uttar Pradesh Territory 8', state: 'Uttar Pradesh', mwPotential: 157, irradiance: 5.3, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-009', name: 'Uttar Pradesh Territory 9', state: 'Uttar Pradesh', mwPotential: 128, irradiance: 5.4, status: 'available', adoption: 'Medium', risk: 'Low' },
  { id: 'DLN-010', name: 'Uttar Pradesh Territory 10', state: 'Uttar Pradesh', mwPotential: 126, irradiance: 4.8, status: 'reserved', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-011', name: 'Uttar Pradesh Territory 11', state: 'Uttar Pradesh', mwPotential: 178, irradiance: 5.4, status: 'available', adoption: 'Medium', risk: 'Low' },
  { id: 'DLN-012', name: 'Uttar Pradesh Territory 12', state: 'Uttar Pradesh', mwPotential: 128, irradiance: 5.4, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-013', name: 'Uttar Pradesh Territory 13', state: 'Uttar Pradesh', mwPotential: 125, irradiance: 5.3, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-014', name: 'Uttar Pradesh Territory 14', state: 'Uttar Pradesh', mwPotential: 89, irradiance: 5.0, status: 'allocated', adoption: 'Medium', risk: 'High' },
  { id: 'DLN-015', name: 'Uttar Pradesh Territory 15', state: 'Uttar Pradesh', mwPotential: 114, irradiance: 5.0, status: 'reserved', adoption: 'Medium', risk: 'Medium' },
  // Rajasthan
  { id: 'DLN-016', name: 'Rajasthan Territory 1', state: 'Rajasthan', mwPotential: 248, irradiance: 5.6, status: 'subscribed', adoption: 'High', assignedPartner: 'SunVolt EPC', risk: 'Low' },
  { id: 'DLN-017', name: 'Rajasthan Territory 2', state: 'Rajasthan', mwPotential: 312, irradiance: 5.8, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-018', name: 'Rajasthan Territory 3', state: 'Rajasthan', mwPotential: 198, irradiance: 5.5, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-019', name: 'Rajasthan Territory 4', state: 'Rajasthan', mwPotential: 276, irradiance: 5.7, status: 'reserved', adoption: 'High', risk: 'Low' },
  { id: 'DLN-020', name: 'Rajasthan Territory 5', state: 'Rajasthan', mwPotential: 189, irradiance: 5.4, status: 'available', adoption: 'Medium', risk: 'Medium' },
  // Gujarat
  { id: 'DLN-021', name: 'Gujarat Territory 1', state: 'Gujarat', mwPotential: 215, irradiance: 5.5, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-022', name: 'Gujarat Territory 2', state: 'Gujarat', mwPotential: 183, irradiance: 5.3, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-023', name: 'Gujarat Territory 3', state: 'Gujarat', mwPotential: 142, irradiance: 5.1, status: 'subscribed', adoption: 'Medium', assignedPartner: 'GreenWatt Pvt', risk: 'Medium' },
  { id: 'DLN-024', name: 'Gujarat Territory 4', state: 'Gujarat', mwPotential: 167, irradiance: 5.4, status: 'subscribed', adoption: 'High', assignedPartner: 'SunVolt EPC', risk: 'Low' },
  // Tamil Nadu
  { id: 'DLN-025', name: 'Tamil Nadu Territory 1', state: 'Tamil Nadu', mwPotential: 194, irradiance: 5.2, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-026', name: 'Tamil Nadu Territory 2', state: 'Tamil Nadu', mwPotential: 156, irradiance: 5.0, status: 'available', adoption: 'Medium', risk: 'Medium' },
  { id: 'DLN-027', name: 'Tamil Nadu Territory 3', state: 'Tamil Nadu', mwPotential: 178, irradiance: 5.3, status: 'reserved', adoption: 'Medium', risk: 'Medium' },
  // Andhra Pradesh
  { id: 'DLN-028', name: 'Andhra Pradesh Territory 1', state: 'Andhra Pradesh', mwPotential: 221, irradiance: 5.4, status: 'available', adoption: 'High', risk: 'Low' },
  { id: 'DLN-029', name: 'Andhra Pradesh Territory 2', state: 'Andhra Pradesh', mwPotential: 165, irradiance: 5.1, status: 'subscribed', adoption: 'Medium', assignedPartner: 'SolarMax Ltd', risk: 'Medium' },
  // Karnataka
  { id: 'DLN-030', name: 'Karnataka Territory 1', state: 'Karnataka', mwPotential: 187, irradiance: 5.3, status: 'available', adoption: 'High', risk: 'Low' },
  // Haryana
  { id: 'DLN-182', name: 'Haryana Territory 6', state: 'Haryana', mwPotential: 82, irradiance: 5.3, status: 'available', adoption: 'Medium', risk: 'Medium' },
];

export const statusConfig = {
  available: { label: 'Available', color: 'hsl(var(--status-green))', bg: 'hsl(var(--green-soft))', textClass: 'text-status-green', bgClass: 'bg-green-soft' },
  subscribed: { label: 'Subscribed', color: 'hsl(var(--accent-color))', bg: 'hsl(var(--accent-soft))', textClass: 'text-primary', bgClass: 'bg-accent-soft' },
  reserved: { label: 'Reserved', color: 'hsl(var(--status-orange))', bg: 'hsl(var(--orange-soft))', textClass: 'text-status-orange', bgClass: 'bg-orange-soft' },
  allocated: { label: 'Allocated', color: 'hsl(var(--status-blue))', bg: 'hsl(var(--blue-soft))', textClass: 'text-status-blue', bgClass: 'bg-blue-soft' },
};

export const riskConfig = {
  Low: { textClass: 'text-status-green', bgClass: 'bg-green-soft' },
  Medium: { textClass: 'text-status-orange', bgClass: 'bg-orange-soft' },
  High: { textClass: 'text-status-red', bgClass: 'bg-red-soft' },
};

export interface Project {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  capacity: string;
  status: 'Live' | 'EPC Phase' | 'Commissioning' | 'Prospect' | 'Maintenance';
  nodes: string;
  energyYTD: string;
  dlnEarned: string;
  icon: 'sun' | 'wind' | 'zap';
}

export const projects: Project[] = [
  { id: 'DLN-PRJ-2024-0041', name: 'Thar Solar Farm Ph.2', location: 'Jaisalmer', state: 'RJ', type: 'Solar', capacity: '12.4 MW', status: 'Live', nodes: '48/48', energyYTD: '9.8 GWh', dlnEarned: '34.2K', icon: 'sun' },
  { id: 'DLN-PRJ-2024-0052', name: 'Kutch Wind-Solar Hybrid', location: 'Bhuj', state: 'GJ', type: 'Hybrid', capacity: '8.2 MW', status: 'EPC Phase', nodes: '0/32', energyYTD: '-', dlnEarned: '-', icon: 'wind' },
  { id: 'DLN-PRJ-2024-0038', name: 'Nellore RE Park Ph.1', location: 'Nellore', state: 'AP', type: 'Solar', capacity: '15.0 MW', status: 'Maintenance', nodes: '21/22', energyYTD: '6.2 GWh', dlnEarned: '18.4K', icon: 'zap' },
  { id: 'DLN-PRJ-2025-0003', name: 'Pune Rooftop Portfolio', location: 'Pune', state: 'MH', type: 'Rooftop', capacity: '2.1 MW', status: 'Commissioning', nodes: '1/14', energyYTD: '0.1 GWh', dlnEarned: '0.2K', icon: 'sun' },
  { id: 'DLN-PRJ-2024-0029', name: 'Bikaner Solar Park', location: 'Bikaner', state: 'RJ', type: 'Solar', capacity: '8.0 MW', status: 'Live', nodes: '32/32', energyYTD: '5.4 GWh', dlnEarned: '16.8K', icon: 'sun' },
  { id: 'DLN-PRJ-2024-0044', name: 'Anantapur Agri-PV', location: 'Anantapur', state: 'AP', type: 'Solar', capacity: '3.0 MW', status: 'Live', nodes: '12/12', energyYTD: '1.8 GWh', dlnEarned: '5.2K', icon: 'sun' },
];

export const partnerInfo = {
  name: 'SunVolt EPC Ltd.',
  tier: 'Pulse Partner',
  partnerId: 'IFP-2024-0041',
  shortId: 'SV-2024-001',
  wallet: '0x3f...8a2c',
  avatar: 'SV',
  totalProjects: 14,
  totalMW: 48.6,
  activeNodes: 312,
  offlineNodes: 4,
  energyYTD: '91.4 GWh',
  dlnEarnedYTD: '142,800',
  dlnThisMonth: '18,400',
  territoriesSubscribed: 2,
  territoriesMax: 5,
};
