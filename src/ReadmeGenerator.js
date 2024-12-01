import React, { useState, useEffect, useCallback } from 'react';
import { 
  Download, 
  Eye, 
  Edit, 
  FileText, 
  Copy, 
  PlusCircle, 
  Trash2, 
  Code, 
  BookOpen, 
  Check,
  Github,
  Star,
  Award,
  Info,
  Settings,
  Link as LinkIcon,
  Video,
  HardDrive
} from 'lucide-react';

const ReadmeGenerator = () => {
  const [readmeContent, setReadmeContent] = useState({
    title: '',
    description: '',
    features: [''],
    installation: [],
    usage: [],
    technologies: [],
    contributing: '',
    license: 'MIT',
    badges: [],
    screenshots: [],
    demo: '',
    social: {
      linkedin: '',
      twitter: '',
      website: ''
    },
    projectType: 'Web Application',
    projectStatus: 'Active Development'
  });

  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('project');
  const [templateMode, setTemplateMode] = useState('default');

  // Copy to Clipboard Function
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(preview).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }, [preview]);

  // Download README Function
  const downloadReadme = useCallback(() => {
    const blob = new Blob([preview], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${readmeContent.title.replace(/\s+/g, '-').toLowerCase()}-README.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, [preview, readmeContent.title]);

  // Enhanced dark mode setup
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-gradient-to-br', 'from-[#0F172A]', 'via-[#1E293B]', 'to-[#0F172A]');
  }, []);

  // Comprehensive input handlers
  const handleInputChange = useCallback((e) => {
    const { name, value, dataset } = e.target;
    
    if (dataset.nested) {
      // Handle nested object updates
      setReadmeContent(prev => ({
        ...prev,
        [dataset.nested]: {
          ...prev[dataset.nested],
          [name]: value
        }
      }));
    } else {
      setReadmeContent(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, []);

  // Array manipulation methods with enhanced type safety
  const handleArrayChange = useCallback((field, index, value) => {
    const newArray = [...readmeContent[field]];
    newArray[index] = value;
    setReadmeContent(prev => ({
      ...prev,
      [field]: newArray
    }));
  }, [readmeContent]);

  const addArrayItem = useCallback((field) => {
    setReadmeContent(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  }, []);

  const removeArrayItem = useCallback((field, index) => {
    const newArray = readmeContent[field].filter((_, i) => i !== index);
    setReadmeContent(prev => ({
      ...prev,
      [field]: newArray
    }));
  }, [readmeContent]);

  // Advanced badge generation with more options
  const addBadge = useCallback((type) => {
    const projectName = readmeContent.title.replace(/\s+/g, '-').toLowerCase();
    const username = projectName.split('/')[0];

    const badgeTemplates = {
      npm: `https://img.shields.io/npm/v/${projectName}`,
      build: `https://img.shields.io/github/actions/workflow/status/${projectName}/build.yml`,
      coverage: `https://img.shields.io/codecov/c/github/${projectName}`,
      downloads: `https://img.shields.io/npm/dt/${projectName}`,
      license: `https://img.shields.io/github/license/${projectName}`,
      stars: `https://img.shields.io/github/stars/${projectName}`,
      lastCommit: `https://img.shields.io/github/last-commit/${projectName}`,
      version: `https://img.shields.io/github/v/release/${projectName}`,
      contributors: `https://img.shields.io/github/contributors/${projectName}`
    };

    if (badgeTemplates[type]) {
      setReadmeContent(prev => ({
        ...prev,
        badges: [...prev.badges, badgeTemplates[type]]
      }));
    }
  }, [readmeContent.title]);

  // Advanced README generation with multiple template modes
  const generateReadme = useCallback(() => {
    const badgesSection = readmeContent.badges.length > 0 
      ? readmeContent.badges.map(badge => `![Badge](${badge})`).join('\n')
      : '';

    const socialLinks = Object.entries(readmeContent.social)
      .filter(([_, link]) => link.trim() !== '')
      .map(([platform, link]) => `[${platform.charAt(0).toUpperCase() + platform.slice(1)}](${link})`);

    const socialSection = socialLinks.length > 0 
      ? '## 🌐 Connect\n' + socialLinks.join(' | ')
      : '';

    const readmeTemplates = {
      default: `${badgesSection}

# 📦 ${readmeContent.title}

## 📝 Description
${readmeContent.description}

## 🚀 Project Details
- **Type**: ${readmeContent.projectType}
- **Status**: ${readmeContent.projectStatus}

## 🛠️ Technologies
${readmeContent.technologies.filter(t => t.trim() !== '').map(tech => `- ${tech}`).join('\n')}

## ✨ Features
${readmeContent.features.filter(f => f.trim() !== '').map(feature => `- ${feature}`).join('\n')}

## 🚀 Installation
\`\`\`bash
${readmeContent.installation.filter(i => i.trim() !== '').join('\n')}
\`\`\`

## 💡 Usage
\`\`\`
${readmeContent.usage.filter(u => u.trim() !== '').join('\n')}
\`\`\`

${readmeContent.demo ? '## 🎬 Demo\n' + readmeContent.demo : ''}

${socialSection}

## 📸 Screenshots
${readmeContent.screenshots.filter(s => s.trim() !== '').map(screenshot => `![Screenshot](${screenshot})`).join('\n')}

## 🤝 Contributing
${readmeContent.contributing}

## 📄 License
${readmeContent.license}
`,
      academic: `${badgesSection}

# 🎓 ${readmeContent.title}

## 📚 Academic Project Overview
${readmeContent.description}

## 🔬 Research Context
- **Project Type**: ${readmeContent.projectType}
- **Research Status**: ${readmeContent.projectStatus}

## 📊 Methodologies & Technologies
${readmeContent.technologies.filter(t => t.trim() !== '').map(tech => `- ${tech}`).join('\n')}

## 🧠 Key Findings & Features
${readmeContent.features.filter(f => f.trim() !== '').map(feature => `- ${feature}`).join('\n')}

## 🛠️ Setup & Reproduction
\`\`\`bash
${readmeContent.installation.filter(i => i.trim() !== '').join('\n')}
\`\`\`

## 📝 Usage Guidelines
\`\`\`
${readmeContent.usage.filter(u => u.trim() !== '').join('\n')}
\`\`\`

## 📈 Research Impact
${readmeContent.demo || 'Research findings pending publication.'}

${socialSection}

## 📸 Visual Documentation
${readmeContent.screenshots.filter(s => s.trim() !== '').map(screenshot => `![Research Visualization](${screenshot})`).join('\n')}

## 🤝 Collaboration & Contributions
${readmeContent.contributing}

## 📄 Licensing
${readmeContent.license}`
    };

    const selectedTemplate = readmeTemplates[templateMode] || readmeTemplates.default;
    setPreview(selectedTemplate);
  }, [readmeContent, templateMode]);

  // UI Rendering Methods
  const renderArrayInput = (field, label, placeholder, icon) => (
    <div className="bg-slate-800 p-4 rounded-lg shadow-xl border border-slate-700">
      <label className="flex items-center mb-2 font-semibold text-slate-200">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {readmeContent[field].map((item, index) => (
        <div key={index} className="flex items-center mb-2 space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="flex-grow p-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {index > 0 && (
            <button 
              onClick={() => removeArrayItem(field, index)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      ))}
      <button 
        onClick={() => addArrayItem(field)}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition-colors"
      >
        <PlusCircle className="mr-2" /> Add {label}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6">
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-3" size={32} />
            <h1 className="text-3xl font-bold tracking-wide">PRO README Generator</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Github size={24} className="text-white" />
            <span className="text-sm">Advanced Documentation Tool</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Section Navigation */}
            <div className="flex space-x-4 mb-4">
              {['project', 'badges', 'details', 'advanced'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeSection === section 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)} Details
                </button>
              ))}
            </div>

            {/* Conditional Rendering of Sections */}
            {activeSection === 'project' && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={readmeContent.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={readmeContent.description}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white h-32 focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="projectType"
                    value={readmeContent.projectType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Desktop Software">Desktop Software</option>
                    <option value="Library">Library</option>
                    <option value="Research Project">Research Project</option>
                  </select>

                  <select
                    name="projectStatus"
                    value={readmeContent.projectStatus}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Active Development">Active Development</option>
                    <option value="Stable">Stable</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Experimental">Experimental</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            )}

            {/* Badge Section */}
            {activeSection === 'badges' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: 'npm', icon: <Award size={20} />, label: 'NPM Version' },
                    { type: 'build', icon: <Code size={20} />, label: 'Build Status' },
                    { type: 'coverage', icon: <HardDrive size={20} />, label: 'Coverage' },
                    { type: 'downloads', icon: <Download size={20} />, label: 'Downloads' },
                    { type: 'license', icon: <BookOpen size={20} />, label: 'License' },
                    { type: 'stars', icon: <Star size={20} />, label: 'GitHub Stars' },
                    { type: 'lastCommit', icon: <Info size={20} />, label: 'Last Commit' },
                    { type: 'contributors', icon: <Settings size={20} />, label: 'Contributors' }
                  ].map((badge) => (
                    <button
                      key={badge.type}
                      onClick={() => addBadge(badge.type)}
                      className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors"
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'details' && (
              <div className="space-y-4">
                {renderArrayInput('features', 'Features', 'Feature', <Award size={20} className="text-blue-400" />)}
                {renderArrayInput('technologies', 'Technologies', 'Technology', <Code size={20} className="text-green-400" />)}
                {renderArrayInput('installation', 'Installation Steps', 'Step', <Download size={20} className="text-purple-400" />)}
                {renderArrayInput('usage', 'Usage Examples', 'Example', <Eye size={20} className="text-teal-400" />)}
                {renderArrayInput('screenshots', 'Screenshots', 'Screenshot URL', <Video size={20} className="text-red-400" />)}
              </div>
            )}

            {activeSection === 'advanced' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-slate-200">LinkedIn Profile</label>
                    <div className="flex items-center">
                      <LinkIcon className="mr-2 text-blue-400" />
                      <input
                        type="text"
                        name="linkedin"
                        data-nested="social"
                        value={readmeContent.social.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn Profile URL"
                        className="flex-grow p-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-slate-200">Twitter Profile</label>
                    <div className="flex items-center">
                      <LinkIcon className="mr-2 text-blue-400" />
                      <input
                        type="text"
                        name="twitter"
                        data-nested="social"
                        value={readmeContent.social.twitter}
                        onChange={handleInputChange}
                        placeholder="Twitter Profile URL"
                        className="flex-grow p-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-slate-200">Demo/Live Link</label>
                  <div className="flex items-center">
                    <LinkIcon className="mr-2 text-blue-400" />
                    <input
                      type="text"
                      name="demo"
                      value={readmeContent.demo}
                      onChange={handleInputChange}
                      placeholder="Project Demo or Live URL"
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-slate-200">README Template</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['default', 'academic'].map((template) => (
                      <button
                        key={template}
                        onClick={() => setTemplateMode(template)}
                        className={`p-3 rounded-lg transition-all ${
                          templateMode === template 
                            ? 'bg-blue-700 text-white' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {template.charAt(0).toUpperCase() + template.slice(1)} Template
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-slate-200">Contributing Guidelines</label>
                  <textarea
                    name="contributing"
                    value={readmeContent.contributing}
                    onChange={handleInputChange}
                    placeholder="Describe how others can contribute to your project"
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white h-32 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-200">License</label>
                  <select
                    name="license"
                    value={readmeContent.license}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="MIT">MIT License</option>
                    <option value="Apache-2.0">Apache 2.0</option>
                    <option value="GPL-3.0">GNU General Public License v3.0</option>
                    <option value="BSD-3-Clause">BSD 3-Clause</option>
                    <option value="ISC">ISC License</option>
                    <option value="None">No License</option>
                  </select>
                </div>
              </div>
            )}

            <button 
              onClick={generateReadme}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Eye className="mr-2" /> Generate README Preview
            </button>
          </div>

          {/* Preview Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
              <BookOpen className="mr-2 text-blue-400" size={24} />
              README Preview
            </h2>
            
            {preview ? (
              <div className="relative">
                <pre className="bg-slate-800 p-4 rounded-lg overflow-auto max-h-[600px] text-sm border border-slate-700 shadow-xl">
                  {preview}
                </pre>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className={`${copied ? 'bg-green-600' : 'bg-blue-700 hover:bg-blue-600'} text-white p-2 rounded transition-colors`}
                    title={copied ? 'Copied!' : 'Copy to Clipboard'}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={downloadReadme}
                    className="bg-green-700 hover:bg-green-600 text-white p-2 rounded transition-colors"
                    title="Download README"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
                Generate preview by filling out the details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeGenerator;
