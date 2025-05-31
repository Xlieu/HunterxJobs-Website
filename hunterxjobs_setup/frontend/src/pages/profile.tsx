import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { FaUser, FaLinkedin, FaKey, FaShieldAlt, FaCog, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { getUserProfile, updateUserProfile, getLinkedInProfile } from '../services/user.service';
import { toast } from 'react-toastify';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  linkedinId?: string;
  linkedinAccessToken?: string;
  linkedinTokenExpiry?: Date;
  createdAt: Date;
  lastLogin?: Date;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [linkedInProfile, setLinkedInProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile>>({});
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const userData = await getUserProfile();
        setProfile(userData);
        setUpdatedProfile({
          name: userData.name,
          email: userData.email
        });

        // Only fetch LinkedIn profile if connected
        if (userData.linkedinId) {
          try {
            const linkedInData = await getLinkedInProfile();
            setLinkedInProfile(linkedInData);
          } catch (error) {
            console.error('Error fetching LinkedIn profile:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const updatedData = await updateUserProfile(updatedProfile);
      setProfile(updatedData);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    // Validate passwords
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (changePassword.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile({ 
        currentPassword: changePassword.currentPassword,
        newPassword: changePassword.newPassword
      });
      
      // Reset password fields
      setChangePassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Check your current password.');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectLinkedIn = () => {
    router.push('/linkedin-token');
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && !profile) {
    return (
      <Layout title="Profile | HunterXJobs">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-white">Loading profile data...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Profile | HunterXJobs">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-4 text-center">Your Profile</h1>
            <p className="text-zinc-400 text-center max-w-2xl mx-auto">
              Manage your personal information, LinkedIn connection, and account settings.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-800 mb-10">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`pb-4 relative ${
                  activeTab === 'personal'
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <span className="flex items-center">
                  <FaUser className="mr-2" /> Personal Information
                </span>
              </button>
              <button
                onClick={() => setActiveTab('linkedin')}
                className={`pb-4 relative ${
                  activeTab === 'linkedin'
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <span className="flex items-center">
                  <FaLinkedin className="mr-2" /> LinkedIn Connection
                </span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`pb-4 relative ${
                  activeTab === 'security'
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <span className="flex items-center">
                  <FaShieldAlt className="mr-2" /> Security
                </span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="btn btn-outline btn-sm flex items-center"
                  >
                    {editing ? (
                      <>
                        <FaTimes className="mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <FaEdit className="mr-2" /> Edit
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-400 mb-2">Name</label>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedProfile.name || ''}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white">{profile?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-2">Email</label>
                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={updatedProfile.email || ''}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white">{profile?.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-2">Account Type</label>
                    <p className="text-white capitalize">{profile?.role}</p>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-2">Member Since</label>
                    <p className="text-white">{formatDate(profile?.createdAt)}</p>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-2">Last Login</label>
                    <p className="text-white">{formatDate(profile?.lastLogin)}</p>
                  </div>

                  {editing && (
                    <div className="mt-6">
                      <button
                        onClick={handleSaveProfile}
                        className="btn btn-primary flex items-center"
                        disabled={loading}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LinkedIn Connection Tab */}
            {activeTab === 'linkedin' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">LinkedIn Connection</h2>

                {profile?.linkedinId ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-green-500 mb-4">
                      <FaLinkedin className="text-xl" />
                      <span>Your LinkedIn account is connected</span>
                    </div>

                    {linkedInProfile && (
                      <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                        <div className="flex items-center space-x-4 mb-4">
                          {linkedInProfile.profilePicture && (
                            <img 
                              src={linkedInProfile.profilePicture} 
                              alt="LinkedIn Profile" 
                              className="w-16 h-16 rounded-full"
                            />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-white">{linkedInProfile.name}</h3>
                            <p className="text-zinc-400">{linkedInProfile.headline}</p>
                          </div>
                        </div>
                        
                        <div className="text-zinc-400">
                          <p className="mb-2"><strong>Connection Status:</strong> Active</p>
                          <p className="mb-2"><strong>Connected Since:</strong> {formatDate(profile.createdAt)}</p>
                          <p><strong>Token Expires:</strong> {formatDate(profile.linkedinTokenExpiry)}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <button 
                        onClick={handleConnectLinkedIn}
                        className="btn btn-outline"
                      >
                        Reconnect LinkedIn
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FaLinkedin className="mx-auto text-5xl text-zinc-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No LinkedIn Account Connected</h3>
                    <p className="text-zinc-400 mb-6">
                      Connect your LinkedIn account to enable profile analysis and optimization features.
                    </p>
                    <button 
                      onClick={handleConnectLinkedIn}
                      className="btn btn-primary"
                    >
                      Connect LinkedIn
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                <div className="space-y-8">
                  {/* Change Password Section */}
                  <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <FaKey className="mr-2" /> Change Password
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-zinc-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={changePassword.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-zinc-400 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={changePassword.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-zinc-400 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={changePassword.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      
                      <button
                        onClick={handleSavePassword}
                        className="btn btn-primary"
                        disabled={
                          loading || 
                          !changePassword.currentPassword || 
                          !changePassword.newPassword ||
                          !changePassword.confirmPassword
                        }
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Privacy and Data Settings */}
                  <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <FaCog className="mr-2" /> Privacy Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Email Notifications</h4>
                          <p className="text-zinc-400 text-sm">Receive updates and notifications via email</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Data Analytics</h4>
                          <p className="text-zinc-400 text-sm">Allow anonymous usage data collection to improve services</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                          <p className="text-zinc-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <button className="btn btn-sm btn-outline">Enable</button>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Account Actions</h3>
                    
                    <div className="space-y-4">
                      <button className="btn btn-outline btn-danger w-full justify-start">
                        Delete Account
                      </button>
                      <p className="text-zinc-500 text-sm">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #444;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        
        input:checked + .slider {
          background-color: #8b5cf6;
        }
        
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        
        .slider.round {
          border-radius: 24px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
        
        .btn-danger {
          color: #f87171;
          border-color: #f87171;
        }
        
        .btn-danger:hover {
          background-color: rgba(248, 113, 113, 0.1);
        }
      `}</style>
    </Layout>
  );
};

export default ProfilePage; 