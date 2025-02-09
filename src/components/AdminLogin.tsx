import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, type Profile, subscribeToAuthChanges } from '../../lib/auth';
import { FaCog } from 'react-icons/fa';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    auth.getProfile().then(setProfile);

    // Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges(setProfile);
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setProfile(null);
  };

  return (
    <div className="fixed top-0 right-0 m-4 z-50 flex gap-2">
      {profile ? (
        <>
          {profile.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Admin
            </button>
          )}
          {profile.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Admin-Bereich"
            >
              <FaCog className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Ausloggen
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Einloggen
        </button>
      )}
    </div>
  );
};

export default AdminLogin;
