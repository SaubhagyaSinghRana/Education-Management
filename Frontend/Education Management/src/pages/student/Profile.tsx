import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  motherName: string;
  fatherName: string;
  role: "admin" | "teacher" | "student";
  status: "active" | "inactive" | "pending" | "deleted";
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get<ProfileResponse>(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.data);
    } catch (error) {
      console.error("PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">Profile not found</div>;
  }

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>
            <p className="font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>
            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>
            <p className="font-medium capitalize">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>
            <p className="font-medium capitalize">
              {user.status}
            </p>
          </div>
           <div>
            <p className="text-sm text-muted-foreground">
              Father Name
            </p>
            <p className="font-medium capitalize">
              {user.fatherName }
            </p>
          </div>
           <div>
            <p className="text-sm text-muted-foreground">
              Mother Name
            </p>
            <p className="font-medium capitalize">
              {user.motherName}
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;