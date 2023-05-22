import {
  Dribbble,
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music,
  Music2,
  PlayCircle,
  Radio,
  Trophy,
  User,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sideBarSelection: 'tournaments' | 'teams' | 'players',
}

const isSelected = (item: string, selection: string) => {
  return item === selection ? 'secondary' : 'ghost'
};

export function Sidebar({ className, sideBarSelection }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h1 className="mb-4 px-2 text-3xl font-semibold tracking-tight">
            Bastec
          </h1>
          <div className="space-y-1">
            <Button
              variant={isSelected('tournaments', sideBarSelection)}
              size="sm"
              onClick={() => window.location.href = '/'}
              className="w-full justify-start"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Torneos
            </Button>
            <Button
              variant={isSelected('teams', sideBarSelection)}
              size="sm"
              onClick={() => window.location.href = '/teams/page'}
              className="w-full justify-start">
              <Dribbble className="mr-2 h-4 w-4" />
              Equipos
            </Button>
            <Button
              variant={isSelected('players', sideBarSelection)}
              size="sm"
              onClick={() => window.location.href = '/players/page'}
              className="w-full justify-start">
              <Users2 className="mr-2 h-4 w-4" />
              Jugadores
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}