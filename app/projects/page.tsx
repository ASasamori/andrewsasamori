
import ProjectBlock from '../components/project-block'
import { getAllProjects } from '../lib/api'

export const metadata = {
    icons: {
        icon: '/icons/semi.png'
    }
}

export default function Page() {
    const projects = getAllProjects()

    return (
        <section>
            <div className="space-y-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Completed Projects
                </h1>
                {projects.map((project) => (
                    <ProjectBlock key={project.slug} project={project} />
                ))}
            </div>
        </section>
    )
}