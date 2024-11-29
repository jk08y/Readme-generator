import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Eye, 
  Edit, 
  FileText, 
  Copy, 
  PlusCircle, 
  Trash2, 
  Moon, 
  Sun, 
  Share2, 
  Code, 
  BookOpen, 
  Check 
} from 'lucide-react';

const ReadmeGenerator = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
      license: `https://img.shields.io/github/license/${readmeContent.title}`
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
      ? '## Technologies\n' + readmeContent.technologies.filter(t => t.trim() !== '').map(tech => `- ${tech}`).join('\n')
      : '';

    const screenshotsSection = readmeContent.screenshots.length > 0
      ? '## Screenshots\n' + readmeContent.screenshots.filter(s => s.trim() !== '').map(screenshot => `![Screenshot](${screenshot})`).join('\n')
      : '';

    const readme = `${badgesSection}

# ${readmeContent.title}

## Description
${readmeContent.description}

${technologiesSection}

## Features
${readmeContent.features.filter(f => f.trim() !== '').map(feature => `- ${feature}`).join('\n')}

## Installation
\`\`\`bash
${readmeContent.installation.filter(i => i.trim() !== '').join('\n')}
\`\`\`

## Usage
\`\`\`
${readmeContent.usage.filter(u => u.trim() !== '').join('\n')}
\`\`\`

${screenshotsSection}

## Contributing
${readmeContent.contributing}

## License
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

  // Reusable input rendering function
  const renderArrayInput = (field, label, placeholder) => (
    <div>
      <label className="block mb-2 font-semibold dark:text-gray-200">{label}</label>
      {readmeContent[field].map((item, index) => (
        <div key={index} className="flex items-center mb-2 space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {index > 0 && (
            <button 
              onClick={() => removeArrayItem(field, index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      ))}
      <button 
        onClick={() => addArrayItem(field)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <PlusCircle className="mr-2" /> Add {label}
      </button>
    </div>
  );

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} min-h-screen transition-colors`}>
      <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
        <div className={`${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center">
            <FileText className="mr-3" />
            <h1 className="text-2xl font-bold">README Generator</h1>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-blue-700 p-2 rounded-full"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Edit className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Project Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={readmeContent.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={readmeContent.description}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded h-24 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              />

              {/* Badges Section */}
              <div>
                <label className={`block mb-2 font-semibold ${darkMode ? 'text-gray-200' : ''}`}>Add Badges</label>
                <div className="flex space-x-2 mb-2">
                  <button 
                    onClick={() => addBadge('npm')} 
                    className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    NPM
                  </button>
                  <button 
                    onClick={() => addBadge('build')} 
                    className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    Build
                  </button>
                  <button 
                    onClick={() => addBadge('license')} 
                    className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    License
                  </button>
                </div>
              </div>

              {renderArrayInput('features', 'Features', 'Feature')}
              {renderArrayInput('technologies', 'Technologies', 'Technology')}
              {renderArrayInput('installation', 'Installation Steps', 'Step')}
              {renderArrayInput('usage', 'Usage Examples', 'Example')}
              {renderArrayInput('screenshots', 'Screenshots', 'Screenshot URL')}

              <textarea
                name="contributing"
                placeholder="Contributing Guidelines"
                value={readmeContent.contributing}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded h-24 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              />

              <div className="flex space-x-4">
                <button 
                  onClick={generateReadme}
                  className={`${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded flex items-center`}
                >
                  <Eye className="mr-2" /> Generate Preview
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <BookOpen className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Preview
            </h2>
            
            {preview ? (
              <div className="relative">
                <pre className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100'} p-4 rounded overflow-auto max-h-[600px] text-sm`}>
                  {preview}
                </pre>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className={`${copied ? 'bg-green-500' : darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded`}
                    title={copied ? 'Copied!' : 'Copy to Clipboard'}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={downloadReadme}
                    className={`${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white p-2 rounded`}
                    title="Download README"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white p-2 rounded`}
                    title="Share README"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} p-4 rounded text-center`}>
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
