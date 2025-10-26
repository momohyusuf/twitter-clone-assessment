import useSWR from "swr";
import { UsersService } from "../../services/usersServices";
import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

interface User {
  userId: string;
  username: string;
}

interface ShareWithUsersProps {
  //   onShare?: (selectedUserIds: string[]) => void;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onShare?: (selectedUserIds: string[]) => void;
}

const ShareWithUsers = ({
  selectedUsers,
  setSelectedUsers,
  onShare,
}: ShareWithUsersProps) => {
  const [page, setPage] = useState(1);

  const MAX_SELECTION = 10;

  const { data, error, isLoading } = useSWR(
    `/users/others?limit=${10}&page=${page}`,
    UsersService.getOtherUsers
  );

  const handleCheckboxChange = (userId: string, checked: boolean) => {
    if (checked) {
      if (selectedUsers.length < MAX_SELECTION) {
        setSelectedUsers([...selectedUsers, userId]);
      }
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(selectedUsers);
    }
  };

  const isUserSelected = (userId: string) => selectedUsers.includes(userId);
  const isMaxReached = selectedUsers.length >= MAX_SELECTION;

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading users</div>;

  return (
    <div className="space-y-4">
      {/* Selection counter */}
      <div className="flex items-center justify-between rounded-lg">
        {selectedUsers.length > 0 && (
          <Button onClick={handleShare} size="sm">
            Share with {selectedUsers.length}{" "}
            {selectedUsers.length === 1 ? "person" : "people"}
          </Button>
        )}
      </div>

      {/* User list */}
      <div className="space-y-2">
        {data?.data?.map((user: User) => {
          const isChecked = isUserSelected(user.userId);
          const isDisabled = !isChecked && isMaxReached;

          return (
            <div
              key={user.userId}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed bg-muted"
                  : "hover:bg-accent cursor-pointer"
              }`}
            >
              <Checkbox
                id={user.userId}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(user.userId, checked as boolean)
                }
              />
              <Label
                htmlFor={user.userId}
                className={`flex items-center gap-3 flex-1 ${
                  isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="bg-primary text-primary-foreground uppercase font-semibold w-10 h-10 grid place-items-center rounded-full">
                  {user.username.slice(0, 1)}
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                </div>
              </Label>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {data?.totalPages && data.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={!data.hasPreviousPage}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={!data.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}

      {/* Max limit warning */}
      {isMaxReached && (
        <p className="text-sm text-orange-500 text-center p-2 bg-orange-50 rounded">
          Maximum selection limit reached. Unselect users to choose different
          ones.
        </p>
      )}
    </div>
  );
};

export default ShareWithUsers;
