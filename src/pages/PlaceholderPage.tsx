import React from 'react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="font-display font-bold text-2xl text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground mt-2">This page is under construction.</p>
      <div className="mt-8 rounded-card bg-surface border border-border p-12 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Content coming soon</p>
      </div>
    </div>
  );
}
