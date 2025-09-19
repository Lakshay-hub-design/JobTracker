import React from "react";
  import { useNavigate } from 'react-router-dom';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { BellRing, CalendarDays } from 'lucide-react';
  import { formatDistanceToNow } from 'date-fns';

const FollowUpBell = ({followUps  = []}) => {

  const upcomingCount = followUps.length;
  const navigate = useNavigate()
  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full text-muted-foreground hover:text-foreground hover:dark:bg-[#181818] hover:dark:text-white"
          >
            <BellRing className="h-5 w-5" />
            {upcomingCount > 0 && (
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-white opacity-75 "></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-white"></span>
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 dark:bg-[#171717] dark:text-white border-[#363636]" align="end">
          <div className="grid gap-4">
            <div className="space-y-2 ">
              <h4 className="font-medium leading-none">Upcoming Follow-ups</h4>
              <p className="text-sm text-muted-foreground">
                You have {upcomingCount} follow-up{upcomingCount !== 1 ? 's' : ''} scheduled.
              </p>
            </div>
            <div className="grid gap-2">
              {upcomingCount === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-4">You're all caught up!</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {followUps.map((job) => (
                    <li
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="p-2 rounded-md hover:bg-muted hover:dark:bg-[#1d1d1d] cursor-pointer"
                    >
                      <p className="font-semibold text-sm">{job.position}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mt-1">
                        <CalendarDays size={12} />
                        {formatDistanceToNow(new Date(job.followUpDate), { addSuffix: true })}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
  );
};

export default FollowUpBell;
