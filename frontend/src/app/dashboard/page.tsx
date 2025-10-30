'use client';

import Schedule from '@/components/dashboard/Schedule';
import Notifications from '@/components/dashboard/Notifications';

const DashboardPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Schedule />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
