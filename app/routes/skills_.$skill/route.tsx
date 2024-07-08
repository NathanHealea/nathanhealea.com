import { LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import Section from '~/components/Section';
import SectionContent from '~/components/Section/SectionContent';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  return params.skill;
}

const StylesPage = () => {
  const skill = useLoaderData<typeof loader>();
  return (
    <Page>
      <Section as="header" className="text-center">
        <SectionContent>
          <h1>{skill}</h1>
        </SectionContent>
      </Section>
    </Page>
  );
};

export default StylesPage;
