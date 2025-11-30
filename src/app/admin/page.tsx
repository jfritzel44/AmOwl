"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketLink?: string;
}

export default function AdminDashboard() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: "",
    venue: "",
    city: "",
    ticketLink: "",
  });

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/admin/shows");
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await response.json();
      if (response.ok) {
        setShows(data.shows || []);
      } else {
        setError(data.error || "Failed to fetch shows");
      }
    } catch (err) {
      setError("Failed to fetch shows");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const url = editingShow
        ? `/api/admin/shows/${editingShow.id}`
        : "/api/admin/shows";
      const method = editingShow ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        await fetchShows();
        setShowForm(false);
        setEditingShow(null);
        setFormData({ date: "", venue: "", city: "", ticketLink: "" });
      } else {
        setError(data.error || "Failed to save show");
      }
    } catch (err) {
      setError("Failed to save show");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this show?")) return;

    try {
      const response = await fetch(`/api/admin/shows/${id}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (response.ok) {
        await fetchShows();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete show");
      }
    } catch (err) {
      setError("Failed to delete show");
    }
  };

  const handleEdit = (show: Show) => {
    setEditingShow(show);
    setFormData({
      date: show.date,
      venue: show.venue,
      city: show.city,
      ticketLink: show.ticketLink || "",
    });
    setShowForm(true);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0a] text-[#ededed] flex items-center justify-center">
        <p className="text-[#9ca3af]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0a] text-[#ededed] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-[#d4d4d4]">A.M.</span>{" "}
              <span className="text-[#c53030]">OWL</span>{" "}
              <span className="text-[#d4d4d4]">Admin</span>
            </h1>
            <p className="text-[#9ca3af]">Manage upcoming shows</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-[#2a2a1a] text-[#9ca3af] rounded-lg hover:border-[#c53030] hover:text-[#c53030] transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#c53030]/20 border border-[#c53030] rounded-lg text-[#c53030]">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingShow(null);
              setFormData({ date: "", venue: "", city: "", ticketLink: "" });
            }}
            className="px-6 py-3 bg-[#c53030] text-white rounded-lg font-semibold hover:bg-[#a02626] transition-colors"
          >
            {showForm ? "Cancel" : "Add New Show"}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1a1a15] rounded-lg p-6 border border-[#2a2a1a] mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#d4d4d4]">
              {editingShow ? "Edit Show" : "Add New Show"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-[#d4d4d4] mb-2"
                >
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f0f0a] border border-[#2a2a1a] rounded-lg text-white focus:outline-none focus:border-[#c53030] transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-[#d4d4d4] mb-2"
                >
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f0f0a] border border-[#2a2a1a] rounded-lg text-white focus:outline-none focus:border-[#c53030] transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#d4d4d4] mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f0f0a] border border-[#2a2a1a] rounded-lg text-white focus:outline-none focus:border-[#c53030] transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ticketLink"
                  className="block text-sm font-medium text-[#d4d4d4] mb-2"
                >
                  Ticket Link (optional)
                </label>
                <input
                  type="url"
                  id="ticketLink"
                  value={formData.ticketLink}
                  onChange={(e) =>
                    setFormData({ ...formData, ticketLink: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f0f0a] border border-[#2a2a1a] rounded-lg text-white focus:outline-none focus:border-[#c53030] transition-colors"
                  placeholder="https://..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#c53030] text-white rounded-lg font-semibold hover:bg-[#a02626] transition-colors"
              >
                {editingShow ? "Update Show" : "Add Show"}
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#1a1a15] rounded-lg p-6 border border-[#2a2a1a]">
          <h2 className="text-2xl font-bold mb-4 text-[#d4d4d4]">
            Upcoming Shows
          </h2>
          {shows.length === 0 ? (
            <p className="text-[#9ca3af]">No shows scheduled</p>
          ) : (
            <div className="space-y-4">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="bg-[#0f0f0a] rounded-lg p-4 border border-[#2a2a1a] flex justify-between items-start"
                >
                  <div>
                    <p className="text-lg font-semibold text-[#d4d4d4]">
                      {new Date(show.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[#c53030] font-medium">{show.venue}</p>
                    <p className="text-[#9ca3af]">{show.city}</p>
                    {show.ticketLink && (
                      <a
                        href={show.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4a7c2e] hover:text-[#5a9c4e] transition-colors text-sm"
                      >
                        Get Tickets →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(show)}
                      className="px-4 py-2 border border-[#2a2a1a] text-[#9ca3af] rounded-lg hover:border-[#c53030] hover:text-[#c53030] transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(show.id)}
                      className="px-4 py-2 bg-[#c53030] text-white rounded-lg hover:bg-[#a02626] transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

