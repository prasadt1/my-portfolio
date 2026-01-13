// test-changes.js
// Run with: node test-changes.js

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname);

const errors = [];
const warnings = [];

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  errors.push(message);
  log(`❌ ${message}`, 'red');
}

function warning(message) {
  warnings.push(message);
  log(`⚠️  ${message}`, 'yellow');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// Test 1: Validate JSON syntax in translation files
function testTranslationFiles() {
  log('\n📝 Testing Translation Files...', 'blue');
  
  const translationFiles = [
    'src/locales/en/translation.json',
    'src/locales/de/translation.json',
  ];

  translationFiles.forEach(file => {
    const filePath = join(projectRoot, file);
    if (!existsSync(filePath)) {
      error(`Translation file not found: ${file}`);
      return;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      success(`✓ ${file} - Valid JSON`);
      
      // Check for required keys
      const checkKey = (obj, path) => {
        const keys = path.split('.');
        let current = obj;
        for (const key of keys) {
          if (!current || typeof current !== 'object' || !(key in current)) {
            return false;
          }
          current = current[key];
        }
        return true;
      };

      const requiredKeys = [
        'hero.badge',
        'hero.headline',
        'hero.tagline',
        'hero.trustNote',
        'homepage.problem.title',
        'homepage.howIWork.title',
        'homepage.finalCta.title',
        'nav.forRecruiters',
        'footer.forRecruiters',
      ];

      requiredKeys.forEach(key => {
        if (!checkKey(data, key)) {
          warning(`Missing key in ${file}: ${key}`);
        } else {
          success(`  ✓ ${key} exists`);
        }
      });

    } catch (e) {
      error(`${file} - Invalid JSON: ${e.message}`);
    }
  });
}

// Test 2: Check if new files exist
function testFileExistence() {
  log('\n📁 Testing File Existence...', 'blue');
  
  const requiredFiles = [
    'src/pages/HiringPage.tsx',
    'src/pages/HomePageMultiDomain.tsx',
    'src/components/Navigation.tsx',
    'src/components/Footer.tsx',
    'src/pages/ProjectsPage.tsx',
    'src/App.tsx',
  ];

  requiredFiles.forEach(file => {
    const filePath = join(projectRoot, file);
    if (existsSync(filePath)) {
      success(`✓ ${file} exists`);
    } else {
      error(`${file} does not exist`);
    }
  });
}

// Test 3: Check App.tsx for HiringPage route
function testRouting() {
  log('\n🛣️  Testing Routing Configuration...', 'blue');
  
  const appPath = join(projectRoot, 'src/App.tsx');
  if (!existsSync(appPath)) {
    error('App.tsx not found');
    return;
  }

  try {
    const content = readFileSync(appPath, 'utf-8');
    
    // Check for HiringPage import
    if (content.includes("import('./pages/HiringPage')") || content.includes("from './pages/HiringPage'")) {
      success('✓ HiringPage import found');
    } else {
      warning('HiringPage import not found in App.tsx');
    }

    // Check for /hiring route
    if (content.includes('path="hiring"') || content.includes("path='hiring'")) {
      success('✓ /hiring route found');
    } else {
      warning('/hiring route not found in App.tsx');
    }

  } catch (e) {
    error(`Error reading App.tsx: ${e.message}`);
  }
}

// Test 4: Check TypeScript compilation
function testTypeScript() {
  log('\n🔧 Testing TypeScript Compilation...', 'blue');
  
  try {
    info('Running TypeScript compiler check...');
    execSync('npx tsc --noEmit', { 
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    success('✓ TypeScript compilation successful');
  } catch (e) {
    const output = e.stdout?.toString() || e.stderr?.toString() || e.message;
    error(`TypeScript compilation errors found`);
    if (output && output.length > 0) {
      const errorPreview = output.substring(0, 500);
      log(`Error preview:\n${errorPreview}`, 'red');
      log(`\nRun 'npx tsc --noEmit' for full details`, 'yellow');
    }
  }
}

// Test 5: Check for common import issues
function testImports() {
  log('\n📦 Testing Critical Imports...', 'blue');
  
  const filesToCheck = [
    { 
      file: 'src/pages/HomePageMultiDomain.tsx', 
      imports: ['LogoCarousel', 'ArrowRight', 'AlertTriangle', 'FileText', 'Target'],
      required: true
    },
    { 
      file: 'src/pages/HiringPage.tsx', 
      imports: ['PageShell', 'PageHeader', 'Container'],
      required: false
    },
    { 
      file: 'src/components/Navigation.tsx', 
      imports: ['Link', 'useTranslation'],
      required: true
    },
  ];

  filesToCheck.forEach(({ file, imports, required }) => {
    const filePath = join(projectRoot, file);
    if (!existsSync(filePath)) {
      if (required) {
        error(`${file} not found`);
      } else {
        warning(`${file} not found - skipping import check`);
      }
      return;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      imports.forEach(imp => {
        if (content.includes(imp)) {
          success(`  ✓ ${file} uses ${imp}`);
        } else {
          warning(`${file} may be missing import: ${imp}`);
        }
      });
    } catch (e) {
      error(`Error reading ${file}: ${e.message}`);
    }
  });
}

// Test 6: Validate translation key usage
function testTranslationKeyUsage() {
  log('\n🔑 Testing Translation Key Usage...', 'blue');
  
  const keyFileMap = {
    'src/pages/HomePageMultiDomain.tsx': [
      'hero.badge',
      'hero.headline',
      'hero.tagline',
      'hero.cta',
      'homepage.problem.title',
      'homepage.howIWork.title',
    ],
    'src/pages/HiringPage.tsx': [
      'hiringPage.hero.title',
      'hiringPage.roles.title',
    ],
  };

  Object.entries(keyFileMap).forEach(([file, keys]) => {
    const filePath = join(projectRoot, file);
    if (!existsSync(filePath)) {
      warning(`${file} not found - skipping translation key check`);
      return;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      keys.forEach(key => {
        const pattern1 = `t('${key}')`;
        const pattern2 = `t("${key}")`;
        if (content.includes(pattern1) || content.includes(pattern2)) {
          success(`  ✓ ${file} uses ${key}`);
        } else {
          warning(`${file} may not be using translation key: ${key}`);
        }
      });
    } catch (e) {
      error(`Error reading ${file}: ${e.message}`);
    }
  });
}

// Main test runner
function runTests() {
  log('\n🧪 Starting Validation Tests...\n', 'blue');
  log('='.repeat(60), 'cyan');

  testTranslationFiles();
  testFileExistence();
  testRouting();
  testImports();
  testTranslationKeyUsage();
  
  testTypeScript();

  log('\n' + '='.repeat(60), 'cyan');
  log('\n📊 Test Summary:', 'blue');
  
  if (errors.length === 0 && warnings.length === 0) {
    log('\n🎉 All tests passed!', 'green');
    log('✅ Ready to build: npm run build', 'green');
    process.exit(0);
  } else {
    if (errors.length > 0) {
      log(`\n❌ ${errors.length} error(s) found:`, 'red');
      errors.forEach((err, i) => log(`  ${i + 1}. ${err}`, 'red'));
    }
    if (warnings.length > 0) {
      log(`\n⚠️  ${warnings.length} warning(s) found:`, 'yellow');
      warnings.slice(0, 10).forEach((warn, i) => log(`  ${i + 1}. ${warn}`, 'yellow'));
      if (warnings.length > 10) {
        log(`  ... and ${warnings.length - 10} more warnings`, 'yellow');
      }
    }
    log('\n💡 Fix the errors above before proceeding.', 'yellow');
    process.exit(errors.length > 0 ? 1 : 0);
  }
}

runTests();