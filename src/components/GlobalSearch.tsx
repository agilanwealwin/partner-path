import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
    Search, FolderKanban, Server, Globe2,
    FileText, ArrowRight, Zap, Activity
} from 'lucide-react';
import { projects, territories } from '@/data/mockData';
import { cn } from '@/lib/utils';

// Mock nodes since they aren't in the global mockData yet
const mockNodes = [
    { id: 'TH2-NODE-001', project: 'Thar Solar Farm Ph.2', location: 'Jaisalmer, RJ', status: 'Online' },
    { id: 'TH2-NODE-002', project: 'Thar Solar Farm Ph.2', location: 'Jaisalmer, RJ', status: 'Online' },
    { id: 'NR-NODE-003', project: 'Nellore RE Park', location: 'Nellore, AP', status: 'Degraded' },
    { id: 'NR-NODE-007', project: 'Nellore RE Park', location: 'Nellore, AP', status: 'Offline' },
];

const mockDocuments = [
    { id: 'DOC-001', name: 'Lease Agreement - Jaisalmer Site', type: 'Legal' },
    { id: 'DOC-002', name: 'Technical Specs - Solar Array V4', type: 'Technical' },
    { id: 'DOC-003', name: 'Maintenance Log Q1 2024', type: 'Report' },
];

interface GlobalSearchProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, onOpenChange]);

    const handleSelect = (path: string) => {
        onOpenChange(false);
        navigate(path);
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => onOpenChange(false)}
        >
            <div
                className="w-full max-w-2xl bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <Command className="flex flex-col h-full">
                    <div className="flex items-center border-b border-border px-4 h-14 gap-3">
                        <Search className="text-muted-foreground" size={20} />
                        <Command.Input
                            autoFocus
                            placeholder="Search projects, nodes, documents or territories..."
                            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-[14px]"
                            value={search}
                            onValueChange={setSearch}
                        />
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-2 border border-border">
                            <span className="text-[10px] font-bold text-muted-foreground select-none">ESC</span>
                        </div>
                    </div>

                    <Command.List className="max-h-[450px] overflow-y-auto p-2 scroll-py-2 custom-scrollbar">
                        <Command.Empty className="py-12 text-center">
                            <div className="flex flex-col items-center gap-2 opacity-40">
                                <Search size={32} />
                                <p className="text-sm font-medium">No results found for "{search}"</p>
                            </div>
                        </Command.Empty>

                        <Command.Group heading="Projects" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {projects.map((item) => (
                                <Command.Item
                                    key={item.id}
                                    onSelect={() => handleSelect(`/partner/projects/${item.id}`)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-2 aria-selected:bg-surface-2 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <FolderKanban size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-bold text-foreground">{item.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{item.id} · {item.location}, {item.state}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-opacity" />
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Separator className="h-px bg-border my-2 mx-2" />

                        <Command.Group heading="Edge Nodes" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {mockNodes.map((item) => (
                                <Command.Item
                                    key={item.id}
                                    onSelect={() => handleSelect(`/partner/nodes`)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-2 aria-selected:bg-surface-2 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Server size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-bold text-foreground">{item.id}</p>
                                        <p className="text-[11px] text-muted-foreground">{item.project} · {item.status}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-opacity" />
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Separator className="h-px bg-border my-2 mx-2" />

                        <Command.Group heading="Territories" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {territories.slice(0, 5).map((item) => (
                                <Command.Item
                                    key={item.id}
                                    onSelect={() => handleSelect(`/partner/territory-explorer`)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-2 aria-selected:bg-surface-2 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                                        <Globe2 size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-bold text-foreground">{item.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{item.state} · {item.status}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-opacity" />
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Separator className="h-px bg-border my-2 mx-2" />

                        <Command.Group heading="Documents" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {mockDocuments.map((item) => (
                                <Command.Item
                                    key={item.id}
                                    onSelect={() => handleSelect(`/partner/documents`)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-2 aria-selected:bg-surface-2 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-surface-3 flex items-center justify-center text-muted-foreground shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-bold text-foreground">{item.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{item.type} · PDF</p>
                                    </div>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-opacity" />
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>

                    <div className="h-10 px-4 border-t border-border flex items-center justify-between bg-surface-2">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-0.5">
                                    <span className="p-0.5 rounded border border-border bg-surface">↑↓</span> to navigate
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-0.5">
                                    <span className="p-0.5 px-1 rounded border border-border bg-surface">↵</span> to select
                                </span>
                            </div>
                        </div>
                        <p className="text-[9px] font-medium text-muted-foreground italic">Powered by DeLEN Intelligence</p>
                    </div>
                </Command>
            </div>
        </div>
    );
}
