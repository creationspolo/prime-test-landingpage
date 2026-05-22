import Hero            from '@/components/sections/Hero'
import RecentWins      from '@/components/sections/RecentWins'
import VideoWall       from '@/components/sections/VideoWall'
import LogoMarquee     from '@/components/sections/LogoMarquee'
import FinalCTA        from '@/components/sections/FinalCTA'
import ComplianceFooter from '@/components/sections/ComplianceFooter'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <RecentWins />
      <VideoWall />
      <FinalCTA />
      <ComplianceFooter />
    </main>
  )
}
