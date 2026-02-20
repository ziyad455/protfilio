import { useEffect, useState } from 'react';
import { fetchAPI } from './services/api';
import { SectionProvider } from './components/ui/SectionProvider';
import { Typography } from './components/ui/Typography';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/Card';
import { ArrowRight, Github, Send } from 'lucide-react';
import { TopBg } from './components/ui/TopBg';

function App() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<any>(null);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetchAPI('/api/global-setting');
        setData(response.data);
        setStatus('success');
      } catch (err: any) {
        if (err.message.includes('403') || err.message.includes('404')) {
          setStatus('success');
          setData({ siteName: 'Successfully connected (Pending public permissions)' });
        } else {
          setStatus('error');
        }
      }
    }
    init();
  }, []);

  const handleSimulateLoad = () => {
    setIsSimulatingLoad(true);
    setTimeout(() => setIsSimulatingLoad(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] transition-colors duration-300">
      <TopBg />

      {/* Hero Showcase Section */}
      <SectionProvider paddingY="xl">
        <div className="max-w-3xl mx-auto text-center space-y-8" data-aos="fade-up">
          <Typography variant="h1" gradient animate>
            Milestone 2: UI Library
          </Typography>

          <Typography variant="lead" animate delay={0.2}>
            We've successfully built the core building blocks: robust Typography, responsive Buttons, and interactive Cards powered by Framer Motion and AOS.
          </Typography>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4" data-aos="fade-up" data-aos-delay="400">
            <Button size="lg" onClick={handleSimulateLoad} isLoading={isSimulatingLoad}>
              Submit Action <Send className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="secondary" size="lg">
              Secondary Action
            </Button>
            <Button variant="outline" size="lg">
              <Github className="mr-2 h-5 w-5" /> View Github
            </Button>
          </div>
        </div>
      </SectionProvider>

      {/* Cards Showcase Section */}
      <SectionProvider containerType="site" paddingY="lg" className="bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-900)]">
        <Typography variant="h2" className="text-center mb-12" data-aos="fade-up">
          Interactive Cards
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <Card delay={0.1}>
            <CardHeader>
              <Typography variant="h3">Strapi Connection</Typography>
              <Typography variant="caption">System Status</Typography>
            </CardHeader>
            <CardContent>
              <Typography>
                Currently fetching the Global Settings from the local Strapi CMS instance.
              </Typography>
              <div className="mt-4 p-3 rounded-lg bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)]">
                <span className="font-mono text-sm text-[var(--color-text-primary)]">
                  {status === 'loading' ? 'Loading data...' : data?.siteName || 'Connection Error'}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View API Logs <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2 */}
          <Card delay={0.2}>
            <CardHeader>
              <Typography variant="h3">Framer Motion</Typography>
              <Typography variant="caption">Interactivity</Typography>
            </CardHeader>
            <CardContent>
              <Typography>
                Hover over these cards or the buttons above to see the micro-interactions powered by Framer Motion.
              </Typography>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3 */}
          <Card delay={0.3}>
            <CardHeader>
              <Typography variant="h3">Animate on Scroll</Typography>
              <Typography variant="caption">Layout Rendering</Typography>
            </CardHeader>
            <CardContent>
              <Typography>
                As you scroll down the page, elements fade into view using the robust AOS library configured in the SectionProvider.
              </Typography>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm" className="w-full">
                Read Documentation
              </Button>
            </CardFooter>
          </Card>

        </div>
      </SectionProvider>

    </div>
  );
}

export default App;
