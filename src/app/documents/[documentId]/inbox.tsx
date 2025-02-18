"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative flex items-center justify-center rounded-sm p-2 hover:bg-muted">
          <BellIcon className="size-5 shrink-0 text-amber-100" />
          {inboxNotifications.length > 0 && (
            <div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 p-1 text-sm text-black">
              <span className="text-[12px]">{inboxNotifications.length}</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {inboxNotifications.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
              />
            ))}
          </InboxNotificationList>
        ) : (
          <div className="w-[300px] p-4 text-center text-sm text-black">
            No Notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Inbox = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

export default Inbox;
