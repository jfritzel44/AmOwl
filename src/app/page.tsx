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
    name: "Bryan Roberts",
    role: "Bass",
    instrument: "Bass",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </div>
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
            <a
              href="#contact"
              className="hover:text-[#c53030] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4a7c7e] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c53030] rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </h1>
          <div className="text-xl md:text-2xl mb-4 text-[#d4d4d4] font-light tracking-widest uppercase">
            Funk • Fusion • Soul
          </div>
          <p className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
            Emerging from the depths with a sound that blends the raw energy of
            funk, the complexity of fusion, and the soulful depth of classic
            soul.
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
              className="px-8 py-4 border-2 border-[#4a7c7e] text-[#4a7c7e] rounded-full font-semibold hover:bg-[#4a7c7e] hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#0f0f0f]">
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
      <section id="members" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="text-[#d4d4d4]">Band</span>{" "}
            <span className="text-[#c53030]">Members</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-[#2a2a2a] hover:border-[#4a7c7e] transition-all hover:transform hover:scale-105"
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
                        <div className="text-4xl text-[#4a7c7e] font-bold">
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
      <section id="music" className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            <span className="text-[#d4d4d4]">Music</span>
          </h2>
          <div className="bg-[#1a1a1a] rounded-lg p-12 border border-[#2a2a2a]">
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
              <button className="px-8 py-4 border-2 border-[#4a7c7e] text-[#4a7c7e] rounded-full font-semibold hover:bg-[#4a7c7e] hover:text-white transition-colors uppercase tracking-wider text-sm">
                Follow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            <span className="text-[#d4d4d4]">Get In</span>{" "}
            <span className="text-[#c53030]">Touch</span>
          </h2>
          <p className="text-lg text-[#9ca3af] mb-12 max-w-2xl mx-auto">
            For bookings, collaborations, or just to say hello, reach out to us.
          </p>
          <div className="bg-[#1a1a1a] rounded-lg p-12 border border-[#2a2a2a]">
            <form className="space-y-6 max-w-md mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#4a7c7e] transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#4a7c7e] transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full px-6 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#4a7c7e] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#c53030] text-white rounded-full font-semibold hover:bg-[#a02626] transition-colors uppercase tracking-wider text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0f0f0f] border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </div>
          <p className="text-[#6b7280] text-sm mb-6">Funk • Fusion • Soul</p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[#6b7280] hover:text-[#c53030] transition-colors"
            >
              Spotify
            </a>
            <a
              href="#"
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
