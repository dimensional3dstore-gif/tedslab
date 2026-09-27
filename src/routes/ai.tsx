import { createFileRoute } from '@tanstack/react-router';
import { AppShell, PageHeader } from '@/components/biopedia/AppShell';
import { Pate } from '@/ai/page';

const title = 'AI Tutor — Ted\'s Lab';
const description = 'Get study guidance from the built-in AI tutor using the project knowledge files.';

export const Route = createFileRoute('/ai')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AIPage,
});

function AIPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Tutor"
        description="Ask a question and I will respond using the built-in study and biology knowledge files."
      />
      <div className="mt-6">
        <Pate />
      </div>
    </AppShell>
  );
}
