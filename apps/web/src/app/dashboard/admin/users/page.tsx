"use client";

import { UserCreateDialogF } from "@/components/dashboard/UserCreateDialogF";
import { useUser } from "@/react-query/files/file-actions";

const UserPage = () => {
  const { data, isLoading, isError, error } = useUser();
  const totalUsers = data?.length ?? 0;
  const activeUsers = data?.filter((u: any) => !u.isBanned).length ?? 0;
  const bannedUsers = data?.filter((u: any) => u.isBanned).length ?? 0;

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-600">{(error as Error).message}</p>;

  // testing demo data
  const user = {
    name: "Sadid Hasan",
    email: "sadidhasan56+2@gmail.com",
    emailVerified: false,
    image: null,
    role: "USER",
    createdAt: "2025-12-27T09:11:30.894Z",
    updatedAt: "2025-12-27T09:11:30.894Z",
    banned: false,
    banReason: null,
    sessions: [],
  };

  return (
    <div>
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-2xl font-semibold mb-6">
            User Management
          </h1>
          <UserCreateDialogF user={user} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{totalUsers}</p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm bg-green-50">
            <p className="text-sm text-green-700">Active Users</p>
            <p className="text-2xl font-semibold text-green-700">
              {activeUsers}
            </p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm bg-red-50">
            <p className="text-sm text-red-700">Banned Users</p>
            <p className="text-2xl font-semibold text-red-700">{bannedUsers}</p>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {data?.map((user: any) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 shadow-sm space-y-3"
            >
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">{user.name ?? "N/A"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="truncate max-w-full">{user.email}</p>
              </div>

              {/* Verified */}
              <div>
                <p className="text-xs text-gray-500">Verified</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.emailVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                </span>
              </div>

              {/* Role + Status */}
              <div className="flex justify-between">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
                  {user.role}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.isBanned
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.isBanned ? "Banned" : "Active"}
                </span>
              </div>

              {/* Ban Status */}
              <div>
                <p className="text-xs text-gray-500">Ban Status</p>
                {user.isBanned ? (
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                    Ban
                  </span>
                ) : (
                  <span className="text-xs text-gray-600">—</span>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded">
                  Update
                </button>
                <button className="flex-1 bg-red-600 text-white text-xs py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Verified</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">
                  Ban Reason
                </th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {user.name ?? "N/A"}
                  </td>

                  <td
                    className="px-4 py-3 max-w-[220px] truncate"
                    title={user.email}
                  >
                    {user.email}
                  </td>

                  {/* Verified */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.emailVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>

                  <td className="px-4 py-3 capitalize">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        user.isBanned
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>

                  {/* Ban Status (Ban in red if banned) */}
                  <td className="px-4 py-3">
                    {user.isBanned ? (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                        Ban
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-xs">
                        Update
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
