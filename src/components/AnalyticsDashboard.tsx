
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  // Fetch analytics summary
  const { data: summary, isLoading } = useQuery({
    queryKey: ['analytics-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_summary')
        .select('*')
        .order('date', { ascending: false })
        .limit(7);
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch recent page views
  const { data: pageViews } = useQuery({
    queryKey: ['recent-page-views'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('page_path, visited_at')
        .eq('consent_given', true)
        .order('visited_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      
      // Group by page and count
      const pageCounts = data.reduce((acc: any, item) => {
        acc[item.page_path] = (acc[item.page_path] || 0) + 1;
        return acc;
      }, {});
      
      return Object.entries(pageCounts)
        .map(([page, count]) => ({ page, views: count }))
        .sort((a: any, b: any) => b.views - a.views)
        .slice(0, 5);
    }
  });

  const deviceColors = ['#3B82F6', '#10B981', '#F59E0B'];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 bg-gray-800 border-gray-700 animate-pulse">
              <div className="h-20 bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const latestSummary = summary?.[0];
  const weeklyData = summary?.reverse() || [];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-950 via-gray-900 to-black min-h-screen">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Total Visits Today</h3>
          <p className="text-2xl font-bold text-white">{latestSummary?.total_visits || 0}</p>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Unique Visitors</h3>
          <p className="text-2xl font-bold text-white">{latestSummary?.unique_visitors || 0}</p>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Page Views</h3>
          <p className="text-2xl font-bold text-white">{latestSummary?.page_views || 0}</p>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Active Days</h3>
          <p className="text-2xl font-bold text-white">{weeklyData.length}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visits Chart */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Visits</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="total_visits" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Device Breakdown */}
        {latestSummary?.device_breakdown && (
          <Card className="p-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Device Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(latestSummary.device_breakdown).map(([device, count]) => ({
                    name: device.charAt(0).toUpperCase() + device.slice(1),
                    value: count
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.keys(latestSummary.device_breakdown).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={deviceColors[index % deviceColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Top Pages */}
      {pageViews && pageViews.length > 0 && (
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-3">
            {pageViews.map((page: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-300">{page.page}</span>
                <span className="text-blue-400 font-medium">{page.views} views</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
