import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';

// Import services
import { getUserProfile } from '../../services/user.service';
import { 
  analyzeProfile, 
  generateOptimizationPreview, 
  applyOptimizations,
  getIndustryBenchmarks 
} from '../../services/profile-analysis.service';

// Import components
import ProfileScoreCard from './ProfileScoreCard';
import ProfileSectionAnalysis from './ProfileSectionAnalysis';
import OptimizationPreview from './OptimizationPreview';
import OptimizationSummary from './OptimizationSummary';
import IndustryBenchmark from './IndustryBenchmark';

const ProfileAnalysisClient: React.FC = () => {
  const router = useRouter();
  
  // State variables
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('analysis');
  const [optimizationPreviews, setOptimizationPreviews] = useState<any>({});
  const [selectedOptimizations, setSelectedOptimizations] = useState<string[]>([]);
  const [isApplyingOptimizations, setIsApplyingOptimizations] = useState(false);
  const [optimizationsApplied, setOptimizationsApplied] = useState(false);
  const [industryBenchmarks, setIndustryBenchmarks] = useState<any>(null);
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserAndAnalyzeProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();
        
        if (!userData) {
          toast.error('Please log in to access profile analysis');
          router.push('/login');
          return;
        }
        
        setUser(userData);
        
        // Check if the user has LinkedIn data
        if (!userData.linkedinProfile || !userData.linkedinAccessToken) {
          toast.error('Please connect your LinkedIn account first');
          router.push('/dashboard');
          return;
        }
        
        // Extract LinkedIn profile data
        setProfileData(userData.linkedinProfile);
        
        // Run profile analysis
        await runProfileAnalysis(userData.linkedinAccessToken);
        
        // Get industry benchmarks
        if (userData.linkedinProfile.industry) {
          try {
            const benchmarks = await getIndustryBenchmarks(userData.linkedinProfile.industry);
            setIndustryBenchmarks(benchmarks);
          } catch (error) {
            console.error('Error fetching industry benchmarks:', error);
          }
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load your profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndAnalyzeProfile();
  }, [router]);
  
  // Function to run profile analysis
  const runProfileAnalysis = async (token: string) => {
    try {
      setAnalyzing(true);
      const results = await analyzeProfile(token);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing profile:', error);
      toast.error('Failed to analyze your LinkedIn profile');
    } finally {
      setAnalyzing(false);
    }
  };
  
  // Function to generate optimization previews
  const generatePreviews = async (sections: string[]) => {
    if (!user || !profileData || !analysisResults) {
      toast.error('Profile data not available');
      return;
    }
    
    try {
      toast.info('Generating optimization previews...');
      const previews = await generateOptimizationPreview(
        analysisResults.profileId,
        sections
      );
      
      setOptimizationPreviews(previews);
      setActiveSection('optimization');
    } catch (error) {
      console.error('Error generating optimization previews:', error);
      toast.error('Failed to generate optimization previews');
    }
  };
  
  // Function to apply optimizations
  const applySelectedOptimizations = async () => {
    if (selectedOptimizations.length === 0) {
      toast.warn('Please select at least one section to optimize');
      return;
    }
    
    try {
      setIsApplyingOptimizations(true);
      
      // Create optimizations object
      const optimizationsToApply: any = {};
      selectedOptimizations.forEach(section => {
        if (optimizationPreviews[section]) {
          optimizationsToApply[section] = optimizationPreviews[section];
        }
      });
      
      await applyOptimizations(analysisResults.profileId, optimizationsToApply);
      
      setOptimizationsApplied(true);
      toast.success('Optimizations applied to your LinkedIn profile!');
    } catch (error) {
      console.error('Error applying optimizations:', error);
      toast.error('Failed to apply optimizations to your profile');
    } finally {
      setIsApplyingOptimizations(false);
    }
  };
  
  // Toggle section selection
  const toggleSectionSelection = (section: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOptimizations(prev => [...prev, section]);
    } else {
      setSelectedOptimizations(prev => prev.filter(s => s !== section));
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (activeSection === 'optimization') {
      setActiveSection('analysis');
    } else {
      router.push('/dashboard');
    }
  };
  
  // Determine which sections need improvement
  const getSectionsToImprove = () => {
    if (!analysisResults || !analysisResults.sectionScores) return [];
    
    return Object.entries(analysisResults.sectionScores)
      .filter(([_, data]: [string, any]) => data.score < 70)
      .map(([section]: [string, any]) => section);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-20">
        <FaSpinner className="animate-spin text-blue-600 text-3xl mb-4" />
        <h2 className="text-lg font-medium text-gray-700">Loading your profile data...</h2>
      </div>
    );
  }
  
  // Analyzing state
  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-20">
        <FaSpinner className="animate-spin text-blue-600 text-3xl mb-4" />
        <h2 className="text-lg font-medium text-gray-700">Analyzing your LinkedIn profile...</h2>
        <p className="text-gray-500 mt-2">This may take a few moments</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Page header */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          {activeSection === 'optimization' ? 'Back to Analysis' : 'Back to Dashboard'}
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">
          {activeSection === 'analysis' ? 'LinkedIn Profile Analysis' : 'Profile Optimization'}
        </h1>
      </div>
      
      {/* Main content */}
      {!profileData || !analysisResults ? (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
          <h3 className="font-medium text-yellow-800 mb-2">Profile Data Missing</h3>
          <p className="text-yellow-700">
            We couldn't find your LinkedIn profile data. Please make sure your LinkedIn account is connected.
          </p>
        </div>
      ) : (
        <>
          {/* Analysis section */}
          {activeSection === 'analysis' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <ProfileScoreCard score={analysisResults.overallScore} />
                
                {industryBenchmarks && (
                  <div className="mt-8">
                    <IndustryBenchmark
                      userScore={analysisResults.overallScore}
                      industryAverage={industryBenchmarks.industryAverage}
                      topPerformers={industryBenchmarks.topPerformersAverage}
                      industry={profileData.industry || 'your industry'}
                    />
                  </div>
                )}
                
                <div className="mt-8">
                  <button
                    onClick={() => generatePreviews(getSectionsToImprove())}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Generate Optimization Suggestions
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <ProfileSectionAnalysis
                  profileData={profileData}
                  sectionScores={analysisResults.sectionScores}
                />
              </div>
            </div>
          )}
          
          {/* Optimization section */}
          {activeSection === 'optimization' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <OptimizationSummary
                  selectedOptimizations={selectedOptimizations}
                  onApplyOptimizations={applySelectedOptimizations}
                  isApplying={isApplyingOptimizations}
                  appliedSuccess={optimizationsApplied}
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Optimization Suggestions
                  </h2>
                  
                  {Object.keys(optimizationPreviews).length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                      <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(optimizationPreviews).map(([section, data]: [string, any]) => (
                        <OptimizationPreview
                          key={section}
                          sectionType={section}
                          currentContent={
                            section === 'headline' ? profileData.headline :
                            section === 'about' ? profileData.about :
                            section === 'experience' && profileData.positions && profileData.positions[0] ?
                              profileData.positions[0].description :
                            ''
                          }
                          optimizedContent={data.optimizedContent}
                          onSelect={toggleSectionSelection}
                          isSelected={selectedOptimizations.includes(section)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileAnalysisClient; 