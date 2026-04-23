"use client";
import { useState } from "react";
import { WorkerCard } from "@/components/worker/WorkerCard"; 

export default function SavedWorkers() {
  const [saved, setSaved] = useState([
    { 
      id: "1", 
      name: "Hamisi Juma", 
      role: "Electrician", 
      location: "Mikocheni, Dar", 
      rating: 4.8, 
      reviews: 12,
      availability: "Available now",
      availabilityStatus: "Available now" as const,
      skills: ["Wiring", "Repairs"],
      verified: true 
    },
  ]);

  const handleRemove = (id: string) => {
    if(confirm("Remove from saved?")) {
      setSaved(prev => prev.filter(w => w.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[color:var(--text)]">Saved Workers</h1>
      {saved.length === 0 ? (
        <p className="text-[color:var(--muted)]">No workers saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {saved.map(worker => (
            <div key={worker.id} className="relative group">
              {/* This is your actual WorkerCard component */}
              <WorkerCard {...worker} />
              
              {/* Separate Remove Button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(worker.id);
                }}
                className="absolute top-6 right-20 z-10 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition text-xs font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}