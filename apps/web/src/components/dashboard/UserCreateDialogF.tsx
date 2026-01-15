"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

type SessionType = {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
};

type UserType = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  banned: boolean;
  banReason: string | null;
  sessions: SessionType[];
};

export function UserCreateDialogF({ user }: { user: UserType }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    banned: user.banned,
    banReason: user.banReason ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Updated User:", form);
    // TODO: axios.post('/api/user/update', form)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-700 bg-blue-100" variant="outline">
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>User information & sessions.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Basic Info */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Image Url</Label>
            <Input
              name="image"
              type="text"
              // value={form.image}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label>Role</Label>
            <Input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="USER or ADMIN"
            />
          </div>

          {/* <div className="grid gap-2">
            <Label>Banned</Label>
            <Input
              name="banned"
              value={String(form.banned)}
              onChange={handleChange}
              placeholder="true / false"
            />
          </div> */}

          {/* <div className="grid gap-2">
            <Label>Ban Reason</Label>
            <Input
              name="banReason"
              value={form.banReason}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div> */}

          {/* Sessions */}
          {/* <div className="mt-4">
            <Label className="font-semibold">Active Sessions</Label>
            <div className="space-y-3 mt-2">
              {user.sessions.length === 0 ? (
                <div>No active sessions</div>
              ) : (
                user.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="border rounded p-2 text-sm space-y-1"
                  >
                    <div>ID: {session.id}</div>
                    <div>IP: {session.ipAddress}</div>
                    <div>User Agent: {session.userAgent}</div>
                    <div>
                      Expires: {new Date(session.expiresAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div> */}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
