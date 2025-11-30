"use client";

import { useState, useEffect } from "react";

type BandMember = {
  name: string;
  role: string;
  instrument: string;
  image?: string;
};

const bandMembers: BandMember[] = [
  {
    name: "Frank Valenzano",
    role: "Vocals",
    instrument: "Vocals",
    image: "/frank-valenzano.png",
  },
  {
    name: "Alex Fritzel",
    role: "Keyboards",
    instrument: "Keyboards",
    image: "/alex-fritzel.png",
  },
  {
    name: "Ian Walsh",
    role: "Guitar",
    instrument: "Guitar",
    image: "/ian-walsh.png",
  },
  {
    name: "Brian Roberts",
    role: "Bass",
    instrument: "Bass",
    image: "/brian-roberts.PNG",
  },
  {
    name: "Brendan O'Donnell",
    role: "Drums",
    instrument: "Drums",
    image: "/brendan-odonnell.JPG",
  },
];

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketLink?: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [showsLoading, setShowsLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/shows");
      const data = await response.json();
      if (data.shows) {
        // Sort by date
        const sorted = data.shows.sort(
          (a: Show, b: Show) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setShows(sorted);
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setShowsLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen text-[#ededed] relative z-10 bg-fixed-mobile"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 15, 10, 0.3), rgba(15, 15, 10, 0.3)), url('/bg.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0f0f0a",
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f0a]/80 backdrop-blur-md border-b border-[#1a1a15] relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
            <a href="#home" className="hover:text-[#c53030] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#c53030] transition-colors">
              About
            </a>
            <a
              href="#members"
              className="hover:text-[#c53030] transition-colors"
            >
              Members
            </a>
            <a href="#music" className="hover:text-[#c53030] transition-colors">
              Music
            </a>
            <a href="#shows" className="hover:text-[#c53030] transition-colors">
              Shows
            </a>
            <a
              href="#contact"
              className="hover:text-[#c53030] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#d4d4d4] hover:text-[#c53030] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#0f0f0a] border-b border-[#1a1a15] transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a
              href="#home"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              About
            </a>
            <a
              href="#members"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              Members
            </a>
            <a
              href="#music"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              Music
            </a>
            <a
              href="#shows"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              Shows
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="text-sm uppercase tracking-wider hover:text-[#c53030] transition-colors py-2"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0a]/60 via-[#1a1a15]/50 to-[#0f0f0a]/60"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2a1a0a] rounded-full blur-3xl opacity-15"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c53030] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A.M.
            </span>{" "}
            <span className="text-[#c53030] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              OWL
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Emerging from the depths of Chicago&apos;s music scene, a new blend
            of funk, soul, and fusion
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#music"
              className="px-8 py-4 bg-[#c53030] text-white rounded-full font-semibold hover:bg-[#a02626] transition-colors uppercase tracking-wider text-sm"
            >
              Listen Now
            </a>
            <a
              href="#about"
              className="px-8 py-4 border-2 border-white text-white bg-black/40 backdrop-blur-sm rounded-full font-semibold hover:bg-white hover:text-[#c53030] transition-colors uppercase tracking-wider text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#0f0f0a] relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            <span className="text-[#d4d4d4]">About</span>{" "}
            <span className="text-[#c53030]">The Band</span>
          </h2>
          <div className="space-y-6 text-lg text-[#9ca3af] leading-relaxed">
            <p>
              A.M. Owl is a dynamic funk, fusion, and soul band that creates
              music that resonates with the depth and mystery of a cave opening
              to a new world. Their sound is a journey—starting in the shadows
              and emerging into the light with grooves that move both body and
              soul.
            </p>
            <p>
              Drawing inspiration from the natural world and the spaces between
              genres, A.M. Owl crafts compositions that blend intricate
              arrangements with infectious rhythms, creating an experience that
              is both sophisticated and deeply accessible.
            </p>
            <p>
              Their debut EP captures this essence—a musical exploration that
              begins in darkness and opens into expansive, soulful landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section id="members" className="py-24 px-6 bg-[#0f0f0a] relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="text-[#d4d4d4]">Band</span>{" "}
            <span className="text-[#c53030]">Members</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {bandMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#1a1a15] rounded-lg p-6 border border-[#2a2a1a] hover:border-[#c53030] transition-all hover:transform hover:scale-105"
              >
                <div className="mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f] rounded-lg overflow-hidden relative">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${
                          member.name === "Alex Fritzel" ||
                          member.name === "Ian Walsh"
                            ? "object-top"
                            : "object-center"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl text-[#c53030] font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#d4d4d4]">
                  {member.name}
                </h3>
                <p className="text-[#c53030] font-semibold uppercase tracking-wider text-sm">
                  {member.role}
                </p>
                <p className="text-[#9ca3af] text-sm mt-2">
                  {member.instrument}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-24 px-6 bg-[#0f0f0a] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            <span className="text-[#d4d4d4]">Music</span>
          </h2>
          <div className="bg-[#1a1a15] rounded-lg p-12 border border-[#2a2a1a]">
            <div className="mb-8">
              <div className="w-full max-w-md mx-auto mb-6">
                <img
                  src="/album.png"
                  alt="A.M. Owl EP"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
            <p className="text-[#9ca3af] mb-8 text-lg">
              Debut EP has released! Listen on Spotify
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://open.spotify.com/artist/4IBm4lQIyr8nQt8UbiaE19?si=tzo9ARFIQmiP8fqJOeIeRQ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#1DB954] text-white rounded-full font-semibold hover:bg-[#1ed760] transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.419.24-.66.66-.84 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Listen on Spotify
              </a>
              <button className="px-8 py-4 border-2 border-[#c53030] text-[#c53030] rounded-full font-semibold hover:bg-[#c53030] hover:text-white transition-colors uppercase tracking-wider text-sm">
                Follow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="py-24 px-6 bg-[#0d1a0d] relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            <span className="text-[#d4d4d4]">Upcoming</span>{" "}
            <span className="text-[#c53030]">Shows</span>
          </h2>
          {showsLoading ? (
            <div className="bg-[#1a1a15] rounded-lg p-12 border border-[#2a2a1a] text-center">
              <p className="text-xl text-[#9ca3af]">Loading shows...</p>
            </div>
          ) : shows.length === 0 ? (
            <div className="bg-[#1a1a15] rounded-lg p-12 border border-[#2a2a1a] text-center">
              <p className="text-xl text-[#9ca3af]">
                Stay tuned for upcoming shows
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="bg-[#1a1a15] rounded-lg p-6 border border-[#2a2a1a] hover:border-[#c53030] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-2xl font-bold text-[#d4d4d4] mb-2">
                        {new Date(show.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-lg text-[#c53030] font-semibold mb-1">
                        {show.venue}
                      </p>
                      <p className="text-[#9ca3af]">{show.city}</p>
                      {show.date && (
                        <p className="text-sm text-[#9ca3af] mt-2">
                          {new Date(show.date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    {show.ticketLink && (
                      <a
                        href={show.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#c53030] text-white rounded-full font-semibold hover:bg-[#a02626] transition-colors uppercase tracking-wider text-sm text-center"
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#0f0f0a] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* YouTube Video */}
          <div className="mb-12">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a15] border border-[#2a2a1a]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1EoHPDCYPB4"
                title="A.M. Owl - Cosmic Girl (Jamiroquai Cover)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-[#9ca3af] text-sm mt-4">
              Cosmic Girl (Jamiroquai Cover)
            </p>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            <span className="text-[#d4d4d4]">Get In</span>{" "}
            <span className="text-[#c53030]">Touch</span>
          </h2>

          <p className="text-lg text-[#9ca3af] mb-12 max-w-2xl mx-auto">
            For bookings, collaborations, or just to say hello, reach out to us.
          </p>
          <div className="bg-[#1a1a15] rounded-lg p-12 border border-[#2a2a1a]">
            <div className="text-center space-y-6">
              <p className="text-xl text-[#d4d4d4] mb-4">Booking & Inquiries</p>
              <a
                href="mailto:amowlfunk@gmail.com?subject=Booking Inquiry for A.M. Owl"
                className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-full font-semibold hover:bg-[#a02626] transition-colors uppercase tracking-wider text-sm"
              >
                Email Us
              </a>
              <p className="text-[#9ca3af] text-sm mt-4">
                <a
                  href="mailto:amowlfunk@gmail.com?subject=Booking Inquiry for A.M. Owl"
                  className="text-[#c53030] hover:text-[#a02626] transition-colors"
                >
                  amowlfunk@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0f0f0a] border-t border-[#1a1a15]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.instagram.com/a.m._owl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/4IBm4lQIyr8nQt8UbiaE19?si=tzo9ARFIQmiP8fqJOeIeRQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/channel/UCE0gHeK7bvKYQrvMvf6_TOQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              YouTube
            </a>
            <a
              href="#"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              Bandcamp
            </a>
          </div>
          <p className="text-[#6b7280] text-xs">
            © {new Date().getFullYear()} A.M. Owl. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
