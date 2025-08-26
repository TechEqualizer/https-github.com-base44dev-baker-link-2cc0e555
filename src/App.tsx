import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { Search, Plus, Users, BarChart3, TrendingUp } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const user = {
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
  };

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: <Users className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8%',
      icon: <BarChart3 className="h-6 w-6 text-success-600" />,
    },
    {
      title: 'Growth',
      value: '23.5%',
      change: '+4%',
      icon: <TrendingUp className="h-6 w-6 text-accent-600" />,
    },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Dashboard"
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenu={sidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-neutral-600 mt-1">
                  Here's what's happening with your application today.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Search..."
                  leftIcon={<Search className="h-4 w-4" />}
                  className="w-64"
                />
                <Button
                  onClick={() => setModalOpen(true)}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add New
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} hover>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-success-600 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-100 rounded-lg">
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and changes in your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900">
                            New user registered
                          </p>
                          <p className="text-xs text-neutral-500">
                            2 minutes ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-20 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Manage Users</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Content</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      <span className="text-sm">Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Example */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Item"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter item name"
          />
          <Input
            label="Description"
            placeholder="Enter description"
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;