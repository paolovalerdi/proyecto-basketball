import { type NextPage } from "next";
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Shell } from "~/components/app/shell";


const Home: NextPage = () => {
  return <Shell
    sideBarSelection={"teams"}
  >
    <div className="px-8 py-6">
      <div className="flex space-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Equipos
          </h2>
          <p className="text-sm text-muted-foreground">
            Your personal playlists. Updated daily.
          </p>
        </div>
        <div className="ml-auto mr-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add music
          </Button>
        </div>
      </div>
    </div>
  </Shell>
};

export default Home;