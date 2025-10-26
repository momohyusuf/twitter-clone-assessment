import { Input } from "../../components/ui/input";
import { Users, Send, Loader } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import ShareWithUsers from "./ShareWithUsers";
import { useState } from "react";
import { TweetService } from "../../services/tweetServices";

const CreateTweet = ({ mutate }: { mutate: () => void }) => {
  const [content, setContent] = useState("");
  const [showOtherUsers, setShowOtherUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTweetSubmit = async () => {
    setLoading(true);
    try {
      const response = await TweetService.postTweet({
        content,
        ...(selectedUsers.length > 0 && { recipientIds: selectedUsers }),
      });
      console.log("Tweet posted successfully:", response);
      setContent("");
      setSelectedUsers([]);
      mutate();
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <div className="relative">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-300 p-4 py-6 rounded-3xl shadow-0"
          placeholder="What's happening?"
        />
        {loading ? (
          <div className="absolute right-1 top-1 cursor-pointer bg-accent p-2 rounded-full">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <button
            title="post content"
            disabled={content.trim().length < 2}
            onClick={handleTweetSubmit}
            className="absolute right-1 top-1 cursor-pointer bg-accent p-2 rounded-full hover:bg-accent/80 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send />
          </button>
        )}
      </div>

      <Popover onOpenChange={setShowOtherUsers}>
        <PopoverTrigger>
          <div className="flex cursor-pointer text-sm items-center mt-4 gap-3 text-blue-500">
            <Users size={16} /> <span>Share with</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {showOtherUsers && (
            <ShareWithUsers
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateTweet;
