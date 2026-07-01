"use client";
import MoviePrefrence from "@/components/moviePrefrence";
import { useState } from "react";

type Movie = {
  title: string;
  year: number;
  genre: string[];
  cast: string[];
  reson: string;
  rating: number;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className=" bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white px-8 py-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Hero Section */}
      <div className="relative z-10 text-center mb-4">
        <div className="inline-block px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-5">
          AI Powered Movie Discovery
        </div>

        <h1 className="text-xl md:text-3xl font-extrabold leading-tight max-w-3xl mx-auto">
          Find Your Next
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            {" "}Favorite Movie
          </span>
        </h1>

        <p className="text-gray-400 text-md  my-2">
          Tell us your mood, genre, and vibe. Our AI will analyze your taste
          and recommend movies you'll love instantly.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-8 relative z-10">
        {/* Left Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <MoviePrefrence
              setMovies={setMovies}
              setLoading={setLoading}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-8">
          {/* Loading */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-[500px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-red-500/20 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>

              <p className="mt-6 text-red-400 text-lg animate-pulse">
                AI is analyzing your movie taste...
              </p>
            </div>
          ) : movies?.length > 0 ? (
            /* Movie Cards */
            <div className="grid md:grid-cols-2 gap-5">
              {movies.map((movie, index) => (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:from-white/[0.06]"
                >
                  {/* Ambient glow */}
                  <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Header */}
                  <header className="mb-6 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                        <span>{movie.year}</span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-emerald-400/80">96% match</span>
                      </div>
                      <h2 className="truncate text-2xl font-semibold tracking-tight text-white">
                        {movie.title}
                      </h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5">
                      <svg className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-white">{movie.rating}</span>
                    </div>
                  </header>

                  {/* Meta grid */}
                  <dl className="mb-4 space-y-4">
                    <div className="flex items-center">
                      <dt className=" text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                        Genres :
                      </dt>
                      <dd className="flex flex-wrap gap-1.5 ms-2">
                        {movie.genre?.map((g, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70"
                          >
                            {g.trim()}
                          </span>
                        ))}
                      </dd>
                    </div>

                    <div className="flex items-center">
                      <dt className=" text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                        Cast :
                      </dt>
                      <dd className="flex flex-wrap gap-1.5 ms-2">
                        {movie.cast?.map((a, i) => (
                          <span key={i} className="text-sm text-white/80">
                            {a.trim()}
                            {i < movie.cast.length - 1 && <span className="ml-1.5 text-white/20">·</span>}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  {/* AI insight */}
                  <div className=" rounded-xl border border-white/[0.06] bg-black/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-red-500/15">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-400/90">
                        AI Insight
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{movie.reson}</p>
                  </div>

                  {/* CTA */}
                  {movie.platform && (
                    <a
                      href={movie.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-white/90"
                    >
                      Watch on {new URL(movie.platform).hostname.replace(/^www\./, "").split(".")[0].replace(/^\w/, (c) => c.toUpperCase())}
                      <svg
                        className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  )}

                </article>
              ))}
            </div>

          ) : (
            /* Empty State */
            <div className="flex flex-col justify-center items-center h-[500px] bg-white/5 backdrop-blur-xl rounded-3xl border border-dashed border-white/10">
              <div className="text-7xl mb-6 animate-pulse">🤖🎬</div>

              <h2 className="text-2xl font-semibold mb-2">
                Your AI recommendations will appear here
              </h2>

              <p className="text-gray-400 text-center max-w-md">
                Enter your movie preferences and let AI discover the perfect
                movie for your mood.
              </p>

              <p className="text-red-400 mt-4 text-sm animate-pulse">
                Waiting for your preferences...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

