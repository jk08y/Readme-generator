import React, { useState } from 'react';
import { Download, Eye, Edit, FileText, Copy, PlusCircle, Trash2 } from 'lucide-react';

const ReadmeGenerator = () => {
  const [readmeContent, setReadmeContent] = useState({
    title: '',
    description: '',
    features: [''],
    installation: '',
    usage: '',
    contributing: '',
    license: 'MIT'
  });

  const [preview, setPreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReadmeContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...readmeContent.features];
    newFeatures[index] = value;
    setReadmeContent(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setReadmeContent(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = readmeContent.features.filter((_, i) => i !== index);
    setReadmeContent(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const generateReadme = () => {
    const readme = `# ${readmeContent.title}

## Description
${readmeContent.description}

## Features
${readmeContent.features.filter(f => f.trim() !== '').map(feature => `- ${feature}`).join('\n')}

## Installation
\`\`\`bash
${readmeContent.installation}
\`\`\`

## Usage
\`\`\`
${readmeContent.usage}
\`\`\`

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
    alert('README copied to clipboard!');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex items-center">
          <FileText className="mr-3" />
          <h1 className="text-2xl font-bold">README Generator</h1>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Edit className="mr-2 text-blue-600" />
              Project Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={readmeContent.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={readmeContent.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              />

              <div>
                <label className="block mb-2 font-semibold">Features</label>
                {readmeContent.features.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2 space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-grow p-2 border rounded"
                    />
                    {index > 0 && (
                      <button 
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  onClick={addFeature}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                  <PlusCircle className="mr-2" /> Add Feature
                </button>
              </div>

              <textarea
                name="installation"
                placeholder="Installation Instructions"
                value={readmeContent.installation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              />

              <textarea
                name="usage"
                placeholder="Usage Examples"
                value={readmeContent.usage}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              />

              <textarea
                name="contributing"
                placeholder="Contributing Guidelines"
                value={readmeContent.contributing}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              />

              <div className="flex space-x-4">
                <button 
                  onClick={generateReadme}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                >
                  <Eye className="mr-2" /> Generate Preview
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Eye className="mr-2 text-blue-600" />
              Preview
            </h2>
            
            {preview ? (
              <div className="relative">
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[600px] text-sm">
                  {preview}
                </pre>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    title="Copy to Clipboard"
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    onClick={downloadReadme}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    title="Download README"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
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