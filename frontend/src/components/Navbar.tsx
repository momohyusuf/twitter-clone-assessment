import { useAppSelector, useAppDispatch } from "../redux/app/hooks";

import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import UserAccount from "./UserAccount";
import { AuthService } from "../services/authService";
import { useEffect, useState } from "react";
import { setUser } from "../redux/feature/userSlice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const [authenticating, setAuthenticating] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function authenticateUser() {
    try {
      const refreshedUser = await AuthService.refreshUser();

      dispatch(setUser(refreshedUser));
      console.log(refreshedUser);
      navigate("/timeline");
    } catch (error) {
      console.error("Failed to refresh user:", error);
    } finally {
      setAuthenticating(false);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  //   if (authenticating) {
  //     return
  //   }
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Link to="/">
          <h3 className="text-lg font-bold">TW-C</h3>
        </Link>
        {authenticating ? null : (
          <div className="flex gap-4 items-center">
            {/* <Link to="/timeline">Ho</Link> */}
            {user ? (
              <UserAccount user={user} />
            ) : (
              <>
                <Link to="/auth/login">
                  <Button className="rounded-3xl" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="rounded-3xl">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
