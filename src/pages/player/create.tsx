import { useCallback, useRef } from "react";
import { Player, PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'

type CreatePlayerProps = {
  existingPlayers: Player[],
}

export default function CreatePlayer({ existingPlayers }: CreatePlayerProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const submit = useCallback(async () => {
    if (nameRef.current) {
      const res = await fetch(
        '/api/createPlayer',
        {
          method: 'POST',
          body: JSON.stringify({
            name: nameRef.current.value,
          })
        }
      );
      console.log(res);
      if (res.ok) {
        nameRef.current.value = ''
      }
    }
  }, []);

  return (
    <>
      <table>
        {
          existingPlayers.map(
            (player) => <td>player.name</td>
          )
        }
      </table>
      <input ref={nameRef} type="text" name="name" id="name" /><br />
      <button onClick={submit}>Crear</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: CreatePlayerProps }> = async (context) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const existingPlayers = await prisma.player.findMany()

  await prisma.$disconnect()

  const data: CreatePlayerProps = {
    existingPlayers
  }

  return {
    props: {
      data,
    },
  }
}