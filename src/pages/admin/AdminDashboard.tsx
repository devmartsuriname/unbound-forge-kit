import { CalendarDays, MapPin, MessageSquare, CreditCard, TrendingUp, Users, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="tg-admin-layout">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Dashboard Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: 'var(--tg-common-black)', 
                  margin: '0 0 4px 0',
                  fontFamily: 'var(--tg-ff-body)'
                }}>
                  Dashboard
                </h1>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--tg-grey-4)', 
                  margin: '0'
                }}>
                  Welcome back to your admin portal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row gx-24 gy-24 mb-4">
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="tg-admin-card">
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
            <div className="tg-admin-card">
              <div className="card-header stat-header">
                <h4 className="stat-title">Active Tours</h4>
                <div className="stat-icon" style={{ background: 'rgba(247, 74, 31, 0.1)', color: 'var(--tg-theme-secondary)' }}>
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
            <div className="tg-admin-card">
              <div className="card-header stat-header">
                <h4 className="stat-title">Contact Messages</h4>
                <div className="stat-icon" style={{ background: 'rgba(255, 153, 1, 0.1)', color: 'var(--tg-common-yellow)' }}>
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
            <div className="tg-admin-card">
              <div className="card-header stat-header">
                <h4 className="stat-title">Revenue</h4>
                <div className="stat-icon" style={{ background: 'rgba(0, 200, 0, 0.1)', color: '#00c800' }}>
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
        <div className="row gx-24 gy-24">
          <div className="col-xl-8 col-lg-7">
            <div className="tg-admin-card">
              <div className="card-header">
                <h3>Recent Activity</h3>
                <p>Latest bookings and contact submissions</p>
              </div>
              <div className="card-content">
                <div className="text-center" style={{ 
                  padding: '40px 20px', 
                  color: 'var(--tg-grey-4)',
                  fontSize: '14px'
                }}>
                  <TrendingUp size={48} style={{ 
                    color: 'var(--tg-grey-3)', 
                    marginBottom: '16px',
                    opacity: '0.5'
                  }} />
                  <p style={{ margin: '0' }}>No recent activity to display</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="tg-admin-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
                <p>Common management tasks</p>
              </div>
              <div className="card-content">
                <div className="tg-quick-actions">
                  <a href="/admin/tours" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '8px', 
                        background: 'rgba(86, 12, 227, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tg-theme-primary)'
                      }}>
                        <MapPin size={18} />
                      </div>
                      <div style={{ flex: '1' }}>
                        <h4 className="action-title">Manage Tours</h4>
                        <p className="action-description">Add or edit tour offerings</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/team" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '8px', 
                        background: 'rgba(247, 74, 31, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tg-theme-secondary)'
                      }}>
                        <Users size={18} />
                      </div>
                      <div style={{ flex: '1' }}>
                        <h4 className="action-title">Team Management</h4>
                        <p className="action-description">Update team member profiles</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/contact" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '8px', 
                        background: 'rgba(255, 153, 1, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tg-common-yellow)'
                      }}>
                        <MessageSquare size={18} />
                      </div>
                      <div style={{ flex: '1' }}>
                        <h4 className="action-title">Contact Messages</h4>
                        <p className="action-description">Review and respond to inquiries</p>
                      </div>
                    </div>
                  </a>

                  <a href="/admin/settings" className="action-item">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '8px', 
                        background: 'rgba(102, 102, 102, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tg-grey-4)'
                      }}>
                        <Settings size={18} />
                      </div>
                      <div style={{ flex: '1' }}>
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