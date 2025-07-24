'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FolderOpen,
  BookOpen,
  FileText,
  Layers,
  Play,
  Plus,
  Github,
  ExternalLink,
  Loader,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  Bell,
  Search,
  Sparkles,
  Brain,
  Download,
  Eye,
  Zap,
  X,
  Trash2,
  Edit,
  Clock,
  Target,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Info,
  Sun,
  Moon,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type SidebarItem = 'teams' | 'projects' | 'stories' | 'testcases' | 'testsuites' | 'executions';

interface Team {
  id: string;
  name: string;
  members: number;
  color: string;
}

interface Project {
  id: string;
  name: string;
  type: 'arxitest' | 'github' | 'jira';
  teamId: string;
  stories: number;
  testCases: number;
  status: 'active' | 'inactive';
}

interface Story {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  points: number;
  projectId: string;
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  framework: 'selenium' | 'playwright' | 'cypress';
  status: 'passed' | 'failed' | 'pending';
  storyId: string;
}

interface TestExecution {
  id: string;
  name: string;
  testCases: number;
  status: 'running' | 'completed' | 'failed';
  passed: number;
  failed: number;
  duration: string;
  projectId: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: string[];
  projectId: string;
  status: 'active' | 'inactive';
}

interface TestReport {
  id: string;
  executionId: string;
  testCases: {
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: string;
    error?: string;
  }[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: string;
  };
}

interface GuideStep {
  id: string;
  target: string;
  title: string;
  description: string;
  action: 'click' | 'create' | 'navigate' | 'observe';
  highlightElement?: string;
  nextStep?: string;
  allowedActions: string[];
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: number;
}

