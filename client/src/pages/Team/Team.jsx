import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import MemberCard from "../../components/team/MemberCard";
import CreateMemberModal from "../../components/team/CreateMemberModal";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../../services/teamService";

import "./Team.css";

const Team = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {

      const data = await getMembers();

      setMembers(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleCreate = async (member) => {

    await createMember(member);

    setShowModal(false);

    loadMembers();

  };

  const handleUpdate = async (member) => {

    await updateMember(selectedMember._id, member);

    setSelectedMember(null);

    setShowModal(false);

    loadMembers();

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this member?")) return;

    await deleteMember(id);

    loadMembers();

  };

  const filteredMembers = members.filter((member) => {

    const matchesSearch =
      member.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      member.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" ||
      member.status === statusFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );

  });

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-main">

          <div className="team-header">

            <div>

              <h1>👥 Team Members</h1>

              <p>

                Manage your team members.

              </p>

            </div>

            <button
              className="create-btn"
              onClick={() => {

                setSelectedMember(null);

                setShowModal(true);

              }}
            >
              + Add Member
            </button>

          </div>

          <div className="team-filters">

            <input
              type="text"
              placeholder="🔍 Search Member..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
            >

              <option>All</option>

              <option>Frontend Developer</option>

              <option>Backend Developer</option>

              <option>Full Stack Developer</option>

              <option>UI/UX Designer</option>

              <option>Project Manager</option>

              <option>Tester</option>

            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option>All</option>

              <option>Active</option>

              <option>Inactive</option>

            </select>

          </div>
                    {loading ? (

            <h2>Loading...</h2>

          ) : filteredMembers.length === 0 ? (

            <div className="empty-state">

              <h2>No Team Members 👥</h2>

              <p>Add your first team member.</p>

            </div>

          ) : (

            <div className="team-grid">

              {filteredMembers.map((member) => (

                <MemberCard
                  key={member._id}
                  member={member}
                  onEdit={(member) => {

                    setSelectedMember(member);

                    setShowModal(true);

                  }}
                  onDelete={handleDelete}
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {showModal && (

        <CreateMemberModal

          member={selectedMember}

          onClose={() => {

            setShowModal(false);

            setSelectedMember(null);

          }}

          onSave={
            selectedMember
              ? handleUpdate
              : handleCreate
          }

        />

      )}

    </div>

  );

};

export default Team;