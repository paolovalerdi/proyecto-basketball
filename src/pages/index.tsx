import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h2>Players</h2>
      <ul>
        <li>
          <a href="/player/create">Create</a>
        </li>
        <li>
          <a href="/player/addToTeam">Add to team</a>
        </li>
      </ul>
      <h2>Teams</h2>
      <ul>
        <li>
          <a href="/team/create">Create</a>
        </li>
      </ul>
    </>
  )
}
