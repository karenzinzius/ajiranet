"use client";

import { useRef, useState } from "react";

type Photo = {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
};

const placeholderPhotos: Photo[] = [
  { id: "p-1", url: "", caption: "Deep cleaning a 4-bedroom home in Masaki", uploadedAt: "15 Apr 2026" },
  { id: "p-2", url: "", caption: "Kitchen deep clean — before & after", uploadedAt: "10 Apr 2026" },
  { id: "p-3", url: "", caption: "Childcare session at Oyster Bay", uploadedAt: "3 Apr 2026" },
  { id: "p-4", url: "", caption: "Laundry & ironing for the Kimaro family", uploadedAt: "28 Mar 2026" },
  { id: "p-5", url: "", caption: "Garden maintenance in Mikocheni", uploadedAt: "20 Mar 2026" },
  { id: "p-6", url: "", caption: "Meal prep for a family of 5", uploadedAt: "12 Mar 2026" },
];

const initials = [
  "🧹", "🍳", "🌿", "👶", "👕", "🏡",
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState(placeholderPhotos);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [captionInput, setCaptionInput] = useState("");
  const [adding, setAdding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (!captionInput.trim()) return;
    const newPhoto: Photo = {
      id: `p-${Date.now()}`,
      url: "",
      caption: captionInput.trim(),
      uploadedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    setPhotos((prev) => [newPhoto, ...prev]);
    setCaptionInput("");
    setAdding(false);
  };

  const remove = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-4"
          >
            <div className="flex h-64 items-center justify-center rounded-[1.5rem] bg-[color:var(--bg)] text-7xl">
              {initials[photos.findIndex((p) => p.id === lightbox.id) % initials.length]}
            </div>
            <p className="font-semibold text-[color:var(--text)]">{lightbox.caption}</p>
            <p className="text-xs text-[color:var(--muted)]">Uploaded {lightbox.uploadedAt}</p>
            <div className="flex gap-3">
              <button
                onClick={() => remove(lightbox.id)}
                className="flex-1 rounded-2xl border border-red-500/20 bg-red-500/5 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
              >
                Delete
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="flex-1 rounded-2xl border border-[color:var(--border)] py-2 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Portfolio</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text)]">My Work Gallery</h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            Show employers what you can do. Photos build trust and help you get hired faster.
          </p>
        </section>

        {/* Upload CTA */}
        {adding ? (
          <section className="rounded-[2rem] border border-[color:var(--accent)]/40 bg-[color:var(--surface)] p-6 space-y-4 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <p className="text-sm font-semibold text-[color:var(--text)]">Add a new photo</p>
            <div
              onClick={() => fileRef.current?.click()}
              className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[1.5rem] border-2 border-dashed border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-sm">Tap to choose a photo</span>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
            <input
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="Add a caption (e.g. 'Deep cleaning in Masaki')"
              className="w-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-5 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
            />
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={!captionInput.trim()}
                className="flex-1 rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Photo
              </button>
              <button
                onClick={() => { setAdding(false); setCaptionInput(""); }}
                className="flex-1 rounded-2xl border border-[color:var(--border)] py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
              >
                Cancel
              </button>
            </div>
          </section>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-[color:var(--border)] bg-[color:var(--surface)] py-6 text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add a photo to your portfolio
          </button>
        )}

        {/* Grid */}
        {photos.length === 0 ? (
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-3">
            <p className="text-4xl">📷</p>
            <p className="font-semibold text-[color:var(--text)]">Your gallery is empty</p>
            <p className="text-sm text-[color:var(--muted)]">Upload photos of your work to stand out to employers.</p>
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setLightbox(photo)}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] text-5xl transition hover:border-[color:var(--accent)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]"
              >
                <span>{initials[i % initials.length]}</span>
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-left text-xs font-medium text-white leading-snug line-clamp-2">{photo.caption}</p>
                  <p className="mt-1 text-[10px] text-white/60">{photo.uploadedAt}</p>
                </div>
              </button>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
