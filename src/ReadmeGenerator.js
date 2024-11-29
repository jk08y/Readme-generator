import React, { useState, useEffect } from 'react';
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
  Award
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
    screenshots: []
  });

  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('project');

  // Improved dark mode with gradient background
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-gradient-to-br', 'from-[#0F172A]', 'via-[#1E293B]', 'to-[#0F172A]');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReadmeContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...readmeContent[field]];
    newArray[index] = value;
    setReadmeContent(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setReadmeContent(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = readmeContent[field].filter((_, i) => i !== index);
    setReadmeContent(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addBadge = (type) => {
    const badgeTemplates = {
      npm: `https://img.shields.io/npm/v/${readmeContent.title}`,
      build: `https://img.shields.io/github/actions/workflow/status/${readmeContent.title}/build.yml`,
      license: `https://img.shields.io/github/license/${readmeContent.title}`,
      stars: `https://img.shields.io/github/stars/${readmeContent.title}`
    };

    if (badgeTemplates[type]) {
      setReadmeContent(prev => ({
        ...prev,
        badges: [...prev.badges, badgeTemplates[type]]
      }));
    }
  };

  const generateReadme = () => {
    const badgesSection = readmeContent.badges.length > 0 
      ? readmeContent.badges.map(badge => `![Badge](${badge})`).join('\n')
      : '';

    const technologiesSection = readmeContent.technologies.length > 0
      ? '## 🛠️ Technologies\n' + readmeContent.technologies.filter(t => t.trim() !== '').map(tech => `- ${tech}`).join('\n')
      : '';

    const screenshotsSection = readmeContent.screenshots.length > 0
      ? '## 📸 Screenshots\n' + readmeContent.screenshots.filter(s => s.trim() !== '').map(screenshot => `![Screenshot](${screenshot})`).join('\n')
      : '';

    const readme = `${badgesSection}

# 📦 ${readmeContent.title}

## 📝 Description
${readmeContent.description}

${technologiesSection}

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

${screenshotsSection}

## 🤝 Contributing
${readmeContent.contributing}

## 📄 License
${readmeContent.license}
`;
    setPreview(readme);
  };

  const downloadReadme = () => {
    const blob = new Blob([preview], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-3" size={32} />
            <h1 className="text-3xl font-bold tracking-wide">README Generator</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Github size={24} className="text-white" />
            <span className="text-sm">Generate Pro READMEs</span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex space-x-4 mb-4">
              {['project', 'badges', 'details'].map((section) => (
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
              </div>
            )}

            {activeSection === 'badges' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: 'npm', icon: <Award size={20} />, label: 'NPM Version' },
                    { type: 'build', icon: <Code size={20} />, label: 'Build Status' },
                    { type: 'license', icon: <BookOpen size={20} />, label: 'License' },
                    { type: 'stars', icon: <Star size={20} />, label: 'GitHub Stars' }
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
