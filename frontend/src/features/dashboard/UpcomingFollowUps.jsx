// src/components/UpcomingFollowUps.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BellRing, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // npm install date-fns

const UpcomingFollowUps = ({ followUps }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <BellRing className="h-6 w-6 text-primary" />
            <div>
                <CardTitle>Upcoming Follow-ups</CardTitle>
                <CardDescription>Tasks for the next 7 days.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {followUps.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No follow-ups scheduled.</p>
            <p className="text-xs text-muted-foreground mt-1">Great job staying on top of things!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {followUps.map((job) => (
              <li
                key={job._id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-grow">
                  <p className="font-semibold text-foreground">{job.position}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 mt-1">
                      <CalendarDays size={14} />
                      {/* Using date-fns for friendly date formatting like "in 3 days" */}
                      Follow-up {formatDistanceToNow(new Date(job.followUpDate), { addSuffix: true })}
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate(`/jobs/${job._id}`)}>
                    View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingFollowUps;