const DashboardDemo: React.FC = () => {
  const [activeSidebar, setActiveSidebar] = useState<SidebarItem>('teams');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTestSuiteId, setSelectedTestSuiteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState<string>('start');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showReport, setShowReport] = useState<string | null>(null);
  const [showProjectCreationModal, setShowProjectCreationModal] = useState(false);
  const [showTeamCreationModal, setShowTeamCreationModal] = useState(false);
  const [showStoryCreationModal, setShowStoryCreationModal] = useState(false);
  const [showTestCaseCreationModal, setShowTestCaseCreationModal] = useState(false);
  const [isGuideComplete, setIsGuideComplete] = useState(false);

  // Team creation modal state
  const [teamName, setTeamName] = useState('');

  // Project creation modal state
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<'manual' | 'github' | 'jira' | 'taiga'>('manual');
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Story creation modal state
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [storyPriority, setStoryPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  // Test case creation modal state
  const [testCaseName, setTestCaseName] = useState('');
  const [testCaseDescription, setTestCaseDescription] = useState('');
  const [testFramework, setTestFramework] = useState<'selenium' | 'playwright' | 'cypress'>('playwright');
  const [selectedStoryId, setSelectedStoryId] = useState('');
  const [isGeneratingTestCase, setIsGeneratingTestCase] = useState(false);

  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Frontend Team', members: 5, color: 'primary' },
    { id: '2', name: 'Backend Team', members: 3, color: 'secondary' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'E-commerce App', type: 'github', teamId: '1', stories: 12, testCases: 45, status: 'active' },
    { id: '2', name: 'Payment System', type: 'jira', teamId: '2', stories: 8, testCases: 32, status: 'active' }
  ]);

  const [stories, setStories] = useState<Story[]>([
    { id: '1', title: 'User Authentication', description: 'Implement login/logout functionality', priority: 'high', points: 8, projectId: '1' },
    { id: '2', title: 'Product Catalog', description: 'Display products with filtering', priority: 'medium', points: 5, projectId: '1' },
    { id: '3', title: 'Payment Processing', description: 'Handle secure payments', priority: 'high', points: 13, projectId: '2' }
  ]);

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: '1', name: 'Login Test', description: 'Test user login flow', framework: 'playwright', status: 'passed', storyId: '1' },
    { id: '2', name: 'Product Search', description: 'Test product search functionality', framework: 'cypress', status: 'failed', storyId: '2' },
    { id: '3', name: 'Payment Flow', description: 'Test payment processing', framework: 'selenium', status: 'pending', storyId: '3' }
  ]);

  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    { id: '1', name: 'Authentication Suite', description: 'All authentication-related tests', testCases: ['1'], projectId: '1', status: 'active' },
    { id: '2', name: 'E-commerce Suite', description: 'Complete e-commerce flow tests', testCases: ['1', '2'], projectId: '1', status: 'active' },
    { id: '3', name: 'Payment Suite', description: 'Payment system tests', testCases: ['3'], projectId: '2', status: 'active' }
  ]);

  const [executions, setExecutions] = useState<TestExecution[]>([
    { id: '1', name: 'Nightly Regression', testCases: 25, status: 'completed', passed: 23, failed: 2, duration: '45m', projectId: '1' },
    { id: '2', name: 'Payment Tests', testCases: 15, status: 'running', passed: 12, failed: 0, duration: '12m', projectId: '2' },
    { id: '3', name: 'Smoke Tests', testCases: 8, status: 'failed', passed: 5, failed: 3, duration: '8m', projectId: '1' }
  ]);

  const guideSteps: Record<string, GuideStep> = {
    start: {
      id: 'start',
      target: 'teams-tab',
      title: 'Welcome to Arxitest Demo!',
      description: 'This interactive demo will guide you through Arxitest\'s complete workflow. Let\'s start by creating a team.',
      action: 'click',
      highlightElement: 'teams-tab',
      nextStep: 'create-team',
      allowedActions: ['teams-tab']
    },
    'create-team': {
      id: 'create-team',
      target: 'add-team-button',
      title: 'Create Your First Team',
      description: 'Teams organize your testing efforts. Click "+ Add Team" to create your first team.',
      action: 'create',
      highlightElement: 'add-team-button',
      nextStep: 'view-projects',
      allowedActions: ['add-team-button']
    },
    'view-projects': {
      id: 'view-projects',
      target: 'projects-tab',
      title: 'Navigate to Projects',
      description: 'Great! Now let\'s create a project for your team. Click on the Projects tab.',
      action: 'navigate',
      highlightElement: 'projects-tab',
      nextStep: 'create-project',
      allowedActions: ['projects-tab']
    },
    'create-project': {
      id: 'create-project',
      target: 'add-project-button',
      title: 'Create a New Project',
      description: 'Projects contain all your testing assets. Click "+ Add Project" to create one.',
      action: 'create',
      highlightElement: 'add-project-button',
      nextStep: 'select-project',
      allowedActions: ['add-project-button']
    },
    'select-project': {
      id: 'select-project',
      target: 'project-list-container',
      title: 'Select Your Project',
      description: 'Great! Now click on any project in the list to view its details and proceed.',
      action: 'click',
      highlightElement: 'project-list-container',
      nextStep: 'view-stories',
      allowedActions: ['project-card-*']
    },
    'view-stories': {
      id: 'view-stories',
      target: 'stories-tab',
      title: 'Navigate to Stories',
      description: 'Perfect! Now let\'s define what features to test. Click on the Stories tab.',
      action: 'navigate',
      highlightElement: 'stories-tab',
      nextStep: 'create-story',
      allowedActions: ['stories-tab']
    },
    'create-story': {
      id: 'create-story',
      target: 'add-story',
      title: 'Create a User Story',
      description: 'Stories define features to be tested. Click "+ Add Story" to create your first story.',
      action: 'create',
      highlightElement: 'add-story',
      nextStep: 'view-test-cases',
      allowedActions: ['add-story']
    },
    'view-test-cases': {
      id: 'view-test-cases',
      target: 'testcases-tab',
      title: 'Navigate to Test Cases',
      description: 'Excellent! Now let\'s create test cases for your story. Click on Test Cases.',
      action: 'navigate',
      highlightElement: 'testcases-tab',
      nextStep: 'create-test-case',
      allowedActions: ['testcases-tab']
    },
    'create-test-case': {
      id: 'create-test-case',
      target: 'add-testcase-button',
      title: 'Create a Test Case',
      description: 'Test cases validate your stories. Click "+ Add Test Case" to create one.',
      action: 'create',
      highlightElement: 'add-testcase-button',
      nextStep: 'view-test-suites',
      allowedActions: ['add-testcase-button']
    },
    'view-test-suites': {
      id: 'view-test-suites',
      target: 'testsuites-tab',
      title: 'Navigate to Test Suites',
      description: 'Great! Now let\'s organize test cases into suites. Click on Test Suites.',
      action: 'navigate',
      highlightElement: 'testsuites-tab',
      nextStep: 'create-test-suite',
      allowedActions: ['testsuites-tab']
    },
    'create-test-suite': {
      id: 'create-test-suite',
      target: 'add-testsuite-button',
      title: 'Create a Test Suite',
      description: 'Test suites group related test cases. Click "+ Add Test Suite" to create one.',
      action: 'create',
      highlightElement: 'add-testsuite-button',
      nextStep: 'select-test-suite',
      allowedActions: ['add-testsuite-button']
    },
    'select-test-suite': {
      id: 'select-test-suite',
      target: 'testsuite-card',
      title: 'Select Your Test Suite',
      description: 'Perfect! Now click on your test suite to select it for execution.',
      action: 'click',
      highlightElement: 'testsuite-card',
      nextStep: 'run-tests',
      allowedActions: ['testsuite-card-*']
    },
    'run-tests': {
      id: 'run-tests',
      target: 'executions-tab',
      title: 'Execute Your Tests',
      description: 'Perfect! Now let\'s run your tests. Click on Test Executions to see the execution environment.',
      action: 'navigate',
      highlightElement: 'executions-tab',
      nextStep: 'execute-tests',
      allowedActions: ['executions-tab']
    },
    'execute-tests': {
      id: 'execute-tests',
      target: 'run-tests-button',
      title: 'Run Your First Test',
      description: 'Time to execute! Click "Run Tests" to start your first test execution.',
      action: 'create',
      highlightElement: 'run-tests-button',
      nextStep: 'complete',
      allowedActions: ['run-tests-button']
    },
    complete: {
      id: 'complete',
      target: '',
      title: 'Congratulations! 🎉',
      description: 'You\'ve completed the full Arxitest workflow: Team → Project → Story → Test Case → Test Suite → Execution. Continue exploring with full functionality!',
      action: 'observe',
      nextStep: '',
      allowedActions: ['*'] // Allow all actions after guide completion
    }
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const handleGuideAction = (actionId: string) => {
    const currentStep = guideSteps[currentGuideStep];
    if (!currentStep.allowedActions.includes(actionId)) return;

    switch (actionId) {
      case 'teams-tab':
        setActiveSidebar('teams');
        setCurrentGuideStep('create-team');
        break;
      case 'add-team-button':
        setShowTeamCreationModal(true);
        // The guide will progress when team is actually created
        break;
      case 'projects-tab':
        setActiveSidebar('projects');
        setCurrentGuideStep('create-project');
        break;
      case 'add-project-button':
        setShowProjectCreationModal(true);
        // The guide will progress when project is actually created
        break;
      case 'select-project':
        // This will be handled by project card clicks
        break;
      case 'stories-tab':
        setActiveSidebar('stories');
        setCurrentGuideStep('create-story');
        break;
      case 'add-story':
        if (currentGuideStep === 'create-story') {
          // Create a quick story for the guide
          const newStory: Story = {
            id: Date.now().toString(),
            title: 'User Login Feature',
            description: 'Implement secure user authentication system',
            priority: 'high',
            points: 8,
            projectId: selectedProjectId || '1'
          };
          setStories(prev => [...prev, newStory]);
          addNotification('Story "User Login Feature" created successfully!');
          setCurrentGuideStep('view-test-cases');
        } else {
          setShowStoryCreationModal(true);
        }
        break;
      case 'testcases-tab':
        setActiveSidebar('testcases');
        setCurrentGuideStep('create-test-case');
        break;
      case 'add-testcase-button':
        setShowTestCaseCreationModal(true);
        // The guide will progress when test case is actually created
        break;
      case 'testsuites-tab':
        setActiveSidebar('testsuites');
        setCurrentGuideStep('create-test-suite');
        break;
      case 'add-testsuite-button':
        // This is handled directly in the button onClick handler
        break;
      case 'select-test-suite':
        // This will be handled by test suite card clicks
        break;
      case 'executions-tab':
        setActiveSidebar('executions');
        setCurrentGuideStep('execute-tests');
        break;
      case 'run-tests-button':
        // This is handled directly in the button onClick handler
        break;
    }
  };

  const deleteItem = (type: string, id: string) => {
    switch (type) {
      case 'team':
        setTeams(prev => prev.filter(t => t.id !== id));
        addNotification('Team deleted successfully!', 'info');
        break;
      case 'project':
        setProjects(prev => prev.filter(p => p.id !== id));
        addNotification('Project deleted successfully!', 'info');
        break;
      case 'story':
        setStories(prev => prev.filter(s => s.id !== id));
        addNotification('Story deleted successfully!', 'info');
        break;
      case 'testcase':
        setTestCases(prev => prev.filter(tc => tc.id !== id));
        addNotification('Test case deleted successfully!', 'info');
        break;
      case 'testsuite':
        setTestSuites(prev => prev.filter(ts => ts.id !== id));
        addNotification('Test suite deleted successfully!', 'info');
        break;
      case 'execution':
        setExecutions(prev => prev.filter(e => e.id !== id));
        addNotification('Execution deleted successfully!', 'info');
        break;
    }
  };

  const filteredProjects = selectedTeamId ? projects.filter(p => p.teamId === selectedTeamId) : projects;
  const filteredStories = selectedProjectId ? stories.filter(s => s.projectId === selectedProjectId) : stories;
  const filteredTestCases = filteredStories.length > 0 ? testCases.filter(tc => filteredStories.some(s => s.id === tc.storyId)) : testCases;
  const filteredTestSuites = selectedProjectId ? testSuites.filter(ts => ts.projectId === selectedProjectId) : testSuites;
  const filteredExecutions = selectedProjectId ? executions.filter(e => e.projectId === selectedProjectId) : executions;

  const searchFilter = (items: any[], searchFields: string[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      searchFields.some(field =>
        item[field]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const generateRandomTestResult = () => {
    const rand = Math.random();
    if (rand < 0.33) return 'passed';
    if (rand < 0.66) return 'failed';
    return 'pending';
  };

  const generateTestReport = (executionId: string): TestReport => {
    const execution = executions.find(e => e.id === executionId);
    if (!execution) throw new Error('Execution not found');

    const testCaseNames = [
      'User Login Test', 'User Registration Test', 'Password Reset Test', 'Profile Update Test',
      'Product Search Test', 'Product Filter Test', 'Product Details Test', 'Product Comparison Test',
      'Add to Cart Test', 'Remove from Cart Test', 'Update Cart Quantities Test', 'Cart Persistence Test',
      'Checkout Flow Test', 'Guest Checkout Test', 'Address Validation Test', 'Shipping Options Test',
      'Payment Processing Test', 'Credit Card Validation Test', 'PayPal Integration Test', 'Order Confirmation Test',
      'Email Notifications Test', 'Inventory Management Test', 'Admin Dashboard Test', 'Security Headers Test'
    ];

    const errors = [
      'Element not found: #submit-button',
      'Timeout waiting for page load',
      'Payment gateway connection failed',
      'Database connection timeout',
      'Invalid response from API',
      'Session expired during test',
      'Network request failed',
      'Assertion failed: Expected "success" but got "error"',
      'File upload failed',
      'Authentication token expired'
    ];

    const generatedTestCases = Array.from({ length: execution.testCases }, (_, index) => {
      const status = generateRandomTestResult() as 'passed' | 'failed' | 'skipped';
      const duration = `${(Math.random() * 5 + 0.5).toFixed(1)}s`;
      const name = testCaseNames[index] || `Test Case ${index + 1}`;

      return {
        name,
        status,
        duration,
        ...(status === 'failed' && { error: errors[Math.floor(Math.random() * errors.length)] })
      };
    });

    const passed = generatedTestCases.filter(tc => tc.status === 'passed').length;
    const failed = generatedTestCases.filter(tc => tc.status === 'failed').length;
    const skipped = generatedTestCases.filter(tc => tc.status === 'skipped').length;

    return {
      id: `report-${executionId}`,
      executionId,
      testCases: generatedTestCases,
      summary: {
        total: execution.testCases,
        passed,
        failed,
        skipped,
        duration: execution.duration
      }
    };
  };

  const currentStep = guideSteps[currentGuideStep];
  const isActionAllowed = (actionId: string) => {
    if (isGuideComplete) return true;
    if (!currentStep || !currentStep.allowedActions) return false;

    // Check for global wildcard or specific action/pattern
    return currentStep.allowedActions.some(allowed => {
      if (allowed === '*') return true;
      if (allowed.endsWith('*')) {
        return actionId.startsWith(allowed.slice(0, -1));
      }
      return actionId === allowed;
    });
  };

  const [tooltipPosition, setTooltipPosition] = useState({ top: 20, left: 20 });

    useEffect(() => {
    if (currentGuideStep === 'complete' || !currentStep.highlightElement) return;

    const updateTooltipPosition = () => {
      const elementId = currentStep.highlightElement;
      if (!elementId) return;
      
      const dashboardContainer = document.querySelector('.h-\\[600px\\]');
      if (!dashboardContainer) return;
      const containerRect = dashboardContainer.getBoundingClientRect();

      // Add special positioning for the project list step
      if (elementId === 'project-list-container') {
        setTooltipPosition({
          top: containerRect.height / 2 - 80, // Adjust to center vertically
          left: containerRect.width / 2 - 150, // Adjust to center horizontally
        });
        return;
      }
      
      const element = document.getElementById(elementId);
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      
      setTooltipPosition({
        top: rect.top - containerRect.top - 40,
        left: rect.left - containerRect.left + (rect.width / 2) - 150,
      });
    };

    const timeoutId = setTimeout(updateTooltipPosition, 100);
    
    return () => clearTimeout(timeoutId);
  }, [currentGuideStep, currentStep.highlightElement]);

  const renderGuideTooltip = () => {
    if (currentGuideStep === 'complete') return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
          scale: 1,
          transition: {
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 }
          }
        }}
        className="absolute bg-white border border-primary/20 rounded-lg shadow-xl p-4 max-w-sm z-50"
        style={{
          background: theme === 'dark' ? '#1a1a1a' : 'white',
          top: Math.max(10, tooltipPosition.top), // Ensure it doesn't go off-screen
          left: Math.max(10, tooltipPosition.left),
        }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
              {currentStep.title}
            </h4>
            <p className="text-xs text-foreground-muted mb-3">
              {currentStep.description}
            </p>
            <div className="text-xs text-primary font-medium">
              Step {Object.keys(guideSteps).indexOf(currentGuideStep) + 1} of {Object.keys(guideSteps).length}
            </div>
          </div>
        </div>

        {/* Chevron Down Arrow */}
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-4 h-4 bg-white border-r border-b border-primary/20 transform rotate-45"
            style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}></div>
        </motion.div>

        {/* Additional chevron icon for clarity */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-yellow-500" />
        </motion.div>
      </motion.div>
    );
  };

  const renderHighlight = (elementId: string) => {
    if (currentStep.highlightElement !== elementId || currentGuideStep === 'complete') return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'rgba(255, 235, 59, 0.15)',
          border: '3px solid rgb(255, 235, 59)',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(255, 235, 59, 0.5), inset 0 0 20px rgba(255, 235, 59, 0.1)',
        }}
      />
    );
  };

  const renderSidebar = () => {
    const sidebarItems = [
      { id: 'teams', icon: Users, label: 'Teams', count: teams.length },
      { id: 'projects', icon: FolderOpen, label: 'Projects', count: filteredProjects.length },
      { id: 'stories', icon: BookOpen, label: 'Stories', count: filteredStories.length },
      { id: 'testcases', icon: FileText, label: 'Test Cases', count: filteredTestCases.length },
      { id: 'testsuites', icon: Layers, label: 'Test Suites', count: filteredTestSuites.length },
      { id: 'executions', icon: Play, label: 'Test Executions', count: filteredExecutions.length }
    ];

    return (
      <div className="w-64 border-r border-border p-4 space-y-2" style={{ background: theme === 'dark' ? '#0f0f0f' : '#f8fafc' }}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Arxitest Demo</h2>
          <p className="text-xs text-foreground-muted">
            Interactive demo to familiarize users with Arxitest's workflow
          </p>
        </div>

        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSidebar === item.id;
          const isClickable = isActionAllowed(`${item.id}-tab`) || currentGuideStep === 'complete';

          return (
            <div key={item.id} className="relative">
              <motion.button
                whileHover={isClickable ? { x: 4 } : {}}
                onClick={() => {
                  if (isClickable) {
                    if (currentStep && currentStep.allowedActions.includes(`${item.id}-tab`)) {
                      handleGuideAction(`${item.id}-tab`);
                    } else {
                      setActiveSidebar(item.id as SidebarItem);
                    }
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors relative ${isActive
                  ? 'bg-primary text-white'
                  : isClickable
                    ? 'hover:bg-accent/10 text-foreground'
                    : 'text-foreground-muted cursor-not-allowed opacity-50'
                  }`}
                disabled={!isClickable}
                id={`${item.id}-tab`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-accent/20'
                    }`}>
                    {item.count}
                  </span>
                )}
              </motion.button>
              {renderHighlight(`${item.id}-tab`)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderHeader = () => (
    <div className="border-b border-border p-4 flex items-center justify-between" style={{ background: theme === 'dark' ? '#0f0f0f' : 'white' }}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{ background: theme === 'dark' ? '#1a1a1a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-accent/10 rounded-lg relative"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-12 w-80 bg-white border border-border rounded-lg shadow-xl z-40"
                style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
              >
                <div className="p-3 border-b border-border">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-foreground-muted text-sm">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 border-b border-border last:border-b-0 flex items-start space-x-2"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-foreground-muted">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    const renderTeams = () => {
      const displayTeams = searchFilter(teams, ['name']);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Teams</h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  if (currentStep && currentStep.allowedActions.includes('add-team-button')) {
                    handleGuideAction('add-team-button');
                  } else {
                    setShowTeamCreationModal(true);
                  }
                }}
                disabled={!isActionAllowed('add-team-button')}
                id="add-team-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team
              </Button>
              {renderHighlight('add-team-button')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayTeams.map((team) => (
              <div key={team.id} className="relative">
                <Card
                  hover
                  className={`cursor-pointer transition-all ${selectedTeamId === team.id ? 'ring-2 ring-primary' : ''
                    } ${!isActionAllowed(`team-card-${team.id}`) && currentGuideStep !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => isActionAllowed(`team-card-${team.id}`) && (handleGuideAction(`team-card-${team.id}`) || setSelectedTeamId(team.id))}
                  id={`team-card-${team.id}`}
                >
                  <CardContent className="mt-4 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${team.color}`} />
                        <div>
                          <h4 className="font-medium">{team.name}</h4>
                          <p className="text-sm text-foreground-muted">{team.members} members</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem('team', team.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                        disabled={!isActionAllowed('delete') && currentGuideStep !== 'complete'}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                {renderHighlight(`team-card-${team.id}`)}
              </div>
            ))}
          </div>
        </div>
      );
    };

        const renderProjects = () => {
      const displayProjects = searchFilter(filteredProjects, ['name', 'type']);
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Projects {selectedTeamId && `for ${teams.find(t => t.id === selectedTeamId)?.name}`}
            </h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  if (currentStep && currentStep.allowedActions.includes('add-project-button')) {
                    handleGuideAction('add-project-button');
                  } else {
                    setShowProjectCreationModal(true);
                  }
                }}
                disabled={!isActionAllowed('add-project-button')}
                id="add-project-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
              {renderHighlight('add-project-button')}
            </div>
          </div>
          
          <div className="relative" id="project-list-container">
            {renderHighlight('project-list-container')}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayProjects.map((project) => {
                const typeIcons = {
                  github: Github,
                  jira: ExternalLink,
                  arxitest: Sparkles,
                  taiga: Target // This is the fix
                };
                const Icon = typeIcons[project.type as keyof typeof typeIcons];
                
                // Graceful fallback if an icon is ever missing in the future
                if (!Icon) {
                  return null; 
                }
                
                return (
                  <div key={project.id} className="relative">
                    <Card
                      hover
                      className={`cursor-pointer transition-all group ${
                        selectedProjectId === project.id ? 'ring-2 ring-primary' : ''
                      } ${!isActionAllowed(`project-card-${project.id}`) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (isActionAllowed(`project-card-${project.id}`)) {
                          setSelectedProjectId(project.id);
                          if (currentGuideStep === 'select-project') {
                            setCurrentGuideStep('view-stories');
                          }
                        }
                      }}
                      id={`project-card-${project.id}`}
                    >
                      <CardContent className="mt-4 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5 text-primary" />
                            <h4 className="font-medium">{project.name}</h4>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem('project', project.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                            disabled={!isActionAllowed('delete')}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-foreground-muted">Stories:</span>
                            <span className="ml-1 font-medium">{project.stories}</span>
                          </div>
                          <div>
                            <span className="text-foreground-muted">Tests:</span>
                            <span className="ml-1 font-medium">{project.testCases}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

    const renderStories = () => {
      const displayStories = searchFilter(filteredStories, ['title', 'description']);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Stories {selectedProjectId && `for ${projects.find(p => p.id === selectedProjectId)?.name}`}
            </h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  if (isActionAllowed('add-story')) {
                    if (currentGuideStep === 'create-story') {
                      handleGuideAction('add-story');
                    } else {
                      setShowStoryCreationModal(true);
                    }
                  }
                }}
                disabled={!isActionAllowed('add-story')}
                id="add-story"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Story
              </Button>
              {renderHighlight('add-story')}
            </div>
          </div>

          <div className="space-y-3">
            {displayStories.map((story) => (
              <Card key={story.id} hover className="group">
                <CardContent className="mt-4 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{story.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${story.priority === 'high' ? 'bg-red-100 text-red-700' :
                          story.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {story.priority}
                        </span>
                        <span className="text-xs text-foreground-muted">{story.points} pts</span>
                      </div>
                      <p className="text-sm text-foreground-muted">{story.description}</p>
                    </div>
                    <button
                      onClick={() => deleteItem('story', story.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                      disabled={!isActionAllowed('delete') && currentGuideStep !== 'complete'}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    const renderTestCases = () => {
      const displayTestCases = searchFilter(filteredTestCases, ['name', 'description', 'framework']);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Test Cases</h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  if (currentStep && currentStep.allowedActions.includes('add-testcase-button')) {
                    handleGuideAction('add-testcase-button');
                  } else {
                    setShowTestCaseCreationModal(true);
                  }
                }}
                disabled={!isActionAllowed('add-testcase-button')}
                id="add-testcase-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Test Case
              </Button>
              {renderHighlight('add-testcase-button')}
            </div>
          </div>

          <div className="space-y-3">
            {displayTestCases.map((testCase) => (
              <Card key={testCase.id} hover className="group">
                <CardContent className="mt-4 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{testCase.name}</h4>
                        <span className={`w-2 h-2 rounded-full ${testCase.status === 'passed' ? 'bg-green-500' :
                          testCase.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                        <span className="text-xs bg-accent/20 px-2 py-1 rounded">
                          {testCase.framework}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted">{testCase.description}</p>
                    </div>
                    <button
                      onClick={() => deleteItem('testcase', testCase.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                      disabled={!isActionAllowed('delete') && currentGuideStep !== 'complete'}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    const renderTestSuites = () => {
      const displayTestSuites = searchFilter(filteredTestSuites, ['name', 'description']);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Test Suites</h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  const newTestSuite: TestSuite = {
                    id: Date.now().toString(),
                    name: `Test Suite ${testSuites.length + 1}`,
                    description: 'Automated test suite',
                    testCases: [],
                    projectId: selectedProjectId || '1',
                    status: 'active'
                  };
                  setTestSuites(prev => [...prev, newTestSuite]);
                  addNotification(`Test suite "${newTestSuite.name}" created successfully!`);

                  if (currentGuideStep === 'create-test-suite') {
                    setCurrentGuideStep('select-test-suite');
                  }
                }}
                disabled={!isActionAllowed('add-testsuite-button') && currentGuideStep !== 'complete'}
                id="add-testsuite-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Test Suite
              </Button>
              {renderHighlight('add-testsuite-button')}
            </div>
          </div>

          <div className="space-y-3">
            {displayTestSuites.map((suite) => (
              <div key={suite.id} className="relative">
                <Card
                  hover
                  className={`cursor-pointer transition-all group ${selectedTestSuiteId === suite.id ? 'ring-2 ring-primary' : ''
                    } ${!isActionAllowed(`testsuite-card-${suite.id}`) && currentGuideStep !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (isActionAllowed(`testsuite-card-${suite.id}`)) {
                      setSelectedTestSuiteId(suite.id);
                      if (currentGuideStep === 'select-test-suite') {
                        setCurrentGuideStep('run-tests');
                      }
                    }
                  }}
                  id={`testsuite-card-${suite.id}`}
                >
                  <CardContent className="mt-4 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{suite.name}</h4>
                          <span className={`w-2 h-2 rounded-full ${suite.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          <span className="text-xs text-foreground-muted">
                            {suite.testCases.length} test cases
                          </span>
                        </div>
                        <p className="text-sm text-foreground-muted">{suite.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem('testsuite', suite.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                        disabled={!isActionAllowed('delete') && currentGuideStep !== 'complete'}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                {renderHighlight(`testsuite-card-${suite.id}`)}
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderExecutions = () => {
      const displayExecutions = searchFilter(filteredExecutions, ['name']);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Test Executions</h3>
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  const totalTests = Math.floor(Math.random() * 20) + 5;
                  const newExecution: TestExecution = {
                    id: Date.now().toString(),
                    name: `Execution ${executions.length + 1}`,
                    testCases: totalTests,
                    status: 'running',
                    passed: 0,
                    failed: 0,
                    duration: '0m',
                    projectId: selectedProjectId || '1'
                  };
                  setExecutions(prev => [...prev, newExecution]);
                  addNotification(`Test execution "${newExecution.name}" started!`);

                  // Simulate execution completion with random results
                  setTimeout(() => {
                    const passed = Math.floor(totalTests * (0.33 + Math.random() * 0.4)); // 33-73% pass
                    const failed = Math.floor((totalTests - passed) * Math.random()); // Random fails
                    const finalPassed = Math.min(passed, totalTests - failed);

                    setExecutions(prev => prev.map(e =>
                      e.id === newExecution.id
                        ? {
                          ...e,
                          status: Math.random() > 0.1 ? 'completed' : 'failed', // 90% complete, 10% fail
                          passed: finalPassed,
                          failed: totalTests - finalPassed,
                          duration: `${Math.floor(Math.random() * 30 + 5)}m`
                        }
                        : e
                    ));
                    addNotification(`Test execution completed: ${finalPassed}/${totalTests} passed`);
                  }, 3000 + Math.random() * 2000); // 3-5 seconds

                  // Progress guide if in execute-tests step
                  if (currentGuideStep === 'execute-tests') {
                    setCurrentGuideStep('complete');
                    setIsGuideComplete(true);
                  }
                }}
                disabled={!isActionAllowed('run-tests-button')}
                id="run-tests-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Run Tests
              </Button>
              {renderHighlight('run-tests-button')}
            </div>
          </div>

          <div className="space-y-3">
            {displayExecutions.map((execution) => (
              <Card key={execution.id} hover className="group">
                <CardContent className="mt-4 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{execution.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${execution.status === 'completed' ? 'bg-green-100 text-green-700' :
                          execution.status === 'running' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {execution.status}
                        </span>
                        {execution.status === 'running' && <Loader className="w-4 h-4 animate-spin text-blue-500" />}
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-foreground-muted">Total:</span>
                          <span className="ml-1 font-medium">{execution.testCases}</span>
                        </div>
                        <div>
                          <span className="text-foreground-muted">Passed:</span>
                          <span className="ml-1 font-medium text-green-600">{execution.passed}</span>
                        </div>
                        <div>
                          <span className="text-foreground-muted">Failed:</span>
                          <span className="ml-1 font-medium text-red-600">{execution.failed}</span>
                        </div>
                        <div>
                          <span className="text-foreground-muted">Duration:</span>
                          <span className="ml-1 font-medium">{execution.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      {execution.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setShowReport(execution.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Report
                        </Button>
                      )}
                      <button
                        onClick={() => deleteItem('execution', execution.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                        disabled={!isActionAllowed('delete') && currentGuideStep !== 'complete'}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    switch (activeSidebar) {
      case 'teams': return renderTeams();
      case 'projects': return renderProjects();
      case 'stories': return renderStories();
      case 'testcases': return renderTestCases();
      case 'testsuites': return renderTestSuites();
      case 'executions': return renderExecutions();
      default: return renderTeams();
    }
  };

  const renderReportModal = () => {
    if (!showReport) return null;

    const report = generateTestReport(showReport);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowReport(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden"
          style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-semibold">Test Execution Report</h2>
            <button
              onClick={() => setShowReport(null)}
              className="p-2 hover:bg-accent/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{report.summary.total}</div>
                      <div className="text-sm text-foreground-muted">Total Tests</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{report.summary.passed}</div>
                      <div className="text-sm text-foreground-muted">Passed</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{report.summary.failed}</div>
                      <div className="text-sm text-foreground-muted">Failed</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{report.summary.duration}</div>
                      <div className="text-sm text-foreground-muted">Duration</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Test Cases */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Test Cases</h3>
                <div className="space-y-2">
                  {report.testCases.map((testCase, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${testCase.status === 'passed' ? 'bg-green-500' :
                              testCase.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                              }`} />
                            <div>
                              <h4 className="font-medium">{testCase.name}</h4>
                              {testCase.error && (
                                <p className="text-sm text-red-600 mt-1">{testCase.error}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {testCase.duration}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderTeamCreationModal = () => {
    if (!showTeamCreationModal) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowTeamCreationModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create New Team</h3>
            <button
              onClick={() => setShowTeamCreationModal(false)}
              className="p-1 hover:bg-accent/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
                autoFocus
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={() => {
                  if (teamName.trim()) {
                    const newTeam: Team = {
                      id: Date.now().toString(),
                      name: teamName.trim(),
                      members: Math.floor(Math.random() * 10) + 1,
                      color: 'primary'
                    };
                    setTeams(prev => [...prev, newTeam]);
                    addNotification(`Team "${newTeam.name}" created successfully!`);
                    setShowTeamCreationModal(false);
                    setTeamName('');

                    // Progress guide if in create-team step
                    if (currentGuideStep === 'create-team') {
                      setCurrentGuideStep('view-projects');
                    }
                  }
                }}
                disabled={!teamName.trim()}
                className="flex-1"
              >
                Create Team
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowTeamCreationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderProjectCreationModal = () => {
    if (!showProjectCreationModal) return null;

    const handleCreateProject = async () => {
      if (!projectName.trim()) return;

      setIsCreatingProject(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName.trim(),
        type: projectType === 'manual' ? 'arxitest' : projectType,
        teamId: selectedTeamId || '1',
        stories: projectType === 'manual' ? 0 : Math.floor(Math.random() * 10) + 1,
        testCases: projectType === 'manual' ? 0 : Math.floor(Math.random() * 20) + 1,
        status: 'active'
      };

      setProjects(prev => [...prev, newProject]);

      // If it's an imported project, generate stories, test cases, and test suites
      if (projectType !== 'manual') {
        const projectId = newProject.id;
        const storyCount = Math.floor(Math.random() * 5) + 3; // 3-7 stories

        // Generate stories
        const newStories: Story[] = [];
        const storyTemplates = [
          { title: 'User Authentication', description: 'Implement secure login and logout functionality', priority: 'high' as const, points: 8 },
          { title: 'Product Catalog', description: 'Display products with search and filtering capabilities', priority: 'medium' as const, points: 5 },
          { title: 'Shopping Cart', description: 'Add items to cart and manage quantities', priority: 'high' as const, points: 8 },
          { title: 'Payment Processing', description: 'Secure payment integration with multiple providers', priority: 'high' as const, points: 13 },
          { title: 'Order Management', description: 'Track and manage customer orders', priority: 'medium' as const, points: 5 },
          { title: 'User Profile', description: 'Allow users to manage their account information', priority: 'low' as const, points: 3 },
          { title: 'Review System', description: 'Enable product reviews and ratings', priority: 'low' as const, points: 5 }
        ];

        for (let i = 0; i < storyCount; i++) {
          const template = storyTemplates[i % storyTemplates.length];
          newStories.push({
            id: `${Date.now()}-story-${i}`,
            title: template.title,
            description: template.description,
            priority: template.priority,
            points: template.points,
            projectId
          });
        }
        setStories(prev => [...prev, ...newStories]);

        // Generate test cases
        const newTestCases: TestCase[] = [];
        const testCaseTemplates = [
          { name: 'Login Validation', description: 'Test user login with valid credentials', framework: 'playwright' as const },
          { name: 'Product Search', description: 'Test product search functionality', framework: 'cypress' as const },
          { name: 'Add to Cart', description: 'Test adding products to shopping cart', framework: 'selenium' as const },
          { name: 'Checkout Process', description: 'Test complete checkout workflow', framework: 'playwright' as const },
          { name: 'Payment Gateway', description: 'Test payment processing integration', framework: 'cypress' as const },
          { name: 'User Registration', description: 'Test new user registration process', framework: 'selenium' as const }
        ];

        newStories.forEach((story, storyIndex) => {
          const testCasesPerStory = Math.floor(Math.random() * 3) + 2; // 2-4 test cases per story
          for (let j = 0; j < testCasesPerStory; j++) {
            const template = testCaseTemplates[(storyIndex * testCasesPerStory + j) % testCaseTemplates.length];
            newTestCases.push({
              id: `${Date.now()}-tc-${storyIndex}-${j}`,
              name: template.name,
              description: template.description,
              framework: template.framework,
              status: Math.random() > 0.7 ? 'passed' : Math.random() > 0.5 ? 'failed' : 'pending',
              storyId: story.id
            });
          }
        });
        setTestCases(prev => [...prev, ...newTestCases]);

        // Generate test suites
        const newTestSuites: TestSuite[] = [];
        const suiteTemplates = [
          { name: 'Authentication Suite', description: 'All authentication-related tests' },
          { name: 'E-commerce Flow', description: 'Complete shopping experience tests' },
          { name: 'Payment Integration', description: 'Payment processing and security tests' }
        ];

        suiteTemplates.forEach((template, index) => {
          const relevantTestCases = newTestCases.filter((_, tcIndex) => tcIndex % 3 === index).map(tc => tc.id);
          if (relevantTestCases.length > 0) {
            newTestSuites.push({
              id: `${Date.now()}-suite-${index}`,
              name: template.name,
              description: template.description,
              testCases: relevantTestCases,
              projectId,
              status: 'active'
            });
          }
        });
        setTestSuites(prev => [...prev, ...newTestSuites]);
      }
      addNotification(`Project "${newProject.name}" ${projectType === 'manual' ? 'created' : `imported from ${projectType}`} successfully!`);
      setShowProjectCreationModal(false);
      setProjectName('');
      setProjectType('manual');
      setIsCreatingProject(false);

      // Progress guide if in create-project step
      if (currentGuideStep === 'create-project') {
        setCurrentGuideStep('select-project');
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => !isCreatingProject && setShowProjectCreationModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4"
          style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create New Project</h3>
            <button
              onClick={() => !isCreatingProject && setShowProjectCreationModal(false)}
              className="p-1 hover:bg-accent/10 rounded"
              disabled={isCreatingProject}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
                autoFocus
                disabled={isCreatingProject}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Project Source</label>
              <div className="space-y-2">
                {[
                  { id: 'manual', label: 'Create Manually', icon: Plus, desc: 'Start with a blank project' },
                  { id: 'github', label: 'Import from GitHub', icon: Github, desc: 'Import existing repository' },
                  { id: 'jira', label: 'Import from Jira', icon: ExternalLink, desc: 'Sync with Jira project' },
                  { id: 'taiga', label: 'Import from Taiga', icon: Target, desc: 'Import from Taiga project' }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${projectType === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => !isCreatingProject && setProjectType(option.id as any)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-foreground-muted">{option.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={handleCreateProject}
                disabled={!projectName.trim() || isCreatingProject}
                className="flex-1"
                icon={isCreatingProject ? <Loader className="w-4 h-4 animate-spin" /> : undefined}
              >
                {isCreatingProject ? 'Creating...' : projectType === 'manual' ? 'Create Project' : `Import from ${projectType}`}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowProjectCreationModal(false)}
                className="flex-1"
                disabled={isCreatingProject}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderStoryCreationModal = () => {
    if (!showStoryCreationModal) return null;

    const generateWithAI = async () => {
      setIsGeneratingStory(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiStories = [
        { title: 'User Authentication System', description: 'Implement secure login and registration with multi-factor authentication', priority: 'high' as const },
        { title: 'Real-time Dashboard Analytics', description: 'Create interactive charts and metrics for user engagement tracking', priority: 'medium' as const },
        { title: 'Shopping Cart Functionality', description: 'Add and manage items in cart with persistent storage', priority: 'medium' as const },
        { title: 'Payment Processing Integration', description: 'Integrate with multiple payment gateways for secure transactions', priority: 'high' as const },
        { title: 'Email Notification System', description: 'Automated email alerts for user actions and system events', priority: 'low' as const },
        { title: 'Advanced Search & Filtering', description: 'Implement full-text search with faceted filtering options', priority: 'medium' as const }
      ];

      const randomStory = aiStories[Math.floor(Math.random() * aiStories.length)];
      setStoryTitle(randomStory.title);
      setStoryDescription(randomStory.description);
      setStoryPriority(randomStory.priority);
      setIsGeneratingStory(false);
      addNotification('✨ AI generated story successfully!', 'success');
    };

    const handleCreateStory = () => {
      if (!storyTitle.trim()) return;

      const newStory: Story = {
        id: Date.now().toString(),
        title: storyTitle.trim(),
        description: storyDescription.trim() || 'No description provided',
        priority: storyPriority,
        points: Math.floor(Math.random() * 13) + 1,
        projectId: selectedProjectId || '1'
      };

      setStories(prev => [...prev, newStory]);
      addNotification(`Story "${newStory.title}" created successfully!`);
      setShowStoryCreationModal(false);
      setStoryTitle('');
      setStoryDescription('');
      setStoryPriority('medium');
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowStoryCreationModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden"
          style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create New Story</h3>
            <button
              onClick={() => setShowStoryCreationModal(false)}
              className="p-1 hover:bg-accent/10 rounded"
              disabled={isGeneratingStory}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
              <Brain className="w-5 h-5 text-accent" />
              <span className="flex-1 text-sm">Need inspiration? Use AI to generate story ideas!</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={generateWithAI}
                disabled={isGeneratingStory}
                icon={isGeneratingStory ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              >
                {isGeneratingStory ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Story Title *</label>
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="Enter story title..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                placeholder="Describe the story requirements..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <div className="flex space-x-2">
                {(['high', 'medium', 'low'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setStoryPriority(priority)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${storyPriority === priority
                      ? priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                        priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } border`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={handleCreateStory}
                disabled={!storyTitle.trim()}
                className="flex-1"
              >
                Create Story
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowStoryCreationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderTestCaseCreationModal = () => {
    if (!showTestCaseCreationModal) return null;

    const currentSelectedStoryId = selectedStoryId || filteredStories[0]?.id || '';

    const generateWithAI = async () => {
      if (!currentSelectedStoryId) return;

      setIsGeneratingTestCase(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedStory = stories.find(s => s.id === currentSelectedStoryId);
      const aiTestCases = [
        { name: `${selectedStory?.title} - Happy Path Test`, description: `Test successful flow of ${selectedStory?.title.toLowerCase()} functionality` },
        { name: `${selectedStory?.title} - Error Handling Test`, description: `Test error scenarios and validation for ${selectedStory?.title.toLowerCase()}` },
        { name: `${selectedStory?.title} - Edge Cases Test`, description: `Test boundary conditions and edge cases for ${selectedStory?.title.toLowerCase()}` },
        { name: `${selectedStory?.title} - Performance Test`, description: `Test performance and load handling for ${selectedStory?.title.toLowerCase()}` },
        { name: `${selectedStory?.title} - Security Test`, description: `Test security aspects and access controls for ${selectedStory?.title.toLowerCase()}` }
      ];

      const randomTestCase = aiTestCases[Math.floor(Math.random() * aiTestCases.length)];
      setTestCaseName(randomTestCase.name);
      setTestCaseDescription(randomTestCase.description);
      setIsGeneratingTestCase(false);
      addNotification('✨ AI generated test case successfully!', 'success');
    };

    const handleCreateTestCase = () => {
      if (!testCaseName.trim() || !currentSelectedStoryId) return;

      const newTestCase: TestCase = {
        id: Date.now().toString(),
        name: testCaseName.trim(),
        description: testCaseDescription.trim() || 'No description provided',
        framework: testFramework,
        status: 'pending',
        storyId: currentSelectedStoryId
      };

      setTestCases(prev => [...prev, newTestCase]);
      addNotification(`Test case "${newTestCase.name}" created successfully!`);
      setShowTestCaseCreationModal(false);
      setTestCaseName('');
      setTestCaseDescription('');
      setTestFramework('playwright');
      setSelectedStoryId('');

      // Progress guide if in create-test-case step
      if (currentGuideStep === 'create-test-case') {
        setCurrentGuideStep('view-test-suites');
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowTestCaseCreationModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden"
          style={{ background: theme === 'dark' ? '#1a1a1a' : 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create New Test Case</h3>
            <button
              onClick={() => setShowTestCaseCreationModal(false)}
              className="p-1 hover:bg-accent/10 rounded"
              disabled={isGeneratingTestCase}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
              <Brain className="w-5 h-5 text-accent" />
              <span className="flex-1 text-sm">Let AI generate test cases based on your story!</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={generateWithAI}
                disabled={isGeneratingTestCase || !currentSelectedStoryId}
                icon={isGeneratingTestCase ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              >
                {isGeneratingTestCase ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Related Story *</label>
              <select
                value={currentSelectedStoryId}
                onChange={(e) => setSelectedStoryId(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
              >
                {filteredStories.map((story) => (
                  <option key={story.id} value={story.id}>{story.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Test Case Name *</label>
              <input
                type="text"
                value={testCaseName}
                onChange={(e) => setTestCaseName(e.target.value)}
                placeholder="Enter test case name..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={testCaseDescription}
                onChange={(e) => setTestCaseDescription(e.target.value)}
                placeholder="Describe what this test case validates..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                style={{ background: theme === 'dark' ? '#2a2a2a' : 'white', color: theme === 'dark' ? 'white' : 'black' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Test Framework</label>
              <div className="flex space-x-2">
                {(['playwright', 'cypress', 'selenium'] as const).map((framework) => (
                  <button
                    key={framework}
                    onClick={() => setTestFramework(framework)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${testFramework === framework
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                      }`}
                  >
                    {framework}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={handleCreateTestCase}
                disabled={!testCaseName.trim() || !currentSelectedStoryId}
                className="flex-1"
              >
                Create Test Case
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowTestCaseCreationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={`h-[600px] border border-border rounded-lg overflow-hidden flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {renderSidebar()}

      <div className="flex-1 flex flex-col">
        {renderHeader()}

        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {renderGuideTooltip()}

      <AnimatePresence>
        {showReport && renderReportModal()}
        {showTeamCreationModal && renderTeamCreationModal()}
        {showProjectCreationModal && renderProjectCreationModal()}
        {showStoryCreationModal && renderStoryCreationModal()}
        {showTestCaseCreationModal && renderTestCaseCreationModal()}
      </AnimatePresence>
    </div>
  );
};

export default DashboardDemo;