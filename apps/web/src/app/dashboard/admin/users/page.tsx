"use client";

import { useUser } from "@/react-query/files/file-actions";

const UserPage = () => {
  const { data, isLoading, isError, error } = useUser();
  const totalUsers = data?.length ?? 0;
  const activeUsers = data?.filter((u: any) => !u.isBanned).length ?? 0;
  const bannedUsers = data?.filter((u: any) => u.isBanned).length ?? 0;

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-600">{(error as Error).message}</p>;

  return (
    <div>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl flex justify-center md:text-2xl font-semibold mb-6">
          User Management
        </h1>
        {/* card */}

        {/* ===== Summary Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Total Users */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{totalUsers}</p>
          </div>

          {/* Active Users */}
          <div className="border rounded-lg p-4 shadow-sm bg-green-50">
            <p className="text-sm text-green-700">Active Users</p>
            <p className="text-2xl font-semibold text-green-700">
              {activeUsers}
            </p>
          </div>

          {/* Banned Users */}
          <div className="border rounded-lg p-4 shadow-sm bg-red-50">
            <p className="text-sm text-red-700">Banned Users</p>
            <p className="text-2xl font-semibold text-red-700">{bannedUsers}</p>
          </div>
        </div>

        {/* ================= Mobile Cards ================= */}
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

              {user.isBanned && (
                <p className="text-xs text-gray-500 truncate">
                  Reason: {user.banReason ?? "N/A"}
                </p>
              )}

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

        {/* ================= Desktop Table ================= */}
        <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-left">Ban Reason</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {user.name ?? "N/A"}
                  </td>

                  {/* Email truncate */}
                  <td
                    className="px-4 py-3 max-w-[220px] truncate"
                    title={user.email}
                  >
                    {user.email}
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

                  {/* Ban reason truncate */}
                  <td
                    className="px-4 py-3 max-w-[200px] truncate text-gray-600"
                    title={user.banReason}
                  >
                    {user.banReason ?? "—"}
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
