import { type NextPage } from "next";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Delete, PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Shell } from "~/components/app/shell";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { RecentSales } from "~/components/app/player_list";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { DatePicker } from "~/components/app/date_picker";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";


const Home: NextPage = () => {
  return <Shell
    sideBarSelection={"players"}
  >
    <div className="px-8 py-6">
      <PlayersPage></PlayersPage>
    </div>
  </Shell>
};

export default Home;

interface Player {
  id: number;
  name: string;
  birthday: string;
}

const PlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerBirthday, setNewPlayerBirthday] = useState<Date | undefined>();

  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = async () => {
    try {
      const response = await axios.get<Player[]>('../api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName && newPlayerBirthday) {
      try {
        const formattedBirthday = new Date(newPlayerBirthday).toISOString();
        const response = await axios.post<Player>('../api/players', {
          name: newPlayerName,
          birthday: formattedBirthday,
        });
        setNewPlayerName('');
        setNewPlayerBirthday(undefined);
        getAllPlayers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deletePlayer = async (playerId: number) => {
    try {
      await axios.delete(`../api/players/${playerId}`);
      getAllPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Jugadores
        </h2>
        <p className="text-sm text-muted-foreground">
          {players.length} jugadores registrados.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3">
          <CardHeader>
            Todos los jugadores
          </CardHeader>
          <CardContent className="space-y-8">
            {
              players.map((player) => (
                <PlayerItem key={player.id}
                  player={player}
                  onDelete={(p) => deletePlayer(p.id)}
                />
              ))
            }
          </CardContent>
        </Card>
        <div className="col-span-2">
          <CardHeader>
            Crear nuevo jugador
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Label>Nombre</Label>
            <Input type="text"
              id="name"
              placeholder="Juan Pérez"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <div className="h-2"></div>
            <Label>Fecha de nacimiento</Label>
            <DatePicker onSelected={setNewPlayerBirthday} />
            <div className="h-2"></div>
            <Button onClick={createPlayer}>Crear jugador</Button>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

interface PlayerItemProps {
  player: Player,
  onDelete: (player: Player) => void
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, onDelete }: PlayerItemProps) => {
  return (
    <div className="flex items-center">
      <Avatar className="flex h-10 w-10 items-center justify-center space-y-0 border">
        <AvatarFallback>{player.name.split(' ').map((e) => e.charAt(0).toUpperCase()).join("")}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{player.name}</p>
        <p className="text-sm text-muted-foreground">{player.birthday}</p>
      </div>
      <div className="flex-grow"></div>
      <div
        className="h-10 w-10 flex items-center justify-center hover:text-white hover:bg-black hover:rounded-full"
        onClick={() => onDelete(player)}
      >
        <Trash2 size={20}></Trash2>
      </div>
    </div>
  );
}