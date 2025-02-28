
import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash, Lock } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  date: string;
  services: string[];
  featured: boolean;
  videoUrl?: string;
  isVideo?: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isOpen, 
  onClose, 
  projects, 
  onUpdateProjects 
}) => {
  const [editableProjects, setEditableProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'kolowa2025';

  useEffect(() => {
    setEditableProjects([...projects]);
  }, [projects]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleUpdateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...editableProjects];
    
    if (field === 'services') {
      // Handle services as array
      updatedProjects[index][field] = value.split(',').map((service: string) => service.trim());
    } else if (field === 'featured' || field === 'isVideo') {
      // Handle boolean values
      updatedProjects[index][field] = value === 'true';
    } else {
      // Handle other fields
      (updatedProjects[index] as any)[field] = value;
    }
    
    setEditableProjects(updatedProjects);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Math.max(...editableProjects.map(p => p.id)) + 1,
      title: 'New Project',
      category: 'Category',
      description: 'Project description goes here',
      image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      client: 'Client Name',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      services: ['Service 1', 'Service 2'],
      featured: false,
      videoUrl: '',
      isVideo: false
    };
    
    setEditableProjects([...editableProjects, newProject]);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setEditableProjects(editableProjects.filter(project => project.id !== id));
    }
  };

  const handleSaveChanges = () => {
    onUpdateProjects(editableProjects);
    alert('Changes saved successfully! Refresh the page to see updated content.');
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">KOLOWA Admin</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Lock size={20} className="text-red-500" />
              <p className="text-gray-300">Enter administrator password</p>
            </div>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              placeholder="Password"
            />
            
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0a0a0a] rounded-lg p-4 max-w-6xl w-full h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 p-2">
          <h2 className="text-2xl font-bold">KOLOWA Admin Panel</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSaveChanges}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-800 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'projects' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'settings' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Manage Projects</h3>
                <button 
                  onClick={handleAddProject}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {editableProjects.map((project, index) => (
                  <div key={project.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-lg font-bold">{project.title}</h4>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => handleUpdateProject(index, 'category', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) => handleUpdateProject(index, 'image', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Client</label>
                        <input
                          type="text"
                          value={project.client}
                          onChange={(e) => handleUpdateProject(index, 'client', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Date</label>
                        <input
                          type="text"
                          value={project.date}
                          onChange={(e) => handleUpdateProject(index, 'date', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Services (comma separated)</label>
                        <input
                          type="text"
                          value={project.services.join(', ')}
                          onChange={(e) => handleUpdateProject(index, 'services', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Featured</label>
                          <select
                            value={project.featured.toString()}
                            onChange={(e) => handleUpdateProject(index, 'featured', e.target.value)}
                            className="bg-gray-800 border border-gray-700 rounded p-2 text-white"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Is Video</label>
                          <select
                            value={project.isVideo?.toString() || "false"}
                            onChange={(e) => handleUpdateProject(index, 'isVideo', e.target.value)}
                            className="bg-gray-800 border border-gray-700 rounded p-2 text-white"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">YouTube Video URL (embed format)</label>
                        <input
                          type="text"
                          value={project.videoUrl || ''}
                          onChange={(e) => handleUpdateProject(index, 'videoUrl', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                          placeholder="https://www.youtube.com/embed/VIDEO_ID"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="p-4">
              <h3 className="text-xl font-bold mb-4">Website Settings</h3>
              <p className="text-gray-400 mb-4">More setting options coming soon.</p>
              
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900">
                <h4 className="font-bold mb-2">Admin Password</h4>
                <p className="text-sm text-gray-400 mb-4">Current password: kolowa2025</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="bg-gray-800 border border-gray-700 rounded p-2 text-white"
                    disabled
                  />
                  <button className="bg-gray-700 text-white px-3 py-2 rounded opacity-50 cursor-not-allowed">
                    Change Password
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Password management will be available in future updates</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
