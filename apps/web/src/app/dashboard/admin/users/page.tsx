// "use client";

// import { useEffect, useState } from "react";

// type Session = {
//   id: string;
//   ip?: string;
//   createdAt: string;
// };

// type User = {
//   id: string;
//   email: string;
//   role: string;
//   isBanned: boolean;
//   sessions: Session[];
// };

// export default function UserManagementPage() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("/api/admin/users");
//         if (!res.ok) throw new Error("Failed to fetch");
//         const data = await res.json();
//         setUsers(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>User Management</h1>

//       <table border={1}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Last Login</th>
//             <th>Sessions Count</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.sessions[0]?.createdAt ?? "N/A"}</td>
//               <td>{user.sessions.length}</td>
//               <td>{user.isBanned ? "Banned" : "Active"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

export default function UserManagementPage() {
  return (
    <div>
      <h1>User Management</h1>
    </div>
  );
}
