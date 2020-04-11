import Link from "next/link"

import {
  FragmentProjectNavFragment,
  useProjectsNavQuery,
  useProjectsQuery,
} from "../../generated/graphql"
import { Box } from "../box"
import { ButtonExternal } from "../button"
import { Clients } from "../clients"
import { ColumnsCenter } from "../columns"
import { LinkExternal } from "../link"
import { Tags } from "../tags"
import { Body, HeadingFour, HeadingOne, HeadingThree } from "../typography"

export const Projects: React.FC = () => {
  const { loading, error, data } = useProjectsQuery()

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!data) return null

  const { projects } = data

  return (
    <div>
      <nav>
        {(projects ?? []).map((project) =>
          project ? (
            <Link
              prefetch
              key={project.id}
              href="/project/[slug]"
              as={`/project/${project.slug}`}
            >
              <a>{project.title}</a>
            </Link>
          ) : null
        )}
      </nav>
    </div>
  )
}

const ProjectsMenuItem: React.FC<FragmentProjectNavFragment> = ({
  clients,
  title,
  description,
  role,
  tags,
  href,
  hrefCaseStudy,
  studio,
}) => (
  <Box as="article">
    <Clients clients={clients} />
    <HeadingThree mb={!description ? 8 : undefined}>{title}</HeadingThree>
    <Body mb={8}>{description}</Body>
    <HeadingFour mb={!studio ? 8 : undefined}>{role}</HeadingFour>
    {studio?.href && (
      <LinkExternal mb={8} href={studio.href}>
        {studio.title}
      </LinkExternal>
    )}
    {tags && <Tags tags={tags} />}
    {(href || hrefCaseStudy) && (
      <Box>
        {href && <ButtonExternal href={href}>Site</ButtonExternal>}
        {hrefCaseStudy && (
          <ButtonExternal href={hrefCaseStudy}>Case Study</ButtonExternal>
        )}
      </Box>
    )}
  </Box>
)

export const ProjectsMenu: React.FC = () => {
  const { data } = useProjectsNavQuery()

  const projects = data?.projects ?? []

  return (
    <ColumnsCenter as="section">
      <HeadingOne mb={32}>Projects</HeadingOne>
      <Box display="grid" gridRowGap={56}>
        {projects.map((project) =>
          project ? <ProjectsMenuItem key={project.id} {...project} /> : null
        )}
      </Box>
    </ColumnsCenter>
  )
}
