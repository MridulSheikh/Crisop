'use client'

import { useState, useEffect } from 'react'

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
}

type Role = {
  id: string
  name: string
  description?: string
}

const TeamPage = () => {
  // Team members state
  const [team, setTeam] = useState<TeamMember[]>([])

  // Roles state
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    // Fetch or initialize team members
    setTeam([
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Manager' },
      { id: '3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'Support' },
    ])

    // Fetch or initialize roles
    setRoles([
      { id: 'r1', name: 'Admin', description: 'Full access to all resources' },
      { id: 'r2', name: 'Manager', description: 'Manage products and orders' },
      { id: 'r3', name: 'Support', description: 'Customer support role' },
    ])
  }, [])

  // Team handlers
  const handleAddMember = () => alert('Add Team Member form here')
  const handleEditMember = (id: string) => alert(`Edit Team Member ${id}`)
  const handleDeleteMember = (id: string) => {
    if (confirm('Delete this team member?')) {
      setTeam(prev => prev.filter(member => member.id !== id))
    }
  }

  // Role handlers
  const handleAddRole = () => alert('Add Role form here')
  const handleEditRole = (id: string) => alert(`Edit Role ${id}`)
  const handleDeleteRole = (id: string) => {
    if (confirm('Delete this role?')) {
      setRoles(prev => prev.filter(role => role.id !== id))
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Team & Roles</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Team Members */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
            <button
              onClick={handleAddMember}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
            >
              + Add Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map(member => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-3 font-medium text-gray-800">{member.name}</td>
                    <td className="p-3 text-gray-600">{member.email}</td>
                    <td className="p-3 text-gray-600">{member.role}</td>
                    <td className="p-3 text-right space-x-3">
                      <button
                        onClick={() => handleEditMember(member.id)}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {team.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Roles */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Roles</h2>
            <button
              onClick={handleAddRole}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
            >
              + Add Role
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b">Role Name</th>
                  <th className="p-3 border-b">Description</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr
                    key={role.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-3 font-medium text-gray-800">{role.name}</td>
                    <td className="p-3 text-gray-600">{role.description || '-'}</td>
                    <td className="p-3 text-right space-x-3">
                      <button
                        onClick={() => handleEditRole(role.id)}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {roles.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TeamPage;