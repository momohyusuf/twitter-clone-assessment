import { ChevronDown, Loader } from "lucide-react";
import type { IUser } from "../../interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UsersService } from "../services/usersServices";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { AuthService } from "../services/authService";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../redux/app/hooks";
import { clearUser } from "../redux/feature/userSlice";

const UserAccount = ({ user }: { user: IUser | null }) => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangePassword = async () => {
    if (newPassword.trim().length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      setLoading(true);
      await UsersService.changePassword({ newPassword: newPassword.trim() });
      toast.success("Password updated successfully");
      setNewPassword("");
      setOpen(false);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/timeline">Timeline</Link>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          {user && (
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full">
              <span className="font-medium">{user.user.username}</span>
              <ChevronDown strokeWidth={3} />
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome</DialogTitle>
            <DialogDescription>
              <h2 className="text-3xl font-bold">
                Hello {user?.user.username}!
              </h2>

              <div className="border-y py-6 my-2">
                <h3>Account Settings</h3>
                <Input
                  placeholder="Update password"
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  className="mt-4 w-full"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Update Password"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                AuthService.logout();
                dispatch(clearUser());
                navigate("/auth/login", { replace: true });
              }}
            >
              <LogOut /> <span>Logout</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAccount;
