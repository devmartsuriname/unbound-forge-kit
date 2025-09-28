// Backup of src/pages/admin/AdminDashboard.tsx - 2025-09-28
import { CalendarDays, MapPin, MessageSquare, CreditCard, TrendingUp, Users, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="tg-admin-dashboard">
      <div className="container-xxl">
        {/* Dashboard Header */}
        <div className="row">
          <div className="col-12">
            <div className="dashboard-header mb-30">
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">Welcome back to your admin portal</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row gx-3 gy-3 mb-4">
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="tg-admin-card h-100">
              <div className="card-header stat-header">
                <h4 className="stat-title">Total Bookings</h4>
                <div className="stat-icon">
                  <CalendarDays size={20} />
                </div>
              </div>
              <div className="card-content stat-content">
                <h2 className="stat-value">0</h2>
                <p className="stat-description">No bookings yet</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="tg-admin-card h-100">
              <div className="card-header stat-header">
                <h4 className="stat-title">Active Tours</h4>
                <div className="stat-icon stat-icon-secondary">
                  <MapPin size={20} />
                </div>
              </div>
              <div className="card-content stat-content">
                <h2 className="stat-value">0</h2>
                <p className="stat-description">Create your first tour</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="tg-admin-card h-100">
              <div className="card-header stat-header">
                <h4 className="stat-title">Contact Messages</h4>
                <div className="stat-icon stat-icon-warning">
                  <MessageSquare size={20} />
                </div>
              </div>
              <div className="card-content stat-content">
                <h2 className="stat-value">0</h2>
                <p className="stat-description">No new messages</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="tg-admin-card h-100">
              <div className="card-header stat-header">
                <h4 className="stat-title">Revenue</h4>
                <div className="stat-icon stat-icon-success">
                  <CreditCard size={20} />
                </div>
              </div>
              <div className="card-content stat-content">
                <h2 className="stat-value">$0</h2>
                <p className="stat-description">This month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row gx-3 gy-3">
          <div className="col-xl-8 col-lg-7">
            <div className="tg-admin-card h-100">
              <div className="card-header">
                <h3>Recent Activity</h3>
                <p>Latest bookings and contact submissions</p>
              </div>
              <div className="card-content">
                <div className="empty-state text-center">
                  <TrendingUp size={48} className="empty-icon" />
                  <p className="empty-text">No recent activity to display</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="tg-admin-card h-100">
              <div className="card-header">
                <h3>Quick Actions</h3>
                <p>Common management tasks</p>
              </div>
              <div className="card-content">
                <div className="tg-quick-actions">
                  <a href="/admin/tours" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div className="action-icon action-icon-primary">
                        <MapPin size={18} />
                      </div>
                      <div className="action-content">
                        <h4 className="action-title">Manage Tours</h4>
                        <p className="action-description">Add or edit tour offerings</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/team" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div className="action-icon action-icon-secondary">
                        <Users size={18} />
                      </div>
                      <div className="action-content">
                        <h4 className="action-title">Team Management</h4>
                        <p className="action-description">Update team member profiles</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/contact" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div className="action-icon action-icon-warning">
                        <MessageSquare size={18} />
                      </div>
                      <div className="action-content">
                        <h4 className="action-title">Contact Messages</h4>
                        <p className="action-description">Review and respond to inquiries</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/settings" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div className="action-icon action-icon-neutral">
                        <Settings size={18} />
                      </div>
                      <div className="action-content">
                        <h4 className="action-title">System Settings</h4>
                        <p className="action-description">Configure system preferences</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
