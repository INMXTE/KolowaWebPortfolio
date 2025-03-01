import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash, Eye, EyeOff, Lock } from 'lucide-react';

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
  const correctPassword = 'KOLOWA2025';
  const [showPassword, setShowPassword] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: '',
    description: '',
    image: '',
    client: '',
    date: '',
    services: [],
    featured: false,
    videoUrl: '',
    isVideo: false
  });

  useEffect(() => {
    setEditableProjects([...projects]);
  }, [projects]);

  if (!isOpen) return null;

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

  const handleDeleteProject = (index: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = [...editableProjects];
      updatedProjects.splice(index, 1);
      setEditableProjects(updatedProjects);
    }
  };

  const handleSaveChanges = () => {
    onUpdateProjects(editableProjects);
    alert('Changes saved successfully!');
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.category || !newProject.image) {
      alert('Title, category, and image are required!');
      return;
    }

    // Generate a new unique ID for the project
    const newId = Math.max(...editableProjects.map(p => p.id), 0) + 1;

    // Create the new project with all required fields
    const projectToAdd: Project = {
      id: newId,
      title: newProject.title || '',
      category: newProject.category || '',
      description: newProject.description || '',
      image: newProject.image || '',
      client: newProject.client || '',
      date: newProject.date || '',
      services: Array.isArray(newProject.services) ? newProject.services : 
               (typeof newProject.services === 'string' ? 
                newProject.services.split(',').map(service => service.trim()) : []),
      featured: Boolean(newProject.featured),
      videoUrl: newProject.videoUrl || '',
      isVideo: Boolean(newProject.isVideo)
    };

    // Add the new project to the list
    const updatedProjects = [...editableProjects, projectToAdd];
    setEditableProjects(updatedProjects);

    // Reset the form
    setNewProject({
      title: '',
      category: '',
      description: '',
      image: '',
      client: '',
      date: '',
      services: [],
      featured: false,
      videoUrl: '',
      isVideo: false
    });

    // Optional: Switch back to projects tab
    setActiveTab('projects');
  };

  const handleNewProjectChange = (field: keyof Project, value: any) => {
    setNewProject({
      ...newProject,
      [field]: field === 'services' 
        ? value.split(',').map((service: string) => service.trim()) 
        : value
    });
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-full glow-button flex items-center space-x-2"
              >
                <span>Access Panel</span>
                <Lock size={16} />
              </button>
            </div>
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
          <button
            className={`px-4 py-2 ${activeTab === 'add-project' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('add-project')}
          >
            Add New Project
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Manage Projects</h3>

              {editableProjects.map((project, index) => (
                <div key={project.id} className="border border-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-lg font-bold">{project.title}</h4>
                    <button 
                      onClick={() => handleDeleteProject(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => handleUpdateProject(index, 'category', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleUpdateProject(index, 'image', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Client</label>
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => handleUpdateProject(index, 'client', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Date</label>
                      <input
                        type="text"
                        value={project.date}
                        onChange={(e) => handleUpdateProject(index, 'date', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Services (comma separated)</label>
                      <input
                        type="text"
                        value={project.services.join(', ')}
                        onChange={(e) => handleUpdateProject(index, 'services', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Video URL (if applicable)</label>
                      <input
                        type="text"
                        value={project.videoUrl || ''}
                        onChange={(e) => handleUpdateProject(index, 'videoUrl', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <div>
                        <label className="block text-gray-400 mb-1">Featured</label>
                        <select
                          value={project.featured ? 'true' : 'false'}
                          onChange={(e) => handleUpdateProject(index, 'featured', e.target.value)}
                          className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1">Is Video</label>
                        <select
                          value={project.isVideo ? 'true' : 'false'}
                          onChange={(e) => handleUpdateProject(index, 'isVideo', e.target.value)}
                          className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    {project.image && (
                      <div className="mt-2">
                        <p className="text-gray-400 mb-1">Image Preview:</p>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="h-20 w-auto object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'add-project' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Add New Project</h3>

              <div className="border border-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Title *</label>
                    <input
                      type="text"
                      value={newProject.title || ''}
                      onChange={(e) => handleNewProjectChange('title', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Category *</label>
                    <input
                      type="text"
                      value={newProject.category || ''}
                      onChange={(e) => handleNewProjectChange('category', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Image URL *</label>
                    <input
                      type="text"
                      value={newProject.image || ''}
                      onChange={(e) => handleNewProjectChange('image', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Client</label>
                    <input
                      type="text"
                      value={newProject.client || ''}
                      onChange={(e) => handleNewProjectChange('client', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={newProject.date || ''}
                      onChange={(e) => handleNewProjectChange('date', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Services (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(newProject.services) ? newProject.services.join(', ') : ''}
                      onChange={(e) => handleNewProjectChange('services', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Video URL (if applicable)</label>
                    <input
                      type="text"
                      value={newProject.videoUrl || ''}
                      onChange={(e) => handleNewProjectChange('videoUrl', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Featured</label>
                      <select
                        value={newProject.featured ? 'true' : 'false'}
                        onChange={(e) => setNewProject({...newProject, featured: e.target.value === 'true'})}
                        className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Is Video</label>
                      <select
                        value={newProject.isVideo ? 'true' : 'false'}
                        onChange={(e) => setNewProject({...newProject, isVideo: e.target.value === 'true'})}
                        className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Description</label>
                  <textarea
                    value={newProject.description || ''}
                    onChange={(e) => handleNewProjectChange('description', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                    rows={3}
                  ></textarea>
                </div>

                <div className="mt-4">
                  {newProject.image && (
                    <div className="mt-2">
                      <p className="text-gray-400 mb-1">Image Preview:</p>
                      <img 
                        src={newProject.image as string} 
                        alt="Preview" 
                        className="h-20 w-auto object-cover rounded"
                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                        onLoad={(e) => (e.target as HTMLImageElement).style.display = 'block'}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddProject}
                  className="mt-4 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  <Plus size={18} />
                  <span>Add Project</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Admin Settings</h3>

              <div className="border border-gray-800 rounded-lg p-4">
                <p className="text-gray-300 mb-4">You can change admin-related settings here:</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Admin Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={correctPassword}
                        readOnly
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Note: To change the password, modify it in the App.tsx file (for demonstration purposes).
                      In a real application, you would have a secure way to change passwords.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Tips for managing your portfolio:</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      <li>Keep project descriptions concise and informative</li>
                      <li>Use high-quality images for better visual appeal</li>
                      <li>Mark your best work as "Featured" to highlight them</li>
                      <li>Include video URLs for dynamic content (YouTube embed URLs work best)</li>
                      <li>Regularly update your portfolio with new projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState } from "react";
import { X, Plus, Trash } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  images: string[];
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
  onUpdateProjects,
}) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    category: "",
    description: "",
    image: "",
    images: [],
    client: "",
    date: "",
    services: [],
    featured: false,
    videoUrl: "",
    isVideo: false,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [serviceInput, setServiceInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  if (!isOpen) return null;

  const addService = (project: Partial<Project>) => {
    if (!serviceInput.trim()) return;
    
    const updatedServices = [...(project.services || []), serviceInput.trim()];
    
    if (isAdding) {
      setNewProject({
        ...newProject,
        services: updatedServices,
      });
    } else if (editingProject) {
      setEditingProject({
        ...editingProject,
        services: updatedServices,
      });
    }
    
    setServiceInput("");
  };

  const removeService = (index: number, project: Partial<Project>) => {
    const updatedServices = [...(project.services || [])];
    updatedServices.splice(index, 1);
    
    if (isAdding) {
      setNewProject({
        ...newProject,
        services: updatedServices,
      });
    } else if (editingProject) {
      setEditingProject({
        ...editingProject,
        services: updatedServices,
      });
    }
  };

  const addImage = (project: Partial<Project>) => {
    if (!imageInput.trim()) return;
    
    const updatedImages = [...(project.images || []), imageInput.trim()];
    
    if (isAdding) {
      setNewProject({
        ...newProject,
        images: updatedImages,
      });
    } else if (editingProject) {
      setEditingProject({
        ...editingProject,
        images: updatedImages,
      });
    }
    
    setImageInput("");
  };

  const removeImage = (index: number, project: Partial<Project>) => {
    const updatedImages = [...(project.images || [])];
    updatedImages.splice(index, 1);
    
    if (isAdding) {
      setNewProject({
        ...newProject,
        images: updatedImages,
      });
    } else if (editingProject) {
      setEditingProject({
        ...editingProject,
        images: updatedImages,
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({
      ...project,
      images: project.images || [project.image]
    });
    setIsAdding(false);
  };

  const handleAddProject = () => {
    setIsAdding(true);
    setEditingProject(null);
    setNewProject({
      title: "",
      category: "",
      description: "",
      image: "",
      images: [],
      client: "",
      date: "",
      services: [],
      featured: false,
      videoUrl: "",
      isVideo: false,
    });
  };

  const saveProject = () => {
    if (isAdding) {
      // Generate ID (in a real app, the backend would handle this)
      const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
      
      const projectToAdd = {
        ...newProject,
        id: maxId + 1,
        image: newProject.images && newProject.images.length > 0 
          ? newProject.images[0] 
          : newProject.image || "",
        services: newProject.services || [],
        featured: newProject.featured || false,
        isVideo: newProject.isVideo || false,
      } as Project;
      
      onUpdateProjects([...projects, projectToAdd]);
    } else if (editingProject) {
      const updatedProjects = projects.map(p =>
        p.id === editingProject.id 
          ? {
              ...editingProject,
              image: editingProject.images && editingProject.images.length > 0 
                ? editingProject.images[0] 
                : editingProject.image
            } 
          : p
      );
      onUpdateProjects(updatedProjects);
    }
    
    setEditingProject(null);
    setIsAdding(false);
  };

  const deleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(p => p.id !== id);
      onUpdateProjects(updatedProjects);
    }
  };

  const currentProject = isAdding ? newProject : editingProject;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1 bg-gray-900 p-4 rounded-lg h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Projects</h3>
              <button
                onClick={handleAddProject}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`p-3 rounded cursor-pointer flex justify-between items-center ${
                    editingProject?.id === project.id
                      ? "bg-gray-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => handleEditProject(project)}
                >
                  <span className="truncate">{project.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Project Editor */}
          <div className="lg:col-span-3 bg-gray-900 p-6 rounded-lg h-[80vh] overflow-y-auto">
            {(isAdding || editingProject) ? (
              <div>
                <h3 className="text-xl font-bold mb-6">
                  {isAdding ? "Add New Project" : "Edit Project"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title & Category */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={currentProject?.title || ""}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, title: e.target.value })
                            : setEditingProject({ ...editingProject!, title: e.target.value })
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={currentProject?.category || ""}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, category: e.target.value })
                            : setEditingProject({ ...editingProject!, category: e.target.value })
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                      />
                    </div>
                  </div>

                  {/* Client & Date */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Client
                      </label>
                      <input
                        type="text"
                        value={currentProject?.client || ""}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, client: e.target.value })
                            : setEditingProject({ ...editingProject!, client: e.target.value })
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={currentProject?.date || ""}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, date: e.target.value })
                            : setEditingProject({ ...editingProject!, date: e.target.value })
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    value={currentProject?.description || ""}
                    onChange={(e) =>
                      isAdding
                        ? setNewProject({ ...newProject, description: e.target.value })
                        : setEditingProject({
                            ...editingProject!,
                            description: e.target.value,
                          })
                    }
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                  ></textarea>
                </div>

                {/* Services */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Services
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      placeholder="Add a service"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded p-2"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addService(currentProject!);
                        }
                      }}
                    />
                    <button
                      onClick={() => addService(currentProject!)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProject?.services?.map((service, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-2">{service}</span>
                        <button
                          onClick={() => removeService(index, currentProject!)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Images
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      placeholder="Add an image URL"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded p-2"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addImage(currentProject!);
                        }
                      }}
                    />
                    <button
                      onClick={() => addImage(currentProject!)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {currentProject?.images?.map((img, index) => (
                      <div
                        key={index}
                        className="relative group aspect-video bg-gray-800 rounded overflow-hidden"
                      >
                        <img 
                          src={img} 
                          alt={`Project image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index, currentProject!)}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Options */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                      <input
                        type="checkbox"
                        checked={currentProject?.isVideo || false}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, isVideo: e.target.checked })
                            : setEditingProject({
                                ...editingProject!,
                                isVideo: e.target.checked,
                              })
                        }
                        className="rounded bg-gray-800 border-gray-700"
                      />
                      <span>Is Video</span>
                    </label>
                  </div>

                  {currentProject?.isVideo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Video URL (YouTube Embed)
                      </label>
                      <input
                        type="text"
                        value={currentProject?.videoUrl || ""}
                        onChange={(e) =>
                          isAdding
                            ? setNewProject({ ...newProject, videoUrl: e.target.value })
                            : setEditingProject({
                                ...editingProject!,
                                videoUrl: e.target.value,
                              })
                        }
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                      />
                    </div>
                  )}
                </div>

                {/* Featured */}
                <div className="mt-6">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                    <input
                      type="checkbox"
                      checked={currentProject?.featured || false}
                      onChange={(e) =>
                        isAdding
                          ? setNewProject({ ...newProject, featured: e.target.checked })
                          : setEditingProject({
                              ...editingProject!,
                              featured: e.target.checked,
                            })
                      }
                      className="rounded bg-gray-800 border-gray-700"
                    />
                    <span>Featured Project</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsAdding(false);
                    }}
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProject}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a project to edit or add a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
